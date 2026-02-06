import "./Chatwindow.css";
import Chat from "./Chat.jsx";
import { SomeContext } from "./SomeContext.jsx";
import { useContext, useState , useEffect} from "react";
import {ScaleLoader} from "react-spinners";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8081";


function Chatwindow(){
const { prompt, setPrompt,reply, setReply, currThreadId, setCurrThreadId , prevChats, setPrevChats, setNewChat} = useContext(SomeContext);
const [loading, SetLoading] = useState(false);
const [isOpen, setIsOpen] = useState(false);

const getReply = async () => {
    SetLoading(true);
    console.log("message:", prompt, "threadId", currThreadId);
    const options = {
       method: "POST",
       headers: {
        "Content-Type": "application/json"
       },
       body: JSON.stringify({
        message: prompt,
        threadId: currThreadId
       })
        };
        try{
          const response =  await fetch(`${API_URL}/api/chat`, options);
          const res = await response.json();
          console.log(res);
          setReply(res.reply);
        }catch(err) {
            console.log(err);
        }
        SetLoading(false);
    } 
    //append new chat to prevchats
       useEffect(() => {
        if(prompt && reply) {
            setPrevChats(prevChats => [
                ...prevChats, 
                {
                   role: "user",
                   content: prompt 
                },
                {
                   role: "assistant",
                   content: reply 
                }
            ]);
        }
        
          setPrompt("");
       }, [reply]);

     const handleProfileClick = () => {
        setIsOpen(!isOpen);
     }

    return(
    <div className="chatwindow">
        <div className="navbar">
            <span>GPT <i className="fa-solid fa-chevron-down"></i></span>
            <div className="usericon" onClick={handleProfileClick}>
            <span className="useri"> <i className="fa-solid fa-user"></i></span>
            </div>
       </div>
   
         <Chat></Chat>   
        <ScaleLoader color="#fff" loading={loading}> 

        </ScaleLoader>  
        <div className="chatinput">
            <div className="userinput">
                <input placeholder="Ask anything"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter'? getReply() :''}
                />

               
                <div id="submit" onClick={getReply}><i className="fa-solid fa-paper-plane"></i></div>
            </div>
            <p className="info">
                GPT can make mistakes, Check important info. See cookie preferences.
            </p>
        </div>
    </div>
    )
}

export default Chatwindow;