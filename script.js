// Menunggu semua konten HTML selesai dimuat secara utuh
document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. HAMBURGER MENU (Buka Tutup Menu Mobile)
    // ==========================================================================
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            // Memberikan atau menghapus kelas 'active' pada menu daftar link
            navLinks.classList.toggle('active');
            // Efek animasi simpel tombol hamburger menjadi silang
            menuToggle.classList.toggle('toggle-style');
        });

        // Menutup menu kembali jika salah satu item link diklik
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // ==========================================================================
    // 2. SMOOTH SCROLL (Efek Gulir Halus Klik Navigasi)
    // ==========================================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            // Pastikan link memiliki tujuan id konkrit (bukan '#' saja)
            if (targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ==========================================================================
    // 3. ANIMASI REVEAL ON SCROLL (Muncul Halus saat Digulir)
    // ==========================================================================
    // Menambahkan kelas 'reveal' ke seluruh section secara dinamis
    const sections = document.querySelectorAll('.section');
    sections.forEach(sec => sec.classList.add('reveal'));

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 150; // Jarak piksel sebelum section terlihat penuh

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;

            if (sectionTop < windowHeight - revealPoint) {
                section.classList.add('active');
            }
        });
    };

    // Jalankan fungsi saat halaman pertama dimuat dan setiap kali discroll
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Triger awal jika elemen teratas sudah masuk layar luar
});

// ==========================================================================
// 4. FALLBACK GAMBAR EROR (Penanganan Jika URL Link Gambar Rusak)
// ==========================================================================
function imgError(image) {
    // Ambil teks alt yang disiapkan dari elemen HTML asal sebagai info penanda
    const altText = image.alt || "Gambar Tugas Kelompok";
    
    // Membuat element kotak pengganti (div)
    const fallbackDiv = document.createElement('div');
    fallbackDiv.className = 'img-fallback';
    fallbackDiv.style.width = '100%';
    // Menyamakan tinggi proporsional sesuai tipe penempatan gambar
    fallbackDiv.style.height = image.className === 'avatar-container img' ? '110px' : '250px';
    fallbackDiv.innerText = `[${altText} - Belum Ditambahkan/Link Rusak]`;

    // Mengganti elemen img asli dengan div penanda error
    image.parentNode.replaceChild(fallbackDiv, image);
}