import React, { useState, useEffect } from 'react';
import { Wifi, Volume2, Battery } from 'lucide-react';

const TopBar = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = () => {
    return time.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const formatDate = () => {
    return time.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <div className="activities-btn">Activities</div>
        <div className="top-bar-date">{formatDate()}</div>
      </div>
      <div className="top-bar-center">{formatDate()}</div>
      <div className="top-bar-right">
        <div className="system-icon"><Wifi size={16} /></div>
        <div className="system-icon"><Volume2 size={16} /></div>
        <div className="system-icon"><Battery size={16} /></div>
        <div className="time-display">{formatTime()}</div>
      </div>
    </div>
  );
};

export default TopBar;