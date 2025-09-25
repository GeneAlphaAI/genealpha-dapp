import axios from "axios";
const llamaAPI = process.env.DEFI_LLAMA_URL;
const genealphaAPI = process.env.GENEALPHA_API_URL;
const genealphaAgentAPI = process.env.GENEALPHA_AGENT_API;
const genealphaTrainingAPI = process.env.GENEALPHA_TRAINING_API;
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

      if (predictionResponse.status === 200) {
        return predictionResponse;
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

export async function GetAllJobs(
  address,
  limit = 100,
  offset = 0,
  status = ""
) {
  try {
    const response = await axios.get(
      `${genealphaTrainingAPI}/training/jobs?user_id=${address}`,
      {
        params: {
          limit,
          offset,
          status,
        },
        headers: {
          accept: "application/json",
        },
      }
    );

    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.error("Error fetching jobs:", error.message);
    return error?.response;
  }
}

export async function GetAllJobsStats() {
  try {
    const response = await axios.get(
      `${genealphaTrainingAPI}/jobs/stats/summary`,
      {
        headers: {
          accept: "application/json",
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching job stats:", error.message);
    return error?.response;
  }
}

export async function CancelJob(jobId) {
  try {
    const response = await axios.delete(
      `${genealphaTrainingAPI}/jobs/${jobId}`,
      {
        headers: {
          accept: "application/json",
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching job stats:", error.message);
    return error?.response;
  }
}

export async function GetJobStatus(address, jobId) {
  try {
    const response = await axios.get(
      `${genealphaTrainingAPI}/training/jobs/${jobId}?user_id=${address}`,
      {
        headers: {
          accept: "application/json",
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching job stats:", error.message);
    return error?.response;
  }
}

export async function GetAllModels() {
  try {
    const response = await axios.get(
      `${genealphaTrainingAPI}/training/models`,
      {
        headers: {
          accept: "application/json",
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching job stats:", error.message);
    return error?.response;
  }
}

export async function StartModelTraining(payload) {
  const response = await axios.post(
    `${genealphaTrainingAPI}/training/start`,
    payload,
    {
      headers: {
        accept: "application/json",
      },
    }
  );
  console.log(response);

  return response;
}

export async function GetPipelineHealth() {
  try {
    // Call both APIs in parallel
    const [healthRes, readyRes] = await Promise.all([
      axios.get(`${genealphaTrainingAPI}/health/`, {
        headers: { accept: "application/json" },
      }),
      axios.get(`${genealphaTrainingAPI}/health/ready`, {
        headers: { accept: "application/json" },
      }),
    ]);

    const healthStatus = healthRes?.data?.status;
    const readyStatus = readyRes?.data?.ready;

    // Check conditions
    if (healthStatus === "healthy" && readyStatus === true) {
      return { isHealthy: true, health: healthRes.data, ready: readyRes.data };
    } else {
      return { isHealthy: false, health: healthRes.data, ready: readyRes.data };
    }
  } catch (error) {
    console.error("Error fetching pipeline health:", error.message);
    return { ok: false, error: error?.response?.data || error.message };
  }
}

export async function DeleteAgent(address, name) {
  console.log(name, address);
  try {
    const response = await axios.delete(`${genealphaAgentAPI}/user/agent`, {
      params: {
        wallet_address: address,
        agent_name: name,
      },
      headers: {
        accept: "application/json",
      },
    });

    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.error("Error deleting", error.message);
    return error?.response;
  }
}

export async function UpdateAgent(payload) {
  try {
    const response = await axios.put(
      `${genealphaAgentAPI}/user/agent/update`,
      payload,
      {
        headers: {
          accept: "application/json",
        },
      }
    );

    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.error("Error deleting", error.message);
    return error?.response;
  }
}
