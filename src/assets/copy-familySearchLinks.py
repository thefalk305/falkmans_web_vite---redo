import json

# Load both JSON files
with open(r"C:\xampp\htdocs\new_falkmansweb\vue\falkmans_web_vite - redo\src\assets\infotable.json", "r", encoding="utf-8") as f:
    infotable = json.load(f)

with open(r"C:\xampp\htdocs\new_falkmansweb\vue\falkmans_web_vite - redo\src\assets\infotable2.json", "r", encoding="utf-8") as f:
    infotable2 = json.load(f)


# with open("infotable.json", "r", encoding="utf-8") as f:
#     infotable = json.load(f)

# with open("infotable2.json", "r", encoding="utf-8") as f:
#     infotable2 = json.load(f)

# Build a lookup dictionary from infotable2 keyed by "name"
lookup = {item["name"]: item.get("famSrchLink") for item in infotable2 if "name" in item}

# Update infotable with famSrchLink where names match
for item in infotable:
    if "name" in item and item["name"] in lookup and lookup[item["name"]] is not None:
        item["famSrchLink"] = lookup[item["name"]]

# Save the updated infotable back to file
with open("infotable.json", "w", encoding="utf-8") as f:
    json.dump(infotable, f, indent=2, ensure_ascii=False)

print("famSrchLink fields copied successfully!")