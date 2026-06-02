import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import MatchesPage from './pages/MatchesPage';
import GroupsPage from './pages/GroupsPage';
import KnockoutPage from './pages/KnockoutPage';
import BottomNav from './components/BottomNav';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MatchesPage />} />
        <Route path="/groups" element={<GroupsPage />} />
        <Route path="/knockout" element={<KnockoutPage />} />
      </Routes>
      <BottomNav />
    </Router>
  );
}

export default App;
