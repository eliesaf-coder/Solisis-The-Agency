import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Menu, 
  X, 
  Instagram, 
  Linkedin, 
  Lightbulb, 
  Zap, 
  Search, 
  Camera, 
  Video, 
  Users, 
  Plus, 
  ChevronRight,
  TrendingUp,
  Handshake,
  Mail,
  Send,
  ExternalLink
} from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';

// --- Shared Components ---

const Navbar = ({ currentPage, setCurrentPage }: { currentPage: string, setCurrentPage: (p: string) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', id: 'home' },
    { name: 'Services', id: 'services' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-nav py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <button 
          onClick={() => setCurrentPage('home')}
          className="text-2xl font-extrabold tracking-tighter text-tertiary hover:opacity-80 transition-opacity"
        >
          Solisis Agency
        </button>

        <div className="hidden md:flex items-center space-x-12">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setCurrentPage(link.id)}
              className={`font-semibold tracking-tight transition-all duration-300 relative py-1 ${
                currentPage === link.id 
                  ? 'text-primary' 
                  : 'text-tertiary/60 hover:text-primary'
              }`}
            >
              {link.name}
              {currentPage === link.id && (
                <motion.div 
                  layoutId="navUnderline"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
                />
              )}
            </button>
          ))}
          <button 
            onClick={() => setCurrentPage('contact')}
            className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20"
          >
            Démarrer un projet
          </button>
        </div>

        <button className="md:hidden text-tertiary" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white border-b border-tertiary/5 p-6 flex flex-col space-y-6 shadow-xl md:hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setCurrentPage(link.id);
                  setIsMenuOpen(false);
                }}
                className={`text-xl font-bold ${currentPage === link.id ? 'text-primary' : 'text-tertiary'}`}
              >
                {link.name}
              </button>
            ))}
            <button 
              onClick={() => {
                setCurrentPage('contact');
                setIsMenuOpen(false);
              }}
              className="bg-primary text-white px-8 py-4 rounded-xl font-bold w-full"
            >
              Démarrer un projet
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = ({ setCurrentPage }: { setCurrentPage: (p: string) => void }) => {
  return (
    <footer className="bg-tertiary text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
          <div className="md:col-span-5 space-y-8">
            <h2 className="text-3xl font-extrabold tracking-tighter">Solisis Agency</h2>
            <p className="text-white/60 text-lg leading-relaxed max-w-sm">
              L’expertise créative au service de votre récit. Nous façonnons le futur des marques avec élégance et intention.
            </p>
          </div>
          
          <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12 text-sm uppercase tracking-widest font-bold">
            <div className="flex flex-col space-y-6">
              <span className="text-white/30">Navigation</span>
              <button onClick={() => setCurrentPage('home')} className="text-left hover:text-primary transition-colors">Accueil</button>
              <button onClick={() => setCurrentPage('services')} className="text-left hover:text-primary transition-colors">Services</button>
              <button onClick={() => setCurrentPage('contact')} className="text-left hover:text-primary transition-colors">Contact</button>
            </div>
            
            <div className="flex flex-col space-y-6">
              <span className="text-white/30">Social</span>
              <a href="https://www.linkedin.com/company/solisis-agency/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-2">LinkedIn <ExternalLink size={14} /></a>
              <a href="https://www.instagram.com/solisis.agency/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-2">Instagram <ExternalLink size={14} /></a>
            </div>

            <div className="hidden md:flex flex-col space-y-6">
              <span className="text-white/30">Legal</span>
              <a href="#" className="hover:text-primary transition-colors">Mentions Légales</a>
              <a href="#" className="hover:text-primary transition-colors">Confidentialité</a>
            </div>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/40 text-sm">© 2025 Solisis Agency. L’expertise créative au service de votre récit.</p>
          <div className="flex gap-8 text-white/40 text-sm">
            <a href="#" className="hover:text-white transition-colors">Mentions Légales</a>
            <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Page Components ---

const HomePage = ({ setCurrentPage }: { setCurrentPage: (p: string) => void, key?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px]" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-10"
          >
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-sm block">
              L'expertise digitale
            </span>
            <h1 className="text-6xl md:text-[5.5rem] font-black leading-[0.9] tracking-tighter text-tertiary">
              Votre standing <br /><span className="text-primary">mérite d'être vu.</span>
            </h1>
            <p className="text-xl text-tertiary/60 leading-relaxed max-w-lg">
              De la vision à l'impact : Solisis Agency fusionne stratégie audacieuse et création d'exception pour transformer vos ambitions en succès mesurables.
            </p>
            <div className="flex flex-wrap gap-6 pt-4">
              <button 
                onClick={() => setCurrentPage('contact')}
                className="bg-tertiary text-white px-10 py-5 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-tertiary/20 transition-all flex items-center gap-3 active:scale-95 transition-all"
              >
                Lancer mon projet
              </button>
              <button 
                onClick={() => setCurrentPage('services')}
                className="bg-accent text-primary px-10 py-5 rounded-xl font-bold text-lg hover:bg-accent/80 transition-all active:scale-95"
              >
                Explorer nos expertises
              </button>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-white rounded-2xl overflow-hidden shadow-2xl relative group">
              <img 
                src="https://lh3.googleusercontent.com/aida/ADBb0uhR9L881HC6sdyuO9t0efAa0JGUMvWbjYL6B2gQVTVr2KCdbcfHkCxymqesr3nlJFnC1kW13vgM_ZddDaz_pKHS0kQscnvoBxUBJWWB8oCDvw9CmXJL4BC8xyNaHFFkaMyXNsRktzh8dSnXkh1QEQb2fYqmUKTdJakQ3I6qllwOM5zjZuNw0TTGOMrVVLB2QK-0-ShMMEt8R5PULkfdS-q5Dc5r9Uqe4jdGGvTiz61AfZO4LEcpHDOVfKvcFX_4NSb8vJ2RvBlAqA" 
                alt="Digital Art"
                className="w-full h-full object-contain p-12 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-tertiary/5 mix-blend-multiply" />
            </div>
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="absolute -bottom-10 -left-10 bg-primary p-10 rounded-2xl shadow-2xl max-w-[260px] text-white"
            >
              <p className="text-5xl font-black italic mb-2 tracking-tighter">10+</p>
              <p className="text-white/80 font-medium leading-snug">Projets livrés avec une excellence narrative.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-40 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-5">
              <h2 className="text-4xl md:text-5xl font-black text-tertiary leading-tight tracking-tight">
                Nous ne créons pas seulement des contenus, nous bâtissons votre autorité digitale.
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-12">
              <p className="text-2xl text-tertiary/70 leading-relaxed font-light">
                Fondée sur le principe de l'épure narrative, Solisis Agency accompagne les entreprises qui souhaitent sortir du bruit numérique. Notre approche combine une rigueur stratégique implacable avec une créativité sans compromis.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    <Lightbulb size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-tertiary">Créativité Pure</h3>
                  <p className="text-lg text-tertiary/60">L'esthétique au service du message, sans artifice inutile.</p>
                </div>
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    <TrendingUp size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-tertiary">Impact Mesurable</h3>
                  <p className="text-lg text-tertiary/60">Chaque pixel et chaque mot sont orientés vers vos objectifs business.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Services Preview */}
      <section className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl space-y-4">
              <span className="text-primary font-bold tracking-widest uppercase text-sm">Nos Domaines</span>
              <h2 className="text-5xl md:text-6xl font-black text-tertiary tracking-tighter">Expertises 360° pour marques d'exception.</h2>
            </div>
            <button 
              onClick={() => setCurrentPage('services')}
              className="flex items-center gap-3 text-tertiary font-bold hover:text-primary transition-colors group text-lg"
            >
              Tous les services <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* card 1 */}
            <div className="md:col-span-2 bg-zinc-50 p-12 rounded-3xl border border-black/5 hover:shadow-2xl transition-all duration-500 flex flex-col justify-between group h-[450px]">
              <div className="space-y-6">
                <Search className="text-primary size-12" />
                <h3 className="text-4xl font-black text-tertiary">Audit & Stratégie</h3>
                <p className="text-xl text-tertiary/60 leading-relaxed">Analyse profonde de votre positionnement pour définir une trajectoire de croissance authentique.</p>
              </div>
              <button onClick={() => setCurrentPage('services')} className="text-primary font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                En savoir plus <ChevronRight size={20} />
              </button>
            </div>

            {/* card 2 */}
            <div className="md:col-span-2 relative rounded-3xl overflow-hidden group h-[450px]">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXfwTYkSEPnwEn5Jla63MC7vJmfutVde_3P8IX3hb6F5Jajf4gXxVi3oT_6kqp5t_cYKKye7uLUa4L4CUJgFs3RfK4WOp-I_SmQjOMSIn-UP7cB6mHLZM7RyFGkzv5Gul1YP3ZDvhT9aw4EvrdMS7osvMSvPtZJbfJKT4EQO4GCF0lcCV_ikhfvhQFt-s413tGQcog15DC5MpgKstqXBXVCC_w71jDCHps6IfwQYPXAnVDD5kvgLemSiqJBpxReT2xEDCRRRmuv74u" 
                alt="Video Production"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-tertiary/90 via-tertiary/20 to-transparent p-12 flex flex-col justify-end">
                <div className="space-y-4">
                  <h3 className="text-4xl font-extrabold text-white">Vidéographie</h3>
                  <p className="text-white/80 text-lg">Le mouvement qui captive et convertit.</p>
                  <Video className="text-white size-10" />
                </div>
              </div>
            </div>

            {/* card 3 */}
            <div className="md:col-span-2 bg-tertiary p-12 rounded-3xl flex flex-col justify-between group h-[450px] text-white">
              <div className="flex justify-between">
                <Users size={48} className="text-accent" />
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-accent group-hover:text-tertiary transition-all">
                  <Plus />
                </div>
              </div>
              <div className="space-y-6">
                <h3 className="text-4xl font-black">Réseaux Sociaux</h3>
                <p className="text-xl text-white/60 leading-relaxed">Engagez votre communauté avec une gestion de contenu sociale-first et une direction artistique soignée.</p>
              </div>
            </div>

            {/* card 4 */}
            <div className="md:col-span-2 bg-accent p-12 rounded-3xl flex flex-col justify-between group h-[450px]">
              <div className="space-y-6">
                <Camera size={48} className="text-primary" />
                <h3 className="text-4xl font-black text-primary">Photographie</h3>
                <p className="text-xl text-primary/80 leading-relaxed">L'image fixe comme pilier de votre identité visuelle haut de gamme.</p>
              </div>
              <div className="flex -space-x-4">
                {[1,2,3].map(i => (
                  <div key={i} className="w-14 h-14 rounded-full border-4 border-accent overflow-hidden bg-white/20">
                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" className="w-full h-full object-cover grayscale" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="py-40 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center space-y-24">
          <div className="space-y-6">
            <span className="text-primary font-bold tracking-widest uppercase text-sm">Pourquoi nous ?</span>
            <h2 className="text-5xl md:text-7xl font-black text-tertiary tracking-tighter">L'excellence comme signature.</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <Zap />, title: "Approche Stratégique", desc: "Nous analysons avant de créer. Chaque choix artistique est justifié par un objectif stratégique clair." },
              { icon: <Search />, title: "Créativité Illimitée", desc: "Nous repoussons les frontières du design conventionnel pour offrir des expériences visuelles uniques." },
              { icon: <Handshake />, title: "Accompagnement", desc: "Vous n'êtes pas un client, mais un partenaire. Nous marchons à vos côtés à chaque étape du projet." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-12 rounded-3xl space-y-8 shadow-sm hover:translate-y-[-10px] transition-transform duration-500 text-center flex flex-col items-center">
                <div className="w-24 h-24 bg-accent/30 rounded-full flex items-center justify-center text-primary">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-black text-tertiary">{item.title}</h3>
                <p className="text-lg text-tertiary/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 px-6 md:px-12">
        <div className="max-w-7xl mx-auto bg-tertiary rounded-[3rem] overflow-hidden relative min-h-[600px] flex items-center">
          <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block opacity-20 grayscale hover:grayscale-0 transition-all duration-1000">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5WPWr7LpryvrX0x8rgLBBZXPKW9tDRbzTSccH8q1Hzuh-LUCQNZyIj0JP-qZPqv7iv7Taww0tjSutRHCSdSLZeCIINFT9hHbfUXidFU1KXembYPREmPK7stoQ-sDFWL9CzcEzyvUS_RCy2sTHVtjo1inh4oG6kX_HNqoud8y8UPZvopGRgcDozsKlsNDMiqn2GRZKGENt9F-5-xQ2EsmFdWyVhFcBlzZdsuMdrsFYwAxq0kEc-eRGeJurQJNjZY4iwqQkHR8B-MCU" 
              alt="Team"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-12 md:p-24 lg:w-2/3 relative z-10 space-y-12">
            <h2 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter">Parlons de <br />votre projet</h2>
            <p className="text-xl text-white/60 max-w-xl leading-relaxed">
              Prêt à transformer votre présence de marque ? Notre équipe est prête à donner vie à vos idées les plus audacieuses.
            </p>
            <button 
              onClick={() => setCurrentPage('contact')}
              className="bg-primary hover:bg-primary/90 text-white px-12 py-6 rounded-2xl font-black text-xl flex items-center gap-4 group active:scale-95 transition-all shadow-2xl shadow-primary/30"
            >
              Démarrer l'aventure <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

const ServicesPage = ({ setCurrentPage }: { setCurrentPage: (p: string) => void, key?: string }) => {
  const services = [
    {
      id: 'audit',
      title: 'Audit & Stratégie',
      desc: 'Nous identifions vos opportunités de croissance et définissons une trajectoire de communication précise pour ancrer votre marque dans l’excellence.',
      icon: <Search className="text-primary size-10" />,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD7W5xhpllCfHTBYjY0E3b1f29beUw-Svc6gTKzUhIl9woE71dYZGg89L9M4zg221rUljoG3qaL6JgJVoa5pnFX1uTSaRubqNsExPVfFvdQSTuN3la4HbwjEmQ8tj_mT4JNrMZnSWQI465LwXOGJNrT6k-n_OottYvBUTGl0dlS7MRUz93UJanu26U0Y5-rpudkO5aBuK9v45OP2C9QzPjGCnp6xlNiHcrv5I8Vlgs9PPrMkNPsANpccJ6TuQJ9Zn9QYtvI4S8tvI5E",
      color: "bg-zinc-50"
    },
    {
      id: 'video',
      title: 'Vidéographie',
      desc: 'Un contenu vidéo engageant conçu pour le storytelling moderne. Captivez votre audience avec des productions cinématographiques.',
      icon: <Video className="text-accent size-10" />,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5Q52N14GmjfroR_wG-Hh3VSnAexHmRdnUEx-arG5m89CeQ88iQS1Ty6kjWbVLWt6UD4F3UCYbT3THTAWhcDvzI7TwOiTSRczOr9jBp3JHZVRgBmZJnpteqRIDWS4PioCaocmqaEmfs8AopDrCT8LqFRmq_I_7tuTLqQxqldmsyzErBH5YfopmfNrgNSefhULqxd871i6QY2mK7IFmvnc7x-mlsyjMkc5mPlP-K5eLWi8sDX0mI7AdvNwFcQswCqfol2H8YlsYE4hX",
      color: "bg-tertiary",
      dark: true
    },
    {
      id: 'social',
      title: 'Réseaux sociaux',
      desc: 'Un engagement authentique aligné sur votre identité de marque. Nous gérons votre présence pour créer une communauté fidèle.',
      icon: <Users className="text-secondary size-10" />,
      color: "bg-accent"
    },
    {
      id: 'photo',
      title: 'Photographie',
      desc: 'Des visuels professionnels haute fidélité qui subliment votre image de marque. La précision au service de l’esthétique.',
      icon: <Camera className="text-primary size-10" />,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDy6MQC3f2EPMTpnvPpqRtfZ2epAvZ1lmX3CkV4M8GqMwFdxae34k_KGX2pdClSkjcfx_vEV0AmT3wKbpG0bdRzapTxrLulqphfGGvxz0B9EFwlf4mLx4KkRWg9_-hZ49vKFo5PmmQhWP0E94FRIppvMWQg-7XQkO3wMe9yV5837GWHD4mfqUlLsRV7iesjry8MfnhVH9-bucWio1X98GzjiDJbahlRfFc9X6xqXIhxaxk-bLHahXX3WYPsU3mlWfGsex_9Ia7PQl8E",
      color: "bg-orange-50"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 pb-40"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <header className="max-w-4xl space-y-8 mb-32">
          <span className="text-primary font-bold tracking-[0.3em] uppercase text-sm block">L'expertise Solisis</span>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-tertiary leading-[0.9]">
            Expertises &<br />Solutions
          </h1>
          <p className="text-2xl text-tertiary/60 leading-relaxed font-light">
            Nous transformons vos ambitions en récits visuels percutants. Une approche holistique où la stratégie de pointe rencontre l'art pur de l'image.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {services.map((s, idx) => (
            <div 
              key={s.id}
              className={`${idx % 4 === 0 || idx % 4 === 3 ? 'md:col-span-7' : 'md:col-span-5'} ${s.color} rounded-[2.5rem] p-12 min-h-[500px] flex flex-col justify-between relative overflow-hidden group border border-black/5`}
            >
              <div className="relative z-10 space-y-8">
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center ${s.dark ? 'bg-white/10' : 'bg-white shadow-xl shadow-black/5'}`}>
                  {s.icon}
                </div>
                <h3 className={`text-4xl font-black ${s.dark ? 'text-white' : 'text-tertiary'}`}>{s.title}</h3>
                <p className={`text-xl leading-relaxed max-w-md ${s.dark ? 'text-white/60' : 'text-tertiary/60'}`}>
                  {s.desc}
                </p>
              </div>
              
              <div className="relative z-10 pt-12">
                <button 
                  onClick={() => setCurrentPage('contact')}
                  className={`flex items-center gap-3 font-bold text-lg group-hover:gap-6 transition-all ${s.dark ? 'text-accent' : 'text-primary'}`}
                >
                  Nous contacter <ArrowRight />
                </button>
              </div>

              {s.image && (
                <div className={`absolute right-0 top-0 w-1/2 h-full opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none ${s.dark ? 'grayscale invert' : 'grayscale'}`}>
                  <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          ))}
        </div>

        <section className="mt-40 bg-tertiary rounded-[3rem] p-12 md:p-32 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary blur-[150px] rounded-full" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary blur-[150px] rounded-full" />
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight max-w-4xl mx-auto relative z-10">
            Prêt à écrire votre <span className="text-accent">prochain chapitre</span> ?
          </h2>
          <p className="text-white/60 text-xl max-w-2xl mx-auto mt-8 mb-16 relative z-10">
            Contactez notre équipe créative pour une consultation personnalisée et donnez vie à votre vision.
          </p>
          <button 
            onClick={() => setCurrentPage('contact')}
            className="bg-primary text-white px-16 py-6 rounded-full font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/40 relative z-10"
          >
            Nous contacter
          </button>
        </section>
      </div>
    </motion.div>
  );
};

const ContactPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 pb-40"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 bg-background">
        <div className="grid lg:grid-cols-2 gap-32 items-start">
          <div className="space-y-20">
            <div className="space-y-8">
              <span className="text-primary font-bold tracking-[0.3em] uppercase text-sm block">Parlons de vous</span>
              <h1 className="text-6xl md:text-8xl font-black text-tertiary tracking-tighter leading-[0.9]">
                Donnez vie à<br />votre vision.
              </h1>
              <p className="text-2xl text-tertiary/60 leading-relaxed font-light max-w-lg">
                Votre projet mérite une attention d'exception. Contactez notre équipe pour définir ensemble votre prochaine étape de croissance.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              <div className="bg-zinc-50 p-10 rounded-3xl space-y-6 hover:shadow-2xl transition-all duration-500 border border-black/5">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <Mail />
                </div>
                <div>
                  <p className="text-sm font-bold text-tertiary/30 uppercase tracking-widest mb-2">Email</p>
                  <p className="text-xl font-bold text-tertiary">contact@solisisagency.com</p>
                </div>
              </div>
              
              <div className="bg-zinc-50 p-10 rounded-3xl space-y-6 hover:shadow-2xl transition-all duration-500 border border-black/5">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <Plus />
                </div>
                <div>
                  <p className="text-sm font-bold text-tertiary/30 uppercase tracking-widest mb-2">Suivez-nous</p>
                  <div className="flex gap-4 font-bold">
                    <a href="https://www.linkedin.com/company/solisis-agency/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LinkedIn</a>
                    <a href="https://www.instagram.com/solisis.agency/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Instagram</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-80 w-full rounded-4xl overflow-hidden bg-zinc-100 group">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6t6Gv9Y7P9eOWw4JUfdr1B-ttkMNWrCUknt1EfNbQADm1oFfSRtI5ymGzKiXRYnb-FQBevLLo4OLo07tTd0EHjyKg0LpnXTuJ4tRiBqsdsK0lSufTyWZHWInphYisnZ4j01hpTwSZ0ezZemc5c6g6PTHPvZnA9cjWu4ouao3CpPe_huUMbG3L5ciZyIy4Esu_A-xpdpwVpeOH5WXMl1HeHwDHg5jH2jhvSjjXhMVtzTkEOGLK8uFfVOm7PN8YXdRhyqQz77NHVTPx" 
                alt="Office"
                className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-[150px] -z-10" />
            <div className="bg-white p-8 md:p-16 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(30,45,47,0.1)] border border-black/5">
              <form 
                className="space-y-10" 
                action="mailto:contact@solisisagency.com" 
                method="POST" 
                encType="text/plain"
              >
                <div className="space-y-4">
                  <label className="text-sm font-bold text-tertiary tracking-widest uppercase">Nom complet</label>
                  <input 
                    type="text" 
                    name="Name"
                    required
                    placeholder="Jean Dupont"
                    className="w-full bg-zinc-50 border-none rounded-2xl px-8 py-6 focus:ring-4 focus:ring-primary/20 text-lg transition-all"
                  />
                </div>
                
                <div className="space-y-4">
                  <label className="text-sm font-bold text-tertiary tracking-widest uppercase">Adresse email</label>
                  <input 
                    type="email" 
                    name="Email"
                    required
                    placeholder="jean@exemple.com"
                    className="w-full bg-zinc-50 border-none rounded-2xl px-8 py-6 focus:ring-4 focus:ring-primary/20 text-lg transition-all"
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-bold text-tertiary tracking-widest uppercase">Votre message</label>
                  <textarea 
                    name="Message"
                    required
                    rows={5}
                    placeholder="Parlez-nous de votre projet..."
                    className="w-full bg-zinc-50 border-none rounded-2xl px-8 py-6 focus:ring-4 focus:ring-primary/20 text-lg transition-all resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-tertiary text-white py-6 rounded-full font-black text-xl hover:bg-primary transition-all active:scale-[0.98] flex justify-center items-center gap-4 group"
                >
                  Envoyer le message <Send className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
                
                <p className="text-center text-sm text-tertiary/40 italic font-light">
                  En envoyant ce formulaire, votre client mail s'ouvrira pour finaliser l'envoi vers contact@solisisagency.com
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main App Component ---

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary/20 selection:text-primary">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <HomePage key="home" setCurrentPage={setCurrentPage} />
          )}
          {currentPage === 'services' && (
            <ServicesPage key="services" setCurrentPage={setCurrentPage} />
          )}
          {currentPage === 'contact' && (
            <ContactPage key="contact" />
          )}
        </AnimatePresence>
      </main>

      <Footer setCurrentPage={setCurrentPage} />
      <Analytics />
    </div>
  );
}
