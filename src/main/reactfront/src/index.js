import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import Home from './routers/home/home';
import CommunityPage from './routers/CommunityPage/communityPage';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/community/*" element={<CommunityPage />} />
    </Routes>
    <Footer />
  </Router>
);

reportWebVitals();
