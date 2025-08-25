// Helper function to format numbers with commas
export const formatValue = (value) => {
  // Check if the value is a number (not a string with letters)
  if (
    typeof value === "number" ||
    (typeof value === "string" && /^\d+$/.test(value))
  ) {
    return typeof value === "string"
      ? parseInt(value).toLocaleString()
      : value.toLocaleString();
  }
  // Return as-is for alphanumeric strings (like addresses)
  return value;
};

export function truncateMiddle(text, maxLength) {
  if (text?.length <= maxLength) return text;
  const half = Math.floor(maxLength / 2);
  return `${text?.slice(0, half)}...${text?.slice(-half)}`;
}

export const formatPrice = (price) => {
  if (!price || isNaN(price)) return 0;

  const num = Number(price);

  if (num < 1) {
    return Number(num.toPrecision(3));
  } else {
    return Number(num.toFixed(3));
  }
};
export function addPredictionsToAgents(agents) {
  if (!Array.isArray(agents)) {
    return [];
  }

  return agents.map((agent, agentIndex) => {
    const allTweets = (agent.accounts || []).reduce(
      (acc, account, accIndex) => {
        if (Array.isArray(account.tweets) && account.tweets.length > 0) {
          const mappedTweets = account.tweets.map((tweet, tweetIndex) => {
            return {
              ...tweet,
              account_info: account.account_info || {},
            };
          });

          acc.push(...mappedTweets);
        } else {
        }

        return acc;
      },
      []
    );

    const sortedTweets = allTweets.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

    return {
      ...agent,
      predictions: sortedTweets,
    };
  });
}
