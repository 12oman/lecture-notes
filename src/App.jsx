import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import futureAestheticsLecture from '/lectures/ET/week1.md?raw'
import futureArchitectureLecture from '/lectures/ET/week2.md?raw'

const App = () => {
  const [content, setContent] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);
  const [showMenu, setShowMenu] = useState(true);
  const [error, setError] = useState(null);

  const lectures = [
    { 
      title: 'future aesthetics', 
      content: futureAestheticsLecture
    },
    {
      title: 'future architecture',
      content: futureArchitectureLecture
    }

  ];

  const loadLecture = (lecture) => {
    try {
      const contentSections = lecture.content.split('---');
      setSlides(contentSections.map(slide => slide.trim()));
      setContent(lecture.content);
      setCurrentSlide(0);
      setShowMenu(false);
    } catch (error) {
      console.error('Error loading lecture:', error);
      setError(error.message);
      setShowMenu(true);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Escape') {
        setShowMenu(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides.length]);

  return (
    <div className="app">
      {showMenu ? (
        <div className="menu">
          <div className="menu-content">
            <h1>Lectures</h1>
            {lectures.map((lecture, index) => (
              <button 
                key={index}
                onClick={() => loadLecture(lecture)}
                className="menu-button"
              >
                {lecture.title}
              </button>
            ))}
            {error && <div className="error-message">{error}</div>}
          </div>
        </div>
      ) : content ? (
        <>
          <header>
            <button className="menu-toggle" onClick={() => setShowMenu(true)}>
              Menu (esc)
            </button>
            <div className="progress">
              <div 
                className="progress-bar"
                style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
              />
            </div>
          </header>

          <main>
            <div className="content">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  img: ({node, ...props}) => (
                    <img style={{maxWidth: '100%', height: 'auto'}} {...props} alt={props.alt || ''} />
                  ),
                  a: ({node, ...props}) => (
                    <a target="_blank" rel="noopener noreferrer" {...props} />
                  ),
                }}
              >
                {slides[currentSlide] || ''}
              </ReactMarkdown>
            </div>
          </main>

          <div className="nav-buttons">
            <button 
              onClick={() => setCurrentSlide(prev => Math.max(prev - 1, 0))}
              className="nav-button"
            >←</button>
            <button 
              onClick={() => setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1))}
              className="nav-button"
            >→</button>
          </div>

          <div className="slide-counter">
            {currentSlide + 1} / {slides.length}
          </div>
        </>
      ) : (
        <div className="empty-state">Select a lecture to begin</div>
      )}
    </div>
  );
};

export default App;
