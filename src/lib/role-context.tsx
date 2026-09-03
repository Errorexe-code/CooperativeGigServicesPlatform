import { createContext, useContext, useState, type ReactNode } from 'react';

type Role = 'customer' | 'worker';

interface RoleContextValue {
  role: Role;
  setRole: (role: Role) => void;
  isWorker: boolean;
  setIsWorker: (v: boolean) => void;
}

const RoleContext = createContext<RoleContextValue>({
  role: 'customer',
  setRole: () => {},
  isWorker: false,
  setIsWorker: () => {},
});

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>('customer');
  const [isWorker, setIsWorker] = useState(false);
  return (
    <RoleContext.Provider value={{ role, setRole, isWorker, setIsWorker }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  return useContext(RoleContext);
}
