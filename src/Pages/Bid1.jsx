import React, { useEffect, useState } from 'react'
import Table from '@mui/joy/Table';
import bid from '../assets/Images/bid3.jpg'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MDBIcon, MDBTypography } from 'mdb-react-ui-kit';

function Bid1() {
    const [bids, setBids] = useState([]);

    useEffect(() => {
      fetchBids();
    }, []);
  
    const fetchBids = async () => {
        try {
          const token = sessionStorage.getItem('token');
          if (!token) {
            console.log('Token not found. Please login.');
            return;
          }
      
          const response = await axios.get('http://localhost:8000/api/bids/', {
            headers: {
              Authorization: `Token ${token}`,
              'Content-Type': 'application/json'
            },
          });
      
          setBids(response.data);
          console.log('Bids fetched:', response.data);
        } catch (error) {
          console.error('Error fetching bids:', error);
        }
      };

      const handleBidDelete  = async (Id) => {
        try{
           const token = sessionStorage.getItem( 'token' );
           if(!token){
            console.log("token not found , please login");
            return;
           }
           const res = await axios.delete(`http://127.0.0.1:8000/api/bids/${Id}/`, 
           {
            headers:{
              Authorization:`Token ${token}`,
              'Content-Type': 'application/json'
            },
           })

           setBids(bids.filter(id => bid.id !== id));
           console.log(res.data);
           console.log('Bid deleted successfully');
           fetchBids()
           
        }catch(error){
               console.log('Error deleting the Bid : ', error);
        }
      }
  
  return (
  <>
    <MDBTypography tag="h5" style={{marginLeft:'20px', marginTop:'20px'}}>
                      <a href="/landing" className="text-body" style={{textDecoration:'none'}}>
                        <MDBIcon fas icon="long-arrow-alt-left me-2" /> Back
                      </a>
                    </MDBTypography>  
                    <hr />
   <div className='d-flex justify-content-center align-items-center '>
   <img className='' style={{width:'30%', height:'50%'}} src={bid} alt="" />
   </div>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin:'200px', marginTop:'70px' }}>
    <div className=' justify-content-center align-items-center'>

                        <Table className='table1' style={{ borderCollapse: 'collapse', border: '1px solid #ccc', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                            <thead>
                                <tr style={{backgroundColor:'#0095a9'}} className='table-info fs-3'>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th> price</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {bids.map((bid, index) => (
                                <tr key={index} style={{color:'red'}} className='fs-3'>
                                    <td>{index + 1}</td>
                                    <td> {bid.title} </td>
                                    <td>{bid.amount}</td>
                                    <td>{bid.status}</td>
                                  
                                    <td className=' text-center'>
                                      <button className='btn ' onClick={()=>handleBidDelete(bid.id)}><i className="fa-solid fa-trash text-danger"></i></button>
                                    </td>
                                </tr>
                                ))}
                               
                                
                              
                            </tbody>
                        </Table>
        </div>
   </div>
  </>
  )
}

export default Bid1