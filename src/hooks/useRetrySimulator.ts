import { useState, useCallback, useRef } from 'react';

export type AttemptStatus = 'idle' | 'running' | 'failed' | 'success';

export interface Attempt {
  number: number;
  status: AttemptStatus;
  delay: number;
}

export type SimulatorStrategy = 'FIXED' | 'EXPONENTIAL';

interface SimulatorConfig {
  maxAttempts: number;
  delayMs: number;
  failUntil: number; // succeed on this attempt number
  strategy: SimulatorStrategy;
}

export function useRetrySimulator(config: SimulatorConfig) {
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const cancelRef = useRef(false);

  const getDelay = useCallback(
    (attemptNum: number): number => {
      if (config.strategy === 'EXPONENTIAL') {
        return config.delayMs * Math.pow(2, attemptNum - 1);
      }
      return config.delayMs;
    },
    [config.delayMs, config.strategy]
  );

  const reset = useCallback(() => {
    cancelRef.current = true;
    setAttempts([]);
    setRunning(false);
    setDone(false);
  }, []);

  const run = useCallback(async () => {
    cancelRef.current = false;
    setAttempts([]);
    setRunning(true);
    setDone(false);

    for (let i = 1; i <= config.maxAttempts; i++) {
      if (cancelRef.current) break;

      const delay = i === 1 ? 0 : getDelay(i - 1);

      // Mark as running
      setAttempts((prev) => [
        ...prev,
        { number: i, status: 'running', delay },
      ]);

      // Simulate delay
      await new Promise((res) => setTimeout(res, 600 + delay * 0.3));

      if (cancelRef.current) break;

      const willSucceed = i >= config.failUntil;

      setAttempts((prev) =>
        prev.map((a) =>
          a.number === i
            ? { ...a, status: willSucceed ? 'success' : 'failed' }
            : a
        )
      );

      if (willSucceed) break;

      // brief pause before next attempt
      await new Promise((res) => setTimeout(res, 300));
    }

    if (!cancelRef.current) {
      setRunning(false);
      setDone(true);
    }
  }, [config.maxAttempts, config.failUntil, getDelay]);

  return { attempts, running, done, run, reset };
}
