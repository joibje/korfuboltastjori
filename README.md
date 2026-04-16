# 🏀 Körfuboltastjóri

> Vafrabasaður Football Manager-stíll leikur fyrir Úrvalsdeild karla í körfubolta — gerður á nokkrum klukkustundum með Claude Code.

**🎮 Spila núna:** [joibje.github.io/korfuboltastjori](https://joibje.github.io/korfuboltastjori/)

---

## Um leikinn

Körfuboltastjóri er web-based stjórnunarleikur fyrir **Úrvalsdeild karla í körfubolta 2025-26**. Raunveruleg gögn frá [korfustatt.is](https://www.korfustatt.is) og [kki.is](https://kki.is) — öll 12 liðin og 213 alvöru leikmenn með raunverulegri tölfræði.

Fyrirmynd er NBA 2K MyLeague / Eras: þú stjórnar liði í beinni, getur pásað, gert leikmannaskipti, kallað á tímabeiðni og breytt taktík á miðjum leik.

---

## Hvað er í boði

### 🏟️ Velja lið
- Öll 12 liðin í úrvalsdeildinni: Grindavík, Tindastóll, Stjarnan, Valur, Keflavík, KR, ÍR, Njarðvík, Álftanes, Ármann, Þór Þ, ÍA
- Hvert lið með sínum litum, heimavelli, fjárhagsáætlun og reputation

### 👥 Leikmannakerfið
- **213 raunverulegir leikmenn** með stats úr tímabilinu
- **12 manna leikdagsskrá** (skv. reglum) — 5 starters + 7 á bekk
- OVR einkunn, orka, morall, meiðsli, samningar
- Seldu/keyptu leikmenn, skrifaðu undir lausa

### 📋 Taktík
- **Hraði:** Hægur / Venjulegur / Hraður
- **Vörn:** Svæðisvörn / Venjuleg / Press
- **Áhersla:** Innileikur / Jafnvægi / Þristar
- Velja grunnfimmu handvirkt

### 🏀 Live leikur (NBA 2K stíll)
- Leikur keyrir **leikhluta fyrir leikhluta**, eina sókn í einu
- **Play/Pause** + 3 hraðastig (1x, 2x, 3x)
- **Leikmannaskipti** í beinni — veldu af bekk, skiptu við starter
- **Tímabeiðni** (4 í boði per lið)
- **Taktíkbreytingar** á miðjum leik
- Auto-pása á milli leikhluta til að breyta uppstillingu
- "Hot" leikmenn lýsa upp þegar þeir skora 3+ í röð
- Live box score og MVP í lokin

### 🏆 Deildarkeppni
- 22 umferðir (heima/útivöllur)
- Stigatafla með form og stigamismun
- **Úrslitakeppni:** Efstu 8 lið, best-of-5 einvígi
- Meistaratitill í lokin

### 💰 Fjármál
- Sjóður, vikulegar tekjur, styrktarfé, miðasala
- Laun leikmanna — erlendir miklu dýrari
- Flutningamarkaður með verði byggt á OVR

### 📰 Fréttir
- Leikúrslit, meiðsli, flutningar
- Úrslitakeppnisframvinda

---

## Íslenskt körfuboltalingó

Allt UI og leiklýsing á ekta íslensku körfuboltamáli:

| Hugtak | Notkun |
|--------|--------|
| **Fráköst** | rebounds |
| **Stoðsendingar** | assists |
| **Stela** | steal |
| **Blokk** | block |
| **Frjáls skot** | free throws |
| **Leikhluti** | quarter |
| **Tímabeiðni** | timeout |
| **Þristar / þriggja stiga karfa** | three-pointer |
| **Kafli** | scoring run |
| **Tapaðir boltar** | turnovers |
| **Persónuleg villa** | personal foul |
| **Atkvæðamestur** | leading scorer |
| **Skotnýting** | shooting efficiency |
| **Frákastabarátta** | rebounding battle |

---

## Tækni

Pure **HTML + CSS + Vanilla JS** — engar framework dependencies, engin build skref. Keyrir beint í vafranum.

```
BBM/
├── index.html          # Entry point
├── css/
│   └── style.css       # Alla stílun (NBA 2K-ish dark theme)
└── js/
    ├── data.js         # 12 lið, 213 leikmenn, match events
    ├── engine.js       # Game engine, simulation, live match
    └── app.js          # UI rendering, navigation, controls
```

**Vistun:** Leikurinn er vistaður í `localStorage` vafrans — þú getur haldið áfram seinna.

---

## Gagnafóstrið

Öll leikmannatölfræði og lið sótt frá:

- **[korfustatt.is](https://www.korfustatt.is)** — 213 leikmenn með ppg, rpg, apg, FG%, 3P%, FT%, aldri, leikjum spilaðum
- **[kki.is](https://kki.is)** — staðfesting á liðsskrá og leikmannaflutningum

Þetta er fyrsta heildartímabilið (2025-26) í leiknum. Næstu tímabil notar prósedúral leikmenn ofan á núverandi grunn.

---

## Skjáskot

*(Aðalvalmynd með 🏀 og "KÖRFUBOLTASTJÓRI" titli)*
*(Leikur í gangi með scoreboard, event log, lineup og controls)*
*(Stigatafla með formi og stigamismun)*

---

## Byggt með

- **Claude Code** — Anthropic's AI coding assistant
- Gögn: korfustatt.is, kki.is
- Hönnunarfyrirmynd: NBA 2K MyLeague, Football Manager

---

## Framtíðarhugmyndir

- [ ] Samningsviðræður við leikmenn
- [ ] Þjálfunarlotur til að bæta hæfileika
- [ ] Nýr tímabil með ungum leikmönnum úr unglingadeild
- [ ] Bikarkeppni auk deildarinnar
- [ ] Landsleikir og FIBA keppnir
- [ ] Fleiri tölfræði (PER, true shooting %)
- [ ] Multiplayer mode
- [ ] Mobile-optimized UI

---

*Gert 2026 með hjálp Claude Code. Frjálst að nota og breyta.*
