import { IconButton, Tooltip } from '@mui/material'
import { Brightness4, Brightness7 } from '@mui/icons-material'
import { useTheme } from '../../context/ThemeContext'

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme()
  
  return (
    <Tooltip title={darkMode ? "Switch to light mode" : "Switch to dark mode"}>
      <IconButton 
        onClick={toggleTheme} 
        color="inherit"
        sx={{
          bgcolor: 'background.paper',
          boxShadow: 'var(--shadow-sm)',
          transition: 'transform var(--transition-fast)',
          '&:hover': {
            transform: 'scale(1.05)'
          }
        }}
      >
        {darkMode ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Tooltip>
  )
}

export default ThemeToggle