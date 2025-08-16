import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Kormi from './pages/Kormi';
import Vita from './pages/Vita';
import Orte from './pages/Orte';

const App = () => {
  return (
    <main className='bg-stone-900 text-stone-50 min-h-screen'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/kormi' element={<Kormi />} />
          <Route path='/orte' element={<Orte />} />
          <Route path='/vita' element={<Vita />} />
        </Routes>
      </Router>
    </main>
  );
};

export default App;
