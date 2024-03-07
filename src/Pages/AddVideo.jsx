import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import add from '../assets/Images/add.png'
import axios from 'axios';


function AddVideo() {


  const [show, setShow] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: ''
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleFileChange = (event) => {
    setSelectedFile(URL.createObjectURL(event.target.files[0]))
  };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Token ${token}`
        }
      };
      const response = await axios.post('http://localhost:8000/api/product/', formData, config);

      // Handle success (e.g., show a success message, close modal, etc.)
      console.log('Video added successfully');
      handleClose();
    } catch (error) {
      console.error('Error adding video:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };


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
                <input type="file"  style={{ display: 'none' }} onChange={handleFileChange} />
                <img style={{ height: '250px' }} className='w-100' src={selectedFile || add} alt="upload project image" />
              </label>
              <div className='text-center ' style={{ marginLeft: '-90px' }} >
                <h5>Upload here</h5>
              </div>
            </div>
            <div className='col-lg-6'>
              <div className='mb-3'>
                <input type="text" className='form-control' placeholder='Title' name="title" value={formData.title} onChange={handleInputChange} />
              </div>
              <div className='mb-3'>
                <input type="text" className='form-control' placeholder='Description' name="description" value={formData.description} onChange={handleInputChange} />
              </div>
              <div className='mb-3'>
                <input type="text" className='form-control' placeholder='Price' name="price" value={formData.price} onChange={handleInputChange} />
              </div>
              <div className='d-flex justify-content-center'>
                <Button onClick={handleSubmit}>Add</Button>
                <Button onClick={handleClose} className='ms-3'>Cancel</Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default AddVideo