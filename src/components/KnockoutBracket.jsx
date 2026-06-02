import './KnockoutBracket.css';

const MatchBox = ({ match }) => (
  <div className="bracket-match-box">
    <div className={`bracket-team-box ${match.team1.winner ? 'winner' : ''}`}>
      <span className="bracket-team-abbr">{match.team1.abbreviation}</span>
      <span className="bracket-team-score">{match.status !== 'pre' ? match.team1.score : '-'}</span>
    </div>
    <div className={`bracket-team-box ${match.team2.winner ? 'winner' : ''}`}>
      <span className="bracket-team-abbr">{match.team2.abbreviation}</span>
      <span className="bracket-team-score">{match.status !== 'pre' ? match.team2.score : '-'}</span>
    </div>
  </div>
);

const RoundColumn = ({ matches, title }) => (
  <div className="bracket-column">
    {title && <h5 className="column-title">{title}</h5>}
    <div className="column-matches">
      {matches.map((m, i) => (
        <div key={i} className="match-wrapper">
          <MatchBox match={m} />
        </div>
      ))}
    </div>
  </div>
);

export default function KnockoutBracket({ left, right, final }) {
  return (
    <div className="bracket-wrapper animate-fade-in">
      <div className="bracket-tree">
        {/* Lado Izquierdo */}
        <div className="bracket-half">
          <RoundColumn matches={left.round16} title="16avos" />
          <RoundColumn matches={left.round8} title="Octavos" />
          <RoundColumn matches={left.round4} title="Cuartos" />
          <RoundColumn matches={left.round2} title="Semis" />
        </div>

        {/* Centro (Final) */}
        <div className="bracket-center">
          <div className="final-wrapper">
            <h5 className="column-title final-title">Final</h5>
            <MatchBox match={final} />
          </div>
        </div>

        {/* Lado Derecho */}
        <div className="bracket-half">
          <RoundColumn matches={right.round2} title="Semis" />
          <RoundColumn matches={right.round4} title="Cuartos" />
          <RoundColumn matches={right.round8} title="Octavos" />
          <RoundColumn matches={right.round16} title="16avos" />
        </div>
      </div>
    </div>
  );
}
