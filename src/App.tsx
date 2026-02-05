import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Search, Zap, Train, Utensils, Instagram, Twitter, ChevronRight, ChevronLeft, Menu, X, ArrowRight, Store, Bike, ShoppingBag, ArrowLeft, Loader2, User, Mail, Phone, Clock, Star, Flame, Heart, Share2, Filter, Plus, Minus, Info, LogOut, CheckCircle2, CreditCard, Banknote, AlertCircle } from 'lucide-react';
import { useGlobal, OrderItem, OrderType } from './context/GlobalContext';
import PartnerDashboard from './components/PartnerDashboard';
import RiderDashboard from './components/RiderDashboard';

// --- Components ---

const Navbar = ({ onAuthClick }: { onAuthClick: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 py-6 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.reload()}>
          <div className="text-teal font-extrabold text-2xl tracking-tight">Grab A'Treat</div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 bg-gray-100 text-charcoal px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
            <MapPin size={16} className="text-teal" />
            <span>DBJ College, Chiplun</span>
          </div>
          <button onClick={onAuthClick} className="text-charcoal font-medium px-4 py-2 hover:bg-teal/5 rounded-md transition-colors">
            Log in
          </button>
          <button onClick={onAuthClick} className="bg-teal text-white font-bold px-6 py-2.5 rounded-md shadow-sm hover:bg-teal/90 transition-colors flex items-center gap-2">
            Sign up
          </button>
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-teal">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-4 shadow-lg flex flex-col gap-4">
           <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg text-sm text-charcoal">
            <MapPin size={16} className="text-teal" />
            DBJ College, Chiplun
          </div>
          <button onClick={() => { onAuthClick(); setIsOpen(false); }} className="w-full text-left px-4 py-3 font-medium text-charcoal hover:bg-gray-50 rounded-lg">Log in</button>
          <button onClick={() => { onAuthClick(); setIsOpen(false); }} className="w-full bg-teal text-white font-bold py-3 rounded-lg">Sign up</button>
        </div>
      )}
    </nav>
  );
};

const HeroSection = ({ onCtaClick }: { onCtaClick: () => void }) => {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1 flex flex-col items-start z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-extrabold text-charcoal leading-[1.1] mb-6"
          >
            Deliciousness, <br />
            Delivered to Your <span className="text-teal">Doorstep.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-slate-grey mb-10 max-w-lg leading-relaxed"
          >
            The best food from your favorite local restaurants, delivered fast to your doorstep or train coach.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="w-full max-w-lg bg-white p-2 rounded-2xl shadow-xl border border-gray-100 flex flex-col sm:flex-row gap-2"
          >
            <div className="flex-1 relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Enter your delivery address" 
                className="w-full pl-12 pr-4 py-4 rounded-xl text-charcoal outline-none focus:ring-2 focus:ring-teal transition-all placeholder:text-gray-400 font-medium"
              />
            </div>
            <button onClick={onCtaClick} className="bg-teal text-white font-bold py-4 px-8 rounded-xl hover:bg-teal/90 transition-colors whitespace-nowrap shadow-lg shadow-teal/30">
              Find Food
            </button>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="order-1 md:order-2 relative"
        >
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-teal/5 rounded-full blur-3xl -z-10 opacity-60"></div>
           
           <div className="relative z-10 transform md:scale-110">
              <img 
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop" 
                alt="Delicious Pizza" 
                className="rounded-3xl shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 w-full object-cover h-[400px] md:h-[500px]"
              />
              
{/* Floating element removed */}

               <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-10 -right-4 bg-white p-3 rounded-2xl shadow-xl flex items-center gap-2"
              >
                <div className="bg-teal p-2 rounded-full text-white font-bold text-xs">
                  4.8 ★
                </div>
                <p className="text-xs font-bold text-charcoal">Top Rated</p>
              </motion.div>
           </div>
        </motion.div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
  >
    <div className="bg-teal/5 w-16 h-16 rounded-full flex items-center justify-center mb-6 text-teal">
      <Icon size={32} strokeWidth={2.5} />
    </div>
    <h3 className="text-2xl font-bold text-charcoal mb-3">{title}</h3>
    <p className="text-slate-grey leading-relaxed">{description}</p>
  </motion.div>
);

const ValuePropSection = () => {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <span className="text-teal font-bold tracking-wider uppercase text-sm mb-2 block">Our Promise</span>
          <h2 className="text-4xl md:text-5xl font-bold text-charcoal">More Than Just Delivery.</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={Zap}
            title="Fast Delivery"
            description="Optimized for local roads. We know every shortcut to get your food to you hot."
          />
          <FeatureCard 
            icon={Train}
            title="Train Delivery"
            description="Traveling through? Enter your PNR, and get hot food delivered right to your coach at Chiplun Station."
          />
          <FeatureCard 
            icon={Utensils}
            title="No Minimum Order"
            description="Craving just one Vada Pav? We'll bring it. No judgment, just joy delivered to your door."
          />
        </div>
      </div>
    </section>
  );
};

const EcosystemCard = ({ image, title, desc, btnText, onAction }: { image: string, title: string, desc: string, btnText: string, type: 'partner' | 'rider', onAction: () => void }) => (
  <div onClick={onAction} className="relative group overflow-hidden rounded-3xl aspect-[4/5] md:aspect-[16/9] flex items-end cursor-pointer">
    <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
    
    <div className="relative z-10 p-8 md:p-12 w-full">
      <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h3>
      <p className="text-white/90 text-lg mb-8 max-w-md">{desc}</p>
      <button className="bg-white/10 hover:bg-white text-white hover:text-charcoal backdrop-blur-sm border-2 border-white font-bold py-3 px-8 rounded-full transition-all duration-300 flex items-center gap-2 group-hover:gap-4">
        {btnText}
        <ArrowRight size={20} />
      </button>
    </div>
  </div>
);

const EcosystemSection = ({ onAuthTrigger }: { onAuthTrigger: (role: string) => void }) => {
  return (
    <section className="relative pb-24">
      <div className="bg-gray-50 pt-12 pb-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid md:grid-cols-2 gap-8">
                <EcosystemCard 
                    type="partner"
                    image="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop"
                    title="Partner with us"
                    desc="Take your kitchen online. 0% commission for the first month when you sign up today."
                    btnText="Get Started"
                    onAction={() => onAuthTrigger('partner')}
                />
                <EcosystemCard 
                    type="rider"
                    image="https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?q=80&w=2015&auto=format&fit=crop"
                    title="Ride with us"
                    desc="Earn up to ₹500/day with flexible shifts, insurance, and instant payouts."
                    btnText="Join the Fleet"
                    onAction={() => onAuthTrigger('rider')}
                />
            </div>
        </div>
      </div>
    </section>
  );
};

const DownloadAppSection = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-teal rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

          <div className="flex-1 text-white z-10 text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight">Food delivery <br/> at your fingertips.</h2>
            <p className="text-teal-50 text-xl mb-10 max-w-lg opacity-90">Get the best of Chiplun's food scene with the Grab A'Treat app. Real-time tracking and exclusive member-only deals.</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="bg-black text-white px-8 py-4 rounded-2xl flex items-center gap-3 hover:scale-105 transition-transform duration-300 shadow-xl border border-white/10">
                <svg viewBox="0 0 512 512" width="32" height="32" className="fill-white">
                  <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
                </svg>
                <div className="text-left leading-tight">
                  <p className="text-[10px] uppercase font-bold text-gray-400">Get it on</p>
                  <p className="text-xl font-bold">Google Play</p>
                </div>
              </button>
              <button className="bg-black text-white px-8 py-4 rounded-2xl flex items-center gap-3 hover:scale-105 transition-transform duration-300 shadow-xl border border-white/10">
                <svg viewBox="0 0 384 512" width="32" height="32" className="fill-white">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                </svg>
                <div className="text-left leading-tight">
                  <p className="text-[10px] uppercase font-bold text-gray-400">Download on the</p>
                  <p className="text-xl font-bold">App Store</p>
                </div>
              </button>
            </div>
          </div>

          <div className="flex-1 relative z-10 flex justify-center">
             <div className="relative">
                <div className="w-[260px] h-[520px] bg-charcoal rounded-[2.5rem] border-8 border-charcoal shadow-2xl overflow-hidden relative">
                    <img 
                      src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=2070&auto=format&fit=crop" 
                      alt="App Interface" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                        <p className="font-bold text-lg mb-1">Your Vada Pav</p>
                        <p className="text-xs opacity-80 mb-4">Arriving in 12 mins...</p>
                        <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                           <div className="h-full w-2/3 bg-teal"></div>
                        </div>
                    </div>
                </div>
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -right-8 top-1/4 bg-white p-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-gray-100"
                >
                   <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                      <Zap size={20} fill="currentColor" />
                   </div>
                   <div>
                      <p className="text-xs font-bold text-charcoal">Express</p>
                      <p className="text-[10px] text-slate-grey">Active Delivery</p>
                   </div>
                </motion.div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// LinksGridSection removed


