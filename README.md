### Meet The Team
- Bonifasius Raditya Pandu Hendrianto (2306242350) - Frontend
- Jonathan Frederick Kosasih (2306225981) - Dockerized
- Wesley Frederick Oh (2306202763) - Backend + Integrate

# Customizable Pokedex
Sebelum membahas Pokedex, lebih baik jika kita mengenal Pokemon terlebih dahulu.

## What is Pokemon?
Pokemon adalah kependekan dari Pocket Monsters, sebuah franchise global milik The Pokemon Company yang pertama kali diperkenalkan di Jepang pada Februari 1996 sebagai judul permainan video untuk konsol portabel Nintendo, Game Boy, yaitu "Pokemon Red" dan "Pokemon Green".

Selain judul franchise game, istilah Pokemon juga merujuk pada spesies fiksi Pokemon. Dalam konteks ini, Pokemon adalah makhluk-makhluk misterius dengan banyak rahasia. Beberapa Pokémon tinggal bersama manusia dan beberapa tinggal di alam bebas di padang rumput, gua, atau laut, tapi banyak hal tentang ekologi mereka yang masih belum diketahui. Salah satu fitur utama mereka adalah bahwa mereka dapat ditangkap menggunakan Poke Ball, yang memungkinkan mereka dibawa-bawa.

## What is a Pokedex?
Pada film dan game Pokemon, terdapat sebuah benda yang diberikan kepada pemain yang disebut Pokedex. Pokedex adalah sebuah ensiklopedia portable berteknologi tinggi yang digunakan sebagai alat oleh para Pokemon trainer untuk mencatat data dari berbagai spesies Pokemon yang mereka temui dan tangkap selama perjalanan mereka. Alat ini dapat mengidentifikasi Pokemon dan menampilkan seluruh informasi mereka seperti deskripsi, statistik fisik (tinggi, berat), statistik pertandingan (attack, defense, hp, speed, etc.), dan informasi lainnya seperti rantai evolusinya. Dalam alur ceritanya, para Pokemon trainer ditugaskan oleh professornya untuk melengkapi data Pokemon pada Pokedex yang diberikan untuk membantu penelitiannya mengenai Pokemon. 

Setiap game Pokemon memiliki Pokedex yang berbeda karena setiap game hanya memiliki sekitar 300-400 Pokemon yang bisa ditangkap pada game tersebut. Pokedex ini disebut sebagai Regional Pokedex. Seiring dengan bertambahnya Pokemon baru melalui game terbarunya, jumlah Pokemon secara keseluruhan juga bertambah, sehingga terdapat juga Pokedex yang mencatat seluruh Pokemon yang terdapat pada semua gamenya yang disebut sebagai National Pokedex. Untuk saat ini, terdapat sebanyak 1025 total Pokemon dari 9 generasi dengan berbagai rupanya (sebelum rilisnya Pokemon Legends: Z-A). 

