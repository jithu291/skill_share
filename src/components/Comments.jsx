import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Collapse } from 'react-bootstrap'
import { IoIosSend } from "react-icons/io";


function Comments({ Id }) {

    const [open, setOpen] = useState(false);
    const [text, setText] = useState('')
    const [comments, setComments] = useState([]);

    const fetchComments = async () => {
        try {
            const token = sessionStorage.getItem('token')
            const response = await axios.get(`http://localhost:8000/api/comment/${Id}/`, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            setComments(response.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    useEffect(() => {
        fetchComments();
    }, []);



    const handleCommentSubmit = async (e) => {
        e.preventDefault()
        console.log(text);
        if (!text) {
            alert('Please type  a comment!')
            return
        }
        try {
            const commentData = new FormData()
            commentData.append('text', text)

            const token = sessionStorage.getItem('token');
            const response = await axios.post(`http://localhost:8000/api/comment/${Id}/`, commentData,
                {
                    headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/json'
                    }
                },
            )
            console.log("comment posted successfully");
            console.log(response.data);
            setText('')


        } catch (error) {
            console.log("error in adding comment", error);

        }
    }


    return (
        <>
            <Button
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
                style={{ marginTop: '-66px' }}
            >
                <i class="fa-solid fa-comment"></i>
            </Button>
            <Collapse in={open}>
                <div id="example-collapse-text">

                    <form className='d-flex justify-content' onSubmit={handleCommentSubmit}>
                        <div class="mb-3  flex-column">
                            <label class="form-label">Add a comment</label>
                            <input
                                type="text"
                                class="form-control"
                                aria-describedby="emailHelp"
                                style={{ width: '400px' }}
                                value={text}
                                onChange={(e) => setText(e.target.value)} />
                        </div>
                        <button className='btn border rounded bg-primary ' style={{ width: '50px', height: '38px', marginTop: '31px' }} type='submit'>
                            <IoIosSend size={25} color='white' className='mt-' />
                        </button>
                    </form>

                    <div className='commentBox border rounded' style={{ height: '150px' }}>
                        <div>
                            {comments.map((comment, index) => (
                                <div key={index} className='border rounded mt-2 ms-2 shadow' style={{width:'560px'}}>
                                    <p style={{ fontSize: '10px', }} className='ms-2'>{new Date(comment.created_date).toLocaleDateString()}</p>
                                    <h6 style={{marginTop:'-17px'}} className='ms-2'> {comment.text}</h6>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Collapse>


        </>
    )
}

export default Comments