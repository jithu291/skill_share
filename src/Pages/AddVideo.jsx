import React, { useEffect, useState } from 'react'
import { Button,  Modal } from 'react-bootstrap'
import add from '../assets/Images/add.png'


function AddVideo() {


    const [show, setShow] = useState(false);
    
   

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

   
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
                />
              </div>

              <div className='mb-3'>
                <input
                 type="text"
                  className='form-control'
                   placeholder='Description'
                   />
              </div>
             
              <div className='mb-3'>
                <input
                 type="text"
                  className='form-control'
                   placeholder='Media'
                  />
              </div>

              <div className='mb-3'>
                <input
                 type="text"
                  className='form-control' 
                  placeholder='Price'
                />
              </div>
              <div className='d-flex justify-content-center'>
                <Button>Add</Button>
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