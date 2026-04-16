// ============================================================
// KÖRFUBOLTASTJÓRI - Game Engine
// ============================================================

// Uses globals from data.js: TEAM_DATA, PLAYER_DATA, MATCH_EVENTS, estimateSalary, IS_FIRST_NAMES, IS_LAST_NAMES, FOREIGN_FIRST_NAMES, FOREIGN_LAST_NAMES

class GameEngine {
  constructor() {
    this.state = null;
  }

  newGame(teamId) {
    const teams = TEAM_DATA.map(t => ({
      ...t,
      wins: 0, losses: 0, pointsFor: 0, pointsAgainst: 0,
      streak: 0, form: [],
      morale: 70 + Math.floor(Math.random() * 20)
    }));

    const players = PLAYER_DATA.map((p, i) => ({
      ...p,
      id: i,
      salary: estimateSalary(p.ovr, p.foreign),
      energy: 85 + Math.floor(Math.random() * 15),
      morale: 70 + Math.floor(Math.random() * 20),
      injured: false,
      injuryWeeks: 0,
      seasonStats: { gp: 0, pts: 0, reb: 0, ast: 0, stl: 0, blk: 0, fgm: 0, fga: 0, tpm: 0, tpa: 0, ftm: 0, fta: 0, min: 0 },
      potential: Math.min(99, p.ovr + Math.floor(Math.random() * 10) - 2),
      contract: 1 + Math.floor(Math.random() * 3)
    }));

    const schedule = this.generateSchedule(teams);

    this.state = {
      playerTeam: teamId,
      teams,
      players,
      schedule,
      currentWeek: 0,
      season: 1,
      phase: 'regular', // regular, playoffs, offseason
      playoffRound: 0,
      playoffSeries: [],
      results: [],
      news: [{ week: 0, text: "Velkomin í Úrvalsdeild karla í körfubolta! Nýtt tímabil hefst." }],
      tactics: {
        tempo: 'normal', // slow, normal, fast
        defense: 'normal', // zone, normal, press
        focus: 'balanced', // inside, balanced, threepoint
        starterIds: this.getDefaultStarters(players, teamId),
        gameDayRoster: this.getDefaultGameDayRoster(players, teamId) // 12 players max
      },
      finances: {
        budget: teams.find(t => t.id === teamId).budget,
        weeklyIncome: 1500000,
        weeklyCosts: 0,
        ticketIncome: 0,
        sponsorIncome: 2000000,
        transfers: []
      },
      transferMarket: [],
      freeAgents: this.generateFreeAgents(),
      matchLog: null
    };

    this.state.finances.weeklyCosts = this.calculateWeeklyCosts();
    this.generateTransferMarket();
    return this.state;
  }

  getDefaultStarters(players, teamId) {
    const teamPlayers = players.filter(p => p.team === teamId && !p.injured);
    const positions = ['PG', 'SG', 'SF', 'PF', 'C'];
    const starters = [];
    for (const pos of positions) {
      const candidates = teamPlayers.filter(p => p.pos === pos && !starters.includes(p.id));
      if (candidates.length > 0) {
        candidates.sort((a, b) => b.ovr - a.ovr);
        starters.push(candidates[0].id);
      }
    }
    while (starters.length < 5) {
      const remaining = teamPlayers.filter(p => !starters.includes(p.id));
      if (remaining.length === 0) break;
      remaining.sort((a, b) => b.ovr - a.ovr);
      starters.push(remaining[0].id);
    }
    return starters;
  }

  getDefaultGameDayRoster(players, teamId) {
    const teamPlayers = players.filter(p => p.team === teamId && !p.injured);
    // Top 12 by OVR, but always include starters
    const starters = this.getDefaultStarters(players, teamId);
    const rest = teamPlayers
      .filter(p => !starters.includes(p.id))
      .sort((a, b) => b.ovr - a.ovr)
      .slice(0, 7)
      .map(p => p.id);
    return [...starters, ...rest];
  }

  getGameDayRoster(teamId) {
    if (teamId === this.state.playerTeam && this.state.tactics.gameDayRoster) {
      return this.state.tactics.gameDayRoster
        .map(id => this.state.players.find(p => p.id === id))
        .filter(p => p && !p.injured);
    }
    // AI teams: auto-pick best 12
    const teamPlayers = this.state.players.filter(p => p.team === teamId && !p.injured);
    return teamPlayers.sort((a, b) => b.ovr - a.ovr).slice(0, 12);
  }

  setGameDayRoster(ids) {
    if (ids.length > 12) ids = ids.slice(0, 12);
    this.state.tactics.gameDayRoster = ids;
    // Ensure starters are in the roster
    this.state.tactics.starterIds = this.state.tactics.starterIds.filter(id => ids.includes(id));
    while (this.state.tactics.starterIds.length < 5) {
      const next = ids.find(id => !this.state.tactics.starterIds.includes(id));
      if (!next) break;
      this.state.tactics.starterIds.push(next);
    }
  }

  generateSchedule(teams) {
    const schedule = [];
    const n = teams.length;
    const teamIds = teams.map(t => t.id);

    // Round-robin: each team plays every other team twice (home and away)
    const rounds = [];
    const ids = [...teamIds];
    if (ids.length % 2 !== 0) ids.push(null);
    const half = ids.length / 2;

    for (let round = 0; round < (ids.length - 1) * 2; round++) {
      const matches = [];
      for (let i = 0; i < half; i++) {
        const home = ids[i];
        const away = ids[ids.length - 1 - i];
        if (home && away) {
          if (round < ids.length - 1) {
            matches.push({ home, away, week: round });
          } else {
            matches.push({ home: away, away: home, week: round });
          }
        }
      }
      rounds.push(matches);
      // rotate
      const last = ids.pop();
      ids.splice(1, 0, last);
    }

    return rounds;
  }

  calculateWeeklyCosts() {
    const teamPlayers = this.state.players.filter(p => p.team === this.state.playerTeam);
    return teamPlayers.reduce((sum, p) => sum + Math.floor(p.salary / 4), 0);
  }

