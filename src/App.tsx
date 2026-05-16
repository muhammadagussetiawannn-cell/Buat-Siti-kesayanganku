import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Stars, HeartCrack, Sparkles, MessageCircleHeart } from 'lucide-react';

export default function App() {
  const [response, setResponse] = useState<null | 'mau' | 'tidak'>(null);

  const playSound = (type: 'success' | 'click' | 'back') => {
    const urls = {
      success: 'https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3',
      click: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
      back: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3'
    };
    const audio = new Audio(urls[type]);
    audio.volume = 0.3;
    audio.play().catch(() => {});
  };

  const handleResponse = (val: 'mau' | 'tidak') => {
    playSound(val === 'mau' ? 'success' : 'click');
    setResponse(val);
  };

  const handleBack = () => {
    playSound('back');
    setResponse(null);
  };

  // Note: Replacing the placeholder background with the user's specific image vibe.
  // The user should ensure their image is named 'background.jpg' in the public folder or src.
  // For now, we use a beautiful backdrop style.

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Background Layer - In a real scenario, this would be the user's uploaded image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=2070&auto=format&fit=crop')`, // Fallback elegant background
          filter: 'brightness(0.4) contrast(1.1)'
        }}
      />
      
      {/* Atmospheric overlays */}
      <div className="absolute inset-0 z-[1] atmosphere opacity-40 mix-blend-overlay" />
      <div className="absolute inset-0 z-[2] vignette pointer-events-none" />

      {/* Floating Hearts */}
      <div className="absolute inset-0 z-[3] pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white/10"
            initial={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`,
              scale: 0.2
            }}
            animate={{ 
              y: [-50, 50],
              rotate: [0, 20, -20, 0],
              opacity: [0.05, 0.15, 0.05],
              scale: [0.5, 0.8, 0.5]
            }}
            transition={{ 
              duration: 10 + Math.random() * 10, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            <Heart size={40 + Math.random() * 60} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-3xl bg-black/30 backdrop-blur-[32px] border border-white/10 p-10 md:p-20 rounded-[56px] shadow-[0_60px_120px_rgba(0,0,0,0.8)] text-center"
      >
        <AnimatePresence mode="wait">
          {!response ? (
            <motion.div 
              key="question"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              className="space-y-12"
            >
              <div className="space-y-8">
                <motion.div 
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1 }} 
                  className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10"
                >
                  <MessageCircleHeart className="text-white/60" size={32} />
                </motion.div>

                <div className="space-y-4">
                  <motion.span 
                    variants={itemVariants}
                    className="block text-[12px] md:text-[14px] uppercase tracking-[8px] text-white/40 font-sans font-bold"
                  >
                    Maafkan Kesalahanku
                  </motion.span>
                  <motion.h1 
                    variants={itemVariants}
                    className="text-5xl md:text-7xl font-serif font-light text-white leading-[1.1]"
                  >
                    Permintaan Maaf <br />
                    <span className="italic">Di Masa Lalu</span>
                  </motion.h1>
                </div>
                
                <div className="w-12 h-[1px] bg-white/30 mx-auto" />

                <motion.p 
                  variants={itemVariants}
                  className="text-xl md:text-2xl text-white/80 font-serif italic leading-relaxed max-w-xl mx-auto"
                >
                  "Aku benar-benar menyesali segala goresan luka yang pernah kubuat. Jika waktu bisa diputar, aku ingin memperbaikinya bersamamu."
                </motion.p>
              </div>

              <motion.div 
                variants={itemVariants}
                className="pt-6 space-y-10"
              >
                <div className="space-y-2">
                  <p className="text-[12px] md:text-[14px] uppercase tracking-[4px] text-white/50 font-sans font-bold">
                    Apakah kamu mau memberi kita <br /> satu kesempatan lagi?
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <motion.button
                    type="button"
                    whileHover={{ y: -4, backgroundColor: '#fff', scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleResponse('mau')}
                    className="w-full sm:w-auto px-16 py-6 bg-white/90 text-[#080404] rounded-full font-sans font-black text-[13px] uppercase tracking-[3px] cursor-pointer shadow-2xl transition-all"
                  >
                    Mau (Balikan)
                  </motion.button>
                  
                  <motion.button
                    type="button"
                    whileHover={{ y: -4, backgroundColor: 'rgba(255,255,255,0.08)' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleResponse('tidak')}
                    className="w-full sm:w-auto px-16 py-6 bg-transparent text-white border border-white/20 rounded-full font-sans font-bold text-[12px] uppercase tracking-[2px] cursor-pointer transition-all"
                  >
                    Tidak
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          ) : response === 'mau' ? (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-12"
            >
              <motion.div 
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto border border-green-500/20"
              >
                <Sparkles size={48} className="text-green-400" />
              </motion.div>
              
              <div className="space-y-6">
                <h2 className="text-4xl md:text-6xl font-serif font-light text-white">
                  Terima Kasih Banyak
                </h2>
                <p className="text-xl md:text-2xl text-white/70 font-sans tracking-[1px] leading-relaxed max-w-md mx-auto italic">
                  "Terima kasih atas kebesaran hatimu. Aku berjanji kali ini semuanya akan jauh lebih indah."
                </p>
              </div>

              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex justify-center"
              >
                 <Heart className="text-red-500" size={64} fill="currentColor" />
              </motion.div>

              <button 
                type="button"
                onClick={handleBack}
                className="text-[12px] uppercase tracking-[3px] text-white/30 hover:text-white/60 transition-colors cursor-pointer"
              >
                Kembali
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="refusal"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-12"
            >
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10"
              >
                <HeartCrack size={48} className="text-white/30" />
              </motion.div>
              
              <div className="space-y-6">
                <h2 className="text-4xl md:text-6xl font-serif font-light text-white">
                  Aku Mengerti.
                </h2>
                <p className="text-xl md:text-2xl text-white/60 font-serif italic leading-relaxed max-w-md mx-auto">
                  "Aku menghargai kejujuranmu. Bahagiamu akan selalu menjadi bagian dari doaku, meski tidak bersamaku."
                </p>
              </div>

              <button 
                type="button"
                onClick={handleBack}
                className="text-[12px] uppercase tracking-[3px] text-white/30 hover:text-white/60 transition-colors cursor-pointer"
              >
                Kembali
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

