import { Link } from 'react-router-dom';
import { MapPin, Phone, Send, Radio, Instagram } from 'lucide-react';
import { resortInfo, getResortLocation } from '@/data/accommodations';
import { useTranslation } from '@/i18n/useTranslation';
import logo from '@/atrof-muhit/dugobba.png';

export default function Footer() {
  const { t, language } = useTranslation();

  return (
    <footer className="bg-stone-950 text-stone-300">
      <div className="container-lux py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-12 h-12 rounded-sm border-2 border-forest-400 flex items-center justify-center overflow-hidden">
                <img src={logo} alt="Dugoba Resort" className="w-full h-full object-cover" />
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
              {t('footer.description')}
            </p>
          </div>

          <div>
            <h4 className="font-serif text-lg text-white mb-6 font-semibold">{t('footer.navigation')}</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-sm hover:text-forest-400 transition-colors">{t('navbar.home')}</Link></li>
              <li><Link to="/resort" className="text-sm hover:text-forest-400 transition-colors">{t('navbar.resort')}</Link></li>
              <li><Link to="/kottejlar" className="text-sm hover:text-forest-400 transition-colors">{t('navbar.cottages')}</Link></li>
              <li><Link to="/xonalar" className="text-sm hover:text-forest-400 transition-colors">{t('navbar.rooms')}</Link></li>
              <li><Link to="/tur-paketlari" className="text-sm hover:text-forest-400 transition-colors">{t('navbar.tourPackages')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg text-white mb-6 font-semibold">{t('footer.more')}</h4>
            <ul className="space-y-3">
              <li><Link to="/qulayliklar" className="text-sm hover:text-forest-400 transition-colors">{t('navbar.amenities')}</Link></li>
              <li><Link to="/galereya" className="text-sm hover:text-forest-400 transition-colors">{t('navbar.gallery')}</Link></li>
              <li><Link to="/videolar" className="text-sm hover:text-forest-400 transition-colors">{t('navbar.videos')}</Link></li>
              <li><Link to="/tog-manzarasi" className="text-sm hover:text-forest-400 transition-colors">{t('navbar.mountainViews')}</Link></li>
              <li><Link to="/aloqa" className="text-sm hover:text-forest-400 transition-colors">{t('navbar.contact')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg text-white mb-6 font-semibold">{t('footer.contact')}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-forest-400 mt-0.5 shrink-0" />
                <a href={resortInfo.mapUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-stone-400 hover:text-forest-400 transition-colors">
                  {getResortLocation(language)}
                </a>
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
                  {t('footer.telegramPrefix')}: {resortInfo.telegramUsername}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Radio size={18} className="text-forest-400 shrink-0" />
                <a href={resortInfo.telegramChannel} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-forest-400 transition-colors">
                  {t('footer.telegramChannelLabel')}: {resortInfo.telegramChannelUsername}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Instagram size={18} className="text-forest-400 shrink-0" />
                <a href={resortInfo.instagram} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-forest-400 transition-colors">
                  {t('footer.instagramLabel')}: {resortInfo.instagramUsername}
                </a>
              </li>
            </ul>
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="font-serif text-2xl text-forest-400 font-bold">29</div>
                <div className="text-[10px] text-stone-500 uppercase tracking-wider">{t('footer.object')}</div>
              </div>
              <div className="text-center">
                <div className="font-serif text-2xl text-forest-400 font-bold">5</div>
                <div className="text-[10px] text-stone-500 uppercase tracking-wider">{t('footer.cottage')}</div>
              </div>
              <div className="text-center">
                <div className="font-serif text-2xl text-forest-400 font-bold">24</div>
                <div className="text-[10px] text-stone-500 uppercase tracking-wider">{t('footer.room')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-stone-800">
        <div className="container-lux py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-stone-500">
            © {new Date().getFullYear()} {t('footer.copyright')}
          </p>
          <p className="text-xs text-stone-500">{t('footer.locationLine')}</p>
        </div>
      </div>
    </footer>
  );
}
