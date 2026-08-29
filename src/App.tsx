import { useEffect, useRef, useState, type ReactNode } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import BookingModal from '@/components/BookingModal';
import FloatingContact from '@/components/FloatingContact';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import LoadingScreen from '@/components/LoadingScreen';
import CustomCursor from '@/components/CustomCursor';
import { useTranslation } from '@/i18n/useTranslation';
import Home from '@/pages/Home';
import Resort from '@/pages/Resort';
import Cottages from '@/pages/Cottages';
import Rooms from '@/pages/Rooms';
import AccommodationDetail from '@/pages/AccommodationDetail';
import TourPackages from '@/pages/TourPackages';
import Amenities from '@/pages/Amenities';
import Gallery from '@/pages/Gallery';
import Videos from '@/pages/Videos';
import MountainViews from '@/pages/MountainViews';
import Contact from '@/pages/Contact';

function LanguageFade({ children }: { children: ReactNode }) {
  const { language } = useTranslation();
  const [dim, setDim] = useState(false);
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    setDim(true);
    const timer = window.setTimeout(() => setDim(false), 160);
    return () => window.clearTimeout(timer);
  }, [language]);

  return <div className={`transition-opacity duration-150 ${dim ? 'opacity-0' : 'opacity-100'}`}>{children}</div>;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/resort" element={<Resort />} />
          <Route path="/kottejlar" element={<Cottages />} />
          <Route path="/xonalar" element={<Rooms />} />
          <Route path="/obyekt/:id" element={<AccommodationDetail />} />
          <Route path="/tur-paketlari" element={<TourPackages />} />
          <Route path="/qulayliklar" element={<Amenities />} />
          <Route path="/galereya" element={<Gallery />} />
          <Route path="/videolar" element={<Videos />} />
          <Route path="/tog-manzarasi" element={<MountainViews />} />
          <Route path="/aloqa" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <SmoothScrollProvider>
        <ScrollToTop />
        <LoadingScreen />
        <CustomCursor />
        <div className="min-h-screen bg-stone-50 flex flex-col">
          <Navbar />
          <main className="relative z-10 flex-1 bg-stone-50 shadow-[0_-30px_60px_-25px_rgba(0,0,0,0.35)]">
            <LanguageFade>
              <AnimatedRoutes />
            </LanguageFade>
          </main>
          <div className="sticky bottom-0 z-0">
            <Footer />
          </div>
        </div>
        <BookingModal />
        <FloatingContact />
      </SmoothScrollProvider>
    </BrowserRouter>
  );
}

export default App;
