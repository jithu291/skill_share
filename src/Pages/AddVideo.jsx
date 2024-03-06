import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import add from '../assets/Images/add.png'

function AddVideo() {


  const [show, setShow] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleFileChange = (event) => {
    setSelectedFile(URL.createObjectURL(event.target.files[0]))
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
                <input type="file" style={{ display: 'none' }} onChange={handleFileChange}/>
                <img style={{ height: '250px' }} className='w-100' src={selectedFile || add} alt="upload project image" />
              </label>
              <div className='text-center ' style={{ marginLeft: '-90px' }} >
                <h5>Upload here</h5>
              </div>


            </div>
            <div className='col-lg-6'>
              <div className='mb-3'>
                <input type="text" className='form-control' placeholder='Title' />
              </div>
              <div className='mb-3'>
                <input type="text" className='form-control' placeholder='Description' />
              </div>
              <div className='mb-3'>
                <input type="text" className='form-control' placeholder='Price' />
              </div>
              <div className='d-flex justify-content-center'>
                <Button>Add</Button>
                <Button className='ms-3'>Cancel</Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default AddVideo