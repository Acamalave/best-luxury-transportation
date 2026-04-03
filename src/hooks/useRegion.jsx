import { createContext, useContext, useState, useCallback } from 'react';
import { getRegionData } from '../data/regions';

const RegionContext = createContext(null);

export function RegionProvider({ children }) {
  const stored = typeof window !== 'undefined' ? localStorage.getItem('blt-region') : null;
  const [regionId, setRegionId] = useState(stored || null);

  const setRegion = useCallback((id) => {
    setRegionId(id);
    localStorage.setItem('blt-region', id);
  }, []);

  const regionData = regionId ? getRegionData(regionId) : null;

  return (
    <RegionContext.Provider value={{ regionId, regionData, setRegion, hasSelected: !!regionId }}>
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion() {
  const ctx = useContext(RegionContext);
  if (!ctx) throw new Error('useRegion must be used inside RegionProvider');
  return ctx;
}
