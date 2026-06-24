import { useTournament } from '../context/TournamentContext';
import GroupTable from '../components/GroupTable';
import './Pages.css';

export default function GroupsPage() {
  const { standings, loading, error } = useTournament();

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
        ) : error && standings.length === 0 ? (
          <div className="error-message">{error}</div>
        ) : (
          standings.map((group) => (
            <GroupTable key={group.name} groupName={group.name} teams={group.teams} />
          ))
        )}
      </div>
    </div>
  );
}
