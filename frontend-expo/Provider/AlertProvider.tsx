import React, { createContext, useContext, useState } from 'react';

const AlertContext = createContext({ alert: null, showAlert: (message: string, type: any) => {}, hideAlert: () => {} });
//const AlertContext = createContext();

export const AlertProvider = ({ children }: any) => {
  const [alert, setAlert] = useState(null);

  const showAlert = (message: string, type: any) => {
    setAlert({ message, type });
  };

  const hideAlert = () => {
    setAlert(null);
  };

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert, alert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);