import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Box, Typography, Paper, List, ListItem, ListItemAvatar, ListItemText, Avatar, Divider, IconButton, CircularProgress, Badge } from '@mui/material'
import { formatDistanceToNow } from 'date-fns'
import { 
  FavoriteBorder as LikeIcon, 
  Comment as CommentIcon,
  PersonAdd as FriendRequestIcon,
  MoreVert as MoreIcon,
  Delete as DeleteIcon,
  CheckCircle as MarkReadIcon
} from '@mui/icons-material'

const Notifications = () => {
  const [loading, setLoading] = useState(true)
  const [notifications, setNotifications] = useState([])
  
  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true)
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Sample notifications data (would come from API)
        const notificationsData = [
          {
            id: 1,
            type: 'like',
            user: {
              id: 201,
              name: 'Jessica Williams',
              profilePicture: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            },
            post: {
              id: 101,
              preview: 'Just finished implementing a new feature at work...'
            },
            timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
            read: false
          },
          {
            id: 2,
            type: 'comment',
            user: {
              id: 202,
              name: 'Robert Chen',
              profilePicture: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            },
            post: {
              id: 102,
              preview: 'Weekend hike with friends. Nature is the best therapy!'
            },
            comment: 'Looks amazing! Where is this place?',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
            read: false
          },
          {
            id: 3,
            type: 'friend_request',
            user: {
              id: 203,
              name: 'Sophia Martinez',
              profilePicture: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            },
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), // 6 hours ago
            read: true
          },
          {
            id: 4,
            type: 'like',
            user: {
              id: 204,
              name: 'Michael Johnson',
              profilePicture: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            },
            post: {
              id: 102,
              preview: 'Weekend hike with friends. Nature is the best therapy!'
            },
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
            read: true
          }
        ]
        
        setNotifications(notificationsData)
      } catch (err) {
        console.error('Failed to fetch notifications:', err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchNotifications()
  }, [])
  
  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    )
  }
  
  // Delete notification
  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }
  
  // Get notification icon based on type
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'like':
        return <LikeIcon sx={{ color: 'error.main' }} />
      case 'comment':
        return <CommentIcon sx={{ color: 'info.main' }} />
      case 'friend_request':
        return <FriendRequestIcon sx={{ color: 'primary.main' }} />
      default:
        return null
    }
  }
  
  // Get notification text based on type
  const getNotificationText = (notification) => {
    switch (notification.type) {
      case 'like':
        return (
          <>
            <Typography 
              component="span" 
              variant="body1" 
              sx={{ fontWeight: !notification.read ? 600 : 400 }}
            >
              {notification.user.name}
            </Typography>
            {' liked your post: '}
            <Typography 
              component="span" 
              variant="body2" 
              sx={{ 
                color: 'text.secondary',
                fontStyle: 'italic'
              }}
            >
              {notification.post.preview}
            </Typography>
          </>
        )
      case 'comment':
        return (
          <>
            <Typography 
              component="span" 
              variant="body1" 
              sx={{ fontWeight: !notification.read ? 600 : 400 }}
            >
              {notification.user.name}
            </Typography>
            {' commented on your post: '}
            <Typography 
              component="span" 
              variant="body2" 
              sx={{ 
                color: 'text.secondary',
                fontStyle: 'italic'
              }}
            >
              {notification.comment}
            </Typography>
          </>
        )
      case 'friend_request':
        return (
          <>
            <Typography 
              component="span" 
              variant="body1" 
              sx={{ fontWeight: !notification.read ? 600 : 400 }}
            >
              {notification.user.name}
            </Typography>
            {' sent you a friend request.'}
          </>
        )
      default:
        return null
    }
  }
  
  // Render loading state
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', pt: 8 }}>
        <CircularProgress />
      </Box>
    )
  }
  
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Notifications
      </Typography>
      
      <Paper
        sx={{
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          animation: 'fadeIn var(--transition-normal)'
        }}
      >
        <List sx={{ p: 0 }}>
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <Box key={notification.id}>
                <ListItem
                  sx={{
                    py: 2,
                    bgcolor: notification.read ? 'transparent' : 'action.hover',
                    transition: 'background-color var(--transition-fast)'
                  }}
                  secondaryAction={
                    <Box>
                      {!notification.read && (
                        <IconButton 
                          edge="end" 
                          aria-label="mark as read"
                          onClick={() => markAsRead(notification.id)}
                          sx={{ mr: 1 }}
                        >
                          <MarkReadIcon />
                        </IconButton>
                      )}
                      <IconButton 
                        edge="end" 
                        aria-label="delete notification"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  }
                >
                  <ListItemAvatar>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      badgeContent={
                        <Avatar 
                          sx={{ 
                            width: 20, 
                            height: 20,
                            bgcolor: 'background.paper'
                          }}
                        >
                          {getNotificationIcon(notification.type)}
                        </Avatar>
                      }
                    >
                      <Avatar 
                        component={Link}
                        to={`/profile/${notification.user.id}`}
                        src={notification.user.profilePicture} 
                        alt={notification.user.name}
                        sx={{ 
                          width: 50, 
                          height: 50,
                          transition: 'transform var(--transition-fast)',
                          '&:hover': {
                            transform: 'scale(1.05)'
                          }
                        }}
                      />
                    </Badge>
                  </ListItemAvatar>
                  
                  <ListItemText
                    primary={getNotificationText(notification)}
                    secondary={formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                    sx={{ 
                      '& .MuiListItemText-primary': {
                        mb: 0.5
                      }
                    }}
                  />
                </ListItem>
                
                {index < notifications.length - 1 && <Divider />}
              </Box>
            ))
          ) : (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary">
                No notifications
              </Typography>
              <Typography variant="body2" color="text.secondary">
                When you get notifications, they will appear here.
              </Typography>
            </Box>
          )}
        </List>
      </Paper>
    </Box>
  )
}

export default Notifications