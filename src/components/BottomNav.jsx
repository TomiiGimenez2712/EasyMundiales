import { NavLink } from 'react-router-dom';
import { Calendar, Trophy, Award, GitCommit } from 'lucide-react';
import './BottomNav.css';

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
        <Calendar size={24} />
        <span>Partidos</span>
      </NavLink>
      <NavLink to="/groups" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
        <Trophy size={24} />
        <span>Grupos</span>
      </NavLink>
      <NavLink to="/thirds" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
        <Award size={24} />
        <span>Terceros</span>
      </NavLink>
      <NavLink to="/knockout" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
        <GitCommit size={24} />
        <span>Eliminatorias</span>
      </NavLink>
    </nav>
  );
}
