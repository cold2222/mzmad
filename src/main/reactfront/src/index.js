  import React from 'react';
  import ReactDOM from 'react-dom/client';

  import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
  import Header from './header';
  import Footer from './footer';
  import Home from './routers/home/home';
  import CommunityPage from './routers/CommunityPage/communityPage';
  import Test from './routers/Test/test';
  import LoginPage from './routers/dy/Login/LoginPage';
  import KakaoRedirectPage from "./routers/dy/Login/KakaoRedirectPage";





  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
      <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />     
        <Route path="/community/*" element={<CommunityPage />} />
        <Route path="/test" element={<Test/>}></Route>
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/login/oauth2/callback/kakao" element={<KakaoRedirectPage />}></Route>

        

      </Routes>
      <Footer />
    </Router>
  );

