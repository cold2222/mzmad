import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
    const { pathname } = useLocation();
    const [prevScrollPos, setPrevScrollPos] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0); // 페이지 전환마다 최상단으로 이동

        // 페이지 이동 전 스크롤 위치를 저장
        const handleScroll = () => {
            setPrevScrollPos(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [pathname]);

    useEffect(() => {
        // 뒤로 가기를 눌렀을 때 이전 스크롤 위치로 이동
        const handlePopState = () => {
            window.scrollTo(0, prevScrollPos);
        };
        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [prevScrollPos]);

    return null;
}