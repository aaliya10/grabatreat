import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bike, 
  Zap, 
  Repeat, 
  User, 
  LogOut, 
  MapPin, 
  Train, 
  Phone, 
  CheckCircle2
} from 'lucide-react';
import { useGlobal } from '../context/GlobalContext';

const RiderDashboard = ({ onLogout }: { onLogout: () => void }) => {
  const { userSession, orders, updateOrderStatus, setUserStatus } = useGlobal();
  const [activeTab, setActiveTab] = useState<'tasks' | 'earnings' | 'profile'>('tasks');

  const myStatus = userSession?.status || 'OFFLINE';

  // My Tasks: In our mock, any order picked up is assigned to the current rider
  const activeTasks = orders.filter(o => o.status === 'PICKED_UP');
  
  // Available Tasks: Orders READY at any restaurant but not yet picked up
  const availableOrders = myStatus === 'AVAILABLE' ? orders.filter(o => o.status === 'READY') : [];
  
  // Past Deliveries: Status DELIVERED
  const pastDeliveries = orders.filter(o => o.status === 'DELIVERED');

  // Dynamic Earnings Calculation
  const basePay = pastDeliveries.length * 40;
  const totalTips = pastDeliveries.reduce((acc, order) => acc + (order.tip || 0), 0);
  const dailyTotal = basePay + totalTips;

  const handleStatusChange = (status: 'AVAILABLE' | 'OFFLINE') => {
    setUserStatus(status);
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex flex-col font-sans pb-20 md:pb-0">
       
       {/* Interactive Rider Header */}
       <header className="bg-slate-900 text-white px-6 py-6 sticky top-0 z-50 shadow-2xl">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-teal rounded-2xl flex items-center justify-center shadow-lg shadow-teal/20 transform rotate-6">
                        <Bike size={32} strokeWidth={2.5} />
                    </div>
                    <div>
                        <h1 className="text-xl font-black tracking-tight">RIDER FLEET</h1>
                        <div className="flex items-center gap-2 mt-0.5">
                            <div className={`w-2 h-2 rounded-full ${myStatus === 'AVAILABLE' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Status: <span className={myStatus === 'AVAILABLE' ? 'text-teal' : 'text-red-400'}>{myStatus === 'AVAILABLE' ? 'ON DUTY' : 'OFF DUTY'}</span></p>
                        </div>
                    </div>
                </div>
                
                <div className="flex items-center gap-4 w-full sm:w-auto">
                     <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 flex-1 sm:flex-none shadow-inner">
                        <button 
                            onClick={() => handleStatusChange('AVAILABLE')}
                            className={`flex-1 px-4 py-2 rounded-xl text-xs font-black transition-all duration-300 ${myStatus === 'AVAILABLE' ? 'bg-teal text-slate-900 shadow-lg transform scale-105' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            ON DUTY
                        </button>
                         <button 
                            onClick={() => handleStatusChange('OFFLINE')}
                            className={`flex-1 px-4 py-2 rounded-xl text-xs font-black transition-all duration-300 ${myStatus === 'OFFLINE' ? 'bg-red-500 text-white shadow-lg transform scale-105' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            OFF DUTY
                        </button>
                    </div>
                    <button onClick={onLogout} className="p-3 bg-white/5 text-slate-400 rounded-2xl hover:bg-white/10 hover:text-white transition-all border border-white/10">
                        <LogOut size={22} />
                    </button>
                </div>
            </div>
       </header>

       <div className="max-w-7xl mx-auto w-full px-6 py-8 flex flex-col md:flex-row gap-8">
            
            {/* Desktop Navigation Sidebar */}
            <aside className="hidden md:block w-72 shrink-0 space-y-6">
                <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-200">
                    <nav className="space-y-2">
                        <button 
                            onClick={() => setActiveTab('tasks')}
                            className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl font-black transition-all ${activeTab === 'tasks' ? 'bg-teal-50 text-teal border border-teal-100 shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
                        >
                            <Zap size={20} />
                            Task Center
                            {(availableOrders.length > 0 || activeTasks.length > 0) && (
                                <span className="ml-auto bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                                    {availableOrders.length + activeTasks.length}
                                </span>
                            )}
                        </button>
                        <button 
                            onClick={() => setActiveTab('earnings')}
                            className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl font-black transition-all ${activeTab === 'earnings' ? 'bg-teal-50 text-teal border border-teal-100 shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
                        >
                            <Repeat size={20} />
                            Earnings
                        </button>
                        <button 
                            onClick={() => setActiveTab('profile')}
                            className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl font-black transition-all ${activeTab === 'profile' ? 'bg-teal-50 text-teal border border-teal-100 shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
                        >
                            <User size={20} />
                            Rider Profile
                        </button>
                    </nav>
                </div>

                {/* Earnings Quick Stats */}
                <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-200 overflow-hidden relative group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 transform group-hover:scale-110 transition-transform">
                        <Bike size={80} strokeWidth={1} />
                    </div>
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Today's Summary</h3>
                    <div className="space-y-6 relative z-10">
                        <div>
                            <p className="text-3xl font-black text-slate-900">₹{dailyTotal}</p>
                            <p className="text-[10px] font-black text-teal uppercase tracking-widest mt-1">Net Earnings</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-lg font-black text-slate-700">{pastDeliveries.length}</p>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Trips</p>
                            </div>
                            <div>
                                <p className="text-lg font-black text-slate-700">₹{totalTips}</p>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tips</p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Dynamic Viewport */}
            <main className="flex-1 min-w-0">
                <AnimatePresence mode="wait">
                    {activeTab === 'tasks' && (
                        <motion.div 
                            key="tasks" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
                            className="space-y-10"
                        >
                            {/* Active Trip Visualizer */}
                            {activeTasks.length > 0 && (
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping" /> Current Active Job
                                        </h3>
                                        <span className="text-xs font-black text-teal bg-teal-50 px-3 py-1 rounded-full border border-teal-100">ONGOING</span>
                                    </div>
                                    
                                    {activeTasks.map(task => (
                                        <div key={task.id} className="bg-white rounded-[40px] overflow-hidden border-2 border-slate-900 shadow-2xl transform hover:scale-[1.01] transition-transform">
                                            <div className="bg-slate-900 p-6 flex justify-between items-center">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-3 bg-white/10 rounded-2xl text-teal">
                                                        <MapPin size={24} />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-white font-black text-lg">{task.restaurantName}</h4>
                                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ID: #{task.id.slice(-4).toUpperCase()}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-teal font-black text-xl">₹{40 + (task.tip || 0)}</p>
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Earn for trip</p>
                                                </div>
                                            </div>

                                            <div className="p-8">
                                                <div className="flex gap-8 items-stretch mb-10">
                                                    <div className="flex flex-col items-center gap-2">
                                                        <div className="w-5 h-5 bg-teal rounded-full border-4 border-teal-50 shadow-sm" />
                                                        <div className="w-0.5 h-full bg-slate-100 border-l-2 border-dashed border-slate-200" />
                                                        <div className="w-5 h-5 bg-slate-900 rounded-full border-4 border-slate-100 shadow-sm" />
                                                    </div>
                                                    <div className="flex-1 flex flex-col justify-between py-0.5">
                                                        <div>
                                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Pickup from Kitchen</p>
                                                            <p className="text-lg font-black text-slate-900 leading-tight">{task.restaurantName}</p>
                                                        </div>
                                                        <div className="pt-8">
                                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Deliver to Customer</p>
                                                            <p className="text-lg font-black text-slate-900 leading-tight">
                                                                {task.type === 'TRAIN' ? (
                                                                    <span className="flex items-center gap-2">
                                                                        <Train size={20} className="text-blue-600" />
                                                                        Chiplun Station, Coach {task.coach}
                                                                    </span>
                                                                ) : task.address}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4 mb-8">
                                                    <div className="p-4 bg-slate-50 rounded-3xl border border-slate-100 text-center">
                                                        <p className="text-lg font-black text-slate-900">1.2 km</p>
                                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Distance</p>
                                                    </div>
                                                    <div className="p-4 bg-slate-50 rounded-3xl border border-slate-100 text-center">
                                                        <p className="text-lg font-black text-slate-900">₹{task.tip || 0}</p>
                                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer Tip</p>
                                                    </div>
                                                </div>

                                                <div className="space-y-4">
                                                    {task.status === 'PICKED_UP' && (
                                                        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
                                                            <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Verify Delivery OTP</p>
                                                            <div className="flex gap-3">
                                                                <input 
                                                                    type="text"
                                                                    placeholder="Enter Customer OTP"
                                                                    maxLength={4}
                                                                    className="flex-1 bg-white border border-slate-200 px-4 py-3 rounded-xl text-lg font-black tracking-[0.2em] outline-none focus:ring-2 focus:ring-teal"
                                                                    id={`otp-${task.id}`}
                                                                />
                                                                <button 
                                                                    onClick={() => {
                                                                        const input = document.getElementById(`otp-${task.id}`) as HTMLInputElement;
                                                                        if (input.value === task.deliveryOtp) {
                                                                            updateOrderStatus(task.id, 'DELIVERED');
                                                                        } else {
                                                                            alert('Invalid Delivery OTP!');
                                                                        }
                                                                    }}
                                                                    className="bg-green-600 text-white font-black px-6 py-3 rounded-xl hover:bg-green-700 transition-all active:scale-95"
                                                                >
                                                                    CONFIRM
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <button className="w-full p-5 bg-slate-100 text-slate-500 rounded-[24px] hover:bg-slate-200 transition-all border border-slate-200 flex items-center justify-center gap-2 font-bold">
                                                        <Phone size={20} /> CONTACT CUSTOMER
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Job Pool / Scanning */}
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Available Job Pool</h3>
                                    {myStatus === 'AVAILABLE' && <div className="text-[10px] font-black text-teal animate-pulse">SCANNING LIVE...</div>}
                                </div>

                                {myStatus === 'OFFLINE' ? (
                                    <div className="bg-white rounded-[40px] p-16 text-center border-2 border-dashed border-slate-300">
                                        <div className="w-24 h-24 bg-slate-50 rounded-[30px] flex items-center justify-center mx-auto mb-6 text-slate-200">
                                            <Bike size={48} />
                                        </div>
                                        <h3 className="text-2xl font-black text-slate-900 mb-2">You are currently Off-Duty</h3>
                                        <p className="text-slate-500 font-medium max-w-xs mx-auto mb-8">Switch to "On Duty" to start seeing and accepting delivery requests in Chiplun.</p>
                                        <button 
                                            onClick={() => handleStatusChange('AVAILABLE')}
                                            className="bg-teal text-slate-900 font-black px-10 py-4 rounded-2xl hover:bg-teal-400 transition-all active:scale-95 shadow-xl shadow-teal/20"
                                        >
                                            GO ON DUTY NOW
                                        </button>
                                    </div>
                                ) : availableOrders.length === 0 ? (
                                    <div className="bg-slate-100 rounded-[40px] p-20 text-center border-2 border-dashed border-slate-200">
                                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-teal shadow-inner">
                                            <Zap size={32} />
                                        </motion.div>
                                        <p className="text-slate-500 font-black uppercase tracking-widest text-xs">Waiting for new kitchen orders...</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 gap-4">
                                        {availableOrders.map(order => (
                                            <motion.div 
                                                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                                                key={order.id} 
                                                className="bg-white rounded-[32px] p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-6 group hover:shadow-lg transition-all"
                                            >
                                                <div className="flex items-center gap-5 w-full sm:w-auto">
                                                    <div className="w-16 h-16 bg-teal/10 rounded-2xl flex items-center justify-center text-teal font-black text-xl border border-teal-100 shadow-inner group-hover:bg-teal group-hover:text-white transition-colors">
                                                       ₹40
                                                    </div>
                                                    <div>
                                                        <h4 className="font-black text-slate-900 text-lg leading-tight">{order.restaurantName}</h4>
                                                        <div className="flex items-center gap-4 mt-1 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                            <span>1.4 km away</span>
                                                            <span className="w-1 h-1 bg-slate-300 rounded-full" />
                                                            <span>{order.items.length} Items</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-full sm:w-auto flex flex-col items-end gap-2">
                                                    <div className="flex gap-2 w-full sm:w-auto">
                                                        <input 
                                                            type="text"
                                                            placeholder="Pickup OTP"
                                                            maxLength={4}
                                                            className="w-24 bg-white border border-slate-200 px-3 py-2 rounded-xl text-center font-black tracking-widest outline-none focus:ring-2 focus:ring-teal"
                                                            id={`pickup-${order.id}`}
                                                        />
                                                        <button 
                                                            onClick={() => {
                                                                const input = document.getElementById(`pickup-${order.id}`) as HTMLInputElement;
                                                                if (input.value === order.pickupOtp) {
                                                                    updateOrderStatus(order.id, 'PICKED_UP');
                                                                } else {
                                                                    alert('Invalid Pickup OTP from Restaurant!');
                                                                }
                                                            }}
                                                            className="bg-slate-900 text-white font-black px-6 py-2 rounded-xl shadow-xl shadow-slate-900/10 hover:bg-slate-800 transition-all active:scale-95"
                                                        >
                                                            PICK UP
                                                        </button>
                                                    </div>
                                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Get code from Kitchen</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'earnings' && (
                         <motion.div 
                            key="earnings" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
                            className="space-y-8"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm text-center">
                                    <p className="text-4xl font-black text-slate-900 mb-2">₹{dailyTotal}</p>
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Total Today</p>
                                </div>
                                <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm text-center">
                                    <p className="text-4xl font-black text-teal mb-2">{pastDeliveries.length}</p>
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Completed</p>
                                </div>
                                <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm text-center">
                                    <p className="text-4xl font-black text-blue-600 mb-2">₹{totalTips}</p>
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Tips Received</p>
                                </div>
                            </div>

                            <div className="bg-white rounded-[40px] p-10 shadow-sm border border-slate-200">
                                <h3 className="text-xl font-black text-slate-900 mb-8">Completed Trips</h3>
                                {pastDeliveries.length === 0 ? (
                                    <p className="text-center py-12 text-slate-400 font-black uppercase tracking-widest text-xs">No completed trips today</p>
                                ) : (
                                    <div className="space-y-4">
                                        {pastDeliveries.map(delivery => (
                                            <div key={delivery.id} className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex justify-between items-center group hover:bg-white hover:border-teal/30 transition-all">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-14 h-14 bg-white text-green-500 rounded-2xl flex items-center justify-center shadow-sm">
                                                        <CheckCircle2 size={28} />
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-slate-900 text-lg leading-tight">{delivery.restaurantName}</p>
                                                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Order #{delivery.id.slice(-6).toUpperCase()} • Delivered</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-black text-slate-900 text-xl">+₹{40 + (delivery.tip || 0)}</p>
                                                    <p className="text-[10px] text-green-600 font-black uppercase tracking-widest">Paid Out</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'profile' && (
                        <motion.div 
                            key="profile" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-[40px] p-12 shadow-sm border border-slate-200 max-w-2xl mx-auto"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="w-32 h-32 bg-slate-100 rounded-[40px] flex items-center justify-center text-slate-400 mb-8 border-4 border-slate-50 shadow-xl overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1887&auto=format&fit=crop" className="w-full h-full object-cover" alt="" />
                                </div>
                                <h3 className="text-3xl font-black text-slate-900">{userSession?.name || 'Steve Rogers'}</h3>
                                <p className="text-slate-500 font-bold mt-2">+91 {userSession?.mobile}</p>
                                
                                <div className="grid grid-cols-2 gap-6 w-full mt-12">
                                    <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100">
                                        <p className="text-2xl font-black text-slate-900">4.9 ★</p>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Avg Rating</p>
                                    </div>
                                    <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100">
                                        <p className="text-2xl font-black text-slate-900">2.4k</p>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Total Trips</p>
                                    </div>
                                </div>

                                <button onClick={onLogout} className="mt-12 w-full py-5 rounded-[24px] bg-red-50 text-red-600 font-black hover:bg-red-100 transition-all active:scale-95">
                                    LOG OUT FROM FLEET
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
       </div>

       {/* Mobile Gig-Navigation */}
       <nav className="fixed bottom-0 left-0 right-0 bg-slate-900 text-white px-8 py-5 flex justify-around md:hidden z-50 rounded-t-[40px] shadow-[0_-20px_50px_rgba(0,0,0,0.3)]">
             <button onClick={() => setActiveTab('tasks')} className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === 'tasks' ? 'text-teal scale-110' : 'text-slate-500'}`}>
                <Zap size={24} />
                <span className="text-[8px] font-black uppercase tracking-widest">Tasks</span>
             </button>
             <button onClick={() => setActiveTab('earnings')} className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === 'earnings' ? 'text-teal scale-110' : 'text-slate-500'}`}>
                <Repeat size={24} />
                <span className="text-[8px] font-black uppercase tracking-widest">Payouts</span>
             </button>
             <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === 'profile' ? 'text-teal scale-110' : 'text-slate-500'}`}>
                <User size={24} />
                <span className="text-[8px] font-black uppercase tracking-widest">Account</span>
             </button>
       </nav>
    </div>
  );
};

export default RiderDashboard;
