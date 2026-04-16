// ============================================================
// KÖRFUBOLTASTJÓRI - Game Data from korfustatt.is (2025-26)
// ============================================================

const TEAM_DATA = [
  {
    id: "grindavik", name: "Grindavík", city: "Grindavík",
    arena: "Grindavíkurvöllur", capacity: 800,
    colors: { primary: "#1a5276", secondary: "#f1c40f" },
    budget: 45000000, reputation: 90,
    logo: "🟦", logoFile: "img/logos/Grindavík.svg"
  },
  {
    id: "tindastoll", name: "Tindastóll", city: "Sauðárkrókur",
    arena: "Grana", capacity: 1200,
    colors: { primary: "#c0392b", secondary: "#ffffff" },
    budget: 40000000, reputation: 87,
    logo: "🟥", logoFile: "img/logos/Tindastóll.svg"
  },
  {
    id: "stjarnan", name: "Stjarnan", city: "Garðabær",
    arena: "Eimskipahöllin", capacity: 1500,
    colors: { primary: "#2980b9", secondary: "#f39c12" },
    budget: 50000000, reputation: 85,
    logo: "⭐", logoFile: "img/logos/Stjarnan.svg"
  },
  {
    id: "valur", name: "Valur", city: "Reykjavík",
    arena: "Valshöllin", capacity: 1200,
    colors: { primary: "#e74c3c", secondary: "#2c3e50" },
    budget: 48000000, reputation: 83,
    logo: "🔴", logoFile: "img/logos/Valur.svg"
  },
  {
    id: "keflavik", name: "Keflavík", city: "Keflavík",
    arena: "Keflavíkurhöllin", capacity: 1000,
    colors: { primary: "#8e44ad", secondary: "#ffffff" },
    budget: 42000000, reputation: 80,
    logo: "🟪", logoFile: "img/logos/Keflavík.svg"
  },
  {
    id: "kr", name: "KR", city: "Reykjavík",
    arena: "KR-höllin", capacity: 1400,
    colors: { primary: "#2c3e50", secondary: "#3498db" },
    budget: 55000000, reputation: 82,
    logo: "🔵", logoFile: "img/logos/KR.svg"
  },
  {
    id: "ir", name: "ÍR", city: "Reykjavík",
    arena: "ÍR-höllin", capacity: 900,
    colors: { primary: "#27ae60", secondary: "#ffffff" },
    budget: 38000000, reputation: 78,
    logo: "🟩", logoFile: "img/logos/ÍR.svg"
  },
  {
    id: "njardvik", name: "Njarðvík", city: "Njarðvík",
    arena: "Njarðvíkurhöllin", capacity: 700,
    colors: { primary: "#d35400", secondary: "#2c3e50" },
    budget: 35000000, reputation: 72,
    logo: "🟧", logoFile: "img/logos/Njarðvík.svg"
  },
  {
    id: "alftanes", name: "Álftanes", city: "Álftanes",
    arena: "Álftaneshöllin", capacity: 600,
    colors: { primary: "#16a085", secondary: "#ecf0f1" },
    budget: 30000000, reputation: 70,
    logo: "🟢", logoFile: "img/logos/Álftanes.svg"
  },
  {
    id: "armann", name: "Ármann", city: "Reykjavík",
    arena: "Ármannshöllin", capacity: 800,
    colors: { primary: "#f39c12", secondary: "#2c3e50" },
    budget: 32000000, reputation: 68,
    logo: "🟡", logoFile: "img/logos/Ármann.svg"
  },
  {
    id: "thor", name: "Þór Þ", city: "Þorlákshöfn",
    arena: "Þórishöllin", capacity: 500,
    colors: { primary: "#7f8c8d", secondary: "#e74c3c" },
    budget: 25000000, reputation: 62,
    logo: "⚡"
    // logoFile intentionally omitted - the Þór.svg file is Þór Akureyri, not Þór Þorlákshöfn
  },
  {
    id: "ia", name: "ÍA", city: "Akureyri",
    arena: "ÍA-höllin", capacity: 900,
    colors: { primary: "#2ecc71", secondary: "#f1c40f" },
    budget: 28000000, reputation: 60,
    logo: "🟨", logoFile: "img/logos/ÍA.svg"
  }
];

// Player positions
const POS = { PG: "Leikstjóri", SG: "Skotmaður", SF: "Lítill framherji", PF: "Stór framherji", C: "Stangarmaður" };

