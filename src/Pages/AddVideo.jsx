import React, { useState } from 'react'
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
             {/*  {fileStatus && */} <div className="text-danger mt-2">
                *Please upload following file extensions (png, jpg, jpeg) only*
              </div>{/* } */}
            </div>
            <div className='col-lg-6'>
              <div className='mb-3'>
                <input type="text" className='form-control' placeholder='Video Title'/*  value={projectData.title} onChange={e => setProjectData({ ...projectData, title: e.target.value })} */ />
              </div>
              <div className='mb-3'>
                <input type="text" className='form-control' placeholder='Language Used'/*  value={projectData.languages} onChange={e => setProjectData({ ...projectData, languages: e.target.value })} */ />
              </div>
              <div className='mb-3'>
                <input type="text" className='form-control' placeholder='Project Github Link'/*  value={projectData.github} onChange={e => setProjectData({ ...projectData, github: e.target.value })}  *//>
              </div>
              <div className='mb-3'>
                <input type="text" className='form-control' placeholder='Project Website Link'/*  value={projectData.website} onChange={e => setProjectData({ ...projectData, website: e.target.value })} */ />
              </div>
              <div className='mb-3'>
                <input type="text" className='form-control' placeholder='Project Overview'/*  value={projectData.overview} onChange={e => setProjectData({ ...projectData, overview: e.target.value })} */ />
              </div>
            </div>
          </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default AddVideo