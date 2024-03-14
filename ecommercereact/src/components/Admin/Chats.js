import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {Link} from 'react-router-dom'
import io from 'socket.io-client';
const socket = io('http://localhost:5000');

function Chats() {

  const {id} = useParams();
  const [users , setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage,setnewMessage] = useState("");
  const token = localStorage.getItem('token');
  const [userId,setUserID] = useState("");
  const senderEmail = localStorage.getItem('email');
 
  const formData = new URLSearchParams();
    
    
    useEffect(() => {
    fetch(`http://localhost:5000/chat/chatbyproduct/${id}`,
     {headers: {
            Authorization: `Bearer ${token}`,
        }
      }
      )
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching messages:', error));
  }, []);

    socket.on('message', (data) => {
           fetch(`http://localhost:5000/chat/chatbyproduct/${id}`,

     {headers: {
            Authorization: `Bearer ${token}`,
        }
      }
      )
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching messages:', error));
       return () => {
            socket.off('message');
        };
        });



  



  formData.append('product_id',id);
  formData.append('senderEmail',senderEmail);
   formData.append('senderId',userId);
   formData.append('senderType','admin');
   formData.append('message',newMessage);

 async function sendMessage(e){
      e.preventDefault();
      console.log(formData);
              try{
            const response =  await axios.post(`http://localhost:5000/chat/sendMessage/${userId}`, formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            });

            if (response.status === 201) {
              socket.emit('sendmessage', newMessage);

            toast(`👌 ${response.data.message}!`, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });

            
        }
        else{
             toast(`👌 ${response.data.message}!`, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
        }
        }catch(err){
             toast(`👌 ${err}!`, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
        }

      


  }


  function openChats(userId){
     setUserID(userId);
     fetch(`http://localhost:5000/chat/${userId}/${id}`)
      .then(response => response.json())
      .then(data => setMessages(data))
      .catch(error => console.error('Error fetching messages:', error));
  }

   const HandleKeypress = (event)=>{
     if(event.key ==='Enter'){
      sendMessage(event);
     }
  };

 
  return (
      <>
       



   <div className="p-4 flex pt-16  overflow-hidden bg-gray-50 dark:bg-gray-900 bg-white block sm:flex  border-b border-gray-200  dark:bg-gray-800 dark:border-gray-700">
         <ToastContainer />
        
       {/*Left side user list */}
        <div className="flex flex-col items-center min-h-screen bg-gray-100 text-gray-800 w-1/4">
  {users.map((user, index) => (
    <div key={index} className="flex flex-col mt-2 space-y-2 max-w-xs">
      <div className="flex items-center justify-between px-4 py-2 bg-white rounded-lg shadow-md">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div> {/* Placeholder for user avatar */}
          <div className="font-medium">{user.email}</div>
        </div>
        <button
          className="btn bg-primary-600 px-3 py-1 text-sm rounded-full"
          onClick={() => openChats(user._id)}
        >
          Open Chat
        </button>
      </div>
      <div className="px-4 py-2 bg-gray-300 rounded-lg rounded-bl-none">
        <p className="text-sm">Chat preview or last message</p> {/* Include chat preview or last message here */}
      </div>
      <span className="text-xs text-gray-500 leading-none">2 min ago</span>
    </div>
  ))}
</div>a

       {/*Right side container */}
       

       <div class="flex flex-col items h-screen mb-1justify min-h-screen bg-gray-100 text-gray-800 flex-grow">
  <div class="flex flex-col flex-grow  shadow-xl rounded-lg overflow-hidden">
    <div class="flex flex-col flex-grow h-0 p-4 overflow-auto">

     {/*Map chat Data  here*/}
     {messages.map((message,index)=>(
       message.senderType ==='user' ?(
          <div class="flex w-full mt-2 space-x-3 max-w-xs">
        <div>
          <div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
            <p class="text-sm">{message.message}</p>
          </div>
          <span class="text-xs text-gray-500 leading-none">{message.created_at}</span>
        </div>
      </div>
        ):(
           <div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
             <div>
              <div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
               <p class="text-sm">{message.message}</p>
              </div>
             <span class="text-xs text-gray-500 leading-none">{message.created_at}</span>
           </div>
        <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
      </div>
        )

      ))}
     {/*End map Function*/}
      

    </div>

    
     <div class="flex bg-gray-300 mb-20 p-4 pt-13">
      <input class="flex items-center ml-2 h-10 w-full rounded px-3 text-sm" value={newMessage}
              onChange={(e) =>setnewMessage(e.target.value)} 
               onKeyPress={HandleKeypress} type="text" placeholder="Type your message…"/>
      <button
       onClick={sendMessage}
        class="p-2 flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
              >
                <span>Send</span>
                <span class="ml-2">
                  <svg
                    class="w-4 h-4 transform rotate-45 -mt-px"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    ></path>
                  </svg>
                </span>
              </button>
    </div>
  </div>

</div>
      </div>
      </>
    )
}

export default Chats