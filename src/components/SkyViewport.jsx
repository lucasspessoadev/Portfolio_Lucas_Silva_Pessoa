import React from 'react';

export function SkyViewport({ canvasRef, sunPos, moonPos, theme, isStorm }) {
  return (
    <div id="sky-viewport" className={`sky-viewport ${isStorm ? 'is-storm-viewport' : ''}`} aria-hidden="true">
      {/* Sky Gradient Background */}
      <div id="sky-gradient" className="sky-gradient"></div>

      {/* LIGHTNING THUNDER FLASH OVERLAY FOR STORM (0:00 - 4:55) */}
      <div className={`lightning-flash-overlay ${isStorm ? 'active' : ''}`}></div>

      {/* STORM HEAVY RAIN DROPS LAYER (SLOW FALLING VAPOR DROPS 0:00 - 4:55) */}
      {isStorm && (
        <div className="storm-rain-layer">
          {Array.from({ length: 45 }).map((_, i) => (
            <span
              key={i}
              className="drop"
              style={{
                left: `${(i * 2.3) % 100}%`,
                animationDelay: `${(i * 0.25) % 3.5}s`,
                animationDuration: `${1.7 + (i % 6) * 0.25}s`
              }}
            ></span>
          ))}
        </div>
      )}

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
      {theme === 'night' && !isStorm && (
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

      {/* Volumetric Parallax Clouds */}
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
              <path fill="currentColor" d="M0,0 C180,15 360,0 540,15 C720,25 900,5 1080,20 C1260,25 1380,10 1440,15 L1440,300 L0,300 Z"></path>
            </svg>
          </div>

          {/* DAYTIME & SUNRISE PEACEFUL SAILBOAT (HIDDEN AT 18H SUNSET AND 19:30 NIGHT) */}
          {(theme === 'day' || theme === 'sunrise') && !isStorm && (
            <div className="sailing-boat-track">
              <div className="sailing-boat">
                {/* SLEEK VOYAGER CLIPPER SVG */}
                <svg className="boat-svg" viewBox="0 0 180 100" width="130" height="74">
                  {/* Translucent Sea Wake Foam Trail */}
                  <path d="M5,76 Q45,68 110,72 Q150,68 175,76 Q155,84 110,82 Q45,84 5,76 Z" fill="rgba(255, 255, 255, 0.35)" />
                  <path d="M125,72 Q152,62 172,68 Q158,74 135,76 Z" fill="rgba(224, 242, 254, 0.7)" />

                  {/* Sleek Dark Hull Contour */}
                  <path d="M14,46 C20,32 10,30 6,34 C10,44 16,48 20,48 C36,76 138,76 156,46 L140,62 C115,74 46,74 30,60 Z" fill="#78350f" />
                  <path d="M20,48 C38,74 134,74 154,48 L144,56 C126,68 48,68 30,56 Z" fill="#b45309" />
                  <path d="M24,48 C40,68 130,68 148,48 L142,52 C126,64 50,64 34,52 Z" fill="#d97706" opacity="0.8" />

                  {/* Golden Waterline Strip */}
                  <path d="M18,48 Q85,62 156,48" stroke="#fef08a" strokeWidth="2" fill="none" strokeLinecap="round" />

                  {/* Slender Bowsprit Diagonal Pole */}
                  <line x1="138" y1="50" x2="178" y2="34" stroke="#451a03" strokeWidth="3.5" strokeLinecap="round" />

                  {/* Stern Golden Glowing Lantern */}
                  <circle cx="12" cy="36" r="3.5" fill="#fef08a" />
                  <circle cx="12" cy="36" r="7" fill="rgba(251, 191, 36, 0.4)" />

                  {/* Deck Portholes */}
                  <circle cx="48" cy="56" r="2.5" fill="#fef08a" />
                  <circle cx="70" cy="58" r="2.5" fill="#fef08a" />
                  <circle cx="92" cy="58" r="2.5" fill="#fef08a" />
                  <circle cx="114" cy="56" r="2.5" fill="#fef08a" />

                  {/* Rigging Rope Lines */}
                  <line x1="12" y1="36" x2="48" y2="18" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="1" />
                  <line x1="48" y1="18" x2="90" y2="8" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="1" />
                  <line x1="90" y1="8" x2="132" y2="16" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="1" />
                  <line x1="132" y1="16" x2="176" y2="35" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="1" />

                  {/* 3 Masts */}
                  <line x1="132" y1="14" x2="132" y2="52" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="90" y1="6" x2="90" y2="54" stroke="#371a06" strokeWidth="3" strokeLinecap="round" />
                  <line x1="48" y1="18" x2="48" y2="50" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" />

                  {/* Wind-Swept White Sails */}
                  <path d="M92,8 C115,12 120,20 92,24 C84,20 84,12 92,8 Z" fill="#ffffff" opacity="0.96" />
                  <path d="M92,28 C122,32 128,42 92,46 C82,40 82,30 92,28 Z" fill="#f1f5f9" opacity="0.92" />
                  <path d="M134,16 C154,20 158,28 134,32 C127,26 127,20 134,16 Z" fill="#e2e8f0" opacity="0.9" />
                  <path d="M134,36 C152,39 154,45 134,47 Z" fill="#cbd5e1" opacity="0.85" />
                  <path d="M50,20 C70,24 74,32 50,36 C44,30 44,24 50,20 Z" fill="#cbd5e1" opacity="0.88" />
                  <path d="M132,18 L172,36 L132,36 Z" fill="rgba(241, 245, 249, 0.85)" />

                  {/* Red Flag */}
                  <path d="M90,6 L110,10 L90,14 Z" fill="#ef4444" />
                </svg>
              </div>
            </div>
          )}

          {/* NAVIGATING EXPLORER SUBMARINE (NIGHT TEMPEST STORM 0:00 - 4:55) */}
          {isStorm && (
            <div className="submarine-track">
              <div className="submarine-entity">
                {/* Headlight Sonar Beam Effect */}
                <div className="sub-sonar-beam"></div>
                {/* High-Detail Explorer Submarine SVG */}
                <svg className="submarine-svg" viewBox="0 0 190 90" width="140" height="66">
                  {/* Propeller Water Bubbles & Wake Trail */}
                  <circle cx="14" cy="46" r="3.5" fill="rgba(224, 242, 254, 0.75)" />
                  <circle cx="24" cy="40" r="2.5" fill="rgba(255, 255, 255, 0.7)" />
                  <circle cx="8" cy="52" r="4.5" fill="rgba(186, 230, 253, 0.6)" />
                  <path d="M5,48 C20,44 40,46 58,48 C40,52 20,52 5,48 Z" fill="rgba(224, 242, 254, 0.35)" />

                  {/* Rear Propeller Blades */}
                  <path d="M28,40 L34,48 L28,56 L26,48 Z" fill="#475569" />
                  <path d="M24,48 L32,44 L32,52 Z" fill="#64748b" />

                  {/* Stern Rudder Fins */}
                  <path d="M34,34 L22,22 L34,28 Z" fill="#b45309" />
                  <path d="M34,62 L22,74 L34,68 Z" fill="#b45309" />

                  {/* Main Metallic Submarine Body Hull */}
                  <path d="M30,36 C30,36 90,30 156,40 C170,44 170,52 156,56 C90,66 30,60 30,60 Z" fill="#f59e0b" />
                  {/* Lower Hull Dark Planking */}
                  <path d="M30,48 C30,48 90,48 156,48 C168,48 166,54 156,56 C90,66 30,60 30,60 Z" fill="#0f172a" />
                  
                  {/* Cyan Neon Waterline Accent Strip */}
                  <path d="M30,48 C85,50 140,49 162,48" stroke="#38bdf8" strokeWidth="2" fill="none" strokeLinecap="round" />

                  {/* Conning Tower (Bridge & Periscope Tower) */}
                  <path d="M80,36 L84,20 C84,18 106,18 106,20 L110,36 Z" fill="#d97706" />
                  <rect x="82" y="18" width="26" height="4" rx="2" fill="#0f172a" />
                  
                  {/* Periscope Mast & Red Flashing Beacon Light */}
                  <line x1="95" y1="18" x2="95" y2="6" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
                  <path d="M95,6 L105,6 L105,11 L99,11 Z" fill="#f59e0b" />
                  <circle cx="95" cy="4" r="2.5" fill="#ef4444" />

                  {/* Circular Glowing Portholes with Interior Blue Light */}
                  <g className="portholes">
                    <circle cx="58" cy="46" r="5.5" fill="#0f172a" stroke="#d97706" strokeWidth="1.5" />
                    <circle cx="58" cy="46" r="3.8" fill="#38bdf8" />
                    
                    <circle cx="82" cy="46" r="5.5" fill="#0f172a" stroke="#d97706" strokeWidth="1.5" />
                    <circle cx="82" cy="46" r="3.8" fill="#38bdf8" />
                    
                    <circle cx="106" cy="46" r="5.5" fill="#0f172a" stroke="#d97706" strokeWidth="1.5" />
                    <circle cx="106" cy="46" r="3.8" fill="#38bdf8" />
                    
                    <circle cx="130" cy="46" r="5.5" fill="#0f172a" stroke="#d97706" strokeWidth="1.5" />
                    <circle cx="130" cy="46" r="3.8" fill="#38bdf8" />
                  </g>

                  {/* Forward Glowing Headlight Lens */}
                  <circle cx="158" cy="48" r="3.5" fill="#fef08a" />
                  <polygon points="158,45 186,34 186,62 158,51" fill="rgba(254, 240, 138, 0.35)" />
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

          {/* CHARACTER SITTING ON THE SAND */}
          <div className="character-sitting-spot" title="Lucas Silva Pessoa">
            <div className="spot-shadow"></div>
            <img 
              src="/img/sentado.png" 
              alt="Personagem Lucas Sentado" 
              className="character-sitting-img"
            />
          </div>
        </div>

        {/* SOLID GROUND BASE FILL (100% OPAQUE BACKDROP SO NOTHING EVER LEAKS THROUGH) */}
        <div className="beach-base-fill"></div>

      </div>
    </div>
  );
}
