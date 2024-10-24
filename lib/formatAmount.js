const formatAmount = (amount, decimals = 5) => {
  return amount !== 0
    ? amount < 1 / 10 ** decimals
      ? "<" + 1 / 10 ** decimals
      : Number(amount).toFixed(decimals)
    : "0";
};

export default formatAmount;