Referensi:
[Pokemon](https://id.portal-pokemon.com/about/)
[Pokedex](https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9dex)
[National Pokedex](https://pokemondb.net/pokedex/all)

## What this Project Does
Proyek ini terinspirasi dari konsep National Pokedex pada series Pokemon yang bertujuan untuk mencatat keseluruhan data dari seluruh Pokemon yang ada. Proyek kami merupakan sebuah aplikasi yang mensimulasikan fungsi dari National Pokedex pada series Pokemon untuk mencatat data Pokemon mulai dari nama spesies, tipe, abilities, statistik (atk, def, hp, spatk, spadef, speed), moves, evolution-line, dan deskripsi singkat. Untuk memudahkan setiap penggunanya, proyek ini memiliki sistem login dan bersifat customizable. Customizable Pokedex yang kami buat juga memiliki bagian Inventory yang mencatat Pokemon yang dimiliki pengguna saat ini. Dengan Pokedex customizable, pengguna dapat meng-input sendiri Pokemon mereka dan me-registernya ke MongoDB melalui bagian Inventory yang terdapat pada proyek kami. 

> Atas saran dari Pak Yan Maraden, kami juga telah menambahkan sebuah grafik untuk menunjukkan statistik pokemon, seperti gambar chart yang menunjukkan jumlah pokemon di setiap tipenya, dan stats yang mereka miliki.

## Tech Stack
#### Frontend
- Typescript
- React + Vite: Untuk membuat UI yang cepat, mudah, dinamis, dan efisien.
- Tailwind CSS: Framework CSS yang mempercepat pembuatan UI.
- Nginx Web Server: Server HTTP yang digunakan untuk menyajikan file frontend (HTML, JS, CSS) ke browser pengguna.
- Axios: Library JavaScript untuk fetch data dari Backend.
- Recharts: Membuat visualisasi grafik atau chart di aplikasi (seperti histogram)
#### Backend
- Python: Language yang dipilih untuk mengintegrasikan aplikasi dengan database.
- Flask: Framework Python yang digunakan untuk membuat aplikasi web dengan Python, menghubungkan backend dengan database, dan membuat logic aplikasi.
- MongoDB as NoSQL Database

## Dockerization
Jalankan aplikasi pada root folder dengan menggunakan command berikut:

```bash
git clone https://github.com/sleepingpolice-afk/realpokedex.git
cd realpokedex

# Run docker compose
docker-compose build
docker-compose up
```

atau Anda juga dapat menjalankan bagian frontend dan backend secara terpisah pada folder mereka masing-masing, seperti: 
```bash
# In "Frontend" folder
docker build -t pokedex-fe .
docker run -p 8080:80 pokedex-fe

# In "Backend" folder
docker build -t pokedex-be .
docker run -p 5000:5000 pokedex-be

# Note: Sesuaikan portnya dengan port yang tersedia pada perangkat Anda.
```

Perlu diingat bahwa:
- Frontend menggunakan http://localhost:8080/ atau http://127.0.0.1:8080/
- Backend menggunakan http://localhost:5000/ atau http://127.0.0.1:5000/


## Screenshots

### Testing Backend with Postman
![picture 0](https://i.imgur.com/H9QD9c8.png)  


Contoh output pada salah satu metode get pokemon:
```json
{
  "name": "Pikachu",
  "type": ["Electric"],
  "abilities": ["Static", "Lightning Rod"],
  "stats": {
    "hp": 35, "attack": 55, "defense": 40,
    "specialAttack": 50, "specialDefense": 50, "speed": 90
  },
  "moves": ["Thunder Shock", "Volt Tackle"],
  "evolution": { "evolvesFrom": "Pichu", "evolvesTo": "Raichu" },
  "description": "This mouse-like Pokémon stores electricity in its cheek pouches."
}
```

### Frontend Pics
#### Login
![picture 5](https://i.imgur.com/ZpkaJs5.png) 

> Ketika pengguna berusaha mengakses paksa route lainnya selain halaman login/register melalui URL tanpa login, mereka akan dibawa kembali ke halaman login

#### Register
![picture 6](https://i.imgur.com/NSLskI7.png)  

#### Dashboard
![picture 0](https://i.imgur.com/smwhGdF.png)  

#### Pokemon Inventory
![picture 1](https://i.imgur.com/QUliwH5.png)  

![picture 2](https://i.imgur.com/3xM92rz.png)  

![picture 3](https://i.imgur.com/bSN69wi.png)  

### Pokemon Statistics
![picture 4](https://i.imgur.com/pAahGPQ.png)  

> Perlu diingat bahwa grafik bersifat **scalable**. Ketika kita menambahkan Pokemon baru pada halaman Inventory, tipenya akan bertambah ke grafiknya. Ketika tipenya merupakan tipe baru, akan terbentuk "batang" baru atau class interval. 

## Credits
This project was made by:
- Bonifasius Raditya Pandu Hendrianto (2306242350): Project setup, frontend development.
- Jonathan Frederick Kosasih (2306225981): Concept, description, frontend finishing and dockerizing.
- Wesley Frederick Oh (2306202763): Backend development and dockerizing, FE & BE integration, README
