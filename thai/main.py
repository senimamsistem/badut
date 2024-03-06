import requests
import random
import time
import os
from colorama import Fore

print("===================================================================================================================================")
print("\033[92m") 
print("                  _                                    _       _                   ")
print("                 (_)                                  (_)     | |                  ")
print("    ___   ___  _ __   _  _ __ ___    __ _  _ __ ___   ___  _  ___ | |_  ___  _ __ ___  ")
print("   / __| / _ \| '_ \ | || '_ ` _ \  / _` || '_ ` _ \ / __|| |/ __|| __|/ _ \| '_ ` _ \ ")
print("   \__ \|  __/| | | || || | | | | || (_| || | | | | |\__ \| |\__ \| |_|  __/| | | | | |")
print("   |___/ \___||_| |_||_||_| |_| |_| \__,_||_| |_| |_||___/|_||___/ \__|\___||_| |_| |_|")
print("                                                                                       ")
print("\033[0m")
print("===================================================================================================================================")

author = "senimamsistem"
print("Author: " + author)
script = "MENJADI BADUT DISCORD"
print("Script: " + script)
Discord = "https://discord.gg/ZJJqQUdr6R"
print("Discord: " + Discord)
print("===========================================")
print('PESAN DARI PEMBUAT : TIDAK UNTUK DI PERJUAL-BELIKAN BY: BG PATENG')
print("===========================================\n")

time.sleep(1)

channel_id = input("Masukkan ID channel: ")
waktu1 = int(input("Set Waktu Hapus Pesan: "))
waktu2 = int(input("Set Waktu Kirim Pesan: "))

time.sleep(1)
print("3")
time.sleep(1)
print("2")
time.sleep(1)
print("1")
time.sleep(1)

os.system('cls' if os.name == 'nt' else 'clear')

with open("pesan.txt", "r") as f:
    words = f.readlines()

with open("token.txt", "r") as f:
    authorization = f.readline().strip()

while True:
        channel_id = channel_id.strip()

        payload = {
            'content': random.choice(words).strip()
        }

        headers = {
            'Authorization': authorization
        }

        r = requests.post(f"https://discord.com/api/v9/channels/{channel_id}/messages", data=payload, headers=headers)
        print(Fore.WHITE + "Sent message: ")
        print(Fore.YELLOW + payload['content'])

        response = requests.get(f'https://discord.com/api/v9/channels/{channel_id}/messages', headers=headers)

        if response.status_code == 200:
            messages = response.json()
            if len(messages) == 0:
                is_running = False
                break
            else:
                time.sleep(waktu1)

                message_id = messages[0]['id']
                response = requests.delete(f'https://discord.com/api/v9/channels/{channel_id}/messages/{message_id}', headers=headers)
                if response.status_code == 204:
                    print(Fore.GREEN + f'Pesan dengan ID {message_id} berhasil dihapus')
                else:
                    print(Fore.RED + f'Gagal menghapus pesan dengan ID {message_id}: {response.status_code}')
        else:
            print(f'Gagal mendapatkan pesan di channel: {response.status_code}')

        time.sleep(waktu2)