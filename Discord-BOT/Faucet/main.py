import requests
import random
import time
import os
from colorama import Fore


author = "senimamsistem"
print("Author: " + author)
script = "Faucet-DIscord"
print("Script: " + script)
Discord = "https://discord.gg/ZJJqQUdr6R"
print("Discord: " + Discord)
print("===========================================")
print('PESAN DARI PEMBUAT : TIDAK UNTUK DI PERJUAL-BELIKAN')
print("===========================================\n")

time.sleep(1)

channel_id = input("Masukkan ID channel: ")

time.sleep(1)
print("3")
time.sleep(1)
print("2")
time.sleep(1)
print("1")
time.sleep(1)

os.system('cls' if os.name == 'nt' else 'clear')

# Mendapatkan direktori skrip yang sedang dijalankan
script_dir = os.path.dirname(os.path.abspath(__file__))

# Membaca token dari file
with open(os.path.join(script_dir, "token.txt"), "r") as f:
    tokens = [line.strip() for line in f.readlines()]

# Membaca pesan dari file yang berbeda untuk setiap akun
messages = []
for i in range(len(tokens)):
    with open(os.path.join(script_dir, f"pesan_{i+1}.txt"), "r") as f:
        messages.append(f.readlines())

while True:
    # Membuat daftar indeks akun dan mengacaknya
    indices = list(range(len(tokens)))
    random.shuffle(indices)
    
    for i in indices:
        token = tokens[i]
        # Pilih pesan acak dari daftar pesan untuk akun ini
        pesan_acak = random.choice(messages[i]).strip()
        
        payload = {
            'content': pesan_acak
        }

        headers = {
            'Authorization': token
        }

        r = requests.post(f"https://discord.com/api/v9/channels/{channel_id}/messages", data=payload, headers=headers)
        print(Fore.WHITE + "Sent message: ")
        print(Fore.YELLOW + payload['content'])

        # Menambahkan jeda waktu 30 detik antara pengiriman pesan oleh akun berikutnya
        time.sleep(30)
    
    # Menunggu 86400 detik (24 jam) sebelum mengulangi proses
    time.sleep(86400)
