import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Home from './components/Home';
import Search from './components/Search';
import Recommendations from './components/Recommendations';
import About from './components/About';

function App() {
  return (
    <Router>
      <div className="min-h-screen animated-bg">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen"
        >
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/recommendations" element={<Recommendations />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
        </motion.div>
      </div>
    </Router>
  );
}

export default App; 