  simulateMatch(homeId, awayId, isPlayerMatch = false) {
    const home = this.state.teams.find(t => t.id === homeId);
    const away = this.state.teams.find(t => t.id === awayId);
    // Use 12-man roster for matches
    const homeRoster = this.getGameDayRoster(homeId);
    const awayRoster = this.getGameDayRoster(awayId);

    if (homeRoster.length < 5 || awayRoster.length < 5) {
      return { homeScore: 0, awayScore: 0, log: ["Ekki nógu margir leikmenn."], playerStats: {} };
    }

    const homeStarters = this.getStarters(homeRoster, homeId);
    const awayStarters = this.getStarters(awayRoster, awayId);
    const homeOvr = this.teamStrength(homeStarters) + 3; // home advantage
    const awayOvr = this.teamStrength(awayStarters);

    const log = [];
    let homeScore = 0;
    let awayScore = 0;
    const playerStats = {};

    const allPlayers = [...homeRoster, ...awayRoster];
    allPlayers.forEach(p => {
      playerStats[p.id] = { pts: 0, reb: 0, ast: 0, stl: 0, blk: 0, fgm: 0, fga: 0, tpm: 0, tpa: 0, ftm: 0, fta: 0, min: 0, fouls: 0 };
    });

    const quarters = 4;
    const possessionsPerQ = 22 + Math.floor(Math.random() * 6);

    for (let q = 1; q <= quarters; q++) {
      if (isPlayerMatch) {
        log.push({ type: 'quarter', text: `--- ${q}. leikhluti ---`, time: `Q${q}` });
      }

      for (let pos = 0; pos < possessionsPerQ; pos++) {
        const timeStr = `Q${q} ${Math.floor((pos / possessionsPerQ) * 10)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`;

        // Home possession
        const hResult = this.simulatePossession(homeStarters, awayStarters, homeOvr, awayOvr, isPlayerMatch, home.name, timeStr);
        homeScore += hResult.points;
        if (hResult.event) log.push(hResult.event);
        this.updatePossessionStats(playerStats, hResult);

        // Away possession
        const aResult = this.simulatePossession(awayStarters, homeStarters, awayOvr, homeOvr, isPlayerMatch, away.name, timeStr);
        awayScore += aResult.points;
        if (aResult.event) log.push(aResult.event);
        this.updatePossessionStats(playerStats, aResult);
      }

      if (isPlayerMatch) {
        log.push({
          type: 'quarterEnd',
          text: `Lokið ${q}. leikhluta! ${home.name} ${homeScore} - ${awayScore} ${away.name}`,
          time: `Q${q} END`
        });
      }
    }

    // Overtime if tied
    while (homeScore === awayScore) {
      if (isPlayerMatch) log.push({ type: 'quarter', text: '--- Framlenging! ---', time: 'OT' });
      for (let pos = 0; pos < 8; pos++) {
        const hResult = this.simulatePossession(homeStarters, awayStarters, homeOvr, awayOvr, isPlayerMatch, home.name, 'OT');
        homeScore += hResult.points;
        if (hResult.event) log.push(hResult.event);
        this.updatePossessionStats(playerStats, hResult);

        const aResult = this.simulatePossession(awayStarters, homeStarters, awayOvr, homeOvr, isPlayerMatch, away.name, 'OT');
        awayScore += aResult.points;
        if (aResult.event) log.push(aResult.event);
        this.updatePossessionStats(playerStats, aResult);
      }
    }

    log.push({
      type: 'final',
      text: `LOKAHLJÓÐ! ${home.name} ${homeScore} - ${awayScore} ${away.name}`,
      time: 'FINAL'
    });

    // Set minutes for starters
    [...homeStarters, ...awayStarters].forEach(p => {
      playerStats[p.id].min = 28 + Math.floor(Math.random() * 10);
    });

    return { homeScore, awayScore, log, playerStats };
  }

  // ============ LIVE MATCH ENGINE ============

  startLiveMatch(homeId, awayId) {
    const home = this.state.teams.find(t => t.id === homeId);
    const away = this.state.teams.find(t => t.id === awayId);
    // Use 12-man game day roster
    const homeRoster = this.getGameDayRoster(homeId);
    const awayRoster = this.getGameDayRoster(awayId);

    if (homeRoster.length < 5 || awayRoster.length < 5) {
      return null;
    }

    const homeStarters = this.getStarters(homeRoster, homeId);
    const awayStarters = this.getStarters(awayRoster, awayId);
    const homeBench = homeRoster.filter(p => !homeStarters.find(s => s.id === p.id));
    const awayBench = awayRoster.filter(p => !awayStarters.find(s => s.id === p.id));

    const playerStats = {};
    const allPlayers = [...homeRoster, ...awayRoster];
    allPlayers.forEach(p => {
      playerStats[p.id] = { pts: 0, reb: 0, ast: 0, stl: 0, blk: 0, fgm: 0, fga: 0, tpm: 0, tpa: 0, ftm: 0, fta: 0, min: 0, fouls: 0, consecutiveBaskets: 0, isHot: false };
    });

    const possessionsPerQ = 22 + Math.floor(Math.random() * 6);

    this.liveMatch = {
      homeId,
      awayId,
      homeName: home.name,
      awayName: away.name,
      homeLogo: home.logo,
      awayLogo: away.logo,
      homeColors: home.colors,
      awayColors: away.colors,
      homeScore: 0,
      awayScore: 0,
      quarter: 1,
      possessionNumber: 0,
      totalPossessionsPerQ: possessionsPerQ,
      homePlayers: [...homeStarters],
      awayPlayers: [...awayStarters],
      homeBench: homeBench,
      awayBench: awayBench,
      allPlayerStats: playerStats,
      isRunning: false,
      speed: 2,
      timeoutsRemaining: { home: 4, away: 4 },
      foulsPerQuarter: { home: {}, away: {} },
      log: [],
      isHomePos: true, // whose possession
      isQuarterEnd: false,
      isGameEnd: false,
      isOvertime: false,
      overtimeNumber: 0,
      quarterScores: { home: [], away: [] },
      currentQuarterHomeScore: 0,
      currentQuarterAwayScore: 0,
      tactics: { ...this.state.tactics }
    };

    // Add quarter start to log
    this.liveMatch.log.push({ type: 'quarter', text: '--- 1. leikhluti ---', time: 'Q1' });

    return this.liveMatch;
  }

