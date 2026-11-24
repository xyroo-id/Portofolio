// 1. Efek ID Card Bisa Ditarik ke Mana-Mana & Membal Balik (Tanpa Teks)
const lanyard = document.getElementById('lanyard');
const idCard = document.getElementById('idCard');

let sedangDitarik = false;
let awalX = 0, awalY = 0;

function mulaiTarik(x, y) {
  sedangDitarik = true;
  awalX = x;
  awalY = y;
  lanyard.style.animation = 'none';
  lanyard.style.transition = 'none';
  idCard.style.transition = 'none';
}

function gerakTarik(x, y) {
  if (!sedangDitarik) return;
  const geserX = x - awalX;
  const geserY = y - awalY;
  const miringZ = geserX * 0.12;
  const rotasiY = geserX * 0.15;
  const rotasiX = -geserY * 0.15;

  lanyard.style.transform = `translate(${geserX * 0.6}px, ${geserY * 0.6}px) rotate(${miringZ}deg)`;
  idCard.style.transform = `rotateX(${rotasiX}deg) rotateY(${rotasiY}deg) scale(1.04)`;
}

function lepasTarik() {
  if (!sedangDitarik) return;
  sedangDitarik = false;

  lanyard.style.transition = 'transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1)';
  idCard.style.transition = 'transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1)';
  lanyard.style.transform = 'translate(0px, 0px) rotate(0deg)';
  idCard.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';

  setTimeout(() => {
    lanyard.style.animation = 'ayunHalus 4s ease-in-out infinite';
  }, 650);
}

idCard.addEventListener('touchstart', (e) => {
  e.preventDefault();
  mulaiTarik(e.touches[0].clientX, e.touches[0].clientY);
}, { passive: false });

window.addEventListener('touchmove', (e) => {
  if (sedangDitarik) gerakTarik(e.touches[0].clientX, e.touches[0].clientY);
});

window.addEventListener('touchend', lepasTarik);

idCard.addEventListener('mousedown', (e) => mulaiTarik(e.clientX, e.clientY));
window.addEventListener('mousemove', (e) => gerakTarik(e.clientX, e.clientY));
window.addEventListener('mouseup', lepasTarik);

// 2. Fungsi buka & tutup pop-up daftar projek
function bukaModal() {
  document.getElementById('modalProjek').style.display = 'flex';
}

function tutupModal() {
  document.getElementById('modalProjek').style.display = 'none';
}

// 3. Efek partikel cahaya melayang di latar belakang
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const titik = Array.from({ length: 45 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 2 + 0.5,
  dx: (Math.random() - 0.5) * 0.5,
  dy: (Math.random() - 0.5) * 0.5
}));

function gambarPartikel() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(56, 189, 248, 0.6)';
  titik.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });
  requestAnimationFrame(gambarPartikel);
}

gambarPartikel();

// 4. Interaksi Musik Playlist
let sedangPutar = false;

function togglePlay() {
  const btn = document.getElementById('btnPlayMain');
  const status = document.getElementById('statusText');
  sedangPutar = !sedangPutar;
  btn.textContent = sedangPutar ? '⏸' : '▶';
  status.textContent = sedangPutar ? '▶ Sedang memutar...' : '⏸ Dijeda';
}

function pilihLagu(elemen, judul, durasi) {
  document.querySelectorAll('.track-item').forEach(item => {
    item.classList.remove('active');
    item.querySelector('.play-icon').textContent = '▶';
  });

  elemen.classList.add('active');
  elemen.querySelector('.play-icon').textContent = 'ılılı';
  document.getElementById('durasiText').textContent = durasi;
  document.getElementById('statusText').textContent = '▶ ' + judul;
  document.getElementById('btnPlayMain').textContent = '⏸';
  sedangPutar = true;
}

// 5. Fungsi Ganti Tab di Bagian Portfolio Showcase
function gantiTab(namaTab, tombolAktif) {
  document.querySelectorAll('.tab-content').forEach(konten => {
    konten.classList.remove('active');
  });
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  document.getElementById('tab-' + namaTab).classList.add('active');
  tombolAktif.classList.add('active');
}

// 6. Tombol Ganti Tema (Biru-Hitam <-> Ungu-Hitam)
function gantiTema() {
  document.body.classList.toggle('tema-ungu');
  const isUngu = document.body.classList.contains('tema-ungu');
  const ikon = document.getElementById('btnTema');
  
  ikon.textContent = isUngu ? '☀' : '☾';
  ctx.fillStyle = isUngu ? 'rgba(192, 132, 252, 0.65)' : 'rgba(56, 189, 248, 0.6)';
}

// 7. Efek Teks Mengetik Otomatis (Typing Effect)
const daftarTeks = [
  "Creative Web Developer",
  "UI/UX & RGB Enthusiast",
  "GTA SA-MP & Gaming Fan",
  "Future Fullstack Coder"
];
let indeksTeks = 0;
let indeksHuruf = 0;
let sedangMenghapus = false;

function jalankanKetik() {
  const elemenKetik = document.getElementById('typingText');
  if (!elemenKetik) return;

  const teksSekarang = daftarTeks[indeksTeks];
  
  if (sedangMenghapus) {
    elemenKetik.textContent = teksSekarang.substring(0, indeksHuruf - 1);
    indeksHuruf--;
  } else {
    elemenKetik.textContent = teksSekarang.substring(0, indeksHuruf + 1);
    indeksHuruf++;
  }

  let kecepatan = sedangMenghapus ? 45 : 95;

  if (!sedangMenghapus && indeksHuruf === teksSekarang.length) {
    kecepatan = 1600;
    sedangMenghapus = true;
  } else if (sedangMenghapus && indeksHuruf === 0) {
    sedangMenghapus = false;
    indeksTeks = (indeksTeks + 1) % daftarTeks.length;
    kecepatan = 400;
  }

  setTimeout(jalankanKetik, kecepatan);
}
jalankanKetik();

// 8. Fungsi Salin Username
function salinTeks(teks) {
  navigator.clipboard.writeText(teks);
  alert('Username "' + teks + '" berhasil disalin!');
}
