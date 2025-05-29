import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../styles/navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && !event.target.closest('.navbar')) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuOpen]);

  // Close menu when window is resized to desktop view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 991.98) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = (e) => {
    e.stopPropagation(); // Prevent event from bubbling up
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        {/* Brand/Logo */}
        <Link to="/" className="navbar-brand d-flex align-items-center" onClick={() => setMenuOpen(false)}>
          <span className="brand-icon me-2">🎓</span>
          <span className="brand-text">SkillSync</span>
        </Link>

        {/* Mobile Menu Button */}
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={toggleMenu}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          aria-controls="navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div 
          className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/courses" className="nav-link" onClick={() => setMenuOpen(false)}>Courses</Link>
            </li>
            <li className="nav-item">
              <Link to="/discover-yourself" className="nav-link" onClick={() => setMenuOpen(false)}>Discover Yourself</Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link" onClick={() => setMenuOpen(false)}>Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link to="/testQuestions" className="nav-link" onClick={() => setMenuOpen(false)}>Test</Link>
            </li>
            <li className="nav-item">
              <Link to="/supreme" className="nav-link" onClick={() => setMenuOpen(false)}>Supreme</Link>
            </li>
            <li className="nav-item">
              <Link to="/materials" className="nav-link" onClick={() => setMenuOpen(false)}>Material</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;