  advancePossession() {
    const m = this.liveMatch;
    if (!m || m.isGameEnd) return null;

    if (m.isQuarterEnd) return null; // Must call startNextQuarter first

    const isPlayerTeamOnOffense = (m.isHomePos && m.homeId === this.state.playerTeam) ||
                                   (!m.isHomePos && m.awayId === this.state.playerTeam);

    const offense = m.isHomePos ? m.homePlayers : m.awayPlayers;
    const defense = m.isHomePos ? m.awayPlayers : m.homePlayers;
    const teamName = m.isHomePos ? m.homeName : m.awayName;

    const offStr = this.teamStrength(offense) + (m.isHomePos ? 3 : 0);
    const defStr = this.teamStrength(defense) + (!m.isHomePos ? 3 : 0);

    // Calculate time remaining
    const totalSecondsPerQ = 600; // 10 minutes per quarter
    const timePerPossession = totalSecondsPerQ / m.totalPossessionsPerQ;
    const elapsedPossessions = m.isHomePos ? m.possessionNumber : m.possessionNumber;
    const secondsLeft = Math.max(0, totalSecondsPerQ - (m.possessionNumber * timePerPossession));
    const minutesLeft = Math.floor(secondsLeft / 60);
    const secsLeft = Math.floor(secondsLeft % 60);
    const quarterLabel = m.isOvertime ? `FRL${m.overtimeNumber > 1 ? m.overtimeNumber : ''}` : `L${m.quarter}`;
    const timeStr = `${quarterLabel} ${minutesLeft}:${String(secsLeft).padStart(2, '0')}`;

    // Use player team's current tactics for offense/defense modifiers
    const activeTactics = m.tactics;

    const result = this.simulateLivePossession(offense, defense, offStr, defStr, teamName, timeStr, activeTactics, isPlayerTeamOnOffense);

    // Update scores
    if (m.isHomePos) {
      m.homeScore += result.points;
      m.currentQuarterHomeScore += result.points;
    } else {
      m.awayScore += result.points;
      m.currentQuarterAwayScore += result.points;
    }

    // Update stats
    this.updatePossessionStats(m.allPlayerStats, result);

    // Track fouls
    if (result.foulOnDefender) {
      const defTeamKey = m.isHomePos ? 'away' : 'home';
      if (!m.foulsPerQuarter[defTeamKey][m.quarter]) m.foulsPerQuarter[defTeamKey][m.quarter] = 0;
      m.foulsPerQuarter[defTeamKey][m.quarter]++;
      if (result.fouledPlayerId && m.allPlayerStats[result.fouledPlayerId]) {
        m.allPlayerStats[result.fouledPlayerId].fouls++;
      }
    }

    // Track hot streak
    if (result.scorerId != null && m.allPlayerStats[result.scorerId]) {
      m.allPlayerStats[result.scorerId].consecutiveBaskets++;
      if (m.allPlayerStats[result.scorerId].consecutiveBaskets >= 3) {
        m.allPlayerStats[result.scorerId].isHot = true;
      }
    }
    // Reset streak for missed shots
    if (result.fga && !result.fgm && result.scorerId == null) {
      // find scorer from offense who missed
      offense.forEach(p => {
        if (result.missedPlayerId === p.id && m.allPlayerStats[p.id]) {
          m.allPlayerStats[p.id].consecutiveBaskets = 0;
          m.allPlayerStats[p.id].isHot = false;
        }
      });
    }

    // Add event to log
    if (result.event) {
      m.log.push(result.event);
    }

    // Update energy for players on court
    [...m.homePlayers, ...m.awayPlayers].forEach(p => {
      if (m.allPlayerStats[p.id]) {
        m.allPlayerStats[p.id].min += 0.4; // roughly per possession
      }
    });

    // Alternate possession
    if (m.isHomePos) {
      m.isHomePos = false; // now away's turn
    } else {
      m.isHomePos = true;
      m.possessionNumber++; // full possession pair complete
    }

    // Check quarter end
    const otPossessions = 8;
    const maxPoss = m.isOvertime ? otPossessions : m.totalPossessionsPerQ;
    if (m.possessionNumber >= maxPoss && m.isHomePos) {
      // End of quarter/OT
      const qLabel = m.isOvertime ? 'Framlenging' : `${m.quarter}. leikhluti`;
      m.log.push({
        type: 'quarterEnd',
        text: `Lokið ${qLabel}! ${m.homeName} ${m.homeScore} - ${m.awayScore} ${m.awayName}`,
        time: `${quarterLabel} END`
      });

      m.quarterScores.home.push(m.currentQuarterHomeScore);
      m.quarterScores.away.push(m.currentQuarterAwayScore);

      if (m.quarter >= 4 && !m.isOvertime && m.homeScore !== m.awayScore) {
        // Game over
        m.isGameEnd = true;
        m.log.push({
          type: 'final',
          text: `LOKAHLJOD! ${m.homeName} ${m.homeScore} - ${m.awayScore} ${m.awayName}`,
          time: 'LOKID'
        });
      } else if (m.isOvertime && m.homeScore !== m.awayScore) {
        // OT ended with a winner
        m.isGameEnd = true;
        m.log.push({
          type: 'final',
          text: `LOKAHLJOD! ${m.homeName} ${m.homeScore} - ${m.awayScore} ${m.awayName}`,
          time: 'LOKID'
        });
      } else if (m.quarter >= 4 && !m.isOvertime && m.homeScore === m.awayScore) {
        // Need OT
        m.isQuarterEnd = true;
        m.isOvertime = true;
        m.overtimeNumber++;
      } else if (m.isOvertime && m.homeScore === m.awayScore) {
        // Need another OT
        m.isQuarterEnd = true;
        m.overtimeNumber++;
      } else {
        // Regular quarter end
        m.isQuarterEnd = true;
      }
    }

    return {
      event: result.event,
      homeScore: m.homeScore,
      awayScore: m.awayScore,
      quarter: m.quarter,
      timeRemaining: timeStr,
      possession: m.isHomePos ? 'home' : 'away',
      isQuarterEnd: m.isQuarterEnd,
      isGameEnd: m.isGameEnd,
      playerStats: m.allPlayerStats,
      points: result.points
    };
  }

  startNextQuarter() {
    const m = this.liveMatch;
    if (!m) return;

    m.isQuarterEnd = false;
    m.possessionNumber = 0;
    m.currentQuarterHomeScore = 0;
    m.currentQuarterAwayScore = 0;
    m.isHomePos = true;

    if (m.isOvertime) {
      const label = m.overtimeNumber > 1 ? `${m.overtimeNumber}. framlenging` : 'Framlenging';
      m.log.push({ type: 'quarter', text: `--- ${label}! ---`, time: `FRL${m.overtimeNumber > 1 ? m.overtimeNumber : ''}` });
      m.totalPossessionsPerQ = 8; // OT is shorter
    } else {
      m.quarter++;
      m.log.push({ type: 'quarter', text: `--- ${m.quarter}. leikhluti ---`, time: `L${m.quarter}` });
    }
  }

