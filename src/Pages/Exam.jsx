import React, { useEffect, useState } from 'react'
// import { Button } from 'react-bootstrap'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';

function Exam() {

    const [data, setData] = useState(null);
    const id = sessionStorage.getItem("id")
    const [accessToken, setAccessToken] = useState('');

    useEffect(()=>{
        const token = sessionStorage.getItem('token')
    if (token) {
      setAccessToken(token)
    
    }
        const fetchData = async ()=>{
            try{
                const response = await axios.get(`http://localhost:8000/examapi/questions/${id}/`,{
                    headers : {
                        Authorization: `Token ${token}`
                    }
                })
                setData(response.data)
            }catch (error){
                console.log('error fetching data:', error);

            }
        }
        fetchData();
    }, [id]);
   


    
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
        <div >
            <div className='d-flex justify-content-center mt-3'>
                <h2>Exam Questions</h2>
            </div>
            <div className='d-flex justify-content-center mt-2' >
                <textarea
                    value=''
                    rows={15}
                    cols={70}
                />
            </div>
            <div className='d-flex justify-content-center mt-2'>
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                >
                    Upload file
                    <VisuallyHiddenInput type="file" />
                </Button>
            </div>
        </div>
    )
}

export default Exam