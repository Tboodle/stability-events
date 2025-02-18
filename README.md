This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

Tasks

name,number,task1,task2,task3
We’re All In This Together,3 splits with other teams,13, 6 splits with other teams,9 splits with other teams
Give Me Varlamore,Tome of Earth OR Dragon Hunter Wand,150 Hunter Rumours,Tooth or Loop Half of Key (moon)
Tirannwn Trouble!,2x Crystal Armor Seeds OR Enhanced Crystal Weapon Seed,2x Zulrah Uniques,Zalcano Unique
Into The Ring,750 Colosseum Points,3x Any Sunfire Pieces,Ralos OR Pet
Light the Fire,700 Inferno Points,Fire Staff Element Crown AND Ice Staff Element Crown,2x Tormented Demons Unique (Dupes okay)
POG Raider,CM Kit OR Metamorphic Dust,HMT Kit OR Dust,75 total CM or HMT KC
Ban the Wildy!,Any Voidwaker Piece,Any Wilderness Ring,"Fangs of Venenatis, Claws of Callisto AND Skull of Vet’ion"
Bloodlust,2x Blood Shards,2x Blood Quartz,3x Any Blood Moon Uniques (Duplicates okay)
Ring Bling,Elven Signet,Any DT2 Vestige,3x Chromium Ingots
Chambers of Xeric (x2),2x Dexterous or Arcane prayer scrolls total,2x total uniques that are NOT prayer scrolls,"Any Megarare (Kodai, TBOW or Maul), Dragon claws OR Pet"
Theatre of Blood (x2),3x Avernic defender hilts,2x Uniques that are NOT hilts,Sanguinesti Staff OR Scythe of Vitur OR Pet
Tombs of Amascut,2x Fangs OR Lightbearers total,2x Uniques that are not Fang/LB total,All uniques obtained excluding Shadow OR Tumeken’s Shadow OR Pet
Like a Boss,6 Slayer Unique Points,12 Slayer Unique Points,18 Slayer Unique Points
What’s Nex-t (x2),Any Nex Unique,Any Nex Unique,Any Nex Unique
Phantom Ligmuh,1x Venator Shard,3x Venator Shards,5x Venator Shards
Kon-Are You Kryidding Me,60 Brimstone Keys,40 Larran’s Keys,Any Dusk Mystic OR Broken Dragon Hasta
God Wars Starter Pack,Staff of the Dead OR Zamorak Hilt,Bandos Chestplate OR Bandos Hilt,Armadyl Crossbow OR Saradomin Hilt
The Fremmy Frontier,4x Vorkath Heads,Dagannoth Kings Lord of the Rings trilogy,Neitiznot Faceguard OR Basilisk Head
Desert Treasure 2,Any DT2 Unique,Any DT2 Unique,Any DT2 Unique
And My Bow,Pegasian crystal,Any Armadyl armor piece,"Dragon limbs, Nihil Horn, Dragon Hunter Crossbow, OR Twisted bow"
And My Axe,Primordial crystal,Bandos Tassets,Hydra’s leather OR Hydra’s claw
And My +3 Book of Spells,Eternal Crystal,Any Corporeal Beast Unique (Spirit Shield does NOT Count),Magic fang AND Trident

# test script

import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Firestore

cred = credentials.Certificate("path/to/your/firebase-credentials.json") # Update with your credentials path
firebase_admin.initialize_app(cred)
db = firestore.client()

# Data to upload

tiles_data = [
{"tile_name": "We’re All In This Together", "task_1": "3 splits with other teams", "task_2": "6 splits with other teams", "task_3": "9 splits with other teams"},
{"tile_name": "Give Me Varlamore", "task_1": "Tome of Earth OR Dragon Hunter Wand", "task_2": "150 Hunter Rumours", "task_3": "Tooth or Loop Half of Key (moon)"},
{"tile_name": "Tirannwn Trouble!", "task_1": "2x Crystal Armor Seeds OR Enhanced Crystal Weapon Seed", "task_2": "2x Zulrah Uniques", "task_3": "Zalcano Unique"},
# Add remaining tiles...
]

# Upload to Firestore

for tile in tiles_data:
doc_ref = db.collection("tiles").document(tile["tile_name"]) # Use tile name as document ID
doc_ref.set(tile)

print("Tiles uploaded successfully!")
