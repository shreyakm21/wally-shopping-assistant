import React, { createContext, useContext, useState } from 'react';

const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [compareItems, setCompareItems] = useState([]);

const addToCompare = (item) => {
  setCompareItems((prev) => {
    const exists = prev.find((p) => p.name === item.name);
    if (exists || prev.length >= 3) return prev; // limit to 3
    return [...prev, item];
  });
};

  const removeFromCompare = (index) => {
    setCompareItems((prev) => prev.filter((_, i) => i !== index));
  };

  const clearCompare = () => setCompareItems([]);

  return (
    <CompareContext.Provider value={{ compareItems, addToCompare, removeFromCompare, clearCompare }}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => useContext(CompareContext);