  simulateLivePossession(offense, defense, offStr, defStr, teamName, time, tactics, isPlayerTeam) {
    const diff = offStr - defStr;
    const baseChance = 0.45 + (diff / 200);
    const scorer = offense[Math.floor(Math.random() * offense.length)];
    const defender = defense[Math.floor(Math.random() * defense.length)];
    const assister = offense.filter(p => p.id !== scorer.id)[Math.floor(Math.random() * (offense.length - 1))];

    const result = { points: 0, scorerId: null, assisterId: null, rebounderId: null, stealerId: null, blockerId: null, event: null, fga: false, tpa: false, fta: false, fgm: false, tpm: false, ftm: false, foulOnDefender: false, fouledPlayerId: null, missedPlayerId: null };

    // Turnover chance
    if (Math.random() < 0.05) {
      const template = MATCH_EVENTS.turnover[Math.floor(Math.random() * MATCH_EVENTS.turnover.length)];
      result.event = { type: 'turnover', text: template.replace('{player}', scorer.name), time, team: teamName };
      return result;
    }

    // Steal chance
    if (Math.random() < 0.06 + (defender.spg || 0) / 100) {
      result.stealerId = defender.id;
      const template = MATCH_EVENTS.steal[Math.floor(Math.random() * MATCH_EVENTS.steal.length)];
      result.event = { type: 'steal', text: template.replace('{player}', defender.name), time, team: null };
      result.missedPlayerId = scorer.id;
      return result;
    }

    // Shot selection based on tactics
    let threeChance = 0.35;
    let ftChance = 0.15;

    if (tactics && isPlayerTeam) {
      if (tactics.focus === 'threepoint') threeChance = 0.45;
      if (tactics.focus === 'inside') threeChance = 0.20;
    }

    const shotType = Math.random();

    if (shotType < threeChance) {
      // 3-pointer
      result.fga = true; result.tpa = true;
      const hitChance = baseChance * (0.6 + (scorer.tp || 33) / 150);
      if (Math.random() < hitChance) {
        result.points = 3; result.scorerId = scorer.id; result.fgm = true; result.tpm = true;
        if (Math.random() < 0.4 && assister) result.assisterId = assister.id;
        const template = MATCH_EVENTS.score3[Math.floor(Math.random() * MATCH_EVENTS.score3.length)];
        let text = template.replace('{player}', scorer.name);
        if (result.assisterId && assister) {
          const aTemplate = MATCH_EVENTS.assist[Math.floor(Math.random() * MATCH_EVENTS.assist.length)];
          text = aTemplate.replace('{player}', assister.name).replace('{player2}', scorer.name) + ' ' + text;
        }
        result.event = { type: 'score3', text, time, team: teamName };
      } else {
        result.missedPlayerId = scorer.id;
        const rebounder = (Math.random() < 0.35 ? offense : defense)[Math.floor(Math.random() * 5)];
        if (rebounder) result.rebounderId = rebounder.id;
        const mTemplate = MATCH_EVENTS.miss[Math.floor(Math.random() * MATCH_EVENTS.miss.length)];
        result.event = { type: 'miss', text: mTemplate.replace('{player}', scorer.name), time, team: teamName };
      }
    } else if (shotType < threeChance + ftChance) {
      // Free throws (foul situation)
      result.fta = true;
      result.foulOnDefender = true;
      result.fouledPlayerId = defender.id;
      const ftPct = (scorer.ft || 70) / 100;
      const made = (Math.random() < ftPct ? 1 : 0) + (Math.random() < ftPct ? 1 : 0);
      result.points = made; result.scorerId = made > 0 ? scorer.id : null;
      result.ftm = made > 0;
      if (made > 0) {
        result.event = { type: 'ft', text: `${scorer.name} naer ${made} af 2 frjalsum skotum. Villa a ${defender.name}.`, time, team: teamName };
      } else {
        result.event = { type: 'ft', text: `${scorer.name} missir bad frjalsu skotin. Villa a ${defender.name}.`, time, team: teamName };
        result.missedPlayerId = scorer.id;
      }
    } else {
      // 2-pointer
      result.fga = true;
      const hitChance = baseChance * (0.7 + (scorer.fg || 45) / 200);

      // Block chance
      if (Math.random() < 0.04) {
        const blocker = defense[Math.floor(Math.random() * defense.length)];
        result.blockerId = blocker.id;
        result.missedPlayerId = scorer.id;
        const template = MATCH_EVENTS.block[Math.floor(Math.random() * MATCH_EVENTS.block.length)];
        result.event = { type: 'block', text: template.replace('{player}', blocker.name), time, team: null };
        return result;
      }

      if (Math.random() < hitChance) {
        result.points = 2; result.scorerId = scorer.id; result.fgm = true;
        if (Math.random() < 0.45 && assister) result.assisterId = assister.id;
        const template = MATCH_EVENTS.score2[Math.floor(Math.random() * MATCH_EVENTS.score2.length)];
        let text = template.replace('{player}', scorer.name);
        if (result.assisterId && assister) {
          const aTemplate = MATCH_EVENTS.assist[Math.floor(Math.random() * MATCH_EVENTS.assist.length)];
          text = aTemplate.replace('{player}', assister.name).replace('{player2}', scorer.name) + ' ' + text;
        }
        result.event = { type: 'score2', text, time, team: teamName };
      } else {
        result.missedPlayerId = scorer.id;
        const rebounder = (Math.random() < 0.40 ? offense : defense)[Math.floor(Math.random() * 5)];
        if (rebounder) result.rebounderId = rebounder.id;
        const mTemplate = MATCH_EVENTS.miss[Math.floor(Math.random() * MATCH_EVENTS.miss.length)];
        result.event = { type: 'miss', text: mTemplate.replace('{player}', scorer.name), time, team: teamName };
      }
    }

    return result;
  }

  liveMatchSubstitution(isHome, benchPlayerId, starterPlayerId) {
    const m = this.liveMatch;
    if (!m) return false;

    const players = isHome ? m.homePlayers : m.awayPlayers;
    const bench = isHome ? m.homeBench : m.awayBench;

    const starterIdx = players.findIndex(p => p.id === starterPlayerId);
    const benchIdx = bench.findIndex(p => p.id === benchPlayerId);

    if (starterIdx === -1 || benchIdx === -1) return false;

    const oldStarter = players[starterIdx];
    const newStarter = bench[benchIdx];

    players[starterIdx] = newStarter;
    bench[benchIdx] = oldStarter;

    m.log.push({
      type: 'substitution',
      text: `Skipti: ${newStarter.name} kemur inn fyrir ${oldStarter.name}`,
      time: ''
    });

    return true;
  }

  liveMatchTimeout(isHome) {
    const m = this.liveMatch;
    if (!m) return false;

    const key = isHome ? 'home' : 'away';
    if (m.timeoutsRemaining[key] <= 0) return false;

    m.timeoutsRemaining[key]--;
    const teamName = isHome ? m.homeName : m.awayName;
    m.log.push({
      type: 'timeout',
      text: `Timabeidni tekin af ${teamName}. (${m.timeoutsRemaining[key]} eftir)`,
      time: ''
    });
    m.isRunning = false;
    return true;
  }

  setLiveMatchTactics(tactics) {
    if (!this.liveMatch) return;
    Object.assign(this.liveMatch.tactics, tactics);
  }