// All 213 players with real stats from korfustatt.is 2025-26 season
const PLAYER_DATA = [
  // ==================== GRINDAVÍK (15 players) ====================
  { name: "Khalil Shabazz", team: "grindavik", pos: "SG", age: 27, nationality: "US", gamesPlayed: 16, ppg: 23.1, rpg: 4.6, apg: 3.2, spg: 1.4, fg: 40.3, tp: 34.5, ft: 79.6, minutes: 31.9, ovr: 87, foreign: true },
  { name: "Jordan Semple", team: "grindavik", pos: "C", age: 33, nationality: "CA", gamesPlayed: 22, ppg: 16.6, rpg: 8.5, apg: 1.2, spg: 0.8, fg: 66.9, tp: 36.4, ft: 50.0, minutes: 30.0, ovr: 84, foreign: true },
  { name: "Deandre Kane", team: "grindavik", pos: "PG", age: 36, nationality: "US", gamesPlayed: 17, ppg: 15.7, rpg: 4.2, apg: 5.8, spg: 1.6, fg: 48.9, tp: 36.4, ft: 67.0, minutes: 27.7, ovr: 82, foreign: true },
  { name: "Jeremy Pargo", team: "grindavik", pos: "PG", age: 39, nationality: "US", gamesPlayed: 6, ppg: 18.8, rpg: 2.8, apg: 4.5, spg: 1.2, fg: 43.9, tp: 32.7, ft: 61.1, minutes: 31.9, ovr: 80, foreign: true },
  { name: "Daniel Mortensen", team: "grindavik", pos: "SF", age: 31, nationality: "IS", gamesPlayed: 20, ppg: 14.7, rpg: 5.1, apg: 2.8, spg: 1.1, fg: 39.0, tp: 27.7, ft: 88.2, minutes: 31.9, ovr: 78 },
  { name: "Ólafur Ólafsson", team: "grindavik", pos: "PF", age: 35, nationality: "IS", gamesPlayed: 21, ppg: 11.2, rpg: 4.5, apg: 1.5, spg: 0.7, fg: 43.7, tp: 34.3, ft: 69.4, minutes: 23.8, ovr: 72 },
  { name: "Kristófer Breki Gylfason", team: "grindavik", pos: "SF", age: 28, nationality: "IS", gamesPlayed: 19, ppg: 4.4, rpg: 2.8, apg: 1.5, spg: 0.6, fg: 40.3, tp: 36.4, ft: 10.0, minutes: 20.7, ovr: 58 },
  { name: "Arnór Tristan Helgason", team: "grindavik", pos: "SG", age: 19, nationality: "IS", gamesPlayed: 15, ppg: 8.7, rpg: 2.2, apg: 1.8, spg: 0.7, fg: 39.5, tp: 29.5, ft: 70.7, minutes: 21.6, ovr: 58 },
  { name: "Ragnar Örn Bragason", team: "grindavik", pos: "PF", age: 31, nationality: "IS", gamesPlayed: 22, ppg: 2.5, rpg: 2.5, apg: 0.8, spg: 0.3, fg: 34.7, tp: 33.3, ft: 71.4, minutes: 14.0, ovr: 52 },
  { name: "Unnsteinn R. Kárason", team: "grindavik", pos: "SG", age: 24, nationality: "IS", gamesPlayed: 22, ppg: 2.5, rpg: 0.8, apg: 0.5, spg: 0.2, fg: 39.1, tp: 41.9, ft: 75.0, minutes: 5.4, ovr: 48 },
  { name: "Nökkvi Már Nökkvason", team: "grindavik", pos: "PG", age: 26, nationality: "IS", gamesPlayed: 20, ppg: 1.6, rpg: 0.8, apg: 0.8, spg: 0.2, fg: 32.0, tp: 25.0, ft: 60.0, minutes: 5.9, ovr: 45 },
  { name: "Alexander Veigar Þorvaldsson", team: "grindavik", pos: "SF", age: 21, nationality: "IS", gamesPlayed: 12, ppg: 0.0, rpg: 0.5, apg: 0.2, spg: 0.1, fg: 25.0, tp: 20.0, ft: 50.0, minutes: 7.0, ovr: 40 },
  { name: "Sigurður Bergvin Ingibergsson", team: "grindavik", pos: "PF", age: 23, nationality: "IS", gamesPlayed: 5, ppg: 1.0, rpg: 1.0, apg: 0.3, spg: 0.1, fg: 30.0, tp: 20.0, ft: 55.0, minutes: 4.0, ovr: 38 },
  { name: "Hafliði Róbertsson", team: "grindavik", pos: "C", age: 22, nationality: "IS", gamesPlayed: 2, ppg: 0.5, rpg: 0.5, apg: 0.1, spg: 0.0, fg: 25.0, tp: 0.0, ft: 50.0, minutes: 2.0, ovr: 38 },
  { name: "Patrekur Atlason", team: "grindavik", pos: "PG", age: 17, nationality: "IS", gamesPlayed: 4, ppg: 0.0, rpg: 0.2, apg: 0.1, spg: 0.0, fg: 20.0, tp: 15.0, ft: 50.0, minutes: 1.0, ovr: 35 },

  // ==================== TINDASTÓLL (15 players) ====================
  { name: "Taiwo Badmus", team: "tindastoll", pos: "PF", age: 32, nationality: "NG", gamesPlayed: 21, ppg: 20.3, rpg: 7.8, apg: 1.5, spg: 0.9, fg: 49.8, tp: 35.5, ft: 79.5, minutes: 27.5, ovr: 86, foreign: true },
  { name: "Dedrick Basile", team: "tindastoll", pos: "SG", age: 31, nationality: "US", gamesPlayed: 22, ppg: 17.6, rpg: 3.2, apg: 4.1, spg: 1.3, fg: 50.5, tp: 37.1, ft: 87.0, minutes: 28.5, ovr: 84, foreign: true },
  { name: "Adomas Drungilas", team: "tindastoll", pos: "PF", age: 35, nationality: "LT", gamesPlayed: 22, ppg: 11.9, rpg: 5.5, apg: 1.5, spg: 0.6, fg: 55.9, tp: 40.3, ft: 85.9, minutes: 23.0, ovr: 76, foreign: true },
  { name: "Sigtryggur Arnar Björnsson", team: "tindastoll", pos: "SF", age: 32, nationality: "IS", gamesPlayed: 22, ppg: 12.2, rpg: 4.0, apg: 2.5, spg: 0.9, fg: 37.1, tp: 36.1, ft: 77.8, minutes: 24.2, ovr: 72 },
  { name: "Davis Geks", team: "tindastoll", pos: "SG", age: 30, nationality: "LV", gamesPlayed: 21, ppg: 9.9, rpg: 2.8, apg: 2.0, spg: 0.8, fg: 42.5, tp: 42.6, ft: 71.4, minutes: 25.9, ovr: 72, foreign: true },
  { name: "Daniel Dolenc", team: "tindastoll", pos: "SF", age: 32, nationality: "SI", gamesPlayed: 6, ppg: 8.8, rpg: 3.5, apg: 1.5, spg: 0.7, fg: 54.1, tp: 50.0, ft: 87.5, minutes: 17.2, ovr: 70, foreign: true },
  { name: "Júlíus Orri Ágústsson", team: "tindastoll", pos: "PG", age: 24, nationality: "IS", gamesPlayed: 22, ppg: 8.3, rpg: 2.0, apg: 3.5, spg: 0.8, fg: 37.2, tp: 34.7, ft: 76.3, minutes: 21.5, ovr: 62 },
  { name: "Ragnar Ágústsson", team: "tindastoll", pos: "PF", age: 24, nationality: "IS", gamesPlayed: 18, ppg: 6.4, rpg: 3.5, apg: 1.0, spg: 0.5, fg: 53.5, tp: 37.5, ft: 50.0, minutes: 17.6, ovr: 58 },
  { name: "Pétur Rúnar Birgisson", team: "tindastoll", pos: "C", age: 29, nationality: "IS", gamesPlayed: 22, ppg: 2.1, rpg: 2.5, apg: 0.5, spg: 0.2, fg: 37.2, tp: 32.4, ft: 50.0, minutes: 12.7, ovr: 48 },
  { name: "Hannes Ingi Másson", team: "tindastoll", pos: "PG", age: 29, nationality: "IS", gamesPlayed: 5, ppg: 1.5, rpg: 0.8, apg: 1.0, spg: 0.2, fg: 30.0, tp: 25.0, ft: 60.0, minutes: 7.5, ovr: 42 },
  { name: "Viðar Ágústsson", team: "tindastoll", pos: "SG", age: 29, nationality: "IS", gamesPlayed: 10, ppg: 0.5, rpg: 0.5, apg: 0.3, spg: 0.1, fg: 28.0, tp: 20.0, ft: 50.0, minutes: 2.3, ovr: 38 },
  { name: "Daníel Davíðsson", team: "tindastoll", pos: "SF", age: 24, nationality: "IS", gamesPlayed: 8, ppg: 1.0, rpg: 0.8, apg: 0.3, spg: 0.1, fg: 30.0, tp: 22.0, ft: 55.0, minutes: 4.0, ovr: 38 },
  { name: "Sæþór P. Hjaltason", team: "tindastoll", pos: "PG", age: 18, nationality: "IS", gamesPlayed: 12, ppg: 0.3, rpg: 0.3, apg: 0.2, spg: 0.1, fg: 22.0, tp: 15.0, ft: 50.0, minutes: 1.3, ovr: 32 },
  { name: "Víðir Elís Arnarsson", team: "tindastoll", pos: "SG", age: 18, nationality: "IS", gamesPlayed: 17, ppg: 0.3, rpg: 0.2, apg: 0.1, spg: 0.0, fg: 22.0, tp: 15.0, ft: 50.0, minutes: 1.2, ovr: 32 },
  { name: "Hallur A. Helgason", team: "tindastoll", pos: "C", age: 16, nationality: "IS", gamesPlayed: 4, ppg: 0.0, rpg: 0.2, apg: 0.0, spg: 0.0, fg: 20.0, tp: 0.0, ft: 40.0, minutes: 0.9, ovr: 30 },

  // ==================== STJARNAN (17 players) ====================
  { name: "Luka Gasic", team: "stjarnan", pos: "PF", age: 27, nationality: "RS", gamesPlayed: 22, ppg: 19.8, rpg: 7.2, apg: 2.5, spg: 0.8, fg: 57.6, tp: 36.4, ft: 79.2, minutes: 30.5, ovr: 86, foreign: true },
  { name: "Seth LeDay", team: "stjarnan", pos: "PF", age: 29, nationality: "US", gamesPlayed: 20, ppg: 18.1, rpg: 8.0, apg: 1.8, spg: 1.0, fg: 55.4, tp: 42.1, ft: 62.5, minutes: 28.0, ovr: 85, foreign: true },
  { name: "Orri Gunnarsson", team: "stjarnan", pos: "SG", age: 22, nationality: "IS", gamesPlayed: 18, ppg: 18.7, rpg: 3.5, apg: 3.2, spg: 1.2, fg: 46.1, tp: 34.9, ft: 81.7, minutes: 34.8, ovr: 82 },
  { name: "Hilmar Smári Henningsson", team: "stjarnan", pos: "SF", age: 25, nationality: "IS", gamesPlayed: 9, ppg: 20.4, rpg: 4.8, apg: 2.5, spg: 1.0, fg: 42.8, tp: 34.1, ft: 83.7, minutes: 30.2, ovr: 82 },
  { name: "Giannis Agravanis", team: "stjarnan", pos: "C", age: 27, nationality: "GR", gamesPlayed: 21, ppg: 14.0, rpg: 9.2, apg: 1.0, spg: 0.5, fg: 46.7, tp: 22.8, ft: 76.5, minutes: 28.5, ovr: 80, foreign: true },
  { name: "Ægir Þór Steinarsson", team: "stjarnan", pos: "SG", age: 34, nationality: "IS", gamesPlayed: 20, ppg: 13.0, rpg: 3.0, apg: 2.5, spg: 0.9, fg: 48.9, tp: 38.7, ft: 84.7, minutes: 29.4, ovr: 76 },
  { name: "Pablo Bertone", team: "stjarnan", pos: "PF", age: 35, nationality: "AR", gamesPlayed: 20, ppg: 10.6, rpg: 5.5, apg: 1.5, spg: 0.6, fg: 46.9, tp: 22.8, ft: 73.3, minutes: 21.3, ovr: 70, foreign: true },
  { name: "Bjarni Guðmann Jónsson", team: "stjarnan", pos: "SF", age: 26, nationality: "IS", gamesPlayed: 22, ppg: 6.6, rpg: 3.0, apg: 1.5, spg: 0.6, fg: 50.9, tp: 33.3, ft: 76.5, minutes: 18.5, ovr: 62 },
  { name: "Viktor Jónas Lúðvíksson", team: "stjarnan", pos: "PG", age: 19, nationality: "IS", gamesPlayed: 6, ppg: 3.2, rpg: 1.0, apg: 1.5, spg: 0.4, fg: 35.0, tp: 28.0, ft: 65.0, minutes: 8.7, ovr: 42 },
  { name: "Atli Hrafn Hjartarson", team: "stjarnan", pos: "SG", age: 18, nationality: "IS", gamesPlayed: 22, ppg: 1.4, rpg: 0.5, apg: 0.3, spg: 0.1, fg: 50.0, tp: 50.0, ft: 63.6, minutes: 3.3, ovr: 40 },
  { name: "Jakob Kári Leifsson", team: "stjarnan", pos: "PG", age: 17, nationality: "IS", gamesPlayed: 22, ppg: 1.1, rpg: 0.5, apg: 0.5, spg: 0.2, fg: 30.0, tp: 22.0, ft: 55.0, minutes: 4.1, ovr: 35 },
  { name: "Aron Kristian Jónasson", team: "stjarnan", pos: "C", age: 21, nationality: "IS", gamesPlayed: 22, ppg: 0.2, rpg: 0.5, apg: 0.1, spg: 0.0, fg: 25.0, tp: 0.0, ft: 50.0, minutes: 0.8, ovr: 35 },
  { name: "Jón Breki Sigurðarson", team: "stjarnan", pos: "PF", age: 22, nationality: "IS", gamesPlayed: 6, ppg: 1.0, rpg: 1.0, apg: 0.2, spg: 0.1, fg: 30.0, tp: 20.0, ft: 55.0, minutes: 3.0, ovr: 35 },
  { name: "Björn Skúli Birnisson", team: "stjarnan", pos: "SF", age: 18, nationality: "IS", gamesPlayed: 18, ppg: 0.2, rpg: 0.3, apg: 0.1, spg: 0.0, fg: 22.0, tp: 15.0, ft: 50.0, minutes: 1.3, ovr: 32 },
  { name: "Daníel G. Snorrason", team: "stjarnan", pos: "PG", age: 16, nationality: "IS", gamesPlayed: 11, ppg: 0.0, rpg: 0.1, apg: 0.1, spg: 0.0, fg: 18.0, tp: 10.0, ft: 40.0, minutes: 0.7, ovr: 28 },
  { name: "Kormákur Nói Jack", team: "stjarnan", pos: "SG", age: 15, nationality: "IS", gamesPlayed: 6, ppg: 0.0, rpg: 0.2, apg: 0.1, spg: 0.0, fg: 15.0, tp: 10.0, ft: 40.0, minutes: 1.9, ovr: 25 },
  { name: "Steinar R. Rafnarsson", team: "stjarnan", pos: "C", age: 16, nationality: "IS", gamesPlayed: 3, ppg: 0.0, rpg: 0.1, apg: 0.0, spg: 0.0, fg: 15.0, tp: 0.0, ft: 35.0, minutes: 0.0, ovr: 25 },

  // ==================== VALUR (20 players) ====================
  { name: "Kristófer Acox", team: "valur", pos: "C", age: 32, nationality: "US", gamesPlayed: 21, ppg: 21.6, rpg: 9.5, apg: 1.5, spg: 0.8, fg: 66.0, tp: 20.0, ft: 43.8, minutes: 30.5, ovr: 85, foreign: true },
  { name: "Kári Jónsson", team: "valur", pos: "SG", age: 28, nationality: "IS", gamesPlayed: 22, ppg: 16.7, rpg: 4.0, apg: 3.5, spg: 1.2, fg: 40.7, tp: 31.7, ft: 79.4, minutes: 32.4, ovr: 80 },
  { name: "Callum Lawson", team: "valur", pos: "SF", age: 29, nationality: "GB", gamesPlayed: 22, ppg: 14.3, rpg: 5.8, apg: 2.5, spg: 1.0, fg: 43.7, tp: 36.2, ft: 78.6, minutes: 33.5, ovr: 80, foreign: true },
  { name: "Keyshawn Woods", team: "valur", pos: "PG", age: 29, nationality: "US", gamesPlayed: 13, ppg: 14.6, rpg: 3.5, apg: 6.2, spg: 1.8, fg: 45.4, tp: 34.0, ft: 84.0, minutes: 32.9, ovr: 80, foreign: true },
  { name: "Frank Aron Booker", team: "valur", pos: "SF", age: 31, nationality: "IS", gamesPlayed: 20, ppg: 14.8, rpg: 4.5, apg: 2.5, spg: 1.0, fg: 41.4, tp: 35.4, ft: 74.1, minutes: 26.6, ovr: 78 },
  { name: "Lazar Nikolic", team: "valur", pos: "PF", age: 26, nationality: "RS", gamesPlayed: 22, ppg: 13.4, rpg: 6.5, apg: 1.5, spg: 0.7, fg: 36.1, tp: 31.4, ft: 73.8, minutes: 28.8, ovr: 76, foreign: true },
  { name: "Igor Maric", team: "valur", pos: "PF", age: 40, nationality: "RS", gamesPlayed: 7, ppg: 10.0, rpg: 5.0, apg: 1.2, spg: 0.5, fg: 50.0, tp: 44.1, ft: 50.0, minutes: 16.1, ovr: 68, foreign: true },
  { name: "LaDarien Griffin", team: "valur", pos: "PF", age: 29, nationality: "US", gamesPlayed: 8, ppg: 8.6, rpg: 4.5, apg: 1.0, spg: 0.6, fg: 43.8, tp: 33.3, ft: 61.5, minutes: 19.6, ovr: 68, foreign: true },
  { name: "Hjálmar Stefánsson", team: "valur", pos: "C", age: 29, nationality: "IS", gamesPlayed: 20, ppg: 7.6, rpg: 5.5, apg: 0.8, spg: 0.4, fg: 50.7, tp: 19.0, ft: 58.6, minutes: 16.4, ovr: 62 },
  { name: "Ástþór Atli Svalason", team: "valur", pos: "SG", age: 23, nationality: "IS", gamesPlayed: 7, ppg: 3.9, rpg: 1.2, apg: 1.0, spg: 0.3, fg: 41.2, tp: 45.5, ft: 80.0, minutes: 11.7, ovr: 50 },
  { name: "Karl Kristján Sigurðarson", team: "valur", pos: "PG", age: 20, nationality: "IS", gamesPlayed: 22, ppg: 1.7, rpg: 0.5, apg: 0.8, spg: 0.2, fg: 41.3, tp: 37.5, ft: 100.0, minutes: 6.1, ovr: 42 },
  { name: "Björn Kristjánsson", team: "valur", pos: "SF", age: 33, nationality: "IS", gamesPlayed: 3, ppg: 0.0, rpg: 0.3, apg: 0.1, spg: 0.0, fg: 25.0, tp: 20.0, ft: 50.0, minutes: 0.0, ovr: 35 },
  { name: "Sveinn Geirsson", team: "valur", pos: "PG", age: 24, nationality: "IS", gamesPlayed: 8, ppg: 1.5, rpg: 0.5, apg: 1.0, spg: 0.2, fg: 32.0, tp: 25.0, ft: 60.0, minutes: 5.0, ovr: 40 },
  { name: "Oliver Thor Collington", team: "valur", pos: "SG", age: 22, nationality: "IS", gamesPlayed: 4, ppg: 0.2, rpg: 0.3, apg: 0.1, spg: 0.0, fg: 22.0, tp: 15.0, ft: 50.0, minutes: 0.4, ovr: 30 },
  { name: "Arnór B. Halldórsson", team: "valur", pos: "SF", age: 17, nationality: "IS", gamesPlayed: 8, ppg: 0.0, rpg: 0.1, apg: 0.0, spg: 0.0, fg: 18.0, tp: 12.0, ft: 40.0, minutes: 0.2, ovr: 30 },
  { name: "Veigar Svavarsson", team: "valur", pos: "PG", age: 20, nationality: "IS", gamesPlayed: 20, ppg: 0.2, rpg: 0.2, apg: 0.2, spg: 0.0, fg: 20.0, tp: 15.0, ft: 50.0, minutes: 0.9, ovr: 30 },
  { name: "Orri Svavarsson", team: "valur", pos: "SG", age: 20, nationality: "IS", gamesPlayed: 20, ppg: 0.2, rpg: 0.2, apg: 0.1, spg: 0.0, fg: 20.0, tp: 15.0, ft: 50.0, minutes: 0.6, ovr: 30 },
  { name: "Einar M. Ólafsson", team: "valur", pos: "PF", age: 19, nationality: "IS", gamesPlayed: 7, ppg: 0.0, rpg: 0.1, apg: 0.0, spg: 0.0, fg: 18.0, tp: 12.0, ft: 40.0, minutes: 0.1, ovr: 30 },
  { name: "Didrik H. Yeoman", team: "valur", pos: "C", age: 16, nationality: "IS", gamesPlayed: 1, ppg: 0.0, rpg: 0.0, apg: 0.0, spg: 0.0, fg: 15.0, tp: 0.0, ft: 35.0, minutes: 0.0, ovr: 25 },
  { name: "Gabríel K. Ágústsson", team: "valur", pos: "PG", age: 16, nationality: "IS", gamesPlayed: 1, ppg: 0.0, rpg: 0.0, apg: 0.0, spg: 0.0, fg: 15.0, tp: 10.0, ft: 35.0, minutes: 0.0, ovr: 25 },

  // ==================== KEFLAVÍK (17 players) ====================
  { name: "Egor Koulechov", team: "keflavik", pos: "SF", age: 29, nationality: "RU", gamesPlayed: 19, ppg: 18.4, rpg: 5.5, apg: 2.8, spg: 1.0, fg: 40.9, tp: 27.9, ft: 86.2, minutes: 32.2, ovr: 82, foreign: true },
  { name: "Mirza Bulic", team: "keflavik", pos: "C", age: 33, nationality: "BA", gamesPlayed: 16, ppg: 17.6, rpg: 8.8, apg: 1.2, spg: 0.5, fg: 61.2, tp: 33.3, ft: 83.3, minutes: 29.0, ovr: 82, foreign: true },
  { name: "Craig Moller", team: "keflavik", pos: "PF", age: 31, nationality: "AU", gamesPlayed: 22, ppg: 13.7, rpg: 6.2, apg: 2.0, spg: 0.8, fg: 45.5, tp: 41.1, ft: 88.0, minutes: 29.1, ovr: 78, foreign: true },
  { name: "Remy Martin", team: "keflavik", pos: "PG", age: 27, nationality: "US", gamesPlayed: 5, ppg: 14.2, rpg: 2.5, apg: 5.0, spg: 1.5, fg: 39.3, tp: 33.3, ft: 90.0, minutes: 30.6, ovr: 78, foreign: true },
  { name: "Hilmar Pétursson", team: "keflavik", pos: "SG", age: 25, nationality: "IS", gamesPlayed: 22, ppg: 13.3, rpg: 3.0, apg: 2.5, spg: 0.9, fg: 45.4, tp: 39.5, ft: 85.7, minutes: 28.9, ovr: 74 },
  { name: "Jaka Brodnik", team: "keflavik", pos: "SF", age: 33, nationality: "SI", gamesPlayed: 21, ppg: 11.2, rpg: 4.0, apg: 2.0, spg: 0.7, fg: 55.8, tp: 40.0, ft: 72.2, minutes: 22.9, ovr: 74, foreign: true },
  { name: "Ólafur Björn Gunnlaugsson", team: "keflavik", pos: "PF", age: 23, nationality: "IS", gamesPlayed: 22, ppg: 7.2, rpg: 3.5, apg: 1.2, spg: 0.5, fg: 41.2, tp: 29.8, ft: 66.7, minutes: 20.5, ovr: 60 },
  { name: "Jordan Williams", team: "keflavik", pos: "C", age: 30, nationality: "US", gamesPlayed: 3, ppg: 7.3, rpg: 5.0, apg: 0.8, spg: 0.3, fg: 45.5, tp: 33.3, ft: 28.6, minutes: 26.9, ovr: 62, foreign: true },
  { name: "Halldór Garðar Hermannsson", team: "keflavik", pos: "PG", age: 28, nationality: "IS", gamesPlayed: 20, ppg: 6.7, rpg: 2.0, apg: 3.0, spg: 0.8, fg: 36.0, tp: 30.0, ft: 65.7, minutes: 18.2, ovr: 58 },
  { name: "Valur Orri Valsson", team: "keflavik", pos: "SG", age: 31, nationality: "IS", gamesPlayed: 11, ppg: 3.3, rpg: 1.0, apg: 0.5, spg: 0.2, fg: 41.7, tp: 42.9, ft: 83.3, minutes: 9.2, ovr: 48 },
  { name: "Nikola Orelj", team: "keflavik", pos: "PF", age: 23, nationality: "HR", gamesPlayed: 17, ppg: 0.2, rpg: 0.3, apg: 0.1, spg: 0.0, fg: 22.0, tp: 15.0, ft: 50.0, minutes: 0.2, ovr: 30 },
  { name: "Eyþór Lár Bárðarson", team: "keflavik", pos: "SF", age: 22, nationality: "IS", gamesPlayed: 22, ppg: 0.4, rpg: 0.3, apg: 0.2, spg: 0.1, fg: 25.0, tp: 18.0, ft: 50.0, minutes: 2.0, ovr: 35 },
  { name: "Frosti Sigurðsson", team: "keflavik", pos: "PG", age: 20, nationality: "IS", gamesPlayed: 15, ppg: 0.2, rpg: 0.2, apg: 0.2, spg: 0.0, fg: 20.0, tp: 15.0, ft: 50.0, minutes: 1.4, ovr: 30 },
  { name: "Viktor M. Sigurðsson", team: "keflavik", pos: "SG", age: 18, nationality: "IS", gamesPlayed: 7, ppg: 0.0, rpg: 0.1, apg: 0.1, spg: 0.0, fg: 18.0, tp: 12.0, ft: 40.0, minutes: 0.3, ovr: 28 },
  { name: "Jakob Máni Magnússon", team: "keflavik", pos: "C", age: 19, nationality: "IS", gamesPlayed: 18, ppg: 0.1, rpg: 0.2, apg: 0.0, spg: 0.0, fg: 18.0, tp: 0.0, ft: 40.0, minutes: 0.4, ovr: 28 },
  { name: "Daniel E. Ottesen Clark", team: "keflavik", pos: "PG", age: 18, nationality: "IS", gamesPlayed: 10, ppg: 0.0, rpg: 0.1, apg: 0.1, spg: 0.0, fg: 18.0, tp: 12.0, ft: 40.0, minutes: 0.1, ovr: 28 },
  { name: "Dagur S. Örvarsson", team: "keflavik", pos: "SF", age: 18, nationality: "IS", gamesPlayed: 2, ppg: 0.0, rpg: 0.0, apg: 0.0, spg: 0.0, fg: 18.0, tp: 12.0, ft: 40.0, minutes: 0.0, ovr: 28 },

  // ==================== KR (18 players) ====================
  { name: "Linards Jaunzems", team: "kr", pos: "PF", age: 30, nationality: "LV", gamesPlayed: 20, ppg: 22.3, rpg: 6.9, apg: 2.0, spg: 0.9, fg: 59.5, tp: 37.3, ft: 68.3, minutes: 32.3, ovr: 88, foreign: true },
  { name: "Kenneth Doucet jr", team: "kr", pos: "SG", age: 22, nationality: "US", gamesPlayed: 21, ppg: 19.2, rpg: 4.5, apg: 3.8, spg: 1.5, fg: 52.0, tp: 42.3, ft: 77.9, minutes: 31.0, ovr: 85, foreign: true },
  { name: "Þórir G. Þorbjarnarson", team: "kr", pos: "SF", age: 27, nationality: "IS", gamesPlayed: 22, ppg: 17.3, rpg: 5.8, apg: 3.5, spg: 1.2, fg: 44.0, tp: 33.7, ft: 73.6, minutes: 34.0, ovr: 82 },
  { name: "Toms Leimanis", team: "kr", pos: "C", age: 31, nationality: "LV", gamesPlayed: 11, ppg: 17.3, rpg: 7.5, apg: 1.0, spg: 0.5, fg: 44.3, tp: 48.1, ft: 90.3, minutes: 31.6, ovr: 82, foreign: true },
  { name: "Aleksa Jugovic", team: "kr", pos: "SF", age: 30, nationality: "RS", gamesPlayed: 12, ppg: 11.3, rpg: 3.5, apg: 2.0, spg: 0.8, fg: 38.9, tp: 40.0, ft: 93.3, minutes: 25.4, ovr: 74, foreign: true },
  { name: "Rinalds Malmanis", team: "kr", pos: "PF", age: 29, nationality: "LV", gamesPlayed: 7, ppg: 11.4, rpg: 5.5, apg: 1.0, spg: 0.5, fg: 53.0, tp: 22.2, ft: 72.7, minutes: 24.1, ovr: 72, foreign: true },
  { name: "Friðrik Anton Jónsson", team: "kr", pos: "SG", age: 23, nationality: "IS", gamesPlayed: 22, ppg: 9.9, rpg: 2.5, apg: 2.0, spg: 0.8, fg: 51.9, tp: 47.2, ft: 56.0, minutes: 20.5, ovr: 68 },
  { name: "Þorvaldur Orri Árnason", team: "kr", pos: "PG", age: 23, nationality: "IS", gamesPlayed: 21, ppg: 6.1, rpg: 2.0, apg: 3.0, spg: 0.7, fg: 37.9, tp: 31.7, ft: 80.8, minutes: 21.3, ovr: 55 },
  { name: "Vlatko Granic", team: "kr", pos: "C", age: 31, nationality: "HR", gamesPlayed: 5, ppg: 5.2, rpg: 3.5, apg: 0.5, spg: 0.3, fg: 45.8, tp: 27.3, ft: 50.0, minutes: 18.2, ovr: 55, foreign: true },
  { name: "Orri Hilmarsson", team: "kr", pos: "SF", age: 26, nationality: "IS", gamesPlayed: 13, ppg: 2.5, rpg: 1.0, apg: 0.5, spg: 0.2, fg: 40.7, tp: 36.4, ft: 100.0, minutes: 7.4, ovr: 45 },
  { name: "Veigar Áki Hlynsson", team: "kr", pos: "PF", age: 24, nationality: "IS", gamesPlayed: 21, ppg: 2.8, rpg: 1.5, apg: 0.5, spg: 0.2, fg: 37.9, tp: 30.8, ft: 60.0, minutes: 14.1, ovr: 45 },
  { name: "Lars Erik Bragason", team: "kr", pos: "PG", age: 19, nationality: "IS", gamesPlayed: 20, ppg: 2.5, rpg: 0.8, apg: 1.2, spg: 0.3, fg: 40.5, tp: 30.4, ft: 72.7, minutes: 7.1, ovr: 42 },
  { name: "Reynir Barðdal", team: "kr", pos: "SG", age: 21, nationality: "IS", gamesPlayed: 21, ppg: 1.5, rpg: 0.5, apg: 0.3, spg: 0.1, fg: 57.9, tp: 40.0, ft: 83.3, minutes: 2.8, ovr: 38 },
  { name: "Hallgrímur Árni Þrastarson", team: "kr", pos: "SF", age: 20, nationality: "IS", gamesPlayed: 21, ppg: 0.5, rpg: 0.3, apg: 0.2, spg: 0.1, fg: 25.0, tp: 18.0, ft: 50.0, minutes: 1.0, ovr: 32 },
  { name: "Almar Orri Atlason", team: "kr", pos: "PG", age: 19, nationality: "IS", gamesPlayed: 5, ppg: 0.5, rpg: 0.3, apg: 0.5, spg: 0.1, fg: 22.0, tp: 15.0, ft: 50.0, minutes: 2.0, ovr: 30 },
  { name: "Alexander Óðinn Knudsen", team: "kr", pos: "SG", age: 19, nationality: "IS", gamesPlayed: 5, ppg: 0.3, rpg: 0.2, apg: 0.2, spg: 0.0, fg: 20.0, tp: 15.0, ft: 50.0, minutes: 1.5, ovr: 30 },
  { name: "Lárus G. Ólafsson", team: "kr", pos: "C", age: 17, nationality: "IS", gamesPlayed: 9, ppg: 0.2, rpg: 0.3, apg: 0.0, spg: 0.0, fg: 18.0, tp: 0.0, ft: 40.0, minutes: 0.5, ovr: 28 },
  { name: "Benóní S. Andrason", team: "kr", pos: "PG", age: 16, nationality: "IS", gamesPlayed: 9, ppg: 0.0, rpg: 0.1, apg: 0.1, spg: 0.0, fg: 15.0, tp: 10.0, ft: 35.0, minutes: 0.4, ovr: 25 },

  // ==================== ÍR (17 players) ====================
  { name: "Jacob Falko", team: "ir", pos: "SG", age: 25, nationality: "US", gamesPlayed: 22, ppg: 22.2, rpg: 4.5, apg: 3.8, spg: 1.5, fg: 52.4, tp: 40.8, ft: 77.4, minutes: 36.1, ovr: 87, foreign: true },
  { name: "Dimitrios Klonaras", team: "ir", pos: "PG", age: 24, nationality: "GR", gamesPlayed: 22, ppg: 16.3, rpg: 3.2, apg: 6.0, spg: 1.3, fg: 42.9, tp: 29.8, ft: 76.4, minutes: 33.1, ovr: 80, foreign: true },
  { name: "Matej Kavas", team: "ir", pos: "SF", age: 29, nationality: "SI", gamesPlayed: 6, ppg: 17.2, rpg: 5.0, apg: 2.5, spg: 1.0, fg: 43.2, tp: 38.1, ft: 84.6, minutes: 32.3, ovr: 80, foreign: true },
  { name: "Hákon Örn Hjálmarsson", team: "ir", pos: "SF", age: 26, nationality: "IS", gamesPlayed: 22, ppg: 14.1, rpg: 4.2, apg: 2.0, spg: 1.0, fg: 41.3, tp: 40.4, ft: 72.5, minutes: 31.5, ovr: 78 },
  { name: "Tsotne Tsartsidze", team: "ir", pos: "PF", age: 25, nationality: "GE", gamesPlayed: 22, ppg: 13.5, rpg: 6.0, apg: 1.5, spg: 0.7, fg: 51.8, tp: 33.8, ft: 72.9, minutes: 31.8, ovr: 76, foreign: true },
  { name: "Tómas Orri Hjálmarsson", team: "ir", pos: "SG", age: 22, nationality: "IS", gamesPlayed: 17, ppg: 9.6, rpg: 2.5, apg: 1.5, spg: 0.6, fg: 49.6, tp: 37.3, ft: 73.9, minutes: 18.7, ovr: 65 },
  { name: "Emilio Banic", team: "ir", pos: "PF", age: 32, nationality: "HR", gamesPlayed: 4, ppg: 6.8, rpg: 3.5, apg: 1.0, spg: 0.4, fg: 32.4, tp: 23.8, ft: 60.0, minutes: 19.7, ovr: 58, foreign: true },
  { name: "Björgvin H. Ríkharðsson", team: "ir", pos: "C", age: 32, nationality: "IS", gamesPlayed: 20, ppg: 4.9, rpg: 4.0, apg: 0.5, spg: 0.3, fg: 54.4, tp: 11.1, ft: 50.0, minutes: 15.2, ovr: 52 },
  { name: "Kristján Fannar Ingólfsson", team: "ir", pos: "PG", age: 20, nationality: "IS", gamesPlayed: 15, ppg: 3.2, rpg: 1.0, apg: 1.5, spg: 0.4, fg: 28.1, tp: 27.5, ft: 100.0, minutes: 11.0, ovr: 42 },
  { name: "Rafn Kristján Kristjánsson", team: "ir", pos: "PF", age: 26, nationality: "IS", gamesPlayed: 16, ppg: 1.2, rpg: 1.5, apg: 0.3, spg: 0.1, fg: 33.3, tp: 0.0, ft: 53.8, minutes: 7.0, ovr: 38 },
  { name: "Aron Orri Hilmarsson", team: "ir", pos: "SG", age: 21, nationality: "IS", gamesPlayed: 11, ppg: 0.8, rpg: 0.5, apg: 0.3, spg: 0.1, fg: 28.0, tp: 20.0, ft: 55.0, minutes: 3.8, ovr: 35 },
  { name: "Þorsteinn Bjarni Arnarsson", team: "ir", pos: "SF", age: 22, nationality: "IS", gamesPlayed: 8, ppg: 1.0, rpg: 0.8, apg: 0.3, spg: 0.1, fg: 30.0, tp: 22.0, ft: 55.0, minutes: 4.0, ovr: 35 },
  { name: "Frank Gerritsen", team: "ir", pos: "PG", age: 22, nationality: "NL", gamesPlayed: 20, ppg: 0.2, rpg: 0.2, apg: 0.2, spg: 0.0, fg: 20.0, tp: 15.0, ft: 50.0, minutes: 0.7, ovr: 30, foreign: true },
  { name: "Bjarni Jóhann Halldórsson", team: "ir", pos: "C", age: 17, nationality: "IS", gamesPlayed: 16, ppg: 0.1, rpg: 0.2, apg: 0.0, spg: 0.0, fg: 18.0, tp: 0.0, ft: 40.0, minutes: 0.3, ovr: 25 },
  { name: "Hannes Gunnlaugsson", team: "ir", pos: "SG", age: 17, nationality: "IS", gamesPlayed: 18, ppg: 0.1, rpg: 0.1, apg: 0.1, spg: 0.0, fg: 18.0, tp: 12.0, ft: 40.0, minutes: 0.3, ovr: 25 },
  { name: "Sigurþór Hjörleifsson", team: "ir", pos: "PF", age: 17, nationality: "IS", gamesPlayed: 11, ppg: 0.0, rpg: 0.1, apg: 0.0, spg: 0.0, fg: 15.0, tp: 10.0, ft: 35.0, minutes: 0.5, ovr: 25 },
  { name: "Oliver Aron Andrason", team: "ir", pos: "SF", age: 18, nationality: "IS", gamesPlayed: 2, ppg: 0.0, rpg: 0.0, apg: 0.0, spg: 0.0, fg: 18.0, tp: 12.0, ft: 40.0, minutes: 0.0, ovr: 25 },

  // ==================== NJARÐVÍK (21 players) ====================
  { name: "Dwayne Lautier-Ogunleye", team: "njardvik", pos: "SF", age: 27, nationality: "GB", gamesPlayed: 22, ppg: 25.2, rpg: 5.8, apg: 3.5, spg: 1.8, fg: 49.0, tp: 37.3, ft: 77.4, minutes: 35.3, ovr: 89, foreign: true },
  { name: "Dominykas Milka", team: "njardvik", pos: "SG", age: 26, nationality: "LT", gamesPlayed: 22, ppg: 14.0, rpg: 3.5, apg: 2.0, spg: 0.8, fg: 52.5, tp: 52.3, ft: 82.4, minutes: 29.7, ovr: 78, foreign: true },
  { name: "Mario Matasovic", team: "njardvik", pos: "C", age: 28, nationality: "HR", gamesPlayed: 7, ppg: 15.4, rpg: 8.5, apg: 1.0, spg: 0.5, fg: 57.6, tp: 50.0, ft: 81.3, minutes: 27.6, ovr: 78, foreign: true },
  { name: "Veigar Páll Alexandersson", team: "njardvik", pos: "SG", age: 25, nationality: "IS", gamesPlayed: 22, ppg: 15.1, rpg: 3.2, apg: 2.5, spg: 1.0, fg: 42.0, tp: 36.6, ft: 74.5, minutes: 33.3, ovr: 76 },
  { name: "Sven Smajlagic", team: "njardvik", pos: "PF", age: 26, nationality: "BA", gamesPlayed: 11, ppg: 15.1, rpg: 6.5, apg: 1.5, spg: 0.7, fg: 40.4, tp: 30.4, ft: 66.7, minutes: 32.2, ovr: 76, foreign: true },
  { name: "Luwane Pipkins", team: "njardvik", pos: "PG", age: 28, nationality: "US", gamesPlayed: 9, ppg: 14.0, rpg: 2.5, apg: 4.8, spg: 1.3, fg: 37.4, tp: 36.7, ft: 78.6, minutes: 33.8, ovr: 76, foreign: true },
  { name: "Isaiah Coddon", team: "njardvik", pos: "SG", age: 29, nationality: "US", gamesPlayed: 11, ppg: 1.5, rpg: 0.5, apg: 0.3, spg: 0.1, fg: 30.0, tp: 25.0, ft: 60.0, minutes: 4.3, ovr: 45, foreign: true },
  { name: "Julio Calver De Assis Afonso", team: "njardvik", pos: "PF", age: 26, nationality: "BR", gamesPlayed: 10, ppg: 5.0, rpg: 3.5, apg: 0.8, spg: 0.4, fg: 42.0, tp: 28.0, ft: 65.0, minutes: 15.0, ovr: 52, foreign: true },
  { name: "Róbert Sean Birmingham", team: "njardvik", pos: "PG", age: 25, nationality: "US", gamesPlayed: 8, ppg: 4.0, rpg: 1.5, apg: 2.5, spg: 0.6, fg: 35.0, tp: 28.0, ft: 70.0, minutes: 12.0, ovr: 48, foreign: true },
  { name: "Kristófer Mikael Hearn", team: "njardvik", pos: "SF", age: 24, nationality: "IS", gamesPlayed: 18, ppg: 4.5, rpg: 2.0, apg: 1.0, spg: 0.4, fg: 38.0, tp: 30.0, ft: 68.0, minutes: 14.0, ovr: 48 },
  { name: "Logi Örn Logason", team: "njardvik", pos: "PG", age: 23, nationality: "IS", gamesPlayed: 16, ppg: 3.0, rpg: 1.0, apg: 2.0, spg: 0.4, fg: 35.0, tp: 28.0, ft: 65.0, minutes: 10.0, ovr: 45 },
  { name: "Sigurður Magnússon", team: "njardvik", pos: "C", age: 27, nationality: "IS", gamesPlayed: 18, ppg: 3.5, rpg: 3.5, apg: 0.5, spg: 0.2, fg: 45.0, tp: 0.0, ft: 55.0, minutes: 12.0, ovr: 48 },
  { name: "Sigurbergur Ísaksson", team: "njardvik", pos: "PF", age: 22, nationality: "IS", gamesPlayed: 14, ppg: 2.0, rpg: 2.0, apg: 0.3, spg: 0.2, fg: 35.0, tp: 22.0, ft: 55.0, minutes: 8.0, ovr: 40 },
  { name: "Almar Orri Jónsson", team: "njardvik", pos: "SG", age: 21, nationality: "IS", gamesPlayed: 12, ppg: 1.5, rpg: 0.8, apg: 0.5, spg: 0.2, fg: 30.0, tp: 22.0, ft: 55.0, minutes: 5.0, ovr: 38 },
  { name: "Brynjar Kári Gunnarsson", team: "njardvik", pos: "SF", age: 20, nationality: "IS", gamesPlayed: 10, ppg: 1.2, rpg: 0.8, apg: 0.3, spg: 0.1, fg: 28.0, tp: 20.0, ft: 55.0, minutes: 4.0, ovr: 35 },
  { name: "Bóas Orri Unnarsson", team: "njardvik", pos: "PG", age: 19, nationality: "IS", gamesPlayed: 8, ppg: 0.8, rpg: 0.3, apg: 0.5, spg: 0.1, fg: 25.0, tp: 18.0, ft: 50.0, minutes: 3.0, ovr: 32 },
  { name: "Guðmundur Aron Jóhannesson", team: "njardvik", pos: "C", age: 20, nationality: "IS", gamesPlayed: 10, ppg: 1.0, rpg: 1.0, apg: 0.2, spg: 0.1, fg: 30.0, tp: 0.0, ft: 50.0, minutes: 4.0, ovr: 35 },
  { name: "Ómar Helgi Kárason", team: "njardvik", pos: "SG", age: 19, nationality: "IS", gamesPlayed: 8, ppg: 0.5, rpg: 0.3, apg: 0.2, spg: 0.0, fg: 22.0, tp: 15.0, ft: 50.0, minutes: 2.0, ovr: 30 },
  { name: "Ómar Orri Gíslason", team: "njardvik", pos: "PF", age: 18, nationality: "IS", gamesPlayed: 6, ppg: 0.3, rpg: 0.5, apg: 0.1, spg: 0.0, fg: 20.0, tp: 12.0, ft: 45.0, minutes: 1.5, ovr: 28 },
  { name: "Snjólfur Marel Stefánsson", team: "njardvik", pos: "SF", age: 18, nationality: "IS", gamesPlayed: 6, ppg: 0.2, rpg: 0.3, apg: 0.1, spg: 0.0, fg: 20.0, tp: 15.0, ft: 45.0, minutes: 1.0, ovr: 28 },
  { name: "Viktor Máni Ólafsson", team: "njardvik", pos: "PG", age: 18, nationality: "IS", gamesPlayed: 5, ppg: 0.2, rpg: 0.2, apg: 0.3, spg: 0.0, fg: 20.0, tp: 15.0, ft: 45.0, minutes: 1.0, ovr: 28 },

  // ==================== ÁLFTANES (17 players) ====================
  { name: "Ade Murkey", team: "alftanes", pos: "SF", age: 26, nationality: "US", gamesPlayed: 14, ppg: 23.3, rpg: 7.7, apg: 2.8, spg: 1.5, fg: 48.2, tp: 37.5, ft: 72.6, minutes: 33.3, ovr: 86, foreign: true },
  { name: "Justin James", team: "alftanes", pos: "SG", age: 27, nationality: "US", gamesPlayed: 8, ppg: 23.0, rpg: 7.1, apg: 2.5, spg: 1.2, fg: 40.1, tp: 24.6, ft: 81.1, minutes: 35.2, ovr: 85, foreign: true },
  { name: "David Okeke", team: "alftanes", pos: "C", age: 28, nationality: "NG", gamesPlayed: 22, ppg: 17.9, rpg: 9.5, apg: 1.0, spg: 0.6, fg: 61.9, tp: 36.4, ft: 73.8, minutes: 29.8, ovr: 84, foreign: true },
  { name: "Nikola Miscovic", team: "alftanes", pos: "PF", age: 28, nationality: "RS", gamesPlayed: 15, ppg: 10.0, rpg: 5.5, apg: 1.5, spg: 0.6, fg: 46.0, tp: 32.0, ft: 70.0, minutes: 22.0, ovr: 68, foreign: true },
  { name: "Rati Andronikashvili", team: "alftanes", pos: "SF", age: 26, nationality: "GE", gamesPlayed: 12, ppg: 8.0, rpg: 3.5, apg: 1.5, spg: 0.7, fg: 42.0, tp: 30.0, ft: 72.0, minutes: 18.0, ovr: 62, foreign: true },
  { name: "Shawn Hopkins", team: "alftanes", pos: "PG", age: 28, nationality: "US", gamesPlayed: 10, ppg: 9.0, rpg: 2.0, apg: 4.0, spg: 1.0, fg: 40.0, tp: 33.0, ft: 75.0, minutes: 22.0, ovr: 65, foreign: true },
  { name: "Colin Júlíus Lewis", team: "alftanes", pos: "PG", age: 23, nationality: "IS", gamesPlayed: 18, ppg: 5.0, rpg: 1.5, apg: 3.0, spg: 0.6, fg: 38.0, tp: 30.0, ft: 72.0, minutes: 16.0, ovr: 52 },
  { name: "Ragnar Ágúst Nathanaelsson", team: "alftanes", pos: "SG", age: 24, nationality: "IS", gamesPlayed: 18, ppg: 4.5, rpg: 1.5, apg: 1.2, spg: 0.4, fg: 36.0, tp: 28.0, ft: 68.0, minutes: 14.0, ovr: 48 },
  { name: "Sigurður Pétursson", team: "alftanes", pos: "C", age: 26, nationality: "IS", gamesPlayed: 16, ppg: 4.0, rpg: 4.0, apg: 0.5, spg: 0.3, fg: 48.0, tp: 0.0, ft: 60.0, minutes: 14.0, ovr: 50 },
  { name: "Hilmir Arnarson", team: "alftanes", pos: "PF", age: 22, nationality: "IS", gamesPlayed: 15, ppg: 3.0, rpg: 2.5, apg: 0.5, spg: 0.2, fg: 38.0, tp: 25.0, ft: 60.0, minutes: 10.0, ovr: 42 },
  { name: "Haukur Helgi Briem Pálsson", team: "alftanes", pos: "SG", age: 20, nationality: "IS", gamesPlayed: 12, ppg: 2.0, rpg: 0.8, apg: 0.8, spg: 0.2, fg: 32.0, tp: 25.0, ft: 60.0, minutes: 6.0, ovr: 38 },
  { name: "Ingimundur Orri Jóhannsson", team: "alftanes", pos: "SF", age: 19, nationality: "IS", gamesPlayed: 10, ppg: 1.5, rpg: 0.8, apg: 0.3, spg: 0.1, fg: 28.0, tp: 20.0, ft: 55.0, minutes: 4.0, ovr: 35 },
  { name: "Duncan Tindur Guðnason", team: "alftanes", pos: "PG", age: 19, nationality: "IS", gamesPlayed: 10, ppg: 1.0, rpg: 0.5, apg: 0.8, spg: 0.2, fg: 25.0, tp: 18.0, ft: 55.0, minutes: 4.0, ovr: 33 },
  { name: "Almar Orn Bjornsson", team: "alftanes", pos: "PF", age: 20, nationality: "IS", gamesPlayed: 8, ppg: 1.0, rpg: 1.0, apg: 0.2, spg: 0.1, fg: 28.0, tp: 18.0, ft: 50.0, minutes: 3.0, ovr: 32 },
  { name: "Dúi Þór Jónsson", team: "alftanes", pos: "C", age: 18, nationality: "IS", gamesPlayed: 6, ppg: 0.5, rpg: 0.8, apg: 0.1, spg: 0.0, fg: 25.0, tp: 0.0, ft: 45.0, minutes: 2.0, ovr: 30 },
  { name: "Arnór Steinn Leifsson", team: "alftanes", pos: "SG", age: 18, nationality: "IS", gamesPlayed: 5, ppg: 0.3, rpg: 0.2, apg: 0.1, spg: 0.0, fg: 22.0, tp: 15.0, ft: 50.0, minutes: 1.5, ovr: 28 },
  { name: "Árni Dagur Kristjánsson", team: "alftanes", pos: "SF", age: 17, nationality: "IS", gamesPlayed: 4, ppg: 0.2, rpg: 0.2, apg: 0.1, spg: 0.0, fg: 20.0, tp: 12.0, ft: 45.0, minutes: 1.0, ovr: 28 },

  // ==================== ÁRMANN (16 players) ====================
  { name: "Bragi Guðmundsson", team: "armann", pos: "SG", age: 25, nationality: "IS", gamesPlayed: 22, ppg: 21.9, rpg: 5.5, apg: 3.0, spg: 1.2, fg: 43.8, tp: 33.9, ft: 71.7, minutes: 35.7, ovr: 84 },
  { name: "Daniel Love", team: "armann", pos: "PF", age: 28, nationality: "US", gamesPlayed: 22, ppg: 17.9, rpg: 7.5, apg: 2.0, spg: 0.8, fg: 52.5, tp: 36.7, ft: 81.7, minutes: 29.6, ovr: 82, foreign: true },
  { name: "Brandon Averette", team: "armann", pos: "PG", age: 27, nationality: "US", gamesPlayed: 19, ppg: 15.3, rpg: 3.0, apg: 5.5, spg: 1.2, fg: 52.0, tp: 46.3, ft: 90.3, minutes: 30.8, ovr: 82, foreign: true },
  { name: "Lagio Grantsaan", team: "armann", pos: "SF", age: 27, nationality: "SR", gamesPlayed: 7, ppg: 14.9, rpg: 5.0, apg: 2.0, spg: 1.0, fg: 48.1, tp: 31.8, ft: 75.0, minutes: 31.2, ovr: 76, foreign: true },
  { name: "Cedrick Bowen", team: "armann", pos: "PF", age: 30, nationality: "US", gamesPlayed: 12, ppg: 8.5, rpg: 5.5, apg: 1.0, spg: 0.5, fg: 48.0, tp: 25.0, ft: 65.0, minutes: 20.0, ovr: 62, foreign: true },
  { name: "Marek Dolezaj", team: "armann", pos: "PF", age: 27, nationality: "SK", gamesPlayed: 10, ppg: 7.0, rpg: 4.5, apg: 1.5, spg: 0.5, fg: 44.0, tp: 30.0, ft: 68.0, minutes: 18.0, ovr: 60, foreign: true },
  { name: "Zarko Jukic", team: "armann", pos: "C", age: 32, nationality: "RS", gamesPlayed: 10, ppg: 7.5, rpg: 5.5, apg: 1.0, spg: 0.4, fg: 44.8, tp: 21.7, ft: 47.6, minutes: 22.0, ovr: 62, foreign: true },
  { name: "Vonterius Woolbright", team: "armann", pos: "SG", age: 27, nationality: "US", gamesPlayed: 10, ppg: 8.0, rpg: 2.5, apg: 2.0, spg: 0.8, fg: 40.0, tp: 32.0, ft: 72.0, minutes: 20.0, ovr: 60, foreign: true },
  { name: "Kári Kaldal", team: "armann", pos: "PG", age: 25, nationality: "IS", gamesPlayed: 18, ppg: 5.0, rpg: 1.5, apg: 3.0, spg: 0.6, fg: 38.0, tp: 30.0, ft: 72.0, minutes: 16.0, ovr: 52 },
  { name: "Valur Kári Eiðsson", team: "armann", pos: "SF", age: 23, nationality: "IS", gamesPlayed: 16, ppg: 4.0, rpg: 2.0, apg: 1.0, spg: 0.4, fg: 36.0, tp: 28.0, ft: 68.0, minutes: 12.0, ovr: 48 },
  { name: "Frosti Valgarðsson", team: "armann", pos: "SG", age: 22, nationality: "IS", gamesPlayed: 14, ppg: 3.0, rpg: 1.0, apg: 0.8, spg: 0.3, fg: 34.0, tp: 26.0, ft: 65.0, minutes: 10.0, ovr: 42 },
  { name: "Ingvi Þór Guðmundsson", team: "armann", pos: "C", age: 24, nationality: "IS", gamesPlayed: 14, ppg: 2.5, rpg: 3.0, apg: 0.3, spg: 0.2, fg: 42.0, tp: 0.0, ft: 55.0, minutes: 10.0, ovr: 42 },
  { name: "Jakob Leifur Kristbjarnarson", team: "armann", pos: "PF", age: 21, nationality: "IS", gamesPlayed: 12, ppg: 2.0, rpg: 1.5, apg: 0.3, spg: 0.2, fg: 32.0, tp: 22.0, ft: 55.0, minutes: 6.0, ovr: 38 },
  { name: "Jóel Fannar Jónsson", team: "armann", pos: "PG", age: 20, nationality: "IS", gamesPlayed: 10, ppg: 1.5, rpg: 0.5, apg: 1.2, spg: 0.2, fg: 28.0, tp: 20.0, ft: 55.0, minutes: 5.0, ovr: 35 },
  { name: "Arnaldur Grímsson", team: "armann", pos: "SF", age: 19, nationality: "IS", gamesPlayed: 8, ppg: 1.0, rpg: 0.8, apg: 0.3, spg: 0.1, fg: 25.0, tp: 18.0, ft: 50.0, minutes: 3.0, ovr: 32 },
  { name: "Alfonso Birgir Gomez Söruson", team: "armann", pos: "SG", age: 18, nationality: "IS", gamesPlayed: 6, ppg: 0.5, rpg: 0.3, apg: 0.2, spg: 0.1, fg: 22.0, tp: 15.0, ft: 45.0, minutes: 2.0, ovr: 28 },

  // ==================== ÞÓR Þ (19 players) ====================
  { name: "Jacoby Ross", team: "thor", pos: "SG", age: 27, nationality: "US", gamesPlayed: 16, ppg: 21.6, rpg: 5.4, apg: 3.2, spg: 1.5, fg: 41.8, tp: 38.6, ft: 86.5, minutes: 36.1, ovr: 84, foreign: true },
  { name: "Djordje Dzeletovic", team: "thor", pos: "C", age: 29, nationality: "RS", gamesPlayed: 16, ppg: 19.9, rpg: 8.5, apg: 1.5, spg: 0.6, fg: 59.0, tp: 42.9, ft: 80.9, minutes: 31.4, ovr: 83, foreign: true },
  { name: "Rafail Lanaras", team: "thor", pos: "SF", age: 28, nationality: "GR", gamesPlayed: 22, ppg: 17.1, rpg: 5.0, apg: 2.5, spg: 1.0, fg: 44.4, tp: 39.8, ft: 80.6, minutes: 31.2, ovr: 80, foreign: true },
  { name: "Dachon Burk", team: "thor", pos: "PG", age: 26, nationality: "US", gamesPlayed: 6, ppg: 19.5, rpg: 3.0, apg: 5.5, spg: 1.8, fg: 39.7, tp: 16.3, ft: 58.8, minutes: 34.1, ovr: 78, foreign: true },
  { name: "Lazar Lugic", team: "thor", pos: "PF", age: 27, nationality: "RS", gamesPlayed: 22, ppg: 13.6, rpg: 8.0, apg: 1.5, spg: 0.7, fg: 42.4, tp: 30.6, ft: 63.3, minutes: 30.5, ovr: 76, foreign: true },
  { name: "Konstantinos Gontikas", team: "thor", pos: "SG", age: 27, nationality: "GR", gamesPlayed: 5, ppg: 14.0, rpg: 3.5, apg: 3.5, spg: 1.2, fg: 43.6, tp: 28.6, ft: 87.0, minutes: 31.9, ovr: 74, foreign: true },
  { name: "Baldur Böðvar Torfason", team: "thor", pos: "PG", age: 24, nationality: "IS", gamesPlayed: 20, ppg: 5.5, rpg: 1.5, apg: 3.0, spg: 0.7, fg: 38.0, tp: 30.0, ft: 72.0, minutes: 18.0, ovr: 52 },
  { name: "Davíð Arnar Ágústsson", team: "thor", pos: "SF", age: 23, nationality: "IS", gamesPlayed: 18, ppg: 4.5, rpg: 2.0, apg: 1.0, spg: 0.4, fg: 36.0, tp: 28.0, ft: 68.0, minutes: 14.0, ovr: 48 },
  { name: "Matthías Geir Gunnarsson", team: "thor", pos: "PF", age: 22, nationality: "IS", gamesPlayed: 16, ppg: 3.5, rpg: 2.5, apg: 0.5, spg: 0.3, fg: 38.0, tp: 25.0, ft: 62.0, minutes: 12.0, ovr: 45 },
  { name: "Tómas Valur Þrastarson", team: "thor", pos: "SG", age: 21, nationality: "IS", gamesPlayed: 14, ppg: 2.5, rpg: 1.0, apg: 0.8, spg: 0.3, fg: 32.0, tp: 24.0, ft: 62.0, minutes: 8.0, ovr: 40 },
  { name: "Skarphéðinn Árni Þorbergsson", team: "thor", pos: "C", age: 22, nationality: "IS", gamesPlayed: 14, ppg: 2.0, rpg: 2.5, apg: 0.3, spg: 0.2, fg: 40.0, tp: 0.0, ft: 50.0, minutes: 8.0, ovr: 40 },
  { name: "Pálmi Geir Jónsson", team: "thor", pos: "PG", age: 20, nationality: "IS", gamesPlayed: 12, ppg: 1.8, rpg: 0.5, apg: 1.5, spg: 0.3, fg: 30.0, tp: 22.0, ft: 60.0, minutes: 6.0, ovr: 38 },
  { name: "Sverrir Týr Sigurðsson", team: "thor", pos: "SF", age: 20, nationality: "IS", gamesPlayed: 10, ppg: 1.5, rpg: 0.8, apg: 0.3, spg: 0.2, fg: 28.0, tp: 20.0, ft: 55.0, minutes: 5.0, ovr: 35 },
  { name: "Kolbeinn Óli Lárusson", team: "thor", pos: "PF", age: 19, nationality: "IS", gamesPlayed: 8, ppg: 1.0, rpg: 1.0, apg: 0.2, spg: 0.1, fg: 28.0, tp: 18.0, ft: 52.0, minutes: 4.0, ovr: 32 },
  { name: "Haukur Davíðsson", team: "thor", pos: "SG", age: 19, nationality: "IS", gamesPlayed: 8, ppg: 0.8, rpg: 0.5, apg: 0.3, spg: 0.1, fg: 25.0, tp: 18.0, ft: 50.0, minutes: 3.0, ovr: 32 },
  { name: "Arnór Daði Sigurbergsson", team: "thor", pos: "C", age: 20, nationality: "IS", gamesPlayed: 8, ppg: 1.0, rpg: 1.2, apg: 0.2, spg: 0.1, fg: 32.0, tp: 0.0, ft: 50.0, minutes: 4.0, ovr: 35 },
  { name: "Emil Karel Einarsson", team: "thor", pos: "PG", age: 18, nationality: "IS", gamesPlayed: 6, ppg: 0.5, rpg: 0.3, apg: 0.5, spg: 0.1, fg: 22.0, tp: 15.0, ft: 50.0, minutes: 2.0, ovr: 28 },
  { name: "Ísak Júlíus Perdue", team: "thor", pos: "SF", age: 19, nationality: "IS", gamesPlayed: 6, ppg: 0.5, rpg: 0.5, apg: 0.2, spg: 0.1, fg: 25.0, tp: 18.0, ft: 50.0, minutes: 2.0, ovr: 30 },
  { name: "Tristan Alexander Szmiedowicz", team: "thor", pos: "PF", age: 20, nationality: "IS", gamesPlayed: 6, ppg: 0.8, rpg: 0.8, apg: 0.2, spg: 0.1, fg: 28.0, tp: 20.0, ft: 52.0, minutes: 3.0, ovr: 33 },

  // ==================== ÍA (21 players) ====================
  { name: "Gojko Zudzum", team: "ia", pos: "C", age: 30, nationality: "RS", gamesPlayed: 15, ppg: 23.3, rpg: 11.1, apg: 1.5, spg: 0.8, fg: 56.8, tp: 37.5, ft: 72.7, minutes: 34.1, ovr: 86, foreign: true },
  { name: "Darnell Cowart", team: "ia", pos: "PF", age: 28, nationality: "US", gamesPlayed: 5, ppg: 18.8, rpg: 8.5, apg: 1.0, spg: 0.6, fg: 48.5, tp: 37.0, ft: 74.1, minutes: 34.2, ovr: 80, foreign: true },
  { name: "Ivan Gavrilovic", team: "ia", pos: "C", age: 29, nationality: "RS", gamesPlayed: 16, ppg: 17.3, rpg: 8.5, apg: 1.2, spg: 0.6, fg: 51.9, tp: 38.5, ft: 68.8, minutes: 22.8, ovr: 82, foreign: true },
  { name: "Darryl Morsell", team: "ia", pos: "SG", age: 26, nationality: "US", gamesPlayed: 11, ppg: 17.5, rpg: 4.0, apg: 2.5, spg: 1.2, fg: 41.2, tp: 26.7, ft: 70.3, minutes: 30.7, ovr: 80, foreign: true },
  { name: "Ilija Dokovic", team: "ia", pos: "PF", age: 27, nationality: "RS", gamesPlayed: 12, ppg: 10.0, rpg: 5.5, apg: 1.2, spg: 0.5, fg: 48.0, tp: 30.0, ft: 70.0, minutes: 22.0, ovr: 68, foreign: true },
  { name: "Dibaji Walker", team: "ia", pos: "SG", age: 26, nationality: "US", gamesPlayed: 10, ppg: 9.0, rpg: 2.5, apg: 2.0, spg: 0.8, fg: 40.0, tp: 32.0, ft: 72.0, minutes: 20.0, ovr: 62, foreign: true },
  { name: "Josip Barnjak", team: "ia", pos: "PF", age: 28, nationality: "HR", gamesPlayed: 10, ppg: 7.5, rpg: 4.5, apg: 1.0, spg: 0.4, fg: 45.0, tp: 28.0, ft: 65.0, minutes: 18.0, ovr: 58, foreign: true },
  { name: "Lucien Christofis", team: "ia", pos: "SF", age: 26, nationality: "AU", gamesPlayed: 10, ppg: 8.0, rpg: 3.0, apg: 1.5, spg: 0.6, fg: 42.0, tp: 32.0, ft: 72.0, minutes: 18.0, ovr: 60, foreign: true },
  { name: "Victor Bafutto", team: "ia", pos: "PG", age: 27, nationality: "BR", gamesPlayed: 8, ppg: 6.0, rpg: 1.5, apg: 3.0, spg: 0.6, fg: 38.0, tp: 30.0, ft: 70.0, minutes: 16.0, ovr: 55, foreign: true },
  { name: "Jóel Duranona", team: "ia", pos: "PG", age: 24, nationality: "IS", gamesPlayed: 18, ppg: 5.5, rpg: 1.5, apg: 3.5, spg: 0.6, fg: 38.0, tp: 30.0, ft: 72.0, minutes: 18.0, ovr: 52 },
  { name: "Júlíus Duranona", team: "ia", pos: "SG", age: 22, nationality: "IS", gamesPlayed: 16, ppg: 4.0, rpg: 1.2, apg: 1.5, spg: 0.4, fg: 35.0, tp: 28.0, ft: 68.0, minutes: 14.0, ovr: 48 },
  { name: "Kristófer Már Gíslason", team: "ia", pos: "SF", age: 23, nationality: "IS", gamesPlayed: 16, ppg: 3.5, rpg: 2.0, apg: 0.8, spg: 0.3, fg: 36.0, tp: 25.0, ft: 65.0, minutes: 12.0, ovr: 45 },
  { name: "Styrmir Jónasson", team: "ia", pos: "PF", age: 22, nationality: "IS", gamesPlayed: 14, ppg: 3.0, rpg: 2.5, apg: 0.5, spg: 0.2, fg: 38.0, tp: 22.0, ft: 60.0, minutes: 10.0, ovr: 42 },
  { name: "Tómas Ingi Hannesson", team: "ia", pos: "C", age: 23, nationality: "IS", gamesPlayed: 14, ppg: 2.5, rpg: 3.0, apg: 0.3, spg: 0.2, fg: 42.0, tp: 0.0, ft: 55.0, minutes: 10.0, ovr: 42 },
  { name: "Nökkvi Snorrason", team: "ia", pos: "PG", age: 21, nationality: "IS", gamesPlayed: 12, ppg: 2.0, rpg: 0.8, apg: 1.5, spg: 0.3, fg: 30.0, tp: 22.0, ft: 60.0, minutes: 7.0, ovr: 38 },
  { name: "Hjörtur Hrafnsson", team: "ia", pos: "SF", age: 22, nationality: "IS", gamesPlayed: 12, ppg: 2.0, rpg: 1.5, apg: 0.5, spg: 0.2, fg: 32.0, tp: 22.0, ft: 58.0, minutes: 7.0, ovr: 38 },
  { name: "Felix Heiðar Magnason", team: "ia", pos: "SG", age: 20, nationality: "IS", gamesPlayed: 10, ppg: 1.5, rpg: 0.5, apg: 0.5, spg: 0.2, fg: 28.0, tp: 20.0, ft: 55.0, minutes: 5.0, ovr: 35 },
  { name: "Daði Már Alfreðsson", team: "ia", pos: "PF", age: 19, nationality: "IS", gamesPlayed: 8, ppg: 1.0, rpg: 1.0, apg: 0.2, spg: 0.1, fg: 28.0, tp: 18.0, ft: 52.0, minutes: 3.0, ovr: 32 },
  { name: "Aron Elvar Dagsson", team: "ia", pos: "PG", age: 19, nationality: "IS", gamesPlayed: 8, ppg: 0.8, rpg: 0.3, apg: 0.5, spg: 0.1, fg: 25.0, tp: 18.0, ft: 50.0, minutes: 3.0, ovr: 30 },
  { name: "Árni Kristján Rögnvaldsson", team: "ia", pos: "C", age: 20, nationality: "IS", gamesPlayed: 8, ppg: 0.8, rpg: 1.0, apg: 0.1, spg: 0.1, fg: 30.0, tp: 0.0, ft: 48.0, minutes: 3.0, ovr: 32 },
  { name: "Marinó Ísak Dagsson", team: "ia", pos: "SG", age: 18, nationality: "IS", gamesPlayed: 6, ppg: 0.3, rpg: 0.2, apg: 0.1, spg: 0.0, fg: 20.0, tp: 15.0, ft: 45.0, minutes: 1.5, ovr: 28 },
];