const SocialProofFooter = () => {
    return (
        <footer>
            <div className="bg-teal py-6 overflow-hidden relative">
                <div className="flex gap-16 animate-marquee whitespace-nowrap">
                    {[1, 2].map((group) => (
                        <div key={group} className="flex items-center gap-16 text-white/90 text-lg font-medium">
                            <span>"Finally, a good delivery app in Chiplun! - Tony Stark"</span>
                            <span className="w-2 h-2 bg-white/50 rounded-full"></span>
                            <span>"Saved my hungry night during midterms. - Peter Parker"</span>
                            <span className="w-2 h-2 bg-white/50 rounded-full"></span>
                            <span>"Super fast delivery to the station. - Pietro Maximoff"</span>
                            <span className="w-2 h-2 bg-white/50 rounded-full"></span>
                            <span>"Even the Hulk stays calm with this Vada Pav. - Bruce Banner"</span>
                            <span className="w-2 h-2 bg-white/50 rounded-full"></span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-charcoal text-white pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                        <div className="col-span-1 md:col-span-1">
                            <h4 className="text-2xl font-extrabold text-teal mb-6">Grab A'Treat</h4>
                            <div className="flex gap-4">
                                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-teal transition-colors">
                                    <Instagram size={20} />
                                </a>
                                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-teal transition-colors">
                                    <Twitter size={20} />
                                </a>
                            </div>
                        </div>
                        
                        <div>
                            <h5 className="font-bold text-lg mb-4">Company</h5>
                            <ul className="space-y-3 text-gray-400">
                                <li><a href="#" className="hover:text-teal transition-colors">About Us</a></li>
                                <li><a href="#" className="hover:text-teal transition-colors">Team</a></li>
                                <li><a href="#" className="hover:text-teal transition-colors">Careers</a></li>
                            </ul>
                        </div>

                        <div>
                            <h5 className="font-bold text-lg mb-4">Legal</h5>
                            <ul className="space-y-3 text-gray-400">
                                <li><a href="#" className="hover:text-teal transition-colors">Terms & Conditions</a></li>
                                <li><a href="#" className="hover:text-teal transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-teal transition-colors">Cookie Policy</a></li>
                            </ul>
                        </div>

                         <div>
                            <h5 className="font-bold text-lg mb-4">Contact</h5>
                            <ul className="space-y-3 text-gray-400">
                                <li>Help & Support</li>
                                <li>Partner with us</li>
                                <li>Ride with us</li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                        <p>© 2026 Grab A'Treat. Made with ❤️ by Aaliya.</p>
                        <div className="flex gap-6 mt-4 md:mt-0">
                            <span>Chiplun</span>
                            <span>Khed</span>
                            <span>Dapoli</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

// --- Auth Components ---

const RoleCard = ({ icon: Icon, title, subtitle, onClick, active }: { icon: any, title: string, subtitle: string, onClick: () => void, active: boolean }) => (
  <motion.button 
    whileHover={{ scale: 1.02, backgroundColor: '#f0fdfa' }} 
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`w-full p-5 rounded-2xl border transition-all duration-200 flex items-center gap-5 text-left group ${
      active ? 'border-teal bg-teal/5 ring-1 ring-teal shadow-md' : 'border-gray-100 bg-white hover:border-teal/50 hover:shadow-sm'
    }`}
  >
    <div className={`p-4 rounded-full transition-colors ${active ? 'bg-teal text-white' : 'bg-gray-100 text-charcoal group-hover:bg-teal/10 group-hover:text-teal'}`}>
      <Icon size={24} strokeWidth={2.5} />
    </div>
    <div className="flex-1">
      <h3 className={`font-bold text-lg leading-tight ${active ? 'text-teal' : 'text-charcoal'}`}>{title}</h3>
      <p className="text-sm text-slate-grey mt-1 font-medium opacity-80">{subtitle}</p>
    </div>
    <ChevronRight className={`text-gray-300 transition-colors ${active ? 'text-teal' : 'group-hover:text-teal'}`} />
  </motion.button>
);

import { Lock } from 'lucide-react';

const AuthContainer = ({ initialRole, onLoginSuccess, onBack }: { initialRole: string | null, onLoginSuccess: (role: string) => void, onBack: () => void }) => {
  const { loginUser, registerUser } = useGlobal();
  const [step, setStep] = useState<'role' | 'login' | 'otp' | 'signup'>(initialRole ? 'login' : 'role');
  const [role, setRole] = useState<string | null>(initialRole);
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialRole) {
      setRole(initialRole);
      setStep('login');
    }
  }, [initialRole]);

  const handleRoleSelect = (selectedRole: string) => {
    setRole(selectedRole);
    setStep('login');
  };

  const handleLogin = () => {
    setError('');
    if (mobile.length < 10) return setError('Please enter a valid mobile number');
    if (!password) return setError('Please enter your password');

    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      const success = loginUser(mobile, password);
      if (success) {
        onLoginSuccess(role!); // The global state will have the correct role
      } else {
        setError('Invalid credentials. Check mobile or password.');
      }
    }, 1500);
  };

  const handleSignup = () => {
    setError('');
    if (!name || !mobile || !email || !password) return setError('Please fill all fields');
    if (mobile.length < 10) return setError('Please enter a valid mobile number');

    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      const res = registerUser({
        name,
        mobile,
        email,
        password,
        role: role || 'customer',
        restaurantId: role === 'partner' ? 1 : undefined
      });

      if (res.success) {
        onLoginSuccess(role || 'customer');
      } else {
        setError(res.message || 'Signup failed');
      }
    }, 1500);
  };

  const handleSendOtp = () => {
    setError('');
    if (mobile.length < 10) return setError('Please enter a valid mobile number');
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      setStep('otp');
      if (mobile === '9999999999' || mobile === '8888888888' || mobile === '7777777777') {
        setOtp('1234');
      }
    }, 1500);
  };

  const handleVerifyOtp = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      if (role) {
        // For OTP, we skip password check in loginUser
        const success = loginUser(mobile);
        if (success) {
          onLoginSuccess(role);
        } else {
          // If not registered, we can auto-register or show error
          setError('Number not registered. Please sign up.');
          setStep('signup');
        }
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden relative"
      >
        <button 
          onClick={step === 'role' ? onBack : () => setStep('role')}
          className="absolute top-6 left-6 text-gray-400 hover:text-charcoal transition-colors z-10 p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="p-8 pt-20">
          <AnimatePresence mode="wait">
            {step === 'role' && (
              <motion.div 
                key="role"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="mb-8">
                  <h2 className="text-3xl font-extrabold text-charcoal mb-2 tracking-tight">Let's get started</h2>
                  <p className="text-slate-grey font-medium">Select your account type to continue.</p>
                </div>
                
                <div className="space-y-4">
                  <RoleCard 
                    icon={ShoppingBag} 
                    title="Order Food" 
                    subtitle="Hungry? Find the best food near you."
                    onClick={() => handleRoleSelect('customer')} 
                    active={role === 'customer'}
                  />
                  <RoleCard 
                    icon={Store} 
                    title="Partner with us" 
                    subtitle="Grow your business with online orders."
                    onClick={() => handleRoleSelect('partner')} 
                    active={role === 'partner'}
                  />
                  <RoleCard 
                    icon={Bike} 
                    title="Join as a Rider" 
                    subtitle="Earn money delivering smiles."
                    onClick={() => handleRoleSelect('rider')} 
                    active={role === 'rider'}
                  />
                </div>
              </motion.div>
            )}

            {step === 'login' && (
              <motion.div 
                key="login"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="mb-8 text-center">
                  <motion.div 
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="inline-flex p-4 bg-teal/5 rounded-full text-teal mb-4 mx-auto"
                  >
                    {role === 'customer' && <ShoppingBag size={32} strokeWidth={2} />}
                    {role === 'partner' && <Store size={32} strokeWidth={2} />}
                    {role === 'rider' && <Bike size={32} strokeWidth={2} />}
                  </motion.div>
                  <h2 className="text-2xl font-bold text-charcoal">Welcome back!</h2>
                  <p className="text-slate-grey font-medium mt-1">Enter your details to access your {role} account.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-charcoal mb-1.5">Phone Number</label>
                    <div className="relative flex items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-teal focus-within:border-transparent transition-all group">
                       <Phone className="absolute left-4 text-gray-400 group-focus-within:text-teal transition-colors" size={20} />
                      <div className="pl-12 pr-3 py-3.5 text-gray-500 font-bold border-r border-gray-200 bg-gray-100/50 flex items-center">
                        +91
                      </div>
                      <input 
                        type="tel" 
                        maxLength={10}
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                        className="flex-1 bg-transparent px-4 py-3.5 text-charcoal font-bold outline-none placeholder:text-gray-400"
                        placeholder={role === 'customer' ? '9999999999' : role === 'partner' ? '8888888888' : '7777777777'}
                        autoFocus
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-charcoal mb-1.5">Password</label>
                    <div className="relative flex items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-teal focus-within:border-transparent transition-all group">
                       <Lock className="absolute left-4 text-gray-400 group-focus-within:text-teal transition-colors" size={20} />
                       <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="flex-1 bg-transparent pl-12 pr-4 py-3.5 text-charcoal font-bold outline-none placeholder:text-gray-400"
                        placeholder="Enter password"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-xs font-bold flex items-center gap-2">
                       <AlertCircle size={14} /> {error}
                    </div>
                  )}

                  <button 
                    onClick={handleLogin}
                    disabled={isSimulating}
                    className="w-full bg-teal text-white font-bold py-4 rounded-xl hover:bg-teal/90 active:scale-[0.98] transition-all shadow-lg shadow-teal/20 flex items-center justify-center gap-2"
                  >
                    {isSimulating ? <Loader2 className="animate-spin" /> : 'Sign In'}
                  </button>

                  <div className="relative flex items-center py-2">
                    <div className="flex-grow border-t border-gray-100"></div>
                    <span className="flex-shrink mx-4 text-gray-400 text-xs font-bold uppercase tracking-widest">OR</span>
                    <div className="flex-grow border-t border-gray-100"></div>
                  </div>

                  <button 
                    onClick={handleSendOtp}
                    disabled={isSimulating}
                    className="w-full bg-white text-charcoal border border-gray-200 font-bold py-4 rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                  >
                    Login with OTP
                  </button>

                  <div className="text-center pt-2">
                     <p className="text-sm text-slate-grey font-medium">
                        New to Grab A'Treat?{' '}
                        <button onClick={() => setStep('signup')} className="text-teal font-bold hover:underline">
                          Create an account
                        </button>
                     </p>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 'otp' && (
               <motion.div 
               key="otp"
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
             >
               <div className="mb-8 text-center">
                 <h2 className="text-2xl font-bold text-charcoal">Enter Verification Code</h2>
                 <p className="text-slate-grey font-medium mt-2">We've sent a 4-digit code to <br/> <span className="text-charcoal font-bold">+91 {mobile}</span></p>
               </div>

               <div className="space-y-8">
                 <div className="relative">
                   <input 
                     type="text" 
                     maxLength={4}
                     value={otp}
                     onChange={(e) => setOtp(e.target.value)}
                     className="w-full bg-gray-50 border border-gray-200 px-4 py-5 rounded-2xl text-center text-3xl tracking-[0.5em] font-bold text-charcoal outline-none focus:ring-2 focus:ring-teal focus:border-transparent transition-all placeholder:text-gray-300"
                     placeholder="••••"
                     autoFocus
                   />
                 </div>

                 <button 
                   onClick={handleVerifyOtp}
                   disabled={isSimulating}
                   className="w-full bg-teal text-white font-bold py-4 rounded-xl hover:bg-teal/90 active:scale-[0.98] transition-all shadow-lg shadow-teal/20 flex items-center justify-center gap-2"
                   >
                   {isSimulating ? <Loader2 className="animate-spin" /> : 'Verify & Proceed'}
                 </button>

                 <div className="text-center">
                    <button onClick={() => setStep('login')} className="text-sm text-slate-grey hover:text-teal font-medium transition-colors">
                        Wrong number? <span className="underline">Change it</span>
                    </button>
                 </div>
               </div>
             </motion.div>
            )}

             {step === 'signup' && (
              <motion.div 
                key="signup"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                 <div className="mb-8">
                  <h2 className="text-2xl font-bold text-charcoal">Join the family</h2>
                  <p className="text-slate-grey font-medium mt-1 capitalize">Creating a new {role || 'User'} account.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-charcoal mb-1">Full Name</label>
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                          type="text" 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-gray-50 border border-gray-200 pl-11 pr-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-teal transition-all font-medium" 
                          placeholder="Peter Parker" 
                        />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-charcoal mb-1">Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-gray-50 border border-gray-200 pl-11 pr-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-teal transition-all font-medium" 
                          placeholder="john@example.com" 
                        />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-charcoal mb-1">Phone Number</label>
                    <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                          type="tel" 
                          maxLength={10}
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                          className="w-full bg-gray-50 border border-gray-200 pl-11 pr-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-teal transition-all font-medium" 
                          placeholder="9999999999" 
                        />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-charcoal mb-1">Password</label>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                          type="password" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full bg-gray-50 border border-gray-200 pl-11 pr-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-teal transition-all font-medium" 
                          placeholder="Create password" 
                        />
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-xs font-bold flex items-center gap-2">
                       <AlertCircle size={14} /> {error}
                    </div>
                  )}

                  <button 
                    onClick={handleSignup}
                    disabled={isSimulating}
                    className="w-full bg-teal text-white font-bold py-4 rounded-xl hover:bg-teal/90 active:scale-[0.98] transition-all shadow-lg shadow-teal/20 mt-4 flex items-center justify-center"
                  >
                    {isSimulating ? <Loader2 className="animate-spin" /> : 'Create Account'}
                  </button>

                  <div className="text-center pt-2">
                     <p className="text-sm text-slate-grey font-medium">
                        Already have an account?{' '}
                        <button onClick={() => setStep('login')} className="text-teal font-bold hover:underline">
                          Log in
                        </button>
                     </p>
                  </div>
                </div>
              </motion.div>
             )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

