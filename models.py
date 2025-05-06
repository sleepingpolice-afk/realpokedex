def is_valid_pokemon(data):
    required_fields = ["name", "type", "abilities", "stats", "moves", "evolution", "description"]
    stats_fields = ["hp", "attack", "defense", "specialAttack", "specialDefense", "speed"]
    evolution_fields = ["evolvesFrom", "evolvesTo"]

    if not all(field in data for field in required_fields):
        return False

    if not isinstance(data["type"], list) or not isinstance(data["abilities"], list) or not isinstance(data["moves"], list):
        return False

    if not isinstance(data["stats"], dict) or not all(stat in data["stats"] for stat in stats_fields):
        return False

    if not isinstance(data["evolution"], dict) or not all(ev in data["evolution"] for ev in evolution_fields):
        return False

    return True
