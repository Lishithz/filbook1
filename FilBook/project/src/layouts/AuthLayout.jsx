import { Outlet } from 'react-router-dom'
import { Box, Paper, Container, Typography } from '@mui/material'
import { useTheme } from '../context/ThemeContext'
import ThemeToggle from '../components/common/ThemeToggle'

const AuthLayout = () => {
  const { darkMode } = useTheme()
  
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: darkMode ? 'var(--neutral-900)' : 'var(--neutral-200)',
        transition: 'background-color var(--transition-normal)'
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ position: 'absolute', top: 20, right: 20 }}>
          <ThemeToggle />
        </Box>
        
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-lg)',
            opacity: 0,
            animation: 'fadeIn var(--transition-normal) forwards',
            animationDelay: '0.2s',
            maxWidth: '450px',
            margin: '0 auto'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 4
            }}
          >
            <Typography
              component="h1"
              variant="h4"
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                mb: 1
              }}
            >
              FilBook
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                textAlign: 'center'
              }}
            >
              Connect with friends and the world around you.
            </Typography>
          </Box>
          
          <Outlet />
        </Paper>
      </Container>
    </Box>
  )
}

export default AuthLayout