import { addDoc, collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../services/firebase";
import { Timestamp } from "firebase/firestore";
import { useState } from "react";

const Messages = ({user}) =>{
    const messagesRef = collection(firestore,"messageStore");
    const [userMsg, setUserMsg] = useState('');

    const [getMessages] = useCollectionData(
      query(messagesRef, orderBy("timestamp"), limit(25)),
      { idField: "id" } // This should be correctly specified
    );
    
    const handleMessages = () =>{
      const msgData ={
        text: userMsg,
        userID: user.uid,
        timestamp: Timestamp.now(),
        photo: user.photoURL,
      };
      try{
        addDoc(messagesRef,msgData);
        setUserMsg('')
      }catch(error){
        console.error('This error: ',error);
      }
    }
    const enterEvent = (e) =>{
      if(e.key === 'Enter'){
        handleMessages();
      }
    }
    return (
      <div className="flex flex-col mt-12 w-full h-[80vh] max-w-4xl">
        <div className="flex-1 p-4 bg-gray-100 overflow-y-auto">
          {getMessages &&
            getMessages.map((eachMsg) => (
              
              <div key={eachMsg.id} className={`flex mb-2 ${eachMsg.userID == user?.uid ? "justify-end" : "justify-start"}`}>
                {eachMsg.userID !== user.uid &&(<img
                  src={eachMsg.photo}
                  alt="user"
                  className="w-8 h-8 rounded-full mr-2"
                />)}
                <div
                  className={`p-2 rounded-lg sm:max-w-[22rem] overflow-hidden max-h-[40rem] overflow-y-auto break-words
                    ${
                      eachMsg.userID == user?.uid ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`
                    }>
                      
                  {eachMsg.text}                  
                </div>

                {eachMsg.userID == user.uid &&(<img
                  src={user.photoURL}
                  alt="user"
                  className="w-8 h-8 rounded-full ml-2"
                />)}
              </div>
            ))}
        </div>
        <div className="flex p-4">
          <input
            type="text"
            placeholder="Type a message..."
            value={userMsg}
            onChange={(event)=>setUserMsg(event.target.value)}
            onKeyDown={enterEvent}
            className="flex-1 border border-gray-300 p-2 rounded-l-lg outline-none"
            
          />
          <button onClick={handleMessages} className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600">
            Send
          </button>
        </div>
      </div>
    );
    
    
}
export default Messages;