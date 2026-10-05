import React, { useState } from 'react';
import { ToastProvider, useToast } from './context/ToastContext';
import { useSkyEngine } from './hooks/useSkyEngine';
import { useSoundscape } from './hooks/useSoundscape';
import { useScrollReveal } from './hooks/useScrollReveal';
// import { useSlowScrollSnap } from './hooks/useSlowScrollSnap';
import { SkyViewport } from './components/SkyViewport';
import { AppHeader } from './components/AppHeader';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Experience } from './components/sections/Experience';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ToastContainer } from './components/ToastContainer';

function PortfolioContent() {
  const { showToast } = useToast();
  const sky = useSkyEngine();
  const soundscape = useSoundscape(sky.theme, showToast);
  useScrollReveal();
  // useSlowScrollSnap(); // Removido pois estava causando travamento no scroll
  const [activeModalProject, setActiveModalProject] = useState(null);

  return (
    <>
      {/* CELESTIAL SKY ENVIRONMENT */}
      <SkyViewport
        canvasRef={sky.canvasRef}
        sunPos={sky.sunPos}
        moonPos={sky.moonPos}
        theme={sky.theme}
        isStorm={sky.isStorm}
      />

      {/* TIME CONTROL WIDGET & NAVIGATION HEADER */}
      <AppHeader
        mode={sky.mode}
        setMode={sky.setMode}
        formattedTime={sky.formattedTime}
        phaseName={sky.phaseName}
        iconClass={sky.iconClass}
        currentMinute={sky.currentMinute}
        isPlayingSound={soundscape.isPlaying}
        toggleSound={soundscape.toggleSound}
      />

      {/* MAIN CONTENT WRAPPER */}
      <main className="page-content" id="main-content">
        <Hero
          theme={sky.theme}
          phaseName={sky.phaseName}
          formattedTime={sky.formattedTime}
        />
        <div className="section-divider-glow"></div>
        <About />
        <div className="section-divider-glow"></div>
        <Skills />
        <div className="section-divider-glow"></div>
        <Projects onOpenModal={setActiveModalProject} />
        <div className="section-divider-glow"></div>
        <Experience />
        <div className="section-divider-glow"></div>
        <Contact />
        <Footer
          phaseName={sky.phaseName}
          formattedTime={sky.formattedTime}
        />
      </main>

      {/* PROJECT DETAILS MODAL */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />

      {/* TOAST CONTAINER */}
      <ToastContainer />
    </>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <PortfolioContent />
    </ToastProvider>
  );
}
