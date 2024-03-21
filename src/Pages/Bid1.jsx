import React, { useEffect, useState } from 'react'
import Table from '@mui/joy/Table';
import bid from '../assets/Images/bid3.jpg'
import axios from 'axios';

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
              'Content-Type': 'multipart/form-data'
            },
          });
      
          setBids(response.data);
          console.log('Bids fetched:', response.data);
        } catch (error) {
          console.error('Error fetching bids:', error);
        }
      };
  
  return (
  <>
   <div className='d-flex justify-content-center align-items-center'>
    <img  style={{width:'50%', height:'350px'}} src={bid} alt="" />
   </div>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin:'200px', marginTop:'70px' }}>
    <div className=' justify-content-center align-items-center'>

                        <Table className='table1' style={{ borderCollapse: 'collapse', border: '1px solid #ccc', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                            <thead>
                                <tr style={{backgroundColor:'#0095a9'}} className='table-info fs-3'>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>price</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {bids.map((bid, index) => (
                                <tr key={index} style={{color:'red'}} className='fs-3'>
                                    <td>{index + 1}</td>
                                    <td> {bid.title} </td>
                                    <td>{bid.price}</td>
                                    <td>{bid.status}</td>
                                  
                                    <td className=' text-center'><i style={{marginLeft:'-100px'}} className="fa-solid fa-trash "></i></td>
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