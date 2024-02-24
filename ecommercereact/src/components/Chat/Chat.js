import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
function Chat() {


 
  const [messages, setMessages] = useState([]);
  const [newMessage,setnewMessage] = useState("");

  const userId = localStorage.getItem('id');
  const senderEmail = localStorage.getItem('email');
  const {id} = useParams();
  const formData = new URLSearchParams();

  useEffect(() => {
    fetch(`http://localhost:5000/chat/${userId}/${id}`)
      .then(response => response.json())
      .then(data => setMessages(data))
      .catch(error => console.error('Error fetching messages:', error));
  }, []);



  formData.append('product_id',id);
  formData.append('senderEmail',senderEmail);
   formData.append('senderId',userId);
   formData.append('senderType','user');
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
      fetch(`http://localhost:5000/chat/${userId}/${id}`)
      .then(response => response.json())
      .then(data => setMessages(data))
      .catch(error => console.error('Error fetching messages:', error));

      setnewMessage(" ");
            
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


  const HandleKeypress = (event)=>{
     if(event.key ==='Enter'){
      sendMessage(event);
     }
  };


  return (
    <>
      <div className="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900">
       <ToastContainer />
         <div class="flex flex-col items h-screen mb-1justify min-h-screen bg-gray-100 text-gray-800 flex-grow">
  <div class="flex flex-col flex-grow  shadow-xl rounded-lg overflow-hidden">
    <div class="flex flex-col flex-grow h-0 p-4 overflow-auto">

     {/*Map chat Data  here*/}
     {messages.map((message,index)=>(
       message.senderType ==='admin' ?(

          <div class="flex w-full mt-2 space-x-3 max-w-xs">
                   <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300">
                       <img className="w-full h-full mr-2 rounded-full" src={message.senderImage} alt="Admin Avatar" />
                   </div>
                
                   <div>
                   <div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                   <p class="text-sm">  {message.message} </p>
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
            <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"> 
            <img className="w-full h-full mr-2 rounded-full" src={message.senderImage} alt="Admin Avatar" />
            </div>
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
  );
}

export default Chat;
