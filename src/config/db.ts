import mongoose from "mongoose";

if (!process.env.MONGODB_URL) {
  throw new Error("MONGODB_URL is not defined in environment variables.");
}

mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    console.log("Connection Successful!")
})
.catch((e) => {
    console.log("Connection unsuccessful: ", e)
})