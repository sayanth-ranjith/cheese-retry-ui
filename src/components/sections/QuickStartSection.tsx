import React, { useState } from 'react';
import { ThemeMode } from '../../types/theme';
import CodeBlock from '../ui/CodeBlock';
import { CODE_EXAMPLES } from '../../constants/content';
import './QuickStartSection.css';

interface QuickStartSectionProps {
  theme: ThemeMode;
}

const QuickStartSection: React.FC<QuickStartSectionProps> = ({ theme }) => {
  const [activeId, setActiveId] = useState(CODE_EXAMPLES[0].id);
  const active = CODE_EXAMPLES.find((e) => e.id === activeId)!;

  return (
    <section className="quickstart" id="quickstart">
      <div className="section-inner">
        <p className="section-eyebrow">Quick Start</p>
        <h2 className="section-title">Up and running in 3 minutes.</h2>
        <p className="section-sub">
          Choose your style — annotations for Spring Boot, or the fluent API for full control.
        </p>

        <div className="quickstart__tabs">
          {CODE_EXAMPLES.map((ex) => (
            <button
              key={ex.id}
              className={`quickstart__tab ${activeId === ex.id ? 'quickstart__tab--active' : ''}`}
              onClick={() => setActiveId(ex.id)}
            >
              {ex.title}
              {ex.tag && <span className="quickstart__tab-tag">{ex.tag}</span>}
            </button>
          ))}
        </div>

        <div className="quickstart__panel">
          <div className="quickstart__panel-header">
            <div>
              <h3 className="quickstart__panel-title">{active.title}</h3>
              <p className="quickstart__panel-desc">{active.description}</p>
            </div>
          </div>
          <CodeBlock code={active.code} language={active.language} theme={theme} />
        </div>
      </div>
    </section>
  );
};

export default QuickStartSection;
