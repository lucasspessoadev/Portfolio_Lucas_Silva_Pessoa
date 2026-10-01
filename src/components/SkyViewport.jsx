import React from 'react';

export function SkyViewport({ canvasRef, sunPos, moonPos, theme }) {
  return (
    <div id="sky-viewport" className="sky-viewport" aria-hidden="true">
      {/* Sky Gradient Background */}
      <div id="sky-gradient" className="sky-gradient"></div>

      {/* Stars & Shooting Stars Canvas */}
      <canvas ref={canvasRef} id="stars-canvas" className="stars-canvas"></canvas>

      {/* Sun & Moon Orbit Container */}
      <div id="celestial-orbit" className="celestial-orbit">
        {/* Sun Entity */}
        <div
          id="sun-body"
          className="celestial-body sun"
          style={{
            left: sunPos.left,
            top: sunPos.top,
            opacity: sunPos.opacity,
            transform: sunPos.transform || 'translate(-50%, -50%)'
          }}
        >
          <div className="sun-core"></div>
          <div className="sun-corona"></div>
        </div>

        {/* Moon Entity */}
        <div
          id="moon-body"
          className="celestial-body moon"
          style={{
            left: moonPos.left,
            top: moonPos.top,
            opacity: moonPos.opacity,
            transform: moonPos.transform || 'translate(-50%, -50%)'
          }}
        >
          <div className="moon-core">
            <div className="crater crater-1"></div>
            <div className="crater crater-2"></div>
            <div className="crater crater-3"></div>
            <div className="crater crater-4"></div>
            <div className="crater crater-5"></div>
          </div>
          <div className="moon-halo"></div>
        </div>
      </div>

      {/* NIGHT AIRPLANE FLYING HIGH IN THE STARRY SKY */}
      {theme === 'night' && (
        <div className="airplane-sky-track">
          <div className="airplane-entity">
            {/* Jet Vapor Contrail Trail */}
            <div className="airplane-contrail"></div>
            {/* Airplane Silhouette SVG */}
            <svg className="airplane-svg" viewBox="0 0 120 45" width="85" height="32">
              <path d="M5,22 C25,20 85,18 115,22 C118,22.5 118,23.5 115,24 C85,28 25,26 5,24 Z" fill="#cbd5e1" />
              <path d="M98,20 C104,20 108,21 110,22 C108,23 104,24 98,24 Z" fill="#38bdf8" />
              <path d="M55,22 L42,3 C48,2 62,18 68,22 Z" fill="#94a3b8" />
              <path d="M55,24 L42,43 C48,44 62,28 68,24 Z" fill="#64748b" />
              <path d="M12,22 L2,8 L16,8 L24,22 Z" fill="#94a3b8" />
            </svg>
            {/* Navigation Flashing Lights */}
            <span className="nav-light light-red"></span>
            <span className="nav-light light-green"></span>
            <span className="nav-light light-white-beacon"></span>
          </div>
        </div>
      )}

      {/* Volumetric Parallax Clouds (Sleek Horizontal Wave Silhouettes) */}
      <div className="cloud-parallax-wrapper back">
        <div className="clouds-layer clouds-back" id="clouds-back"></div>
      </div>
      <div className="cloud-parallax-wrapper mid">
        <div className="clouds-layer clouds-mid" id="clouds-mid"></div>
      </div>
      <div className="cloud-parallax-wrapper front">
        <div className="clouds-layer clouds-front" id="clouds-front"></div>
      </div>

      {/* Distant Horizon Glow */}
      <div className="horizon-glow"></div>

      {/* TROPICAL BEACH & OCEAN ENVIRONMENT LAYER (PARALLAX ON SCROLL) */}
      <div className="beach-viewport-container" id="beach-viewport-container">

        {/* DISTANT MOUNTAINS / ISLAND SILHOUETTE ON THE SEA HORIZON */}
        <div className="distant-islands">
          <svg className="island-svg" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path fill="currentColor" d="M0,90 Q200,40 420,85 Q650,30 920,80 Q1180,45 1440,90 L1440,120 L0,120 Z"></path>
          </svg>
        </div>

        {/* OCEAN WATER SURFACE & ANIMATED SURF WAVES */}
        <div className="beach-ocean">
          {/* Wave Layer 1 (Back Deep Ocean) */}
          <div className="ocean-wave wave-back">
            <svg viewBox="0 0 1440 300" preserveAspectRatio="none">
              <path fill="currentColor" d="M0,45 C180,65 360,25 540,45 C720,65 900,25 1080,45 C1260,65 1380,35 1440,45 L1440,300 L0,300 Z"></path>
            </svg>
          </div>

          {/* DAYTIME / SUNRISE SAILBOAT FLOATING ON WATER */}
          {(theme === 'day' || theme === 'sunrise' || !theme) && (
            <div className="sailing-boat-track">
              <div className="sailing-boat">
                {/* Boat Ripple Trail */}
                <div className="boat-wake-trail"></div>
                {/* Boat Hull & Sails SVG */}
                <svg className="boat-svg" viewBox="0 0 120 70" width="76" height="46">
                  {/* Hull Water Shadow */}
                  <ellipse cx="60" cy="56" rx="44" ry="5" fill="rgba(0,0,0,0.25)" />
                  {/* Boat Hull */}
                  <path d="M12,40 C28,58 92,58 108,40 L98,52 C78,60 42,60 22,52 Z" className="boat-hull" />
                  {/* Deck Trim Line */}
                  <path d="M14,40 L106,40" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
                  {/* Mast */}
                  <line x1="60" y1="8" x2="60" y2="42" className="boat-mast" strokeWidth="2.5" strokeLinecap="round" />
                  {/* Main White Sail (Right) */}
                  <path d="M62,10 L96,36 L62,36 Z" className="boat-sail-main" />
                  {/* Jib Front Sail (Left) */}
                  <path d="M58,14 L30,36 L58,36 Z" className="boat-sail-front" />
                  {/* Flag on top */}
                  <path d="M60,8 L74,12 L60,16 Z" className="boat-flag" />
                </svg>
              </div>
            </div>
          )}

          {/* Wave Layer 2 (Mid Ocean Surf) */}
          <div className="ocean-wave wave-mid">
            <svg viewBox="0 0 1440 300" preserveAspectRatio="none">
              <path fill="currentColor" d="M0,50 C240,20 480,70 720,40 C960,10 1200,60 1440,30 L1440,300 L0,300 Z"></path>
            </svg>
          </div>

          {/* Wave Layer 3 (Front Surf & Foam) */}
          <div className="ocean-wave wave-front">
            <svg viewBox="0 0 1440 300" preserveAspectRatio="none">
              <path fill="currentColor" d="M0,60 C160,30 320,80 500,50 C680,20 860,70 1040,40 C1220,10 1360,50 1440,30 L1440,300 L0,300 Z"></path>
            </svg>
            <div className="wave-foam-line"></div>
          </div>
        </div>

        {/* GOLDEN BEACH SAND SHORE AT THE BOTTOM */}
        <div className="beach-sand-shore">
          {/* SUNSET DUNE BUGGY DRIVING ALONG THE SAND DUNES */}
          {theme === 'sunset' && (
            <div className="dune-buggy-track">
              <div className="dune-buggy">
                {/* Sand Dust Particles Trail */}
                <div className="sand-dust-trail">
                  <span></span><span></span><span></span>
                </div>
                {/* Headlight Beam Effect */}
                <div className="buggy-headlight-beam"></div>
                {/* Dune Buggy SVG */}
                <svg className="buggy-svg" viewBox="0 0 110 60" width="76" height="42">
                  {/* Roll Cage / Frame */}
                  <path d="M28,26 L38,10 L74,10 L84,26 Z" fill="none" stroke="#ea580c" strokeWidth="3.5" strokeLinecap="round" />
                  {/* Body Chassis */}
                  <path d="M12,26 C12,26 32,24 90,26 L96,36 C80,38 22,38 12,36 Z" fill="#f97316" />
                  <path d="M14,26 L92,26 L90,32 L16,32 Z" fill="#fdba74" />
                  {/* Steering Wheel / Seats */}
                  <circle cx="48" cy="18" r="4.5" fill="#451a03" />
                  {/* Headlights */}
                  <circle cx="92" cy="28" r="3.5" fill="#fef08a" />
                  {/* Front & Rear Off-Road Tires */}
                  <g className="wheel-rear">
                    <circle cx="30" cy="40" r="11" fill="#1c1917" stroke="#44403c" strokeWidth="2.5" />
                    <circle cx="30" cy="40" r="4.5" fill="#fb923c" />
                  </g>
                  <g className="wheel-front">
                    <circle cx="78" cy="40" r="11" fill="#1c1917" stroke="#44403c" strokeWidth="2.5" />
                    <circle cx="78" cy="40" r="4.5" fill="#fb923c" />
                  </g>
                </svg>
              </div>
            </div>
          )}

          {/* Smooth Curved Sand Shoreline SVG */}
          <svg className="sand-svg-shore" viewBox="0 0 1440 300" preserveAspectRatio="none">
            <path fill="currentColor" d="M0,75 C220,35 480,95 720,55 C960,15 1220,70 1440,40 L1440,300 L0,300 Z"></path>
          </svg>

          {/* Sand Dune Highlights & Foam Wet Areia */}
          <div className="sand-dune-overlay">
            <svg className="dune-svg" viewBox="0 0 1440 300" preserveAspectRatio="none">
              <path fill="currentColor" d="M0,60 C300,105 650,30 980,85 C1200,45 1380,75 1440,50 L1440,300 L0,300 Z"></path>
            </svg>
          </div>

          {/* RESERVED CHARACTER SITTING SPOT ON THE SAND */}
          <div className="character-sitting-spot" title="Espaço para o seu personagem sentado na areia da praia">
            <div className="spot-shadow"></div>
            <div className="spot-guide-ring">
              <i className="fa-solid fa-umbrella-beach"></i>
            </div>
          </div>
        </div>

        {/* SOLID GROUND BASE FILL (100% OPAQUE BACKDROP SO NOTHING EVER LEAKS THROUGH) */}
        <div className="beach-base-fill"></div>

      </div>
    </div>
  );
}
