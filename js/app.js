// ============================================================
// KÖRFUBOLTASTJÓRI - Main Application
// ============================================================

// Uses globals from data.js and engine.js
const engine = new GameEngine();
let currentView = 'menu';

// ============ UTILITY ============

function $(sel) { return document.querySelector(sel); }
function $$(sel) { return document.querySelectorAll(sel); }
function html(el, content) { el.innerHTML = content; }
function show(el) { el.classList.remove('hidden'); }
function hide(el) { el.classList.add('hidden'); }

function formatMoney(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(0) + 'K';
  return n.toString();
}

function getTeamById(id) {
  return engine.state.teams.find(t => t.id === id);
}

function getPlayerTeam() {
  return getTeamById(engine.state.playerTeam);
}

// ============ NAVIGATION ============

function navigate(view, data) {
  currentView = view;
  const app = $('#app');

  switch (view) {
    case 'menu': renderMenu(); break;
    case 'teamSelect': renderTeamSelect(); break;
    case 'dashboard': renderDashboard(); break;
    case 'squad': renderSquad(); break;
    case 'tactics': renderTactics(); break;
    case 'match': renderMatchDay(); break;
    case 'matchLive': renderMatchLive(); break;
    case 'table': renderTable(); break;
    case 'results': renderResults(); break;
    case 'transfers': renderTransfers(); break;
    case 'finances': renderFinances(); break;
    case 'player': renderPlayerDetail(data); break;
    case 'stats': renderLeagueStats(); break;
    case 'playoffs': renderPlayoffs(); break;
    case 'news': renderNews(); break;
  }

  // Update nav highlight
  $$('.nav-item').forEach(el => el.classList.remove('active'));
  const navItem = $(`.nav-item[data-view="${view}"]`);
  if (navItem) navItem.classList.add('active');

  updateTopBar();
}

function updateTopBar() {
  if (!engine.state) return;
  const team = getPlayerTeam();
  const topbar = $('#topbar');
  if (topbar) {
    html(topbar, `
      <div class="topbar-team">${team.logo} ${team.name}</div>
      <div class="topbar-info">
        <span>Vika ${engine.state.currentWeek + 1}/${engine.state.schedule.length}</span>
        <span>|</span>
        <span>Tímabil ${engine.state.season}</span>
        <span>|</span>
        <span class="topbar-money">💰 ${formatMoney(engine.state.finances.budget)} ISK</span>
      </div>
      <div class="topbar-actions">
        <button onclick="saveGame()" class="btn-sm">Vista</button>
      </div>
    `);
  }
}

// ============ MAIN MENU ============

function renderMenu() {
  const app = $('#app');
  html(app, `
    <div class="menu-screen">
      <div class="menu-logo">
        <div class="menu-ball">🏀</div>
        <h1>KÖRFUBOLTASTJÓRI</h1>
        <p class="menu-sub">Úrvalsdeild Karla</p>
        <p class="menu-season">2025-2026</p>
      </div>
      <div class="menu-buttons">
        <button onclick="navigate('teamSelect')" class="btn btn-primary btn-lg">Nýr leikur</button>
        <button onclick="loadSavedGame()" class="btn btn-secondary btn-lg" id="btnLoad">Halda áfram</button>
      </div>
      <div class="menu-footer">
        <p>Gögn frá korfustatt.is & kki.is</p>
      </div>
    </div>
  `);

  hideSidebar();

  if (!localStorage.getItem('korfuboltastjori_save')) {
    $('#btnLoad').disabled = true;
    $('#btnLoad').classList.add('btn-disabled');
  }
}

// ============ TEAM SELECT ============

