export default function numFormat(angka) {
  const data = Math.floor(angka);
  if (data == null) {
    data = 0;
  }
  return 'Rp. ' + data.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}
