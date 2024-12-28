import React, { createContext, useContext, ReactNode } from 'react';
import { StorageInterface } from './StorageInterface';
import { LocalStorage } from './LocalStorage';

const StorageContext = createContext<StorageInterface>(new LocalStorage());

type StorageProviderProps = {
  children: ReactNode;
  storage: StorageInterface;
};

export const StorageProvider = ({ children, storage }: StorageProviderProps) => (
  <StorageContext.Provider value={storage}>
    {children}
  </StorageContext.Provider>
);

export const useStorage = () => useContext(StorageContext); 