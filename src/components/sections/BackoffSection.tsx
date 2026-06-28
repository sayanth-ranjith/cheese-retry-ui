import React, { useState } from 'react';
import { ThemeMode } from '../../types/theme';
import CodeBlock from '../ui/CodeBlock';
import { BACKOFF_STRATEGIES } from '../../constants/content';
import './BackoffSection.css';

interface BackoffSectionProps {
  theme: ThemeMode;
}

const FIXED_CODE = `// Fixed: wait the same amount every time
new FixedBackoffStrategy(1000) // 1s → 1s → 1s`;

const EXP_CODE = `// Exponential: double the wait each time
new ExponentialBackoffStrategy(1000) // 1s → 2s → 4s → 8s…`;

const BackoffSection: React.FC<BackoffSectionProps> = ({ theme }) => {
  const [active, setActive] = useState(0);
  const strategy = BACKOFF_STRATEGIES[active];

  const maxVal = Math.max(...strategy.pattern);

  return (
    <section className="backoff" id="backoff">
      <div className="section-inner">
        <p className="section-eyebrow">Backoff Strategies</p>
        <h2 className="section-title">Pick the right delay curve.</h2>
        <p className="section-sub">
          Fixed keeps things predictable. Exponential protects struggling upstream services.
        </p>

        <div className="backoff__layout">
          <div className="backoff__tabs">
            {BACKOFF_STRATEGIES.map((s, i) => (
              <button
                key={s.name}
                className={`backoff__tab ${active === i ? 'backoff__tab--active' : ''}`}
                onClick={() => setActive(i)}
                style={active === i ? { borderColor: s.color, color: s.color } : {}}
              >
                {s.name}
              </button>
            ))}
          </div>

          <p className="backoff__desc">{strategy.description}</p>

          <div className="backoff__chart">
            {strategy.pattern.map((val, idx) => (
              <div key={idx} className="backoff__bar-wrap">
                <div
                  className="backoff__bar"
                  style={{
                    height: `${(val / maxVal) * 120 + 16}px`,
                    background: strategy.color,
                  }}
                />
                <span className="backoff__bar-label">
                  {idx === 0 ? 'Attempt 1' : `+${val}s`}
                </span>
              </div>
            ))}
          </div>

          <div className="backoff__code">
            <CodeBlock
              code={active === 0 ? FIXED_CODE : EXP_CODE}
              language="java"
              theme={theme}
              compact
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BackoffSection;
