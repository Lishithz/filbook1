import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Box, useMediaQuery, useTheme as useMuiTheme, Snackbar, Alert } from '@mui/material'
import Navbar from '../components/navigation/Navbar'
import Sidebar from '../components/navigation/Sidebar'
import MobileNav from '../components/navigation/MobileNav'
import { useAuth } from '../context/AuthContext'

const MainLayout = () => {
  const location = useLocation()
  const muiTheme = useMuiTheme()
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'))
  const [notification, setNotification] = useState(null)
  const { user } = useAuth()
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])
  
  // Handle notifications (example)
  useEffect(() => {
    if (user) {
      // This would be replaced with real-time notifications
      const timer = setTimeout(() => {
        setNotification({
          severity: 'info',
          message: 'Welcome to FilBook! Your feed is ready.'
        })
      }, 2000)
      
      return () => clearTimeout(timer)
    }
  }, [user])
  
  const handleCloseNotification = () => {
    setNotification(null)
  }
  
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Desktop sidebar */}
      {!isMobile && (
        <Sidebar />
      )}
      
      {/* Main content area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          bgcolor: 'background.default',
          color: 'text.primary',
          transition: 'all 0.3s ease'
        }}
      >
        <Navbar />
        
        <Box
          sx={{
            flexGrow: 1,
            p: { xs: 1, sm: 2, md: 3 },
            mt: '64px', // Navbar height
            mb: isMobile ? '56px' : 0, // Mobile navigation height
          }}
        >
          <Outlet />
        </Box>
        
        {/* Mobile navigation */}
        {isMobile && (
          <MobileNav />
        )}
        
        {/* Notification system */}
        <Snackbar
          open={!!notification}
          autoHideDuration={6000}
          onClose={handleCloseNotification}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          {notification && (
            <Alert 
              onClose={handleCloseNotification} 
              severity={notification.severity} 
              sx={{ width: '100%' }}
            >
              {notification.message}
            </Alert>
          )}
        </Snackbar>
      </Box>
    </Box>
  )
}

export default MainLayout