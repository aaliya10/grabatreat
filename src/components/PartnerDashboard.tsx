import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  Utensils, 
  Zap, 
  Flame, 
  Clock, 
  Train, 
  Plus, 
  Phone, 
  LogOut, 
  Store,
  ToggleLeft,
  ToggleRight,
  Star,
  ThumbsUp,
  ThumbsDown,
  AlertCircle
} from 'lucide-react';
import { useGlobal } from '../context/GlobalContext';

const PartnerDashboard = ({ onLogout }: { onLogout: () => void }) => {
  const { userSession, orders, updateOrderStatus, restaurants, toggleMenuItemAvailability, restaurantOnlineStatus, setRestaurantStatus, handleRefund } = useGlobal();
  const [activeTab, setActiveTab] = useState<'orders' | 'menu' | 'insights' | 'reviews'>('orders');

  const myRestaurantId = userSession?.restaurantId || 1;
  const myRestaurant = restaurants.find(r => r.id === myRestaurantId);
  const myStatus = restaurantOnlineStatus[myRestaurantId] || 'ONLINE';

  const myOrders = orders.filter(o => o.restaurantId === myRestaurantId);
  const activeOrders = myOrders.filter(o => o.status !== 'DELIVERED');
  const pastOrders = myOrders.filter(o => o.status === 'DELIVERED');

  const revenueToday = pastOrders.reduce((acc, curr) => acc + curr.totalPrice, 0);

  // Stats for Insights
  const orderCount = myOrders.length;
  const avgOrderValue = orderCount > 0 ? Math.round(revenueToday / orderCount) : 0;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      {/* Immersive Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
             <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-700 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-teal-500/20 transform -rotate-3 hover:rotate-0 transition-transform cursor-pointer">
                <Store size={28} strokeWidth={2.5} />
             </div>
             <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">{myRestaurant?.name || userSession.name}</h1>
                <div className="flex items-center gap-2 mt-0.5">
                   <div className={`w-2 h-2 rounded-full animate-pulse ${myStatus === 'AVAILABLE' || myStatus === 'ONLINE' ? 'bg-green-500' : myStatus === 'BUSY' ? 'bg-orange-500' : 'bg-red-500'}`} />
                   <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Kitchen Status • <span className={myStatus === 'AVAILABLE' || myStatus === 'ONLINE' ? 'text-green-600' : myStatus === 'BUSY' ? 'text-orange-600' : 'text-red-600'}>{myStatus}</span></p>
                </div>
             </div>
          </div>

          <div className="flex items-center gap-6 w-full md:w-auto">
             {/* Dynamic Status Toggle */}
             <div className="flex bg-slate-100 p-1.5 rounded-2xl flex-1 md:flex-none border border-slate-200 shadow-inner">
                <button 
                  onClick={() => setRestaurantStatus(myRestaurantId, 'AVAILABLE')}
                  className={`flex-1 px-4 py-2 rounded-xl text-xs font-black transition-all duration-300 ${myStatus === 'AVAILABLE' || myStatus === 'ONLINE' ? 'bg-white text-green-600 shadow-md transform scale-105' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  LIVE
                </button>
                <button 
                  onClick={() => setRestaurantStatus(myRestaurantId, 'BUSY')}
                  className={`flex-1 px-4 py-2 rounded-xl text-xs font-black transition-all duration-300 ${myStatus === 'BUSY' ? 'bg-white text-orange-600 shadow-md transform scale-105' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  BUSY
                </button>
                <button 
                  onClick={() => setRestaurantStatus(myRestaurantId, 'OFFLINE')}
                  className={`flex-1 px-4 py-2 rounded-xl text-xs font-black transition-all duration-300 ${myStatus === 'OFFLINE' ? 'bg-white text-red-600 shadow-md transform scale-105' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  OFF
                </button>
             </div>
             <button onClick={onLogout} className="p-3 bg-slate-100 text-slate-500 rounded-2xl hover:bg-red-50 hover:text-red-600 transition-all active:scale-95 border border-slate-200">
                <LogOut size={22} />
             </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto w-full px-6 py-8 flex flex-col md:flex-row gap-8">
        
        {/* Left Sidebar - Navigation & Stats */}
        <aside className="w-full md:w-72 shrink-0 space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
                <nav className="space-y-2">
                    <button 
                        onClick={() => setActiveTab('orders')}
                        className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl font-bold transition-all ${activeTab === 'orders' ? 'bg-teal-50 text-teal shadow-sm border border-teal-100' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                        <div className={`p-2 rounded-xl ${activeTab === 'orders' ? 'bg-teal text-white' : 'bg-slate-100 text-slate-400'}`}>
                            <ShoppingBag size={20} />
                        </div>
                        Live Orders
                        {activeOrders.length > 0 && (
                            <span className="ml-auto bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                                {activeOrders.length}
                            </span>
                        )}
                    </button>
                    <button 
                        onClick={() => setActiveTab('menu')}
                        className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl font-bold transition-all ${activeTab === 'menu' ? 'bg-teal-50 text-teal shadow-sm border border-teal-100' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                        <div className={`p-2 rounded-xl ${activeTab === 'menu' ? 'bg-teal text-white' : 'bg-slate-100 text-slate-400'}`}>
                            <Utensils size={20} />
                        </div>
                        Menu Items
                    </button>
                    <button 
                        onClick={() => setActiveTab('insights')}
                        className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl font-bold transition-all ${activeTab === 'insights' ? 'bg-teal-50 text-teal shadow-sm border border-teal-100' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                        <div className={`p-2 rounded-xl ${activeTab === 'insights' ? 'bg-teal text-white' : 'bg-slate-100 text-slate-400'}`}>
                            <Zap size={20} />
                        </div>
                        Insights
                    </button>
                    <button 
                        onClick={() => setActiveTab('reviews')}
                        className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl font-bold transition-all ${activeTab === 'reviews' ? 'bg-teal-50 text-teal shadow-sm border border-teal-100' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                        <div className={`p-2 rounded-xl ${activeTab === 'reviews' ? 'bg-teal text-white' : 'bg-slate-100 text-slate-400'}`}>
                            <Star size={20} />
                        </div>
                        Reviews
                    </button>
                </nav>
            </div>

            {/* Quick Stats Sidebar */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 text-white shadow-xl">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                    <Flame size={14} className="text-orange-500" /> Today's Pulse
                </h3>
                <div className="space-y-6">
                    <div>
                        <p className="text-3xl font-black">₹{revenueToday.toLocaleString()}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Earnings Today</p>
                    </div>
                    <div className="h-px bg-slate-700/50" />
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-lg font-black">{orderCount}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Orders</p>
                        </div>
                        <div>
                            <p className="text-lg font-black">{avgOrderValue}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Avg Value</p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>

        {/* Right - Dynamic Viewport */}
        <main className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
                {activeTab === 'orders' && (
                    <motion.div 
                        key="orders" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
                        className="space-y-8"
                    >
                        {/* Order Sub-Tabs/Filters */}
                        <div className="flex gap-4">
                            <span className="px-4 py-2 bg-white rounded-xl border border-teal-100 text-teal font-black text-xs shadow-sm">
                                ACTIVE ({activeOrders.length})
                            </span>
                            <span className="px-4 py-2 bg-slate-100 rounded-xl border border-slate-200 text-slate-500 font-bold text-xs">
                                RECENTLY COMPLETED ({pastOrders.slice(0, 3).length})
                            </span>
                        </div>

                        {/* Pending Refunds Section */}
                        {myOrders.filter(o => o.refundStatus === 'PENDING').length > 0 && (
                            <div className="space-y-4">
                                <h4 className="text-sm font-black text-red-600 uppercase tracking-widest flex items-center gap-2">
                                    <AlertCircle size={16} /> Action Required: Refund Requests
                                </h4>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {myOrders.filter(o => o.refundStatus === 'PENDING').map(order => (
                                        <div key={order.id} className="bg-red-50 border border-red-100 rounded-[32px] p-6 shadow-sm">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">Refund Request • {order.id}</span>
                                                    <h5 className="font-black text-slate-900 mt-1">{order.customerName}</h5>
                                                </div>
                                                <span className="text-lg font-black text-red-600">₹{order.totalPrice}</span>
                                            </div>
                                            <div className="bg-white/60 p-4 rounded-2xl mb-6 text-sm text-slate-600 italic">
                                                "{order.refundReason}"
                                            </div>
                                            <div className="flex gap-3">
                                                <button 
                                                    onClick={() => handleRefund(order.id, 'APPROVED')}
                                                    className="flex-1 bg-red-600 text-white font-black py-3 rounded-xl hover:bg-red-700 transition-all flex items-center justify-center gap-2"
                                                >
                                                    <ThumbsUp size={16} /> Approve
                                                </button>
                                                <button 
                                                    onClick={() => handleRefund(order.id, 'REJECTED')}
                                                    className="flex-1 bg-white border border-red-200 text-red-600 font-black py-3 rounded-xl hover:bg-red-50 transition-all flex items-center justify-center gap-2"
                                                >
                                                    <ThumbsDown size={16} /> Reject
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeOrders.length === 0 ? (
                            <div className="bg-white rounded-[40px] p-20 text-center border-2 border-dashed border-slate-200">
                                 <motion.div 
                                    animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }}
                                    className="w-24 h-24 bg-slate-50 rounded-[30px] flex items-center justify-center mx-auto mb-6 text-slate-200"
                                 >
                                    <ShoppingBag size={48} />
                                 </motion.div>
                                 <h3 className="text-2xl font-black text-slate-900 mb-2">The kitchen is quiet...</h3>
                                 <p className="text-slate-500 font-medium max-w-xs mx-auto">Take this time to prep your ingredients or refine your menu.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {activeOrders.map((order) => (
                                    <motion.div 
                                        layout key={order.id}
                                        className="bg-white rounded-[32px] overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 group"
                                    >
                                        <div className={`h-2 w-full ${
                                            order.status === 'PENDING' ? 'bg-orange-500' :
                                            order.status === 'COOKING' ? 'bg-blue-500' : 'bg-green-500'
                                        }`} />
                                        
                                        <div className="p-6">
                                            <div className="flex justify-between items-start mb-6">
                                                <div>
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <span className="text-sm font-black text-slate-400">#{order.id.slice(-4).toUpperCase()}</span>
                                                        <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                                            order.status === 'PENDING' ? 'bg-orange-100 text-orange-600' :
                                                            order.status === 'COOKING' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                                                        }`}>
                                                            {order.status}
                                                        </div>
                                                    </div>
                                                    <h3 className="text-xl font-black text-slate-900">{order.customerName}</h3>
                                                    <div className="flex items-center gap-4 mt-2">
                                                        <span className="text-xs text-slate-500 font-bold flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-lg">
                                                            <Clock size={14} /> {new Date(order.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </span>
                                                        {order.type === 'TRAIN' && (
                                                            <span className="text-xs text-blue-600 font-bold flex items-center gap-1.5 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
                                                                <Train size={14} /> {order.pnr}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-2xl font-black text-slate-900">₹{order.totalPrice}</p>
                                                    <p className="text-[10px] font-black text-teal uppercase tracking-widest mt-1">{order.items.length} Items</p>
                                                </div>
                                            </div>

                                            <div className="bg-slate-50 rounded-2xl p-5 mb-8 border border-slate-100">
                                                <ul className="space-y-3">
                                                    {order.items.map((item: any, idx: number) => (
                                                        <li key={idx} className="flex justify-between items-center group/item">
                                                            <span className="text-sm text-slate-700 font-bold flex items-center gap-3">
                                                                <span className="w-6 h-6 bg-white border border-slate-200 rounded-md flex items-center justify-center text-[10px] text-teal font-black shadow-sm group-hover/item:bg-teal group-hover/item:text-white transition-colors">
                                                                    {item.quantity}
                                                                </span>
                                                                {item.name}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className="flex gap-4">
                                                {order.status === 'PENDING' && (
                                                    <button 
                                                        onClick={() => updateOrderStatus(order.id, 'COOKING')}
                                                        className="flex-1 bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-slate-800 transition-all active:scale-95 shadow-xl shadow-slate-900/10 flex items-center justify-center gap-2"
                                                    >
                                                        ACCEPT & START COOKING
                                                    </button>
                                                )}
                                                {order.status === 'COOKING' && (
                                                    <button 
                                                        onClick={() => updateOrderStatus(order.id, 'READY')}
                                                        className="flex-1 bg-green-600 text-white font-black py-4 rounded-2xl hover:bg-green-700 transition-all active:scale-95 shadow-xl shadow-green-600/10 flex items-center justify-center gap-2"
                                                    >
                                                        <Zap size={18} /> READY FOR PICKUP
                                                    </button>
                                                )}
                                                {order.status === 'READY' && (
                                                    <div className="flex-1 bg-teal-50 border border-teal-200 p-4 rounded-2xl flex flex-col items-center justify-center gap-1">
                                                        <p className="text-[10px] font-black text-teal-600 uppercase tracking-widest">Share Pickup OTP with Rider</p>
                                                        <p className="text-2xl font-black text-teal-900 tracking-[0.2em]">{order.pickupOtp}</p>
                                                    </div>
                                                )}
                                                {order.status === 'PICKED_UP' && (
                                                    <div className="flex-1 flex items-center justify-center gap-3 bg-slate-50 text-slate-400 font-black py-4 rounded-2xl border border-slate-200 border-dashed">
                                                        <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping" />
                                                        RIDER EN ROUTE...
                                                    </div>
                                                )}
                                                <button className="p-4 bg-slate-100 text-slate-500 rounded-2xl hover:bg-slate-200 transition-colors border border-slate-200">
                                                    <Phone size={20} />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}

                {activeTab === 'menu' && (
                    <motion.div 
                        key="menu" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                        className="bg-white rounded-[40px] shadow-sm border border-slate-200 overflow-hidden"
                    >
                        <div className="p-8 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-6 bg-slate-50/50">
                            <div>
                                <h3 className="text-xl font-black text-slate-900">Live Menu</h3>
                                <p className="text-sm text-slate-500 font-medium mt-1">Manage what your customers can see and order.</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 text-xs font-black text-slate-600 shadow-sm">
                                    {myRestaurant?.menu.length} ITEMS TOTAL
                                </div>
                                <button className="bg-teal text-white p-2.5 rounded-xl hover:bg-teal-600 shadow-lg shadow-teal/20 active:scale-95">
                                    <Plus size={20} />
                                </button>
                            </div>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {myRestaurant?.menu.map((item) => (
                                <div key={item.id} className="p-8 flex items-center justify-between hover:bg-slate-50/50 transition-all group">
                                    <div className="flex items-center gap-6">
                                        <div className="w-20 h-20 rounded-3xl overflow-hidden shadow-md group-hover:scale-105 transition-transform">
                                            <img src={item.image} className="w-full h-full object-cover" alt="" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="font-black text-slate-900 text-lg">{item.name}</h4>
                                                <span className={`w-3 h-3 rounded-full ${item.isAvailable ? 'bg-green-500' : 'bg-slate-300'}`} />
                                            </div>
                                            <p className="text-xs text-slate-400 font-black uppercase tracking-widest">{item.category}</p>
                                            <p className="text-lg font-black text-teal mt-1">₹{item.price}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <span className={`text-[10px] font-black uppercase tracking-widest ${item.isAvailable ? 'text-green-600' : 'text-slate-400'}`}>
                                            {item.isAvailable ? 'Available' : 'Sold Out'}
                                        </span>
                                        <button 
                                            onClick={() => toggleMenuItemAvailability(myRestaurantId, item.id)}
                                            className={`p-1.5 rounded-lg transition-colors ${item.isAvailable ? 'text-teal hover:bg-teal/5' : 'text-red-500 hover:bg-red-50'}`}
                                        >
                                            {item.isAvailable ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {activeTab === 'reviews' && (
                    <motion.div 
                        key="reviews" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                    >
                        <div className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-200">
                            <h3 className="text-xl font-black text-slate-900 mb-8">Customer Feedback</h3>
                            {myOrders.filter(o => o.review).length === 0 ? (
                                <div className="text-center py-20">
                                    <Star size={48} className="mx-auto text-slate-100 mb-4" />
                                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No reviews yet</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {myOrders.filter(o => o.review).map(order => (
                                        <div key={order.id} className="bg-slate-50 p-6 rounded-[32px] border border-slate-100">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h5 className="font-black text-slate-900">{order.customerName}</h5>
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Order #{order.id.slice(-4)}</p>
                                                </div>
                                                <div className="flex gap-1">
                                                    {[1, 2, 3, 4, 5].map(n => (
                                                        <Star key={n} size={14} className={n <= (order.review?.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'} />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-sm text-slate-600 italic leading-relaxed">
                                                "{order.review?.comment}"
                                            </p>
                                            <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                                                    {new Date(order.review?.timestamp || 0).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}

                {activeTab === 'insights' && (
                    <motion.div 
                        key="insights" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                        className="space-y-8"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-200">
                                <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                                    <div className="p-2 bg-blue-50 text-blue-600 rounded-xl"><Zap size={20} /></div>
                                    Growth Trends
                                </h3>
                                <div className="h-64 flex items-end justify-between gap-4 px-4 pb-8 border-b border-slate-100">
                                    {[60, 45, 80, 50, 95, 70, 85].map((h, i) => (
                                        <div key={i} className="flex-1 group relative">
                                            <div 
                                                style={{ height: `${h}%` }} 
                                                className={`w-full rounded-t-xl transition-all duration-700 group-hover:scale-x-110 ${i === 4 ? 'bg-teal shadow-lg shadow-teal/20' : 'bg-slate-100 group-hover:bg-slate-200'}`}
                                            />
                                            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                {['M','T','W','T','F','S','S'][i]}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8 flex justify-between items-center text-sm font-bold text-slate-500">
                                    <span>Weekly Progress</span>
                                    <span className="text-green-600">+12.4% vs last week</span>
                                </div>
                            </div>

                            <div className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-200">
                                <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                                    <div className="p-2 bg-orange-50 text-orange-600 rounded-xl"><Flame size={20} /></div>
                                    Top Sellers
                                </h3>
                                <div className="space-y-6">
                                    {myRestaurant?.menu.slice(0, 4).map((item, i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-sm">
                                                <img src={item.image} className="w-full h-full object-cover" alt="" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-sm font-black text-slate-900">{item.name}</h4>
                                                <div className="w-full h-2 bg-slate-50 rounded-full mt-2 overflow-hidden">
                                                    <div style={{ width: `${90 - (i * 15)}%` }} className="h-full bg-teal/20 rounded-full" />
                                                </div>
                                            </div>
                                            <span className="text-xs font-black text-slate-400">{240 - (i * 32)} Orders</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Recent History List */}
                        <div className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-200">
                            <h3 className="text-xl font-black text-slate-900 mb-8">Recent Order History</h3>
                            {pastOrders.length === 0 ? (
                                <p className="text-center py-12 text-slate-400 font-bold uppercase tracking-widest text-xs">No records available</p>
                            ) : (
                                <div className="divide-y divide-slate-50">
                                    {pastOrders.map((order) => (
                                        <div key={order.id} className="py-6 flex justify-between items-center group">
                                            <div className="flex items-center gap-6">
                                                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:bg-teal/10 group-hover:text-teal transition-colors">
                                                    <ShoppingBag size={20} />
                                                </div>
                                                <div>
                                                    <h4 className="font-black text-slate-900">{order.customerName}</h4>
                                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{new Date(order.timestamp).toLocaleDateString()} • {order.items.length} Items</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-black text-slate-900">₹{order.totalPrice}</p>
                                                <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">SUCCESSFUL</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default PartnerDashboard;
