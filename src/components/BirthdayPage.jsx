import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, MailOpen, X } from 'lucide-react';
import { playUnlockMelody } from '../utils/audio';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const PENGUIN_GIFTS = [
  {
    id: 1,
    name: "Mochi 🐾",
    title: "Chibi Sweetness 🌸",
    note: "Lady CR, you make every single day feel like a warm, cozy cup of cocoa! You are my absolute favorite human ever, and I'm incredibly lucky to have you! ♥",
    isFinal: false
  },
  {
    id: 2,
    name: "Kiwi 🥝",
    title: "Sweet Promise 🍬",
    note: "I promise to always keep you fed with yummy treats, pamper you like a little princess, and make you laugh even when you are super pouty! 🤭",
    isFinal: false
  },
  {
    id: 3,
    name: "Toffee 🍯",
    title: "Secret Wish ⭐",
    note: "My biggest, warmest wish is to celebrate every single birthday of yours together, holding hands under a sky full of shooting stars. 💫",
    isFinal: false
  },
  {
    id: 4,
    name: "Polar ❄️",
    title: "Beauty Stamp 🏆",
    note: "Congratulations! You have been officially declared the absolute cutest, most adorable, and prettiest birthday girl in the entire universe! Here is your gold medal! 🥇👑",
    isFinal: false
  },
  {
    id: 5,
    name: "Misty ☁️",
    title: "Funny Poetry Book 📖",
    note: "Misty has written two sweet and funny poems just for you! Hope they bring a bright smile to your beautiful face! 🐧✨",
    isFinal: false
  },
  {
    id: 6,
    name: "Sparky ⚡",
    title: "Balloon Pop Surprise 🎈",
    note: "Pop all the colorful balloons to reveal a beautiful sparkly hidden memory! Keep popping! 🌟",
    isFinal: false
  },
  {
    id: 7,
    name: "Blizzard ❄️✨",
    title: "Magical Aura ✨",
    note: "Tu ek normal insan nahi hai,\nTu full time entertainment package hai 😭💖\nKabhi cute lagti hai,\nKabhi over dramatic,\nPar bina tere sab boring boring sa lagta hai ✨\n\nTeri hasi alag hi vibe deti hai,\nAur tera attitude bhi secretly iconic hai 😎\nBas hamesha aise hi rehna,\nKyuki asli charm toh tere pagalpan me hi hai 🐧🎂",
  },
  {
    id: 9,
    name: "Waddles 🎬",
    title: "The Masterminds 🍿",
    note: "Made by Pranjal, Patidar, Raju, Saloni, Mote, & Druvika! ✨\n\nMade with absolute chaos, endless laughs, and so much love. This squad is the real MVP behind all these beautiful surprises. Cheers to the most iconic team ever! 🥂💖",
    isFinal: false
  }
];

const TOFFEE_QUIZ_QUESTIONS = [
  {
    question: "Is photo me sabse strongest power kya hai? ⚡",
    options: [
      "A) Confidence",
      "B) Unity",
      "C) Matching vibe",
      "D) All of the above"
    ],
    correctIdx: 3
  },
  {
    question: "Agar ye Netflix series ka poster hota toh tagline kya hoti? 🎬🔥",
    options: [
      "A) “Brains, Blazers & Unlimited Chaos” 😭",
      "B) “Squad Goals Level: Dangerous” 😎",
      "C) “Three Legends, One Campus” 🔥",
      "D) “Placement Season Survivors”"
    ],
    correctIdx: 3
  },
  {
    question: "Sabse pehle kaun bolega “Bhai photo acchi nahi aayi”? 📸😂",
    options: [
      "A) Left person",
      "B) Center person",
      "C) Front person",
      "D) Photographer"
    ],
    correctIdx: 2
  },
  {
    question: "Agar ye 3 log startup kholte toh kya naam hota? 😭🔥",
    options: [
      "A) The Backbench Billionaires 💸",
      "B) The Formal Goons 😎",
      "C) Proxy & Partners Pvt. Ltd. 😂",
      "D) Deadline Survivors Association ☕📚"
    ],
    correctIdx: 3
  },
  {
    question: "Photo dekh ke kaunsa dialogue suit karta hai? 🎬🔥",
    options: [
      "A) “Hum attitude nahi dikhate, naturally aa jata hai” 😎",
      "B) “Squad itna strong hai ki WiFi bhi connect ho jaye” 😂",
      "C) “Blazer pehen liya hai, ab toh CEO wali feeling aa rahi hai” 😭💼",
      "D) “Assignment kam, confidence zyada hai” 📚🔥"
    ],
    correctIdx: 2
  },
  {
    question: "Is image me sabse zyada NPC energy kiski hai? 🎮😭",
    options: [
      "A) Left person",
      "B) Center person",
      "C) Background tree 🌴",
      "D) Photographer 📸"
    ],
    correctIdx: 2
  }
];

const CAMERA_PHOTOS = [
  "/IMG-20251215-WA0125.jpg",
  "/IMG-20251215-WA0126.jpg",
  "/IMG-20251215-WA0129.jpg",
  "/IMG-20251215-WA0131.jpg",
  "/IMG-20251215-WA0145.jpg",
  "/WhatsApp Image 2026-04-28 at 2.20.12 AM.jpeg",
  "/WhatsApp Image 2026-05-08 at 5.51.26 PM.jpeg",
  "/WhatsApp Image 2026-05-08 at 8.01.17 PM.jpeg",
  "/WhatsApp Image 2026-05-08 at 8.01.25 PM.jpeg",
  "/WhatsApp Image 2026-05-11 at 9.32.12 AM.jpeg",
  "/WhatsApp Image 2026-05-11 at 9.32.13 AM.jpeg"
];

const CAMERA_PHOTO_CAPTIONS = [
  "✨ Cutest Angel Smile! 💖",
  "🌸 Elegant princess portrait 🌸",
  "🍰 Sweet retro scrapbook page 🍰",
  "🔎 Elite Squad Detective Spot! 🕵️‍♀️",
  "🧸 Cosy and beautiful forever 🧸",
  "🌟 Sparkle eyes that light up the room 🌟",
  "👑 Simply gorgeous, lady CR! 👑",
  "💫 Cozy winter memories 💫",
  "🍰 Sweeter than strawberry frosting! 🍰",
  "🌿 Absolute prettiest birthday girl 🌿",
  "✨ Shine bright, my superstar! ✨"
];

const BALLOON_COLORS = ['#ff4d6d', '#39ff14', '#00f2ff', '#ffe600', '#a020f0', '#fd728f', '#ffb703', '#00b4d8', '#f15bb5', '#9b5de5', '#00bbf9', '#fee440'];

