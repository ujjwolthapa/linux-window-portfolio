import React, { useState, useEffect, useRef } from 'react';

const TerminalWindow = () => {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState([]);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);
  const [isClearing, setIsClearing] = useState(false);

  const commands = {
    'help': 'Available commands: help, about, skills, projects, education, experience, clear, date, echo, ls, pwd',
    'about': 'DevOps Engineer with expertise in cloud infrastructure, CI/CD, and system administration.',
    'skills': 'Docker, Kubernetes, AWS, Azure, Terraform, Ansible, Jenkins, Git, Linux, Bash, Python',
    'projects': 'Check the Projects folder for detailed project information.',
    'education': 'Check the Education folder for academic background.',
    'experience': 'Check the Experience folder for professional history.',
    'date': () => new Date().toLocaleString(),
    'pwd': '/home/devops/portfolio',
    'ls': 'about.txt  skills.md  projects/  education/  experience/  qualifications/',
    'clear': () => {
      setOutput([]);
      return '';
    },
    'echo': (args) => args.join(' ')
  };

  const executeCommand = (cmd) => {
    const [baseCmd, ...args] = cmd.trim().split(' ');
    const lowerCmd = baseCmd.toLowerCase();
    
    let response = '';
    let clearTerminal = false;
    
    if (commands[lowerCmd]) {
      if (lowerCmd === 'clear') {
        clearTerminal = true;
        setIsClearing(true);
      }
      
      if (typeof commands[lowerCmd] === 'function') {
        response = commands[lowerCmd](args);
      } else {
        response = commands[lowerCmd];
      }
    } else if (cmd.trim() !== '') {
      response = `Command not found: ${baseCmd}. Type 'help' for available commands.`;
    }

    return { response, clearTerminal };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cmd = command.trim();
    if (!cmd) return;

    // Execute command and get response
    const { response, clearTerminal } = executeCommand(cmd);
    
    // Handle clear command specially
    if (clearTerminal) {
      // Add the clear command to history but don't show it in output
      setHistory(prev => [...prev, cmd]);
      setHistoryIndex(-1);
      setCommand('');
      // Clear will happen immediately via the commands.clear() function
      return;
    }
    
    // For other commands, add to output
    const newOutput = [...output, { type: 'input', text: cmd }];
    
    if (response) {
      newOutput.push({ type: 'output', text: response });
    }
    
    setOutput(newOutput);
    setHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);
    setCommand('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex < history.length - 1 ? historyIndex + 1 : 0;
        setHistoryIndex(newIndex);
        setCommand(history[history.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCommand(history[history.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCommand('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const currentCmd = command.toLowerCase();
      const suggestions = Object.keys(commands).filter(cmd => 
        cmd.startsWith(currentCmd)
      );
      if (suggestions.length === 1) {
        setCommand(suggestions[0]);
      }
    } else if (e.key === 'Enter') {
      // Handle clear command on Enter
      if (command.trim().toLowerCase() === 'clear') {
        setTimeout(() => {
          setIsClearing(false);
        }, 50);
      }
    }
  };

  // Auto-scroll to bottom when output changes
  useEffect(() => {
    if (terminalRef.current && !isClearing) {
      setTimeout(() => {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }, 10);
    }
  }, [output, isClearing]);

  // Focus input on mobile tap
  useEffect(() => {
    const handleClick = () => {
      if (window.innerWidth <= 768 && inputRef.current) {
        inputRef.current.focus();
      }
    };
    
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  // Focus input on mount and after clear
  useEffect(() => {
    if (inputRef.current) {
      const timeout = setTimeout(() => {
        inputRef.current.focus();
      }, isClearing ? 50 : 0);
      return () => clearTimeout(timeout);
    }
  }, [isClearing]);

  // Reset clearing state after animation
  useEffect(() => {
    if (isClearing) {
      const timeout = setTimeout(() => {
        setIsClearing(false);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [isClearing]);

  // Initial terminal message
  useEffect(() => {
    setOutput([
      { type: 'output', text: 'Welcome to DevOps Portfolio Terminal!' },
      { type: 'output', text: 'Type "help" to see available commands.' },
      { type: 'output', text: '' }
    ]);
  }, []);

  // Add clear command to history without showing it
  const clearOutput = () => {
    setHistory(prev => [...prev, 'clear']);
    setHistoryIndex(-1);
    setOutput([]);
    setCommand('');
  };

  return (
    <div className="terminal-window">
      <div 
        className={`terminal-content ${isClearing ? 'clearing' : ''}`} 
        ref={terminalRef}
      >
        {output.map((line, index) => (
          <div key={index} className={`terminal-line ${line.type}`}>
            {line.type === 'input' && (
              <div className="input-line">
                <span className="prompt">$ devops@portfolio:~$ </span>
                <span className="command-text">{line.text}</span>
              </div>
            )}
            {line.type === 'output' && <span>{line.text}</span>}
          </div>
        ))}
        
        <form onSubmit={handleSubmit} className="terminal-input-form">
          <div className="terminal-input-line">
            <span className="prompt">$ devops@portfolio:~$ </span>
            <input
              ref={inputRef}
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={handleKeyDown}
              className="terminal-input"
              autoFocus
              spellCheck="false"
              aria-label="Terminal command input"
            />
            <span className="terminal-cursor"></span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TerminalWindow;