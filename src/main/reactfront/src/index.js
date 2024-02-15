import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import Home from './routers/home/home';
import CommunityPage from './routers/CommunityPage/communityPage';
import Test from './routers/Test/test'
import CoursePage from './routers/CoursePage/coursePage';
import Editor from './routers/Editor/Editor';
import "./css/index.module.css"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/community/post" element={<Editor />} />
      <Route path="/community/*" element={<CommunityPage />} />
      <Route path="/test" element={<Test />} />
      <Route path="/course/*" element={<CoursePage/>}/>
      <Route path="/write" element={<Editor />} />
    </Routes>
    <Footer />
  </Router>
);

