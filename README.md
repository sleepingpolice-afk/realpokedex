# Customizable Pokedex
Sebelum membahas Pokedex, lebih baik jika kita mengenal Pokemon terlebih dahulu.

## What is Pokemon?
Pokemon adalah kependekan dari Pocket Monsters, sebuah franchise global milik The Pokemon Company yang pertama kali diperkenalkan di Jepang pada Februari 1996 sebagai judul permainan video untuk konsol portabel Nintendo, Game Boy, yaitu "Pokemon Red" dan "Pokemon Green".

Selain judul franchise game, istilah Pokemon juga merujuk pada spesies fiksi Pokemon. Dalam konteks ini, Pokemon adalah makhluk makhluk misterius dengan banyak rahasia. Beberapa Pokémon tinggal bersama manusia dan beberapa tinggal di alam bebas di padang rumput, gua, atau laut, tapi banyak hal tentang ekologi mereka yang masih belum diketahui. Salah satu fitur utama mereka adalah bahwa mereka dapat ditangkap menggunakan Poke Ball, yang memungkinkan mereka dibawa-bawa.

[Referensi](https://id.portal-pokemon.com/about/)

## What this Project Does
With the Customized Pokedex, the user will be able to input their own pokemon and register it to MongoDB.

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
Run the application in root folder with these commands:

```bash
git clone https://github.com/sleepingpolice-afk/realpokedex.git
cd realpokedex

# Run docker compose
docker-compose build
docker-compose up
```

or you can run both services individually inside their respective folders, such as:
```bash
# In "Frontend" folder
docker build -t pokedex-fe .
docker run -p 8080:80 pokedex-fe

# In "Backend" folder
docker build -t pokedex-be .
docker run -p 5000:5000 pokedex-be

# Note: Change the port accordingly to your empty port(s).
```

Keep in mind that:
- Frontend runs on http://localhost:8080/ or http://127.0.0.1:8080/
- Backend runs on http://localhost:5000/ or http://127.0.0.1:5000/


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

> If the user is trying to forcibly access other routes other than login/register page by typing in their search bar without logging in, they will be kicked back to the login page.

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

> Keep in mind that the Chart is **scalable**. Whenever we add a pokemon in the Inventory page, its type will be added to this chart. If the type is a new type, then create a new "stick" or class interval.


## Credits
This project was made by:
- Bonifasius Raditya Pandu Hendrianto (2306242350)
- Jonathan Frederick Kosasih (2306225981)
- Wesley Frederick Oh (2306202763)