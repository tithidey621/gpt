import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";


const app = express();
const PORT = process.env.PORT || 8081;

app.use(express.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api", chatRoutes);


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