function renderTeamSelect() {
  // Initialize temporary state to get team data for display
  if (!engine.state) engine.newGame('kr');
  const app = $('#app');
  html(app, `
    <div class="team-select-screen">
      <h2>Veldu lið</h2>
      <p class="subtitle">Veldu liðið sem þú vilt stjórna í Úrvalsdeild karla</p>
      <div class="team-grid">
        ${engine.state.teams.map(t => `
          <div class="team-card" onclick="selectTeam('${t.id}')" style="border-color: ${t.colors.primary}">
            <div class="team-card-logo" style="background: ${t.colors.primary}">${t.logo}</div>
            <div class="team-card-name">${t.name}</div>
            <div class="team-card-city">${t.city}</div>
            <div class="team-card-rep">
              <span class="star-rating">${'★'.repeat(Math.ceil(t.reputation / 20))}${'☆'.repeat(5 - Math.ceil(t.reputation / 20))}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `);
  hideSidebar();
}

function selectTeam(teamId) {
  engine.newGame(teamId);
  showSidebar();
  navigate('dashboard');
}

function showSidebar() {
  show($('#sidebar'));
  show($('#topbar'));
  $('#layout').classList.add('has-sidebar');
}

function hideSidebar() {
  hide($('#sidebar'));
  hide($('#topbar'));
  $('#layout').classList.remove('has-sidebar');
}

// ============ DASHBOARD ============

function renderDashboard() {
  const team = getPlayerTeam();
  const roster = engine.getPlayerTeamRoster();
  const standings = engine.getStandings();
  const teamPos = standings.findIndex(t => t.id === engine.state.playerTeam) + 1;
  const recentNews = engine.state.news.slice(-5).reverse();

  // Next match
  let nextMatch = null;
  if (engine.state.currentWeek < engine.state.schedule.length) {
    const weekMatches = engine.state.schedule[engine.state.currentWeek];
    nextMatch = weekMatches.find(m => m.home === engine.state.playerTeam || m.away === engine.state.playerTeam);
  }

  const app = $('#app');
  html(app, `
    <div class="dashboard">
      <h2>${team.logo} ${team.name}</h2>

      <div class="dash-grid">
        <div class="dash-card">
          <h3>Staða</h3>
          <div class="dash-stat-big">${teamPos}. sæti</div>
          <div class="dash-stat">${team.wins}S - ${team.losses}T</div>
          <div class="form-display">${team.form.map(f => `<span class="form-${f.toLowerCase()}">${f}</span>`).join('')}</div>
        </div>

        <div class="dash-card">
          <h3>Næsti leikur</h3>
          ${nextMatch ? `
            <div class="next-match">
              <div class="nm-teams">
                <span class="${nextMatch.home === engine.state.playerTeam ? 'nm-us' : ''}">${getTeamById(nextMatch.home).name}</span>
                <span class="nm-vs">vs</span>
                <span class="${nextMatch.away === engine.state.playerTeam ? 'nm-us' : ''}">${getTeamById(nextMatch.away).name}</span>
              </div>
              <button onclick="playNextMatch()" class="btn btn-primary">Spila leik! 🏀</button>
            </div>
          ` : `
            <div class="nm-none">
              ${engine.state.phase === 'playoffs' ?
                '<button onclick="playPlayoffGame()" class="btn btn-primary">Spila úrslitaleik! 🏆</button>' :
                '<p>Enginn leikur á dagskrá</p>'}
            </div>
          `}
        </div>

        <div class="dash-card">
          <h3>Fjármál</h3>
          <div class="dash-stat-big">💰 ${formatMoney(engine.state.finances.budget)} ISK</div>
          <div class="dash-stat">Vikuleg tekjur: +${formatMoney(engine.state.finances.weeklyIncome)}</div>
          <div class="dash-stat">Vikuleg laun: -${formatMoney(engine.state.finances.weeklyCosts)}</div>
        </div>

        <div class="dash-card">
          <h3>Leikmannakerfið</h3>
          <div class="dash-stat">${roster.length} leikmenn</div>
          <div class="dash-stat">${roster.filter(p => p.foreign).length} erlendir</div>
          <div class="dash-stat">${roster.filter(p => p.injured).length} meiddur/meiddir</div>
          <div class="dash-stat">Meðal OVR: ${(roster.reduce((s, p) => s + p.ovr, 0) / roster.length).toFixed(0)}</div>
        </div>
      </div>

      <div class="dash-bottom">
        <div class="dash-card dash-news">
          <h3>Fréttir</h3>
          ${recentNews.map(n => `
            <div class="news-item">
              <span class="news-week">V${n.week + 1}</span>
              <span>${n.text}</span>
            </div>
          `).join('')}
        </div>

        <div class="dash-card dash-mini-table">
          <h3>Stigatafla</h3>
          <table class="mini-table">
            <thead><tr><th>#</th><th>Lið</th><th>S</th><th>T</th><th>Stig</th></tr></thead>
            <tbody>
              ${standings.slice(0, 6).map((t, i) => `
                <tr class="${t.id === engine.state.playerTeam ? 'highlight-row' : ''}">
                  <td>${i + 1}</td>
                  <td>${t.logo} ${t.name}</td>
                  <td>${t.wins}</td>
                  <td>${t.losses}</td>
                  <td><strong>${t.wins * 2}</strong></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <button onclick="navigate('table')" class="btn btn-sm btn-link">Sjá alla töflu →</button>
        </div>
      </div>
    </div>
  `);
}

// ============ SQUAD ============

function renderSquad() {
  const roster = engine.getPlayerTeamRoster();
  const starters = engine.state.tactics.starterIds || [];
  const gameDayRoster = engine.state.tactics.gameDayRoster || [];
  const gameDayCount = gameDayRoster.filter(id => {
    const p = engine.state.players.find(pl => pl.id === id);
    return p && !p.injured;
  }).length;

  html($('#app'), `
    <div class="squad-view">
      <h2>Leikmannakerfið</h2>
      <div class="squad-info-bar">
        <span>Leikdagsskrá: <strong>${gameDayCount}/12</strong></span>
        <span class="${gameDayCount > 12 ? 'negative' : gameDayCount === 12 ? 'positive' : 'text-dim'}">
          ${gameDayCount > 12 ? '⚠️ Of margir!' : gameDayCount < 12 ? `${12 - gameDayCount} laus sæti` : '✅ Fullskipað'}
        </span>
      </div>
      <table class="player-table">
        <thead>
          <tr>
            <th>Leikd.</th><th></th><th>Nafn</th><th>Staða</th><th>Aldur</th><th>OVR</th><th>PPG</th><th>RPG</th><th>APG</th>
            <th>FG%</th><th>3P%</th><th>Orka</th><th>Laun/m</th><th></th>
          </tr>
        </thead>
        <tbody>
          ${roster.sort((a, b) => b.ovr - a.ovr).map(p => {
            const onGameDay = gameDayRoster.includes(p.id);
            const isStarter = starters.includes(p.id);
            return `
            <tr class="${p.injured ? 'injured-row' : ''} ${isStarter ? 'starter-row' : ''} ${!onGameDay && !p.injured ? 'not-gameday' : ''}">
              <td>
                ${p.injured ? '' : `<button onclick="toggleGameDay(${p.id})" class="btn-gameday ${onGameDay ? 'active' : ''}" title="${onGameDay ? 'Taka af leikdagsskrá' : 'Setja á leikdagsskrá'}">${onGameDay ? '✓' : '+'}</button>`}
              </td>
              <td>${isStarter ? '⭐' : ''}${p.injured ? '🤕' : ''}</td>
              <td><a href="#" onclick="navigate('player', ${p.id}); return false;" class="player-link ${p.foreign ? 'foreign' : ''}">${p.name}</a></td>
              <td><span class="pos-badge pos-${p.pos.toLowerCase()}">${p.pos}</span></td>
              <td>${p.age}</td>
              <td><span class="ovr-badge ovr-${getOvrClass(p.ovr)}">${p.ovr}</span></td>
              <td>${p.seasonStats.gp > 0 ? (p.seasonStats.pts / p.seasonStats.gp).toFixed(1) : p.ppg.toFixed(1)}</td>
              <td>${p.seasonStats.gp > 0 ? (p.seasonStats.reb / p.seasonStats.gp).toFixed(1) : (p.rpg || 0).toFixed(1)}</td>
              <td>${p.seasonStats.gp > 0 ? (p.seasonStats.ast / p.seasonStats.gp).toFixed(1) : (p.apg || 0).toFixed(1)}</td>
              <td>${p.fg.toFixed(0)}%</td>
              <td>${p.tp.toFixed(0)}%</td>
              <td>
                <div class="energy-bar">
                  <div class="energy-fill" style="width: ${p.energy}%; background: ${p.energy > 60 ? '#27ae60' : p.energy > 30 ? '#f39c12' : '#e74c3c'}"></div>
                </div>
              </td>
              <td>${formatMoney(p.salary)}</td>
              <td><button onclick="sellPlayerPrompt(${p.id})" class="btn-xs btn-danger">Selja</button></td>
            </tr>
          `}).join('')}
        </tbody>
      </table>
    </div>
  `);
}

function toggleGameDay(playerId) {
  const roster = engine.state.tactics.gameDayRoster || [];
  const starters = engine.state.tactics.starterIds || [];
  const idx = roster.indexOf(playerId);
  if (idx >= 0) {
    // Remove - but not if starter
    if (starters.includes(playerId)) {
      showToast('Getur ekki tekið starter af leikdagsskrá!', 'error');
      return;
    }
    roster.splice(idx, 1);
  } else {
    // Add - max 12
    const activeCount = roster.filter(id => {
      const p = engine.state.players.find(pl => pl.id === id);
      return p && !p.injured;
    }).length;
    if (activeCount >= 12) {
      showToast('Hámark 12 leikmenn á leikdagsskrá!', 'error');
      return;
    }
    roster.push(playerId);
  }
  engine.state.tactics.gameDayRoster = roster;
  renderSquad();
}

function getOvrClass(ovr) {
  if (ovr >= 85) return 'elite';
  if (ovr >= 75) return 'good';
  if (ovr >= 65) return 'avg';
  if (ovr >= 55) return 'below';
  return 'low';
}

// ============ TACTICS ============

function renderTactics() {
  const roster = engine.getPlayerTeamRoster().filter(p => !p.injured);
  const starters = engine.state.tactics.starterIds || [];
  const tactics = engine.state.tactics;

  html($('#app'), `
    <div class="tactics-view">
      <h2>Taktík</h2>

      <div class="tactics-grid">
        <div class="tactics-card">
          <h3>Leikstíll</h3>
          <div class="tactic-option">
            <label>Hraði:</label>
            <div class="tactic-buttons">
              <button onclick="setTactic('tempo','slow')" class="btn-tactic ${tactics.tempo === 'slow' ? 'active' : ''}">Hægur</button>
              <button onclick="setTactic('tempo','normal')" class="btn-tactic ${tactics.tempo === 'normal' ? 'active' : ''}">Venjulegur</button>
              <button onclick="setTactic('tempo','fast')" class="btn-tactic ${tactics.tempo === 'fast' ? 'active' : ''}">Hraður</button>
            </div>
          </div>
          <div class="tactic-option">
            <label>Vörn:</label>
            <div class="tactic-buttons">
              <button onclick="setTactic('defense','zone')" class="btn-tactic ${tactics.defense === 'zone' ? 'active' : ''}">Svæðisvörn</button>
              <button onclick="setTactic('defense','normal')" class="btn-tactic ${tactics.defense === 'normal' ? 'active' : ''}">Venjuleg</button>
              <button onclick="setTactic('defense','press')" class="btn-tactic ${tactics.defense === 'press' ? 'active' : ''}">Press</button>
            </div>
          </div>
          <div class="tactic-option">
            <label>Áhersla:</label>
            <div class="tactic-buttons">
              <button onclick="setTactic('focus','inside')" class="btn-tactic ${tactics.focus === 'inside' ? 'active' : ''}">Innileikur</button>
              <button onclick="setTactic('focus','balanced')" class="btn-tactic ${tactics.focus === 'balanced' ? 'active' : ''}">Jafnvægi</button>
              <button onclick="setTactic('focus','threepoint')" class="btn-tactic ${tactics.focus === 'threepoint' ? 'active' : ''}">Þristar</button>
            </div>
          </div>
        </div>

        <div class="tactics-card">
          <h3>Grunnfimma</h3>
          <div class="court-display">
            <div class="court">
              ${['PG', 'SG', 'SF', 'PF', 'C'].map((pos, i) => {
                const starterId = starters[i];
                const player = starterId != null ? engine.state.players.find(p => p.id === starterId) : null;
                return `
                  <div class="court-pos court-pos-${pos.toLowerCase()}">
                    <div class="court-pos-label">${POS[pos]}</div>
                    <select onchange="changeStarter(${i}, this.value)" class="starter-select">
                      ${roster.filter(p => p.pos === pos || !starters.includes(p.id)).map(p => `
                        <option value="${p.id}" ${p.id === starterId ? 'selected' : ''}>${p.name} (${p.ovr})</option>
                      `).join('')}
                    </select>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `);
}

function setTactic(key, value) {
  engine.setTactics({ [key]: value });
  renderTactics();
}

function changeStarter(index, playerId) {
  const starters = [...engine.state.tactics.starterIds];
  starters[index] = parseInt(playerId);
  engine.setStarters(starters);
}

// ============ MATCH DAY ============

let liveMatchTimer = null;
let liveMatchState = null;
let pendingPlayerMatch = null;
let pendingPlayoffLiveMatch = false;
let subMode = false;
let selectedBenchPlayer = null;

function playNextMatch() {
  // Advance week but skip the player match (simulate other games)
  const result = engine.advanceWeek(true);
  if (result && result.playerMatchInfo) {
    pendingPlayerMatch = result.playerMatchInfo;
    pendingPlayoffLiveMatch = false;
    startLiveMatchUI(pendingPlayerMatch.home, pendingPlayerMatch.away);
  } else {
    // No player match this week, just show dashboard
    navigate('dashboard');
  }
}

function playPlayoffGame() {
  // For playoffs, we need to find the player's match
  if (engine.state.phase !== 'playoffs') return;

  const activeSeries = engine.state.playoffSeries.filter(s =>
    s.round === engine.state.playoffRound && s.homeWins < 3 && s.awayWins < 3
  );

  const playerSeries = activeSeries.find(s =>
    s.home === engine.state.playerTeam || s.away === engine.state.playerTeam
  );

  if (!playerSeries) {
    // Player team not in playoffs, simulate normally
    engine.advancePlayoffs();
    navigate('dashboard');
    return;
  }

  // Simulate other series first
  for (const series of activeSeries) {
    if (series === playerSeries) continue;

    const gameNum = series.homeWins + series.awayWins + 1;
    const homeTeam = gameNum % 2 === 1 ? series.home : series.away;
    const awayTeam = gameNum % 2 === 1 ? series.away : series.home;
    const result = engine.simulateMatch(homeTeam, awayTeam, false);

    if ((gameNum % 2 === 1 && result.homeScore > result.awayScore) || (gameNum % 2 === 0 && result.awayScore > result.homeScore)) {
      series.homeWins++;
    } else {
      series.awayWins++;
    }
    series.games.push({ homeTeam, awayTeam, homeScore: result.homeScore, awayScore: result.awayScore });
  }

  // Start live match for player's series game
  const gameNum = playerSeries.homeWins + playerSeries.awayWins + 1;
  const homeTeam = gameNum % 2 === 1 ? playerSeries.home : playerSeries.away;
  const awayTeam = gameNum % 2 === 1 ? playerSeries.away : playerSeries.home;

  pendingPlayerMatch = { home: homeTeam, away: awayTeam };
  pendingPlayoffLiveMatch = true;
  startLiveMatchUI(homeTeam, awayTeam);
}

function simulateWeek() {
  if (engine.state.phase === 'playoffs') {
    engine.advancePlayoffs();
  } else {
    engine.advanceWeek();
  }
  navigate('dashboard');
}

function startLiveMatchUI(homeId, awayId) {
  liveMatchState = engine.startLiveMatch(homeId, awayId);
  if (!liveMatchState) {
    navigate('dashboard');
    return;
  }
  subMode = false;
  selectedBenchPlayer = null;
  navigate('matchLive');
}

function renderMatchDay() {
  if (!engine.state.matchLog) {
    html($('#app'), '<div class="match-view"><h2>Enginn leikur i bodi</h2><button onclick="navigate(\'dashboard\')" class="btn">Til baka</button></div>');
    return;
  }
  renderMatchResult(engine.state.matchLog);
}

function renderMatchLive() {
  const m = engine.liveMatch;
  if (!m) {
    navigate('dashboard');
    return;
  }

  const isPlayerHome = m.homeId === engine.state.playerTeam;
  const playerPlayers = isPlayerHome ? m.homePlayers : m.awayPlayers;
  const playerBench = isPlayerHome ? m.homeBench : m.awayBench;
  const playerTimeouts = isPlayerHome ? m.timeoutsRemaining.home : m.timeoutsRemaining.away;

  // Calculate time display
  const totalSecondsPerQ = 600;
  const timePerPossession = totalSecondsPerQ / m.totalPossessionsPerQ;
  const secondsLeft = Math.max(0, totalSecondsPerQ - (m.possessionNumber * timePerPossession));
  const minutesLeft = Math.floor(secondsLeft / 60);
  const secsLeft = Math.floor(secondsLeft % 60);
  const quarterLabel = m.isOvertime ? `FRL${m.overtimeNumber > 1 ? m.overtimeNumber : ''}` : `L${m.quarter}`;
  const timeDisplay = `${minutesLeft}:${String(secsLeft).padStart(2, '0')}`;

  const speedLabels = { 1: '1x', 2: '2x', 3: '3x' };

  html($('#app'), `
    <div class="live-match">
      <div class="live-scoreboard" style="background: linear-gradient(135deg, ${m.homeColors.primary}, ${m.awayColors.primary})">
        <div class="live-sb-team live-sb-home">
          <span class="live-sb-logo">${m.homeLogo}</span>
          <span class="live-sb-name">${m.homeName}</span>
        </div>
        <div class="live-sb-center">
          <div class="live-sb-score">
            <span class="live-sb-pts ${m.homeScore > m.awayScore ? 'leading' : ''}" id="homeScoreDisplay">${m.homeScore}</span>
            <span class="live-sb-dash">-</span>
            <span class="live-sb-pts ${m.awayScore > m.homeScore ? 'leading' : ''}" id="awayScoreDisplay">${m.awayScore}</span>
          </div>
          <div class="live-sb-info">
            <span class="live-sb-quarter">${quarterLabel}</span>
            <span class="live-sb-time" id="timeDisplay">${timeDisplay}</span>
          </div>
          <div class="live-sb-timeouts">
            <span title="Timabeidni heima">${'●'.repeat(m.timeoutsRemaining.home)}${'○'.repeat(4 - m.timeoutsRemaining.home)}</span>
            <span title="Timabeidni uti">${'●'.repeat(m.timeoutsRemaining.away)}${'○'.repeat(4 - m.timeoutsRemaining.away)}</span>
          </div>
        </div>
        <div class="live-sb-team live-sb-away">
          <span class="live-sb-logo">${m.awayLogo}</span>
          <span class="live-sb-name">${m.awayName}</span>
        </div>
      </div>

      ${m.isQuarterEnd && !m.isGameEnd ? renderQuarterBreak(m) : ''}
      ${m.isGameEnd ? renderGameEnd(m) : ''}

      <div class="live-body ${m.isQuarterEnd || m.isGameEnd ? 'dimmed' : ''}">
        <div class="live-log" id="liveLog">
          ${m.log.map(e => `
            <div class="log-entry log-${e.type}">
              <span class="log-time">${e.time || ''}</span>
              <span class="log-text">${e.text}</span>
            </div>
          `).join('')}
        </div>

        <div class="live-sidebar-panel">
          <div class="live-lineup">
            <h3>A velli</h3>
            <div class="live-lineup-list">
              ${playerPlayers.map((p, i) => {
                const s = m.allPlayerStats[p.id] || {};
                const positions = ['PG', 'SG', 'SF', 'PF', 'C'];
                const posLabel = positions[i] || p.pos;
                const isHot = s.isHot;
                return `
                  <div class="live-player-row ${isHot ? 'player-hot' : ''} ${subMode ? 'sub-target' : ''}"
                       ${subMode ? `onclick="completeSubstitution(${p.id})"` : ''}>
                    <span class="pos-badge pos-${posLabel.toLowerCase()}">${posLabel}</span>
                    <span class="live-p-name">${p.name}${isHot ? ' &#x1F525;' : ''}</span>
                    <span class="live-p-stats">${s.pts || 0}p ${s.reb || 0}r ${s.ast || 0}a</span>
                    <span class="live-p-fouls ${(s.fouls || 0) >= 4 ? 'foul-danger' : ''}">${s.fouls || 0}v</span>
                  </div>
                `;
              }).join('')}
            </div>

            <h3>Bekkur</h3>
            <div class="live-bench" id="benchList">
              ${playerBench.map(p => {
                const s = m.allPlayerStats[p.id] || {};
                return `
                  <div class="live-bench-player ${selectedBenchPlayer === p.id ? 'selected' : ''} ${subMode ? 'sub-source' : ''}"
                       onclick="selectBenchPlayer(${p.id})">
                    <span class="pos-badge pos-${p.pos.toLowerCase()}">${p.pos}</span>
                    <span class="live-p-name">${p.name}</span>
                    <span class="live-p-ovr">${p.ovr}</span>
                    <span class="live-p-stats">${s.pts || 0}p</span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      </div>

      <div class="live-controls">
        <div class="live-controls-row">
          <button onclick="toggleLiveMatch()" class="btn btn-primary" id="btnPlayPause">
            ${m.isRunning ? '&#x23F8; Stopp' : '&#x25B6; Spila'}
          </button>

          <div class="live-speed-btns">
            <button onclick="setLiveSpeed(1)" class="btn-speed ${m.speed === 1 ? 'active' : ''}">1x</button>
            <button onclick="setLiveSpeed(2)" class="btn-speed ${m.speed === 2 ? 'active' : ''}">2x</button>
            <button onclick="setLiveSpeed(3)" class="btn-speed ${m.speed === 3 ? 'active' : ''}">3x</button>
          </div>

          <button onclick="enterSubMode()" class="btn btn-secondary ${subMode ? 'sub-mode-active' : ''}">&#x1F504; Skipti</button>
          <button onclick="callTimeout()" class="btn btn-secondary" ${playerTimeouts <= 0 ? 'disabled' : ''}>&#x23F1; Timabeidni (${playerTimeouts})</button>
        </div>

        <div class="live-controls-row live-tactics-row">
          <div class="live-tactic-group">
            <label>Hraði:</label>
            <button onclick="setLiveTactic('tempo','slow')" class="btn-tactic ${m.tactics.tempo === 'slow' ? 'active' : ''}">Haegur</button>
            <button onclick="setLiveTactic('tempo','normal')" class="btn-tactic ${m.tactics.tempo === 'normal' ? 'active' : ''}">Venjulegur</button>
            <button onclick="setLiveTactic('tempo','fast')" class="btn-tactic ${m.tactics.tempo === 'fast' ? 'active' : ''}">Hradur</button>
          </div>
          <div class="live-tactic-group">
            <label>Ahersla:</label>
            <button onclick="setLiveTactic('focus','inside')" class="btn-tactic ${m.tactics.focus === 'inside' ? 'active' : ''}">Innileikur</button>
            <button onclick="setLiveTactic('focus','balanced')" class="btn-tactic ${m.tactics.focus === 'balanced' ? 'active' : ''}">Jafnvaegi</button>
            <button onclick="setLiveTactic('focus','threepoint')" class="btn-tactic ${m.tactics.focus === 'threepoint' ? 'active' : ''}">Thristig</button>
          </div>
          <div class="live-tactic-group">
            <label>Vorn:</label>
            <button onclick="setLiveTactic('defense','zone')" class="btn-tactic ${m.tactics.defense === 'zone' ? 'active' : ''}">Svaedisvorn</button>
            <button onclick="setLiveTactic('defense','normal')" class="btn-tactic ${m.tactics.defense === 'normal' ? 'active' : ''}">Venjuleg</button>
            <button onclick="setLiveTactic('defense','press')" class="btn-tactic ${m.tactics.defense === 'press' ? 'active' : ''}">Press</button>
          </div>
        </div>
      </div>
    </div>
  `);

  // Auto-scroll log to bottom
  const logEl = $('#liveLog');
  if (logEl) logEl.scrollTop = logEl.scrollHeight;
}

function renderQuarterBreak(m) {
  const quarterLabel = m.isOvertime
    ? (m.overtimeNumber > 1 ? `${m.overtimeNumber}. framlenging` : 'Framlenging')
    : `${m.quarter}. leikhluti`;

  const isHalftime = m.quarter === 2 && !m.isOvertime;

  return `
    <div class="quarter-break">
      <div class="qb-content">
        <h2>${isHalftime ? 'Halfleikur' : `Lokid ${quarterLabel}`}</h2>
        ${m.isOvertime && m.homeScore === m.awayScore ? '<h3>Jafntefli! Framlenging!</h3>' : ''}

        <div class="qb-scores">
          <table class="qb-table">
            <thead>
              <tr>
                <th>Lid</th>
                ${m.quarterScores.home.map((_, i) => `<th>${i < 4 ? `L${i+1}` : `FRL${i-3 > 1 ? i-3 : ''}`}</th>`).join('')}
                <th>Samtals</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${m.homeName}</td>
                ${m.quarterScores.home.map(s => `<td>${s}</td>`).join('')}
                <td><strong>${m.homeScore}</strong></td>
              </tr>
              <tr>
                <td>${m.awayName}</td>
                ${m.quarterScores.away.map(s => `<td>${s}</td>`).join('')}
                <td><strong>${m.awayScore}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>

        <button onclick="continueAfterQuarter()" class="btn btn-primary btn-lg">Halda afram &#x25B6;</button>
      </div>
    </div>
  `;
}

function renderGameEnd(m) {
  const stats = m.allPlayerStats;
  // Find MVP (highest points among all players)
  let mvpId = null;
  let maxPts = 0;
  for (const [pid, s] of Object.entries(stats)) {
    if (s.pts > maxPts) {
      maxPts = s.pts;
      mvpId = parseInt(pid);
    }
  }
  const mvp = engine.state.players.find(p => p.id === mvpId);

  const allPlayerIds = Object.entries(stats)
    .filter(([_, s]) => s.min > 0)
    .sort((a, b) => b[1].pts - a[1].pts);

  return `
    <div class="quarter-break game-end-overlay">
      <div class="qb-content game-end-content">
        <h2>LOKAHLJOD!</h2>
        <div class="ge-final-score">
          <span>${m.homeName} ${m.homeScore}</span>
          <span class="ge-dash">-</span>
          <span>${m.awayName} ${m.awayScore}</span>
        </div>

        ${mvp ? `
          <div class="ge-mvp">
            <span class="ge-mvp-label">Atkvaedamestur leikmaður</span>
            <span class="ge-mvp-name">${mvp.name}</span>
            <span class="ge-mvp-stats">${stats[mvpId].pts} stig, ${stats[mvpId].reb} frak, ${stats[mvpId].ast} stods</span>
          </div>
        ` : ''}

        <div class="qb-scores ge-boxscore">
          <h3>Tokfraedi</h3>
          <table class="stats-table">
            <thead><tr><th>Leikmaður</th><th>Lid</th><th>Stig</th><th>Frak</th><th>Stods</th><th>Stelur</th><th>Blokk</th><th>Villur</th><th>Min</th></tr></thead>
            <tbody>
              ${allPlayerIds.map(([pid, s]) => {
                const player = engine.state.players.find(p => p.id === parseInt(pid));
                if (!player) return '';
                return `
                  <tr class="${player.team === engine.state.playerTeam ? 'highlight-row' : ''}">
                    <td>${player.name}</td>
                    <td>${player.team === m.homeId ? m.homeLogo : m.awayLogo}</td>
                    <td><strong>${s.pts}</strong></td>
                    <td>${s.reb}</td>
                    <td>${s.ast}</td>
                    <td>${s.stl}</td>
                    <td>${s.blk}</td>
                    <td>${s.fouls || 0}</td>
                    <td>${Math.round(s.min)}</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>

        <button onclick="finishLiveMatch()" class="btn btn-primary btn-lg">Halda afram &#x2192;</button>
      </div>
    </div>
  `;
}

function toggleLiveMatch() {
  const m = engine.liveMatch;
  if (!m || m.isGameEnd || m.isQuarterEnd) return;

  m.isRunning = !m.isRunning;

  if (m.isRunning) {
    runLiveMatchLoop();
  } else {
    clearTimeout(liveMatchTimer);
    liveMatchTimer = null;
  }
  updateLiveControls();
}

function runLiveMatchLoop() {
  const m = engine.liveMatch;
  if (!m || !m.isRunning || m.isGameEnd || m.isQuarterEnd) {
    if (m) m.isRunning = false;
    updateLiveControls();
    return;
  }

  const result = engine.advancePossession();
  if (!result) {
    m.isRunning = false;
    renderMatchLive();
    return;
  }

  // Update display incrementally
  updateLiveDisplay(result);

  if (result.isGameEnd || result.isQuarterEnd) {
    m.isRunning = false;
    renderMatchLive(); // Full re-render for overlay
    return;
  }

  const delays = { 1: 1500, 2: 800, 3: 300 };
  const delay = delays[m.speed] || 800;
  liveMatchTimer = setTimeout(runLiveMatchLoop, delay);
}

function updateLiveDisplay(result) {
  const m = engine.liveMatch;
  if (!m) return;

  // Update score
  const homeScore = document.getElementById('homeScoreDisplay');
  const awayScore = document.getElementById('awayScoreDisplay');
  if (homeScore) {
    homeScore.textContent = m.homeScore;
    homeScore.className = `live-sb-pts ${m.homeScore > m.awayScore ? 'leading' : ''}`;
    if (result.points > 0 && result.event && result.event.team === m.homeName) {
      homeScore.classList.add('score-flash');
      setTimeout(() => homeScore.classList.remove('score-flash'), 500);
    }
  }
  if (awayScore) {
    awayScore.textContent = m.awayScore;
    awayScore.className = `live-sb-pts ${m.awayScore > m.homeScore ? 'leading' : ''}`;
    if (result.points > 0 && result.event && result.event.team === m.awayName) {
      awayScore.classList.add('score-flash');
      setTimeout(() => awayScore.classList.remove('score-flash'), 500);
    }
  }

  // Update time
  const timeEl = document.getElementById('timeDisplay');
  if (timeEl) timeEl.textContent = result.timeRemaining.split(' ')[1] || result.timeRemaining;

  // Add log entry
  if (result.event) {
    const logEl = document.getElementById('liveLog');
    if (logEl) {
      const entry = document.createElement('div');
      entry.className = `log-entry log-${result.event.type} log-new`;
      entry.innerHTML = `<span class="log-time">${result.event.time || ''}</span><span class="log-text">${result.event.text}</span>`;
      logEl.appendChild(entry);
      logEl.scrollTop = logEl.scrollHeight;
      // Remove animation class after animation
      setTimeout(() => entry.classList.remove('log-new'), 600);
    }
  }

  // Update lineup stats
  updateLiveLineupStats();
}

function updateLiveLineupStats() {
  const m = engine.liveMatch;
  if (!m) return;

  const isPlayerHome = m.homeId === engine.state.playerTeam;
  const playerPlayers = isPlayerHome ? m.homePlayers : m.awayPlayers;
  const playerBench = isPlayerHome ? m.homeBench : m.awayBench;

  const lineupList = document.querySelector('.live-lineup-list');
  if (lineupList) {
    const positions = ['PG', 'SG', 'SF', 'PF', 'C'];
    lineupList.innerHTML = playerPlayers.map((p, i) => {
      const s = m.allPlayerStats[p.id] || {};
      const posLabel = positions[i] || p.pos;
      const isHot = s.isHot;
      return `
        <div class="live-player-row ${isHot ? 'player-hot' : ''} ${subMode ? 'sub-target' : ''}"
             ${subMode ? `onclick="completeSubstitution(${p.id})"` : ''}>
          <span class="pos-badge pos-${posLabel.toLowerCase()}">${posLabel}</span>
          <span class="live-p-name">${p.name}${isHot ? ' &#x1F525;' : ''}</span>
          <span class="live-p-stats">${s.pts || 0}p ${s.reb || 0}r ${s.ast || 0}a</span>
          <span class="live-p-fouls ${(s.fouls || 0) >= 4 ? 'foul-danger' : ''}">${s.fouls || 0}v</span>
        </div>
      `;
    }).join('');
  }

  const benchList = document.getElementById('benchList');
  if (benchList) {
    benchList.innerHTML = playerBench.map(p => {
      const s = m.allPlayerStats[p.id] || {};
      return `
        <div class="live-bench-player ${selectedBenchPlayer === p.id ? 'selected' : ''} ${subMode ? 'sub-source' : ''}"
             onclick="selectBenchPlayer(${p.id})">
          <span class="pos-badge pos-${p.pos.toLowerCase()}">${p.pos}</span>
          <span class="live-p-name">${p.name}</span>
          <span class="live-p-ovr">${p.ovr}</span>
          <span class="live-p-stats">${s.pts || 0}p</span>
        </div>
      `;
    }).join('');
  }
}

function updateLiveControls() {
  const m = engine.liveMatch;
  if (!m) return;
  const btn = document.getElementById('btnPlayPause');
  if (btn) {
    btn.innerHTML = m.isRunning ? '&#x23F8; Stopp' : '&#x25B6; Spila';
  }
}

function setLiveSpeed(speed) {
  const m = engine.liveMatch;
  if (!m) return;
  m.speed = speed;
  // Update button states
  document.querySelectorAll('.btn-speed').forEach(b => b.classList.remove('active'));
  const btn = document.querySelectorAll('.btn-speed')[speed - 1];
  if (btn) btn.classList.add('active');
}

function enterSubMode() {
  const m = engine.liveMatch;
  if (!m) return;

  // Pause if running
  if (m.isRunning) {
    m.isRunning = false;
    clearTimeout(liveMatchTimer);
    liveMatchTimer = null;
  }

  subMode = !subMode;
  selectedBenchPlayer = null;

  if (subMode) {
    showToast('Veldu leikmann af bekk, sidan veldu leikmann a velli til ad skipta.', 'info');
  }

  renderMatchLive();
}

function selectBenchPlayer(playerId) {
  if (!subMode) {
    subMode = true;
  }
  selectedBenchPlayer = playerId;
  const player = engine.state.players.find(p => p.id === playerId);
  if (player) {
    showToast(`${player.name} valinn. Veldu leikmann a velli til ad skipta ut.`, 'info');
  }
  updateLiveLineupStats();
}

function completeSubstitution(starterPlayerId) {
  if (!subMode || selectedBenchPlayer === null) return;

  const m = engine.liveMatch;
  if (!m) return;

  const isPlayerHome = m.homeId === engine.state.playerTeam;
  const benchPlayer = engine.state.players.find(p => p.id === selectedBenchPlayer);
  const starterPlayer = engine.state.players.find(p => p.id === starterPlayerId);

  if (benchPlayer && starterPlayer) {
    const success = engine.liveMatchSubstitution(isPlayerHome, selectedBenchPlayer, starterPlayerId);
    if (success) {
      showToast(`${benchPlayer.name} kemur inn fyrir ${starterPlayer.name}`, 'success');
    }
  }

  subMode = false;
  selectedBenchPlayer = null;
  renderMatchLive();
}

function callTimeout() {
  const m = engine.liveMatch;
  if (!m) return;

  const isPlayerHome = m.homeId === engine.state.playerTeam;

  if (m.isRunning) {
    m.isRunning = false;
    clearTimeout(liveMatchTimer);
    liveMatchTimer = null;
  }

  const success = engine.liveMatchTimeout(isPlayerHome);
  if (success) {
    showToast('Timabeidni!', 'info');
    renderMatchLive();
  } else {
    showToast('Engar timabeidnir eftir!', 'error');
  }
}

function setLiveTactic(key, value) {
  engine.setLiveMatchTactics({ [key]: value });
  // Update button visually
  renderMatchLive();
}

function continueAfterQuarter() {
  engine.startNextQuarter();
  renderMatchLive();
}

function finishLiveMatch() {
  const m = engine.liveMatch;
  if (!m) {
    navigate('dashboard');
    return;
  }

  clearTimeout(liveMatchTimer);
  liveMatchTimer = null;

  const result = engine.finalizeLiveMatch();
  if (!result) {
    navigate('dashboard');
    return;
  }

  // Apply match results to standings and season stats
  if (pendingPlayoffLiveMatch) {
    // Update playoff series
    const activeSeries = engine.state.playoffSeries.filter(s =>
      s.round === engine.state.playoffRound && s.homeWins < 3 && s.awayWins < 3
    );
    const playerSeries = activeSeries.find(s =>
      s.home === engine.state.playerTeam || s.away === engine.state.playerTeam
    );
    if (playerSeries) {
      const gameNum = playerSeries.homeWins + playerSeries.awayWins + 1;
      if ((gameNum % 2 === 1 && result.homeScore > result.awayScore) || (gameNum % 2 === 0 && result.awayScore > result.homeScore)) {
        playerSeries.homeWins++;
      } else {
        playerSeries.awayWins++;
      }
      playerSeries.games.push({
        homeTeam: pendingPlayerMatch.home,
        awayTeam: pendingPlayerMatch.away,
        homeScore: result.homeScore,
        awayScore: result.awayScore
      });

      if (playerSeries.homeWins >= 3 || playerSeries.awayWins >= 3) {
        const winnerId = playerSeries.homeWins >= 3 ? playerSeries.home : playerSeries.away;
        const winner = engine.state.teams.find(t => t.id === winnerId);
        const roundName = engine.state.playoffRound === 1 ? 'Fjordungsurslit' : engine.state.playoffRound === 2 ? 'Undanurslit' : 'Urslit';
        engine.state.news.push({
          week: engine.state.currentWeek,
          text: `${roundName}: ${winner.name} vinnur seriuna ${playerSeries.homeWins}-${playerSeries.awayWins}!`
        });
      }
    }
    engine.applyPlayerSeasonStats(result.playerStats);
    engine.state.currentWeek++;
    engine.processWeeklyEvents();
    pendingPlayoffLiveMatch = false;
  } else if (pendingPlayerMatch) {
    engine.applyLiveMatchResult(result, pendingPlayerMatch);
  }

  pendingPlayerMatch = null;
  navigate('dashboard');
}

function renderMatchResult(match) {
  const homeTeam = getTeamById(match.home);
  const awayTeam = getTeamById(match.away);

  html($('#app'), `
    <div class="match-view">
      <div class="match-header" style="background: linear-gradient(135deg, ${homeTeam.colors.primary}, ${awayTeam.colors.primary})">
        <div class="match-team match-home">
          <div class="match-logo">${homeTeam.logo}</div>
          <div class="match-team-name">${homeTeam.name}</div>
        </div>
        <div class="match-score">
          <div class="score-big">${match.homeScore} - ${match.awayScore}</div>
          <div class="score-label">${match.playoff ? 'URSLIT' : `Vika ${match.week + 1}`}</div>
        </div>
        <div class="match-team match-away">
          <div class="match-logo">${awayTeam.logo}</div>
          <div class="match-team-name">${awayTeam.name}</div>
        </div>
      </div>

      <div class="match-content">
        <div class="match-tabs">
          <button onclick="showMatchTab('log')" class="tab-btn active" data-tab="log">Leikur</button>
          <button onclick="showMatchTab('stats')" class="tab-btn" data-tab="stats">Tokfraedi</button>
        </div>

        <div id="matchLog" class="match-log">
          ${(match.log || []).map(e => `
            <div class="log-entry log-${e.type}">
              <span class="log-time">${e.time || ''}</span>
              <span class="log-text">${e.text}</span>
            </div>
          `).join('')}
        </div>

        <div id="matchStats" class="match-stats hidden">
          <h3>Tokfraedi leikmanna</h3>
          <table class="stats-table">
            <thead><tr><th>Leikmaður</th><th>Lid</th><th>Stig</th><th>Frak</th><th>Stods</th><th>Stelur</th><th>Blokk</th><th>Min</th></tr></thead>
            <tbody>
              ${Object.entries(match.playerStats || {})
                .map(([pid, s]) => ({ player: engine.state.players.find(p => p.id === parseInt(pid)), stats: s }))
                .filter(x => x.player && x.stats.min > 0)
                .sort((a, b) => b.stats.pts - a.stats.pts)
                .map(({ player, stats }) => `
                  <tr class="${player.team === engine.state.playerTeam ? 'highlight-row' : ''}">
                    <td><a href="#" onclick="navigate('player', ${player.id}); return false;" class="player-link">${player.name}</a></td>
                    <td>${getTeamById(player.team)?.logo || ''}</td>
                    <td><strong>${stats.pts}</strong></td>
                    <td>${stats.reb}</td>
                    <td>${stats.ast}</td>
                    <td>${stats.stl}</td>
                    <td>${stats.blk}</td>
                    <td>${stats.min}</td>
                  </tr>
                `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <div class="match-actions">
        <button onclick="navigate('dashboard')" class="btn btn-primary">Halda afram &#x2192;</button>
      </div>
    </div>
  `);

  const logEl = $('#matchLog');
  if (logEl) logEl.scrollTop = logEl.scrollHeight;
}

function showMatchTab(tab) {
  $$('.tab-btn').forEach(b => b.classList.remove('active'));
  $(`.tab-btn[data-tab="${tab}"]`).classList.add('active');

  if (tab === 'log') { show($('#matchLog')); hide($('#matchStats')); }
  else { hide($('#matchLog')); show($('#matchStats')); }
}

// ============ TABLE ============

function renderTable() {
  const standings = engine.getStandings();

  html($('#app'), `
    <div class="table-view">
      <h2>Stigatafla - Úrvalsdeild Karla</h2>
      <table class="league-table">
        <thead>
          <tr>
            <th>#</th><th>Lið</th><th>Leikir</th><th>Sigrar</th><th>Töp</th>
            <th>Fyrir</th><th>Á Móti</th><th>Mismunur</th><th>Stig</th><th>Form</th>
          </tr>
        </thead>
        <tbody>
          ${standings.map((t, i) => `
            <tr class="${t.id === engine.state.playerTeam ? 'highlight-row' : ''} ${i < 8 ? 'playoff-zone' : ''}">
              <td><strong>${i + 1}</strong></td>
              <td>${t.logo} ${t.name}</td>
              <td>${t.wins + t.losses}</td>
              <td>${t.wins}</td>
              <td>${t.losses}</td>
              <td>${t.pointsFor}</td>
              <td>${t.pointsAgainst}</td>
              <td class="${t.pointsFor - t.pointsAgainst >= 0 ? 'positive' : 'negative'}">${t.pointsFor - t.pointsAgainst > 0 ? '+' : ''}${t.pointsFor - t.pointsAgainst}</td>
              <td><strong>${t.wins * 2}</strong></td>
              <td class="form-cell">${t.form.map(f => `<span class="form-${f.toLowerCase()}">${f}</span>`).join('')}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <div class="table-legend">
        <span class="legend-playoff">● Efstu 8 komast í úrslitakeppni</span>
      </div>
    </div>
  `);
}

// ============ RESULTS ============

function renderResults() {
  const results = engine.state.results.slice().reverse();

  html($('#app'), `
    <div class="results-view">
      <h2>Úrslit</h2>
      ${results.length === 0 ? '<p class="empty">Engir leikir spilaðir enn.</p>' : ''}
      <div class="results-list">
        ${results.map(r => `
          <div class="result-card ${r.home === engine.state.playerTeam || r.away === engine.state.playerTeam ? 'result-ours' : ''}">
            <span class="result-week">V${r.week + 1}</span>
            <span class="result-home ${r.homeScore > r.awayScore ? 'winner' : ''}">${getTeamById(r.home)?.name || r.home}</span>
            <span class="result-score">${r.homeScore} - ${r.awayScore}</span>
            <span class="result-away ${r.awayScore > r.homeScore ? 'winner' : ''}">${getTeamById(r.away)?.name || r.away}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `);
}

// ============ TRANSFERS ============

function renderTransfers() {
  const market = engine.state.transferMarket;
  const freeAgents = engine.state.freeAgents;

  html($('#app'), `
    <div class="transfers-view">
      <h2>Leikmannamarkaður</h2>

      <div class="transfer-tabs">
        <button onclick="showTransferTab('market')" class="tab-btn active" data-tab="market">Markaður</button>
        <button onclick="showTransferTab('free')" class="tab-btn" data-tab="free">Lausir leikmenn</button>
      </div>

      <div id="transferMarket">
        <div class="transfer-budget">Fjármagn: <strong>${formatMoney(engine.state.finances.budget)} ISK</strong></div>
        <table class="player-table">
          <thead><tr><th>Nafn</th><th>Lið</th><th>Staða</th><th>Aldur</th><th>OVR</th><th>PPG</th><th>Verð</th><th></th></tr></thead>
          <tbody>
            ${market.map(l => {
              const p = engine.state.players.find(pl => pl.id === l.playerId);
              if (!p) return '';
              return `
                <tr>
                  <td><a href="#" onclick="navigate('player', ${p.id}); return false;" class="player-link ${p.foreign ? 'foreign' : ''}">${p.name}</a></td>
                  <td>${getTeamById(p.team)?.logo || ''} ${getTeamById(p.team)?.name || ''}</td>
                  <td><span class="pos-badge pos-${p.pos.toLowerCase()}">${p.pos}</span></td>
                  <td>${p.age}</td>
                  <td><span class="ovr-badge ovr-${getOvrClass(p.ovr)}">${p.ovr}</span></td>
                  <td>${p.ppg.toFixed(1)}</td>
                  <td><strong>${formatMoney(l.price)} ISK</strong></td>
                  <td><button onclick="buyPlayerAction(${p.id})" class="btn-xs btn-primary">Kaupa</button></td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
        <button onclick="refreshMarket()" class="btn btn-secondary">Endurnýja markað</button>
      </div>

      <div id="transferFree" class="hidden">
        <table class="player-table">
          <thead><tr><th>Nafn</th><th>Staða</th><th>Aldur</th><th>OVR</th><th>Laun</th><th></th></tr></thead>
          <tbody>
            ${freeAgents.map(p => `
              <tr>
                <td class="${p.foreign ? 'foreign' : ''}">${p.name}</td>
                <td><span class="pos-badge pos-${p.pos.toLowerCase()}">${p.pos}</span></td>
                <td>${p.age}</td>
                <td><span class="ovr-badge ovr-${getOvrClass(p.ovr)}">${p.ovr}</span></td>
                <td>${formatMoney(p.salary)}/m</td>
                <td><button onclick="signFreeAgentAction(${p.id})" class="btn-xs btn-primary">Skrifa undir</button></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `);
}

function showTransferTab(tab) {
  $$('.transfer-tabs .tab-btn').forEach(b => b.classList.remove('active'));
  $(`.transfer-tabs .tab-btn[data-tab="${tab}"]`).classList.add('active');
  if (tab === 'market') { show($('#transferMarket')); hide($('#transferFree')); }
  else { hide($('#transferMarket')); show($('#transferFree')); }
}

function buyPlayerAction(playerId) {
  const result = engine.buyPlayer(playerId);
  showToast(result.message, result.success ? 'success' : 'error');
  if (result.success) renderTransfers();
}

function signFreeAgentAction(agentId) {
  const result = engine.signFreeAgent(agentId);
  showToast(result.message, result.success ? 'success' : 'error');
  if (result.success) renderTransfers();
}

function sellPlayerPrompt(playerId) {
  const player = engine.state.players.find(p => p.id === playerId);
  if (confirm(`Ertu viss um að þú viljir selja ${player.name}?`)) {
    const result = engine.sellPlayer(playerId);
    showToast(result.message, result.success ? 'success' : 'error');
    if (result.success) renderSquad();
  }
}

function refreshMarket() {
  engine.generateTransferMarket();
  renderTransfers();
}

// ============ FINANCES ============

function renderFinances() {
  const f = engine.state.finances;

  html($('#app'), `
    <div class="finances-view">
      <h2>Fjármál</h2>

      <div class="finance-grid">
        <div class="finance-card finance-total">
          <h3>Sjóður</h3>
          <div class="finance-big">${formatMoney(f.budget)} ISK</div>
        </div>

        <div class="finance-card">
          <h3>Tekjur á viku</h3>
          <div class="finance-line positive">Styrktarfé: +${formatMoney(f.sponsorIncome / 4)}</div>
          <div class="finance-line positive">Aðrar tekjur: +${formatMoney(f.weeklyIncome)}</div>
          <div class="finance-line positive">Miðasala (samtals): +${formatMoney(f.ticketIncome)}</div>
        </div>

        <div class="finance-card">
          <h3>Útgjöld á viku</h3>
          <div class="finance-line negative">Laun: -${formatMoney(f.weeklyCosts)}</div>
        </div>

        <div class="finance-card">
          <h3>Flutningar</h3>
          ${f.transfers.length === 0 ? '<p class="empty">Engir flutningar enn.</p>' : ''}
          ${f.transfers.map(t => `
            <div class="finance-line ${t.type === 'sell' ? 'positive' : 'negative'}">
              ${t.type === 'buy' ? 'Keypt' : 'Selt'}: ${t.player} — ${t.type === 'buy' ? '-' : '+'}${formatMoney(t.amount)}
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `);
}

// ============ PLAYER DETAIL ============

function renderPlayerDetail(playerId) {
  const player = engine.state.players.find(p => p.id === playerId);
  if (!player) return;

  const isOurs = player.team === engine.state.playerTeam;
  const team = getTeamById(player.team);
  const s = player.seasonStats;
  const gp = Math.max(1, s.gp);

  html($('#app'), `
    <div class="player-detail">
      <div class="pd-header" style="background: ${team ? team.colors.primary : '#333'}">
        <div class="pd-info">
          <h2>${player.name}</h2>
          <div class="pd-meta">
            ${team ? `${team.logo} ${team.name}` : 'Laus'} | ${POS[player.pos]} | ${player.age} ára
            ${player.foreign ? ` | 🌍 ${player.nationality}` : ' | 🇮🇸'}
          </div>
        </div>
        <div class="pd-ovr">
          <div class="ovr-circle ovr-${getOvrClass(player.ovr)}">${player.ovr}</div>
          <div class="pd-potential">Möguleikar: ${player.potential}</div>
        </div>
      </div>

      <div class="pd-grid">
        <div class="pd-card">
          <h3>Ástandið</h3>
          <div class="pd-bar-group">
            <label>Orka</label>
            <div class="energy-bar big"><div class="energy-fill" style="width: ${player.energy}%; background: ${player.energy > 60 ? '#27ae60' : '#f39c12'}"></div></div>
            <span>${player.energy}%</span>
          </div>
          <div class="pd-bar-group">
            <label>Morall</label>
            <div class="energy-bar big"><div class="energy-fill" style="width: ${player.morale}%; background: ${player.morale > 60 ? '#3498db' : '#e74c3c'}"></div></div>
            <span>${player.morale}%</span>
          </div>
          <div class="pd-status">
            ${player.injured ? `🤕 Meiddur - ${player.injuryWeeks} vikur eftir` : '✅ Heilbrigður'}
          </div>
          <div class="pd-contract">📋 Samningur: ${player.contract} ár | 💰 ${formatMoney(player.salary)}/mán</div>
        </div>

        <div class="pd-card">
          <h3>Tölfræði tímabilsins</h3>
          <div class="stats-grid-sm">
            <div class="stat-item"><div class="stat-val">${s.gp}</div><div class="stat-label">Leikir</div></div>
            <div class="stat-item"><div class="stat-val">${(s.pts / gp).toFixed(1)}</div><div class="stat-label">Stig/leik</div></div>
            <div class="stat-item"><div class="stat-val">${(s.reb / gp).toFixed(1)}</div><div class="stat-label">Frák/leik</div></div>
            <div class="stat-item"><div class="stat-val">${(s.ast / gp).toFixed(1)}</div><div class="stat-label">Stoðs/leik</div></div>
            <div class="stat-item"><div class="stat-val">${(s.stl / gp).toFixed(1)}</div><div class="stat-label">Stelur/leik</div></div>
            <div class="stat-item"><div class="stat-val">${(s.blk / gp).toFixed(1)}</div><div class="stat-label">Blokk/leik</div></div>
            <div class="stat-item"><div class="stat-val">${s.fga > 0 ? (s.fgm / s.fga * 100).toFixed(0) : player.fg.toFixed(0)}%</div><div class="stat-label">FG%</div></div>
            <div class="stat-item"><div class="stat-val">${s.tpa > 0 ? (s.tpm / s.tpa * 100).toFixed(0) : player.tp.toFixed(0)}%</div><div class="stat-label">3P%</div></div>
          </div>
        </div>

        <div class="pd-card">
          <h3>Hæfileikar</h3>
          <div class="ability-bars">
            <div class="ability"><label>Skotnýting</label><div class="ability-bar"><div class="ability-fill" style="width: ${player.fg}%"></div></div></div>
            <div class="ability"><label>Þristar</label><div class="ability-bar"><div class="ability-fill" style="width: ${player.tp}%"></div></div></div>
            <div class="ability"><label>Frjáls skot</label><div class="ability-bar"><div class="ability-fill" style="width: ${player.ft}%"></div></div></div>
            <div class="ability"><label>Skorun</label><div class="ability-bar"><div class="ability-fill" style="width: ${Math.min(100, player.ppg * 4)}%"></div></div></div>
            <div class="ability"><label>Fráköst</label><div class="ability-bar"><div class="ability-fill" style="width: ${Math.min(100, (player.rpg || 0) * 10)}%"></div></div></div>
            <div class="ability"><label>Stoðsendingar</label><div class="ability-bar"><div class="ability-fill" style="width: ${Math.min(100, (player.apg || 0) * 12)}%"></div></div></div>
          </div>
        </div>
      </div>

      <button onclick="navigate('squad')" class="btn btn-secondary">← Til baka</button>
    </div>
  `);
}

// ============ LEAGUE STATS ============

function renderLeagueStats() {
  const topScorers = engine.getTopScorers(15);

  html($('#app'), `
    <div class="stats-view">
      <h2>Tölfræði deildarinnar</h2>
      <h3>Stigakongar</h3>
      <table class="player-table">
        <thead><tr><th>#</th><th>Leikmaður</th><th>Lið</th><th>Leikir</th><th>Stig/l</th><th>Frák/l</th><th>Stoðs/l</th></tr></thead>
        <tbody>
          ${topScorers.map((p, i) => `
            <tr class="${p.team === engine.state.playerTeam ? 'highlight-row' : ''}">
              <td>${i + 1}</td>
              <td><a href="#" onclick="navigate('player', ${p.id}); return false;" class="player-link">${p.name}</a></td>
              <td>${getTeamById(p.team)?.logo || ''} ${getTeamById(p.team)?.name || ''}</td>
              <td>${p.seasonStats.gp}</td>
              <td><strong>${p.avgPts.toFixed(1)}</strong></td>
              <td>${(p.seasonStats.reb / Math.max(1, p.seasonStats.gp)).toFixed(1)}</td>
              <td>${(p.seasonStats.ast / Math.max(1, p.seasonStats.gp)).toFixed(1)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `);
}

// ============ PLAYOFFS ============

function renderPlayoffs() {
  if (engine.state.phase !== 'playoffs') {
    html($('#app'), `
      <div class="playoffs-view">
        <h2>Úrslitakeppni</h2>
        <p class="empty">Úrslitakeppni er ekki hafin enn.</p>
        <p>Efstu 8 liðin komast í úrslitakeppni eftir grunnumferð.</p>
      </div>
    `);
    return;
  }

  const series = engine.state.playoffSeries;

  html($('#app'), `
    <div class="playoffs-view">
      <h2>🏆 Úrslitakeppni</h2>
      <div class="bracket">
        ${[1, 2, 3].map(round => {
          const roundSeries = series.filter(s => s.round === round);
          const roundName = round === 1 ? 'Fjórðungsúrslit' : round === 2 ? 'Undanúrslit' : 'Úrslit';
          return `
            <div class="bracket-round">
              <h3>${roundName}</h3>
              ${roundSeries.map(s => `
                <div class="bracket-series ${s.homeWins >= 3 || s.awayWins >= 3 ? 'series-done' : 'series-active'}">
                  <div class="bracket-team ${s.homeWins >= 3 ? 'series-winner' : ''}">${getTeamById(s.home)?.logo} ${getTeamById(s.home)?.name} <strong>${s.homeWins}</strong></div>
                  <div class="bracket-team ${s.awayWins >= 3 ? 'series-winner' : ''}">${getTeamById(s.away)?.logo} ${getTeamById(s.away)?.name} <strong>${s.awayWins}</strong></div>
                </div>
              `).join('')}
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `);
}

// ============ NEWS ============

function renderNews() {
  const news = engine.state.news.slice().reverse();

  html($('#app'), `
    <div class="news-view">
      <h2>Fréttir</h2>
      <div class="news-list">
        ${news.map(n => `
          <div class="news-card">
            <span class="news-week-badge">Vika ${n.week + 1}</span>
            <span class="news-text">${n.text}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `);
}

// ============ TOAST NOTIFICATIONS ============

function showToast(msg, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 3000);
}

// ============ SAVE/LOAD ============

function saveGame() {
  engine.saveGame();
  showToast('Leikur vistaður!', 'success');
}

function loadSavedGame() {
  if (engine.loadGame()) {
    showSidebar();
    navigate('dashboard');
    showToast('Leikur hlaðinn!', 'success');
  } else {
    showToast('Enginn vistaður leikur fannst.', 'error');
  }
}

// ============ EXPOSE TO GLOBAL SCOPE ============

window.navigate = navigate;
window.selectTeam = selectTeam;
window.setTactic = setTactic;
window.changeStarter = changeStarter;
window.playNextMatch = playNextMatch;
window.playPlayoffGame = playPlayoffGame;
window.simulateWeek = simulateWeek;
window.showMatchTab = showMatchTab;
window.showTransferTab = showTransferTab;
window.buyPlayerAction = buyPlayerAction;
window.signFreeAgentAction = signFreeAgentAction;
window.sellPlayerPrompt = sellPlayerPrompt;
window.toggleGameDay = toggleGameDay;
window.refreshMarket = refreshMarket;
window.saveGame = saveGame;
window.loadSavedGame = loadSavedGame;
window.toggleLiveMatch = toggleLiveMatch;
window.setLiveSpeed = setLiveSpeed;
window.enterSubMode = enterSubMode;
window.selectBenchPlayer = selectBenchPlayer;
window.completeSubstitution = completeSubstitution;
window.callTimeout = callTimeout;
window.setLiveTactic = setLiveTactic;
window.continueAfterQuarter = continueAfterQuarter;
window.finishLiveMatch = finishLiveMatch;

// ============ INIT ============

document.addEventListener('DOMContentLoaded', () => {
  navigate('menu');
});
