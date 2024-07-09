/**
 * Fungsi untuk menunda eksekusi selama beberapa milidetik.
 * @param {number} ms - Jumlah milidetik untuk menunda eksekusi.
 * @returns {Promise<void>}
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  module.exports = sleep;
  