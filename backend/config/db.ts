import mongoose from "mongoose";

const connectDB = async () => {
    try {
        let conn = await mongoose.connect(process.env.MONGO_URI as "string");
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (e: any) {
        console.log(`Error connection to the DB: ${e.message}`);
        process.exit(1);
    }
};

export default connectDB;
