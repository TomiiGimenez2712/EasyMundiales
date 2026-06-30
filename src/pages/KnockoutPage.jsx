import KnockoutBracket from '../components/KnockoutBracket';
import { useTournament } from '../context/TournamentContext';
import './Pages.css';

const generateMatches = (count, side) => {
  const matches = [];
  for (let i = 0; i < count; i++) {
    matches.push({
      status: 'pre',
      team1: { name: 'Por definir', abbreviation: 'TBD', score: '' },
      team2: { name: 'Por definir', abbreviation: 'TBD', score: '' },
      side: side
    });
  }
  return matches;
};

// Generamos las mitades del bracket (fallback vacío)
const initialLeftBracket = {
  round16: generateMatches(8, 'left'),
  round8: generateMatches(4, 'left'),
  round4: generateMatches(2, 'left'),
  round2: generateMatches(1, 'left'),
};

const initialRightBracket = {
  round16: generateMatches(8, 'right'),
  round8: generateMatches(4, 'right'),
  round4: generateMatches(2, 'right'),
  round2: generateMatches(1, 'right'),
};

const initialFinalMatch = {
  status: 'pre',
  team1: { name: 'Finalista 1', abbreviation: 'TBD', score: '' },
  team2: { name: 'Finalista 2', abbreviation: 'TBD', score: '' },
  side: 'center'
};

export default function KnockoutPage() {
  const { matches, loading } = useTournament();

  // Clonar estados iniciales para rellenarlos
  const leftBracket = JSON.parse(JSON.stringify(initialLeftBracket));
  const rightBracket = JSON.parse(JSON.stringify(initialRightBracket));
  let finalMatch = JSON.parse(JSON.stringify(initialFinalMatch));

  // Filtrar solo partidos de fase eliminatoria usando los stages del API
  const koStages = ['round-of-32', 'round-of-16', 'quarterfinals', 'semifinals', 'final'];
  const koMatches = matches.filter(m => koStages.includes(m.stage));

  if (koMatches.length > 0) {
    // Separar por rondas
    const r32 = koMatches.filter(m => m.stage === 'round-of-32');
    const r16 = koMatches.filter(m => m.stage === 'round-of-16');
    const rqf = koMatches.filter(m => m.stage === 'quarterfinals');
    const rsf = koMatches.filter(m => m.stage === 'semifinals');
    const rf = koMatches.filter(m => m.stage === 'final');

    // Función para mapear los partidos usando un arreglo de índices específicos
    const mapMatches = (sourceArr, targetArr, indices, side) => {
      indices.forEach((sourceIdx, targetIdx) => {
        if (sourceArr[sourceIdx]) {
          targetArr[targetIdx] = { ...sourceArr[sourceIdx], side };
        }
      });
    };

    // Inyectar 16avos (Round of 32)
    mapMatches(r32, leftBracket.round16, [0, 3, 2, 4, 10, 11, 8, 9], 'left');
    mapMatches(r32, rightBracket.round16, [1, 5, 6, 7, 13, 15, 12, 14], 'right');

    // Inyectar Octavos (Round of 16)
    mapMatches(r16, leftBracket.round8, [0, 1, 4, 5], 'left');
    mapMatches(r16, rightBracket.round8, [2, 3, 6, 7], 'right');

    // Inyectar Cuartos (Quarterfinals)
    mapMatches(rqf, leftBracket.round4, [0, 1], 'left');
    mapMatches(rqf, rightBracket.round4, [2, 3], 'right');

    // Inyectar Semis (Semifinals)
    mapMatches(rsf, leftBracket.round2, [0], 'left');
    mapMatches(rsf, rightBracket.round2, [1], 'right');

    if (rf.length > 0) {
      finalMatch = { ...rf[0], side: 'center' };
    }
  }

  return (
    <div className="page-container animate-fade-in" style={{ maxWidth: '100%' }}>
      <header className="page-header">
        <div className="header-title-container">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Mundial Logo" className="header-logo" />
          <h1>Eliminatorias</h1>
        </div>
        <p className="subtitle">Formato Árbol (Desliza horizontalmente)</p>
      </header>
      <div className="knockout-content">
        {loading && koMatches.length === 0 ? (
          <div className="loading-spinner">Cargando eliminatorias...</div>
        ) : (
          <KnockoutBracket left={leftBracket} right={rightBracket} final={finalMatch} />
        )}
      </div>
    </div>
  );
}
