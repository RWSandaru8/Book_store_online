"use client";

import { createContext, useContext } from 'react';

// Empty placeholder context just to prevent any imports from breaking
const ThemeContext = createContext<any>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}

// Stub hook to prevent any imports from breaking
export function useTheme() {
  return {
    theme: 'dark',
    toggleTheme: () => {}
  };
} 