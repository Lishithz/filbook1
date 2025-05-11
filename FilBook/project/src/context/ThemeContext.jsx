import { createContext, useContext, useState, useEffect } from 'react'
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles'

// Create context
const ThemeContext = createContext()

// Provider component
export const ThemeProvider = ({ children }) => {
  // Get initial theme preference from localStorage or system preference
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('darkMode')
    
    if (savedTheme !== null) {
      return savedTheme === 'true'
    }
    
    // Check for system preference
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  
  const [darkMode, setDarkMode] = useState(getInitialTheme)
  
  // Update body class and localStorage when theme changes
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
    
    localStorage.setItem('darkMode', darkMode)
  }, [darkMode])
  
  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = (e) => {
      // Only update if user hasn't explicitly set a preference
      if (localStorage.getItem('darkMode') === null) {
        setDarkMode(e.matches)
      }
    }
    
    mediaQuery.addEventListener('change', handleChange)
    
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])
  
  // Toggle theme function
  const toggleTheme = () => {
    setDarkMode(prev => !prev)
  }
  
  // Create Material-UI theme
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#4A6FFF',
        light: '#7B94FF',
        dark: '#2E4FD0',
      },
      secondary: {
        main: '#8A56FF',
        light: '#A880FF',
        dark: '#6E36D0',
      },
      error: {
        main: '#FF3B30',
      },
      warning: {
        main: '#FFC107',
      },
      info: {
        main: '#5AC8FA',
      },
      success: {
        main: '#34C759',
      },
      background: {
        default: darkMode ? '#1A1C23' : '#F5F7FA',
        paper: darkMode ? '#282B36' : '#FFFFFF',
      },
      text: {
        primary: darkMode ? '#FFFFFF' : '#1A1C23',
        secondary: darkMode ? '#A4ADC0' : '#656E85',
      },
    },
    typography: {
      fontFamily: 'Inter, sans-serif',
      h1: {
        fontSize: '2.25rem',
        fontWeight: 600,
        lineHeight: 1.2,
      },
      h2: {
        fontSize: '1.75rem',
        fontWeight: 600,
        lineHeight: 1.2,
      },
      h3: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.2,
      },
      h4: {
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.2,
      },
      body1: {
        fontSize: '1rem',
      },
      body2: {
        fontSize: '0.875rem',
      },
      button: {
        textTransform: 'none',
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: '8px 16px',
            transition: '0.3s',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
    },
  })
  
  // Context value
  const value = {
    darkMode,
    toggleTheme,
  }
  
  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}

// Custom hook for using the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}