import axios from "axios";

export default async function handler(req, res) {
  try {
    const { pid } = req.query;
    const response = await axios.patch(
      `http://localhost:8080/updateStatusAndOwnerNFT/${pid}`,
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
