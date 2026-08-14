import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import BookingModal from '@/components/BookingModal';
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

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-stone-50 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
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
        </main>
        <Footer />
        <BookingModal />
      </div>
    </BrowserRouter>
  );
}

export default App;
