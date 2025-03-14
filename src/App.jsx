import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import futureAestheticsLecture from '/lectures/ET/week1.md?raw'
import futureArchitectureLecture from '/lectures/ET/week2.md?raw'
import interactionDesignLecture from '/lectures/ID/week1.md?raw'
import interactionDesignLecture2 from '/lectures/ID/week2.md?raw'
import futureScaleLecture from '/lectures/ET/week3.md?raw'
import interactionDesignLecture3 from '/lectures/ID/week3.md?raw'
import interactionDesignLecture4 from '/lectures/ID/week4.md?raw'

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
    ,
    {title: 'computational design id week 3',
    content: interactionDesignLecture3
    }
    ,
    {title: 'touchdesigner id week 4',
    content: interactionDesignLecture4}
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
    
    // Create a styled document with two-column layout
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${activeLectureTitle || 'Lecture Notes'}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
            
            body {
              font-family: 'Space Mono', monospace;
              background-color: white;
              color: black;
              padding: 30px;
              max-width: 1000px;
              margin: 0 auto;
              line-height: 1.5;
              font-size: 12px;
            }
            
            h1 {
              font-size: 20px;
              border-bottom: 2px solid black;
              padding-bottom: 8px;
              margin-top: 24px;
              text-transform: uppercase;
              letter-spacing: 2px;
            }
            
            h2 {
              font-size: 18px;
              letter-spacing: 1px;
            }
            
            h3 {
              font-size: 16px;
            }
            
            code {
              background: #f0f0f0;
              padding: 2px 4px;
              border-radius: 0;
              font-family: 'Space Mono', monospace;
              border-left: 2px solid #333;
              font-size: 11px;
            }
            
            pre {
              background: #f0f0f0;
              padding: 10px;
              border-radius: 0;
              border-left: 4px solid #333;
              overflow-x: auto;
              margin: 15px 0;
              font-size: 11px;
            }
            
            pre code {
              border-left: none;
              padding: 0;
            }
            
            img {
              max-width: 100%;
              height: auto;
              margin: 10px 0;
              border: 1px solid #333;
            }
            
            blockquote {
              border-left: 3px solid #333;
              padding-left: 10px;
              margin: 15px 0;
              font-style: italic;
            }
            
            .lecture-title {
              font-size: 24px;
              font-weight: bold;
              text-align: center;
              margin-bottom: 30px;
              padding: 15px;
              border: 2px solid black;
              text-transform: uppercase;
              letter-spacing: 3px;
            }
            
            ul, ol {
              padding-left: 18px;
              margin: 10px 0;
            }
            
            li {
              margin-bottom: 4px;
            }
            
            li::marker {
              content: "- ";
            }
            
            a {
              color: #333;
              text-decoration: none;
              border-bottom: 1px dotted #333;
            }
            
            /* Two column layout */
            .two-column-layout {
              column-count: 2;
              column-gap: 30px;
              column-rule: 1px solid #ddd;
            }
            
            /* Container for each slide */
            .slide-container {
              break-inside: avoid;
              page-break-inside: avoid;
              margin-bottom: 20px;
              padding: 15px;
              border: 1px solid #333;
              position: relative;
            }
            
            .slide-container::before {
              content: "Slide " attr(data-slide);
              position: absolute;
              top: -8px;
              right: 10px;
              background: white;
              padding: 0 5px;
              font-size: 10px;
              color: #333;
            }
            
            /* For print media */
            @media print {
              body {
                font-size: 10pt;
              }
              
              .slide-container {
                border-color: #888;
              }
              
              h1, h2, h3 {
                page-break-after: avoid;
              }
              
              img, pre, blockquote {
                page-break-inside: avoid;
              }
              
              @page {
                margin: 1.5cm;
              }
            }
          </style>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/github.min.css">
          <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"></script>
          <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
        </head>
        <body>
          <div class="lecture-title">${activeLectureTitle || 'Lecture Notes'}</div>
          <div class="two-column-layout">
    `);

    // Add all slides to the document in a continuous flow
    slides.forEach((slide, index) => {
      // Skip empty slides or slides that only contain whitespace
      if (!slide.trim()) return;
      
      printWindow.document.write(`<div class="slide-container" data-slide="${index + 1}/${slides.length}">`);
      
      // Instead of writing the raw markdown, we'll create a div that will be processed by marked
      printWindow.document.write(`<div class="markdown-content" id="slide-${index}">${
        // Escape any HTML in the markdown to prevent issues
        slide.replace(/</g, '&lt;').replace(/>/g, '&gt;')
      }</div>`);
      
      printWindow.document.write(`</div>`);
    });

    printWindow.document.write(`</div>`); // Close two-column-layout

    // Add script to process the markdown after page load
    printWindow.document.write(`
      <script>
        window.onload = function() {
          // Configure marked to handle GitHub-flavored markdown
          marked.setOptions({
            breaks: true,
            gfm: true,
            highlight: function(code, language) {
              const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
              return hljs.highlight(code, { language: validLanguage }).value;
            }
          });
          
          // Process each slide's markdown content
          document.querySelectorAll('.markdown-content').forEach(function(el) {
            el.innerHTML = marked.parse(el.textContent);
          });
          
          // Initialize code highlighting
          document.querySelectorAll('pre code').forEach(function(block) {
            hljs.highlightBlock(block);
          });
          
          // Wait a moment for rendering to complete before printing
          setTimeout(function() {
            window.print();
          }, 1000);
        };
      </script>
    `);

    // Close the document
    printWindow.document.write('</body></html>');
    printWindow.document.close();
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
