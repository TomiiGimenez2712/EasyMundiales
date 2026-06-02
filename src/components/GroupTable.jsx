import './GroupTable.css';

export default function GroupTable({ groupName, teams }) {
  return (
    <div className="group-table-container animate-fade-in">
      <div className="group-header">
        <h3>Grupo {groupName}</h3>
      </div>
      <div className="table-responsive">
        <table className="group-table">
          <thead>
            <tr>
              <th className="col-team">Equipo</th>
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
            {teams.map((team, index) => (
              <tr key={team.id} className={index < 2 ? 'qualified' : ''}>
                <td className="col-team">
                  <span className="rank">{index + 1}</span>
                  <img src={team.logo} alt={team.name} className="team-logo-small" />
                  <span className="team-name">{team.abbreviation || team.name}</span>
                </td>
                <td className="points font-bold">{team.points}</td>
                <td>{team.played}</td>
                <td>{team.won}</td>
                <td>{team.drawn}</td>
                <td>{team.lost}</td>
                <td>{team.goalsFor}</td>
                <td>{team.goalsAgainst}</td>
                <td>{team.goalDifference > 0 ? `+${team.goalDifference}` : team.goalDifference}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
