import React, { useState } from 'react'; // Added curly braces around useState
import { Button, Modal, Form } from 'react-bootstrap';
import add from '../assets/Images/add.png';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function AddVideo() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [media , setMedia] = useState(null)

  

  const [show, setShow] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [apiFile , setApiFile] = useState(null);

  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleFileChange = (event) => {
    setSelectedFile(URL.createObjectURL(event.target.files[0]));
    setApiFile(event.target.files[0])
    setMedia(event.target.files[0])
  };
  const token = sessionStorage.getItem('token')

  const handleAdd = async ( e) => {
    e.preventDefault();
    console.log(title, description, price,media);
    if(!title||!description||!price||!media){
      toast.error('Please fill the form completely')
      return;
    }

    try {

      const formData  = new FormData();
      formData.append('title',title);
      formData.append('description',description);
      formData.append('price',price);
      formData.append('media',apiFile);


      const response = await axios.post('http://localhost:8000/api/product/',formData , {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type':'multipart/form-data'
        }
      });
      console.log(response.data);
      console.log('data added successfully', response.data);
      toast.success( "Product Added Successfully")
      handleClose()
    } catch (err) {
      console.log('error in adding data', err);
    }
  };

  return (
    <div>
      <Button onClick={handleShow} variant="success">
        <i className="add fa-solid fa-plus"> Add Videos</i>
      </Button>{' '}
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
  <div className="row">
    <div className="col-lg-6">
      <label>
      {!selectedFile && (
          <div className="text-center">
            <img src={add} alt="" />
            <h5>Upload here</h5>
          </div>
        )}
        <input type="file" style={{ display: 'none' }} onChange={handleFileChange} />
        {selectedFile && media.type.startsWith("image/") && (
          <img style={{ height: '250px' }} className="w-100" src={URL.createObjectURL(media)} alt="Selected" />
        )}
        {selectedFile && media.type.startsWith("video/") && (
          <video style={{ height: '250px' }} className="w-100" controls>
            <source src={URL.createObjectURL(media)} type={media.type} />
            Your browser does not support the video tag.
          </video>
        )}
      
      </label>
    </div>
    <div className="col-lg-6">
      <Form onSubmit={(e) => handleAdd(e)}>
        <div className="mb-3">
          <input type="title" className="form-control" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="mb-3">
          <input type="description" className="form-control" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="mb-3">
          <input type="price" className="form-control" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div className="d-flex justify-content-center">
          <Button type="submit">Add</Button>
          <Button className="ms-3" onClick={handleClose}>Cancel</Button>
        </div>
      </Form>
    </div>
  </div>
</Modal.Body>

      </Modal>
      <ToastContainer autoClose='1500'/>
    </div>
  );
}

export default AddVideo;
