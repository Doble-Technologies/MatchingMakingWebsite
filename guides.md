# Full Champion List:

https://ddragon.leagueoflegends.com/cdn/16.13.1/data/en_US/champion.json

# Champion:

https://ddragon.leagueoflegends.com/cdn/16.13.1/data/en_US/champion/<Champion>.json

# Champion Splash:

https://ddragon.leagueoflegends.com/cdn/img/champion/splash/<Champion>_0.jpg

# Champion Loading Splash:

https://ddragon.leagueoflegends.com/cdn/img/champion/loading/<Champion>_0.jpg

# Champion Square Asset Icons:

https://ddragon.leagueoflegends.com/cdn/16.13.1/img/champion/<Champion>.png

# Champion Passive Icon:

https://ddragon.leagueoflegends.com/cdn/16.13.1/img/passive/<Champion>_P.png

# Champion Ability Icons:
- Be careful about this... it's based on ability name defined in the champions JSON file...
- For example, Aatrox is "AatroxQ", "AatroxW" etc... as to where Anivia is "FlashFrost", etc...

https://ddragon.leagueoflegends.com/cdn/16.13.1/img/spell/<AbilityName>.png


# Item Information:

https://ddragon.leagueoflegends.com/cdn/16.13.1/data/en_US/item.json

# Item Icons:

https://ddragon.leagueoflegends.com/cdn/16.13.1/img/item/<ItemID>.png

# Actual Map List:
- See below for quick look.

https://ddragon.leagueoflegends.com/cdn/16.13.1/data/en_US/map.json

# Map ID:
- These are used for items... for example there are 2 Luden's Echo items.
  - There will be an object in each item:
    - Luden's Echo: 6655 - (For Summ. Rift, Howling Abyss, Temple of Lily, and an Unknown Map):
      "maps": {
        "11": true,
        "12": true,
        "21": true,
        "22": false,
        "30": false,
        "33": false,
        "35": true
      },
    - Luden's Echo: 226655 - (For Arena):
      "maps": {
        "11": false,
        "12": false,
        "21": false,
        "22": false,
        "30": true,
        "33": false,
        "35": false
      },
  - Ensure you search for the map you want to get the appropriate icon/stats.

- 11 - Summoner's Rift
- 12 - Howling Abyss
- 30 - Arena: Rings of Wrath

# Discontinued / Event Maps:

- 3 - Proving Grounds:
  - Single-lane map replaced by the Howling Abyss.[1]

- 8 - Crystal Scar: 
  - The Crystal Scar was once known as the mining village of Kalamanda, until open war between Demacia and Noxus broke out over control of its vast underground riches. Settle your disputes on this Field of Justice by working with your allies to seize capture points and declare dominion over your enemies!

- 10 - Twisted Treeline: 
  - Deep in the Shadow Isles lies a ruined city shattered by magical disaster. Those who venture inside the ruins and wander through the Twisted Treeline seldom return, but those who do tell tales of horrific creatures and the vengeful dead.

- 14 - Butcher's Bridge: 
  - Once an ancient stone bridge leading to a temple entrance, it's been kept up haphazardly and primarily serves now as a connection between the slaughter docks and one of Bilgewater's slums.

- 16 - Cosmic Ruins:
  - The Cosmic Ruins are a corrupted corner of a once-great world that has been harvested and ejected into the vast emptiness of space. A black hole looms in the center of the map, pulling all survivors into the infinite depths of the Dark Star.

- 18 - Valoran City Park:
  - Valoran City Park is a favourite hot-spot for Star Guardians. It has since been attacked by creatures from the Void and is up to the Star Guardians to protect the city, expel the monsters, and save the day.

- 19 - Substructure 43:
  - The Substructure 43 is located in the deep underbelly of The City.

- 20 - Crash Site: 
  - Ziggs crash landed on a remote alien world. It is the job for the crew of the Morning Star to save him from the planets dangerous wildlife as well as escape from Ordinal Kayn.

- 21 - Temple of Lily and Lotus:
  - The Temple of Lily and Lotus is a long-forgotten temple of the Canghapi Runeterra Crest icon vastaya, located somewhere in Ionia Crest icon Ionia.

# Unreleased Maps:

- 13 - Magma Chamber:
  - Single-lane map, limited to tournament servers.