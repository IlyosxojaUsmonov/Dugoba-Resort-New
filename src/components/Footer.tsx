import { Link } from 'react-router-dom';
import { MapPin, Phone, Send, Mountain } from 'lucide-react';
import { resortInfo } from '@/data/accommodations';

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-300">
      <div className="container-lux py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-12 h-12 rounded-sm border-2 border-forest-400 flex items-center justify-center">
                <Mountain size={22} className="text-forest-400" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-white text-2xl font-semibold tracking-wide leading-none">
                  Dugoba
                </span>
                <span className="text-[10px] text-forest-400 tracking-[0.3em] uppercase">
                  Resort
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-stone-400">
              Farg'ona viloyati, Shohimardon qishlog'ining eng yuqori nuqtasida joylashgan
              premium resort. Tog' manzarasi, qulay xonalar va kottejlar bilan dam olishning
              eng yuqori darajasi.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-lg text-white mb-6 font-semibold">Naviqatsiya</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-sm hover:text-forest-400 transition-colors">Bosh sahifa</Link></li>
              <li><Link to="/resort" className="text-sm hover:text-forest-400 transition-colors">Resort haqida</Link></li>
              <li><Link to="/kottejlar" className="text-sm hover:text-forest-400 transition-colors">Kottejlar</Link></li>
              <li><Link to="/xonalar" className="text-sm hover:text-forest-400 transition-colors">Xonalar</Link></li>
              <li><span aria-disabled="true" className="text-sm text-stone-300 cursor-not-allowed">Tur paketlari</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg text-white mb-6 font-semibold">Qo'shimcha</h4>
            <ul className="space-y-3">
              <li><Link to="/qulayliklar" className="text-sm hover:text-forest-400 transition-colors">Qulayliklar</Link></li>
              <li><Link to="/galereya" className="text-sm hover:text-forest-400 transition-colors">Galereya</Link></li>
              <li><Link to="/videolar" className="text-sm hover:text-forest-400 transition-colors">Videolar</Link></li>
              <li><Link to="/tog-manzarasi" className="text-sm hover:text-forest-400 transition-colors">Tog' manzarasi</Link></li>
              <li><Link to="/aloqa" className="text-sm hover:text-forest-400 transition-colors">Aloqa</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg text-white mb-6 font-semibold">Bog'lanish</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-forest-400 mt-0.5 shrink-0" />
                <span className="text-sm text-stone-400">{resortInfo.location}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-forest-400 shrink-0" />
                <a href={`tel:${resortInfo.phone.replace(/\s/g, '')}`} className="text-sm hover:text-forest-400 transition-colors">
                  {resortInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Send size={18} className="text-forest-400 shrink-0" />
                <a href={resortInfo.telegram} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-forest-400 transition-colors">
                  Telegram: {resortInfo.telegramUsername}
                </a>
              </li>
            </ul>
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="font-serif text-2xl text-forest-400 font-bold">29</div>
                <div className="text-[10px] text-stone-500 uppercase tracking-wider">Obyekt</div>
              </div>
              <div className="text-center">
                <div className="font-serif text-2xl text-forest-400 font-bold">5</div>
                <div className="text-[10px] text-stone-500 uppercase tracking-wider">Kottej</div>
              </div>
              <div className="text-center">
                <div className="font-serif text-2xl text-forest-400 font-bold">24</div>
                <div className="text-[10px] text-stone-500 uppercase tracking-wider">Xona</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-stone-800">
        <div className="container-lux py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-stone-500">
            © {new Date().getFullYear()} Dugoba Resort. Barcha huquqlar himoyalangan.
          </p>
          <p className="text-xs text-stone-500">Shohimardon · Farg'ona viloyati</p>
        </div>
      </div>
    </footer>
  );
}
