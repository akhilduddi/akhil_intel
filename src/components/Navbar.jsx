import { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../styles/navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        {/* Brand/Logo */}
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <span className="brand-icon me-2">🎓</span>
          <span className="brand-text">SkillSync</span>
        </Link>

        {/* Mobile Menu Button */}
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={toggleMenu}>Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/courses" className="nav-link" onClick={toggleMenu}>Courses</Link>
            </li>
            <li className="nav-item">
              <Link to="/discover-yourself" className="nav-link" onClick={toggleMenu}>Discover Yourself</Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link" onClick={toggleMenu}>Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link to="/testQuestions" className="nav-link" onClick={toggleMenu}>Test</Link>
            </li>
            <li className="nav-item">
              <Link to="/supreme" className="nav-link" onClick={toggleMenu}>Supreme</Link>
            </li>
            <li className="nav-item">
              <Link to="/materials" className="nav-link" onClick={toggleMenu}>Material</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;