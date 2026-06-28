import React from 'react';
import { FEATURES } from '../../constants/content';
import './FeaturesSection.css';

const FeaturesSection: React.FC = () => (
  <section className="features" id="features">
    <div className="section-inner">
      <p className="section-eyebrow">Why Cheese Retry?</p>
      <h2 className="section-title">Everything you need, nothing you don't.</h2>
      <p className="section-sub">
        Built for developers who want retry logic fast — not a configuration challenge.
      </p>

      <div className="features__grid">
        {FEATURES.map((f) => (
          <div key={f.title} className="feature-card">
            <div className="feature-card__icon">{f.icon}</div>
            <h3 className="feature-card__title">{f.title}</h3>
            <p className="feature-card__desc">{f.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
