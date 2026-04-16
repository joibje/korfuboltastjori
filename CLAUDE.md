# CLAUDE.md — Körfuboltastjóri project context

## Hvað þetta er

Vafrabasaður körfuboltastjórnunarleikur (Football Manager stíll) fyrir íslensku Úrvalsdeildina karla 2025-26. Hostaður á GitHub Pages.

- **Live URL:** https://joibje.github.io/korfuboltastjori/
- **Repo:** https://github.com/joibje/korfuboltastjori
- **Local path:** `/Users/joi/BBM`
- **Eigandi:** Jói (joibje á GitHub)
- **Tungumál:** Allt UI á íslensku — notandinn skrifar líka á íslensku

## Hvernig á að keyra staðbundið

```bash
cd /Users/joi/BBM
python3 -m http.server 8080
open http://localhost:8080
```

**Mikilvægt:** Skrárnar nota `const` í global scope og `<script>` tags (EKKI ES modules). Ekki breyta í `type="module"` — það braut áður.

## Deploy á GitHub Pages

Pages er þegar virkt á `main` branch, root path. Bara pusha:

```bash
git add -A && git commit -m "..." && git push
```

Síðan uppfærist sjálfkrafa á `joibje.github.io/korfuboltastjori/` (1-2 mín delay).

## Skráarskipulag

```
BBM/
├── index.html          # Entry point, hleður CSS og 3 JS skrár í röð
├── README.md           # Notandaskjal
├── CLAUDE.md           # Þetta skjal
├── .gitignore          # .DS_Store
├── css/
│   └── style.css       # Dark theme, NBA 2K útlit, ~1100 lines
└── js/
    ├── data.js         # 12 TEAM_DATA, 213 PLAYER_DATA, POS, MATCH_EVENTS
    ├── engine.js       # GameEngine class — state, simulation, live match
    └── app.js          # UI rendering, navigation, window.* handlers
```

JS-ið er **ekki modules** — `data.js` skilgreinir globals, `engine.js` notar þau, `app.js` notar bæði. Skrárnar hlaðast í röð í `index.html`.

## Arkitektúr

### `data.js` (globals)
- `TEAM_DATA` — 12 lið með litum, heimavelli, budget, reputation, logo
- `PLAYER_DATA` — 213 leikmenn: `{ name, team, pos, age, nationality, gamesPlayed, ppg, rpg, apg, spg, fg, tp, ft, minutes, ovr, foreign }`
- `POS` — `{ PG, SG, SF, PF, C }` með íslenskum heitum
- `MATCH_EVENTS` — templates fyrir leiklýsingu (score2, score3, rebound, assist, steal, block, miss, freeThrow, timeout, quarterEnd, run, turnover)
- `estimateSalary(ovr, foreign)`, `IS_FIRST_NAMES`, `IS_LAST_NAMES`, `FOREIGN_FIRST_NAMES`, `FOREIGN_LAST_NAMES`

### `engine.js` — `GameEngine` class
- **`newGame(teamId)`** — setur upp nýjan leik, state object
- **`state`** — allt game state: teams, players, schedule, currentWeek, phase, tactics, finances, results, news, playoffSeries, transferMarket, freeAgents, matchLog, liveMatch
- **Instant simulation** (AI vs AI): `simulateMatch(homeId, awayId, isPlayerMatch)`
- **Live match** (leikmaður spilar):
  - `startLiveMatch(homeId, awayId)` → setur `this.liveMatch`
  - `advancePossession()` → ein sókn í einu, skilar event
  - `startNextQuarter()`, `liveMatchSubstitution()`, `liveMatchTimeout()`, `setLiveMatchTactics()`, `finalizeLiveMatch()`
- **Game day roster (12 manna regla):**
  - `getGameDayRoster(teamId)` — returns 12 players (5 starters + 7 bench)
  - `setGameDayRoster(ids)`, `getDefaultGameDayRoster(players, teamId)`
- **Season management:** `advanceWeek()`, `startPlayoffs()`, `advancePlayoffs()`, `getStandings()`
- **Transfers:** `buyPlayer()`, `sellPlayer()`, `signFreeAgent()`, `generateTransferMarket()`, `generateFreeAgents()`
- **Save/load:** `saveGame()`, `loadGame()`, `deleteSave()` — notar localStorage

