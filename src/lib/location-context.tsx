import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Location } from '@/components/LocationPicker';

interface LocationContextValue {
  location: Location;
  setLocation: (l: Location) => void;
  showPicker: boolean;
  setShowPicker: (v: boolean) => void;
}

const LocationContext = createContext<LocationContextValue>({
  location: { area: 'Koramangala', city: 'Bangalore', full: 'Koramangala, Bangalore' },
  setLocation: () => {},
  showPicker: false,
  setShowPicker: () => {},
});

export function LocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<Location>({
    area: 'Koramangala',
    city: 'Bangalore',
    full: 'Koramangala, Bangalore',
  });
  const [showPicker, setShowPicker] = useState(false);

  return (
    <LocationContext.Provider value={{ location, setLocation, showPicker, setShowPicker }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useAppLocation() {
  return useContext(LocationContext);
}