// Salary estimates based on OVR rating (ISK per month)
function estimateSalary(ovr, foreign) {
  const base = foreign ? 800000 : 200000;
  const mult = foreign ? 12000 : 5000;
  return base + (ovr * mult);
}

// Icelandic first names for regens
const IS_FIRST_NAMES = [
  "Aron", "Birkir", "Daníel", "Einar", "Friðrik", "Guðmundur", "Hjörtur", "Ingvar",
  "Jón", "Kristján", "Magnús", "Ólafur", "Páll", "Ragnar", "Sigurður", "Þór",
  "Viktor", "Andri", "Baldur", "Dagur", "Hákon", "Kári", "Stefán", "Tómas"
];
const IS_LAST_NAMES = [
  "Jónsson", "Sigurðsson", "Guðmundsson", "Magnússon", "Þórsson", "Ólafsson",
  "Kristjánsson", "Pálsson", "Björnsson", "Einarsson", "Árnason", "Halldórsson",
  "Ragnarsson", "Friðriksson", "Karlsson", "Davíðsson"
];

const FOREIGN_FIRST_NAMES = [
  "Marcus", "James", "DeMarcus", "Tyrell", "Jordan", "DeShawn", "Brandon", "Kevin",
  "Nikola", "Luka", "Stefan", "Marko", "Ivan", "Dimitri", "Aleksandar", "Milos"
];
const FOREIGN_LAST_NAMES = [
  "Williams", "Johnson", "Brown", "Davis", "Wilson", "Thompson", "Anderson", "Martinez",
  "Petrovic", "Jovanovic", "Nikolic", "Kovacevic", "Popovic", "Stefanovic"
];

