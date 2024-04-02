import React from 'react'
import '../Pages/ChatPage.css'


function ChatPage() {
  const { selectedUserId, selectedUserName } = useUser();
  const [message, setMessage] = useState('');

  const handleMessageSend = () => {
    if (message.trim() === '') {
      return;
    }
    axios.post(`http://localhost:8000/api/send-message/${selectedUserId}/`, {
      message: message
    })
    .then(response => {
      console.log('Message sent successfully:', response.data);
      // Optionally, you can display a success message or update the chat UI
    })
    .catch(error => {
      console.error('Error sending message:', error);
      // Handle error
    });

    // Clear the message input field after sending the message
    setMessage('');
  };

    
  return (
    <div style={{height:'100%'}}>
      {/* <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet"> */}
<div class="container justify-content-center mt-3" >
<div class="row bootstrap snippets bootdeys" >
    <div class="col-md-10" >
      <div class="box box-primary direct-chat direct-chat-primary">
        <div class="box-header with-border">
    
         
        </div>
        <div class="box-body">
          <div class="direct-chat-messages">
            <div class="direct-chat-msg">
              <div class="direct-chat-info clearfix">
                <span class="direct-chat-name pull-left">{selectedUserName}</span>
                <span class="direct-chat-timestamp pull-right">23 Jan 2:00 pm</span>
              </div>
              <div class="direct-chat-text shadow border"  style={{maxWidth:'300px',marginright:'610px'}}>
                Is this template really for free? That's unbelievable!
              </div>
            </div>
    
            <div class="direct-chat-msg right">
              <div class="direct-chat-info clearfix" style={{maxWidth:'300px',marginLeft:'690px'}}>
                <span class="direct-chat-timestamp pull-left">23 Jan 2:05 pm</span>
                <span class="direct-chat-name pull-right">Sarah Bullock</span>
              </div>
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
              <input type="text" name="message" placeholder="Type Message ..." class="form-control" value={message} onChange={(e)=>setMessage(e.target.value)}/>
                  <span class="input-group-btn">
                    <button type="submit" onClick={handleMessageSend} class="btn btn-primary btn-flat">Send</button>
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