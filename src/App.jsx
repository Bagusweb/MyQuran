import Container from './components/Container';
import Navbar from './components/Navbar';
import Player from './components/Player';
import Surah from './components/Surah';
import SurahDetail from './components/SurahDetail';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './components/NotFound';
import Support from './components/Support';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-gray-50 min-h-screen relative">
      <Router>
        <Navbar />
        <Container fullHeight={true}>
          <div className="pb-40">
            <Routes>
              <Route path="/" element={<Surah page="home" />} />
              <Route path="/surah/favorites" element={<Surah page="favorites" />} />
              <Route path="/surah/:number" element={<SurahDetail />} />
              <Route path="/support" element={<Support />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Container>
        <Footer />
        {/* <Player /> */}
      </Router>
    </div >
  )
}

export default App;
