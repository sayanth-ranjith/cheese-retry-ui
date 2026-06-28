export interface CodeExample {
  id: string;
  title: string;
  description: string;
  language: string;
  code: string;
  tag?: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface BackoffStrategy {
  name: string;
  pattern: number[];
  color: string;
  description: string;
}
