import React, { createContext, useState, useContext, useCallback } from 'react';

const NotificationContext = createContext();

let notificationId = 0;

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  const showNotification = useCallback((message, type = 'success') => {
    const id = notificationId++;
    setNotification({ id, message, type });
    setTimeout(() => {
      setNotification((currentNotification) => 
        currentNotification && currentNotification.id === id ? null : currentNotification
      );
    }, 3000);
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && <Notification message={notification.message} type={notification.type} />}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  return useContext(NotificationContext);
};

// We define the Notification component here to keep it self-contained
const Notification = ({ message, type }) => {
  const style = {
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '12px 24px',
    borderRadius: '8px',
    color: 'white',
    background: type === 'success' ? '#4caf50' : '#f44336', // Green for success, Red for error
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
    zIndex: 1000,
    transition: 'opacity 0.5s',
  };

  return (
    <div style={style}>
      {message}
    </div>
  );
};
