function updateJam() {
  const sekarang = new Date();

  // Format angka jam, menit, detik agar selalu 2 digit (contoh: 09:05:02)
  const jam = String(sekarang.getHours()).padStart(2, '0');
  const menit = String(sekarang.getMinutes()).padStart(2, '0');
  const detik = String(sekarang.getSeconds()).padStart(2, '0');

  document.getElementById('jam').textContent = `${jam}:${menit}:${detik}`;

  // Format hari dan tanggal Indonesia
  const opsiTanggal = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  document.getElementById('tanggal').textContent = sekarang.toLocaleDateString('id-ID', opsiTanggal);
}

// Jalankan langsung saat dibuka dan perbarui setiap 1 detik
updateJam();
setInterval(updateJam, 1000);


