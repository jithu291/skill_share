import React, { useEffect, useState } from 'react'
import { Button,  Modal } from 'react-bootstrap'
import add from '../assets/Images/add.png'
import axios from 'axios';

function AddVideo() {


    const [show, setShow] = useState(false);
    const [videoData,setVideoData] = useState({
      title:'',
      media:'',
      description:'',
      price:''
    });

    const [token,setToken]= useState('')

    useEffect(()=>{
      const storedToken = sessionStorage.getItem('token')
      if (storedToken){
        setToken(storedToken)
      }
    },[])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleInputChange = (e)=>{
      const {name , value} = e.target
      setVideoData({...videoData , [name]:value});
    };

    const handleAdd = async()=>{
      try{
           const response = await axios.post('localhost:8000/api/product/' , videoData , {
            headers:{
              Authorization: `Token ${token}`
            }
           })
           console.log('Product added:', response.data);
           handleClose()
      }catch(error){
         console.error('Error adding product:',error);
      }
    }


    return (
        <div>
            <Button onClick={handleShow} variant="success"><i className='add fa-solid fa-plus'> Add Videos</i></Button>{' '}

            <Modal size='lg' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Video</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="row">
            <div className="col-lg-6">
              <label>
                <input type="file" style={{ display: 'none' }} />
                <img style={{ height: '250px' }} className='w-100' src={add} alt="upload project image" />
              </label>
                <div className="text-danger mt-2">
                *Please upload following file extensions (png, jpg, jpeg) only*
              </div>
            </div>
            <div className='col-lg-6'>
              <div className='mb-3'>
                <input 
                type="text" 
                className='form-control' 
                placeholder='Title'
                 name='title'
                 value={videoData.title}
                 onChange={handleInputChange} />
              </div>

              <div className='mb-3'>
                <input
                 type="text"
                  className='form-control'
                   placeholder='Description'
                   name='description'
                   value={videoData.description}
                   onChange={handleInputChange} />
              </div>
             
              <div className='mb-3'>
                <input
                 type="text"
                  className='form-control'
                   placeholder='Media'
                   name='media'
                   value={videoData.media} 
                   onChange={handleInputChange}/>
              </div>

              <div className='mb-3'>
                <input
                 type="text"
                  className='form-control' 
                  placeholder='Price'
                  name='price'
                  value={videoData.price}
                  onChange={handleInputChange} />
              </div>
              <div className='d-flex justify-content-center'>
                <Button onClick={handleAdd}>Add</Button>
                <Button className='ms-3' onClick={handleClose}>Cancel</Button>
              </div>
            </div>
          </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default AddVideo