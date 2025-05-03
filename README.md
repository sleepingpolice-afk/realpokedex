# Customized Pokedex
## The Thing
With the Customized Pokedex, the user will be able to input their own pokemon and register it to MongoDB.

This project was made using Python, Flask, and Docker. Read later sections for usage.


## Screenshot

![picture 0](https://i.imgur.com/H9QD9c8.png)  


Contoh input utk post: 
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

```text
http://127.0.0.1:5000/pokemon
```

## How to Run
Run Docker:
```bash
docker build -t flask-mongo-app .
docker run -p 5000:5000 flask-mongo-app
```

# NOTE TO TEAM:
Ges project ini belum di build karena sinyal internet di villa exer terlalu lemot. Atau jika anda rela untuk membuildnya sendiri, run this code below:
```bash
docker build -t flask-mongo-app .
```

## Credits
This project was made by Wesley, Radit, and Joko.