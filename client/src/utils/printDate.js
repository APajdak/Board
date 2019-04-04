export default dateStr => {
  const date = new Date(dateStr);
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();
  const h = date.getHours();
  const min = date.getMinutes();
  const s = date.getSeconds();
  return `${h}:${min}:${s} ${d}/${m}/${y}`;
};