document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  // --- Sticky header ---
  const header = document.querySelector("#navbar");
  window.addEventListener("scroll", () => {
    header.classList.toggle("sticky", window.scrollY > 50);
  });

  // --- Mobile menu toggle ---
  const menu = document.querySelector("#mobile-menu");
  const menuLinks = document.querySelector(".nav-links");
  menu?.addEventListener("click", () => {
    menu.classList.toggle("is-active");
    menuLinks.classList.toggle("active");
  });

  // close menu when a link is clicked
  document.querySelectorAll(".nav-links a").forEach((link) =>
    link.addEventListener("click", () => {
      menu.classList.remove("is-active");
      menuLinks.classList.remove("active");
    }),
  );

  // --- Typing effect for role ---
  const typingElement = document.getElementById("typing-role");
  const words = ["Web Developer"];
  let wordIndex = 0,
    charIndex = 0,
    isDeleting = false;

  function roleType() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      typingElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(roleType, 2000);
      return;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }

    setTimeout(roleType, isDeleting ? 50 : 150);
  }

  if (typingElement) roleType();

  // scroll to top on load (smooth)
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Tutup modal jika klik di luar gambar
window.onclick = function (event) {
  const modal = document.getElementById("certModal");
  if (event.target == modal) {
    closeCertModal();
  }
};

function openCertDetail(category) {
  const modal = document.getElementById("certModal");
  const title = document.getElementById("modalTitle");
  const gallery = document.getElementById("modalGallery");

  modal.style.display = "flex";

  // Logika sederhana untuk mengisi konten berdasarkan kategori
  if (category === "web-dev") {
    title.innerText = "Web Development Certificates";
    gallery.innerHTML = `
            <div class="gallery-item"><img src="img/cert/dicoding/dasar-pw.png" alt="dasar-pw"><p>Belajar Dasar Pemrograman Web</p></div>
            <div class="gallery-item"><img src="img/cert/dicoding/js.png" alt="js"><p>Belajar Dasar Pemrograman JavaScript</p></div>
            <div class="gallery-item"><img src="img/cert/dicoding/front-end.png" alt="front-end"><p>Belajar Membuat Front-End Web untuk Pemula</p></div>
            <div class="gallery-item"><img src="img/cert/dicoding/memulai-dasar-pemrograman-untuk-menjadi-pengembang-software.png" alt="memulai-dasar-pemrograman-untuk-menjadi-pengembang-software"><p>Memulai Dasar Pemrograman untuk Menjadi Pengembang Software</p></div>
            <div class="gallery-item"><img src="img/cert/dicoding/belajar-dasar-sql.png" alt="belajar-dasar-sql"><p>Belajar Dasar SQL</p></div>
            <div class="gallery-item"><img src="img/cert/dibimbing/webdev.png" alt="web dev"><p>Web Development Series 13.0

</p></div>
        `;
  }
  if (category === "ai") {
    title.innerText = "Artificial Intelegence Certificates";
    gallery.innerHTML = `
            <div class="gallery-item"><img src="img/cert/dicoding/belajar-dasar-ai.png" alt="belajar-dasar-ai"><p>Belajar Dasar AI</p></div>
            <div class="gallery-item"><img src="img/cert/dicoding/ai-praktis-untuk-produktivitas.png" alt="ai-praktis-untuk-produktivitas"><p>AI Praktis untuk Produktivitas</p></div>
            <div class="gallery-item"><img src="img/cert/dicoding/belajar-penggunaan-gen-ai.png" alt="belajar-penggunaan-gen-ai"><p>Belajar Penggunaan Generative AI</p></div>
            <div class="gallery-item"><img src="img/cert/dicoding/prompt-engineering-u-software-dev.png" alt="prompt-engineering-u-software-dev"><p>Prompt Engineering untuk Software Developer</p></div>
        `;
  }
  if (category === "other") {
    title.innerText = "Other Certificates";
    gallery.innerHTML = `
            <div class="gallery-item"><img src="img/cert/dicoding/belajar-dasar-visualisasi-data.png" alt="belajar-dasar-visualisasi-data"><p>Belajar Dasar Visualisasi Data</p></div>
            <div class="gallery-item"><img src="img/cert/dicoding/belajar-dasar-data-science.png" alt="belajar-dasar-data-science"><p>Belajar Dasar Data Science</p></div>
            <div class="gallery-item"><img src="img/cert/dibimbing/ui-ux.png" alt="ui-ux"><p>UI/UX Design</p></div>
        `;
  }
  // Tambahkan kategori lain di sini...
}

function closeCertModal() {
  const modal = document.getElementById("certModal");
  if (modal) modal.style.display = "none";
  document.body.style.overflow = "auto";
}

// Contact Form Handler

// window.addEventListener("load", function () {
//   const form = document.getElementById("my-form");
//   form.addEventListener("submit", function (e) {
//     e.preventDefault();
//     const data = new FormData(form);
//     const action = e.target.action;
//     fetch(action, {
//       method: "POST",
//       body: data,
//     }).then(() => {
//       alert("Pesan Terkirim!");
//     });
//   });
// });

const scriptURL =
  "https://script.google.com/macros/s/AKfycbw2o2Rqnz2Qt-aS7HlV5SLgB1YEZ-WPYFEo16F-Vj7ZWde19HsLL2ZhOmUrCt9X0484AA/exec";
const form = document.forms["submit-to-google-sheet"];

// Konfigurasi Toast (Desain notifikasinya)
const Toast = Swal.mixin({
  toast: true,
  position: "top-end", // Posisi di kanan atas
  showConfirmButton: false,
  timer: 3000, // Hilang otomatis setelah 3 detik
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // 1. Tampilkan Loading saat tombol ditekan
  // Kita panggil Swal.fire (bukan Toast) agar user tidak bisa klik apa-apa saat loading
  let loadingPopup = Swal.fire({
    title: "Sending...",
    html: "Please wait while we process your message.",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading(); // Menampilkan animasi putar-putar
    },
  });

  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      // 2. Jika Berhasil (Success)
      loadingPopup.close(); // Tutup loading

      Toast.fire({
        icon: "success", // Ikon centang hijau otomatis
        title: "Message sent successfully!",
      });

      form.reset(); // Bersihkan form
      console.log("Success!", response);
    })
    .catch((error) => {
      // 3. Jika Gagal (Error)
      loadingPopup.close(); // Tutup loading

      Toast.fire({
        icon: "error", // Ikon silang merah otomatis
        title: "Failed to send message.",
        text: "Please check your internet connection.",
      });

      console.error("Error!", error.message);
    });
});
