import mongoose from "mongoose";

const Connection = async () => {
  const URL = process.env.DB;
  const connParams = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  };
  try {
    mongoose.connect(URL, connParams);
    console.log("Database Connected Succesfully");
  } catch (error) {
    console.log("Error: ", error.message);
  }
};

export default Connection;
