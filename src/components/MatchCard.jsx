import './MatchCard.css';

export default function MatchCard({ match }) {
  const { team1, team2, status, date, name } = match;

  // Format the date for Argentina Time (UTC-3)
  const dateObj = new Date(date);
  const formattedTime = new Intl.DateTimeFormat('es-AR', {
    timeZone: 'America/Argentina/Buenos_Aires',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(dateObj);

  const formattedDate = new Intl.DateTimeFormat('es-AR', {
    timeZone: 'America/Argentina/Buenos_Aires',
    day: 'numeric',
    month: 'short',
  }).format(dateObj);

  const isLive = status.state === 'in';
  const isFinished = status.state === 'post';

  return (
    <div className={`match-card animate-fade-in ${isLive ? 'live' : ''}`}>
      <div className="match-header">
        <span className="match-date">{formattedDate}</span>
        {isLive && <span className="live-badge">EN VIVO {status.clock}</span>}
        {isFinished && <span className="status-badge">Finalizado</span>}
        {!isLive && !isFinished && <span className="status-badge">{formattedTime}</span>}
      </div>
      
      <div className="teams-container">
        <div className={`team ${team1.winner ? 'winner' : ''}`}>
          <div className="team-info">
            <img src={team1.logo} alt={team1.name} className="team-logo" />
            <span className="team-name">{team1.name}</span>
          </div>
          <span className="team-score">
            {status.state !== 'pre' ? team1.score : '-'}
          </span>
        </div>

        <div className={`team ${team2.winner ? 'winner' : ''}`}>
          <div className="team-info">
            <img src={team2.logo} alt={team2.name} className="team-logo" />
            <span className="team-name">{team2.name}</span>
          </div>
          <span className="team-score">
            {status.state !== 'pre' ? team2.score : '-'}
          </span>
        </div>
      </div>
    </div>
  );
}
