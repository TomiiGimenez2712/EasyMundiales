import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import MatchesPage from './pages/MatchesPage';
import GroupsPage from './pages/GroupsPage';
import ThirdPlacesPage from './pages/ThirdPlacesPage';
import KnockoutPage from './pages/KnockoutPage';
import BottomNav from './components/BottomNav';
import { TournamentProvider } from './context/TournamentContext';

function App() {
  return (
    <TournamentProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MatchesPage />} />
          <Route path="/groups" element={<GroupsPage />} />
          <Route path="/thirds" element={<ThirdPlacesPage />} />
          <Route path="/knockout" element={<KnockoutPage />} />
        </Routes>
        <BottomNav />
      </Router>
    </TournamentProvider>
  );
}

export default App;
