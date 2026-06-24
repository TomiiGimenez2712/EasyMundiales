import { createContext, useContext, useState, useEffect } from 'react';
import { fetchMatches, fetchStandings } from '../services/api';

const TournamentContext = createContext();

export function TournamentProvider({ children }) {
  const [matches, setMatches] = useState([]);
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async (showLoading = false) => {
    if (showLoading) setLoading(true);
    try {
      const [matchesData, standingsData] = await Promise.all([
        fetchMatches(),
        fetchStandings()
      ]);
      setMatches(matchesData);
      setStandings(standingsData);
      setError(null);
    } catch (err) {
      console.error('Error loading tournament data:', err);
      setError('Error al cargar los datos del torneo.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(true);

    // Auto-refresh every 60 seconds
    const interval = setInterval(() => loadData(false), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <TournamentContext.Provider value={{ matches, standings, loading, error, refresh: () => loadData(false) }}>
      {children}
    </TournamentContext.Provider>
  );
}

export function useTournament() {
  return useContext(TournamentContext);
}
