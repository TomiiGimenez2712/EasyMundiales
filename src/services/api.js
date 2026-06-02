const API_URL = 'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=20260611-20260719';

/**
 * Fetch matches from ESPN API
 */
export const fetchMatches = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Error fetching data');
    const data = await response.json();
    return formatMatches(data.events || []);
  } catch (error) {
    console.error('Failed to fetch matches:', error);
    return [];
  }
};

/**
 * Fetch standings from ESPN API
 * Returns an array of groups with their respective teams and stats.
 */
export const fetchStandings = async () => {
  try {
    const response = await fetch('https://site.api.espn.com/apis/v2/sports/soccer/fifa.world/standings');
    const data = await response.json();
    
    // ESPN API format: children[] contains groups, inside each children[i].standings.entries is the teams
    if (data.children && data.children.length > 0) {
      return data.children.map(group => {
        // Parse group name (e.g. "Group A" -> "A")
        const groupName = group.abbreviation.replace('Group ', '');
        
        const teams = group.standings?.entries?.map(entry => {
          const team = entry.team;
          const stats = entry.stats;
          
          // Helper to find a stat by its abbreviation
          const getStat = (abbr) => {
            const stat = stats.find(s => s.abbreviation === abbr);
            return stat ? stat.value : 0;
          };

          return {
            id: team.id,
            name: team.displayName,
            abbreviation: team.abbreviation,
            logo: team.logos && team.logos.length > 0 ? team.logos[0].href : '',
            points: getStat('P'),
            played: getStat('GP'),
            won: getStat('W'),
            drawn: getStat('D'),
            lost: getStat('L'),
            goalsFor: getStat('F'),
            goalsAgainst: getStat('A'),
            goalDifference: getStat('GD'),
            // Advanced stat if needed for highlighting qualified teams (rank 1 and 2 usually advance)
            rank: getStat('R')
          };
        });

        // Sort teams by rank or points just in case
        teams.sort((a, b) => a.rank - b.rank);

        return {
          name: groupName,
          teams: teams || []
        };
      });
    }
    return [];
  } catch (error) {
    console.error('Error fetching standings:', error);
    return [];
  }
};

/**
 * Maps ESPN data structure to our app's structure
 */
const formatMatches = (events) => {
  return events.map(event => {
    const competition = event.competitions[0];
    const competitors = competition.competitors;
    
    // ESPN lists home/away. We map them to team1/team2.
    const team1 = competitors.find(c => c.homeAway === 'home') || competitors[0];
    const team2 = competitors.find(c => c.homeAway === 'away') || competitors[1];

    const note = competition.notes && competition.notes.length > 0 ? competition.notes[0].headline : '';

    return {
      id: event.id,
      date: event.date, // UTC ISO string
      name: event.name,
      shortName: event.shortName,
      status: event.status.type.state, // 'pre', 'in', 'post'
      timeInfo: event.status.type.shortDetail,
      note: note,
      team1: {
        id: team1.id,
        name: team1.team.displayName || team1.team.name,
        abbreviation: team1.team.abbreviation,
        logo: team1.team.logos?.[0]?.href || team1.team.logo,
        score: team1.score,
        winner: team1.winner
      },
      team2: {
        id: team2.id,
        name: team2.team.displayName || team2.team.name,
        abbreviation: team2.team.abbreviation,
        logo: team2.team.logos?.[0]?.href || team2.team.logo,
        score: team2.score,
        winner: team2.winner
      },
      stage: event.season?.slug || 'group-stage'
    };
  });
};
