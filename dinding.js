function gerakkanJarum() {
  const sekarang = new Date();

  const detik = sekarang.getSeconds();
  const menit = sekarang.getMinutes();
  const jam = sekarang.getHours();

  // Hitung sudut putaran (derajat) tiap jarum secara halus
  const derajatDetik = detik * 6;
  const derajatMenit = menit * 6 + detik * 0.1;
  const derajatJam = (jam % 12) * 30 + menit * 0.5;

  document.getElementById('jarum-detik').style.transform = `translateX(-50%) rotate(${derajatDetik}deg)`;
  document.getElementById('jarum-menit').style.transform = `translateX(-50%) rotate(${derajatMenit}deg)`;
  document.getElementById('jarum-jam').style.transform = `translateX(-50%) rotate(${derajatJam}deg)`;
}

gerakkanJarum();
setInterval(gerakkanJarum, 1000);

