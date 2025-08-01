// Terminal functionality
document.addEventListener('DOMContentLoaded', function() {
  const terminalInput = document.getElementById('terminal-input');
  const terminalHistory = document.getElementById('terminal-history');
  const terminalCursor = document.getElementById('terminal-cursor');
  
  // Store command history
  let commandHistory = [];
  const MAX_HISTORY_ITEMS = 3;
  let hasExecutedCommand = false;
  
  // Function to update cursor position
  function updateCursorPosition() {
    if (!terminalInput || !terminalCursor) return;
    
    const inputValue = terminalInput.value;
    const tempSpan = document.createElement('span');
    tempSpan.style.font = window.getComputedStyle(terminalInput).font;
    tempSpan.style.visibility = 'hidden';
    tempSpan.style.position = 'absolute';
    tempSpan.style.whiteSpace = 'pre';
    tempSpan.textContent = inputValue.substring(0, terminalInput.selectionStart);
    document.body.appendChild(tempSpan);
    
    const textWidth = tempSpan.getBoundingClientRect().width;
    document.body.removeChild(tempSpan);
    
    terminalCursor.style.left = textWidth + 'px';
  }
  
  // Update cursor position on input and cursor movement
  if (terminalInput) {
    terminalInput.addEventListener('input', updateCursorPosition);
    terminalInput.addEventListener('keyup', updateCursorPosition);
    terminalInput.addEventListener('click', updateCursorPosition);
  }
  
  // File system structure - will be populated with actual Pelican data
  const filesystem = {
    '/': {
      'latest': {}
    }
  };
  
  // Populate filesystem with articles from Pelican context
  if (typeof window.articles !== 'undefined') {
    window.articles.forEach(article => {
      const slug = article.slug;
      const year = new Date(article.date).getFullYear().toString();
      
      const fileData = {
        type: 'file',
        date: article.date,
        title: article.title,
        url: article.url
      };
      
      filesystem['/']['latest'][slug] = fileData;
      if (!filesystem['/'][year]) {
        filesystem['/'][year] = {};
      }
      filesystem['/'][year][slug] = fileData;
    });
  }
  
  let currentPath = '/';
  
  function addToHistory(command, output) {
    if (!terminalHistory) return;
    
    // Expand terminal on first command
    if (!hasExecutedCommand) {
      hasExecutedCommand = true;
      const terminal = document.getElementById('terminal');
      if (terminal) {
        terminal.classList.add('expanded');
      }
    }
    
    // Add new command to history
    commandHistory.push({
      command: command,
      output: output
    });
    
    // Keep only the last MAX_HISTORY_ITEMS
    if (commandHistory.length > MAX_HISTORY_ITEMS) {
      commandHistory = commandHistory.slice(-MAX_HISTORY_ITEMS);
    }
    
    // Rebuild terminal history display
    terminalHistory.innerHTML = '';
    commandHistory.forEach(item => {
      const commandLine = document.createElement('div');
      commandLine.className = 'terminal-line';
      commandLine.innerHTML = `&gt; ${item.command}`;
      terminalHistory.appendChild(commandLine);
      
      if (item.output) {
        const outputLine = document.createElement('div');
        outputLine.className = 'terminal-line terminal-output';
        outputLine.innerHTML = item.output;
        terminalHistory.appendChild(outputLine);
      }
    });
  }
  
  function executeCommand(command) {
    const args = command.trim().split(' ');
    const cmd = args[0].toLowerCase();
    
    switch (cmd) {
      case 'ls':
        const currentDir = getCurrentDirectory();
        if (currentDir) {
          const entries = Object.keys(currentDir).map(name => {
            const item = currentDir[name];
            if (typeof item === 'object' && !item.type) {
              return `<span style="color: #78e8dd;">${name}/</span>`;
            } else if (item.type === 'file') {
              return `<span style="color: #cfcfcf;">${name}</span>`;
            }
            return name;
          });
          addToHistory(command, entries.join('&nbsp;&nbsp;'));
        } else {
          addToHistory(command, 'ERROR: Directory not found');
        }
        break;
        
      case 'cd':
        if (args[1]) {
          const newPath = args[1];
          if (newPath === '..') {
            if (currentPath !== '/') {
              currentPath = '/';
            }
          } else if (newPath === '/') {
            currentPath = '/';
          } else {
            const currentDir = getCurrentDirectory();
            if (currentDir && currentDir[newPath] && typeof currentDir[newPath] === 'object' && !currentDir[newPath].type) {
              currentPath = currentPath === '/' ? `/${newPath}` : `${currentPath}/${newPath}`;
            } else {
              addToHistory(command, 'ERROR: Directory not found');
              return;
            }
          }
          addToHistory(command, `Changed to ${currentPath}`);
        } else {
          addToHistory(command, 'Usage: cd <directory>');
        }
        break;
        
      case 'pwd':
        addToHistory(command, currentPath);
        break;
        
      case 'help':
        addToHistory(command, 'Available commands: ls, cd, pwd, cat, read, help, clear');
        break;
        
      case 'read':
        if (args[1]) {
          const articleSlug = args[1];
          const currentDir = getCurrentDirectory();
          if (currentDir && currentDir[articleSlug] && currentDir[articleSlug].type === 'file') {
            const article = currentDir[articleSlug];
            addToHistory(command, `Opening article: ${article.title}...`);
            setTimeout(() => {
              window.location.href = article.url;
            }, 500);
          } else {
            addToHistory(command, 'ERROR: Article not found. Use "ls" to see available articles.');
          }
        } else {
          addToHistory(command, 'Usage: read <article-name>');
        }
        break;
        
      case 'cat':
        if (args[1]) {
          const currentDir = getCurrentDirectory();
          if (currentDir && currentDir[args[1]] && currentDir[args[1]].type === 'file') {
            const file = currentDir[args[1]];
            addToHistory(command, `<span style="color: #ff6a6a;">TITLE:</span> ${file.title}<br><span style="color: #ff6a6a;">DATE:</span> ${file.date}<br><span style="color: #888;">// File contents encrypted</span>`);
          } else {
            addToHistory(command, 'ERROR: File not found');
          }
        } else {
          addToHistory(command, 'Usage: cat <filename>');
        }
        break;
        
      case 'clear':
        commandHistory = [];
        if (terminalHistory) {
          terminalHistory.innerHTML = '';
        }
        // Optionally collapse terminal back to single line on clear
        const terminal = document.getElementById('terminal');
        if (terminal) {
          terminal.classList.remove('expanded');
        }
        hasExecutedCommand = false;
        return;
        
      default:
        if (command.trim()) {
          addToHistory(command, `ERROR: Command '${cmd}' not found. Type 'help' for available commands.`);
        }
    }
  }
  
  function getCurrentDirectory() {
    const pathParts = currentPath === '/' ? [] : currentPath.split('/').filter(p => p);
    let current = filesystem['/'];
    
    for (const part of pathParts) {
      if (current[part]) {
        current = current[part];
      } else {
        return null;
      }
    }
    
    return current;
  }
  
  // Add click handlers for posts
  const posts = document.querySelectorAll('.post');
  posts.forEach(post => {
    post.addEventListener('click', function() {
      // Extract the article slug or URL from the post
      const linkElement = post.querySelector('a.arg');
      if (linkElement) {
        window.location.href = linkElement.href;
      }
    });
  });
  
  // Initialize cursor position
  updateCursorPosition();
  
  // Terminal input event handlers
  if (terminalInput) {
    terminalInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        const command = this.value;
        executeCommand(command);
        this.value = '';
        updateCursorPosition();
      }
    });
    
    // Focus the input on load
    terminalInput.focus();
  }
  
  // Refocus input when clicking in terminal area
  const terminal = document.getElementById('terminal');
  if (terminal) {
    terminal.addEventListener('click', function() {
      if (terminalInput) {
        terminalInput.focus();
      }
    });
  }
});