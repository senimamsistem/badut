const fs = require('fs');
const path = require('path');
const readlineSync = require('readline-sync');
const axios = require('axios');
const colors = require('colors');
const sleep = require('./src/sleep');
const { displayLogo } = require('./src/displayUtils');

displayLogo();

(async () => {
  await sleep(1000);

  const channelId = readlineSync.question("Masukkan ID channel: ");

  await sleep(1000);
  console.log("3");
  await sleep(1000);
  console.log("2");
  await sleep(1000);
  console.log("1");
  await sleep(1000);

  console.clear();

  // Mendapatkan direktori skrip yang sedang dijalankan
  const scriptDir = __dirname;

  // Membaca token dari file
  const tokens = fs.readFileSync(path.join(scriptDir, "token.txt"), "utf8").split('\n').filter(Boolean);

  // Membaca pesan dari file yang berbeda untuk setiap akun
  const messages = tokens.map((_, i) => {
    return fs.readFileSync(path.join(scriptDir, `pesan_${i + 1}.txt`), "utf8").split('\n').filter(Boolean);
  });

  while (true) {
    // Membuat daftar indeks akun dan mengacaknya
    const indices = Array.from({ length: tokens.length }, (_, i) => i);
    indices.sort(() => Math.random() - 0.5);

    for (const i of indices) {
      const token = tokens[i];
      // Pilih pesan acak dari daftar pesan untuk akun ini
      const pesanAcak = messages[i][Math.floor(Math.random() * messages[i].length)].trim();

      const payload = {
        content: pesanAcak
      };

      const headers = {
        'Authorization': token
      };

      try {
        const response = await axios.post(`https://discord.com/api/v9/channels/${channelId}/messages`, payload, { headers });
        console.log(colors.white("Sent message: "));
        console.log(colors.yellow(payload.content));
      } catch (error) {
        console.error(colors.red('Error sending message:'), error.response ? error.response.data : error.message);
      }

      // Menambahkan jeda waktu 30 detik antara pengiriman pesan oleh akun berikutnya
      await sleep(30000);
    }

    // Menunggu 86400 detik (24 jam) sebelum mengulangi proses
    await sleep(86400000);
  }
})();
