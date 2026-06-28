import React, { useState } from 'react';
import { Play, RotateCcw } from 'lucide-react';
import { useRetrySimulator, SimulatorStrategy } from '../../hooks/useRetrySimulator';
import './SimulatorSection.css';

const STRATEGY_OPTIONS: { value: SimulatorStrategy; label: string }[] = [
  { value: 'FIXED', label: 'Fixed delay' },
  { value: 'EXPONENTIAL', label: 'Exponential backoff' },
];

const SimulatorSection: React.FC = () => {
  const [maxAttempts, setMaxAttempts] = useState(4);
  const [delayMs, setDelayMs] = useState(200);
  const [failUntil, setFailUntil] = useState(3);
  const [strategy, setStrategy] = useState<SimulatorStrategy>('FIXED');

  const { attempts, running, done, run, reset } = useRetrySimulator({
    maxAttempts,
    delayMs,
    failUntil,
    strategy,
  });

  const succeeded = attempts.some((a) => a.status === 'success');
  const exhausted = done && !succeeded;

  return (
    <section className="simulator" id="examples">
      <div className="section-inner">
        <p className="section-eyebrow">Live Simulator</p>
        <h2 className="section-title">See retry logic in action.</h2>
        <p className="section-sub">
          Configure the parameters below and hit Run — watch each attempt play out in real time.
        </p>

        <div className="simulator__layout">
          {/* Controls */}
          <div className="simulator__controls">
            <h3 className="simulator__controls-title">Configuration</h3>

            <label className="sim-label">
              Max attempts
              <div className="sim-label__row">
                <input
                  type="range"
                  min={2}
                  max={6}
                  value={maxAttempts}
                  onChange={(e) => {
                    reset();
                    setMaxAttempts(Number(e.target.value));
                  }}
                  className="sim-range"
                />
                <span className="sim-value">{maxAttempts}</span>
              </div>
            </label>

            <label className="sim-label">
              Succeed on attempt
              <div className="sim-label__row">
                <input
                  type="range"
                  min={1}
                  max={maxAttempts}
                  value={Math.min(failUntil, maxAttempts)}
                  onChange={(e) => {
                    reset();
                    setFailUntil(Number(e.target.value));
                  }}
                  className="sim-range"
                />
                <span className="sim-value">
                  {Math.min(failUntil, maxAttempts) > maxAttempts ? 'Never' : Math.min(failUntil, maxAttempts)}
                </span>
              </div>
            </label>

            <label className="sim-label">
              Base delay (ms)
              <div className="sim-label__row">
                <input
                  type="range"
                  min={100}
                  max={800}
                  step={100}
                  value={delayMs}
                  onChange={(e) => {
                    reset();
                    setDelayMs(Number(e.target.value));
                  }}
                  className="sim-range"
                />
                <span className="sim-value">{delayMs}ms</span>
              </div>
            </label>

            <div className="sim-label">
              Backoff strategy
              <div className="sim-strategy-group">
                {STRATEGY_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    className={`sim-strategy-btn ${strategy === opt.value ? 'sim-strategy-btn--active' : ''}`}
                    onClick={() => {
                      reset();
                      setStrategy(opt.value);
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="sim-actions">
              <button
                className="sim-run-btn"
                onClick={run}
                disabled={running}
              >
                <Play size={16} />
                {running ? 'Running…' : 'Run'}
              </button>
              <button className="sim-reset-btn" onClick={reset} disabled={running}>
                <RotateCcw size={14} />
                Reset
              </button>
            </div>
          </div>

          {/* Visualizer */}
          <div className="simulator__vis">
            <div className="sim-vis__header">
              <span className="sim-vis__label">Execution timeline</span>
              {done && (
                <span className={`sim-vis__result ${succeeded ? 'sim-vis__result--ok' : 'sim-vis__result--fail'}`}>
                  {succeeded ? '✓ Succeeded' : '✗ Exhausted'}
                </span>
              )}
            </div>

            <div className="sim-vis__track">
              {attempts.length === 0 && (
                <div className="sim-vis__empty">Hit Run to start the simulation.</div>
              )}

              {attempts.map((a) => {
                const delayLabel =
                  a.number === 1
                    ? ''
                    : strategy === 'EXPONENTIAL'
                    ? `+${(delayMs * Math.pow(2, a.number - 2)).toFixed(0)}ms`
                    : `+${delayMs}ms`;

                return (
                  <div key={a.number} className="sim-attempt">
                    {a.number > 1 && (
                      <div className="sim-attempt__delay">
                        <span className="sim-attempt__delay-bar" />
                        <span className="sim-attempt__delay-label">{delayLabel}</span>
                      </div>
                    )}
                    <div
                      className={`sim-attempt__pill sim-attempt__pill--${a.status}`}
                    >
                      <span className="sim-attempt__num">#{a.number}</span>
                      <span className="sim-attempt__status">
                        {a.status === 'running' && '⟳ Executing…'}
                        {a.status === 'failed' && '✗ Failed'}
                        {a.status === 'success' && '✓ Success'}
                        {a.status === 'idle' && '…'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {exhausted && (
              <div className="sim-vis__exhausted">
                All {maxAttempts} attempts exhausted. In production, the exception propagates to the caller.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimulatorSection;
