import React, { useEffect, useState } from 'react'
import '../Pages/ChatPage.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ChatPage() {

  const { userId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, [userId]);

  const fetchMessages = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.post(`http://localhost:8000/api/send-message/${userId}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setMessages(response.data);
    } catch (error) {
      // Handle authentication or authorization errors
      if (error.response && error.response.status === 401) {
        setError('Unauthorized: You are not authorized to access this page.');
      } else {
        setError('Error fetching messages. Please try again later.');
        console.error('Error fetching messages:', error);
      }
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem('token');
      await axios.post(`http://localhost:8000/api/send-message/${userId}/`, {
        message: newMessage,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNewMessage('');
      // After sending the message, refetch messages to update the chat
      fetchMessages();
    } catch (error) {
      setError('Error sending message. Please try again later.');
      console.error('Error sending message:', error);
    }
  };
  return (
    <div style={{height:'100%'}}>
      {/* <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet"> */}
<div class="container justify-content-center mt-3" >
<div class="row bootstrap snippets bootdeys" >
    <div class="col-md-10" >
      <div class="box box-primary direct-chat direct-chat-primary">
        <div class="box-header with-border">
    
          {/* <div class="box-tools pull-right">
            <span data-toggle="tooltip" title="" class="badge bg-light-blue" data-original-title="3 New Messages">3</span>
            <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
            </button>
            <button type="button" class="btn btn-box-tool" data-toggle="tooltip" title="Contacts" data-widget="chat-pane-toggle">
              <i class="fa fa-comments"></i></button>
            <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
          </div> */}
        </div>
        <div class="box-body">
          <div class="direct-chat-messages">
            <div class="direct-chat-msg">
              <div class="direct-chat-info clearfix">
                <span class="direct-chat-name pull-left">Alexander Pierce</span>
                <span class="direct-chat-timestamp pull-right">23 Jan 2:00 pm</span>
              </div>
              {/* <img class="direct-chat-img" src="https://bootdey.com/img/Content/user_1.jpg" alt="Message User Image"><!-- /.direct-chat-img --> */}
              <div class="direct-chat-text shadow border"  style={{maxWidth:'300px',marginright:'610px'}}>
                Is this template really for free? That's unbelievable!
              </div>
            </div>
    
            <div class="direct-chat-msg right">
              <div class="direct-chat-info clearfix" style={{maxWidth:'300px',marginLeft:'690px'}}>
                <span class="direct-chat-timestamp pull-left">23 Jan 2:05 pm</span>
                <span class="direct-chat-name pull-right">Sarah Bullock</span>
              </div>
              {/* <img class="direct-chat-img" src="https://bootdey.com/img/Content/user_2.jpg" alt="Message User Image"><!-- /.direct-chat-img --> */}
              <div class="direct-chat-text shadow border" style={{maxWidth:'300px',marginLeft:'610px'}} >
                You better believe it!
              </div>
            </div>
          </div>
    
          <div class="direct-chat-contacts">
            <ul class="contacts-list">
              <li>
                <a href="#">
                  {/* <img class="contacts-list-img" src="https://bootdey.com/img/Content/user_1.jpg"> */}
    
                  <div class="contacts-list-info">
                        <span class="contacts-list-name">
                          Count Dracula
                          <small class="contacts-list-date pull-right">2/28/2015</small>
                        </span>
                    <span class="contacts-list-msg">How have you been? I was...</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="box-footer">
          <form action="" method="">
            <div class="input-group">
              <input type="text" name="message" placeholder="Type Message ..." class="form-control"/>
                  <span class="input-group-btn">
                    <button type="submit" class="btn btn-primary btn-flat">Send</button>
                  </span>
            </div>
          </form>
        </div>
      </div>
    </div>
</div>
</div>
    </div>
  )
}

export default ChatPage