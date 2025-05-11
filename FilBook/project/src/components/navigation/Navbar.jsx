import { useState } from 'react'
import { AppBar, Toolbar, IconButton, InputBase, Badge, Menu, MenuItem, Box, Avatar, Typography } from '@mui/material'
import { styled, alpha } from '@mui/material/styles'
import { Link, useNavigate } from 'react-router-dom'
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Mail as MailIcon,
  AccountCircle,
  PersonAdd,
  Settings,
  Logout,
} from '@mui/icons-material'
import ThemeToggle from '../common/ThemeToggle'
import { useAuth } from '../../context/AuthContext'

// Styled components
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null)
  const [messagesAnchorEl, setMessagesAnchorEl] = useState(null)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  
  const isMenuOpen = Boolean(anchorEl)
  const isNotificationsMenuOpen = Boolean(notificationsAnchorEl)
  const isMessagesMenuOpen = Boolean(messagesAnchorEl)
  
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }
  
  const handleNotificationsMenuOpen = (event) => {
    setNotificationsAnchorEl(event.currentTarget)
  }
  
  const handleMessagesMenuOpen = (event) => {
    setMessagesAnchorEl(event.currentTarget)
  }
  
  const handleMenuClose = () => {
    setAnchorEl(null)
    setNotificationsAnchorEl(null)
    setMessagesAnchorEl(null)
  }
  
  const handleProfileClick = () => {
    handleMenuClose()
    navigate(`/profile/${user.id}`)
  }
  
  const handleSettingsClick = () => {
    handleMenuClose()
    // Navigate to settings page (to be implemented)
  }
  
  const handleLogout = () => {
    handleMenuClose()
    logout()
    navigate('/login')
  }
  
  const handleFriendRequestsClick = () => {
    handleMenuClose()
    navigate('/friend-requests')
  }
  
  const handleNotificationsClick = () => {
    handleMenuClose()
    navigate('/notifications')
  }
  
  const handleMessagesClick = () => {
    handleMenuClose()
    navigate('/messages')
  }
  
  // Menu IDs
  const menuId = 'primary-search-account-menu'
  const notificationsMenuId = 'primary-notifications-menu'
  const messagesMenuId = 'primary-messages-menu'
  
  // Render menus
  const renderProfileMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfileClick}>
        <AccountCircle sx={{ mr: 1.5 }} fontSize="small" />
        Profile
      </MenuItem>
      <MenuItem onClick={handleFriendRequestsClick}>
        <PersonAdd sx={{ mr: 1.5 }} fontSize="small" />
        Friend Requests
      </MenuItem>
      <MenuItem onClick={handleSettingsClick}>
        <Settings sx={{ mr: 1.5 }} fontSize="small" />
        Settings
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <Logout sx={{ mr: 1.5 }} fontSize="small" />
        Logout
      </MenuItem>
    </Menu>
  )
  
  const renderNotificationsMenu = (
    <Menu
      anchorEl={notificationsAnchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={notificationsMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isNotificationsMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem sx={{ display: 'block', minWidth: 250 }}>
        <Typography variant="body2" sx={{ fontWeight: 500 }}>Alex liked your post</Typography>
        <Typography variant="caption" color="text.secondary">2 hours ago</Typography>
      </MenuItem>
      <MenuItem sx={{ display: 'block', minWidth: 250 }}>
        <Typography variant="body2" sx={{ fontWeight: 500 }}>Sarah commented on your photo</Typography>
        <Typography variant="caption" color="text.secondary">Yesterday</Typography>
      </MenuItem>
      <MenuItem onClick={handleNotificationsClick} sx={{ justifyContent: 'center', color: 'primary.main' }}>
        <Typography variant="body2">View all notifications</Typography>
      </MenuItem>
    </Menu>
  )
  
  const renderMessagesMenu = (
    <Menu
      anchorEl={messagesAnchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={messagesMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMessagesMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem sx={{ display: 'block', minWidth: 250 }}>
        <Typography variant="body2" sx={{ fontWeight: 500 }}>Michael</Typography>
        <Typography variant="caption" color="text.secondary" noWrap>
          Hey, are we still meeting today?
        </Typography>
      </MenuItem>
      <MenuItem sx={{ display: 'block', minWidth: 250 }}>
        <Typography variant="body2" sx={{ fontWeight: 500 }}>Jessica</Typography>
        <Typography variant="caption" color="text.secondary" noWrap>
          Check out this link I found!
        </Typography>
      </MenuItem>
      <MenuItem onClick={handleMessagesClick} sx={{ justifyContent: 'center', color: 'primary.main' }}>
        <Typography variant="body2">View all messages</Typography>
      </MenuItem>
    </Menu>
  )
  
  return (
    <>
      <AppBar position="fixed" color="primary" elevation={1}>
        <Toolbar>
          {/* Logo/App Name */}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              display: { xs: 'none', sm: 'block' },
              textDecoration: 'none',
              color: 'white',
              fontWeight: 700,
            }}
          >
            FilBook
          </Typography>
          
          {/* Search Bar */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          
          <Box sx={{ flexGrow: 1 }} />
          
          {/* Right side icons */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ThemeToggle sx={{ mr: 1 }} />
            
            <IconButton
              size="large"
              aria-label="show new notifications"
              aria-controls={notificationsMenuId}
              aria-haspopup="true"
              onClick={handleNotificationsMenuOpen}
              color="inherit"
            >
              <Badge badgeContent={2} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            
            <IconButton
              size="large"
              aria-label="show new messages"
              aria-controls={messagesMenuId}
              aria-haspopup="true"
              onClick={handleMessagesMenuOpen}
              color="inherit"
            >
              <Badge badgeContent={2} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {user?.profilePicture ? (
                <Avatar 
                  src={user.profilePicture} 
                  alt={user.name}
                  sx={{ width: 32, height: 32 }}
                />
              ) : (
                <AccountCircle />
              )}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      
      {renderProfileMenu}
      {renderNotificationsMenu}
      {renderMessagesMenu}
    </>
  )
}

export default Navbar