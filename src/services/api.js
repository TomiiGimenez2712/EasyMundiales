const API_URL = 'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=20260611-20260719&limit=150';

const countryTranslations = {
  'USA': 'Estados Unidos',
  'United States': 'Estados Unidos',
  'United States of America': 'Estados Unidos',
  'Mexico': 'México',
  'Canada': 'Canadá',
  'Argentina': 'Argentina',
  'Brazil': 'Brasil',
  'France': 'Francia',
  'England': 'Inglaterra',
  'Belgium': 'Bélgica',
  'Portugal': 'Portugal',
  'Netherlands': 'Países Bajos',
  'Spain': 'España',
  'Italy': 'Italia',
  'Croatia': 'Croacia',
  'Germany': 'Alemania',
  'Morocco': 'Marruecos',
  'Switzerland': 'Suiza',
  'Colombia': 'Colombia',
  'Uruguay': 'Uruguay',
  'Japan': 'Japón',
  'Senegal': 'Senegal',
  'Iran': 'Irán',
  'Denmark': 'Dinamarca',
  'South Korea': 'Corea del Sur',
  'Korea Republic': 'Corea del Sur',
  'Korea, Republic of': 'Corea del Sur',
  'Australia': 'Australia',
  'Ukraine': 'Ucrania',
  'Austria': 'Austria',
  'Sweden': 'Suecia',
  'Hungary': 'Hungría',
  'Wales': 'Gales',
  'Poland': 'Polonia',
  'Ecuador': 'Ecuador',
  'Peru': 'Perú',
  'Chile': 'Chile',
  'Venezuela': 'Venezuela',
  'Turkey': 'Turquía',
  'Tunisia': 'Túnez',
  'Algeria': 'Argelia',
  'Egypt': 'Egipto',
  'Nigeria': 'Nigeria',
  'Cameroon': 'Camerún',
  'Ghana': 'Ghana',
  'Mali': 'Malí',
  'Ivory Coast': 'Costa de Marfil',
  "Côte d'Ivoire": 'Costa de Marfil',
  'Saudi Arabia': 'Arabia Saudita',
  'Iraq': 'Irak',
  'Qatar': 'Catar',
  'United Arab Emirates': 'Emiratos Árabes Unidos',
  'Panama': 'Panamá',
  'Costa Rica': 'Costa Rica',
  'Jamaica': 'Jamaica',
  'Honduras': 'Honduras',
  'El Salvador': 'El Salvador',
  'New Zealand': 'Nueva Zelanda',
  'South Africa': 'Sudáfrica',
  'Paraguay': 'Paraguay',
  'Bolivia': 'Bolivia',
  'Scotland': 'Escocia',
  'Czechia': 'Chequia',
  'Czech Republic': 'República Checa',
  'Slovakia': 'Eslovaquia',
  'Romania': 'Rumania',
  'Slovenia': 'Eslovenia',
  'Georgia': 'Georgia',
  'Albania': 'Albania',
  'Serbia': 'Serbia',
  'Norway': 'Noruega',
  'Greece': 'Grecia',
  'Ireland': 'Irlanda',
  'Republic of Ireland': 'Irlanda',
  'Finland': 'Finlandia',
  'Iceland': 'Islandia',
  'Northern Ireland': 'Irlanda del Norte',
  'China': 'China',
  'Uzbekistan': 'Uzbekistán',
  'Oman': 'Omán',
  'Jordan': 'Jordania',
  'Bahrain': 'Baréin',
  'Syria': 'Siria',
  'Palestine': 'Palestina',
  'Kyrgyzstan': 'Kirguistán',
  'Tajikistan': 'Tayikistán',
  'Thailand': 'Tailandia',
  'Vietnam': 'Vietnam',
  'North Korea': 'Corea del Norte',
  "Democratic People's Republic of Korea": 'Corea del Norte',
  'India': 'India',
  'Lebanon': 'Líbano',
  'Cape Verde': 'Cabo Verde',
  'Angola': 'Angola',
  'DR Congo': 'RD Congo',
  'Congo DR': 'RD Congo',
  'Democratic Republic of the Congo': 'RD Congo',
  'Guinea': 'Guinea',
  'Equatorial Guinea': 'Guinea Ecuatorial',
  'Zambia': 'Zambia',
  'Gabon': 'Gabón',
  'Uganda': 'Uganda',
  'Benin': 'Benín',
  'Mauritania': 'Mauritania',
  'Madagascar': 'Madagascar',
  'Kenya': 'Kenia',
  'Zimbabwe': 'Zimbabue',
  'Namibia': 'Namibia',
  'Libya': 'Libia',
  'Sudan': 'Sudán',
  'Togo': 'Togo',
  'Sierra Leone': 'Sierra Leona',
  'Congo': 'Congo',
  'Central African Republic': 'República Centroafricana',
  'Rwanda': 'Ruanda',
  'Burundi': 'Burundi',
  'Niger': 'Níger',
  'Ethiopia': 'Etiopía',
  'Eritrea': 'Eritrea',
  'Somalia': 'Somalia',
  'Djibouti': 'Yibuti',
  'Tanzania': 'Tanzania',
  'Malawi': 'Malaui',
  'Mozambique': 'Mozambique',
  'Botswana': 'Botsuana',
  'Lesotho': 'Lesoto',
  'Eswatini': 'Esuatini',
  'Mauritius': 'Mauricio',
  'Seychelles': 'Seychelles',
  'Comoros': 'Comoras',
  'Haiti': 'Haití',
  'Trinidad and Tobago': 'Trinidad y Tobago',
  'Guatemala': 'Guatemala',
  'Curacao': 'Curazao',
  'Suriname': 'Surinam',
  'Guyana': 'Guyana',
  'French Guiana': 'Guayana Francesa',
  'Martinique': 'Martinica',
  'Guadeloupe': 'Guadalupe',
  'Cuba': 'Cuba',
  'Dominican Republic': 'República Dominicana',
  'Bermuda': 'Bermudas',
  'Antigua and Barbuda': 'Antigua y Barbuda',
  'St. Kitts and Nevis': 'San Cristóbal y Nieves',
  'Dominica': 'Dominica',
  'St. Lucia': 'Santa Lucía',
  'St. Vincent / Grenadines': 'San Vicente y las Granadinas',
  'St. Vincent and the Grenadines': 'San Vicente y las Granadinas',
  'Grenada': 'Granada',
  'Barbados': 'Barbados',
  'Montserrat': 'Montserrat',
  'Anguilla': 'Anguila',
  'British Virgin Islands': 'Islas Vírgenes Británicas',
  'US Virgin Islands': 'Islas Vírgenes de EE. UU.',
  'Cayman Islands': 'Islas Caimán',
  'Turks and Caicos': 'Islas Turcas y Caicos',
  'Turks and Caicos Islands': 'Islas Turcas y Caicos',
  'Aruba': 'Aruba',
  'Sint Maarten': 'Sint Maarten',
  'Saint Martin': 'San Martín',
  'Bonaire': 'Bonaire',
  'Bahamas': 'Bahamas',
  'Belize': 'Belice',
  'Nicaragua': 'Nicaragua',
  'Solomon Islands': 'Islas Salomón',
  'New Caledonia': 'Nueva Caledonia',
  'Tahiti': 'Tahití',
  'Fiji': 'Fiyi',
  'Vanuatu': 'Vanuatu',
  'Papua New Guinea': 'Papúa Nueva Guinea',
  'Samoa': 'Samoa',
  'American Samoa': 'Samoa Americana',
  'Tonga': 'Tonga',
  'Cook Islands': 'Islas Cook'
};

export const translateCountry = (name) => {
  if (!name) return name;
  const trimmedName = name.trim();
  return countryTranslations[trimmedName] || trimmedName;
};


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
            name: translateCountry(team.displayName),
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
        name: translateCountry(team1.team.displayName || team1.team.name),
        abbreviation: team1.team.abbreviation,
        logo: team1.team.logos?.[0]?.href || team1.team.logo,
        score: team1.score,
        winner: team1.winner
      },
      team2: {
        id: team2.id,
        name: translateCountry(team2.team.displayName || team2.team.name),
        abbreviation: team2.team.abbreviation,
        logo: team2.team.logos?.[0]?.href || team2.team.logo,
        score: team2.score,
        winner: team2.winner
      },
      stage: event.season?.slug || 'group-stage'
    };
  });
};
