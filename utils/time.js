export function getMins(ms) {
  const value = Math.floor(ms / 1000 / 60 % 60);
  return ("00" + value.toString()).slice(-2);
};

export function getSecs(ms) {
  const value = Math.floor(ms / 1000 % 60);
  return ("00" + value.toString()).slice(-2);
};