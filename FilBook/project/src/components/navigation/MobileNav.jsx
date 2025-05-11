import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import {
  Home as HomeIcon,
  Person as PersonIcon,
  Message as MessageIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material'
import { useAuth } from '../../context/AuthContext'

const MobileNav = () => {
  const location = useLocation()
  const { user } = useAuth()
  
  // Get current path for selected tab
  const getCurrentTab = () => {
    const path = location.pathname
    if (path === '/') return 0
    if (path.startsWith('/profile')) return 1
    if (path.startsWith('/messages')) return 2
    if (path.startsWith('/notifications')) return 3
    return 0
  }
  
  return (
    <Paper 
      sx={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0,
        borderRadius: 0,
        zIndex: 10
      }} 
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={getCurrentTab()}
        sx={{
          '& .MuiBottomNavigationAction-root': {
            color: 'text.secondary',
            '&.Mui-selected': {
              color: 'primary.main',
            },
          },
        }}
      >
        <BottomNavigationAction 
          label="Home" 
          icon={<HomeIcon />} 
          component={Link} 
          to="/"
          sx={{
            transition: 'transform 0.2s',
            '&:active': {
              transform: 'scale(0.95)',
            },
          }}
        />
        <BottomNavigationAction 
          label="Profile" 
          icon={<PersonIcon />} 
          component={Link} 
          to={`/profile/${user?.id}`}
          sx={{
            transition: 'transform 0.2s',
            '&:active': {
              transform: 'scale(0.95)',
            },
          }}
        />
        <BottomNavigationAction 
          label="Messages" 
          icon={<MessageIcon />} 
          component={Link} 
          to="/messages"
          sx={{
            transition: 'transform 0.2s',
            '&:active': {
              transform: 'scale(0.95)',
            },
          }}
        />
        <BottomNavigationAction 
          label="Notifications" 
          icon={<NotificationsIcon />} 
          component={Link} 
          to="/notifications"
          sx={{
            transition: 'transform 0.2s',
            '&:active': {
              transform: 'scale(0.95)',
            },
          }}
        />
      </BottomNavigation>
    </Paper>
  )
}

export default MobileNav