### `app.js` — UI
- `const engine = new GameEngine()`
- `navigate(view, data)` — router fyrir allar síður
- Views: `menu`, `teamSelect`, `dashboard`, `squad`, `tactics`, `match`, `matchLive`, `table`, `results`, `transfers`, `finances`, `player`, `stats`, `playoffs`, `news`
- Live match functions: `toggleLiveMatch`, `setLiveSpeed`, `enterSubMode`, `selectBenchPlayer`, `completeSubstitution`, `callTimeout`, `setLiveTactic`, `continueAfterQuarter`, `finishLiveMatch`
- **Allar onclick handlers þurfa `window.X = X` neðst í skránni** — annars virka þeir ekki
- Layout: `#layout` gridið hefur class `has-sidebar` þegar sidebar er sýnilegt

## Mikilvægar reglur um kóða

1. **Íslenska alls staðar** — UI, event templates, news, allt
2. **Rétt körfuboltalingó** (ekki fótboltamál!):
   - `fráköst` (EKKI fráblestur)
   - `stoðsendingar` (EKKI stöðuveiting)
   - `frjáls skot` (EKKI vítaskot)
   - `leikhluti` (EKKI fjórðungur)
   - `tímabeiðni` (EKKI leikhlé)
   - `þristar` / `þriggja stiga karfa` (EKKI þrístig — þetta er ekki til!)
   - `stela` / `tapaðir boltar` / `persónuleg villa`
3. **12 manna leikdagsskrá** — bæði `simulateMatch` og `startLiveMatch` nota `getGameDayRoster()`, ekki allan rosterinn
4. **Starters eru alltaf innan leikdagsskrár** — `setGameDayRoster()` sér um þetta
5. **AI vs AI leikir keyra instant** — aðeins leikmanns leikir eru live

## Gagnaheimildir

- **korfustatt.is** — öll leikmannatölfræði, staðan, lið
  - Teams: `/Felog/Ka`
  - Team season: `/FelagTimabil/{team}/2026/Ka`
  - Standings: `/Timabil/Ka/2026`
  - Player stats: `/LeikmennMedaltalPerTimabil/Ka/2026/OllLid/50/Stig`
- **kki.is** — leikmannalisti, KKÍ organization
  - User pasted full 213-player list manually

## Saga breytinga (helstu áfangar)

1. Upphafleg útgáfa með ~105 áætluðum leikmönnum, ES modules
2. ES modules virkuðu ekki í vafranum — endurskrifað sem globals
3. Infinite recursion í `hideSidebar()` — lagað
4. Uppfært með 213 alvöru leikmönnum (agent task)
5. Live match engine (NBA 2K stíll) bætt við (agent task)
6. Íslenskt körfuboltalingó innleitt (orðalisti frá notanda)
7. "Þrístig" → "þristar" / "þriggja stiga karfa" (notandi benti á)
8. 12 manna leikdagsskrá bætt við (notandi benti á reglur)
9. Deploy á GitHub Pages

## Algeng gildrur

- **Ekki nota `<script type="module">`** — það braut áður
- **Ekki nota `import`/`export`** — globals bara
- **Allir onclick handlers verða að vera `window.X = X`** — eða þeir koma upp sem undefined
- **`git rm --cached .DS_Store`** áður en committað er — .DS_Store er sjálfkrafa í möppum á macOS
- **GitHub Pages delay:** 1-2 mínútur milli push og live update
- **MIME type:** Python http.server skilar `text/javascript` sem er fínt (ekki þarf `application/javascript`)

## Verkefni sem gætu komið upp

Notandi nefndi þessar framtíðarhugmyndir í README:
- Samningsviðræður við leikmenn
- Þjálfunarlotur
- Nýr tímabil með ungum leikmönnum
- Bikarkeppni
- Landsleikir / FIBA keppnir
- Advanced stats (PER, true shooting %)
- Multiplayer
- Mobile UI

Ef notandi biður um "next season" — þarf season reset logic: regens, aldurshækkun, retirements, samningsendurnýjun.

## Spurningar sem notandi gæti spurt

- **"Bætið við X liði/leikmanni"** — edit `TEAM_DATA` eða `PLAYER_DATA` í `data.js`
- **"Breyta taktík/engine"** — `engine.js` `simulatePossession` aðferðin
- **"Lagið X villu"** — kíktu fyrst í console errors í vafranum
- **"Deploy uppfærslu"** — `git add -A && git commit -m "..." && git push`

## Stíllinn

- **Tone:** Stuttur, beinn. Íslenska. Enginn óþarfa samantekt.
- **Kóði:** Vanilla, engar dependencies. Halda því þannig.
- **UI:** Dark theme, orange accent (#f97316), FM/NBA 2K stíll.
