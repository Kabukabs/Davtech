import React, { createContext, useContext, useRef, useState } from 'react';

// Create the context with an initial value of null
export const AppContext = createContext(null); 

// Custom hook to use the AppContext
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error('useAppContext can only be used inside AppContextProvider');
  return context;
};

// Context provider component
export const AppContextProvider = ({ children }) => {
  const modalCloseTrigger = useRef(null);
  const [toastContent, setToastContent] = useState(null);
  const toastTrigger = useRef(null);
  const showToast = (content) => {
    if (content) {
      setToastContent(content);
      toastTrigger.current.click();
    }
  };

  const CloseToast = () => {
    if (toastContent) {
      setToastContent(null);
      modalCloseTrigger.current.click();
    }
  };

  return (
    <AppContext.Provider value={{ modalCloseTrigger, showToast, CloseToast,toastTrigger,toastContent }}>
      {children}
    </AppContext.Provider>
  );
};
