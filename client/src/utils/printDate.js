export default dateStr => {
  const date = new Date(dateStr);
  const d = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const m =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const y = date.getFullYear();
  const h = date.getHours();
  const min = date.getMinutes();
  const s =
    date.getSeconds() + 1 < 10
      ? `0${date.getSeconds() + 1}`
      : date.getSeconds();
  return `${d}/${m}/${y} ${h}:${min}:${s}`;
};