  finalizeLiveMatch() {
    const m = this.liveMatch;
    if (!m) return null;

    // Set final minutes
    [...m.homePlayers, ...m.awayPlayers].forEach(p => {
      // min already tracked via possessions, round it
      if (m.allPlayerStats[p.id]) {
        m.allPlayerStats[p.id].min = Math.round(m.allPlayerStats[p.id].min);
      }
    });
    m.homeBench.forEach(p => {
      if (m.allPlayerStats[p.id]) {
        m.allPlayerStats[p.id].min = Math.round(m.allPlayerStats[p.id].min);
      }
    });
    m.awayBench.forEach(p => {
      if (m.allPlayerStats[p.id]) {
        m.allPlayerStats[p.id].min = Math.round(m.allPlayerStats[p.id].min);
      }
    });

    const result = {
      homeScore: m.homeScore,
      awayScore: m.awayScore,
      log: m.log,
      playerStats: m.allPlayerStats,
      home: m.homeId,
      away: m.awayId,
      quarterScores: m.quarterScores
    };

    this.liveMatch = null;
    return result;
  }

  getStarters(teamPlayers, teamId) {
    if (teamId === this.state.playerTeam && this.state.tactics.starterIds) {
      const starters = this.state.tactics.starterIds
        .map(id => this.state.players.find(p => p.id === id))
        .filter(p => p && !p.injured);
      if (starters.length >= 5) return starters.slice(0, 5);
    }
    const sorted = [...teamPlayers].sort((a, b) => b.ovr - a.ovr);
    return sorted.slice(0, Math.min(5, sorted.length));
  }

  teamStrength(starters) {
    if (starters.length === 0) return 50;
    const avg = starters.reduce((sum, p) => sum + p.ovr, 0) / starters.length;
    const energyFactor = starters.reduce((sum, p) => sum + p.energy, 0) / starters.length / 100;
    return avg * energyFactor;
  }

  simulatePossession(offense, defense, offStr, defStr, detailed, teamName, time) {
    const diff = offStr - defStr;
    const baseChance = 0.45 + (diff / 200);
    const scorer = offense[Math.floor(Math.random() * offense.length)];
    const defender = defense[Math.floor(Math.random() * defense.length)];
    const assister = offense.filter(p => p.id !== scorer.id)[Math.floor(Math.random() * (offense.length - 1))];

    const result = { points: 0, scorerId: null, assisterId: null, rebounderId: null, stealerId: null, blockerId: null, event: null, fga: false, tpa: false, fta: false, fgm: false, tpm: false, ftm: false };

    // Steal chance
    if (Math.random() < 0.06 + (defender.spg || 0) / 100) {
      result.stealerId = defender.id;
      if (detailed) {
        const template = MATCH_EVENTS.steal[Math.floor(Math.random() * MATCH_EVENTS.steal.length)];
        result.event = { type: 'steal', text: template.replace('{player}', defender.name), time, team: null };
      }
      return result;
    }

    // Shot selection based on tactics
    let threeChance = 0.35;
    let ftChance = 0.15;

    if (this.state.tactics && this.state.playerTeam === offense[0]?.team) {
      if (this.state.tactics.focus === 'threepoint') threeChance = 0.45;
      if (this.state.tactics.focus === 'inside') threeChance = 0.20;
    }

    const shotType = Math.random();

    if (shotType < threeChance) {
      // 3-pointer
      result.fga = true; result.tpa = true;
      const hitChance = baseChance * (0.6 + (scorer.tp || 33) / 150);
      if (Math.random() < hitChance) {
        result.points = 3; result.scorerId = scorer.id; result.fgm = true; result.tpm = true;
        if (Math.random() < 0.4 && assister) result.assisterId = assister.id;
        if (detailed) {
          const template = MATCH_EVENTS.score3[Math.floor(Math.random() * MATCH_EVENTS.score3.length)];
          let text = template.replace('{player}', scorer.name);
          if (result.assisterId && assister) {
            const aTemplate = MATCH_EVENTS.assist[Math.floor(Math.random() * MATCH_EVENTS.assist.length)];
            text = aTemplate.replace('{player}', assister.name).replace('{player2}', scorer.name) + ' ' + text;
          }
          result.event = { type: 'score3', text, time, team: teamName };
        }
      } else {
        // Miss + rebound
        const rebounder = (Math.random() < 0.35 ? offense : defense)[Math.floor(Math.random() * 5)];
        if (rebounder) result.rebounderId = rebounder.id;
        if (detailed) {
          const mTemplate = MATCH_EVENTS.miss[Math.floor(Math.random() * MATCH_EVENTS.miss.length)];
          result.event = { type: 'miss', text: mTemplate.replace('{player}', scorer.name), time, team: teamName };
        }
      }
    } else if (shotType < threeChance + ftChance) {
      // Free throws (foul situation)
      result.fta = true;
      const ftPct = (scorer.ft || 70) / 100;
      const made = (Math.random() < ftPct ? 1 : 0) + (Math.random() < ftPct ? 1 : 0);
      result.points = made; result.scorerId = made > 0 ? scorer.id : null;
      result.ftm = made > 0;
      if (detailed && made > 0) {
        result.event = { type: 'ft', text: `${scorer.name} nær ${made} af 2 frjálsum skotum.`, time, team: teamName };
      }
    } else {
      // 2-pointer
      result.fga = true;
      const hitChance = baseChance * (0.7 + (scorer.fg || 45) / 200);

      // Block chance
      if (Math.random() < 0.04) {
        const blocker = defense[Math.floor(Math.random() * defense.length)];
        result.blockerId = blocker.id;
        if (detailed) {
          const template = MATCH_EVENTS.block[Math.floor(Math.random() * MATCH_EVENTS.block.length)];
          result.event = { type: 'block', text: template.replace('{player}', blocker.name), time, team: null };
        }
        return result;
      }

      if (Math.random() < hitChance) {
        result.points = 2; result.scorerId = scorer.id; result.fgm = true;
        if (Math.random() < 0.45 && assister) result.assisterId = assister.id;
        if (detailed) {
          const template = MATCH_EVENTS.score2[Math.floor(Math.random() * MATCH_EVENTS.score2.length)];
          let text = template.replace('{player}', scorer.name);
          if (result.assisterId && assister) {
            const aTemplate = MATCH_EVENTS.assist[Math.floor(Math.random() * MATCH_EVENTS.assist.length)];
            text = aTemplate.replace('{player}', assister.name).replace('{player2}', scorer.name) + ' ' + text;
          }
          result.event = { type: 'score2', text, time, team: teamName };
        }
      } else {
        const rebounder = (Math.random() < 0.40 ? offense : defense)[Math.floor(Math.random() * 5)];
        if (rebounder) result.rebounderId = rebounder.id;
        if (detailed) {
          const mTemplate = MATCH_EVENTS.miss[Math.floor(Math.random() * MATCH_EVENTS.miss.length)];
          result.event = { type: 'miss', text: mTemplate.replace('{player}', scorer.name), time, team: teamName };
        }
      }
    }

    return result;
  }

