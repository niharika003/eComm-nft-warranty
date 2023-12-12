import axios from "axios";

export default async function handler(req, res) {
  try {
    const response = await axios.post(
      "http://localhost:8080/associateNFT",
      req.body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
}
