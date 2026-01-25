import { useState, useEffect } from 'react';

const useWindowManager = () => {
  const [activeWindows, setActiveWindows] = useState([]);
  const [zIndexCounter, setZIndexCounter] = useState(100);
  const [draggedWindow, setDraggedWindow] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isPlayingSound, setIsPlayingSound] = useState(false);

  const playSound = (soundType) => {
    if (isPlayingSound) return;
    
    setIsPlayingSound(true);
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Different sounds for different actions
      switch(soundType) {
        case 'open':
          oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(523.25, audioContext.currentTime + 0.1);
          gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
          break;
        case 'close':
          oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(440, audioContext.currentTime + 0.1);
          gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
          break;
        case 'click':
          oscillator.frequency.setValueAtTime(330, audioContext.currentTime);
          gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
          break;
        default:
          oscillator.frequency.setValueAtTime(220, audioContext.currentTime);
          gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
      }
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.3);
      
      setTimeout(() => {
        setIsPlayingSound(false);
      }, 300);
    } catch (e) {
      console.log("Audio not supported");
      setIsPlayingSound(false);
    }
  };

  const openWindow = (windowId) => {
    playSound('open');
    const existingWindow = activeWindows.find(w => w.id === windowId);
    
    if (!existingWindow) {
      setActiveWindows([...activeWindows, {
        id: windowId,
        zIndex: zIndexCounter,
        position: { 
          x: Math.max(50, window.innerWidth / 2 - 400), 
          y: Math.max(80, window.innerHeight / 2 - 300) // Start below top bar
        },
        maximized: false,
        minimized: false
      }]);
      setZIndexCounter(prev => prev + 1);
    } else {
      // Bring to front
      setActiveWindows(activeWindows.map(w =>
        w.id === windowId ? { ...w, zIndex: zIndexCounter, minimized: false } : w
      ));
      setZIndexCounter(prev => prev + 1);
    }
  };

  const closeWindow = (windowId) => {
    playSound('close');
    setActiveWindows(activeWindows.filter(w => w.id !== windowId));
  };

  const minimizeWindow = (windowId) => {
    playSound('click');
    setActiveWindows(activeWindows.map(w =>
      w.id === windowId ? { ...w, minimized: true } : w
    ));
  };

  const maximizeWindow = (windowId) => {
    playSound('click');
    setActiveWindows(activeWindows.map(w =>
      w.id === windowId ? { 
        ...w, 
        maximized: !w.maximized,
        position: w.maximized ? w.position : { x: 0, y: 32 } // Position below top bar when maximized
      } : w
    ));
  };

  const handleMouseDown = (e, windowId) => {
    if (e.target.closest('.window-controls')) return;
    
    const windowState = activeWindows.find(w => w.id === windowId);
    if (windowState && !windowState.maximized && !windowState.minimized) {
      playSound('click');
      setDraggedWindow(windowId);
      setDragOffset({
        x: e.clientX - windowState.position.x,
        y: e.clientY - windowState.position.y
      });
      
      // Bring to front
      setActiveWindows(activeWindows.map(w =>
        w.id === windowId ? { ...w, zIndex: zIndexCounter } : w
      ));
      setZIndexCounter(prev => prev + 1);
    }
  };

  // Prevent window from going under top bar
  const validatePosition = (position) => {
    return {
      x: Math.max(0, Math.min(position.x, window.innerWidth - 400)),
      y: Math.max(32, Math.min(position.y, window.innerHeight - 200)) // Minimum y is 32px (top bar height)
    };
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (draggedWindow) {
        const newPosition = validatePosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
        
        setActiveWindows(prev => prev.map(w =>
          w.id === draggedWindow
            ? { ...w, position: newPosition }
            : w
        ));
      }
    };

    const handleMouseUp = () => {
      setDraggedWindow(null);
    };

    if (draggedWindow) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [draggedWindow, dragOffset]);

  return {
    activeWindows,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    handleMouseDown,
    playSound
  };
};

export default useWindowManager;