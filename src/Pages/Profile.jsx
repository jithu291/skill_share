import React, { useEffect } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import profile from '../assets/Images/user2.png'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaCloudUploadAlt, FaUserEdit } from "react-icons/fa";
import axios, { Axios } from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import './profilestyle.css'


function Profile() {
  const [data, setData] = useState(null)
  const [users, setUsers] = useState([]);
  const [uid, setUid] = useState('')
  const [receiverid,setreceiverid] = useState('')
  const id = sessionStorage.getItem("id")
  const [accessToken, setAccessToken] = useState('');
  const [showchat, setShowchat] = useState(false);
  const [sendimagepreview,setsendImagepreview] = useState('')
  const [takeinput, setNewMessage] = useState({
newMessage:"",
image:''
  });
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // State to hold the selected user for chat

useEffect(()=>{
  if(takeinput.image){
    setsendImagepreview(URL.createObjectURL(takeinput.image))
  }
},[takeinput.image])
// console.log(takeinput);
  const handleClosechat = () => setShowchat(false);
  const handleShowchat = (user) => {
    setSelectedUser(user); 
    setShowchat(true)
  setreceiverid(user.id)
  };
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    skills: '',
    user_skill:'',
    profile_pic: null,
    user: id
  });
const [search , setSearch] = useState('')

  const navigate = useNavigate();


  // send message
  const sendMessage = async (e) => {
    const {newMessage,image} = takeinput
    // console.log(image);
    e.preventDefault();
    try {
      const reqBody = new FormData()
      reqBody.append("message",newMessage)
      reqBody.append("image",image)
      const token = sessionStorage.getItem('token');
      await axios.post(`http://127.0.0.1:8000/api/send-message/${receiverid}/`,reqBody, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
     
  toast.success('message send')
  setsendImagepreview("")
    } catch (error) {
      toast.error('Error sending message. Please try again later.');
      console.error('Error sending message:', error);
    }
  };


  // console.log(receiverid);
  // list chat
const fetchMessages = async () => {
  try {
    const token = sessionStorage.getItem('token');
    const response = await axios.get(`http://localhost:8000/api/user-chat-messages/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    setMessages(response.data);
  } catch (error) {
console.log(error);
  }
};
useEffect(()=>{
  fetchMessages()
})
// console.log(messages);
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
    //  console.log('all users', users);
      //  console.log(response);
    } catch (err) {
      console.error('Error fetching all users:', err);
    }
  };
//console.log(users);
  //
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {

    setShow(true)
  };
  const [showimage, setShowimage] = useState(false);

  const handleCloseimage = () => setShowimage(false);
  const handleShowimage = () => {

    setShowimage(true)
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
      formDataToSend.append('user_skill', formData.user_skill);
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
 

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  if (data == null) return (<></>)


console.log(messages);

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
            <Button onClick={handleLogout} className='d-flex gap-1 shadow ' style={{ marginTop: '5px', width:'90px' }} variant="danger"><i class="fa-solid fa-right-from-bracket mt-1"></i>Logout </Button>



          </div>


          <div className=' col-lg-7  rounded shadow d-flex flex-column align-items-center justify-content-center  mt-4 ' id='inptdiv' style={{ width: '40%', height: '90%', marginLeft: '220px' }}>
            {!data.profile_pic &&

              <h1>Upload profile</h1>
            }
            <img src={data.profile_pic && data.profile_pic} alt="" style={{ width: '200px', height: '200px', borderRadius: '100px', marginTop: '-40px' }} />

            <div className='shadow rounded border-dark  w-50 mt-4'>
              <p className='mt-1 text-center'>{data?.name}</p>
            </div>
            <div className='shadow rounded border-dark  w-50 mt-4'>
              <p className='mt-1 text-center'>{data?.bio}</p>
            </div>
            <div className='shadow rounded border-dark  w-50 mt-4'>
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

              <Form.Control
            type="text"
            style={{height:'30px' , width:'140px'}}
            placeholder="Search"
            className=" mr-sm-2 mt-2"
            value={search}
            onChange={handleSearchChange}
          />
            </div>
            <div className='shadow rounded' style={{ height: '400px', backgroundColor:'lightgrey', overflow:'auto'}}>

              {/* <ul className='mt-3 '>
                {users.filter(user => user.user.toLowerCase().includes(search.toLowerCase())).map(user => (
                  <div className='rounded mb-2 d-flex justify-content-between  ' style={{ height: '35px', border: '1px solid' }}>
                   
                    <li className='ms-1 mt-1' key={user.id}>
                      <button onClick={() => handleUserClick(user.id)} style={{ textDecoration: 'none', color: 'black' }}>{user.user}</button>
                    </li>
                    <Link  to={`/chatpage/${user.id}`}><i style={{marginRight:'20px', fontSize:'25px', color:'green'}} class="fa-brands fa-rocketchat mt-1"></i></Link>
                  </div>
                ))}
              </ul> */}
<ul className='mt-3 '>
  {users.map(user => (
    <li key={user.id} className='rounded mb-2 d-flex justify-content-between' style={{ height: '60px', border: '1px solid' }}>

<div className='d-flex'>
  <img className='m-1' src={user.profile_pic} alt="no image" style={{height:'50px',width:"50px",borderRadius:'50%'}}/>
  <h5 className='ms-2 mt-3'>{user.name}</h5>
</div>

      <button onClick={(e) => handleShowchat(user)} style={{ textDecoration: 'none',display:'flex',alignItems:'center',justifyContent:'center',width:'80px',background:'none',border:'none'}}> 
      <i style={{ fontSize: '25px', color: 'green' }} className="fa-brands fa-rocketchat mt-1"></i>       
        </button>

      {/* <Link to={`/chatpage/${user.id}`}><i style={{ marginRight: '20px', fontSize: '25px', color: 'green' }} className="fa-brands fa-rocketchat mt-1"></i></Link> */}
    </li>
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
              className='shadow'
            />
          </FloatingLabel>

          <FloatingLabel controlId="bio" label="Bio" className='mt-2'>
            <Form.Control
              type="textarea"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              className='shadow'
            />
          </FloatingLabel>
          <FloatingLabel controlId="skills" label="Skills" className='mt-2'>
            <Form.Select
              name="skills"
              value={formData.skills}
              onChange={handleInputChange}
              className='shadow'
            >
              <option value="">Select a skill...</option>
              <option value="coding">Coding</option>
              <option value="drawing">Drawing</option>
              <option value="communication">Communication</option>
              <option value="crafting">Crafting</option>
            </Form.Select>
          </FloatingLabel>
          
          <FloatingLabel controlId="user_skill" label="Other Skills" className='mt-2'>
  <Form.Control
    type="text"
    name="user_skill"
    value={formData.user_skill}
    onChange={handleInputChange}
    className='shadow'
  />
</FloatingLabel>

          <label className='border rounded mt-2 d-flex shadow' style={{ width: '465px' }} >
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
   
   
   
   
   
   
   
   
   
   
   {/* chat modal */}
   <Modal show={showchat} onHide={handleClosechat} backdrop="static" keyboard={false} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title style={{ marginLeft: '180px', fontSize: '30px', fontFamily: 'Cormorant,seriff ' }}>
            Chat
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <div style={{width:'100%'}}>


 {/* Display user information in the chat modal */}
 {selectedUser && (
           <div className='d-flex'>
           <img className='m-1' src={selectedUser.profile_pic} alt="no image" style={{height:'50px',width:"50px",borderRadius:'50%'}}/>
           <h5 className='ms-2 mt-3'>{selectedUser.name}</h5>
         </div>
          )}

<div className="chat-card">
      <div className="chat-body">
      {messages
    .filter(message => message.receiver_user === receiverid || message.send_user === receiverid)
    .map((message, index) => (
      <div className="message incoming" key={index}>
       {message.receiver_user === receiverid?

       <>
             <div className='d-flex flex-column'>
        <div>
            <p>{selectedUser.user}</p>
            <p className="text-light fs-5 ">{message.message}</p>
        </div>
         {message.image && <img src={message.image} alt="no image" style={{ height: '300px', width: '400px', border: '1px solid black',borderRadius:'10px' }} />}
  </div>
       </>
      
      :
      <div className='d-flex flex-column'>
      <div>
          <p>me</p>
          <p className="text-light fs-5 ">{message.message}</p>
      </div>
       {message.image && <img src={message.image} alt="no image" style={{ height: '300px', width: '400px', border: '1px solid black',borderRadius:'10px' }} />}
</div>
      }
      </div>
    ))}
     
      </div>
      <div className="chat-footer" style={{width:'96%',borderRadius:'10px'}}>
        <input 
        onChange={(e)=>setNewMessage({...takeinput,newMessage:e.target.value})}
        placeholder="Type your message" type="text" />
      <button onClick={handleShowimage} className='bg-dark'><i class="fa-solid fa-square-plus text-light"></i></button>
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>


         </div>
        </Modal.Body>
        <Modal.Footer>
          {/* Add any additional buttons or controls here */}
        </Modal.Footer>
      </Modal>


      <Modal className='bg-light' show={showimage} onHide={handleCloseimage} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
          <Modal.Title style={{ marginLeft: '180px', fontSize: '30px', fontFamily: 'Cormorant,seriff ' }}>
            Send Image
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
      <div style={{height:'480px',width:'100%'}}>
          <div className='ms-3'>
                <label for="file" class="custum-file-upload">
  
                  <div class="addimage" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  
                    <img src={sendimagepreview?sendimagepreview:'https://cdn.pixabay.com/photo/2017/11/10/05/24/add-2935429_960_720.png'} alt="no image" style={{ height: '400px', width: '420px', border: '1px solid black',borderRadius:'10px' }} />
                  </div>
                  <input id="file" type="file"
                   onChange={(e) => setNewMessage({ ...takeinput, image: e.target.files[0] })}
                  style={{ display: 'none' }} />
  
                </label>
               
              </div>
              <div className="chat-footer">
        <input 
        onChange={(e)=>setNewMessage({...takeinput,newMessage:e.target.value})}
        placeholder="Type your message" type="text" />
    
        <button onClick={sendMessage}>Send</button>
      </div>
      </div>
        </Modal.Body>
      
      </Modal>  
    </>
  )
}

export default Profile




