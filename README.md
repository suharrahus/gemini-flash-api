# Proyek Chatbot Gemini AI

Ini adalah proyek chatbot sederhana berbasis web yang menggunakan kekuatan model AI generatif Google, `gemini-flash`, melalui API. Aplikasi ini terdiri dari backend Node.js/Express yang menangani logika API dan frontend HTML, CSS, dan JavaScript sederhana untuk antarmuka pengguna.

## Fitur

- **Antarmuka Chat Sederhana**: UI yang bersih dan minimalis untuk berinteraksi dengan AI.
- **Backend Express.js**: Server yang kuat untuk menangani permintaan ke Gemini API.
- **Integrasi Gemini API**: Menggunakan pustaka `@google/genai` untuk menghasilkan respons teks.
- **Dukungan Multimodal**: Backend sudah disiapkan untuk menangani input berupa gambar, dokumen, dan audio (memerlukan pengembangan UI lebih lanjut).
- **Konfigurasi Mudah**: Menggunakan file `.env` untuk mengelola kunci API dengan aman.

## Tumpukan Teknologi

*   **Backend**:
    *   Node.js
    *   Express.js
    *   @google/genai
    *   dotenv
    *   multer (untuk upload file)
    *   cors

*   **Frontend**:
    *   HTML5
    *   CSS3
    *   JavaScript (Vanilla)

## Prasyarat

Sebelum memulai, pastikan Anda telah menginstal perangkat lunak berikut:
- Node.js (disarankan versi 20 atau lebih baru)
- npm (biasanya terinstal bersama Node.js)

Anda juga akan memerlukan **Kunci API Gemini**. Anda bisa mendapatkannya dari Google AI Studio.

## Instalasi dan Pengaturan

Ikuti langkah-langkah ini untuk menyiapkan dan menjalankan proyek di lingkungan lokal Anda.

1.  **Clone repositori ini (atau unduh file-filenya):**
    ```bash
    git clone <url-repositori-anda>
    ```

2.  **Masuk ke direktori proyek:**
    ```bash
    cd gemini-flash-api
    ```

3.  **Instal semua dependensi yang diperlukan:**
    ```bash
    npm install
    ```

4.  **Buat file `.env` di direktori root proyek:**
    File ini akan menyimpan kunci API rahasia Anda.
    ```bash
    # Gunakan perintah ini di Linux/macOS/Git Bash
    touch .env

    # Atau buat file secara manual di Windows
    ```

5.  **Tambahkan Kunci API Gemini Anda ke file `.env`:**
    Buka file `.env` dan tambahkan baris berikut, ganti `KUNCI_API_ANDA_DI_SINI` dengan kunci asli Anda.
    ```
    GEMINI_API_KEY=KUNCI_API_ANDA_DI_SINI
    ```

## Menjalankan Aplikasi

1.  **Jalankan server backend:**
    ```bash
    node index.js
    ```
    Anda akan melihat pesan di terminal yang menandakan server berjalan di port 3000:
    `Server is running on http://localhost:3000`

2.  **Buka aplikasi di browser Anda:**
    Buka browser web dan kunjungi alamat berikut:
    http://localhost:3000

    Sekarang Anda dapat mulai mengobrol dengan Gemini AI!