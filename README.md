# Life-Simulation-Game
UTS PTI

Member:
- Jeremiah Ephraim Jonathan, 00000140764 (Website game)
- Damianus Lowa Mite (Mengatur Resposive website) 
- Dhimas Alkautsar Putra Alif Viano (Video Demonstrasi)

Video Demonstrasi:
https://drive.google.com/file/d/15bzm6vWzTpdcjXFm_Uplyd3GLveCDC8I/view

GitHub Source Code:
https://github.com/Senremi7/Life-Simulation-Game

GitHub Live Host:
https://senremi7.github.io/Life-Simulation-Game/

Game Rules:
Core Game Mechanics:
1. Time System:
   - 1 real second = 1 game minute
   - 24 game hours = 1 game day
   - Game starts at 8:00 AM on Day 1
2. Stat Decay:
   - Every 30 real seconds (30 game minutes):
   - Hunger decreases by 5%
   - Energy decreases by 3%
   - Happiness decreases by 2%
   - Hygiene decreases by 4%
3. Critical Warnings:
   - Warnings appear when stats drop below 20% (15% for some stats)
4. Game Over Conditions:
   - Hunger reaches 0%: "You starved to death!"
   - Energy reaches 0%: "You collapsed from exhaustion!"
   - Happiness reaches 0%: "You became too depressed to continue!"
   - Hygiene reaches 0%: "Your poor hygiene made you sick!"
   - Money goes negative: "You went bankrupt!"

Location-Based Actions:
Home:
- Sleep: +30 Energy, +4 hours time
- Eat: +20 Hunger
- Play Games: +20 Happiness, -10 Energy
- Shower: +20 Hygiene
- Remote Work: +$25, -20 Energy, -5 Happiness
- Read Book: +15 Happiness, -5 Energy

Lake (Danau):
- Fish: +15 Hunger, +10 Happiness, -10 Energy
- Swim: +15 Hygiene, +10 Happiness, -15 Energy
- Rest: +15 Energy, +1 hour time
- Take Nature Photos: +$10, -5 Energy

Beach (Pantai):
- Swim: +20 Hygiene, +15 Happiness, -10 Energy
- Sunbathe: +20 Happiness, +10 Energy, -5 Hunger
- Build Sandcastle: +25 Happiness, -10 Energy
- Buy Souvenir: -$15, +20 Happiness

Mountain (Gunung):
- Hike: +20 Happiness, -20 Energy, -10 Hunger
- Camp: +20 Energy, +15 Happiness, +2 hours time
- Find Treasure: +60 (random), -15 Energy
- Take Photos: +25 (random), -10 Energy

Temple (Candi):
- Explore: +15 Happiness, -10 Energy, -5 Hunger
- Meditate: +20 Happiness, +15 Energy, +1 hour time
- Pray/Make Offering: -$10, random stat +5-20
- Study History: +10 Happiness, -5 Energy

Movement:
- WASD or arrow keys to move
- On-screen buttons for mobile/touch
- Avatar speed: 8 pixels per key press

Money System:
- Starts with $100
- Earn through:
  1. Remote work (+$25)
  2. Selling photos (+25)
  3. Finding treasure (+60)

- Spend on:
  1. Souvenirs (-$15)
  2. Temple offerings (-$10)

Character Customization:
- 9 avatar choices
- Player name input

Game Flow:
1. Select avatar and name
2. Manage stats through location-based actions
3. Avoid stat depletion
4. Game ends when any stat reaches 0 or money goes negative
5. Option to restart or quit after game over

Time-Based Effects:
- Some actions advance time (sleep +4h, rest +1h, etc.)
- Time affects greeting messages (morning/afternoon/evening/night)

Visual:
- Status bars with percentage values
- Money display with animation on change
- Tooltips showing money effects
- Warning alerts for critical stats
