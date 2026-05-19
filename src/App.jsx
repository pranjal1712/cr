import React, { useState, useEffect, useRef } from 'react';
import DialpadScreen from './components/DialpadScreen';
import BirthdayPage, { CAMERA_PHOTOS } from './components/BirthdayPage';

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [backgroundParticles, setBackgroundParticles] = useState([]);
  const audioRef = useRef(null);

  // Default secret lock code
  const secretCode = '2220'; 

  // Generate randomized floating birthday particles on component mount
  useEffect(() => {
    // Preload heavy images in the background so they appear instantly when the vault opens
    const preloadImages = [
      '/Gemini_Generated_Image_n5a14tn5a14tn5a1.png',
      '/Gemini_Generated_Image_ywcbivywcbivywcb.png',
      '/penguin.png',
      '/bear.png',
      ...CAMERA_PHOTOS
    ];
    preloadImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    const types = ['🎈', '✨', '💖', '⭐', '🍬'];
    const generated = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      char: types[i % types.length],
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 16 + 14}px`, // 14px to 30px
      delay: `${Math.random() * 12}s`,
      duration: `${Math.random() * 10 + 12}s`,
      driftX: `${Math.random() * 60 - 30}px`,
      rotation: `${Math.random() * 360}deg`
    }));
    setBackgroundParticles(generated);
  }, []);

  // Handle successful vault code input
  const handleCorrectCode = () => {
    setIsUnlocked(true);
    // Auto play music when unlocked
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => setIsMusicPlaying(true))
          .catch(err => console.log("User interaction required to start audio stream:", err));
      }
    }, 500);
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    
    if (isMusicPlaying) {
      audioRef.current.pause();
      setIsMusicPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsMusicPlaying(true))
        .catch(err => console.log("Failed to play audio stream:", err));
    }
  };

  return (
    <div className="min-h-screen w-full relative flex flex-col justify-between overflow-x-hidden">
      
      {/* Background neon decorative elements */}
      <div className="absolute top-[20%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-pink-600/10 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-blue-500/6 blur-[120px] pointer-events-none z-0" />

      {/* Dynamic Floating Birthday Particles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        {backgroundParticles.map((p) => (
          <span
            key={p.id}
            style={{
              left: p.left,
              fontSize: p.size,
              animationDelay: p.delay,
              animationDuration: p.duration,
              '--drift-x': p.driftX,
              '--rotation': p.rotation,
            }}
            className="floating-birthday-particle"
          >
            {p.char}
          </span>
        ))}
      </div>

      {/* Hidden audio element streaming a beautiful lo-fi acoustic track */}
      <audio
        ref={audioRef}
        src="/birthday.mp3"
        loop
        preload="auto"
      />

      {/* Main Content Area */}
      <main className="flex-grow flex items-center justify-center relative z-10 py-8">
        <div className="w-full transition-all duration-1000 ease-in-out">
          {!isUnlocked ? (
            <DialpadScreen 
              onCorrectCode={handleCorrectCode} 
              secretCode={secretCode} 
            />
          ) : (
            <div className="animate-fadeIn">
              <BirthdayPage 
                isMusicPlaying={isMusicPlaying} 
                toggleMusic={toggleMusic} 
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
