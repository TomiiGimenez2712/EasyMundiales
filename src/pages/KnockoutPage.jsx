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

    // Función para inyectar partidos en la mitad izquierda o derecha (mitad y mitad)
    const inject = (sourceArr, leftArr, rightArr) => {
      sourceArr.forEach((match, index) => {
        if (index < leftArr.length) {
          leftArr[index] = { ...match, side: 'left' };
        } else if (index - leftArr.length < rightArr.length) {
          rightArr[index - leftArr.length] = { ...match, side: 'right' };
        }
      });
    };

    // Inyectar 16avos (Round of 32) y Octavos (Round of 16)
    inject(r32, leftBracket.round16, rightBracket.round16);
    inject(r16, leftBracket.round8, rightBracket.round8);

    // Inyectar Cuartos alineados correctamente al árbol visual
    if (rqf.length > 0) leftBracket.round4[0] = { ...rqf[0], side: 'left' };
    if (rqf.length > 1) rightBracket.round4[0] = { ...rqf[1], side: 'right' };
    if (rqf.length > 2) leftBracket.round4[1] = { ...rqf[2], side: 'left' };
    if (rqf.length > 3) rightBracket.round4[1] = { ...rqf[3], side: 'right' };

    // Inyectar Semis alineadas correctamente al árbol visual
    if (rsf.length > 0) leftBracket.round2[0] = { ...rsf[0], side: 'left' };
    if (rsf.length > 1) rightBracket.round2[0] = { ...rsf[1], side: 'right' };

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
