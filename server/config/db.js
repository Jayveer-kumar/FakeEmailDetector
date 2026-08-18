import mongoose from "mongoose";

const connectDb = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database is connected successfully : ");     
    } catch (error) {
        console.error("Some Error while connecting to Database : ");
    }
}

export default  connectDb