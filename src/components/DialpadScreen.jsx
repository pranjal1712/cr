import React, { useState, useEffect } from 'react';
import { playDialTone, playErrorMelody } from '../utils/audio';
import { CAMERA_PHOTOS } from './BirthdayPage';

const DialpadScreen = ({ onCorrectCode, secretCode }) => {
  const [inputVal, setInputVal] = useState('');
  const [isError, setIsError] = useState(false);
  const [clockTime, setClockTime] = useState('');
  const [clickSparks, setClickSparks] = useState([]);

  // Digital clock update
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      let hrs = now.getHours();
      const mins = String(now.getMinutes()).padStart(2, '0');
      const ampm = hrs >= 12 ? 'PM' : 'AM';
      hrs = hrs % 12;
      hrs = hrs ? hrs : 12;
      const hrsStr = String(hrs).padStart(2, '0');
      setClockTime(`${hrsStr}:${mins} ${ampm}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleKeyPress = (key) => {
    if (isError) setIsError(false);
    
    // Play telephone DTMF tone
    playDialTone(key);

    // Trigger keypad button expanding ripple
    const newSpark = {
      id: Date.now() + Math.random(),
      key: key,
    };
    setClickSparks(prev => [...prev, newSpark]);
    setTimeout(() => {
      setClickSparks(prev => prev.filter(s => s.id !== newSpark.id));
    }, 600);
    
    if (inputVal.length < 4) {
      const newVal = inputVal + key;
      setInputVal(newVal);
      
      // Auto unlock check if 4 digits entered
      if (newVal === secretCode) {
        setTimeout(() => {
          onCorrectCode();
        }, 300);
      } else if (newVal.length === 4) {
        // Wrong code trigger after 4th digit
        setTimeout(() => {
          playErrorMelody();
          setIsError(true);
          setTimeout(() => {
            setIsError(false);
            setInputVal('');
          }, 800);
        }, 200);
      }
    }
  };

  const handleClear = () => {
    playDialTone('*');
    setInputVal('');
    setIsError(false);
  };

  const handleUnlock = () => {
    if (inputVal === secretCode) {
      onCorrectCode();
    } else {
      playErrorMelody();
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
        setInputVal('');
      }, 800);
    }
  };

  const dialButtons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];

  return (
    <div className="vintage-card-wrapper relative">
      
      {/* Horizontal Film Strip Top */}
      <div className="film-strip-horizontal film-strip-horizontal-top">
        <div className="film-track-horizontal scroll-left">
          {CAMERA_PHOTOS.map((src, i) => (
            <div key={`top-a-${i}`} className="film-frame-horizontal"><img src={src} alt="Memory" /></div>
          ))}
          {CAMERA_PHOTOS.map((src, i) => (
            <div key={`top-b-${i}`} className="film-frame-horizontal"><img src={src} alt="Memory" /></div>
          ))}
        </div>
      </div>

      {/* Horizontal Film Strip Bottom */}
      <div className="film-strip-horizontal film-strip-horizontal-bottom">
        <div className="film-track-horizontal scroll-right">
          {CAMERA_PHOTOS.map((src, i) => (
            <div key={`bot-a-${i}`} className="film-frame-horizontal"><img src={src} alt="Memory" /></div>
          ))}
          {CAMERA_PHOTOS.map((src, i) => (
            <div key={`bot-b-${i}`} className="film-frame-horizontal"><img src={src} alt="Memory" /></div>
          ))}
        </div>
      </div>

      {/* VINTAGE SCRAPBOOK CONTAINER CARD */}
      <div className="vintage-card">
        
        {/* LEFT COLUMN: Lacy Heart Frame & Music Notes Decoration */}
        <div className="relative flex flex-col items-center justify-center p-6 z-10" style={{ gridColumn: '1', gridRow: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '440px' }}>
          
          {/* TORN DECORATIVE SHEET (Top-Left maroon paper) */}
          <div className="maroon-tear"></div>

          {/* TORN MUSIC SHEET BANNER (Bottom-Left) */}
          <div className="music-tear">
            {/* Music Staff lines */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', opacity: 0.25, marginTop: '30px', paddingLeft: '16px' }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} style={{ width: '85%', height: '1px', backgroundColor: 'black' }}></div>
              ))}
            </div>
            {/* Music symbols overlay */}
            <span className="absolute bottom-5 left-10 text-4xl text-black/20 font-serif" style={{ pointerEvents: 'none' }}>🎼</span>
            <span className="absolute bottom-10 left-32 text-2xl text-black/20 font-serif" style={{ pointerEvents: 'none' }}>♪</span>
            <span className="absolute bottom-7 left-44 text-2xl text-black/20 font-serif" style={{ pointerEvents: 'none' }}>♫</span>
          </div>

          {/* Elegant romantic cursive handwritten quote */}
          <p className="vintage-quote">
            "A little world of magical memories locked just for you... 💖"
          </p>

          {/* LACY HEART PHOTO FRAME */}
          <div className="heart-lace-container float-slow">
            
            {/* White Lacy Pearl Heart Outline (SVG base) */}
            <svg 
              viewBox="0 0 200 200" 
              style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%', 
                filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.35))', 
                zIndex: 10 
              }}
            >
              <defs>
                {/* Image clip-path to map baby penguin perfectly inside the heart */}
                <clipPath id="heart-clip">
                  <path d="M100,175 C30,118 10,70 50,35 C80,10 100,45 100,45 C100,45 120,10 150,35 C190,70 170,118 100,175 Z" />
                </clipPath>
              </defs>

              {/* Scalloped outer lacy border */}
              <path
                d="M100,175 C30,118 10,70 50,35 C80,10 100,45 100,45 C100,45 120,10 150,35 C190,70 170,118 100,175 Z"
                fill="none"
                stroke="white"
                strokeWidth="10"
                strokeDasharray="1 13"
                strokeLinecap="round"
              />

              {/* Solid inner white border */}
              <path
                d="M100,175 C30,118 10,70 50,35 C80,10 100,45 100,45 C100,45 120,10 150,35 C190,70 170,118 100,175 Z"
                fill="white"
                stroke="white"
                strokeWidth="2"
              />

              {/* Baby Penguin Tulip Image */}
              <image
                href="/penguin.png"
                x="5"
                y="5"
                width="190"
                height="190"
                preserveAspectRatio="xMidYMid slice"
                clipPath="url(#heart-clip)"
              />
            </svg>

            {/* HAND-DRAWN RED RIBBON BOW (Positioned absolutely on top-right bulge) */}
            <svg 
              viewBox="0 0 100 100" 
              style={{ 
                width: '56px', 
                height: '56px', 
                position: 'absolute', 
                top: '28px', 
                right: '24px', 
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))', 
                zIndex: 20 
              }}
            >
              {/* Bow loops */}
              <path d="M 50 50 C 20 15 15 35 50 50 C 85 35 80 15 50 50 Z" fill="#d93b4f" stroke="#b02637" strokeWidth="1.5" />
              {/* Tails */}
              <path d="M 50 50 C 40 70 28 85 18 90" fill="none" stroke="#d93b4f" strokeWidth="5.5" strokeLinecap="round" />
              <path d="M 50 50 C 60 70 72 85 82 90" fill="none" stroke="#d93b4f" strokeWidth="5.5" strokeLinecap="round" />
              {/* Knot */}
              <circle cx="50" cy="50" r="7" fill="#a01827" />
            </svg>
          </div>
        </div>

        {/* RIGHT COLUMN: Cursive Header, Passcode indicators & Circle Keypad */}
        <div className="relative flex flex-col items-center justify-center p-4 text-center z-10" style={{ gridColumn: '2', gridRow: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '440px' }}>
          
          {/* Elegant handwritten header */}
          <h2 className="vintage-header">
            Enter a passcode
          </h2>

          {/* PASSCODE CHARACTER BOXES */}
          <div className="passcode-container">
            {Array.from({ length: 4 }).map((_, idx) => {
              const isTyped = inputVal.length > idx;
              return (
                <div
                  key={idx}
                  className={`passcode-box ${
                    isError ? 'error' : isTyped ? 'active' : ''
                  }`}
                >
                  {isTyped && (
                    <span className="text-white text-3xl font-serif leading-none mt-1 animate-fadeIn">✻</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* KEYPAD CIRCULAR DIGIT BUTTONS */}
          <div className="vintage-keypad">
            {dialButtons.map((num) => {
              const isRippling = clickSparks.some((s) => s.key === num);
              return (
                <button
                  key={num}
                  type="button"
                  onClick={() => handleKeyPress(num)}
                  className="vintage-btn"
                >
                  <span className="vintage-digit">{num}</span>
                  {isRippling && <span className="keypad-btn-ripple" />}
                </button>
              );
            })}
          </div>

          {/* CLEAR ACTION BUTTON */}
          <button
            type="button"
            onClick={handleClear}
            disabled={inputVal.length === 0}
            className="clear-action-btn"
          >
            Clear digits
          </button>
        </div>

        {/* Subtle vintage inner drop shadow overlay */}
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_rgba(0,0,0,0.35)] z-20" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, border: '1px solid rgba(0,0,0,0.1)', pointerEvents: 'none' }}></div>
      </div>
    </div>
  );
};

export default DialpadScreen;
