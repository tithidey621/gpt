import express from "express";
import Thread from "../model/threads.js";
import getGeminiResponse from "../utils/openai.js";
 
const router = express.Router();

//test
router.post("/test", async(req, res) => {
    try{
        const thread = new Thread({
            threadId: "abc",
            title: "Testing New Thread2"
        });

       const response = await thread.save();
       res.send(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error: "failed to save in database"});
        
      }
});

//get all threads
router.get("/threads", async(req, res) => {
    try{
        const threads = await Thread.find({}).sort({updatedAt: -1});
       //descending order of updatedAt(most resent data swoing in top)
       res.json(threads);
    } catch(err) {
        console.log(err);
        res.status(500).json({error: "failed to fetch threads"});
    }
});

// return message of perticular
router.get("/threads/:threadId", async(req, res) => {
   const {threadId} = req.params; 
    try {
    const thread = await Thread.findOne({threadId});
    if(!thread) {
      return res.status(404).json({error: "Thread not found"});
    }
    res.json(thread.messages);

    }catch(err){
        console.log(err);
        res.status(500).json({error: "failed to fetch chat"});
    }
});

//delete route of perticular
router.delete("/threads/:threadId", async (req, res) => {
  const {threadId} = req.params;
    try{
   const deleteThread = await Thread.findOneAndDelete({threadId});

   if(!deleteThread){
    return res.status(404).json({error: "Thread could not be deleted(not found)"});

  }
    res.status(200).json({success: "Thread deleted sucessfully" });

  } catch(err) {
    console.log(err);
    res.status(500).json({error: "failed to fetch thread"});
  } 
});

router.post("/chat", async (req , res) => {
  const {threadId , message} = req.body;
  if(!threadId || !message) {
    return res.status(400).json({error: "missing required information"});
  }
  try{
   let thread = await Thread.findOne({threadId});
   if(!thread) {
    //create a new thread in DB
    thread = new Thread({
      threadId,
      title: message,
      messages: [{role: "user", content: message}]
    });
   }else{
    thread.messages.push({role: "user", content: message});
   }

   const assistanceReply = await getGeminiResponse(message);
   console.log("AI reply from OpenAI:", assistanceReply);
   
   thread.messages.push({role: "assistant", content: assistanceReply});
   thread.updatedAt = new Date();
   await thread.save();
   res.json({reply: assistanceReply});


  }catch(err) {
    console.log("chat route error:",err);
    res.status(500).json({
      error: "somthing went wrong",
      details : err.message
    });
  }
});


export default router;