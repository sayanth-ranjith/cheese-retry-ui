import React from 'react';
import { ThemeMode } from '../../types/theme';
import CodeBlock from '../ui/CodeBlock';
import { MAVEN_SNIPPET } from '../../constants/content';
import './HeroSection.css';

interface HeroSectionProps {
  theme: ThemeMode;
}

const HeroSection: React.FC<HeroSectionProps> = ({ theme }) => {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="hero" id="top">
      <div className="hero__inner">
        <div className="hero__badge">v0.0.11 · MIT License</div>

        <h1 className="hero__headline">
          <span className="hero__emoji">🧀</span>
          <span>
            Retry logic,{' '}
            <em className="hero__accent">without the drama.</em>
          </span>
        </h1>

        <p className="hero__sub">
          A lightweight Java library that adds retry capabilities to your Spring Boot app in
          minutes. One annotation. Clean source. No bloat.
        </p>

        <div className="hero__actions">
          <button className="hero__btn hero__btn--primary" onClick={() => scrollTo('#quickstart')}>
            Get started
          </button>
          <a
            className="hero__btn hero__btn--secondary"
            href="https://github.com/sayanth-ranjith/cheese-retry"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub ↗
          </a>
        </div>

        <div className="hero__maven">
          <span className="hero__maven-label">Maven</span>
          <CodeBlock code={MAVEN_SNIPPET.code} language="xml" theme={theme} compact />
        </div>

        <div className="hero__pills">
          {['Spring Boot', 'Java 11+', 'Zero config', 'Annotation-based'].map((tag) => (
            <span key={tag} className="hero__pill">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