  updatePossessionStats(playerStats, result) {
    if (result.scorerId != null && playerStats[result.scorerId]) {
      playerStats[result.scorerId].pts += result.points;
    }
    if (result.assisterId != null && playerStats[result.assisterId]) {
      playerStats[result.assisterId].ast += 1;
    }
    if (result.rebounderId != null && playerStats[result.rebounderId]) {
      playerStats[result.rebounderId].reb += 1;
    }
    if (result.stealerId != null && playerStats[result.stealerId]) {
      playerStats[result.stealerId].stl += 1;
    }
    if (result.blockerId != null && playerStats[result.blockerId]) {
      playerStats[result.blockerId].blk += 1;
    }
    if (result.fga && result.scorerId != null && playerStats[result.scorerId]) {
      playerStats[result.scorerId].fga += 1;
      if (result.fgm) playerStats[result.scorerId].fgm += 1;
    }
    if (result.tpa && result.scorerId != null && playerStats[result.scorerId]) {
      playerStats[result.scorerId].tpa += 1;
      if (result.tpm) playerStats[result.scorerId].tpm += 1;
    }
    if (result.fta && result.scorerId != null && playerStats[result.scorerId]) {
      playerStats[result.scorerId].fta += 2;
      if (result.ftm) playerStats[result.scorerId].ftm += result.points;
    }
  }

  advanceWeek(skipPlayerMatch = false) {
    if (this.state.phase === 'offseason') return this.handleOffseason();

    const week = this.state.currentWeek;
    if (week >= this.state.schedule.length) {
      if (this.state.phase === 'regular') {
        this.startPlayoffs();
        return;
      }
      return;
    }

    const matches = this.state.schedule[week];
    const weekResults = [];
    let playerMatchInfo = null;

    for (const match of matches) {
      const isPlayerMatch = match.home === this.state.playerTeam || match.away === this.state.playerTeam;

      if (isPlayerMatch && skipPlayerMatch) {
        // Store match info for live play, don't simulate yet
        playerMatchInfo = match;
        continue;
      }

      const result = this.simulateMatch(match.home, match.away, isPlayerMatch);

      // Update standings
      const homeTeam = this.state.teams.find(t => t.id === match.home);
      const awayTeam = this.state.teams.find(t => t.id === match.away);

      if (result.homeScore > result.awayScore) {
        homeTeam.wins++; awayTeam.losses++;
        homeTeam.streak = homeTeam.streak > 0 ? homeTeam.streak + 1 : 1;
        awayTeam.streak = awayTeam.streak < 0 ? awayTeam.streak - 1 : -1;
        homeTeam.form.push('W'); awayTeam.form.push('L');
      } else {
        awayTeam.wins++; homeTeam.losses++;
        awayTeam.streak = awayTeam.streak > 0 ? awayTeam.streak + 1 : 1;
        homeTeam.streak = homeTeam.streak < 0 ? homeTeam.streak - 1 : -1;
        awayTeam.form.push('W'); homeTeam.form.push('L');
      }
      homeTeam.form = homeTeam.form.slice(-5);
      awayTeam.form = awayTeam.form.slice(-5);

      homeTeam.pointsFor += result.homeScore;
      homeTeam.pointsAgainst += result.awayScore;
      awayTeam.pointsFor += result.awayScore;
      awayTeam.pointsAgainst += result.homeScore;

      // Update player season stats
      this.applyPlayerSeasonStats(result.playerStats);

      const matchResult = {
        week, ...match,
        homeScore: result.homeScore,
        awayScore: result.awayScore,
        log: isPlayerMatch ? result.log : [],
        playerStats: isPlayerMatch ? result.playerStats : {}
      };

      weekResults.push(matchResult);

      if (isPlayerMatch) {
        this.state.matchLog = matchResult;
      }
    }

    this.state.results.push(...weekResults);

    // Random events
    this.processWeeklyEvents();

    // Finances
    this.state.finances.budget += this.state.finances.weeklyIncome + this.state.finances.sponsorIncome / 4 - this.state.finances.weeklyCosts;

    // Ticket income for home games
    const homeGame = weekResults.find(r => r.home === this.state.playerTeam);
    if (homeGame) {
      const team = this.state.teams.find(t => t.id === this.state.playerTeam);
      const attendance = Math.floor(team.capacity * (0.5 + team.reputation / 200));
      const income = attendance * 2500;
      this.state.finances.budget += income;
      this.state.finances.ticketIncome += income;
    }

    this.state.currentWeek++;

    if (playerMatchInfo) {
      return { weekResults, playerMatchInfo };
    }
    return weekResults;
  }

  applyPlayerSeasonStats(playerStats) {
    for (const [pid, stats] of Object.entries(playerStats)) {
      const player = this.state.players.find(p => p.id === parseInt(pid));
      if (player && (stats.pts > 0 || stats.reb > 0 || stats.ast > 0 || stats.min > 0)) {
        player.seasonStats.gp++;
        player.seasonStats.pts += stats.pts;
        player.seasonStats.reb += stats.reb;
        player.seasonStats.ast += stats.ast;
        player.seasonStats.stl += stats.stl;
        player.seasonStats.blk += stats.blk;
        player.seasonStats.fgm += stats.fgm;
        player.seasonStats.fga += stats.fga;
        player.seasonStats.tpm += stats.tpm;
        player.seasonStats.tpa += stats.tpa;
        player.seasonStats.ftm += stats.ftm;
        player.seasonStats.fta += stats.fta;
        player.seasonStats.min += stats.min;
      }
    }
  }

  applyLiveMatchResult(matchResult, matchInfo) {
    // Apply standings and stats for a live match after completion
    const homeTeam = this.state.teams.find(t => t.id === matchInfo.home);
    const awayTeam = this.state.teams.find(t => t.id === matchInfo.away);

    if (matchResult.homeScore > matchResult.awayScore) {
      homeTeam.wins++; awayTeam.losses++;
      homeTeam.streak = homeTeam.streak > 0 ? homeTeam.streak + 1 : 1;
      awayTeam.streak = awayTeam.streak < 0 ? awayTeam.streak - 1 : -1;
      homeTeam.form.push('W'); awayTeam.form.push('L');
    } else {
      awayTeam.wins++; homeTeam.losses++;
      awayTeam.streak = awayTeam.streak > 0 ? awayTeam.streak + 1 : 1;
      homeTeam.streak = homeTeam.streak < 0 ? homeTeam.streak - 1 : -1;
      awayTeam.form.push('W'); homeTeam.form.push('L');
    }
    homeTeam.form = homeTeam.form.slice(-5);
    awayTeam.form = awayTeam.form.slice(-5);

    homeTeam.pointsFor += matchResult.homeScore;
    homeTeam.pointsAgainst += matchResult.awayScore;
    awayTeam.pointsFor += matchResult.awayScore;
    awayTeam.pointsAgainst += matchResult.homeScore;

    this.applyPlayerSeasonStats(matchResult.playerStats);

    const week = this.state.currentWeek - 1;
    const fullResult = {
      week, ...matchInfo,
      homeScore: matchResult.homeScore,
      awayScore: matchResult.awayScore,
      log: matchResult.log,
      playerStats: matchResult.playerStats
    };
    this.state.results.push(fullResult);
    this.state.matchLog = fullResult;

    // Ticket income for home games
    if (matchInfo.home === this.state.playerTeam) {
      const team = this.state.teams.find(t => t.id === this.state.playerTeam);
      const attendance = Math.floor(team.capacity * (0.5 + team.reputation / 200));
      const income = attendance * 2500;
      this.state.finances.budget += income;
      this.state.finances.ticketIncome += income;
    }
  }

