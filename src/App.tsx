import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Datenschutz from './pages/Datenschutz';
import Story from './pages/Story';
import Footer from './components/Footer';
import Impressum from './pages/Impressum';
import Menu from './pages/Menu';

const App = () => {
  return (
    <main className='bg-stone-900 text-stone-50 min-h-screen font-quicksand'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/story' element={<Story />} />
          <Route path='/impressum' element={<Impressum />} />
          <Route path='/datenschutz' element={<Datenschutz />} />
          <Route path='/menu' element={<Menu />} />
        </Routes>
        <Footer />
      </Router>
    </main>
  );
};

export default App;
