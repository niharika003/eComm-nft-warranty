import axios from "axios";

export default async (req, res) => {
  try {
    const response = await axios.get("http://localhost:8080/transactions");
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(error.response?.status || 500).json({
      message: error.message || "Something went wrong",
    });
  }
};
