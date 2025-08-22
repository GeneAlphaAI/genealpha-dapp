import axios from "axios";
const llamaAPI = process.env.DEFI_LLAMA_URL;
const genealphaAPI = process.env.GENEALPHA_API_URL;
const genealphaAgentAPI = process.env.GENEALPHA_AGENT_API;
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

export async function SearchInfluencer(username, walletAddress) {
  try {
    const influencerResponse = await axios.post(
      `${genealphaAgentAPI}/influencer/search`,
      {
        username,
        walletAddress,
      }
    );
    console.log(influencerResponse);

    if (influencerResponse.status === 200) {
      return influencerResponse;
    }
  } catch (error) {
    console.error("Error fetching iinfluencer", error.message);
    return error?.response;
  }
}

export async function CreateAgent(data) {
  try {
    const createAgentResponse = await axios.post(
      `${genealphaAgentAPI}/user/agent/create`,
      data
    );
    console.log(createAgentResponse);

    if (createAgentResponse.status === 200) {
      return createAgentResponse;
    }
  } catch (error) {
    console.error("Error fetching iinfluencer", error.message);
    return error?.response;
  }
}

export async function GetAgents(walletAddress) {
  try {
    const agentsResponse = await axios.get(
      `${genealphaAgentAPI}/user/agent/get?walletAddress=${walletAddress}`
    );
    if (agentsResponse.status === 200) {
      return agentsResponse;
    }
  } catch (error) {
    console.error("Error fetching iinfluencer", error.message);
    return error?.response;
  }
}
