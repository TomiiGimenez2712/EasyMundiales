import { useState, useEffect } from 'react';
import GroupTable from '../components/GroupTable';
import { fetchStandings } from '../services/api';
import './Pages.css';

export default function GroupsPage() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStandings = async () => {
      try {
        const data = await fetchStandings();
        if (data && data.length > 0) {
          setGroups(data);
          setError(null);
        } else {
          // If no data yet (e.g. tournament hasn't started and API is empty), keep it loading or show error
          if (groups.length === 0) setError("Los grupos aún no están disponibles.");
        }
      } catch (err) {
        console.error("Failed to load standings", err);
        if (groups.length === 0) setError("Error al cargar los grupos.");
      } finally {
        setLoading(false);
      }
    };

    loadStandings();

    // Auto-refresh every 2 minutes
    const interval = setInterval(loadStandings, 120000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page-container animate-fade-in">
      <header className="page-header">
        <div className="header-title-container">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Mundial Logo" className="header-logo" />
          <h1>Grupos</h1>
        </div>
        <p className="subtitle">Fase de Grupos (A-L)</p>
      </header>
      
      <div className="groups-list">
        {loading ? (
          <div className="loading-spinner">Cargando grupos...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          groups.map((group) => (
            <GroupTable key={group.name} groupName={group.name} teams={group.teams} />
          ))
        )}
      </div>
    </div>
  );
}
