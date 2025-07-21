import axios from "axios";

export async function GetPredictions(token) {
  try {
    if (token) {
      const url = `http://13.218.245.191:8000/predict/${token}`;
      const predictionResponse = await axios.get(url, {
        headers: {
          accept: "application/json",
        },
        data: { token: token },
      });
      console.log(predictionResponse);
      if (predictionResponse.status === 200) {
        return predictionResponse?.data?.data;
      } else {
        return "No Project Found";
      }
    } else {
      return "Error: UUID Not Found";
    }
  } catch (error) {
    return error.response;
  }
}
