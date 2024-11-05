import React from 'react';
import { RootState, useAppSelector } from '../store';

const NotificationBar: React.FC = () => {
  const notifications = useAppSelector((state:RootState) => state.notifications.items);

  return (
    <div className="notification-bar">
      {notifications.map((note, index) => (
        <div key={index}>{note.message}</div>
      ))}
    </div>
  );
};

export default NotificationBar;
