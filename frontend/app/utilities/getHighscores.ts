import axios from "axios";

export const getHighscores = async () => {
  try {
    const response = await axios.get("http://localhost:5000/");
    return response
  } catch (error) {
    console.error(error);
  }
};
