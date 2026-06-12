import { useState, useEffect } from 'react';
import { fetchStandings } from '../services/api';
import { Info, HelpCircle } from 'lucide-react';
import './Pages.css';
import './ThirdPlacesPage.css';

export default function ThirdPlacesPage() {
  const [thirds, setThirds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadThirds = async () => {
      try {
        const standings = await fetchStandings();
        if (standings && standings.length > 0) {
          // Extraer el tercer equipo de cada grupo (índice 2)
          const extractedThirds = standings
            .map(group => {
              if (group.teams && group.teams.length >= 3) {
                return {
                  ...group.teams[2],
                  groupName: group.name
                };
              }
              return null;
            })
            .filter(Boolean);

          // Ordenar según reglas FIFA:
          // 1. Puntos (PTS)
          // 2. Diferencia de Goles (DIF)
          // 3. Goles a Favor (GF)
          // 4. Victorias (G)
          extractedThirds.sort((a, b) => {
            if (b.points !== a.points) return b.points - a.points;
            if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
            if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
            return b.won - a.won;
          });

          setThirds(extractedThirds);
          setError(null);
        } else {
          if (thirds.length === 0) setError("Los datos de los grupos aún no están disponibles.");
        }
      } catch (err) {
        console.error("Failed to load third places", err);
        if (thirds.length === 0) setError("Error al cargar la tabla de mejores terceros.");
      } finally {
        setLoading(false);
      }
    };

    loadThirds();

    // Auto-actualizar cada 2 minutos
    const interval = setInterval(loadThirds, 120000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page-container animate-fade-in">
      <header className="page-header">
        <div className="header-title-container">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Mundial Logo" className="header-logo" />
          <h1>Mejores Terceros</h1>
        </div>
        <p className="subtitle">Tabla comparativa de los terceros lugares (Clasifican los 8 mejores)</p>
      </header>

      {loading ? (
        <div className="loading-spinner">Cargando tabla de terceros...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="thirds-content">
          <div className="third-table-container">
            <div className="table-responsive">
              <table className="group-table thirds-table">
                <thead>
                  <tr>
                    <th className="col-rank">Pos</th>
                    <th className="col-team">Equipo</th>
                    <th className="col-group">Grupo</th>
                    <th title="Puntos">PTS</th>
                    <th title="Partidos Jugados">PJ</th>
                    <th title="Victorias">G</th>
                    <th title="Empates">E</th>
                    <th title="Derrotas">P</th>
                    <th title="Goles a Favor">GF</th>
                    <th title="Goles en Contra">GC</th>
                    <th title="Diferencia de Gol">DIF</th>
                  </tr>
                </thead>
                <tbody>
                  {thirds.map((team, index) => {
                    const isQualified = index < 8;
                    return (
                      <tr 
                        key={`${team.groupName}-${team.id}`} 
                        className={isQualified ? 'third-qualified' : 'third-eliminated'}
                      >
                        <td className="col-rank">
                          <span className={`rank-badge ${isQualified ? 'badge-qualified' : 'badge-eliminated'}`}>
                            {index + 1}
                          </span>
                        </td>
                        <td className="col-team">
                          <img src={team.logo} alt={team.name} className="team-logo-small" />
                          <span className="team-name">{team.name}</span>
                        </td>
                        <td className="col-group font-bold">Grupo {team.groupName}</td>
                        <td className="points font-bold">{team.points}</td>
                        <td>{team.played}</td>
                        <td>{team.won}</td>
                        <td>{team.drawn}</td>
                        <td>{team.lost}</td>
                        <td>{team.goalsFor}</td>
                        <td>{team.goalsAgainst}</td>
                        <td className="font-bold">
                          {team.goalDifference > 0 ? `+${team.goalDifference}` : team.goalDifference}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rules-card">
            <div className="rules-card-header">
              <Info size={20} className="rules-icon" />
              <h3>Criterios de clasificación</h3>
            </div>
            <p className="rules-intro">
              En el Mundial 2026 de 48 equipos, los 12 grupos otorgan clasificación automática a los puestos 1 y 2. 
              Para completar los 32 clasificados de la ronda de dieciseisavos de final, se eligen a los **8 mejores terceros** comparando sus registros bajo el reglamento FIFA:
            </p>
            <ol className="rules-list">
              <li>
                <span className="rule-title">Puntos (PTS):</span> Mayor cantidad de puntos en sus 3 partidos.
              </li>
              <li>
                <span className="rule-title">Diferencia de Goles (DIF):</span> Mayor diferencia (GF - GC).
              </li>
              <li>
                <span className="rule-title">Goles a Favor (GF):</span> Mayor cantidad de goles marcados.
              </li>
              <li>
                <span className="rule-title">Victorias (G):</span> Mayor número de partidos ganados.
              </li>
              <li>
                <span className="rule-title">Fair Play (Tarjetas):</span> Menor puntuación de disciplina (no reflejado en esta tabla).
              </li>
              <li>
                <span className="rule-title">Sorteo:</span> En última instancia, sorteo por parte de la FIFA.
              </li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}
