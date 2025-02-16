// src/App.jsx
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

const App = () => {
  const [content, setContent] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);
  const [showMenu, setShowMenu] = useState(true);

  const lectures = [
    { title: 'Future Aesthetics', path: './lectures/ET/week1.md' },
    // Add more lectures here
  ];

  const loadLecture = async (path) => {
    try {
      const response = await fetch(path);
      if (!response.ok) throw new Error('Failed to fetch lecture');
      const markdown = await response.text();
      
      const contentSections = markdown.split('---');
      setSlides(contentSections.map(slide => slide.trim()));
      setContent(markdown);
      setCurrentSlide(0);
      setShowMenu(false);
    } catch (error) {
      console.error('Error loading lecture:', error);
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
                onClick={() => loadLecture(lecture.path)}
                className="menu-button"
              >
                {lecture.title}
              </button>
            ))}
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