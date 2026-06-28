export type ThemeMode = 'light' | 'dark';

export interface Theme {
  mode: ThemeMode;
  toggle: () => void;
}
