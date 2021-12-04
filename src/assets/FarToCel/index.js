const FharToCel = (fhar) => {
  const cel = ((fhar - 32) * 5) / 9;
  return cel;
};

export default FharToCel;
