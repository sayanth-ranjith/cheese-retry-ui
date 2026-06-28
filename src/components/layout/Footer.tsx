import React from 'react';
import './Footer.css';

const Footer: React.FC = () => (
  <footer className="footer">
    <div className="footer__inner">
      <div className="footer__brand">
        <span className="footer__cheese">🧀</span>
        <span className="footer__name">cheese-retry</span>
      </div>
      <p className="footer__tagline">
        Made with ❤️ by{' '}
        <a
          href="https://github.com/sayanth-ranjith"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__link"
        >
          Sayanth Ranjith
        </a>
        . MIT License.
      </p>
      <div className="footer__links">
        <a
          href="https://github.com/sayanth-ranjith/cheese-retry"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__link"
        >
          GitHub
        </a>
        <a
          href="https://github.com/sayanth-ranjith/cheese-retry/issues"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__link"
        >
          Issues
        </a>
        <a
          href="https://github.com/sayanth-ranjith/cheese-retry/blob/main/LICENSE"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__link"
        >
          License
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
