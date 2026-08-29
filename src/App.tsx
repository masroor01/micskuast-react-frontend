import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import OutlookList from './pages/OutlookList';
import OutlookDetail from './pages/OutlookDetail';
import Markets from './pages/Markets';
import Forecasts from './pages/Forecasts';
import EWS from './pages/EWS';
import Publications from './pages/Publications';
import Team from './pages/Team';
import Admin from './pages/Admin';
import About from './pages/About';
import { ParticleBackground } from './components/ParticleBackground';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <ParticleBackground />
        <Header />
        
        <main style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/markets" element={<Markets />} />
            <Route path="/outlooks" element={<OutlookList />} />
            <Route path="/outlooks/:slug" element={<OutlookDetail />} />
            <Route path="/forecasts" element={<Forecasts />} />
            <Route path="/ews" element={<EWS />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/orchard-ledger" element={<Navigate to="/forecasts?view=ledger" replace />} />
            <Route path="/team" element={<Team />} />
            <Route path="/admin" element={<Admin />} />
            {/* Fallback route */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
