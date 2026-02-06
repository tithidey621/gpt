import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";


const app = express();
const PORT = process.env.PORT || 8081;

app.use(express.json());
app.use(cors({
    origin:[
        'http://localhost:5173',
        'https//gpt-frontend-8bnc.onrender.com'
    ],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api", chatRoutes);
 app.get("/",(req, res) =>{
    res.send("gpt api server running")
 });
app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
    connectDB();
});

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("connected with database");
    }catch(err){
        console.log("failed to connect with db!",err);
    }
}
