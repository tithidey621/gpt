import './App.css';
import Sidebar from './Sidebar.jsx';
import Chatwindow from './Chatwindow.jsx';
import { SomeContext } from "./SomeContext.jsx";
import { useState } from 'react';
import {v4 as uuidv4} from "uuid";


function App() {
  const[prompt, setPrompt] = useState("");
  const[reply, setReply] = useState(null);
  const [ currThreadId, setCurrThreadId ] = useState(uuidv4());
  const[prevChats, setPrevChats] = useState([]);// stores all  chats of curr thread
  const[newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]);
  
  const providerValues ={
    prompt, setPrompt,
    reply, setReply,
    currThreadId, setCurrThreadId ,
    newChat, setNewChat,
    prevChats, setPrevChats,
   allThreads, setAllThreads
  }; //passing value
  return(
    <div className='app'>
      <SomeContext.Provider value = {providerValues}>
      <Sidebar></Sidebar>
      <Chatwindow></Chatwindow>
    </SomeContext.Provider>
    </div>
  )
}

export default App ;
