import React, { useEffect } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import profile from '../assets/Images/user2.png'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaCloudUploadAlt, FaUserEdit } from "react-icons/fa";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function Profile() {
  const [data, setData] = useState(null)
  const [users, setUsers] = useState([]);
  const [uid, setUid] = useState('')
  const id = sessionStorage.getItem("id")
  const [accessToken, setAccessToken] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    skills: '',
    profile_pic: null,
    user: id
  });
 

  const navigate = useNavigate();
  const handleUserClick = (userId , userName) => {
    setSelectedUserId(userId);
    setSelectedUserName(userName);
    console.log(`clicked on ${userId}`);
    navigate(`/chatpage/${userId}`);
  };

  const handleLogout = () => {
    // Clear data stored in sessionStorage
    sessionStorage.clear();

    // Navigate to home page
    navigate('/');
  };

  // console.log(data);

  useEffect(() => {
    const token = sessionStorage.getItem('token')
    if (token) {
      setAccessToken(token)
      fetchData(token)
      fetchAllUsers(token);
    }
  }, [])



  const fetchData = async (token) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/userprofile/${id}/`, {
        headers: {
          Authorization: `Token ${token}`
        }
      })

      setData(response.data)
      // console.log("api fetching sccessfull" , response.data );
    

      setUid(response.data);
      console.log('user', uid);
    } catch (err) {

      console.log('error in fetchin data', err);
    }
  }

  const fetchAllUsers = async (token) => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/userprofile/', {
        headers: {
          Authorization: `Token ${token}`
        }
      });
      setUsers(response.data);
      console.log('all users', users);
        console.log(response.data);
    } catch (err) {
      console.error('Error fetching all users:', err);
    }
  };

  //
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {

    setShow(true)
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      profile_pic: file,
    });
  };

  const handleSaveChanges = async () => {
    if (!formData.name || !formData.bio || !formData.skills) {
      toast.error("Please fill all the fields");
      return; // Exit function early
    }
    try {

      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('bio', formData.bio);
      formDataToSend.append('skills', formData.skills);
      formDataToSend.append('user', id);
      if (formData.profile_pic) {
        formDataToSend.append('profile_pic', formData.profile_pic);
      }

      const response = await axios.put(`http://127.0.0.1:8000/api/userprofile/${id}/`, formDataToSend, {
        headers: {
          Authorization: `Token ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("Profile updated successfully", response.data);
      setData(response.data)
      toast.success("Update Successfull")

      // Update local data state with the updated user data


      handleClose();
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };
  if (data == null) return (<></>)




  return (
    <>


      <div>
        {/* {data.map((item, index) => ( */}
        <div className=' row d-flex ' id='row' style={{ width: '100vw', height: '100vh' }} >
          <div className=' menu col-lg-1 shadow ' style={{ height: '592px' }}>
            <h2 style={{ marginLeft: '100px', width: '260px' }} className='mt-3' >welcome <span className='text-danger' style={{ fontWeight: 'bolder', fontSize: '40px' }}>{data?.user} </span></h2>

            <div style={{ marginTop: '200px', marginLeft: '20px' }} >
              <Link to={'/landing'} className='d-flex gap-1' style={{ textDecoration: 'none', color: 'grey' }}><i class="fa-solid fa-house mt-1"></i><p>Home</p></Link>
            </div>

            <div style={{ marginTop: '6px', marginLeft: '20px' }} >
              <Link to={'/cart'} className='d-flex gap-1' style={{ textDecoration: 'none', color: 'grey' }}><i class="fa-solid fa-cart-shopping mt-1"></i><p>Cart</p></Link>
            </div>
            <Button onClick={handleLogout} className='d-flex gap-1 ' style={{ marginTop: '5px', width:'90px' }} variant="danger"><i class="fa-solid fa-right-from-bracket mt-1"></i>Logout </Button>



          </div>


          <div className=' col-lg-7  rounded shadow d-flex flex-column align-items-center justify-content-center  mt-4 ' id='inptdiv' style={{ width: '40%', height: '90%', marginLeft: '220px' }}>
            {!data.profile_pic &&

              <h1>Upload profile</h1>
            }
            <img src={data.profile_pic && data.profile_pic} alt="" style={{ width: '200px', height: '200px', borderRadius: '100px', marginTop: '-40px' }} />

            <div className='border rounded border-dark  w-50 mt-4'>
              <p className='mt-1 text-center'>{data?.name}</p>
            </div>
            <div className='border rounded border-dark  w-50 mt-4'>
              <p className='mt-1 text-center'>{data?.bio}</p>
            </div>
            <div className='border rounded border-dark  w-50 mt-4'>
              <p className='mt-1 text-center'>{data?.skills}</p>
            </div>
            <div className='btn '>
              <Button variant="primary" className='shadow d-flex gap-1 mt-2' style={{ marginLeft: '0rem', marginBottom: '-60px', height: '40px' }} onClick={() => handleShow()}>
                <p>Edit </p> <FaUserEdit className='mt-1' />
              </Button>
            </div>
          </div>

          <div className=' row col-lg-2  shadow mt-4 d-flex justify-content-center' style={{ width: '30%', height: '90%', marginLeft: '45px' }}>
            <div>
              <h2 className='text-center'>All Users</h2>
            </div>
            <div className='row-sm-1  d-flex  justify-content-between rounded shadow  ' style={{ marginTop: '-10px', height: '10%', width: '100%', backgroundColor: 'lightgray' }}>
              <h5 className='mt-2'>Total Users: {users.length}</h5>

            </div>
            <div className='shadow rounded' style={{ height: '400px', backgroundColor:'lightgrey'}}>

              <ul className='mt-3 '>
                {users.map((user) => (
                  <div className='rounded mb-2 d-flex justify-content-between  ' style={{ height: '35px', border: '1px solid' }}>
                   
                    <li className='ms-1 mt-1' key={user.id}>
                      <button onClick={() => handleUserClick(user.id)} style={{ textDecoration: 'none', color: 'black' }}>{user.user}</button>
                    </li>
                    <Link  to={`/chatpage/${user.id}`}><i style={{marginRight:'20px', fontSize:'25px', color:'green'}} class="fa-brands fa-rocketchat mt-1"></i></Link>
                  </div>
                ))}
              </ul>
            </div>
          </div>

        </div>




      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ marginLeft: '180px', fontSize: '30px', fontFamily: "Cormorant,seriff " }}>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <FloatingLabel controlId="name" label="Name" >
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </FloatingLabel>

          <FloatingLabel controlId="bio" label="Bio" className='mt-2'>
            <Form.Control
              type="textarea"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
            />
          </FloatingLabel>
          <FloatingLabel controlId="skills" label="Skills" className='mt-2'>
            <Form.Select
              name="skills"
              value={formData.skills}
              onChange={handleInputChange}
            >
              <option value="">Select a skill...</option>
              <option value="coding">Coding</option>
              <option value="drawing">Drawing</option>
              <option value="communication">Communication</option>
              <option value="crafting">Crafting</option>
            </Form.Select>
          </FloatingLabel>


          <label className='border rounded mt-2 d-flex' style={{ width: '465px' }}>
            <input type="file" style={{ display: 'none' }} onChange={handleFileChange} />
            {!formData.profile_pic && (<div className='d-flex ms-3 gap-1 mt-3  '>
              <p>Add Profile Picture</p>
              <i class="fa-solid fa-cloud-arrow-up mt-1 "></i>
            </div>)}


            {formData.profile_pic && <img src={formData.profile_pic && URL.createObjectURL(formData.profile_pic)} alt="" style={{ width: '50px' }} />}

          </label>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="dark" onClick={handleSaveChanges}>Save changes</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer theme='colored' autoClose='2000' />
    </>
  )
}

export default Profile




