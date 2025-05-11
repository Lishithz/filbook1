import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Paper } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import {
  Home as HomeIcon,
  Person as PersonIcon,
  Message as MessageIcon,
  Notifications as NotificationsIcon,
  Group as GroupIcon,
  Bookmark as BookmarkIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
} from '@mui/icons-material'
import { useAuth } from '../../context/AuthContext'

const Sidebar = () => {
  const location = useLocation()
  const { user } = useAuth()
  
  const menuItems = [
    {
      text: 'Home',
      icon: <HomeIcon />,
      path: '/',
    },
    {
      text: 'Profile',
      icon: <PersonIcon />,
      path: `/profile/${user?.id}`,
    },
    {
      text: 'Messages',
      icon: <MessageIcon />,
      path: '/messages',
    },
    {
      text: 'Notifications',
      icon: <NotificationsIcon />,
      path: '/notifications',
    },
    {
      text: 'Friend Requests',
      icon: <GroupIcon />,
      path: '/friend-requests',
    },
    {
      text: 'Saved Posts',
      icon: <BookmarkIcon />,
      path: '/saved',
    },
  ]
  
  const secondaryItems = [
    {
      text: 'Settings',
      icon: <SettingsIcon />,
      path: '/settings',
    },
    {
      text: 'Help & Support',
      icon: <HelpIcon />,
      path: '/help',
    },
  ]
  
  return (
    <Box
      component="nav"
      sx={{
        width: { md: 240 },
        flexShrink: 0,
        display: { xs: 'none', md: 'block' },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          height: '100vh',
          position: 'fixed',
          width: 240,
          borderRight: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper',
          pt: 8, // Space for navbar
          overflow: 'auto',
        }}
      >
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                sx={{
                  borderRadius: '0 50px 50px 0',
                  mx: 1,
                  '&.Mui-selected': {
                    bgcolor: 'primary.light',
                    color: 'white',
                    '&:hover': {
                      bgcolor: 'primary.main',
                    },
                    '& .MuiListItemIcon-root': {
                      color: 'white',
                    },
                  },
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                  transition: 'all 0.2s',
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        
        <Divider sx={{ my: 2 }} />
        
        <List>
          {secondaryItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                sx={{
                  borderRadius: '0 50px 50px 0',
                  mx: 1,
                  '&.Mui-selected': {
                    bgcolor: 'primary.light',
                    color: 'white',
                    '&:hover': {
                      bgcolor: 'primary.main',
                    },
                    '& .MuiListItemIcon-root': {
                      color: 'white',
                    },
                  },
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                  transition: 'all 0.2s',
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  )
}

export default Sidebar