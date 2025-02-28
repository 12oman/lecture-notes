import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import futureAestheticsLecture from '/lectures/ET/week1.md?raw'
import futureArchitectureLecture from '/lectures/ET/week2.md?raw'
import interactionDesignLecture from '/lectures/ID/week1.md?raw'
import interactionDesignLecture2 from '/lectures/ID/week2.md?raw'
import futureScaleLecture from '/lectures/ET/week3.md?raw'

const App = () => {
  const [content, setContent] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);
  const [showMenu, setShowMenu] = useState(true);
  const [error, setError] = useState(null);
  const [activeLectureTitle, setActiveLectureTitle] = useState('');

  const lectures = [
    { 
      title: 'future aesthetics et week 1', 
      content: futureAestheticsLecture
    },
    {
      title: 'future architecture et week 2',
      content: futureArchitectureLecture
    }
    ,
    {
      title: 'interaction design ii week 1',
      content: interactionDesignLecture
    }
    ,
    {
      title: 'interaction design ii week 2',
      content: interactionDesignLecture2
    }
    ,
    {
      title: 'future scale et week 3',
      content: futureScaleLecture
    }
  ];

  const loadLecture = (lecture) => {
    try {
      const contentSections = lecture.content.split('---');
      setSlides(contentSections.map(slide => slide.trim()));
      setContent(lecture.content);
      setCurrentSlide(0);
      setShowMenu(false);
      setActiveLectureTitle(lecture.title);
    } catch (error) {
      console.error('Error loading lecture:', error);
      setError(error.message);
      setShowMenu(true);
    }
  };
  
  const printToPDF = () => {
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    
    // Create a styled document with brutalist/terminal aesthetics
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${activeLectureTitle || 'Lecture Notes'}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
            
            body {
              font-family: 'Space Mono', monospace;
              background-color: #111;
              color: #0f0;
              padding: 30px;
              max-width: 800px;
              margin: 0 auto;
              line-height: 1.6;
              font-size: 14px;
            }
            
            @media print {
              body {
                background-color: #fff;
                color: #000;
              }
              
              h2, h3 {
                color: #000;
              }
              
              pre, code {
                border-color: #000;
              }
            }
            
            h1 {
              font-size: 24px;
              border-bottom: 2px solid #0f0;
              padding-bottom: 10px;
              margin-top: 30px;
              text-transform: uppercase;
              letter-spacing: 2px;
            }
            
            h2 {
              font-size: 20px;
              letter-spacing: 1px;
              color: #0ff;
            }
            
            h3 {
              font-size: 18px;
              color: #f0f;
            }
            
            code {
              background: #222;
              padding: 2px 5px;
              border-radius: 0;
              font-family: 'Space Mono', monospace;
              border-left: 3px solid #0f0;
              color: #0f0;
            }
            
            pre {
              background: #222;
              padding: 15px;
              border-radius: 0;
              border-left: 5px solid #0f0;
              overflow-x: auto;
              margin: 20px 0;
            }
            
            img {
              max-width: 100%;
              height: auto;
              margin: 15px 0;
              border: 2px solid #0f0;
              filter: grayscale(30%);
            }
            
            blockquote {
              border-left: 3px solid #0f0;
              padding-left: 10px;
              color: #0ff;
              margin: 20px 0;
              font-style: italic;
            }
            
            .container {
              margin-bottom: 30px;
              border: 1px solid #333;
              padding: 20px;
              position: relative;
            }
            
            .slide-divider {
              border: none;
              border-top: 1px dashed #0f0;
              margin: 30px 0;
            }
            
            .lecture-title {
              font-size: 28px;
              font-weight: bold;
              text-align: center;
              margin-bottom: 40px;
              padding: 20px;
              border: 2px solid #0f0;
              text-transform: uppercase;
              letter-spacing: 3px;
            }
            
            ul, ol {
              padding-left: 20px;
            }
            
            li {
              margin-bottom: 5px;
            }
            
            li::marker {
              color: #0f0;
              content: "> ";
            }
            
            a {
              color: #ff0;
              text-decoration: none;
              border-bottom: 1px dotted #ff0;
            }
            
            .container::before {
              content: "// slide " attr(data-slide);
              position: absolute;
              top: -10px;
              right: 10px;
              background: #111;
              padding: 0 5px;
              font-size: 12px;
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="lecture-title">${activeLectureTitle || 'Lecture Notes'}</div>
    `);

    // Add all slides to the document in a continuous flow
    slides.forEach((slide, index) => {
      printWindow.document.write(`<div class="container" data-slide="${index + 1}">`);
      // Add the slide content
      printWindow.document.write(slide);
      
      // Add a divider between slides (except for the last one)
      if (index < slides.length - 1) {
        printWindow.document.write(`<hr class="slide-divider" />`);
      }
      
      printWindow.document.write(`</div>`);
    });

    // Close the document
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    
    // Wait for resources to load then print
    printWindow.onload = function() {
      printWindow.print();
    };
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
            <button className="pdf-button" onClick={printToPDF}>
              Print Notes
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
