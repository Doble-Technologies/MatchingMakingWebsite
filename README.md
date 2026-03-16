# MatchingMakingService

## Overview
This project is composed of three main services:

1. **Website Service**
2. **Matchmaking Service**
3. **Game Service**

It also targets support for multiple games (listed below).

---

## 1) Website Service
Planned features:

- **Authentication**
  - Simple login screen
- **Profile**
  - Display player stats
- **Shop**
- **Queue**
  - Queue button
  - Game options (e.g., *CS2*, *League of Legends*)
- **Leaderboard**
- **Ranking system**

---

## 2) Matchmaking Service

### 2.1 Queue + Match Setup
- **Player pool management**
  - Pool of data
  - Kafka service to manage pools
- **WebSocket connection**
  - Establish a queue and show who is currently queued
- **Match algorithm**
  - Rank-based
  - Groups of **10 players**
- **Server provisioning**
  - Connect to our server and spin up a game server
  - Once ready, send an IP to distribute to players

### 2.2 Accept + Join Flow
- Close service with the IP
- On **Accept**, run a command/script to join the IP address
  - Create a join script for each game

---

## 3) Game Service
- Create a plugin to connect to our databases for real-time match data

---

## Games

### Target Games
- CS2
- League of Legends
- Valorant
- Overwatch

### Questionable / Maybe
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

### Last Priority
- Minecraft (Hunger Games)
