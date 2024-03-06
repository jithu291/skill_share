import React, { useEffect, useState } from 'react'
import { Button,  Modal } from 'react-bootstrap'
import add from '../assets/Images/add.png'
import axios from 'axios';

function AddVideo() {

  const [imageNumber, setImageNumber] = useState(null);

  const handleImageClick = (num) => {
    setImageNumber(num);
    document.getElementById('fileInput').click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        localStorage.setItem(`image${imageNumber}`, reader.result);
        document.getElementById(`imagePreview${imageNumber}`).setAttribute('src', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    for (let i = 1; i <= 2; i++) {
      const imageData = localStorage.getItem(`image${i}`);
      if (imageData) {
        document.getElementById(`imagePreview${i}`).setAttribute('src', imageData);
      }
    }
  }, []);

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
                <input type="file" style={{ display: 'none' }} id='fileInput' onChange={handleFileChange}/>
                <img style={{ height: '250px' }} className='image-preview w-100' src={add} alt="Image 1" id="imagePreview1" onClick={()=>handleImageClick(1)} />
              </label>
               
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