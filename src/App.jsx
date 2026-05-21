import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/common/LoadingScreen';
import AppRoutes from './routes/AppRoutes';

const isPrerender =
  typeof navigator !== 'undefined' && /ReactSnap/i.test(navigator.userAgent);

export default function App() {
  const [loading, setLoading] = useState(!isPrerender);

  useEffect(() => {
    if (isPrerender) return undefined;
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loader" />
        ) : (
          <AppRoutes key="app" />
        )}
      </AnimatePresence>
    </>
  );
}
