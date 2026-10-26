import React, { useState, useCallback, useMemo } from 'react';
import { ToastProvider, useToast } from './context/ToastContext';
import { useSkyEngine } from './hooks/useSkyEngine';
import { useSoundscape } from './hooks/useSoundscape';
import { useScrollReveal } from './hooks/useScrollReveal';
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

const MemoSkyViewport = React.memo(SkyViewport);
const MemoAbout = React.memo(About);
const MemoSkills = React.memo(Skills);
const MemoProjects = React.memo(Projects);
const MemoExperience = React.memo(Experience);
const MemoContact = React.memo(Contact);

function PortfolioContent() {
  const { showToast } = useToast();
  const sky = useSkyEngine();
  const soundscape = useSoundscape(sky.theme, showToast);
  useScrollReveal();
  const [activeModalProject, setActiveModalProject] = useState(null);

  const handleOpenModal = useCallback((project) => {
    setActiveModalProject(project);
  }, []);

  const handleCloseModal = useCallback(() => {
    setActiveModalProject(null);
  }, []);

  return (
    <>
      {/* CELESTIAL SKY ENVIRONMENT */}
      <MemoSkyViewport
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
        <MemoAbout />
        <div className="section-divider-glow"></div>
        <MemoSkills />
        <div className="section-divider-glow"></div>
        <MemoProjects onOpenModal={handleOpenModal} />
        <div className="section-divider-glow"></div>
        <MemoExperience />
        <div className="section-divider-glow"></div>
        <MemoContact />
        <Footer
          phaseName={sky.phaseName}
          formattedTime={sky.formattedTime}
        />
      </main>

      {/* PROJECT DETAILS MODAL */}
      <ProjectModal
        project={activeModalProject}
        onClose={handleCloseModal}
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
