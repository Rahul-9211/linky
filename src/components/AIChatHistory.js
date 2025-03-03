import { useTheme } from '../context/ThemeContext';

function AIChatHistory() {
  const { isDarkMode, toggleTheme } = useTheme();
  
  // Add this near the start of your component
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <div className="chat-container">
      <button className="theme-toggle" onClick={toggleTheme}>
        {isDarkMode ? '☀️ Light' : '🌙 Dark'}
      </button>
      {/* existing chat content... */}
    </div>
  );
} 