// --- Customer Dashboard Components ---

const ProfileModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const { userSession, updateProfile } = useGlobal();
  const [name, setName] = useState(userSession.name);
  const [email, setEmail] = useState(userSession.email);
  const [address, setAddress] = useState(userSession.address);

  const handleSave = () => {
    updateProfile({ name, email, address });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-3xl p-8 z-[110] shadow-2xl"
          >
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-extrabold text-charcoal">My Profile</h3>
                <button onClick={onClose} className="p-2 text-gray-400 hover:bg-gray-100 rounded-full"><X size={24} /></button>
             </div>
             
             <div className="space-y-4">
                <div className="flex flex-col items-center mb-6">
                   <div className="w-24 h-24 bg-teal/10 rounded-full flex items-center justify-center text-teal mb-2">
                      <User size={48} />
                   </div>
                   <div className="bg-yellow-50 px-4 py-1.5 rounded-full border border-yellow-100 flex items-center gap-2">
                      <Star size={14} className="fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-bold text-yellow-700">{userSession.points} Grab Points</span>
                   </div>
                </div>

                <div>
                   <label className="block text-xs font-bold text-slate-grey uppercase mb-1">Full Name</label>
                   <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl font-bold text-charcoal outline-none focus:ring-2 focus:ring-teal" />
                </div>
                <div>
                   <label className="block text-xs font-bold text-slate-grey uppercase mb-1">Email Address</label>
                   <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl font-bold text-charcoal outline-none focus:ring-2 focus:ring-teal" />
                </div>
                <div>
                   <label className="block text-xs font-bold text-slate-grey uppercase mb-1">Mobile Number</label>
                   <input type="text" value={userSession.mobile} disabled className="w-full bg-gray-100 border border-gray-200 p-3 rounded-xl font-bold text-slate-grey outline-none" />
                </div>
                <div>
                   <label className="block text-xs font-bold text-slate-grey uppercase mb-1">Default Address</label>
                   <textarea value={address} onChange={(e) => setAddress(e.target.value)} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl font-bold text-charcoal outline-none focus:ring-2 focus:ring-teal" rows={2} />
                </div>
             </div>

             <button onClick={handleSave} className="w-full bg-teal text-white font-bold py-4 rounded-xl mt-8 shadow-lg shadow-teal/20 hover:bg-teal/90 transition-all">
                Save Changes
             </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const PointsModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const { userSession } = useGlobal();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-3xl p-8 z-[110] shadow-2xl"
          >
             <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                   <div className="w-12 h-12 bg-yellow-400 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-yellow-200">
                      <Star size={24} fill="currentColor" />
                   </div>
                   <h3 className="text-2xl font-extrabold text-charcoal">Grab Points</h3>
                </div>
                <button onClick={onClose} className="p-2 text-gray-400 hover:bg-gray-100 rounded-full"><X size={24} /></button>
             </div>
             
             <div className="text-center mb-10">
                <p className="text-slate-grey font-medium mb-1">Your Current Balance</p>
                <h4 className="text-6xl font-black text-charcoal tracking-tight">{userSession.points}</h4>
                <p className="text-teal font-bold mt-2">Worth ₹{Math.floor(userSession.points / 10)}</p>
             </div>

             <div className="space-y-6">
                <div className="flex gap-4 items-start">
                   <div className="bg-green-100 text-green-600 p-2 rounded-xl mt-1">
                      <Plus size={20} />
                   </div>
                   <div>
                      <p className="font-bold text-charcoal">How to earn?</p>
                      <p className="text-sm text-slate-grey">Get 1 point for every ₹10 spent on any order. Points are credited instantly!</p>
                   </div>
                </div>
                <div className="flex gap-4 items-start">
                   <div className="bg-blue-100 text-blue-600 p-2 rounded-xl mt-1">
                      <Minus size={20} />
                   </div>
                   <div>
                      <p className="font-bold text-charcoal">How to redeem?</p>
                      <p className="text-sm text-slate-grey">Use your points during checkout for instant discounts. 100 points = ₹10.</p>
                   </div>
                </div>
             </div>

             <button onClick={onClose} className="w-full bg-charcoal text-white font-bold py-4 rounded-xl mt-10 hover:bg-charcoal/90 transition-all">
                Got it!
             </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const CustomerHeader = ({ onLogout, onOpenProfile, onOpenPoints }: { onLogout: () => void, onOpenProfile: () => void, onOpenPoints: () => void }) => {
    const { userSession } = useGlobal();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 bg-white z-40 border-b border-gray-100 px-4 py-3 shadow-sm">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.reload()}>
                     <div className="text-teal font-extrabold text-xl tracking-tight">Grab A'Treat</div>
                </div>

                <button className="hidden md:flex items-center gap-2 bg-gray-50 hover:bg-gray-100 text-charcoal px-4 py-2 rounded-full text-sm font-medium transition-colors border border-gray-200">
                    <MapPin size={16} className="text-teal" />
                    <span className="truncate max-w-[200px]">{userSession.address || 'DBJ College, Chiplun'}</span>
                    <ChevronRight size={14} className="text-gray-400" />
                </button>

                <div className="flex items-center gap-4">
                    <button 
                        onClick={onOpenPoints}
                        className="flex items-center gap-2 bg-yellow-50 px-3 py-1.5 rounded-full border border-yellow-100 hover:bg-yellow-100 transition-colors group"
                    >
                        <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center text-white text-[10px] font-bold group-hover:scale-110 transition-transform">
                            <Star size={12} fill="currentColor" />
                        </div>
                        <span className="text-sm font-bold text-yellow-700">{userSession.points} Pts</span>
                    </button>
                    
                    <div className="relative">
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)} 
                            className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-charcoal hover:bg-gray-200 transition-colors"
                        >
                            <User size={18} />
                        </button>
                        
                        <AnimatePresence>
                            {isMenuOpen && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute right-0 top-12 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden py-2 z-50 origin-top-right"
                                >
                                    <div className="px-4 py-2 border-b border-gray-50 mb-1">
                                        <p className="text-sm font-bold text-charcoal">{userSession.name || 'Peter Parker'}</p>
                                        <p className="text-xs text-slate-grey">+91 {userSession.mobile || '9999999999'}</p>
                                    </div>
                                    <button 
                                      onClick={() => { setIsMenuOpen(false); onOpenProfile(); }}
                                      className="w-full text-left px-4 py-2.5 text-sm text-charcoal hover:bg-gray-50 flex items-center gap-3 transition-colors"
                                    >
                                        <User size={16} className="text-gray-400" /> My Profile
                                    </button>
                                     <button 
                                        onClick={() => {
                                            const historyTab = document.querySelector('[data-tab="history"]') as HTMLButtonElement;
                                            if (historyTab) historyTab.click();
                                            setIsMenuOpen(false);
                                        }}
                                        className="w-full text-left px-4 py-2.5 text-sm text-charcoal hover:bg-gray-50 flex items-center gap-3 transition-colors"
                                     >
                                        <ShoppingBag size={16} className="text-gray-400" /> Previous Orders
                                    </button>
                                     <button 
                                        onClick={() => {
                                            const favsTab = document.querySelector('[data-tab="favs"]') as HTMLButtonElement;
                                            if (favsTab) favsTab.click();
                                            setIsMenuOpen(false);
                                        }}
                                        className="w-full text-left px-4 py-2.5 text-sm text-charcoal hover:bg-gray-50 flex items-center gap-3 transition-colors"
                                      >
                                        <Heart size={16} className="text-gray-400" /> Favorites
                                    </button>
                                    <div className="h-px bg-gray-100 my-1 mx-4"></div>
                                    <button 
                                        onClick={onLogout}
                                        className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 font-bold flex items-center gap-3 transition-colors"
                                    >
                                        <LogOut size={16} /> Log out
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
            
            <div className="md:hidden mt-3 flex items-center justify-center">
                 <button className="flex items-center gap-2 text-charcoal text-sm font-medium">
                    <MapPin size={14} className="text-teal" />
                    <span>DBJ College, Chiplun</span>
                    <ChevronRight size={14} className="text-gray-400" />
                </button>
            </div>
        </header>
    )
}

