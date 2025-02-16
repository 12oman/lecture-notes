// src/App.jsx
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

const App = () => {
  const [currentLecture, setCurrentLecture] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const loadLecture = async () => {
      try {
        const response = await fetch('/lectures/ET/week1.md');
        if (!response.ok) throw new Error('Failed to fetch lecture');
        const markdown = await response.text();
        
        // Split into slides
        const contentSections = markdown.split('---');
        setSlides(contentSections.map(slide => slide.trim()));
        setCurrentLecture(markdown);
      } catch (error) {
        console.error('Error loading lecture:', error);
      }
    };

    loadLecture();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide(prev => Math.max(prev - 1, 0));
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides.length]);

  if (!currentLecture) {
    return <div>Loading lecture...</div>;
  }

  return (
    <div className="app">
      <header>
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
              // Custom components for different markdown elements
              img: ({node, ...props}) => (
                <img style={{maxWidth: '100%', height: 'auto'}} {...props} alt={props.alt || ''} />
              ),
              a: ({node, ...props}) => (
                <a target="_blank" rel="noopener noreferrer" {...props} />
              ),
              // Add more custom components as needed
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
    </div>
  );
};

export default App;