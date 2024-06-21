# Badut Discord

## Deskripsi
Badut Discord adalah sebuah skrip Python sederhana yang mengirimkan pesan acak ke saluran Discord dengan interval waktu tertentu.

## Fitur
- Mengirimkan pesan acak ke saluran Discord
- Dapat dikonfigurasi untuk mengatur interval waktu pengiriman pesan
- Menggunakan token otentikasi untuk mengakses API Discord

## Cara Penggunaan
1. Unduh atau klon skrip ini.
2. Buka terminal dan navigasikan ke direktori skrip berada.
3. Pastikan Anda telah menginstal dependensi yang dibutuhkan dengan menjalankan perintah berikut:

    ```bash
    pip install -r requirements.txt
    ```
4. Pastikan juga Anda telah menyiapkan file `pesan.txt` dan `token.txt` yang diperlukan.
5. Jalankan skrip dengan menjalankan perintah:
    ```bash
    python badut_discord.py
    ```
6. Masukkan ID channel Discord yang dituju dan set waktu kirim pesan saat diminta.
7. Skrip akan mulai mengirimkan pesan ke channel Discord yang dituju sesuai dengan interval waktu yang telah ditentukan.

## Kontribusi
Anda dapat berkontribusi pada pengembangan proyek ini dengan cara:
- Melaporkan masalah yang ditemukan.
- Mengirimkan permintaan fitur baru.
- Membuat pull request dengan perbaikan atau perubahan.

## Penulis
- [senimamsistem](https://github.com/senimamsistem)

## Lisensi
[MIT License](LICENSE)


Berikut adalah tambahan bagian untuk memasang `screen` dan menjalankan skrip di beberapa akun 24 jam:


## Menjalankan Skrip di Beberapa Akun

Untuk menjalankan skrip di beberapa akun Discord, Anda dapat menggunakan `screen` untuk mengatur sesi terpisah untuk setiap akun. Berikut langkah-langkahnya:

1. Pastikan Anda telah menginstal `screen` dengan menjalankan perintah berikut di terminal:
    ```bash
    sudo apt update
    sudo apt install screen
    ```

2. Buat folder untuk setiap akun di dalam direktori skrip. Misalnya:
    ```bash
    mkdir ~/badut/zeroland/folder-name
    ```

3. Salin file skrip ke folder yang sesuai untuk setiap akun. Misalnya:
    ```bash
    cp ~/badut/zeroland/main/* ~/badut/zeroland/folder-name/
    ```

4. Mulai sesi `screen` untuk setiap akun dengan menjalankan perintah:
    ```bash
    screen -S folder-name
    ```

5. Untuk memeriksa daftar sesi `screen` yang sedang berjalan, jalankan perintah:
    ```bash
    screen -ls
    ```

6. Untuk membuka sesi `screen` yang sudah ada, jalankan perintah:
    ```bash
    screen -r folder-name
    ```

Dengan menggunakan `screen`, Anda dapat menjalankan skrip di beberapa akun secara bersamaan dan memonitor statusnya dengan mudah. Jangan lupa untuk menyesuaikan nama folder sesuai dengan akun yang di gunakan.

