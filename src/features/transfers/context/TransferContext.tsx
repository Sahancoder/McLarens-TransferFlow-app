import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_TRANSFERS } from '../../../shared/constants/data';

interface TransferContextType {
  transfers: any[];
  createTransfer: (data: any) => void;
  updateTransferStatus: (id: string, status: string) => void;
}

const TransferContext = createContext<TransferContextType>({} as TransferContextType);

export const TransferProvider = ({ children }: { children: React.ReactNode }) => {
  const [transfers, setTransfers] = useState(INITIAL_TRANSFERS);

  // Auto-assign mock logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTransfers(current => current.map(t => {
        // Auto assign requested to approved after 10s mock
        if (t.status === 'REQUESTED' && Math.random() > 0.7) {
          return { 
            ...t, 
            status: 'APPROVED', 
            assignedAt: new Date().toISOString(),
            truck: 'TRK-05',
            driverId: 'D2'
          };
        }
        return t;
      }));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const createTransfer = (data: any) => {
    const newTransfer = {
      id: `TR-${Math.floor(Math.random() * 9000) + 1000}`,
      ...data,
      status: 'REQUESTED',
      driverId: null,
      truck: null,
      assignedAt: null
    };
    setTransfers(prev => [newTransfer, ...prev]);
  };

  const updateTransferStatus = (id: string, newStatus: string) => {
    setTransfers(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  return (
    <TransferContext.Provider value={{ transfers, createTransfer, updateTransferStatus }}>
      {children}
    </TransferContext.Provider>
  );
};

export const useTransfers = () => useContext(TransferContext);
