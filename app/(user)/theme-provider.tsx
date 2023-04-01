"use client"

import { createContext, useContext, useState, Dispatch, SetStateAction } from 'react';

interface ContextProps {
  userId: string,
  setUserId: Dispatch<SetStateAction<string>>
}

export const ThemeContext = createContext<ContextProps>({
  userId: '',
  setUserId: (): string => ''
});

export const ThemeProvider = ({
  children,
}: any) => {
  const [userId, setUserId] = useState<string>('');

  return (
    <ThemeContext.Provider value={{ userId, setUserId }}>
      {children}
    </ThemeContext.Provider>
  );
}
export const useGlobalContext = () => useContext(ThemeContext);