const TrainSearchSection = ({ isTrainMode, onToggle }: { isTrainMode: boolean, onToggle: (val: boolean) => void }) => {
    return (
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center px-1">
                     <h3 className="text-lg font-bold text-charcoal">What are you craving?</h3>
                     <div className="flex items-center gap-3">
                        <span className={`text-xs font-bold ${isTrainMode ? 'text-teal' : 'text-gray-400'}`}>Deliver to Train?</span>
                        <button 
                            onClick={() => onToggle(!isTrainMode)}
                            className={`w-12 h-7 rounded-full flex items-center p-1 transition-colors duration-300 ${isTrainMode ? 'bg-teal' : 'bg-gray-200'}`}
                        >
                            <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-300 flex items-center justify-center ${isTrainMode ? 'translate-x-5' : 'translate-x-0'}`}>
                                <Train size={12} className={isTrainMode ? 'text-teal' : 'text-gray-400'} />
                            </div>
                        </button>
                     </div>
                </div>

                <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        {isTrainMode ? <Train size={20} /> : <Search size={20} />}
                    </div>
                    <input 
                        type="text" 
                        placeholder={isTrainMode ? "Enter PNR or Train Number (e.g. 12051)" : "Search for 'Biryani' or 'The Konkan Crust'"} 
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl text-charcoal outline-none focus:ring-2 focus:ring-teal transition-all placeholder:text-gray-400 font-medium"
                    />
                </div>
            </div>
        </div>
    )
}

const CategoryItem = ({ name, image, isActive, onClick }: { name: string, image: string, isActive: boolean, onClick: () => void }) => (
    <motion.button 
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className="flex flex-col items-center gap-2 min-w-[80px] cursor-pointer group outline-none"
    >
        <div className={`w-20 h-20 rounded-full overflow-hidden border-2 transition-all p-0.5 ${isActive ? 'border-teal shadow-lg shadow-teal/20 scale-105' : 'border-transparent group-hover:border-teal/50'}`}>
            <img src={image} alt={name} className="w-full h-full object-cover rounded-full" />
        </div>
        <span className={`text-sm font-bold transition-colors ${isActive ? 'text-teal' : 'text-charcoal group-hover:text-teal'}`}>{name}</span>
    </motion.button>
)

const RestaurantCard = ({ data, onClick, className }: { data: any, onClick: () => void, className?: string }) => {
    const { restaurantOnlineStatus, userSession, toggleFavorite } = useGlobal();
    const isFav = userSession.favorites.includes(data.id);
    const status = restaurantOnlineStatus[data.id] || 'AVAILABLE';
    const isClosed = status === 'OFFLINE';
    const isBusy = status === 'BUSY';
    const isUnavailable = isClosed || isBusy;

    return (
        <motion.div 
            layoutId={`restaurant-${data.id}`}
            whileHover={!isUnavailable ? { y: -5 } : {}}
            onClick={!isUnavailable ? onClick : undefined}
            className={`bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm transition-all relative group ${!isUnavailable ? 'hover:shadow-lg cursor-pointer' : 'grayscale cursor-not-allowed'} ${className || 'min-w-[280px] md:min-w-[320px]'}`}
        >
            <div className="h-48 relative overflow-hidden">
                <img src={data.image} alt={data.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {isUnavailable && (
                  <div className={`absolute inset-0 ${isClosed ? 'bg-black/50' : 'bg-orange-900/40'} flex items-center justify-center z-10 backdrop-blur-[1px]`}>
                     <div className="flex flex-col items-center gap-2">
                        <span className={`px-4 py-2 rounded-xl font-extrabold text-sm shadow-2xl tracking-tight uppercase ${isClosed ? 'bg-white text-charcoal' : 'bg-orange-500 text-white border border-orange-400'}`}>
                            {isClosed ? 'Closed Now' : 'Busy - High Demand'}
                        </span>
                        {isBusy && <span className="text-[10px] font-bold text-white bg-black/40 px-2 py-1 rounded-md backdrop-blur-md">Try again later</span>}
                     </div>
                  </div>
                )}

                <div className="absolute top-3 right-3 flex gap-2 z-20">
                    <button 
                        onClick={(e) => { e.stopPropagation(); toggleFavorite(data.id); }}
                        className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/40 transition-colors shadow-lg"
                    >
                        <Heart size={18} className={isFav ? "fill-red-500 text-red-500" : "text-white"} />
                    </button>
                </div>

                <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
                    <div className="bg-white px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                        <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-[10px] text-white">★</div>
                        <span className="text-xs font-bold text-charcoal">{data.rating}</span>
                    </div>
                    <div className="text-white text-xs font-medium bg-black/40 px-2 py-1 rounded-lg backdrop-blur-md flex items-center gap-1">
                        <Clock size={12} /> {data.time}
                    </div>
                </div>

                {!isClosed && data.offer && (
                     <div className="absolute top-3 left-0 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-r-full shadow-md uppercase tracking-wide">
                        {data.offer}
                    </div>
                )}
                {data.isPureVeg && (
                   <div className="absolute top-10 left-0 bg-green-600 text-white text-[10px] font-bold px-3 py-1 rounded-r-full shadow-md uppercase tracking-wide">
                      Pure Veg
                   </div>
                )}
            </div>
            
            <div className="p-4">
                <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-bold text-charcoal truncate">{data.name}</h3>
                </div>
                <p className="text-sm text-slate-grey mb-3 truncate">{data.tags.join(", ")}</p>
                <div className="border-t border-gray-100 pt-3 flex items-center gap-2 text-xs font-medium text-teal">
                    <Flame size={14} fill="currentColor" />
                    <span>250+ people ordered recently</span>
                </div>
            </div>
        </motion.div>
    );
};

const FloatingCartFab = ({ itemCount, onClick }: { itemCount: number, onClick: () => void }) => {
    if (itemCount === 0) return null;
    
    return (
        <motion.button 
            initial={{ y: 100, opacity: 0, scale: 0.5 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClick}
            className="fixed right-6 bottom-6 bg-teal text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center z-[60] group border-4 border-white"
        >
            <div className="relative">
                <ShoppingBag size={28} />
                <span className="absolute -top-3 -right-3 bg-charcoal text-white text-[10px] font-extrabold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
                    {itemCount}
                </span>
            </div>
        </motion.button>
    )
}

const MenuItem = ({ item }: { item: any }) => {
    const { cartItems, addToCart, removeFromCart } = useGlobal();
    const quantity = cartItems.find(i => i.name === item.name)?.quantity || 0;

    return (
        <div className="flex justify-between items-start py-6 border-b border-gray-100 last:border-0 group">
            <div className="flex-1 pr-4">
                 <div className="flex items-center gap-2 mb-1">
                    <div className={`w-4 h-4 border ${item.isVeg ? 'border-green-600' : 'border-red-600'} flex items-center justify-center p-0.5`}>
                         <div className={`w-full h-full rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`}></div>
                    </div>
                    {quantity > 0 && <span className="text-xs font-bold text-teal bg-teal/5 px-2 py-0.5 rounded-full">{quantity}x</span>}
                 </div>
                 <h4 className="font-extrabold text-charcoal text-lg mb-1">{item.name}</h4>
                 <p className="text-sm font-bold text-charcoal mb-2">₹{item.price}</p>
                 <p className="text-sm text-slate-grey line-clamp-3 md:line-clamp-2 leading-relaxed">{item.desc}</p>
            </div>
            <div className="relative w-36 h-32 md:w-32 md:h-28 shrink-0 ml-4">
                <img 
                    src={item.image || "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=2070&auto=format&fit=crop"} 
                    className="w-full h-full object-cover rounded-2xl shadow-sm group-hover:shadow-md transition-shadow" 
                    alt={item.name} 
                />
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 shadow-[0_4px_12px_rgba(0,0,0,0.1)] rounded-xl bg-white overflow-hidden border border-gray-100 flex items-center z-10 min-w-[100px] justify-center h-10">
                    {quantity === 0 ? (
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                addToCart({ name: item.name, price: item.price, isVeg: item.isVeg });
                            }}
                            className="w-full h-full text-teal font-extrabold text-sm hover:bg-teal/5 transition-colors uppercase tracking-wider"
                        >
                            Add
                        </button>
                    ) : (
                        <div className="flex items-center w-full h-full">
                             <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeFromCart(item.name);
                                }} 
                                className="flex-1 h-full flex items-center justify-center text-charcoal hover:bg-gray-100 transition-colors"
                             >
                                <Minus size={16} />
                             </button>
                             <span className="font-extrabold text-teal w-8 text-center text-sm">{quantity}</span>
                             <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    addToCart({ name: item.name, price: item.price, isVeg: item.isVeg });
                                }} 
                                className="flex-1 h-full flex items-center justify-center text-charcoal hover:bg-gray-100 transition-colors"
                             >
                                <Plus size={16} />
                             </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

// CartSummary removed

const CheckoutModal = ({ 
  isOpen, 
  onClose, 
  items, 
  onOrderSuccess,
  restaurantId,
  restaurantName
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  items: OrderItem[]; 
  onOrderSuccess: (orderData: any) => void;
  restaurantId: number;
  restaurantName: string;
}) => {
  const { placeOrder, userSession, availableCoupons, redeemPoints, claimedCoupon } = useGlobal();
  const [step, setStep] = useState<'details' | 'payment'>('details');
  const [orderType, setOrderType] = useState<OrderType>('HOME');
  const [pnr, setPnr] = useState('');
  const [coachSeat, setCoachSeat] = useState('');
  const [address, setAddress] = useState(userSession.address);
  const [tip, setTip] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [manualCoupon, setManualCoupon] = useState('');
  const [couponError, setCouponError] = useState('');
  const [usePoints, setUsePoints] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'CARD' | 'COD'>('UPI');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const itemTotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Auto-apply claimed coupon
  useEffect(() => {
    if (isOpen && claimedCoupon && !appliedCoupon) {
      const coupon = availableCoupons.find(c => c.code === claimedCoupon);
      if (coupon && itemTotal >= coupon.minOrder) {
        setAppliedCoupon(coupon);
        setManualCoupon(coupon.code);
      }
    }
  }, [claimedCoupon, isOpen, itemTotal, availableCoupons, appliedCoupon]);
  const deliveryFee = orderType === 'TRAIN' ? 40 : 20;
  const gst = Math.round(itemTotal * 0.05); // 5% GST
  const platformFee = 5;
  
  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;
    if (itemTotal < appliedCoupon.minOrder) return 0;
    
    if (appliedCoupon.type === 'FLAT') {
      return appliedCoupon.discount;
    } else {
      let disc = (itemTotal * appliedCoupon.discount) / 100;
      if (appliedCoupon.maxDiscount) {
        disc = Math.min(disc, appliedCoupon.maxDiscount);
      }
      return disc;
    }
  };

  const pointsDiscount = usePoints ? Math.min(Math.floor(userSession.points / 10), itemTotal) : 0;
  const discount = calculateDiscount();
  const totalPayable = Math.max(0, itemTotal + gst + platformFee + deliveryFee + tip - discount - pointsDiscount);

  const pointsToRedeem = pointsDiscount * 10;

  const handleApplyManualCoupon = () => {
    setCouponError('');
    const code = manualCoupon.toUpperCase().trim();
    if (!code) return;

    const coupon = availableCoupons.find(c => c.code === code);
    if (!coupon) {
      setCouponError('Invalid coupon code');
      return;
    }

    if (itemTotal < coupon.minOrder) {
      setCouponError(`Min order value: ₹${coupon.minOrder}`);
      return;
    }

    setAppliedCoupon(coupon);
    setManualCoupon('');
  };

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      
      if (usePoints) {
        redeemPoints(pointsToRedeem);
      }

      const orderData = {
        items,
        totalPrice: totalPayable,
        type: orderType,
        restaurantId: restaurantId,
        restaurantName: restaurantName,
        customerName: userSession.name || 'Peter Parker',
        address: orderType === 'HOME' ? address : undefined,
        pnr: orderType === 'TRAIN' ? pnr : undefined,
        coach: orderType === 'TRAIN' ? coachSeat.split('-')[0]?.trim() : undefined,
        seat: orderType === 'TRAIN' ? coachSeat.split('-')[1]?.trim() : undefined,
        tip: tip > 0 ? tip : undefined
      };

      placeOrder(orderData);

      setTimeout(() => {
        setShowSuccess(false);
        onOrderSuccess(orderData);
        onClose();
      }, 2000);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70]"
          />
          <motion.div 
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[2.5rem] z-[80] max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 md:p-8 max-w-2xl mx-auto">
               {showSuccess ? (
                  <div className="text-center py-16">
                    <motion.div 
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600"
                    >
                      <CheckCircle2 size={48} />
                    </motion.div>
                    <h3 className="text-3xl font-extrabold text-charcoal mb-2">Payment Successful!</h3>
                    <p className="text-slate-grey text-lg">Your order has been placed successfully.</p>
                  </div>
               ) : isProcessing ? (
                  <div className="text-center py-20">
                     <Loader2 className="animate-spin text-teal mx-auto mb-6" size={60} />
                     <h3 className="text-2xl font-bold text-charcoal">Processing Payment</h3>
                     <p className="text-slate-grey mt-2">Connecting to your bank securely...</p>
                  </div>
               ) : (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-extrabold text-charcoal">
                      {step === 'details' ? 'Delivery Details' : 'Payment'}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400"><X size={24} /></button>
                  </div>

                  {step === 'details' ? (
                    <div className="space-y-6">
                      <div className="bg-teal/5 p-4 rounded-2xl flex justify-between items-center border border-teal/10">
                        <div className="flex items-center gap-3">
                          <div className="bg-teal text-white p-2 rounded-lg">
                            <Train size={20} />
                          </div>
                          <div>
                            <p className="font-bold text-charcoal text-sm">I am on a Train</p>
                            <p className="text-xs text-slate-grey">Deliver to Chiplun Station</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => setOrderType(orderType === 'HOME' ? 'TRAIN' : 'HOME')}
                          className={`w-12 h-6 rounded-full transition-colors relative ${orderType === 'TRAIN' ? 'bg-teal' : 'bg-gray-200'}`}
                        >
                          <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${orderType === 'TRAIN' ? 'translate-x-6' : 'translate-x-0'}`} />
                        </button>
                      </div>

                      {orderType === 'TRAIN' ? (
                        <div className="grid grid-cols-2 gap-4">
                          <div className="col-span-2">
                             <label className="block text-xs font-bold text-slate-grey uppercase tracking-wider mb-2">10-Digit PNR Number</label>
                             <input 
                              type="text" 
                              maxLength={10}
                              value={pnr}
                              onChange={(e) => setPnr(e.target.value.replace(/\D/g, ''))}
                              placeholder="e.g. 1234567890"
                              className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl outline-none focus:ring-2 focus:ring-teal transition-all font-bold"
                             />
                          </div>
                          <div className="col-span-2">
                             <label className="block text-xs font-bold text-slate-grey uppercase tracking-wider mb-2">Coach & Seat (e.g. B4 - 21)</label>
                             <input 
                              type="text" 
                              value={coachSeat}
                              onChange={(e) => setCoachSeat(e.target.value)}
                              placeholder="e.g. B4 - 21"
                              className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl outline-none focus:ring-2 focus:ring-teal transition-all font-bold"
                             />
                          </div>
                        </div>
                      ) : (
                        <div>
                           <label className="block text-xs font-bold text-slate-grey uppercase tracking-wider mb-2">Delivery Address</label>
                           <textarea 
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            rows={3}
                            className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl outline-none focus:ring-2 focus:ring-teal transition-all font-bold"
                           />
                        </div>
                      )}

                      <div>
                        <label className="block text-xs font-bold text-slate-grey uppercase tracking-wider mb-3">Tip your Rider</label>
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                          {[0, 10, 20, 50].map((amount) => (
                            <button 
                              key={amount}
                              onClick={() => setTip(amount)}
                              className={`px-6 py-3 rounded-full border font-bold transition-all whitespace-nowrap ${tip === amount ? 'bg-teal text-white border-teal shadow-md shadow-teal/20' : 'bg-white text-charcoal border-gray-200 hover:border-teal/50'}`}
                            >
                              {amount === 0 ? 'Not now' : `₹${amount}`}
                            </button>
                          ))}
                        </div>
                      </div>

                      {userSession.points >= 100 && (
                        <div className="bg-yellow-50 p-4 rounded-2xl border border-yellow-100 flex justify-between items-center">
                           <div className="flex items-center gap-3">
                              <div className="bg-yellow-400 text-white p-2 rounded-lg">
                                 <Star size={20} fill="currentColor" />
                              </div>
                              <div>
                                 <p className="font-bold text-charcoal text-sm">Use Grab Points</p>
                                 <p className="text-xs text-yellow-700">You have {userSession.points} points</p>
                              </div>
                           </div>
                           <button 
                            onClick={() => setUsePoints(!usePoints)}
                            className={`w-12 h-6 rounded-full transition-colors relative ${usePoints ? 'bg-yellow-500' : 'bg-gray-200'}`}
                           >
                             <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${usePoints ? 'translate-x-6' : 'translate-x-0'}`} />
                           </button>
                        </div>
                      )}

                      <div>
                        <label className="block text-xs font-bold text-slate-grey uppercase tracking-wider mb-3">Coupons & Offers</label>
                        
                        {/* Manual Entry */}
                        <div className="flex gap-2 mb-4">
                           <div className="flex-1 relative">
                              <input 
                                type="text" 
                                placeholder="Enter code (e.g. CHIPLUN)"
                                value={manualCoupon}
                                onChange={(e) => setManualCoupon(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-teal transition-all font-bold placeholder:font-normal uppercase"
                              />
                              {appliedCoupon && (
                                <button 
                                  onClick={() => setAppliedCoupon(null)}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-red-500 hover:underline"
                                >
                                  REMOVE
                                </button>
                              )}
                           </div>
                           <button 
                            onClick={handleApplyManualCoupon}
                            className="bg-teal text-white px-6 rounded-xl font-bold text-sm hover:bg-teal/90 transition-colors"
                           >
                            Apply
                           </button>
                        </div>
                        
                        {couponError && <p className="text-xs text-red-500 font-bold mb-3 flex items-center gap-1"><AlertCircle size={12} /> {couponError}</p>}

                        <div className="space-y-3">
                           {availableCoupons.map((coupon) => {
                              const isEligible = itemTotal >= coupon.minOrder;
                              const isSelected = appliedCoupon?.code === coupon.code;
                              
                              return (
                                <button 
                                  key={coupon.code}
                                  disabled={!isEligible}
                                  onClick={() => {
                                    if (isSelected) {
                                      setAppliedCoupon(null);
                                      setManualCoupon('');
                                    } else {
                                      setAppliedCoupon(coupon);
                                      setManualCoupon(coupon.code);
                                      setCouponError('');
                                    }
                                  }}
                                  className={`w-full p-4 rounded-xl border text-left transition-all relative group ${
                                    isSelected 
                                      ? 'border-teal bg-teal/5 ring-1 ring-teal' 
                                      : isEligible 
                                        ? 'border-gray-200 hover:border-teal/30' 
                                        : 'border-gray-100 bg-gray-50/50 opacity-60 cursor-not-allowed'
                                  }`}
                                >
                                  <div className="flex justify-between items-center">
                                      <span className={`font-extrabold ${isSelected ? 'text-teal' : 'text-charcoal'}`}>{coupon.code}</span>
                                      {isSelected && <CheckCircle2 size={16} className="text-teal" />}
                                  </div>
                                  <p className="text-xs text-slate-grey mt-1">{coupon.description}</p>
                                  {!isEligible && (
                                    <p className="text-[10px] text-red-500 font-bold mt-2">
                                      Add ₹{coupon.minOrder - itemTotal} more to use this
                                    </p>
                                  )}
                                </button>
                              );
                           })}
                        </div>
                      </div>

                      <div className="border-t border-gray-100 pt-6">
                        <div className="bg-gray-50 p-4 rounded-2xl mb-4 space-y-2">
                           <div className="flex justify-between text-xs font-bold text-slate-grey uppercase tracking-wider">
                              <span>Bill Summary</span>
                              <button onClick={() => setStep('payment')} className="text-teal underline">View Full Breakdown</button>
                           </div>
                           <div className="flex justify-between text-sm text-charcoal">
                              <span>Item Total</span>
                              <span>₹{itemTotal}</span>
                           </div>
                           {discount > 0 && (
                              <div className="flex justify-between text-sm text-green-600 font-bold">
                                <span>Discount</span>
                                <span>-₹{discount}</span>
                              </div>
                           )}
                           {pointsDiscount > 0 && (
                              <div className="flex justify-between text-sm text-yellow-600 font-bold">
                                <span>Points Redeemed ({pointsToRedeem})</span>
                                <span>-₹{pointsDiscount}</span>
                              </div>
                           )}
                           <div className="flex justify-between text-sm text-charcoal font-bold pt-1 border-t border-gray-200">
                              <span>Total Payable</span>
                              <span>₹{totalPayable}</span>
                           </div>
                        </div>
                        <button 
                          onClick={() => setStep('payment')}
                          className="w-full bg-teal text-white font-extrabold py-5 rounded-2xl shadow-xl shadow-teal/20 flex items-center justify-center gap-3 text-lg hover:bg-teal/90 transition-all"
                        >
                          Proceed to Pay <ArrowRight size={20} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                       <div className="bg-white border border-gray-100 p-6 rounded-3xl mb-6 shadow-sm space-y-3">
                          <h4 className="text-xs font-bold text-slate-grey uppercase tracking-widest border-b border-gray-50 pb-2 mb-3">Detailed Bill</h4>
                          <div className="flex justify-between text-sm text-charcoal font-medium">
                            <span>Item Total</span>
                            <span>₹{itemTotal}</span>
                          </div>
                          <div className="flex justify-between text-sm text-slate-grey">
                            <span className="flex items-center gap-1">GST (5%) <Info size={12} /></span>
                            <span>₹{gst}</span>
                          </div>
                          <div className="flex justify-between text-sm text-slate-grey">
                            <span className="flex items-center gap-1">Platform Fee <Info size={12} /></span>
                            <span>₹{platformFee}</span>
                          </div>
                          <div className="flex justify-between text-sm text-slate-grey">
                            <span className="flex items-center gap-1">Delivery Fee <Info size={12} /></span>
                            <span>₹{deliveryFee}</span>
                          </div>
                          {tip > 0 && (
                            <div className="flex justify-between text-sm text-slate-grey">
                              <span>Rider Tip</span>
                              <span>₹{tip}</span>
                            </div>
                          )}
                          {discount > 0 && (
                            <div className="flex justify-between text-sm text-green-600 font-bold bg-green-50 p-2 rounded-lg mt-2">
                              <span>Coupon Discount ({appliedCoupon.code})</span>
                              <span>-₹{discount}</span>
                            </div>
                          )}
                          {pointsDiscount > 0 && (
                            <div className="flex justify-between text-sm text-yellow-600 font-bold bg-yellow-50 p-2 rounded-lg mt-2">
                              <span>Points Redeemed ({pointsToRedeem})</span>
                              <span>-₹{pointsDiscount}</span>
                            </div>
                          )}
                          <div className="border-t-2 border-dashed border-gray-100 pt-4 flex justify-between text-xl font-extrabold text-charcoal">
                            <span>Total Payable</span>
                            <span className="text-teal">₹{totalPayable}</span>
                          </div>
                          <p className="text-[10px] text-slate-grey text-center mt-4">Inclusive of all taxes and fees</p>
                       </div>

                       <div className="space-y-4">
                          <button 
                            onClick={() => setPaymentMethod('UPI')}
                            className={`w-full p-5 rounded-2xl border flex items-center justify-between transition-all ${paymentMethod === 'UPI' ? 'border-teal bg-teal/5 ring-1 ring-teal' : 'border-gray-200 bg-white'}`}
                          >
                             <div className="flex items-center gap-4">
                                <div className="bg-orange-50 text-orange-600 p-2 rounded-lg">
                                   <Zap size={20} />
                                </div>
                                <div className="text-left">
                                   <p className="font-bold text-charcoal">UPI (Google Pay / PhonePe)</p>
                                   <p className="text-xs text-slate-grey">Instant & Secure Payment</p>
                                </div>
                             </div>
                             {paymentMethod === 'UPI' && <CheckCircle2 size={16} className="text-teal" />}
                          </button>

                          <button 
                            onClick={() => setPaymentMethod('CARD')}
                            className={`w-full p-5 rounded-2xl border flex items-center justify-between transition-all ${paymentMethod === 'CARD' ? 'border-teal bg-teal/5 ring-1 ring-teal' : 'border-gray-200 bg-white'}`}
                          >
                             <div className="flex items-center gap-4">
                                <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
                                   <CreditCard size={20} />
                                </div>
                                <div className="text-left">
                                   <p className="font-bold text-charcoal">Credit / Debit Card</p>
                                   <p className="text-xs text-slate-grey">All major cards accepted</p>
                                </div>
                             </div>
                             {paymentMethod === 'CARD' && <CheckCircle2 size={16} className="text-teal" />}
                          </button>

                          <button 
                            onClick={() => setPaymentMethod('COD')}
                            className={`w-full p-5 rounded-2xl border flex items-center justify-between transition-all ${paymentMethod === 'COD' ? 'border-teal bg-teal/5 ring-1 ring-teal' : 'border-gray-200 bg-white'}`}
                          >
                             <div className="flex items-center gap-4">
                                <div className="bg-green-50 text-green-600 p-2 rounded-lg">
                                   <Banknote size={20} />
                                </div>
                                <div className="text-left">
                                   <p className="font-bold text-charcoal">Cash on Delivery</p>
                                   <p className="text-xs text-slate-grey">Pay when your food arrives</p>
                                </div>
                             </div>
                             {paymentMethod === 'COD' && <CheckCircle2 size={16} className="text-teal" />}
                          </button>
                       </div>

                       <div className="flex gap-4 pt-4">
                          <button 
                            onClick={() => setStep('details')}
                            className="flex-1 bg-gray-100 text-charcoal font-bold py-5 rounded-2xl hover:bg-gray-200 transition-all"
                          >
                            Back
                          </button>
                          <button 
                            onClick={handlePayment}
                            className="flex-[2] bg-teal text-white font-extrabold py-5 rounded-2xl shadow-xl shadow-teal/20 flex items-center justify-center gap-3 text-lg hover:bg-teal/90 transition-all"
                          >
                            Pay ₹{totalPayable}
                          </button>
                       </div>
                    </div>
                  )}
                </>
               )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const CartModal = ({ 
  items, 
  isOpen, 
  onClose, 
  onAdd, 
  onRemove,
  onProceedToCheckout
}: { 
  items: any[], 
  isOpen: boolean, 
  onClose: () => void, 
  onAdd: (item: any) => void, 
  onRemove: (name: string) => void,
  onProceedToCheckout: () => void
}) => {
  const totalPrice = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70]"
          />
          <motion.div 
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[2.5rem] z-[80] max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 md:p-8 max-w-2xl mx-auto">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-extrabold text-charcoal">Your Cart</h2>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400"><X size={24} /></button>
              </div>

              {items.length === 0 ? (
                <div className="text-center py-12">
                   <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                      <ShoppingBag size={40} />
                   </div>
                   <h3 className="text-xl font-bold text-charcoal mb-2">Cart is empty</h3>
                   <p className="text-slate-grey mb-8">Looks like you haven't added anything yet.</p>
                   <button onClick={onClose} className="bg-teal text-white font-bold py-3 px-8 rounded-xl">Go back</button>
                </div>
              ) : (
                <>
                  <div className="space-y-6 mb-8">
                    {items.map((item) => (
                      <div key={item.name} className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 border ${item.isVeg ? 'border-green-600' : 'border-red-600'} flex items-center justify-center p-0.5`}>
                            <div className={`w-full h-full rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`}></div>
                          </div>
                          <div>
                            <p className="font-bold text-charcoal">{item.name}</p>
                            <p className="text-sm text-slate-grey">₹{item.price}</p>
                          </div>
                        </div>
                        <div className="flex items-center bg-gray-50 rounded-lg border border-gray-100">
                          <button onClick={() => onRemove(item.name)} className="p-2 text-charcoal hover:text-teal"><Minus size={14} /></button>
                          <span className="w-8 text-center font-bold text-teal text-sm">{item.quantity}</span>
                          <button onClick={() => onAdd(item)} className="p-2 text-charcoal hover:text-teal"><Plus size={14} /></button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-6 space-y-3 mb-8">
                    <div className="flex justify-between text-sm text-slate-grey">
                      <span>Item Total</span>
                      <span>₹{totalPrice}</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-grey">
                      <span>Standard Delivery</span>
                      <span>₹20</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3 flex justify-between font-extrabold text-lg text-charcoal">
                      <span>Subtotal</span>
                      <span>₹{totalPrice + 20}</span>
                    </div>
                  </div>

                  <button 
                    onClick={onProceedToCheckout}
                    className="w-full bg-teal text-white font-extrabold py-5 rounded-2xl shadow-xl shadow-teal/20 flex items-center justify-center gap-3 text-lg hover:bg-teal/90 transition-all"
                  >
                    Proceed to Checkout <ArrowRight size={20} />
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

const RestaurantDetails = ({ restaurant, onBack }: { restaurant: any, onBack: () => void }) => {

    // Group items by category
    const menuByCategory = restaurant.menu.reduce((acc: any, item: any) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
    }, {});

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-50 overflow-y-auto"
        >
            <div className="relative h-64 md:h-80">
                <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>
                
                <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center text-white">
                     <button onClick={onBack} className="w-10 h-10 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-black/40 transition-colors">
                        <ArrowLeft size={20} />
                     </button>
                     <div className="flex gap-3">
                         <button className="w-10 h-10 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-black/40 transition-colors">
                            <Share2 size={20} />
                         </button>
                         <button className="w-10 h-10 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-black/40 transition-colors">
                            <Heart size={20} />
                         </button>
                     </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                     <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2 shadow-sm">{restaurant.name}</h1>
                     <p className="text-white/90 text-lg font-medium">{restaurant.tags.join(" • ")}</p>
                </div>
            </div>

            <div className="border-b border-gray-100 sticky top-0 bg-white z-40 shadow-sm">
                 <div className="max-w-3xl mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex gap-6">
                        <div>
                            <p className="text-xs text-slate-grey font-bold uppercase tracking-wider mb-0.5">Rating</p>
                            <div className="flex items-center gap-1 font-bold text-charcoal">
                                <Star size={16} className="fill-green-600 text-green-600" />
                                {restaurant.rating} <span className="text-gray-400 font-normal text-xs">(1K+)</span>
                            </div>
                        </div>
                         <div>
                            <p className="text-xs text-slate-grey font-bold uppercase tracking-wider mb-0.5">Time</p>
                            <div className="flex items-center gap-1 font-bold text-charcoal">
                                <Clock size={16} />
                                {restaurant.time}
                            </div>
                        </div>
                         <div>
                            <p className="text-xs text-slate-grey font-bold uppercase tracking-wider mb-0.5">Cost</p>
                            <div className="flex items-center gap-1 font-bold text-charcoal">
                                ₹200 for two
                            </div>
                        </div>
                    </div>
                 </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8 pb-32">
                <div className="flex items-center gap-2 mb-8 bg-gray-50 p-3 rounded-xl text-sm text-slate-grey">
                    <Info size={16} className="text-teal shrink-0" />
                    <span>Prices are exclusive of GST. 5% GST applicable.</span>
                </div>

                <div className="space-y-12">
                    {Object.keys(menuByCategory).map((category) => (
                        <div key={category}>
                            <h3 className="text-xl font-extrabold text-charcoal mb-6 flex items-center gap-2">
                                {category} <span className="text-teal text-sm font-bold bg-teal/5 px-2 py-0.5 rounded-full">{menuByCategory[category].length}</span>
                            </h3>
                            <div>
                                {menuByCategory[category].map((item: any) => (
                                    <MenuItem 
                                        key={item.id}
                                        item={item}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}

const ReviewModal = ({ isOpen, onClose, onSubmit, orderId }: { isOpen: boolean, onClose: () => void, onSubmit: (rating: number, comment: string) => void, orderId: string }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" />
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-3xl p-8 z-[110] shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-extrabold text-charcoal">Rate your Order</h3>
              <button onClick={onClose} className="p-2 text-gray-400 hover:bg-gray-100 rounded-full"><X size={24} /></button>
            </div>
            <p className="text-slate-grey mb-6">How was your experience with order {orderId}?</p>
            <div className="flex justify-center gap-2 mb-8">
              {[1, 2, 3, 4, 5].map((num) => (
                <button key={num} onClick={() => setRating(num)} className={`p-2 transition-colors ${rating >= num ? 'text-yellow-400' : 'text-gray-200'}`}>
                  <Star size={32} fill={rating >= num ? "currentColor" : "none"} />
                </button>
              ))}
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us what you liked or what could be better..."
              className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl outline-none focus:ring-2 focus:ring-teal mb-6 h-32 resize-none"
            />
            <button
              onClick={() => { onSubmit(rating, comment); onClose(); }}
              className="w-full bg-teal text-white font-bold py-4 rounded-xl shadow-lg hover:bg-teal/90 transition-all"
            >
              Submit Review
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const RefundModal = ({ isOpen, onClose, onSubmit, orderId }: { isOpen: boolean, onClose: () => void, onSubmit: (reason: string) => void, orderId: string }) => {
  const [reason, setReason] = useState('');

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" />
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-3xl p-8 z-[110] shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-extrabold text-charcoal text-red-600">Request Refund</h3>
              <button onClick={onClose} className="p-2 text-gray-400 hover:bg-gray-100 rounded-full"><X size={24} /></button>
            </div>
            <p className="text-slate-grey mb-6">Please provide a reason for your refund request for order {orderId}. This will be sent to the restaurant for approval.</p>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Items missing, poor quality, delayed delivery..."
              className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl outline-none focus:ring-2 focus:ring-teal mb-6 h-32 resize-none"
            />
            <button
              onClick={() => { onSubmit(reason); onClose(); }}
              className="w-full bg-red-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-red-700 transition-all"
            >
              Send Request
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const OrderTracker = ({ order, onBack }: { order: any, onBack: () => void }) => {
  return (
    <div className="bg-white min-h-screen">
       <div className="p-4 flex items-center gap-4 border-b border-gray-100">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full text-gray-400"><ArrowLeft size={24} /></button>
          <div>
            <h2 className="text-xl font-extrabold text-charcoal">Tracking Order</h2>
            <p className="text-sm text-slate-grey font-medium">{order.id} • {order.restaurantName}</p>
          </div>
       </div>

       <div className="relative h-[400px] bg-gray-100 flex items-center justify-center overflow-hidden">
          {/* Mock Map */}
          <div className="absolute inset-0 opacity-40">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="gray" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          
          <div className="relative z-10">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-16 h-16 bg-teal/20 rounded-full animate-ping" />
             </div>
             <div className="relative bg-white p-4 rounded-2xl shadow-2xl border border-gray-100 flex flex-col items-center gap-2">
                {order.type === 'TRAIN' ? (
                  <div className="bg-blue-100 text-blue-600 p-3 rounded-full"><Train size={32} /></div>
                ) : (
                  <div className="bg-teal-100 text-teal-600 p-3 rounded-full"><MapPin size={32} /></div>
                )}
                <span className="text-sm font-bold text-charcoal">Delivery Point</span>
                <span className="text-[10px] text-slate-grey uppercase tracking-tighter">Chiplun Station</span>
             </div>

             {/* Rider Icon */}
             <motion.div 
               animate={{ x: [100, -50], y: [50, 0] }}
               transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
               className="absolute top-20 left-20 bg-white p-2 rounded-full shadow-lg border border-teal/20"
             >
                <div className="bg-teal text-white p-2 rounded-full"><Bike size={20} /></div>
             </motion.div>
          </div>
       </div>

       <div className="p-6 md:p-8 max-w-2xl mx-auto">
          <div className="flex justify-between items-start mb-8">
             <div>
                <h3 className="text-2xl font-extrabold text-charcoal">Arriving in 12 mins</h3>
                <p className="text-slate-grey font-medium">Your rider Steve Rogers is on the way!</p>
             </div>
             <div className="flex flex-col items-end gap-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Share with Rider</span>
                <div className="bg-teal text-white px-5 py-2.5 rounded-2xl font-black text-xl tracking-[0.2em] shadow-lg shadow-teal/20">
                    {order.deliveryOtp}
                </div>
             </div>
          </div>

          <div className="space-y-6">
             <div className={`flex gap-4 ${['CONFIRMED', 'COOKING', 'PICKED_UP', 'DELIVERED'].includes(order.status) ? 'opacity-100' : 'opacity-40'}`}>
                <div className="flex flex-col items-center">
                   <div className={`w-4 h-4 rounded-full ${['CONFIRMED', 'COOKING', 'PICKED_UP', 'DELIVERED'].includes(order.status) ? 'bg-teal' : 'bg-gray-200'}`} />
                   <div className={`w-0.5 h-12 ${['COOKING', 'PICKED_UP', 'DELIVERED'].includes(order.status) ? 'bg-teal' : 'bg-gray-200'}`} />
                </div>
                <div>
                   <p className="font-bold text-charcoal">Order Confirmed</p>
                   <p className="text-sm text-slate-grey">We've received your order</p>
                </div>
             </div>
             <div className={`flex gap-4 ${['COOKING', 'PICKED_UP', 'DELIVERED'].includes(order.status) ? 'opacity-100' : 'opacity-40'}`}>
                <div className="flex flex-col items-center">
                   <div className={`w-4 h-4 rounded-full ${['COOKING', 'PICKED_UP', 'DELIVERED'].includes(order.status) ? 'bg-teal' : 'bg-gray-200'}`} />
                   <div className={`w-0.5 h-12 ${['PICKED_UP', 'DELIVERED'].includes(order.status) ? 'bg-teal' : 'bg-gray-200'}`} />
                </div>
                <div>
                   <p className="font-bold text-charcoal">Preparing your meal</p>
                   <p className="text-sm text-slate-grey">The kitchen is busy with your food</p>
                </div>
             </div>
             <div className={`flex gap-4 ${['PICKED_UP', 'DELIVERED'].includes(order.status) ? 'opacity-100' : 'opacity-40'}`}>
                <div className="flex flex-col items-center">
                   <div className={`w-4 h-4 rounded-full ${['PICKED_UP', 'DELIVERED'].includes(order.status) ? 'bg-teal' : 'bg-gray-200'}`} />
                   <div className={`w-0.5 h-12 ${order.status === 'DELIVERED' ? 'bg-teal' : 'bg-gray-200'}`} />
                </div>
                <div>
                   <p className="font-bold text-charcoal">Out for Delivery</p>
                   <p className="text-sm text-slate-grey">Our rider is on the way</p>
                </div>
             </div>
             <div className={`flex gap-4 ${order.status === 'DELIVERED' ? 'opacity-100' : 'opacity-40'}`}>
                <div className="flex flex-col items-center">
                   <div className={`w-4 h-4 rounded-full ${order.status === 'DELIVERED' ? 'bg-teal' : 'bg-gray-200'}`} />
                </div>
                <div>
                   <p className="font-bold text-charcoal">Delivered</p>
                   <p className="text-sm text-slate-grey">Enjoy your meal!</p>
                </div>
             </div>
          </div>
       </div>
    </div>
  )
}

const CustomerDashboard = ({ onLogout }: { onLogout: () => void }) => {
    const { userSession, orders, restaurants, cartItems, addToCart, removeFromCart, clearCart, claimedCoupon, claimCoupon, addReview, requestRefund } = useGlobal();
    const [trainMode, setTrainMode] = useState(false);
    const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isPointsModalOpen, setIsPointsModalOpen] = useState(false);
    const [activeOrder, setActiveOrder] = useState<any>(null);
    const [activeTab, setActiveTab] = useState<'home' | 'history' | 'favs'>('home');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [reviewOrderId, setReviewOrderId] = useState<string | null>(null);
    const [refundOrderId, setRefundOrderId] = useState<string | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const offersScrollRef = useRef<HTMLDivElement>(null);

    const scroll = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
        if (ref.current) {
            const { scrollLeft } = ref.current;
            const scrollTo = direction === 'left' ? scrollLeft - 300 : scrollLeft + 300;
            ref.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    const handleOrderSuccess = (orderData: any) => {
      clearCart();
      setActiveOrder(orderData);
    };

    if (activeOrder) {
      const currentOrder = orders.find(o => o.id === activeOrder.id) || activeOrder;
      return <OrderTracker order={currentOrder} onBack={() => setActiveOrder(null)} />;
    }

    const categories = [
        { id: 1, name: 'Bakery', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072&auto=format&fit=crop' },
        { id: 2, name: 'Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop' },
        { id: 3, name: 'Konkani', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1974&auto=format&fit=crop' },
        { id: 4, name: 'Café', image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?q=80&w=2071&auto=format&fit=crop' },
        { id: 5, name: 'Thali', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=2070&auto=format&fit=crop' },
        { id: 6, name: 'Biryani', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1974&auto=format&fit=crop' },
        { id: 7, name: 'Chinese', image: 'https://images.unsplash.com/photo-1512058560366-cd24270083cd?q=80&w=2070&auto=format&fit=crop' },
        { id: 8, name: 'Burgers', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1899&auto=format&fit=crop' },
        { id: 9, name: 'Dessert', image: 'https://images.unsplash.com/photo-1563729768601-d6fa48b04873?q=80&w=1974&auto=format&fit=crop' },
    ];

    let filteredRestaurants = restaurants;
    if (activeTab === 'favs') {
      filteredRestaurants = restaurants.filter(r => userSession.favorites.includes(r.id));
    } else if (selectedCategory) {
      filteredRestaurants = restaurants.filter(r => r.tags.some(tag => tag.toLowerCase().includes(selectedCategory.toLowerCase())));
    }

    const selectedRestForCart = cartItems.length > 0 
        ? restaurants.find(r => r.menu.some(m => m.name === cartItems[0].name)) 
        : null;

    return (
        <div className="bg-[#F9FAFB] min-h-screen pb-24 font-sans relative">
             <AnimatePresence>
                {selectedRestaurant && (
                    <RestaurantDetails 
                        restaurant={selectedRestaurant} 
                        onBack={() => setSelectedRestaurant(null)}
                    />
                )}
            </AnimatePresence>

            <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
            <PointsModal isOpen={isPointsModalOpen} onClose={() => setIsPointsModalOpen(false)} />

            <CustomerHeader 
              onLogout={onLogout} 
              onOpenProfile={() => setIsProfileOpen(true)} 
              onOpenPoints={() => setIsPointsModalOpen(true)}
            />

            <div className="bg-white border-b border-gray-100 mb-6 sticky top-14 z-30">
                <div className="max-w-7xl mx-auto px-4 flex gap-8">
                    <button 
                        onClick={() => setActiveTab('home')}
                        className={`py-4 text-sm font-bold border-b-2 transition-all ${activeTab === 'home' ? 'border-teal text-teal' : 'border-transparent text-slate-grey'}`}
                    >
                        Explore
                    </button>
                    <button 
                        data-tab="favs"
                        onClick={() => setActiveTab('favs')}
                        className={`py-4 text-sm font-bold border-b-2 transition-all ${activeTab === 'favs' ? 'border-teal text-teal' : 'border-transparent text-slate-grey'}`}
                    >
                        Favorites ({userSession.favorites.length})
                    </button>
                    <button 
                        data-tab="history"
                        onClick={() => setActiveTab('history')}
                        className={`py-4 text-sm font-bold border-b-2 transition-all ${activeTab === 'history' ? 'border-teal text-teal' : 'border-transparent text-slate-grey'}`}
                    >
                        History ({orders.length})
                    </button>
                </div>
            </div>
            
            <div className="max-w-7xl mx-auto px-4 py-6 space-y-10">
                {activeTab === 'home' || activeTab === 'favs' ? (
                  <>
                {activeTab === 'home' && (
                  <div className="max-w-2xl mx-auto">
                      <TrainSearchSection isTrainMode={trainMode} onToggle={setTrainMode} />
                  </div>
                )}

                {activeTab === 'home' && (
                  <div className="max-w-2xl mx-auto">
                      <div className="flex justify-between items-center mb-4 px-1">
                          <h3 className="text-xl font-bold text-charcoal">Cravings</h3>
                          <button 
                            onClick={() => setSelectedCategory(null)}
                            className="text-sm font-bold text-teal hover:underline"
                          >
                            See all
                          </button>
                      </div>
                      <div className="relative group">
                          {/* Left Scroll Button */}
                          <button 
                            onClick={() => scroll(scrollRef, 'left')}
                            className="absolute -left-5 top-10 -translate-y-1/2 z-20 bg-white/95 backdrop-blur shadow-xl rounded-full w-10 h-10 text-charcoal hover:bg-teal hover:text-white transition-all opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center border border-gray-100"
                          >
                            <ChevronLeft size={20} />
                          </button>

                          <div 
                            ref={scrollRef}
                            className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide scroll-smooth"
                          >
                              {categories.map((cat) => (
                                  <CategoryItem 
                                    key={cat.id} 
                                    name={cat.name} 
                                    image={cat.image} 
                                    isActive={selectedCategory === cat.name}
                                    onClick={() => setSelectedCategory(selectedCategory === cat.name ? null : cat.name)}
                                  />
                              ))}
                          </div>

                          {/* Right Scroll Button */}
                          <button 
                            onClick={() => scroll(scrollRef, 'right')}
                            className="absolute -right-5 top-10 -translate-y-1/2 z-20 bg-white/95 backdrop-blur shadow-xl rounded-full w-10 h-10 text-charcoal hover:bg-teal hover:text-white transition-all opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center border border-gray-100"
                          >
                            <ChevronRight size={20} />
                          </button>
                      </div>
                  </div>
                )}

                 <div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                        <h3 className="text-2xl font-extrabold text-charcoal">
                          {activeTab === 'home' 
                            ? (selectedCategory ? `${selectedCategory} near you` : `Welcome, ${userSession.name || 'Friend'}!`) 
                            : 'Your Favorites'}
                        </h3>
                        {activeTab === 'home' && (
                          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 md:pb-0 md:mx-0 md:px-0 scrollbar-hide">
                              <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-full text-sm font-bold text-charcoal shadow-sm hover:border-teal transition-colors whitespace-nowrap">
                                  <Filter size={14} /> Sort
                              </button>
                              <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-full text-sm font-medium text-charcoal shadow-sm hover:border-teal transition-colors whitespace-nowrap">
                                  Fast Delivery
                              </button>
                              <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-full text-sm font-medium text-charcoal shadow-sm hover:border-teal transition-colors whitespace-nowrap">
                                  Rating 4.0+
                              </button>
                              <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-full text-sm font-medium text-charcoal shadow-sm hover:border-teal transition-colors whitespace-nowrap">
                                  Pure Veg
                              </button>
                          </div>
                        )}
                    </div>
                    
                    {filteredRestaurants.length === 0 ? (
                      <div className="py-20 text-center">
                        <Heart size={48} className="mx-auto text-gray-200 mb-4" />
                        <p className="text-slate-grey font-medium">No favorite restaurants yet.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {filteredRestaurants.map((rest: any) => (
                              <RestaurantCard 
                                  key={rest.id} 
                                  data={rest}
                                  onClick={() => setSelectedRestaurant(rest)} 
                                  className="w-full" 
                              />
                          ))}
                      </div>
                    )}
                </div>

                <div className="relative group/offers">
                    <div className="flex justify-between items-center mb-4 px-1">
                        <h3 className="text-xl font-bold text-charcoal">Special Offers</h3>
                    </div>
                    <div className="relative">
                        {/* Left Scroll Button */}
                        <button 
                            onClick={() => scroll(offersScrollRef, 'left')}
                            className="absolute -left-5 top-24 -translate-y-1/2 z-20 bg-white/95 backdrop-blur shadow-xl rounded-full w-12 h-12 text-charcoal hover:bg-teal hover:text-white transition-all opacity-0 group-hover/offers:opacity-100 hidden md:flex items-center justify-center border border-gray-100"
                        >
                            <ChevronLeft size={24} />
                        </button>

                        <div 
                            ref={offersScrollRef}
                            className="flex gap-5 overflow-x-auto pb-8 -mx-4 px-4 scrollbar-hide scroll-smooth"
                        >
                            {restaurants.filter((r: any) => r.offer).map((rest: any) => (
                                <RestaurantCard 
                                    key={rest.id} 
                                    data={rest} 
                                    onClick={() => setSelectedRestaurant(rest)}
                                />
                            ))}
                        </div>

                        {/* Right Scroll Button */}
                        <button 
                            onClick={() => scroll(offersScrollRef, 'right')}
                            className="absolute -right-5 top-24 -translate-y-1/2 z-20 bg-white/95 backdrop-blur shadow-xl rounded-full w-12 h-12 text-charcoal hover:bg-teal hover:text-white transition-all opacity-0 group-hover/offers:opacity-100 hidden md:flex items-center justify-center border border-gray-100"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>

                 <div className="max-w-2xl mx-auto bg-gradient-to-r from-teal-600 to-teal-400 rounded-3xl p-6 text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold mb-2">Free Delivery on your first order!</h3>
                        <p className="text-white/90 mb-4 text-sm">Use code WELCOME50 at checkout.</p>
                        <button 
                          onClick={() => claimCoupon('WELCOME50')}
                          className={`bg-white font-bold py-2 px-6 rounded-lg text-sm transition-all ${claimedCoupon === 'WELCOME50' ? 'text-green-600' : 'text-teal'}`}
                        >
                          {claimedCoupon === 'WELCOME50' ? 'Claimed!' : 'Claim Now'}
                        </button>
                    </div>
                    <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-1/4 translate-y-1/4">
                         <ShoppingBag size={150} />
                    </div>
                 </div>
                  </>
                ) : (
                   <div className="max-w-2xl mx-auto space-y-4 pb-10">
                      <h3 className="text-2xl font-extrabold text-charcoal mb-6">Order History</h3>
                      {orders.length === 0 ? (
                        <div className="bg-white p-12 rounded-3xl text-center border border-dashed border-gray-200">
                           <ShoppingBag size={48} className="mx-auto text-gray-200 mb-4" />
                           <p className="text-slate-grey font-medium">No orders yet. Hungry?</p>
                        </div>
                      ) : (
                        orders.map(order => (
                          <div key={order.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4">
                             <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                    <span className="font-extrabold text-charcoal">{order.id}</span>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${order.status === 'DELIVERED' ? 'bg-green-100 text-green-600' : 'bg-teal-100 text-teal-600'}`}>
                                        {order.status}
                                    </span>
                                    </div>
                                    <p className="text-sm text-slate-grey mb-1">{order.restaurantName}</p>
                                    <p className="text-xs text-gray-400">{new Date(order.timestamp).toLocaleDateString()}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-extrabold text-charcoal">₹{order.totalPrice}</p>
                                    <button 
                                    onClick={() => setActiveOrder(order)}
                                    className="text-teal text-xs font-bold hover:underline mt-1"
                                    >
                                    Track / Details
                                    </button>
                                </div>
                             </div>

                             {order.status === 'DELIVERED' && (
                                <div className="pt-4 border-t border-gray-50 flex flex-wrap gap-2">
                                    {order.review ? (
                                        <div className="bg-yellow-50 px-3 py-2 rounded-lg flex items-center gap-2">
                                            <Star size={14} className="fill-yellow-400 text-yellow-400" />
                                            <span className="text-xs font-bold text-yellow-700">{order.review.rating} Stars Given</span>
                                        </div>
                                    ) : (
                                        <button 
                                            onClick={() => setReviewOrderId(order.id)}
                                            className="px-3 py-2 bg-gray-50 hover:bg-teal hover:text-white text-charcoal text-xs font-bold rounded-lg transition-colors flex items-center gap-2"
                                        >
                                            <Star size={14} /> Rate Food
                                        </button>
                                    )}

                                    {order.refundStatus ? (
                                        <div className={`px-3 py-2 rounded-lg flex items-center gap-2 ${
                                            order.refundStatus === 'APPROVED' ? 'bg-green-100 text-green-700' : 
                                            order.refundStatus === 'PENDING' ? 'bg-orange-100 text-orange-700' : 
                                            'bg-red-100 text-red-700'
                                        }`}>
                                            <AlertCircle size={14} />
                                            <span className="text-xs font-bold">Refund {order.refundStatus}</span>
                                        </div>
                                    ) : (
                                        <button 
                                            onClick={() => setRefundOrderId(order.id)}
                                            className="px-3 py-2 bg-gray-50 hover:bg-red-600 hover:text-white text-charcoal text-xs font-bold rounded-lg transition-colors flex items-center gap-2"
                                        >
                                            <Info size={14} /> Need Help / Refund?
                                        </button>
                                    )}
                                </div>
                             )}
                          </div>
                        ))
                      )}

                      <ReviewModal 
                        isOpen={!!reviewOrderId} 
                        onClose={() => setReviewOrderId(null)} 
                        orderId={reviewOrderId || ''} 
                        onSubmit={(rating, comment) => addReview(reviewOrderId!, rating, comment)} 
                      />
                      <RefundModal 
                        isOpen={!!refundOrderId} 
                        onClose={() => setRefundOrderId(null)} 
                        orderId={refundOrderId || ''} 
                        onSubmit={(reason) => requestRefund(refundOrderId!, reason)} 
                      />
                   </div>
                )}
            </div>

            <CartModal 
              items={cartItems} 
              isOpen={isCartOpen} 
              onClose={() => setIsCartOpen(false)} 
              onAdd={addToCart}
              onRemove={removeFromCart}
              onProceedToCheckout={() => {
                setIsCartOpen(false);
                setIsCheckoutOpen(true);
              }}
            />
            <CheckoutModal 
              isOpen={isCheckoutOpen}
              onClose={() => setIsCheckoutOpen(false)}
              items={cartItems}
              onOrderSuccess={handleOrderSuccess}
              restaurantId={selectedRestForCart?.id || 1}
              restaurantName={selectedRestForCart?.name || "Ovenly - Bakery"}
            />
            <FloatingCartFab 
              itemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
              onClick={() => setIsCartOpen(true)} 
            />
        </div>
    )
}

const LandingPage = ({ onAuthTrigger }: { onAuthTrigger: (role: string | null) => void }) => {
  return (
    <div className="bg-white font-sans overflow-x-hidden">
      <Navbar onAuthClick={() => onAuthTrigger(null)} />
      <HeroSection onCtaClick={() => onAuthTrigger('customer')} />
      <ValuePropSection />
      <EcosystemSection onAuthTrigger={onAuthTrigger} />
      <DownloadAppSection />
      <SocialProofFooter />
    </div>
  );
};

export function App() {
  const { userSession, logoutUser } = useGlobal();
  const [view, setView] = useState<'landing' | 'auth' | 'dashboard'>('landing');
  const [initialAuthRole, setInitialAuthRole] = useState<string | null>(null);

  const handleAuthTrigger = (role: string | null) => {
    setInitialAuthRole(role);
    setView('auth');
  };

  const handleLoginSuccess = () => {
    setView('dashboard');
  };

  const handleLogout = () => {
    logoutUser();
    setView('landing');
  }

  return (
    <main className="min-h-screen">
      <AnimatePresence mode="wait">
        {view === 'landing' && (
          <motion.div 
            key="landing"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
          >
            <LandingPage onAuthTrigger={handleAuthTrigger} />
          </motion.div>
        )}

        {view === 'auth' && (
          <motion.div 
            key="auth"
            initial={{ opacity: 0, x: 100 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -100 }}
          >
            <AuthContainer 
              initialRole={initialAuthRole} 
              onLoginSuccess={handleLoginSuccess}
              onBack={() => setView('landing')}
            />
          </motion.div>
        )}

        {view === 'dashboard' && (
          <motion.div 
            key="dashboard"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="w-full"
          >
            {userSession.role === 'customer' && <CustomerDashboard onLogout={handleLogout} />}
            {userSession.role === 'partner' && <PartnerDashboard onLogout={handleLogout} />}
            {userSession.role === 'rider' && <RiderDashboard onLogout={handleLogout} />}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;
