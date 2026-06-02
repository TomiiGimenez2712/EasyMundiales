import { useEffect, useState } from 'react';
import { fetchMatches } from '../services/api';
import MatchCard from '../components/MatchCard';
import './Pages.css';

export default function MatchesPage() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadMatches = async () => {
      const data = await fetchMatches();
      if (isMounted) {
        setMatches(data);
        setLoading(false);
      }
    };

    loadMatches();
    // Poll every 60 seconds
    const intervalId = setInterval(loadMatches, 60000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="page-container animate-fade-in">
      <header className="page-header">
        <div className="header-title-container">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Mundial Logo" className="header-logo" />
          <h1>Partidos</h1>
        </div>
      </header>
      <div className="matches-list">
        {loading ? (
          <div className="loading-state">Cargando partidos...</div>
        ) : matches.length === 0 ? (
          <div className="empty-state">
            No hay partidos programados en este momento.
          </div>
        ) : (
          matches.map(match => (
            <MatchCard key={match.id} match={match} />
          ))
        )}
      </div>
    </div>
  );
}