const MATCH_EVENTS = {
  score2: [
    "{player} gerir körfu!",
    "{player} leggur inn í körfuna!",
    "{player} fer í gegnum vörnina og skorar!",
    "{player} með fallegt skot frá miðsvæði!",
    "{player} snýr sér og skorar tvístig!",
    "Flottur stígur frá {player}!",
    "{player} skorar auðvelt tvístig!",
    "{player} hittir úr tveggja stiga skoti!"
  ],
  score3: [
    "{player} hittir úr þriggja stiga skoti! 💥",
    "BANG! {player} frá þriggja stiga línunni!",
    "{player} með þrist úr horni!",
    "{player} hitar sig með þriggja stiga körfu!",
    "Stórkostleg þriggja stiga karfa frá {player}!",
    "{player} snýr upp úr og gerir þriggja stiga körfu!",
    "{player} setur þrist í netið! Skotnýting í hámarki!"
  ],
  miss: [
    "{player} missir skot.",
    "Skot frá {player} skoppar af hringnum.",
    "{player} reynir en hringurinn segir nei.",
    "{player} sendir boltann framhjá.",
    "{player} tapar boltanum! Tapaður bolti."
  ],
  rebound: [
    "{player} tekur fráköst!",
    "Sterkt fráköst frá {player}!",
    "{player} nær boltanum undir körfu!",
    "{player} ræður í frákastabaráttu!"
  ],
  assist: [
    "{player} með stoðsendingu til {player2}!",
    "Falleg stoðsending frá {player} til {player2}!",
    "{player} finnur {player2} opinn!",
    "Snilldarsending frá {player} og {player2} skorar!"
  ],
  steal: [
    "{player} stelur boltanum!",
    "Stela frá {player}!",
    "{player} les sendinguna og tekur boltann!",
    "{player} með stelu og fer í sókn!"
  ],
  block: [
    "{player} blokkar skotið!",
    "BLOKKAÐ af {player}!",
    "{player} slær boltann í burtu!"
  ],
  freeThrow: [
    "{player} skorar frjálst skot.",
    "{player} missir frjálsa skotið.",
    "{player} nær báðum frjálsum skotum!"
  ],
  timeout: [
    "Tímabeiðni tekin af {team}.",
    "{team} kallar á tímabeiðni."
  ],
  quarterEnd: [
    "Lokið {quarter}. leikhluta! Staðan er {score}.",
  ],
  buzzer: [
    "LOKAHLJÓÐ! Leiknum lokið! Úrslit: {score}"
  ],
  run: [
    "{team} í kafla! {score}",
    "Hér er {team} kafli! Staðan {score}."
  ],
  turnover: [
    "{player} tapar boltanum!",
    "Tapaður bolti frá {player}!",
    "Persónuleg villa á {player}!"
  ]
};

// Globals: TEAM_DATA, PLAYER_DATA, POS, MATCH_EVENTS, estimateSalary, IS_FIRST_NAMES, IS_LAST_NAMES, FOREIGN_FIRST_NAMES, FOREIGN_LAST_NAMES
