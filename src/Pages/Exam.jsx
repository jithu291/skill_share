import React, { useEffect, useState } from 'react'
// import { Button } from 'react-bootstrap'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Toast } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { MDBIcon, MDBTypography } from 'mdb-react-ui-kit';

function Exam() {

    const [data, setData] = useState(null);
    const userid = sessionStorage.getItem("id")
    const [skillid,setskillID] = useState({
        id:''
    })
    
    const [ users,setUsers] = useState([])
    const [currentUser,setCurrentUser] = useState([])
    // const [accessToken, setAccessToken] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [pdfURL, setPdfURL] = useState(null);

    const accessToken = sessionStorage.getItem('token')
    const navigate = useNavigate()

    useEffect(()=>{
    
        fetchData(); 
    }, []);
 
  
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            toast.info('Please select a file to upload.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('answer', selectedFile);
           
            const response = await axios.post('http://localhost:8000/examapi/answers/', formData, {
                headers: {
                    'Authorization': `Token ${accessToken}`,
                    'Content-Type': 'multipart/form-data'
                },
            });
            
            // Handle response
            console.log('File uploaded successfully:', response.data);
            toast.success(`File uploaded successfully`);
            navigate('/landing')

           
            // You may want to perform additional actions here
        } catch (error) {
            toast.error(`File upload error`);
            console.error('Error uploading file:', error);
            // Handle error
        }
    };
 
    const fetchData = async ()=>{
        try{
            const response = await axios.get(`http://localhost:8000/api/userprofile/`,{
                headers : {
                    'Authorization': `Token ${accessToken}`
                }
            })
            setUsers(response.data)
          // console.log(users);
        }catch (error){
            console.log('error fetching data:', error);

        }
    }
    //find current user
    useEffect(() => {
        if (users.length > 0 && userid) {
            const currentUser = users.find(user => user.id == userid);
            setCurrentUser(currentUser);
        }
      if(currentUser.skills == "communication"){
        setskillID({
            id:'2'
        })
      }
      else if(currentUser.skills == "coding"){
        setskillID({
            id:'1'
        })
      }
      else if(currentUser.skills == "drawing"){
        setskillID({
            id:'3'
        })
      }
      else if(currentUser.skills == "crafting"){
        setskillID({
            id:'4'
        })
      }
      else{
        setskillID({
            id:'1'
        })
      }



    }, [users, userid]);
 //console.log(currentUser);
//console.log(skillid.id);


useEffect(()=>{
    const fetchData = async ()=>{
        const {id} = skillid
        console.log(accessToken);
        try{
            const response = await axios.get(`http://localhost:8000/examapi/topics/${id}/questions/`,{
                headers : {
                    Authorization: `Token ${accessToken}`
                }
            })
            setData(response.data)
        }catch (error){
            console.log('error fetching data:', error);
        }
    }
    fetchData();
}, [currentUser]);
console.log(data);

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    return (
        <>
         
        <div style={{height:'100vh',width:'100%'}} >

        <MDBTypography tag="h5" style={{marginLeft:'20px', marginTop:'20px'}}>
                      <a href="/landing" className="text-body" style={{textDecoration:'none' }}>
                        <MDBIcon fas icon="long-arrow-alt-left me-2" /> Back
                      </a>
                    </MDBTypography>
            <div className='d-flex justify-content-center mt-3'>
                <h1>Exam Questions Releted {currentUser.skills}</h1>
            </div>
            <div className='d-flex flex-column justify-content-center mt-2 p-5' >
            <div className='question-box' style={{height:'500px',width:'100%',padding:'10px',border:"5px solid black",borderRadius:'5px',overflow:'scroll',scrollbarWidth:'none'}}>
            {data && data.map((question, index) => (
                        <div key={index} className='question d-flex m-5'>
                            <h5>{index+1}<span></span></h5>
                            <h5 className='ms-3'>{question.question}</h5>
                        </div>
                    ))}
            </div>
               
            </div>
            <div>
            
            </div>
            <div className='d-flex justify-content-center mt-2'>
                <div className='file-box' style={{ height: '100%', width:'fit-content', backgroundColor: 'black',color:'white' }}>
                    {pdfURL && <embed src={pdfURL} type="application/pdf" width="100%" height="100%" />}
                    <input type="file" onChange={handleFileChange} />
                </div>
            </div>
            <div className='d-flex justify-content-center mt-2'>
                <Button
                    className='upload mb-2 shadow'
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    onClick={handleUpload}
                >
                    Upload file
                </Button>
            </div>
            <ToastContainer theme='colored' autoClose='2000' />
        </div>
        </>
    )
}

export default Exam