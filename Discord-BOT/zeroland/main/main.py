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
print('PESAN DARI PEMBUAT : TIDAK UNTUK DI PERJUAL-BELIKAN')
print("===========================================\n")

time.sleep(1)

channel_id = input("Masukkan ID channel: ")
waktu = int(input("Set Waktu Kirim Pesan: "))

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

        time.sleep(waktu)