const PenguinGift = ({ id, name, title, note, isOpen, onOpen, isFinal }) => {
  return (
    <div 
      onClick={onOpen}
      className={`relative flex flex-col items-center p-4 rounded-3xl border-3 ${isOpen ? 'border-[#fd728f]/40 bg-[#fffefb]' : 'border-black bg-white hover:border-[#fd728f]'} transition-all duration-300 select-none cursor-pointer`}
      style={{
        boxShadow: isOpen ? 'none' : '6px 6px 0px #000000',
        transform: isOpen ? 'translateY(2px)' : 'translateY(0px)',
        cursor: 'pointer',
        width: '100%',
        maxWidth: '190px',
        margin: '0 auto',
        boxSizing: 'border-box'
      }}
    >
      {/* Floating Sparkle / Gift Opened Badge */}
      {isOpen && (
        <span 
          className="absolute text-[10px] bg-[#fd728f] text-white px-2 py-0.5 rounded-full font-bold border border-black"
          style={{ top: '8px', right: '8px', boxShadow: '1.5px 1.5px 0px #000', zIndex: 5 }}
        >
          OPENED
        </span>
      )}

      {/* Live Animated Lottie Penguin */}
      <div 
        className={`transition-all duration-300 ${!isOpen ? 'hover:scale-105 hover:-translate-y-1' : ''}`}
        style={{ width: '110px', height: '110px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
      >
        <DotLottieReact
          src="https://lottie.host/2369fceb-b4b1-4956-94a8-307571c46bde/adnEPh46kv.lottie"
          loop
          autoplay
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Cute Penguin Name Label underneath */}
      <div className="mt-2 text-center select-none">
        <h4 className="font-sans font-bold text-sm tracking-wide text-black bg-[#ffd1d7]/40 px-3 py-0.5 rounded-full border border-black/10">
          🐧 {name}
        </h4>
      </div>
    </div>
  );
};

const BirthdayPage = ({ isMusicPlaying, toggleMusic }) => {
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [activeSubScreen, setActiveSubScreen] = useState('main'); // 'main', 'game', 'letter'
  const [activePopupGift, setActivePopupGift] = useState(null);
  const [openedGifts, setOpenedGifts] = useState([]);
  const [particles, setParticles] = useState([]);
  const [heartSparks, setHeartSparks] = useState([]);
  const [isSmileySpinned, setIsSmileySpinned] = useState(false);
  
  // Custom Candle Blowing Interactive States (Gift #1 - Mochi)
  const [candleLit, setCandleLit] = useState(true);
  const [showBlowAnimation, setShowBlowAnimation] = useState(false);

  // Kiwi's Picture Puzzle Game States (Gift #2 - Kiwi)
  const [puzzleStarted, setPuzzleStarted] = useState(false);
  const [puzzleSolved, setPuzzleSolved] = useState(false);
  const [puzzlePieces, setPuzzlePieces] = useState([]); // Array of 9 numbers (0-8 shuffled)
  const [selectedPieceIndex, setSelectedPieceIndex] = useState(null);
  
  // Custom Scattering Explosion Animation States
  const [isScattering, setIsScattering] = useState(false);
  const [scatterOffsets, setScatterOffsets] = useState([]);

  // Toffee's Picture Quiz Game States (Gift #3 - Toffee)
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showQuizError, setShowQuizError] = useState(false);
  const [quizSolved, setQuizSolved] = useState(false);

  // Polar's Retro Camera Game States (Gift #4 - Polar)
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraFlash, setCameraFlash] = useState(false);
  const [cameraPhotoIdx, setCameraPhotoIdx] = useState(0);

  // Misty's Interactive Hug Coupon & Poetry Scroll States (Gift #5 - Misty)
  const [hugCouponRedeemed, setHugCouponRedeemed] = useState(false);

  // Sparky's Balloon Pop Game States (Gift #6 - Sparky)
  const [poppedBalloons, setPoppedBalloons] = useState([]);
  const [flyingBullets, setFlyingBullets] = useState([]);
  const gunRef = useRef(null);

  // Generate confetti on component mount
  useEffect(() => {
    // Play unlock melody chime when page mounts
    playUnlockMelody();

    const colors = ['#00f2ff', '#ff007f', '#39ff14', '#ffe600', '#ff0055', '#a020f0'];
    const particleArray = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 6 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 5,
      duration: Math.random() * 4 + 4,
      opacity: Math.random() * 0.5 + 0.3
    }));
    setParticles(particleArray);
  }, []);

  const triggerSmileySpin = () => {
    if (isSmileySpinned) return;
    setIsSmileySpinned(true);
    setTimeout(() => setIsSmileySpinned(false), 900);
  };

  const triggerEnvelopeOpen = () => {
    const nextState = !envelopeOpen;
    setEnvelopeOpen(nextState);
    
    if (nextState) {
      // Release 18 floating romantic heart sparks rising upwards from the letter
      const sparks = Array.from({ length: 18 }).map((_, i) => ({
        id: Date.now() + i,
        left: `${45 + (Math.random() * 10 - 5)}%`,
        top: `${35 + (Math.random() * 10 - 5)}%`,
        scale: Math.random() * 0.5 + 0.7,
        tx: `${(Math.random() * 160 - 80)}px`,
        ty: `-${(Math.random() * 220 + 120)}px`,
        rot: `${(Math.random() * 90 - 45)}deg`,
        delay: `${Math.random() * 0.15}s`
      }));
      setHeartSparks(sparks);
      
      // Auto cleanup
      setTimeout(() => {
        setHeartSparks([]);
      }, 2200);
    }
  };

  // Kiwi's Picture Puzzle Startup & Shuffle Logic
  const startKiwiPuzzle = () => {
    let original = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    let shuffled = [...original];
    
    // Shuffle pieces randomly
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Double check it's not solved initially
    let isSame = shuffled.every((val, idx) => val === idx);
    if (isSame) {
      [shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
    }

    // Pre-generate random scattering offsets (pieces fly outward from center!)
    const offsets = Array.from({ length: 9 }).map(() => ({
      x: (Math.random() * 260 - 130), 
      y: (Math.random() * 260 - 130), 
      rot: (Math.random() * 360 - 180) 
    }));

    setScatterOffsets(offsets);
    setPuzzlePieces(shuffled);
    setIsScattering(true);
    setPuzzleStarted(true);
    setPuzzleSolved(false);
    setSelectedPieceIndex(null);

    // After 1.2 seconds, pull pieces back into grid to start game!
    setTimeout(() => {
      setIsScattering(false);
    }, 1300);
  };

  // Kiwi's Puzzle Swap Click Action
  const handlePuzzlePieceClick = (index) => {
    if (puzzleSolved || isScattering) return;
    if (selectedPieceIndex === null) {
      setSelectedPieceIndex(index);
    } else {
      // Swap clicked piece with the selected piece
      const updated = [...puzzlePieces];
      const temp = updated[selectedPieceIndex];
      updated[selectedPieceIndex] = updated[index];
      updated[index] = temp;
      
      setPuzzlePieces(updated);
      setSelectedPieceIndex(null);

      // Check if all pieces match their original indexes
      const solved = updated.every((val, idx) => val === idx);
      if (solved) {
        setPuzzleSolved(true);
        // Release beautiful romantic celebration sparks
        const sparks = Array.from({ length: 18 }).map((_, i) => ({
          id: Date.now() + i,
          left: `50%`,
          top: `50%`,
          scale: Math.random() * 0.5 + 0.8,
          tx: `${(Math.random() * 220 - 110)}px`,
          ty: `-${(Math.random() * 220 + 100)}px`,
          rot: `${(Math.random() * 90 - 45)}deg`,
          delay: `${Math.random() * 0.08}s`
        }));
        setHeartSparks(sparks);
        setTimeout(() => setHeartSparks([]), 2200);
      }
    }
  };

  // Trigger Polar's Polaroid Camera Shutter Flash & Next Photo
  const triggerCameraShutter = () => {
    setCameraFlash(true);
    
    // Quick camera flash visual effect
    setTimeout(() => {
      setCameraFlash(false);
      setCameraActive(true);
      
      // Auto cycle to next photo index
      setCameraPhotoIdx(prev => (prev + 1) % CAMERA_PHOTOS.length);
      
      // Release quick little stars spark
      const sparks = Array.from({ length: 10 }).map((_, i) => ({
        id: Date.now() + i,
        left: `50%`,
        top: `35%`,
        scale: Math.random() * 0.4 + 0.6,
        tx: `${(Math.random() * 120 - 60)}px`,
        ty: `-${(Math.random() * 120 + 50)}px`,
        rot: `${(Math.random() * 90 - 45)}deg`,
        delay: `${Math.random() * 0.05}s`
      }));
      setHeartSparks(sparks);
      setTimeout(() => setHeartSparks([]), 1500);
    }, 250);
  };

  // Trigger Misty's Hug Coupon Redeem
  const triggerMistyRedeem = () => {
    setHugCouponRedeemed(true);
    
    // Release a beautiful burst of flying heart sparks
    const sparks = Array.from({ length: 18 }).map((_, i) => ({
      id: Date.now() + i,
      left: `50%`,
      top: `75%`,
      scale: Math.random() * 0.5 + 0.8,
      tx: `${(Math.random() * 200 - 100)}px`,
      ty: `-${(Math.random() * 200 + 80)}px`,
      rot: `${(Math.random() * 90 - 45)}deg`,
      delay: `${Math.random() * 0.08}s`
    }));
    setHeartSparks(sparks);
    setTimeout(() => setHeartSparks([]), 2000);
  };

  // ================= SCREEN 2: GAME SCREEN (FULL-SCREEN PENGUIN ROOM) =================
  if (activeSubScreen === 'game') {
    return (
      <div className="kawaii-grid-page min-h-screen w-full relative flex flex-col justify-start items-center py-12 px-6 overflow-x-hidden select-none animate-slide-up-kawaii" style={{ boxSizing: 'border-box' }}>
        
        {/* Inject CSS styling for flicker candle flame & custom overlays */}
        <style>{`
          @keyframes flicker {
            0% { transform: scale(1) rotate(-1.5deg); }
            100% { transform: scale(1.08) rotate(1.5deg); }
          }
          @keyframes celebration-bounce {
            0%, 100% { transform: scale(1) translateY(0); }
            50% { transform: scale(1.06) translateY(-12px); }
          }
          @keyframes celebrate-bg {
            0% { background-color: rgba(253, 114, 143, 0.97); }
            50% { background-color: rgba(0, 242, 255, 0.97); }
            100% { background-color: rgba(253, 114, 143, 0.97); }
          }
          @keyframes pulse-neon-yellow {
            0% { transform: scale(1); text-shadow: 8px 8px 0px #000, 0 0 12px rgba(255,230,0,0.3); }
            100% { transform: scale(1.04); text-shadow: 8px 8px 0px #000, 0 0 25px rgba(255,230,0,0.8); }
          }
          @keyframes flash-shutter {
            0% { opacity: 0; }
            50% { opacity: 0.95; }
            100% { opacity: 0; }
          }
          .shutter-flash-overlay {
            position: absolute;
            inset: 0;
            background-color: #ffffff;
            z-index: 150;
            pointer-events: none;
            animation: flash-shutter 0.25s ease-out forwards;
            border-radius: 26px;
          }
          @keyframes polaroid-eject {
            0% { transform: translateY(-30px) scale(0.9); opacity: 0; }
            100% { transform: translateY(0px) scale(1); opacity: 1; }
          }
          .polaroid-eject-card {
            animation: polaroid-eject 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.2) forwards;
          }
          .custom-diary-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-diary-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-diary-scrollbar::-webkit-scrollbar-thumb {
            background: #fd728f;
            border: 2px solid #fffef9;
            border-radius: 10px;
          }
          @keyframes float-balloon {
            0%, 100% { transform: translateY(0) rotate(-2deg); }
            50% { transform: translateY(-4px) rotate(2deg); }
          }
          .animate-float-balloon {
            animation: float-balloon 2.5s ease-in-out infinite;
          }
          @keyframes gun-move-vertical {
            0% { transform: translateY(10px); }
            100% { transform: translateY(230px); }
          }
          .animate-gun-move-vertical {
            animation: gun-move-vertical 1.3s linear infinite alternate;
          }
          @keyframes shoot-right {
            0% { transform: translateX(0); opacity: 1; }
            100% { transform: translateX(180px); opacity: 0; }
          }
          .animate-shoot-right {
            animation: shoot-right 0.3s linear forwards;
          }
        `}</style>

        {/* Floating background particles */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 0 }}>
          {particles.map(p => (
            <div
              key={p.id}
              className="kawaii-confetti"
              style={{
                left: `${p.x}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: p.color,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
                opacity: p.opacity
              }}
            />
          ))}
        </div>

        {/* Gentle wind-swaying corner banners */}
        <div className="animate-bunting-sway-left" style={{ position: 'absolute', top: 0, left: 0, width: '220px', height: '100px', pointerEvents: 'none', zIndex: 10 }}>
          <svg width="100%" height="100%" viewBox="0 0 220 100" preserveAspectRatio="none">
            <path d="M-10,0 Q60,35 220,10" fill="none" stroke="#000000" strokeWidth="2.5" />
            <polygon points="15,11 35,14 20,40" fill="#fd728f" stroke="#000000" strokeWidth="2" />
            <polygon points="55,17 75,20 60,46" fill="#fff3f5" stroke="#000000" strokeWidth="2" />
            <polygon points="95,20 115,22 100,50" fill="#fd728f" stroke="#000000" strokeWidth="2" />
            <polygon points="135,21 155,22 140,51" fill="#fff3f5" stroke="#000000" strokeWidth="2" />
            <polygon points="175,19 195,17 180,48" fill="#fd728f" stroke="#000000" strokeWidth="2" />
          </svg>
        </div>

        <div className="animate-bunting-sway-right" style={{ position: 'absolute', top: 0, right: 0, width: '220px', height: '100px', pointerEvents: 'none', zIndex: 10 }}>
          <svg width="100%" height="100%" viewBox="0 0 220 100" preserveAspectRatio="none">
            <path d="M 230,0 Q 140,35 -10,10" fill="none" stroke="#000000" strokeWidth="2.5" />
            <polygon points="195,12 175,15 190,42" fill="#fd728f" stroke="#000000" strokeWidth="2" />
            <polygon points="155,19 135,22 150,49" fill="#fff3f5" stroke="#000000" strokeWidth="2" />
            <polygon points="115,23 95,25 110,53" fill="#fd728f" stroke="#000000" strokeWidth="2" />
            <polygon points="75,24 55,25 70,54" fill="#fff3f5" stroke="#000000" strokeWidth="2" />
            <polygon points="35,22 15,20 30,50" fill="#fd728f" stroke="#000000" strokeWidth="2" />
          </svg>
        </div>

        {/* Back Button */}
        <button 
          onClick={() => setActiveSubScreen('main')}
          className="kawaii-pill-button z-20"
          style={{ position: 'absolute', top: '24px', left: '24px', padding: '0.45rem 1.4rem', fontSize: '0.85rem' }}
        >
          ← Back
        </button>

        {/* Title Header */}
        <div className="text-center mt-12 mb-10 z-10">
          <span className="text-[11px] uppercase tracking-widest text-[#fd728f] font-bold bg-[#fd728f]/10 px-3 py-1 rounded-full border border-[#fd728f]/20">
            ★ Lady CR's Birthday Special ★
          </span>
          <h2 className="bubble-text-pink text-center mt-4 tracking-wide" style={{ fontSize: '2.8rem', WebkitTextStroke: '2px #000', textShadow: '4px 4px 0 #000', lineHeight: 1.1 }}>
            CLICK ON GIFTS TO OPEN
          </h2>
        </div>

        {/* Spacious Grid of 8 Live Animated Penguins with Beautiful Spacing */}
        <div 
          className="z-10"
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', 
            gap: '32px', 
            width: '100%',
            maxWidth: '1100px',
            justifyContent: 'center', 
            alignItems: 'center',
            margin: '20px 0 40px 0',
            padding: '0 15px'
          }}
        >
          {PENGUIN_GIFTS.map((gift) => (
            <PenguinGift 
              key={gift.id}
              id={gift.id}
              name={gift.name}
              title={gift.title}
              note={gift.note}
              isOpen={openedGifts.includes(gift.id)}
              isFinal={gift.isFinal}
              onOpen={() => {
                setOpenedGifts(prev => prev.includes(gift.id) ? prev : [...prev, gift.id]);
                if (gift.id === 1) {
                  setCandleLit(true);
                }
                if (gift.id === 2) {
                  setPuzzleStarted(false);
                  setPuzzleSolved(false);
                  setSelectedPieceIndex(null);
                  setIsScattering(false);
                }
                if (gift.id === 3) {
                  setQuizStarted(false);
                  setQuizSolved(false);
                  setCurrentQuestionIndex(0);
                  setSelectedAnswer(null);
                  setShowQuizError(false);
                }
                if (gift.id === 4) {
                  setCameraActive(false);
                  setCameraPhotoIdx(0);
                  setCameraFlash(false);
                }
                if (gift.id === 5) {
                  setHugCouponRedeemed(false);
                }
                if (gift.id === 6) {
                  setPoppedBalloons([]);
                  setFlyingBullets([]);
                }
                setActivePopupGift(gift);
              }}
            />
          ))}
        </div>

        {/* ================= STUNNING FULLSCREEN CANDLE CELEBRATION BANNER & ANIMATION ================= */}
        {showBlowAnimation && (
          <div 
            style={{ 
              position: 'fixed', 
              inset: 0, 
              zIndex: 200, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              animation: 'celebrate-bg 4s infinite',
              backdropFilter: 'blur(10px)',
              boxSizing: 'border-box',
              padding: '24px'
            }}
          >
            {/* Rich Rain of Floating Party Sparkles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden' }}>
              {Array.from({ length: 45 }).map((_, i) => (
                <span
                  key={i}
                  className="absolute text-4xl animate-bounce"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 1.5}s`,
                    animationDuration: `${Math.random() * 2.5 + 1.5}s`,
                    opacity: 0.95
                  }}
                >
                  {['🎉', '✨', '🎂', '🌟', '💖', '👑', '🌸', '🎈'][i % 8]}
                </span>
              ))}
            </div>

            {/* Bouncing Happy Birthday Lady CR Banner */}
            <div 
              className="text-center select-none"
              style={{
                animation: 'celebration-bounce 1s infinite alternate',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '18px'
              }}
            >
              {/* Giant Crown with neon animation */}
              <span className="text-8xl animate-pulse" style={{ filter: 'drop-shadow(0 0 20px rgba(255,230,0,0.6))' }}>👑</span>
              
              {/* Line 1: HAPPY BIRTHDAY */}
              <h1 
                className="font-black tracking-wider uppercase text-white"
                style={{ 
                  fontFamily: 'DynaPuff',
                  fontSize: '3.6rem', 
                  WebkitTextStroke: '2.5px #000000', 
                  textShadow: '6px 6px 0px #000000',
                  lineHeight: 1.2
                }}
              >
                🌸 HAPPY BIRTHDAY 🌸
              </h1>
              
              {/* Line 2: LADY CR! (Beautifully outlined in gold yellow with pulse glow!) */}
              <h1 
                className="font-black tracking-widest uppercase text-[#ffe600]"
                style={{ 
                  fontFamily: 'DynaPuff',
                  fontSize: '4.8rem', 
                  WebkitTextStroke: '3px #000000', 
                  textShadow: '8px 8px 0px #000000, 0px 0px 20px rgba(255, 230, 0, 0.4)',
                  lineHeight: 1.2,
                  animation: 'pulse-neon-yellow 1s infinite alternate'
                }}
              >
                LADY CR!
              </h1>
              
              <span className="text-xl font-bold bg-[#fffef2] text-black px-8 py-2.5 rounded-full border-4 border-black shadow-[5px_5px_0px_#000] mt-8 animate-pulse">
                🎂 Secret Wish Made! 🕯️💫
              </span>
            </div>
          </div>
        )}

        {/* ================= HIGHLY ADJUSTED MOBILE & PC COMPATIBLE SCROLL DIARY POPUP (MAX 90VH HEIGHT) ================= */}
        {activePopupGift && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 110, padding: '16px' }}>
            <div 
              className="animate-scale-in-kawaii animate-rainbow-glow-border custom-diary-scrollbar"
              style={{ 
                backgroundColor: '#fffef9', 
                backgroundImage: 'linear-gradient(to bottom, transparent 95%, #e1e9ff 95%)',
                backgroundSize: '100% 24px',
                border: '4px solid #000', 
                borderRadius: '26px', 
                boxShadow: '8px 8px 0px #000', 
                width: '100%', 
                maxWidth: '540px', 
                maxHeight: '88vh', 
                overflowY: 'auto', 
                padding: '28px 24px', 
                position: 'relative',
                boxSizing: 'border-box'
              }}
            >
              {/* Camera Shutter Flash visual white-out effect */}
              {cameraFlash && <div className="shutter-flash-overlay" />}

              {/* CUTE RETRO HIGH-CONTRAST "X" CLOSE BUTTON */}
              <button
                onClick={() => setActivePopupGift(null)}
                className="absolute flex items-center justify-center transition-all duration-200 select-none"
                style={{
                  top: '12px',
                  right: '12px',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#fffef2',
                  border: '2.5px solid #000',
                  boxShadow: '2px 2px 0px #000',
                  cursor: 'pointer',
                  zIndex: 130
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#fd728f';
                  e.currentTarget.style.transform = 'translateY(1px) scale(0.96)';
                  e.currentTarget.style.boxShadow = '1px 1px 0px #000';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#fffef2';
                  e.currentTarget.style.transform = 'translateY(0px) scale(1)';
                  e.currentTarget.style.boxShadow = '2px 2px 0px #000';
                }}
              >
                <X className="w-4 h-4 text-black font-black" strokeWidth={3.5} />
              </button>

              {/* Washi Tape */}
              <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%) rotate(-1.5deg)', width: '120px', height: '30px', backgroundColor: 'rgba(253, 114, 143, 0.35)', border: '2.5px dashed #fd728f', pointerEvents: 'none' }} />
              
              {/* Scrapbook stickers */}
              <span className="absolute top-3 left-3 text-xs opacity-50">✨</span>
              <span className="absolute bottom-3 left-3 text-xs opacity-50">🌸</span>
              <span className="absolute bottom-3 right-3 text-xs opacity-50">🐾</span>

              {/* Heart Sparks Overlay */}
              {heartSparks.map((spark) => (
                <span
                  key={spark.id}
                  style={{
                    position: 'absolute',
                    left: spark.left,
                    top: spark.top,
                    fontSize: '28px',
                    pointerEvents: 'none',
                    zIndex: 120,
                    animationDelay: spark.delay,
                    '--tx': spark.tx,
                    '--ty': spark.ty,
                    '--rot': spark.rot,
                  }}
                  className="envelope-heart-spark"
                >
                  💖
                </span>
              ))}

              {/* SPECIAL INTERACTIVE CAKE ACTIVITY FOR MOCHI (Gift #1) */}
              {activePopupGift.id === 1 ? (
                <div className="flex flex-col items-center">
                  <h3 style={{ fontFamily: 'DynaPuff', fontSize: '1.35rem', color: '#fd728f', textAlign: 'center', marginBottom: '4px', WebkitTextStroke: '1px #000', textShadow: '1.5px 1.5px 0px #000' }}>
                    ★ Mochi's Special Birthday Cake ★
                  </h3>

                  {/* PREMIUM DETAILED TRIPLE-DECKER BIRTHDAY CAKE */}
                  <div className="my-4 flex items-center justify-center" style={{ minHeight: '190px' }}>
                    <svg width="220" height="180" viewBox="0 0 240 200" style={{ overflow: 'visible', filter: 'drop-shadow(4px 4px 0px rgba(0,0,0,0.1))' }}>
                      <ellipse cx="120" cy="180" rx="95" ry="14" fill="#fff" stroke="#000" strokeWidth="3.5" />
                      <rect x="95" y="180" width="50" height="12" fill="#fff" stroke="#000" strokeWidth="3.5" />
                      <circle cx="40" cy="180" r="4" fill="#ffd1d7" stroke="#000" strokeWidth="1.5" />
                      <circle cx="60" cy="180" r="4" fill="#ffd1d7" stroke="#000" strokeWidth="1.5" />
                      <circle cx="80" cy="180" r="4" fill="#ffd1d7" stroke="#000" strokeWidth="1.5" />
                      <circle cx="100" cy="180" r="4" fill="#ffd1d7" stroke="#000" strokeWidth="1.5" />
                      <circle cx="120" cy="180" r="4" fill="#ffd1d7" stroke="#000" strokeWidth="1.5" />
                      <circle cx="140" cy="180" r="4" fill="#ffd1d7" stroke="#000" strokeWidth="1.5" />
                      <circle cx="160" cy="180" r="4" fill="#ffd1d7" stroke="#000" strokeWidth="1.5" />
                      <circle cx="180" cy="180" r="4" fill="#ffd1d7" stroke="#000" strokeWidth="1.5" />
                      <circle cx="200" cy="180" r="4" fill="#ffd1d7" stroke="#000" strokeWidth="1.5" />

                      {/* LAYER 3 (Bottom Layer) */}
                      <rect x="40" y="120" width="160" height="60" rx="10" fill="#ffd1d7" stroke="#000" strokeWidth="3.5" />
                      <path d="M 40 135 C 50 150, 60 150, 70 135 C 80 150, 90 150, 100 135 C 110 150, 120 150, 130 135 C 140 150, 150 150, 160 135 C 170 150, 180 150, 190 135 C 195 150, 200 135, 200 135" fill="#ff4d6d" stroke="#000" strokeWidth="3" />
                      <circle cx="60" cy="160" r="3" fill="#ffe600" stroke="#000" strokeWidth="1" />
                      <rect x="90" y="155" width="8" height="3" rx="1" fill="#00f2ff" stroke="#000" strokeWidth="1" transform="rotate(30 90 155)" />
                      <circle cx="130" cy="165" r="3.5" fill="#fff" stroke="#000" strokeWidth="1" />
                      <rect x="165" y="158" width="8" height="3" rx="1" fill="#ffe600" stroke="#000" strokeWidth="1" transform="rotate(-40 165 158)" />
                      <circle cx="180" cy="155" r="2.5" fill="#a020f0" stroke="#000" strokeWidth="1" />

                      {/* LAYER 2 (Middle Layer) */}
                      <rect x="55" y="75" width="130" height="45" rx="8" fill="#fffef2" stroke="#000" strokeWidth="3.5" />
                      <path d="M 55 90 Q 70 100 85 90 Q 100 100 115 90 Q 130 100 145 90 Q 160 100 175 90 Q 185 100 185 90" fill="none" stroke="#6f4e37" strokeWidth="4.5" strokeLinecap="round" />
                      <text x="80" y="112" fontSize="11" fill="#ff007f">⭐</text>
                      <text x="145" y="112" fontSize="11" fill="#00f2ff">⭐</text>

                      {/* LAYER 1 (Top Layer) */}
                      <rect x="75" y="40" width="90" height="35" rx="6" fill="#ffd1d7" stroke="#000" strokeWidth="3.5" />
                      <ellipse cx="90" cy="40" rx="8" ry="5" fill="#fff" stroke="#000" strokeWidth="2" />
                      <ellipse cx="120" cy="40" rx="8" ry="5" fill="#fff" stroke="#000" strokeWidth="2" />
                      <ellipse cx="150" cy="40" rx="8" ry="5" fill="#fff" stroke="#000" strokeWidth="2" />
                      
                      <path d="M 98 25 C 93 25 90 32 98 38 C 106 32 103 25 98 25 Z" fill="#ff4d6d" stroke="#000" strokeWidth="2" />
                      <circle cx="95" cy="30" r="0.6" fill="#fff" />
                      <circle cx="101" cy="33" r="0.6" fill="#fff" />

                      <path d="M 142 25 C 137 25 134 32 142 38 C 150 32 147 25 142 25 Z" fill="#ff4d6d" stroke="#000" strokeWidth="2" />
                      <circle cx="139" cy="30" r="0.6" fill="#fff" />
                      <circle cx="145" cy="33" r="0.6" fill="#fff" />

                      {/* Striped Candle */}
                      <rect x="117" y="12" width="6" height="28" fill="#ffe600" stroke="#000" strokeWidth="2" rx="1" />
                      <path d="M 117 18 L 123 21" stroke="#ff4d6d" strokeWidth="2" />
                      <path d="M 117 26 L 123 29" stroke="#ff4d6d" strokeWidth="2" />
                      <path d="M 117 34 L 123 37" stroke="#ff4d6d" strokeWidth="2" />

                      {candleLit ? (
                        <g>
                          <circle cx="120" cy="-2" r="14" fill="#ffe600" opacity="0.3" className="animate-ping" style={{ animationDuration: '1.0s' }} />
                          <path 
                            d="M 120 -15 C 114 -3 117 8 120 8 C 123 8 126 -3 120 -15 Z" 
                            fill="#ffb703" 
                            stroke="#000" 
                            strokeWidth="2.2" 
                            style={{ transformOrigin: '120px 8px', animation: 'flicker 0.12s infinite alternate' }} 
                          />
                          <path d="M 120 -8 C 117 -2 118 6 120 6 C 122 6 123 -2 120 -8 Z" fill="#fff" />
                        </g>
                      ) : (
                        <path 
                          d="M 120 5 Q 115 -10 125 -25 Q 120 -40 120 -46" 
                          fill="none" 
                          stroke="#777" 
                          strokeWidth="2.5" 
                          strokeLinecap="round"
                          className="animate-pulse"
                          style={{ opacity: 0.8 }}
                        />
                      )}
                    </svg>
                  </div>

                  {candleLit ? (
                    <div className="text-center w-full">
                      <p style={{ fontFamily: 'Fredoka', fontSize: '1.0rem', color: '#555', marginBottom: '18px', lineHeight: '1.45' }}>
                        Look! Mochi baked an amazing triple-decker strawberry chocolate cake for you! 🎂 Let's blow the candle to make a secret wish!
                      </p>
                      <div className="flex justify-center">
                        <button 
                          onClick={() => {
                            setCandleLit(false);
                            setShowBlowAnimation(true);
                            setTimeout(() => {
                              setShowBlowAnimation(false);
                            }, 4000);
                          }}
                          className="kawaii-pill-button text-sm animate-bounce"
                          style={{ padding: '0.6rem 2.2rem', backgroundColor: '#00f2ff', border: '3px solid #000' }}
                        >
                          💨 Tap to Blow Candle!
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center w-full animate-fade-in">
                      <div className="inline-block bg-[#00f2ff]/10 text-[#008ba3] text-xs font-bold px-4 py-1 rounded-full border border-[#00f2ff]/30 mb-3">
                        ★ CANDLE BLOWN OUT! 🕯️💫 ★
                      </div>
                      <p style={{ fontFamily: 'Fredoka', fontSize: '1.05rem', color: '#222', lineHeight: '1.55', marginBottom: '18px' }}>
                        "{activePopupGift.note}"
                      </p>
                      <div className="flex justify-center">
                        <button 
                          onClick={() => setActivePopupGift(null)}
                          className="kawaii-pill-button"
                          style={{ padding: '0.5rem 2.2rem' }}
                        >
                          Yay! 🌸
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : activePopupGift.id === 2 ? (
                /* SPECIAL INTERACTIVE PICTURE PUZZLE GAME FOR KIWI (Gift #2) */
                <div className="flex flex-col items-center">
                  <h3 style={{ fontFamily: 'DynaPuff', fontSize: '1.35rem', color: '#fd728f', textAlign: 'center', marginBottom: '2px', WebkitTextStroke: '1px #000', textShadow: '1.5px 1.5px 0px #000' }}>
                    ★ Kiwi's Memory Photo Puzzle ★
                  </h3>

                  {!puzzleStarted ? (
                    <div className="flex flex-col items-center mt-2">
                      <img 
                        src="/IMG-20251215-WA0126.jpg" 
                        alt="Sweet scrapbook memory photo"
                        style={{
                          width: '210px',
                          height: '280px',
                          objectFit: 'contain',
                          backgroundColor: '#ffffff',
                          borderRadius: '16px',
                          border: '3px solid #000',
                          boxShadow: '4px 4px 0px #000',
                          cursor: 'pointer',
                          transition: 'all 0.3s'
                        }}
                        className="hover:scale-102 active:scale-98"
                        onClick={startKiwiPuzzle}
                      />
                      <p style={{ fontFamily: 'Fredoka', fontSize: '0.92rem', color: '#555', marginTop: '16px', textAlign: 'center', lineHeight: '1.45' }}>
                        A gorgeous portrait of you! ❤️ Tap on the photo to watch the pieces scatter and start the game!
                      </p>
                      <button 
                        onClick={startKiwiPuzzle}
                        className="kawaii-pill-button mt-3 animate-pulse"
                        style={{ padding: '0.55rem 2.2rem', backgroundColor: '#fd728f', color: '#fff', fontSize: '0.85rem' }}
                      >
                        🧩 Shatter Into Puzzle!
                      </button>
                    </div>
                  ) : !puzzleSolved ? (
                    <div className="flex flex-col items-center mt-1 w-full">
                      <p style={{ fontFamily: 'Fredoka', fontSize: '0.88rem', color: '#666', marginBottom: '10px', textAlign: 'center' }}>
                        {isScattering ? "💥 SHATTERING PIECES OUTWARD! 💨" : "Tap any 2 pieces to swap them and rebuild the photo! 🧩"}
                      </p>

                      <div 
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(3, 73px)',
                          gridTemplateRows: 'repeat(3, 97px)',
                          gap: '4px',
                          width: '235px',
                          height: '307px',
                          backgroundColor: '#000',
                          padding: '4px',
                          borderRadius: '16px',
                          border: '3px solid #000',
                          boxShadow: '4px 4px 0px #000',
                          boxSizing: 'border-box',
                          overflow: 'visible', 
                          position: 'relative'
                        }}
                      >
                        {puzzlePieces.map((originalPos, index) => {
                          const r = Math.floor(originalPos / 3);
                          const c = originalPos % 3;
                          const isSelected = index === selectedPieceIndex;
                          const offset = scatterOffsets[index] || { x: 0, y: 0, rot: 0 };
                          
                          return (
                            <div
                              key={index}
                              onClick={() => handlePuzzlePieceClick(index)}
                              style={{
                                width: '73px',
                                height: '97px',
                                backgroundImage: 'url("/IMG-20251215-WA0126.jpg")',
                                backgroundPosition: `-${c * 73}px -${r * 97}px`,
                                backgroundSize: '219px 291px',
                                cursor: isScattering ? 'default' : 'pointer',
                                position: 'relative',
                                boxSizing: 'border-box',
                                border: isSelected ? '3.5px solid #fd728f' : '1.2px solid rgba(255,255,255,0.25)',
                                borderRadius: '6px',
                                transition: isScattering 
                                  ? 'transform 1.2s cubic-bezier(0.19, 1, 0.22, 1)' 
                                  : 'transform 0.22s ease-out, border-color 0.18s, opacity 0.18s',
                                
                                transform: isScattering
                                  ? `translate(${offset.x}px, ${offset.y}px) rotate(${offset.rot}deg) scale(0.65)`
                                  : isSelected 
                                    ? 'scale(0.92)' 
                                    : 'scale(1)',
                                
                                opacity: isScattering ? 0.8 : isSelected ? 0.75 : 1,
                                zIndex: isScattering ? 50 : isSelected ? 10 : 1,
                                boxShadow: isScattering ? '4px 4px 8px rgba(0,0,0,0.3)' : 'none'
                              }}
                            >
                              {isSelected && (
                                <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(253, 114, 143, 0.2)', pointerEvents: 'none' }} />
                              )}
                            </div>
                          );
                        })}
                      </div>

                      <button 
                        onClick={() => {
                          setIsScattering(false);
                          setPuzzleStarted(false);
                        }}
                        className="kawaii-pill-button mt-4"
                        style={{ padding: '0.4rem 1.4rem', fontSize: '0.8rem' }}
                      >
                        🏳️ Reset Puzzle
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center mt-2 animate-fade-in">
                      <div className="bg-[#39ff14]/15 text-[#2cba0f] text-xs font-bold px-4 py-1.5 rounded-full border border-[#39ff14]/30 mb-3 animate-pulse">
                        🎉 PUZZLE SOLVED! YOU ARE A GENIUS! 💖
                      </div>
                      
                      <img 
                        src="/IMG-20251215-WA0126.jpg" 
                        alt="Sweet scrapbook memory photo solved"
                        style={{
                          width: '210px',
                          height: '280px',
                          objectFit: 'contain',
                          backgroundColor: '#ffffff',
                          borderRadius: '16px',
                          border: '3px solid #000',
                          boxShadow: '4px 4px 0px #000'
                        }}
                      />

                      <p style={{ fontFamily: 'Fredoka', fontSize: '1.05rem', color: '#222', lineHeight: '1.55', marginTop: '16px', textAlign: 'center' }}>
                        "{activePopupGift.note}"
                      </p>

                      <div className="flex justify-center mt-4">
                        <button 
                          onClick={() => setActivePopupGift(null)}
                          className="kawaii-pill-button"
                          style={{ padding: '0.5rem 2.2rem' }}
                        >
                          Yay! 🌸
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : activePopupGift.id === 3 ? (
                /* SPECIAL INTERACTIVE PICTURE SQUAD QUIZ FOR TOFFEE (Gift #3) */
                <div className="flex flex-col items-center">
                  <h3 style={{ fontFamily: 'DynaPuff', fontSize: '1.3rem', color: '#fd728f', textAlign: 'center', marginBottom: '4px', WebkitTextStroke: '1px #000', textShadow: '1.5px 1.5px 0px #000' }}>
                    ★ Toffee's Secret Squad Quiz ★
                  </h3>

                  {!quizStarted ? (
                    <div className="flex flex-col items-center mt-2">
                      <img 
                        src="/IMG-20251215-WA0131.jpg" 
                        alt="Sweet scrapbook squad photo"
                        style={{
                          width: '260px',
                          height: '195px',
                          objectFit: 'contain',
                          backgroundColor: '#ffffff',
                          borderRadius: '16px',
                          border: '3px solid #000',
                          boxShadow: '4px 4px 0px #000'
                        }}
                      />
                      <p style={{ fontFamily: 'Fredoka', fontSize: '0.95rem', color: '#555', marginTop: '14px', textAlign: 'center', lineHeight: '1.45' }}>
                        Ready to test your squad observations? 🕵️‍♀️ Answer 6 funny questions about this picture to unlock Toffee's secret wish!
                      </p>
                      <button 
                        onClick={() => {
                          setQuizStarted(true);
                          setCurrentQuestionIndex(0);
                          setSelectedAnswer(null);
                          setShowQuizError(false);
                          setQuizSolved(false);
                        }}
                        className="kawaii-pill-button mt-3 animate-bounce"
                        style={{ padding: '0.55rem 2.2rem', backgroundColor: '#fd728f', color: '#fff', fontSize: '0.85rem' }}
                      >
                        🚀 Start Squad Quiz!
                      </button>
                    </div>
                  ) : !quizSolved ? (
                    <div 
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: '16px',
                        alignItems: 'stretch',
                        justifyContent: 'center',
                        width: '100%',
                        marginTop: '10px'
                      }}
                    >
                      <div 
                        style={{
                          flex: '1 1 140px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <img 
                          src="/IMG-20251215-WA0131.jpg" 
                          alt="Squad reference graphic" 
                          style={{
                            width: '100%',
                            maxWidth: '140px',
                            height: '185px',
                            objectFit: 'contain',
                            backgroundColor: '#ffffff',
                            borderRadius: '12px',
                            border: '2.5px solid #000',
                            boxShadow: '3px 3px 0px #000'
                          }}
                        />
                        <span className="text-[9px] text-black/50 mt-1.5 font-bold tracking-wider animate-pulse">🔎 STUDY THIS PIC!</span>
                      </div>

                      <div 
                        style={{
                          flex: '1 1 200px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between'
                        }}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[10px] font-bold text-[#fd728f] bg-[#fd728f]/10 px-2.5 py-0.5 rounded-full border border-[#fd728f]/20">
                            Q {currentQuestionIndex + 1} of 6
                          </span>
                          <div style={{ display: 'flex', gap: '3px' }}>
                            {Array.from({ length: 6 }).map((_, i) => (
                              <div 
                                key={i} 
                                style={{
                                  width: '8px',
                                  height: '8px',
                                  borderRadius: '50%',
                                  backgroundColor: i < currentQuestionIndex ? '#39ff14' : i === currentQuestionIndex ? '#fd728f' : '#e0e0e0',
                                  border: '1.2px solid #000'
                                }}
                              />
                            ))}
                          </div>
                        </div>

                        <h4 style={{ fontFamily: 'Fredoka', fontSize: '0.95rem', color: '#000', fontWeight: 'bold', marginBottom: '10px', lineHeight: '1.35' }}>
                          {TOFFEE_QUIZ_QUESTIONS[currentQuestionIndex].question}
                        </h4>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          {TOFFEE_QUIZ_QUESTIONS[currentQuestionIndex].options.map((opt, optIdx) => {
                            const isCorrect = optIdx === TOFFEE_QUIZ_QUESTIONS[currentQuestionIndex].correctIdx;
                            const isSelected = selectedAnswer === optIdx;
                            return (
                              <button
                                key={optIdx}
                                onClick={() => {
                                  if (selectedAnswer !== null) return;
                                  setSelectedAnswer(optIdx);
                                  
                                  if (isCorrect) {
                                    setShowQuizError(false);
                                    setTimeout(() => {
                                      if (currentQuestionIndex < 5) {
                                        setCurrentQuestionIndex(prev => prev + 1);
                                        setSelectedAnswer(null);
                                      } else {
                                        setQuizSolved(true);
                                        const sparks = Array.from({ length: 18 }).map((_, i) => ({
                                          id: Date.now() + i,
                                          left: `50%`,
                                          top: `50%`,
                                          scale: Math.random() * 0.5 + 0.8,
                                          tx: `${(Math.random() * 220 - 110)}px`,
                                          ty: `-${(Math.random() * 220 + 100)}px`,
                                          rot: `${(Math.random() * 90 - 45)}deg`,
                                          delay: `${Math.random() * 0.08}s`
                                        }));
                                        setHeartSparks(sparks);
                                        setTimeout(() => setHeartSparks([]), 2200);
                                      }
                                    }, 900);
                                  } else {
                                    setShowQuizError(true);
                                    setTimeout(() => {
                                      setSelectedAnswer(null);
                                      setShowQuizError(false);
                                    }, 1500);
                                  }
                                }}
                                className="kawaii-pill-button text-left w-full transition-all duration-300"
                                style={{
                                  padding: '0.45rem 0.85rem',
                                  backgroundColor: isSelected
                                    ? isCorrect
                                      ? '#39ff14' 
                                      : '#ff4d6d' 
                                    : '#fff',
                                  color: isSelected ? '#fff' : '#000',
                                  border: '2px solid #000',
                                  fontSize: '0.78rem',
                                  lineHeight: '1.2'
                                }}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>

                        <div style={{ minHeight: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '6px' }}>
                          {showQuizError && (
                            <p className="text-red-500 font-bold text-[10px] animate-bounce">
                              ❌ Wrong answer! Try again! 🤭
                            </p>
                          )}
                          {selectedAnswer !== null && selectedAnswer === TOFFEE_QUIZ_QUESTIONS[currentQuestionIndex].correctIdx && (
                            <p className="text-green-600 font-bold text-[10px] animate-pulse">
                              🎉 Correct! Loading next... ✨
                            </p>
                          )}
                        </div>

                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center mt-2 animate-fade-in">
                      <div className="bg-[#39ff14]/15 text-[#2cba0f] text-xs font-bold px-4 py-1.5 rounded-full border border-[#39ff14]/30 mb-3 animate-pulse">
                        🏆 SQUAD DETECTIVE ELITE CERTIFIED! 🔎💖
                      </div>
                      
                      <img 
                        src="/IMG-20251215-WA0131.jpg" 
                        alt="Sweet scrapbook squad photo solved"
                        style={{
                          width: '260px',
                          height: '195px',
                          objectFit: 'contain',
                          backgroundColor: '#ffffff',
                          borderRadius: '16px',
                          border: '3px solid #000',
                          boxShadow: '4px 4px 0px #000'
                        }}
                      />

                      <p style={{ fontFamily: 'Fredoka', fontSize: '1.05rem', color: '#222', lineHeight: '1.55', marginTop: '16px', textAlign: 'center' }}>
                        "{activePopupGift.note}"
                      </p>

                      <div className="flex justify-center mt-4">
                        <button 
                          onClick={() => setActivePopupGift(null)}
                          className="kawaii-pill-button"
                          style={{ padding: '0.5rem 2.2rem' }}
                        >
                          Yay! 🌸
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : activePopupGift.id === 4 ? (
                /* SPECIAL INTERACTIVE POLAROID CAMERA GAME FOR POLAR (Gift #4) */
                <div className="flex flex-col items-center">
                  <h3 style={{ fontFamily: 'DynaPuff', fontSize: '1.35rem', color: '#fd728f', textAlign: 'center', marginBottom: '2px', WebkitTextStroke: '1px #000', textShadow: '1.5px 1.5px 0px #000' }}>
                    ★ Polar's Memory Magic Camera ★
                  </h3>

                  {/* COMPACT RETRO VECTOR CAMERA WIDGET */}
                  <div className="my-3 flex flex-col items-center z-10">
                    <svg 
                      width="140" 
                      height="85" 
                      viewBox="0 0 180 110" 
                      style={{ cursor: 'pointer', overflow: 'visible', filter: 'drop-shadow(4px 4px 0px rgba(0,0,0,0.12))' }}
                      onClick={triggerCameraShutter}
                    >
                      <rect x="10" y="20" width="160" height="80" rx="14" fill="#2d3748" stroke="#000" strokeWidth="3.5" />
                      <rect x="25" y="10" width="130" height="10" rx="4" fill="#4a5568" stroke="#000" strokeWidth="3.5" />
                      
                      <g className="animate-bounce" style={{ animationDuration: '2s' }}>
                        <rect x="35" y="0" width="22" height="10" rx="2" fill="#ffe600" stroke="#000" strokeWidth="3" />
                      </g>
                      
                      <rect x="10" y="50" width="160" height="8" fill="#ff4d6d" />
                      <rect x="10" y="58" width="160" height="8" fill="#ffe600" />
                      <rect x="10" y="66" width="160" height="8" fill="#00f2ff" />
                      
                      <circle cx="90" cy="60" r="32" fill="#1a202c" stroke="#000" strokeWidth="4" />
                      <circle cx="90" cy="60" r="24" fill="#0d131e" stroke="#000" strokeWidth="2" />
                      <circle cx="90" cy="60" r="16" fill="#00b4d8" opacity="0.85" />
                      <ellipse cx="84" cy="54" rx="4" ry="7" fill="#fff" transform="rotate(-30 84 54)" />
                      
                      <rect x="125" y="10" width="24" height="15" rx="3" fill="#edf2f7" stroke="#000" strokeWidth="3" />
                      <circle cx="137" cy="17" r="4.5" fill="#ffe600" />
                      
                      <circle cx="150" cy="35" r="3.5" fill="#e53e3e" stroke="#000" strokeWidth="1.5" className="animate-pulse" />
                    </svg>

                    <p style={{ fontFamily: 'Fredoka', fontSize: '0.8rem', color: '#666', marginTop: '6px', textAlign: 'center', fontStyle: 'italic' }}>
                      (Tap camera shutter button to click a photo!)
                    </p>
                  </div>

                  {!cameraActive ? (
                    <div className="flex flex-col items-center mt-1 w-full text-center">
                      <p style={{ fontFamily: 'Fredoka', fontSize: '0.95rem', color: '#333', lineHeight: '1.45', marginBottom: '14px' }}>
                        Polar has loaded a magic roll of 11 secret memory cards inside his camera! 📸 Tap the camera above to start clicking and ejecting them!
                      </p>
                      <button 
                        onClick={triggerCameraShutter}
                        className="kawaii-pill-button animate-bounce"
                        style={{ padding: '0.5rem 2rem', backgroundColor: '#ffe600', color: '#000', fontSize: '0.85rem' }}
                      >
                        📸 CLICK SHUTTER!
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center w-full mt-1">
                      
                      {/* COMPACT DYNAMIC EJECTING POLAROID CARD */}
                      <div 
                        key={cameraPhotoIdx} 
                        className="polaroid-eject-card"
                        style={{
                          backgroundColor: '#ffffff',
                          border: '3px solid #000',
                          borderRadius: '14px',
                          boxShadow: '4px 4px 0px #000',
                          padding: '10px 10px 12px 10px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          width: '200px',
                          boxSizing: 'border-box'
                        }}
                      >
                        <img 
                          src={CAMERA_PHOTOS[cameraPhotoIdx]} 
                          alt="Magic Camera Slide" 
                          style={{
                            width: '100%',
                            height: '170px',
                            objectFit: 'contain',
                            border: '2px solid #000',
                            borderRadius: '6px',
                            backgroundColor: '#ffffff'
                          }}
                        />

                        {/* Caption text */}
                        <p style={{ fontFamily: 'Fredoka', fontSize: '0.8rem', fontWeight: 'bold', color: '#fd728f', marginTop: '10px', textAlign: 'center', lineHeight: '1.2' }}>
                          {CAMERA_PHOTO_CAPTIONS[cameraPhotoIdx]}
                        </p>
                        
                        <span className="text-[8px] font-bold text-black/35 uppercase tracking-widest mt-1">
                          📸 Photo {cameraPhotoIdx + 1} of {CAMERA_PHOTOS.length}
                        </span>
                      </div>

                      {/* Slideshow controllers */}
                      <div className="flex justify-between items-center gap-4 mt-4 w-full max-w-[260px]">
                        <button
                          onClick={() => setCameraPhotoIdx(prev => (prev - 1 + CAMERA_PHOTOS.length) % CAMERA_PHOTOS.length)}
                          className="kawaii-pill-button text-[10px]"
                          style={{ padding: '0.4rem 0.95rem' }}
                        >
                          👈 Prev
                        </button>

                        <button 
                          onClick={triggerCameraShutter}
                          className="kawaii-pill-button text-[10px]"
                          style={{ padding: '0.4rem 1.1rem', backgroundColor: '#ffe600' }}
                        >
                          ⚡ Click!
                        </button>

                        <button
                          onClick={() => setCameraPhotoIdx(prev => (prev + 1) % CAMERA_PHOTOS.length)}
                          className="kawaii-pill-button text-[10px]"
                          style={{ padding: '0.4rem 0.95rem' }}
                        >
                          Next 👉
                        </button>
                      </div>

                      {/* Beauty Stamp note and gold medal reveal */}
                      <div className="w-full text-center mt-5 border-t border-dashed border-black/10 pt-4 animate-fade-in">
                        <p style={{ fontFamily: 'Fredoka', fontSize: '0.98rem', color: '#222', lineHeight: '1.5', marginBottom: '16px' }}>
                          "{activePopupGift.note}"
                        </p>
                        <div className="flex justify-center">
                          <button 
                            onClick={() => setActivePopupGift(null)}
                            className="kawaii-pill-button"
                            style={{ padding: '0.5rem 2.2rem' }}
                          >
                            Yay! 🌸
                          </button>
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              ) : activePopupGift.id === 5 ? (
                /* SPECIAL INTERACTIVE POETRY SCROLLS & HUG COUPON FOR MISTY (Gift #5) */
                <div className="flex flex-col items-center">
                  <h3 style={{ fontFamily: 'DynaPuff', fontSize: '1.35rem', color: '#fd728f', textAlign: 'center', marginBottom: '6px', WebkitTextStroke: '1px #000', textShadow: '1.5px 1.5px 0px #000' }}>
                    ★ Misty's Funny Poetry Book ★
                  </h3>
                  
                  <p style={{ fontFamily: 'Fredoka', fontSize: '0.85rem', color: '#666', marginBottom: '16px', textAlign: 'center', fontStyle: 'italic' }}>
                    Misty has handwritten two beautiful poems just for you! 🐧✨
                  </p>

                  {/* POETRY CARD 1 */}
                  <div 
                    className="w-full bg-[#fffdf5] border-2 border-black rounded-2xl p-4 shadow-[4px_4px_0_#000] relative select-text"
                    style={{ boxSizing: 'border-box' }}
                  >
                    <span className="absolute top-2.5 right-2.5 text-base">🌸🌙</span>
                    <p 
                      className="italic text-[#d6336c] font-bold text-center leading-relaxed"
                      style={{ fontFamily: 'Fredoka', fontSize: '0.92rem' }}
                    >
                      Chand bhi aaj tumse sharma jayega,<br/>
                      Cake bhi tumhe dekh muskura jayega,<br/>
                      Jo bhi maango mile har baar,<br/>
                      Happy Birthday to the sweetest superstar ✨
                    </p>
                  </div>

                  {/* POETRY CARD 2 */}
                  <div 
                    className="w-full bg-[#fdf7f7] border-2 border-black rounded-2xl p-4 shadow-[4px_4px_0_#000] relative select-text mt-4"
                    style={{ boxSizing: 'border-box' }}
                  >
                    <span className="absolute top-2.5 right-2.5 text-base">🎈👑</span>
                    <p 
                      className="italic text-[#2b2b2b] font-bold text-center leading-relaxed"
                      style={{ fontFamily: 'Fredoka', fontSize: '0.92rem' }}
                    >
                      Na tension ho, na koi fight,<br/>
                      Tumhari smile lage full bright,<br/>
                      Har din tumhara ho shining day,<br/>
                      Happy Birthday in the cutest way 🐧✨
                    </p>
                  </div>

                  <div className="flex justify-center mt-6">
                    <button 
                      onClick={() => setActivePopupGift(null)}
                      className="kawaii-pill-button"
                      style={{ padding: '0.5rem 2.2rem' }}
                    >
                      Yay! 🌸
                    </button>
                  </div>

                </div>
              ) : activePopupGift.id === 6 ? (
                /* CARNIVAL SHOOTER GAME FOR SPARKY (Gift #6) */
                <div className="flex flex-col items-center">
                  <h3 style={{ fontFamily: 'DynaPuff', fontSize: '1.35rem', color: '#fd728f', textAlign: 'center', marginBottom: '2px', WebkitTextStroke: '1px #000', textShadow: '1.5px 1.5px 0px #000' }}>
                    ★ Carnival Shooter ★
                  </h3>
                  
                  {poppedBalloons.length < 3 ? (
                    <div className="flex flex-col items-center mt-2 w-full">
                      <p style={{ fontFamily: 'Fredoka', fontSize: '0.92rem', color: '#555', marginBottom: '14px', textAlign: 'center', lineHeight: '1.45' }}>
                        Tap the box to shoot! 🔫 Pop all 3 balloons to reveal the pictures! 🎈
                      </p>
                      
                      <div 
                        id="sparky-game-container"
                        onClick={() => {
                          const gunEl = gunRef.current;
                          const containerEl = document.getElementById('sparky-game-container');
                          if (!gunEl || !containerEl) return;
                          
                          const gunRect = gunEl.getBoundingClientRect();
                          const containerRect = containerEl.getBoundingClientRect();
                          
                          // relative Y from top of container
                          const relativeY = gunRect.top - containerRect.top + (gunRect.height / 2) - 4;
                          
                          let hitIndex = -1;
                          for (let i = 0; i < 3; i++) {
                            const balloonEl = document.getElementById(`sparky-balloon-${i}`);
                            if (balloonEl && !poppedBalloons.includes(i)) {
                              const bRect = balloonEl.getBoundingClientRect();
                              const gunCenter = gunRect.top + gunRect.height / 2;
                              // Match if bullet line is within the balloon's vertical bounds
                              if (gunCenter >= bRect.top - 15 && gunCenter <= bRect.bottom + 15) {
                                hitIndex = i;
                                break;
                              }
                            }
                          }

                          const bulletId = Date.now() + Math.random();
                          setFlyingBullets(prev => [...prev, { id: bulletId, y: relativeY }]);

                          setTimeout(() => {
                            setFlyingBullets(prev => prev.filter(b => b.id !== bulletId));
                            if (hitIndex !== -1) {
                              setPoppedBalloons(prev => {
                                if (!prev.includes(hitIndex)) return [...prev, hitIndex];
                                return prev;
                              });
                            }
                          }, 300); // Bullet travel time
                        }}
                        style={{
                          position: 'relative', width: '220px', height: '290px',
                          backgroundColor: '#fdfbfb', borderRadius: '16px', border: '3px solid #000',
                          boxShadow: '4px 4px 0px #000', overflow: 'hidden', cursor: 'crosshair',
                          backgroundImage: 'linear-gradient(90deg, transparent 45px, rgba(0,0,0,0.05) 45px, rgba(0,0,0,0.05) 47px, transparent 47px)'
                        }}
                      >
                        {/* The Balloons Column (Right side) */}
                        <div style={{ position: 'absolute', right: '10px', top: '10px', bottom: '10px', width: '120px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                          {[0, 1, 2].map(i => (
                            <div key={i} id={`sparky-balloon-${i}`} style={{ width: '100%', height: '80px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              {poppedBalloons.includes(i) ? (
                                <div className="animate-scale-in-kawaii" style={{ width: '80px', height: '80px', borderRadius: '8px', border: '2px solid #000', overflow: 'hidden', backgroundColor: '#fff', transform: `rotate(${i === 1 ? -4 : 4}deg)` }}>
                                  <img src={CAMERA_PHOTOS[i + 5]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                              ) : (
                                <div className="animate-float-balloon" style={{ animationDelay: `${i * 0.5}s`, height: '80px', width: '60px' }}>
                                  <svg viewBox="0 0 100 120" width="100%" height="100%" style={{ filter: 'drop-shadow(2px 2px 0px rgba(0,0,0,0.15))' }}>
                                    <path d="M50 10 C 20 10, 10 40, 10 60 C 10 90, 40 105, 50 110 C 60 105, 90 90, 90 60 C 90 40, 80 10, 50 10 Z" fill={BALLOON_COLORS[i + 3]} stroke="#000" strokeWidth="3" />
                                    <path d="M45 110 L55 110 L50 120 Z" fill={BALLOON_COLORS[i + 3]} stroke="#000" strokeWidth="3" />
                                    <ellipse cx="35" cy="35" rx="8" ry="15" fill="#fff" opacity="0.6" transform="rotate(-30 35 35)" />
                                  </svg>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Flying Bullets */}
                        {flyingBullets.map(bullet => (
                          <div 
                            key={bullet.id}
                            className="animate-shoot-right"
                            style={{
                              position: 'absolute', left: '45px', top: `${bullet.y}px`,
                              width: '20px', height: '8px', backgroundColor: '#39ff14',
                              borderRadius: '4px', border: '2px solid #000', zIndex: 10
                            }}
                          />
                        ))}

                        {/* The Gun Track (Left side) */}
                        <div style={{ position: 'absolute', top: '0', bottom: '0', left: '5px', width: '40px' }}>
                          <div 
                            ref={gunRef}
                            className="animate-gun-move-vertical"
                            style={{
                              position: 'absolute', width: '40px', height: '40px',
                              fontSize: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                              filter: 'drop-shadow(2px 2px 0px rgba(0,0,0,0.3))'
                            }}
                          >
                            🔫
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center mt-2 animate-fade-in w-full">
                      <div className="bg-[#39ff14]/15 text-[#2cba0f] text-[11px] font-bold px-4 py-1.5 rounded-full border border-[#39ff14]/30 mb-4 animate-pulse">
                        🎉 ALL BALLOONS POPPED! ✨
                      </div>
                      
                      <div className="flex flex-wrap justify-center gap-2">
                        {[0, 1, 2].map(i => (
                           <div key={i} style={{ width: '85px', height: '85px', borderRadius: '8px', border: '3px solid #000', overflow: 'hidden', boxShadow: '2px 2px 0px #000', transform: `rotate(${i === 1 ? -3 : 3}deg)` }}>
                             <img src={CAMERA_PHOTOS[i + 5]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                           </div>
                        ))}
                      </div>

                      <p style={{ fontFamily: 'Fredoka', fontSize: '1.05rem', color: '#222', lineHeight: '1.55', marginTop: '20px', textAlign: 'center' }}>
                        "{activePopupGift.note}"
                      </p>

                      <div className="flex justify-center mt-4">
                        <button 
                          onClick={() => setActivePopupGift(null)}
                          className="kawaii-pill-button"
                          style={{ padding: '0.5rem 2.2rem' }}
                        >
                          Yay! 🌸
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : activePopupGift.id === 7 ? (
                /* SPECIAL ANIMATED IMAGE FOR BLIZZARD (Gift #7) */
                <div className="flex flex-col items-center">
                  <h3 style={{ fontFamily: 'DynaPuff', fontSize: '1.35rem', color: '#fd728f', textAlign: 'center', marginBottom: '14px', WebkitTextStroke: '1px #000', textShadow: '1.5px 1.5px 0px #000' }}>
                    ★ Magical Aura ✨ ★
                  </h3>
                  
                  <div 
                    className="relative w-full max-w-[240px] aspect-square rounded-2xl overflow-hidden mb-5 animate-float-balloon"
                    style={{ 
                      backgroundColor: '#fdfbfb', 
                      boxShadow: 'inset 0 0 20px rgba(0,0,0,0.05), 4px 4px 0px #000',
                      border: '3px solid #000'
                    }}
                  >
                    <img 
                      src="/Gemini_Generated_Image_ywcbivywcbivywcb.png" 
                      alt="Animated Magical Aura"
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        mixBlendMode: 'multiply',
                        filter: 'contrast(1.15) saturate(1.2)'
                      }} 
                    />
                  </div>

                  <p style={{ fontFamily: 'Fredoka', fontSize: '0.9rem', color: '#333', lineHeight: '1.6', textAlign: 'center', marginBottom: '22px', fontStyle: 'italic', padding: '0 10px', whiteSpace: 'pre-wrap', fontWeight: '500' }}>
                    {activePopupGift.note}
                  </p>

                  <div className="flex justify-center mt-2">
                    <button 
                      onClick={() => setActivePopupGift(null)}
                      className="kawaii-pill-button"
                      style={{ padding: '0.5rem 2.2rem' }}
                    >
                      Yay! 🌸
                    </button>
                  </div>
                </div>
              ) : activePopupGift.id === 9 ? (
                /* SQUAD CREDITS FOR WADDLES (Gift #9) */
                <div className="flex flex-col items-center">
                  <h3 style={{ fontFamily: 'DynaPuff', fontSize: '1.35rem', color: '#fd728f', textAlign: 'center', marginBottom: '14px', WebkitTextStroke: '1px #000', textShadow: '1.5px 1.5px 0px #000' }}>
                    ★ {activePopupGift.title} ★
                  </h3>
                  
                  <div 
                    className="relative w-full max-w-[360px] rounded-xl overflow-hidden mb-4 animate-scale-in-kawaii"
                    style={{ 
                      backgroundColor: '#fdfbfb', 
                      boxShadow: '4px 4px 0px #000',
                      border: '3px solid #000',
                      aspectRatio: '16/9'
                    }}
                  >
                    <img 
                      src="/Gemini_Generated_Image_n5a14tn5a14tn5a1.png" 
                      alt="The Squad"
                      style={{ 
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: '56.25%', /* Perfect mapping for rotated width to container height */
                        height: '177.77%', /* Perfect mapping for rotated height to container width */
                        objectFit: 'contain',
                        transform: 'translate(-50%, -50%) rotate(-90deg)'
                      }} 
                    />
                  </div>

                  <p style={{ fontFamily: 'Fredoka', fontSize: '0.9rem', color: '#333', lineHeight: '1.55', textAlign: 'center', marginBottom: '22px', fontStyle: 'italic', padding: '0 10px', whiteSpace: 'pre-wrap', fontWeight: '500' }}>
                    {activePopupGift.note}
                  </p>

                  <div className="flex justify-center mt-2">
                    <button 
                      onClick={() => setActivePopupGift(null)}
                      className="kawaii-pill-button"
                      style={{ padding: '0.5rem 2.2rem' }}
                    >
                      Awesome! 🌸
                    </button>
                  </div>
                </div>
              ) : (
                /* STANDARD POPUP LAYOUT FOR PENGUIN 8 */
                <div>
                  <h3 style={{ fontFamily: 'DynaPuff', fontSize: '1.35rem', color: '#fd728f', textAlign: 'center', marginBottom: '14px', WebkitTextStroke: '1px #000', textShadow: '1.5px 1.5px 0px #000' }}>
                    ★ {activePopupGift.title} ★
                  </h3>
                  
                  <p style={{ fontFamily: 'Fredoka', fontSize: '1.05rem', color: '#222', lineHeight: '1.6', textAlign: 'center', marginBottom: '22px' }}>
                    {activePopupGift.note}
                  </p>

                  <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'center' }}>
                    {activePopupGift.isFinal ? (
                      <button 
                        onClick={() => {
                          setActivePopupGift(null);
                          setActiveSubScreen('letter');
                        }}
                        className="kawaii-pill-button"
                        style={{ padding: '0.6rem 2.2rem', backgroundColor: '#fd728f', color: '#fff', fontSize: '0.95rem' }}
                      >
                        OPEN LETTER ✉️
                      </button>
                    ) : (
                      <button 
                        onClick={() => setActivePopupGift(null)}
                        className="kawaii-pill-button"
                        style={{ padding: '0.5rem 2.2rem', fontSize: '0.9rem' }}
                      >
                        Yay! 🌸
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    );
  }

  // ================= SCREEN 3: LETTER SCREEN (FULL-SCREEN LOVE ENVELOPE ROOM) =================
  if (activeSubScreen === 'letter') {
    return (
      <div className="kawaii-grid-page min-h-screen w-full relative flex flex-col justify-start items-center py-12 px-6 overflow-x-hidden select-none animate-scale-in-kawaii" style={{ boxSizing: 'border-box' }}>
        
        {/* Confetti Sparks */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 0 }}>
          {particles.map(p => (
            <div
              key={p.id}
              className="kawaii-confetti"
              style={{
                left: `${p.x}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: p.color,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
                opacity: p.opacity
              }}
            />
          ))}
        </div>

        {/* Back Button */}
        <button 
          onClick={() => {
            setActiveSubScreen('game');
            setEnvelopeOpen(false);
          }}
          className="kawaii-pill-button z-20"
          style={{ position: 'absolute', top: '24px', left: '24px', padding: '0.45rem 1.4rem', fontSize: '0.85rem' }}
        >
          ← Back to Gifts
        </button>

        {/* Title Header */}
        <div className="text-center mt-12 mb-6 z-10">
          <span className="text-xs uppercase tracking-widest text-[#fd728f] font-bold bg-[#fd728f]/10 px-3 py-1 rounded-full border border-[#fd728f]/20">
            {envelopeOpen ? "Pranjal's Letter Revealed" : "Step 2: Break the Wax Seal"}
          </span>
          <h2 className="bubble-text-pink text-center mt-3 tracking-wide" style={{ fontSize: '2.5rem', WebkitTextStroke: '2px #000', textShadow: '4px 4px 0 #000' }}>
            {envelopeOpen ? "A Secret Love Letter" : "Open Your Surprise Box ✉️"}
          </h2>
        </div>

        {/* Full-size Sealed Envelope scroll room container */}
        <div className="flex flex-col items-center justify-center w-full max-w-[500px] z-10" style={{ minHeight: '380px', marginTop: '20px' }}>
          <div 
            onClick={triggerEnvelopeOpen}
            className={`letter-envelope ${envelopeOpen ? 'open' : ''} w-full`}
            style={{ cursor: 'pointer' }}
          >
            <div className="envelope">
              
              {/* Envelope flap */}
              <div className="envelope-flap" />
              
              {/* Heart Sparks Burst Overlay */}
              {heartSparks.map((spark) => (
                <span
                  key={spark.id}
                  style={{
                    position: 'absolute',
                    left: spark.left,
                    top: spark.top,
                    fontSize: '32px',
                    pointerEvents: 'none',
                    zIndex: 99,
                    animationDelay: spark.delay,
                    '--tx': spark.tx,
                    '--ty': spark.ty,
                    '--rot': spark.rot,
                  }}
                  className="envelope-heart-spark"
                >
                  💖
                </span>
              ))}
              
              {/* Cover seal text */}
              {!envelopeOpen && (
                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 z-10 bg-gradient-to-br from-[#1b0e33] to-[#0a0512] p-8 text-center rounded-xl border border-white/5">
                  <div className="p-4 bg-pink-500/10 rounded-full text-pink-500 animate-pulse border border-pink-500/20">
                    <MailOpen className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold tracking-wider text-white">Pranjal's Letter Inside</h3>
                  <p className="text-[10px] text-[#a39bb4]">Click to break the wax seal and open the letter</p>
                </div>
              )}
              
              {/* Letter parchment paper scroll */}
              <div className="letter glass scrollbar select-text">
                <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                  <span className="text-[10px] tracking-widest uppercase text-pink-500 font-bold font-sans">To: Dearest Lady CR ❤️</span>
                  <span className="text-[10px] tracking-widest uppercase text-color-text-muted font-sans font-medium">From: Pranjal ✨</span>
                </div>
                
                <h4 className="text-lg font-bold font-serif mb-3 text-pink-400">Happy Birthday!</h4>
                
                <div className="space-y-4 text-xs md:text-sm leading-relaxed text-color-text-primary/90 font-serif italic pr-1">
                  <p>
                    Today is a very special day because it celebrates the day you came into this world. I wanted to build this dedicated space just for you—something personal, creative, and memorable.
                  </p>
                  <p>
                    May this year bring you endless laughter, warmth, and the courage to chase all your wildest dreams. You bring so much bright energy and smiles to everyone around you!
                  </p>
                  <p>
                    I hope this little surprize page brings a smile to your face. Enjoy your day to the absolute fullest! Keep shining, keep smiling, and never lose your beautiful sparkle. 🌟
                  </p>
                  <p className="text-right font-sans font-bold text-[9px] text-pink-500 tracking-wider not-italic mt-6">
                    WITH LOTS OF LOVE & WARMTH,
                    <br />
                    PRANJAL 🌸
                  </p>
                </div>
              </div>
            </div>
          </div>

          {envelopeOpen ? (
            <p className="text-[10px] text-black/50 mt-[140px] font-sans font-bold italic animate-pulse text-center">
              (Click the envelope again to close the letter)
            </p>
          ) : (
            <p className="text-[11px] text-black/60 mt-6 font-sans font-bold text-center">
              Tap the envelope to reveal the birthday letter! 💖
            </p>
          )}

        </div>

      </div>
    );
  }

  // ================= SCREEN 1: MAIN CARD SCREEN (DEFAULT VAULT ALBUM SCRAPBOOK) =================
  return (
    <div className="kawaii-grid-page min-h-screen w-full relative flex flex-col justify-center items-center py-10 px-6 overflow-x-hidden">
      
      {/* 1. CONFETTI BACKGROUND LAYER */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        {particles.map(p => (
          <div
            key={p.id}
            className="kawaii-confetti"
            style={{
              left: `${p.x}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              opacity: p.opacity
            }}
          />
        ))}
      </div>

      {/* 2. TOP HANGING BUNTING BANNERS (Left & Right Strings) - Pinned to Corners with Gentle Wind Sway Animations */}
      <div className="animate-bunting-sway-left" style={{ position: 'absolute', top: 0, left: 0, width: '220px', height: '100px', pointerEvents: 'none', zIndex: 10 }}>
        <svg width="100%" height="100%" viewBox="0 0 220 100" preserveAspectRatio="none">
          {/* String line */}
          <path d="M-10,0 Q60,35 220,10" fill="none" stroke="#000000" strokeWidth="2.5" />
          {/* Triangles */}
          <polygon points="15,11 35,14 20,40" fill="#fd728f" stroke="#000000" strokeWidth="2" />
          <polygon points="55,17 75,20 60,46" fill="#fff3f5" stroke="#000000" strokeWidth="2" />
          <polygon points="95,20 115,22 100,50" fill="#fd728f" stroke="#000000" strokeWidth="2" />
          <polygon points="135,21 155,22 140,51" fill="#fff3f5" stroke="#000000" strokeWidth="2" />
          <polygon points="175,19 195,17 180,48" fill="#fd728f" stroke="#000000" strokeWidth="2" />
        </svg>
      </div>

      <div className="animate-bunting-sway-right" style={{ position: 'absolute', top: 0, right: 0, width: '220px', height: '100px', pointerEvents: 'none', zIndex: 10 }}>
        <svg width="100%" height="100%" viewBox="0 0 220 100" preserveAspectRatio="none">
          {/* Mathematical right-aligned string rope (Flawless rendering, no clipping) */}
          <path d="M 230,0 Q 140,35 -10,10" fill="none" stroke="#000000" strokeWidth="2.5" />
          {/* Perfectly mirrored triangles hanging along the curve */}
          <polygon points="195,12 175,15 190,42" fill="#fd728f" stroke="#000000" strokeWidth="2" />
          <polygon points="155,19 135,22 150,49" fill="#fff3f5" stroke="#000000" strokeWidth="2" />
          <polygon points="115,23 95,25 110,53" fill="#fd728f" stroke="#000000" strokeWidth="2" />
          <polygon points="75,24 55,25 70,54" fill="#fff3f5" stroke="#000000" strokeWidth="2" />
          <polygon points="35,22 15,20 30,50" fill="#fd728f" stroke="#000000" strokeWidth="2" />
        </svg>
      </div>

      {/* 4. MAIN INTERACTIVE BOX (Horizontal Flex Layout with cross-platform flex styles) */}
      <div 
        className="z-10"
        style={{ 
          width: '100%', 
          maxWidth: '1100px', 
          display: 'flex', 
          flexDirection: 'row', 
          flexWrap: 'wrap', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          gap: '24px',
          padding: '0 10px'
        }}
      >
        
        {/* LEFT COLUMN: TITLE & BADGES & ACTIONS (Left Aligned & Pushed down, slides UP with spring bounce) */}
        <div 
          className="z-10 animate-slide-up-kawaii"
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'flex-start', 
            textAlign: 'left', 
            gap: '20px', 
            flex: '1 1 350px',
            paddingTop: '65px' 
          }}
        >
          
          {/* Happy Birthday outline header with party hat on 'y' */}
          <div className="relative inline-block select-none" style={{ position: 'relative', display: 'inline-block' }}>
            <h1 className="bubble-text-white">
              Happy
            </h1>
            <h1 className="bubble-text-pink mt-1">
              Birthday
            </h1>
            <h1 className="bubble-text-white mt-1 bubble-pulse-neon" style={{ fontSize: '3.6rem' }}>
              Lady cr
            </h1>
            
            {/* Cute mini party hat overlay on 'y' */}
            <svg 
              viewBox="0 0 40 40" 
              style={{ 
                position: 'absolute', 
                top: '-18px', 
                left: '124px', 
                width: '42px', 
                height: '42px', 
                transform: 'rotate(15deg)', 
                filter: 'drop-shadow(2px 2px 0px #000)' 
              }}
            >
              {/* Triangle hat body */}
              <polygon points="20,5 5,35 35,35" fill="#fd728f" stroke="#000" strokeWidth="2.5" />
              {/* Yellow stripes */}
              <path d="M 12 20 L 28 20" stroke="#ffe600" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M 8 28 L 32 28" stroke="#ffe600" strokeWidth="3.5" strokeLinecap="round" />
              {/* Pom pom top */}
              <circle cx="20" cy="5" r="4.5" fill="#fff" stroke="#000" strokeWidth="2.5" />
            </svg>
          </div>

          {/* Birthday Date pill */}
          <div>
            <div className="kawaii-pill-date">
              <span>★</span>
              <span>20 May</span>
              <span>★</span>
            </div>
          </div>

          {/* Click Here Envelope letter button - Now routes to game room screen! */}
          <div>
            <button 
              onClick={() => setActiveSubScreen('game')}
              className="kawaii-pill-button text-[1.1rem]"
              style={{ padding: '0.65rem 2rem' }}
            >
              Click here ✉
            </button>
          </div>

          {/* Music Controller Button (Neatly placed under Click Here) */}
          <div>
            <button
              onClick={toggleMusic}
              className="kawaii-pill-button flex items-center gap-2"
              style={{ padding: '0.45rem 1.4rem', fontSize: '0.95rem' }}
            >
              {isMusicPlaying ? (
                <>
                  <Volume2 className="w-4 h-4 text-[#fd728f]" />
                  <span className="font-bold text-[#fd728f]">MUSIC ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-black/50" />
                  <span className="font-bold text-black/50">MUSIC OFF</span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* CENTER COLUMN: Retro Cute Smiley stamp (Centered, Scales in beautifully, animates spin on click) */}
        <div 
          className="z-10 animate-scale-in-kawaii"
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            flex: '1 1 120px',
            margin: '20px 0'
          }}
        >
          <div 
            onClick={triggerSmileySpin}
            className={`animate-bounce cursor-pointer hover:scale-110 active:scale-95 transition-all duration-300 ${isSmileySpinned ? 'smiley-click-spin' : ''}`}
            style={{ animationDuration: '4s', cursor: 'pointer' }}
          >
            <svg width="68" height="68" viewBox="0 0 100 100" style={{ filter: 'drop-shadow(3px 3px 0px #000)' }}>
              {/* Outer yellow circle */}
              <circle cx="50" cy="50" r="46" fill="#fffef2" stroke="#000" strokeWidth="4.5" />
              {/* Two oval eyes */}
              <ellipse cx="36" cy="40" rx="4.5" ry="8" fill="#000" />
              <ellipse cx="64" cy="40" rx="4.5" ry="8" fill="#000" />
              {/* Curved mouth */}
              <path d="M 30 55 C 38 68, 62 68, 70 55" fill="none" stroke="#000" strokeWidth="4.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* RIGHT COLUMN: CIRCLE FRAME & BEAR STICKER (Right Aligned & Slides DOWN with spring bounce) */}
        <div 
          className="z-10 animate-slide-down-kawaii"
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            position: 'relative', 
            flex: '1 1 350px',
            marginTop: '-45px', 
            paddingBottom: '20px'
          }}
        >
          
          <div className="flex flex-col items-center select-none relative" style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Hanging pink balloon - Brought closer to Teddy Bear frame */}
            <div className="absolute animate-bounce" style={{ position: 'absolute', top: '-60px', left: '-15px', zIndex: 10, animationDuration: '6s' }}>
              <svg width="84" height="150" viewBox="0 0 100 180" style={{ filter: 'drop-shadow(3px 3px 0px rgba(0,0,0,0.15))' }}>
                {/* Balloon string */}
                <path d="M 50 78 Q 45 130 55 180" fill="none" stroke="#000000" strokeWidth="2.5" />
                {/* Balloon bubble */}
                <ellipse cx="50" cy="42" rx="34" ry="38" fill="#fd728f" stroke="#000" strokeWidth="3" />
                {/* Knot bottom */}
                <polygon points="50,76 44,82 56,82" fill="#fd728f" stroke="#000" strokeWidth="2.5" />
                {/* Light reflection gloss */}
                <ellipse cx="38" cy="26" rx="6" ry="10" fill="#ffffff" transform="rotate(-25 38 26)" />
              </svg>
            </div>

            {/* Large portrait circle frame with bear sticker inside */}
            <div className="kawaii-circle-frame relative mb-6">
              
              {/* The transparent bear sticker we generated */}
              <img 
                src="/bear.png" 
                alt="Cute bear sticker holding birthday cake"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  padding: '24px',
                  backgroundColor: '#ffffff'
                }}
              />

              {/* Confetti scraps overlay */}
              <span className="absolute top-12 left-10 text-[10px] transform rotate-12">⭐</span>
              <span className="absolute top-28 right-8 text-[12px] transform -rotate-45">✨</span>
              <span className="absolute bottom-16 left-12 text-[10px]">🌸</span>
            </div>

            {/* Pill name container */}
            <div>
              <div className="kawaii-pill-cutie uppercase tracking-wider">
                <span>♥</span>
                <span>Cutie</span>
                <span>♥</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default BirthdayPage;
