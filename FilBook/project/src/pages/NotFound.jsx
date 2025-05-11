import { Box, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const NotFound = () => {
  const { darkMode } = useTheme()
  
  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: darkMode ? 'var(--neutral-900)' : 'var(--neutral-200)',
        color: darkMode ? 'var(--neutral-100)' : 'var(--neutral-900)',
        transition: 'all var(--transition-normal)',
        textAlign: 'center',
        p: 3
      }}
    >
      <Typography 
        variant="h1" 
        sx={{ 
          fontSize: { xs: '5rem', sm: '8rem' },
          fontWeight: 700,
          mb: 2,
          background: 'linear-gradient(to right, #4A6FFF, #8A56FF)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'pulse 2s infinite'
        }}
      >
        404
      </Typography>
      
      <Typography 
        variant="h4" 
        sx={{ 
          mb: 4,
          maxWidth: '600px',
          opacity: 0,
          animation: 'fadeIn var(--transition-normal) forwards',
          animationDelay: '0.3s'
        }}
      >
        Oops! The page you're looking for doesn't exist.
      </Typography>
      
      <Button 
        component={Link} 
        to="/"
        variant="contained" 
        color="primary"
        size="large"
        sx={{ 
          borderRadius: 'var(--radius-full)',
          px: 4,
          py: 1.5,
          fontWeight: 600,
          transition: 'all var(--transition-fast)',
          opacity: 0,
          animation: 'fadeIn var(--transition-normal) forwards, slideUp var(--transition-normal) forwards',
          animationDelay: '0.6s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 'var(--shadow-lg)'
          }
        }}
      >
        Go Home
      </Button>
    </Box>
  )
}

export default NotFound