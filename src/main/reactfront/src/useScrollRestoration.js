import { useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollRestoration = () => {
  const location = useLocation();
  const scrollPositions = useRef({});

  useLayoutEffect(() => {
    scrollPositions.current[location.key] = window.scrollY;

    const restoreScrollPosition = () => {
      if (scrollPositions.current[location.key] !== undefined) {
        window.scrollTo(0, scrollPositions.current[location.key]);
      }
    };

    restoreScrollPosition();
  }, [location]);
};

export default useScrollRestoration;