  processWeeklyEvents() {
    // Random injuries
    this.state.players.forEach(p => {
      if (p.injured) {
        p.injuryWeeks--;
        if (p.injuryWeeks <= 0) {
          p.injured = false;
          p.injuryWeeks = 0;
          if (p.team === this.state.playerTeam) {
            this.state.news.push({ week: this.state.currentWeek, text: `${p.name} er kominn af meiðslalista! 🎉` });
          }
        }
      } else if (Math.random() < 0.02) {
        p.injured = true;
        p.injuryWeeks = 1 + Math.floor(Math.random() * 4);
        if (p.team === this.state.playerTeam) {
          this.state.news.push({ week: this.state.currentWeek, text: `${p.name} meiddist og verður frá í ${p.injuryWeeks} vikur! 🤕` });
        }
      }
    });

    // Energy recovery/fatigue
    this.state.players.forEach(p => {
      if (!p.injured) {
        p.energy = Math.min(100, p.energy + Math.floor(Math.random() * 8) - 2);
      }
    });

    // Morale changes based on results
    const playerTeam = this.state.teams.find(t => t.id === this.state.playerTeam);
    if (playerTeam) {
      const lastForm = playerTeam.form[playerTeam.form.length - 1];
      this.state.players.filter(p => p.team === this.state.playerTeam).forEach(p => {
        if (lastForm === 'W') p.morale = Math.min(100, p.morale + 3);
        else p.morale = Math.max(20, p.morale - 4);
      });
    }
  }

  startPlayoffs() {
    this.state.phase = 'playoffs';
    this.state.playoffRound = 1;

    const sorted = this.getStandings();
    const top8 = sorted.slice(0, 8);

    this.state.playoffSeries = [
      { home: top8[0].id, away: top8[7].id, homeWins: 0, awayWins: 0, games: [], round: 1 },
      { home: top8[1].id, away: top8[6].id, homeWins: 0, awayWins: 0, games: [], round: 1 },
      { home: top8[2].id, away: top8[5].id, homeWins: 0, awayWins: 0, games: [], round: 1 },
      { home: top8[3].id, away: top8[4].id, homeWins: 0, awayWins: 0, games: [], round: 1 }
    ];

    this.state.news.push({
      week: this.state.currentWeek,
      text: `Úrslitakeppni hefst! ${top8.map(t => t.name).join(', ')} komust áfram.`
    });
  }

  advancePlayoffs() {
    if (this.state.phase !== 'playoffs') return;

    const activeSeries = this.state.playoffSeries.filter(s =>
      s.round === this.state.playoffRound && s.homeWins < 3 && s.awayWins < 3
    );

    if (activeSeries.length === 0) {
      // Check if round is over
      const roundSeries = this.state.playoffSeries.filter(s => s.round === this.state.playoffRound);
      const winners = roundSeries.map(s => s.homeWins >= 3 ? s.home : s.away);

      if (winners.length === 1) {
        // Champion!
        const champion = this.state.teams.find(t => t.id === winners[0]);
        this.state.news.push({ week: this.state.currentWeek, text: `🏆 ${champion.name} eru meistarar Úrvalsdeild karla! 🏆` });
        this.state.phase = 'offseason';
        return;
      }

      // Next round
      this.state.playoffRound++;
      const newSeries = [];
      for (let i = 0; i < winners.length; i += 2) {
        if (i + 1 < winners.length) {
          newSeries.push({ home: winners[i], away: winners[i + 1], homeWins: 0, awayWins: 0, games: [], round: this.state.playoffRound });
        }
      }
      this.state.playoffSeries.push(...newSeries);
      return;
    }

    // Play one game in each active series
    for (const series of activeSeries) {
      const gameNum = series.homeWins + series.awayWins + 1;
      const homeTeam = gameNum % 2 === 1 ? series.home : series.away;
      const awayTeam = gameNum % 2 === 1 ? series.away : series.home;
      const isPlayerMatch = homeTeam === this.state.playerTeam || awayTeam === this.state.playerTeam;

      const result = this.simulateMatch(homeTeam, awayTeam, isPlayerMatch);

      if ((gameNum % 2 === 1 && result.homeScore > result.awayScore) || (gameNum % 2 === 0 && result.awayScore > result.homeScore)) {
        series.homeWins++;
      } else {
        series.awayWins++;
      }

      series.games.push({ homeTeam, awayTeam, homeScore: result.homeScore, awayScore: result.awayScore });

      if (isPlayerMatch) {
        this.state.matchLog = {
          home: homeTeam, away: awayTeam,
          homeScore: result.homeScore, awayScore: result.awayScore,
          log: result.log, playerStats: result.playerStats,
          week: this.state.currentWeek, playoff: true
        };
      }

      if (series.homeWins >= 3 || series.awayWins >= 3) {
        const winnerId = series.homeWins >= 3 ? series.home : series.away;
        const winner = this.state.teams.find(t => t.id === winnerId);
        const roundName = this.state.playoffRound === 1 ? 'Fjórðungsúrslit' : this.state.playoffRound === 2 ? 'Undanúrslit' : 'Úrslit';
        this.state.news.push({
          week: this.state.currentWeek,
          text: `${roundName}: ${winner.name} vinnur seríuna ${series.homeWins}-${series.awayWins}!`
        });
      }
    }

    this.state.currentWeek++;
    this.processWeeklyEvents();
  }

  getStandings() {
    return [...this.state.teams].sort((a, b) => {
      const ptsA = a.wins * 2;
      const ptsB = b.wins * 2;
      if (ptsB !== ptsA) return ptsB - ptsA;
      return (b.pointsFor - b.pointsAgainst) - (a.pointsFor - a.pointsAgainst);
    });
  }

  handleOffseason() {
    this.state.news.push({ week: this.state.currentWeek, text: "Tímabilinu lokið. Nýtt tímabil hefst fljótlega!" });
  }

