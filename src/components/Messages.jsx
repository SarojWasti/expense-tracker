import { addDoc, collection, limit, orderBy, query, Timestamp } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../services/firebase";
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const Messages = ({user}) => {
    const messagesRef = collection(firestore,"messageStore");
    const [userMsg, setUserMsg] = useState('');
    const bottomRef = useRef(null);

    const [getMessages] = useCollectionData(
        query(messagesRef, orderBy("timestamp"), limit(25)),
        {idField: 'id'}
    );

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [getMessages]);

    const handleMessages = async() => {
        const msgData = {
            text: userMsg,
            userID: user.uid,
            timestamp: Timestamp.fromDate(new Date()),
            photo: user.photoURL,
            userName: user.displayName,
        };
        if(userMsg.trim()) {
            setUserMsg('');
            await addDoc(messagesRef, msgData);
        }
    }

    const enterEvent = (e) => {
        if(e.key === 'Enter' && !e.shiftKey){
            e.preventDefault();
            handleMessages();
        }
    }

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)] max-w-5xl  bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b bg-gray-50">
                <h2 className="text-xl font-semibold text-gray-800">General Chat</h2>
            </div>

            {/* Messages Container */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-4">
                {getMessages && getMessages.map((eachMsg) => (
                    <div 
                        key={eachMsg.id}
                        className={`flex items-start gap-3 ${
                            eachMsg.userID === user?.uid ? "flex-row-reverse" : ""
                        }`}
                    >
                        <img
                            src={eachMsg.userID === user.uid ? user.photoURL : eachMsg.photo}
                            alt="User Avatar"
                            className="w-8 h-8 rounded-full ring-2 ring-white"
                        />
                        <div className="flex flex-col">
                            <div 
                                className={`p-3 rounded-2xl max-w-md break-words ${
                                    eachMsg.userID === user?.uid 
                                        ? "bg-blue-500 text-white rounded-tr-none" 
                                        : "bg-white text-gray-800 rounded-tl-none shadow-sm"
                                }`}
                            >
                                {eachMsg.text}
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t">
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={userMsg}
                        onChange={(event) => setUserMsg(event.target.value)}
                        onKeyDown={enterEvent}
                        className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 
                                 rounded-full focus:outline-none focus:ring-2 
                                 focus:ring-blue-500 focus:border-transparent 
                                 transition-all duration-200"
                    />
                    <button 
                        onClick={handleMessages} 
                        disabled={!userMsg.trim()}
                        className={`p-2 rounded-full transition-all duration-200 ${
                            userMsg.trim() 
                                ? "bg-blue-500 hover:bg-blue-600 text-white" 
                                : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                    >
                        <FontAwesomeIcon icon={faPaperPlane} className="text-lg" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Messages;