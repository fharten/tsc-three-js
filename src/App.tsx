import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Contact from './pages/Contact';
import CoffeeGuide from './pages/CoffeeGuide';
import Story from './pages/Story';

const App = () => {
  return (
    <main className='bg-stone-900 text-stone-50 min-h-screen'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/story' element={<Story />} />
          <Route path='/coffeeguide' element={<CoffeeGuide />} />
        </Routes>
      </Router>
    </main>
  );
};

export default App;
