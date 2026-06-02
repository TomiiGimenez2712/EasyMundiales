import { useState, useEffect } from 'react';
import KnockoutBracket from '../components/KnockoutBracket';
import { fetchMatches } from '../services/api';
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
  const [leftBracket, setLeftBracket] = useState(initialLeftBracket);
  const [rightBracket, setRightBracket] = useState(initialRightBracket);
  const [finalMatch, setFinalMatch] = useState(initialFinalMatch);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadKnockouts = async () => {
      try {
        const matches = await fetchMatches();
        if (!matches || matches.length === 0) return;

        // Filtrar solo partidos de fase eliminatoria (basado en nombre o nota de ESPN)
        // ESPN suele usar "Round of 32", "Round of 16", "Quarterfinal", "Semifinal", "Final"
        const koMatches = matches.filter(m => {
          const text = (m.name + ' ' + (m.note || '') + ' ' + (m.stage || '')).toLowerCase();
          return text.includes('round of 32') || text.includes('round of 16') || text.includes('quarterfinal') || text.includes('semifinal') || text.includes('final') || text.includes('knockout');
        });

        if (koMatches.length === 0) return; // Si no hay (torneo temprano), se queda en TBD.

        // Clonar estados iniciales para rellenarlos
        const newLeft = JSON.parse(JSON.stringify(initialLeftBracket));
        const newRight = JSON.parse(JSON.stringify(initialRightBracket));
        let newFinal = JSON.parse(JSON.stringify(initialFinalMatch));

        // Separar por rondas
        const r32 = koMatches.filter(m => m.name.toLowerCase().includes('32') || m.note?.toLowerCase().includes('32'));
        const r16 = koMatches.filter(m => m.name.toLowerCase().includes('16') || m.note?.toLowerCase().includes('16'));
        const rqf = koMatches.filter(m => m.name.toLowerCase().includes('quarter') || m.note?.toLowerCase().includes('quarter'));
        const rsf = koMatches.filter(m => m.name.toLowerCase().includes('semi') || m.note?.toLowerCase().includes('semi'));
        const rf = koMatches.filter(m => m.name.toLowerCase() === 'final' || m.note?.toLowerCase() === 'final');

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

        inject(r32, newLeft.round16, newRight.round16); // 16avos (Round of 32)
        inject(r16, newLeft.round8, newRight.round8);   // Octavos (Round of 16)
        inject(rqf, newLeft.round4, newRight.round4);   // Cuartos
        inject(rsf, newLeft.round2, newRight.round2);   // Semis

        if (rf.length > 0) {
          newFinal = { ...rf[0], side: 'center' };
        }

        setLeftBracket(newLeft);
        setRightBracket(newRight);
        setFinalMatch(newFinal);
      } catch (error) {
        console.error("Error cargando eliminatorias:", error);
      } finally {
        setLoading(false);
      }
    };

    loadKnockouts();
    const interval = setInterval(loadKnockouts, 120000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page-container animate-fade-in" style={{ maxWidth: '100%' }}>
      <header className="page-header">
        <div className="header-title-container">
          <img src="/logo.png" alt="Mundial Logo" className="header-logo" />
          <h1>Eliminatorias</h1>
        </div>
        <p className="subtitle">Formato Árbol (Desliza horizontalmente)</p>
      </header>
      <div className="knockout-content">
        <KnockoutBracket left={leftBracket} right={rightBracket} final={finalMatch} />
      </div>
    </div>
  );
}
