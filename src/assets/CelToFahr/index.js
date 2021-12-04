const CelToFhar = (cel) => {
  const fhar = (cel * 9) / 5 + 32;
  return fhar;
};

export default CelToFhar;
