# MatchingMakingService

[1] Website Service
  - Simple Login Screen
  - Profile
    - Displays Stats
  - Shop
  - Queue Button
    - Game Options (Competitive)
  - Leaderboard
  - Ranking System

[2.1] Matchmaking Service
  - Pool of Data
    - Kafka Service to Manage Pools
  - Websocket Connection
    - To establish a queue to show who is in the queue.
      - Figure out an algorithm
        - Based on Rank
        - 10 People
    - Connection to our server and spin up a server.
      - Once done send an ip to distribute

[2.2] Matchmaking Service
  - Close service with the ip
  - Once clicking accept run command to join IP Address - Create script for each game.

[3] Game Service
  - Create plugin to connect to our databases for realtime match data.



[X] Games
  - CS2
  - League of Legends
  - Valorant
  - Overwatch
  [Questionables]
    - TFT
    - Dota 2
    - Deadlock
    - Brawl Stars
    - Clash Royale
    - Madden
    - FC
    - 2K
    - The Show
    - Fall Guys
  [LAST]
    - Minecraft (Hunger Games)
