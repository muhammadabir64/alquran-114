import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const useProgress = () => {
  const location = useLocation();
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const loadingTime = 1000;
      const interval = 10;

      let progress = 0;
      const increment = (100 / loadingTime) * interval;

      const timer = setInterval(() => {
        progress += increment;
        if (progress >= 100) {
          clearInterval(timer);
          progress = 100;
        }
        setProgressValue(progress);
      }, interval);
    };

    updateProgress();
    
    return () => {
      setProgressValue(0);
    };
  }, [location.pathname]);

  return progressValue;
};

export default useProgress;