  // Transfer market
  generateTransferMarket() {
    this.state.transferMarket = [];
    const availablePlayers = this.state.players.filter(p =>
      p.team !== this.state.playerTeam && p.ovr >= 55 && !p.injured
    );
    const shuffled = availablePlayers.sort(() => Math.random() - 0.5);
    for (let i = 0; i < Math.min(12, shuffled.length); i++) {
      const p = shuffled[i];
      const price = (p.ovr * p.ovr * 500) + (p.foreign ? 5000000 : 1000000);
      this.state.transferMarket.push({ playerId: p.id, price: Math.floor(price) });
    }
  }

  buyPlayer(playerId) {
    const listing = this.state.transferMarket.find(l => l.playerId === playerId);
    if (!listing) return { success: false, message: "Leikmaður ekki á markaði." };
    if (this.state.finances.budget < listing.price) return { success: false, message: "Ekki nóg fjármagn!" };

    const player = this.state.players.find(p => p.id === playerId);
    if (!player) return { success: false, message: "Leikmaður finnst ekki." };

    const oldTeam = player.team;
    player.team = this.state.playerTeam;
    this.state.finances.budget -= listing.price;
    this.state.finances.transfers.push({ player: player.name, type: 'buy', amount: listing.price });
    this.state.transferMarket = this.state.transferMarket.filter(l => l.playerId !== playerId);
    this.state.finances.weeklyCosts = this.calculateWeeklyCosts();

    this.state.news.push({
      week: this.state.currentWeek,
      text: `${player.name} hefur gengið til liðs við ${this.state.teams.find(t => t.id === this.state.playerTeam).name}! 🤝`
    });

    return { success: true, message: `${player.name} keyptur fyrir ${(listing.price / 1000000).toFixed(1)}M ISK!` };
  }

  sellPlayer(playerId) {
    const player = this.state.players.find(p => p.id === playerId && p.team === this.state.playerTeam);
    if (!player) return { success: false, message: "Getur ekki selt þennan leikmann." };

    const price = Math.floor((player.ovr * player.ovr * 300) + (player.foreign ? 3000000 : 500000));
    const buyerTeam = this.state.teams.filter(t => t.id !== this.state.playerTeam)[Math.floor(Math.random() * (this.state.teams.length - 1))];

    player.team = buyerTeam.id;
    this.state.finances.budget += price;
    this.state.finances.transfers.push({ player: player.name, type: 'sell', amount: price });
    this.state.finances.weeklyCosts = this.calculateWeeklyCosts();

    this.state.news.push({
      week: this.state.currentWeek,
      text: `${player.name} seldur til ${buyerTeam.name} fyrir ${(price / 1000000).toFixed(1)}M ISK.`
    });

    return { success: true, message: `${player.name} seldur til ${buyerTeam.name} fyrir ${(price / 1000000).toFixed(1)}M ISK!` };
  }

  generateFreeAgents() {
    const agents = [];
    for (let i = 0; i < 15; i++) {
      const foreign = Math.random() < 0.6;
      const firstName = foreign
        ? FOREIGN_FIRST_NAMES[Math.floor(Math.random() * FOREIGN_FIRST_NAMES.length)]
        : IS_FIRST_NAMES[Math.floor(Math.random() * IS_FIRST_NAMES.length)];
      const lastName = foreign
        ? FOREIGN_LAST_NAMES[Math.floor(Math.random() * FOREIGN_LAST_NAMES.length)]
        : IS_LAST_NAMES[Math.floor(Math.random() * IS_LAST_NAMES.length)];
      const positions = ['PG', 'SG', 'SF', 'PF', 'C'];
      const ovr = 45 + Math.floor(Math.random() * 30);

      agents.push({
        id: 1000 + i,
        name: `${firstName} ${lastName}`,
        team: null,
        pos: positions[Math.floor(Math.random() * positions.length)],
        age: 20 + Math.floor(Math.random() * 15),
        nationality: foreign ? 'US' : 'IS',
        ovr,
        ppg: ovr * 0.2 + Math.random() * 5,
        rpg: 2 + Math.random() * 6,
        apg: 1 + Math.random() * 5,
        spg: 0.5 + Math.random() * 1.5,
        fg: 35 + Math.random() * 25,
        tp: 25 + Math.random() * 20,
        ft: 60 + Math.random() * 30,
        minutes: 15 + Math.random() * 20,
        foreign,
        salary: estimateSalary(ovr, foreign),
        energy: 90,
        morale: 75,
        injured: false,
        injuryWeeks: 0,
        potential: Math.min(99, ovr + Math.floor(Math.random() * 15)),
        contract: 0,
        gamesPlayed: 0,
        seasonStats: { gp: 0, pts: 0, reb: 0, ast: 0, stl: 0, blk: 0, fgm: 0, fga: 0, tpm: 0, tpa: 0, ftm: 0, fta: 0, min: 0 }
      });
    }
    return agents;
  }

  signFreeAgent(agentId) {
    const agent = this.state.freeAgents.find(a => a.id === agentId);
    if (!agent) return { success: false, message: "Leikmaður ekki tiltækur." };

    const signingFee = agent.ovr * 50000;
    if (this.state.finances.budget < signingFee) return { success: false, message: "Ekki nóg fjármagn!" };

    agent.team = this.state.playerTeam;
    agent.contract = 1 + Math.floor(Math.random() * 2);
    this.state.players.push(agent);
    this.state.freeAgents = this.state.freeAgents.filter(a => a.id !== agentId);
    this.state.finances.budget -= signingFee;
    this.state.finances.weeklyCosts = this.calculateWeeklyCosts();

    this.state.news.push({
      week: this.state.currentWeek,
      text: `${agent.name} samdi við ${this.state.teams.find(t => t.id === this.state.playerTeam).name}!`
    });

    return { success: true, message: `${agent.name} skrifaði undir!` };
  }

  setTactics(tactics) {
    Object.assign(this.state.tactics, tactics);
  }

  setStarters(ids) {
    this.state.tactics.starterIds = ids;
  }

  getPlayerTeamRoster() {
    return this.state.players.filter(p => p.team === this.state.playerTeam);
  }

  getTopScorers(n = 10) {
    return [...this.state.players]
      .filter(p => p.seasonStats.gp > 0)
      .map(p => ({ ...p, avgPts: p.seasonStats.pts / p.seasonStats.gp }))
      .sort((a, b) => b.avgPts - a.avgPts)
      .slice(0, n);
  }

  saveGame() {
    localStorage.setItem('korfuboltastjori_save', JSON.stringify(this.state));
  }

  loadGame() {
    const saved = localStorage.getItem('korfuboltastjori_save');
    if (saved) {
      this.state = JSON.parse(saved);
      return true;
    }
    return false;
  }

  deleteSave() {
    localStorage.removeItem('korfuboltastjori_save');
  }
}

// GameEngine is a global class
