import axios from "axios";
const llamaAPI = process.env.DEFI_LLAMA_URL;
const genealphaAPI = process.env.GENEALPHA_API_URL;
export async function GetPredictions(token) {
  try {
    if (token) {
      const url = `${genealphaAPI}/predict`;
      const predictionResponse = await axios.post(
        url,
        { token: token },
        {
          headers: {
            accept: "application/json",
          },
        }
      );
      console.log(predictionResponse);
      if (predictionResponse.status === 200) {
        return predictionResponse?.data;
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

export async function GetEthPrice(address) {
  let COIN;
  if (address == "ETH") COIN = `coingecko:ethereum`;
  else COIN = `ethereum:${address}`;

  try {
    const priceResponse = await axios.get(`${llamaAPI}/${COIN}?searchWidth=6h`);

    if (Object.keys(priceResponse.data.coins).length > 0)
      return priceResponse.data.coins[COIN];
    else return 0;
  } catch (error) {
    if (error.response?.status === 429) {
      console.warn("Rate limit exceeded for price fetch:", address);
      return 0;
    }
    console.error("Error fetching cryptocurrency data:", error.message);
    return 0;
  }
}
