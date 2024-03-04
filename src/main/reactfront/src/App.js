import React from 'react';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import Home from './routers/home/home';
import CommunityPage from './routers/CommunityPage/communityPage';
import Test from './routers/Test/test'
import CoursePage from './routers/CoursePage/coursePage';
import AdminRegPage from './routers/CoursePage/adminRegistration';
import Editor from './routers/Editor/Editor';
import LoginPage from './routers/dy/Login/LoginPage';
import KakaoRedirectPage from "./routers/dy/Login/KakaoRedirectPage";
import "./css/index.module.css"
import useScrollRestoration from './useScrollRestoration';
import GoogleRedirectPage from './routers/dy/Login/GoogleRedirectPage';
import MyPage from './routers/dy/MyPage/myPage';
import DetailPage from './routers/CoursePage/detailCoursePage';
import ScrollToTop from './scrollToTop';
const App = () => {
  return (
    <BrowserRouter>
      <ScrollRestorationWrapper />
    </BrowserRouter>
  );
}

const ScrollRestorationWrapper = () => {
  useScrollRestoration();

  return (
    <>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} exact={true}/>
        <Route path="/community/write" element={<Editor />} />
        <Route path="/community/*" element={<CommunityPage />} />
        <Route path="/test" element={<Test />} />
        <Route path="/course" element={<CoursePage/>}/>
        <Route path="/course/:number" element={<DetailPage/>} />
        <Route path="/admin-registration" element={<AdminRegPage/>}/>
        <Route path="/write" element={<Editor />} />
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/login/oauth2/callback/kakao" element={<KakaoRedirectPage />}></Route>
        <Route path="/login/oauth2/callback/google" element={<GoogleRedirectPage/>}></Route>
        <Route path="/mypage" element={<MyPage/>}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;