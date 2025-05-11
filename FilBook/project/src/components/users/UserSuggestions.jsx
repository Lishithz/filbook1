import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Paper, Typography, List, ListItem, ListItemAvatar, ListItemText, Avatar, Button, Box, Skeleton } from '@mui/material'

const UserSuggestions = () => {
  const [loading, setLoading] = useState(false)
  
  // Sample suggestions data
  const suggestions = [
    {
      id: 201,
      name: 'Jessica Williams',
      profilePicture: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      mutualFriends: 5
    },
    {
      id: 202,
      name: 'Robert Chen',
      profilePicture: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      mutualFriends: 3
    },
    {
      id: 203,
      name: 'Sophia Martinez',
      profilePicture: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      mutualFriends: 8
    }
  ]
  
  const [friendRequests, setFriendRequests] = useState({})
  
  const handleConnect = (userId) => {
    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setFriendRequests(prev => ({
        ...prev,
        [userId]: true
      }))
      setLoading(false)
    }, 500)
  }
  
  return (
    <Paper
      sx={{
        p: 2,
        mb: 3,
        borderRadius: 'var(--radius-md)',
        animation: 'fadeIn var(--transition-normal)'
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        People You May Know
      </Typography>
      
      <List sx={{ p: 0 }}>
        {suggestions.map(user => (
          <ListItem 
            key={user.id}
            alignItems="center"
            disablePadding
            sx={{ 
              mb: 2,
              '&:last-child': {
                mb: 0
              }
            }}
          >
            <ListItemAvatar>
              <Avatar 
                component={Link}
                to={`/profile/${user.id}`}
                src={user.profilePicture} 
                alt={user.name}
                sx={{ 
                  width: 50, 
                  height: 50,
                  transition: 'transform var(--transition-fast)',
                  '&:hover': {
                    transform: 'scale(1.05)'
                  }
                }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography 
                  component={Link}
                  to={`/profile/${user.id}`}
                  variant="body1" 
                  sx={{ 
                    fontWeight: 600,
                    textDecoration: 'none',
                    color: 'text.primary',
                    '&:hover': {
                      color: 'primary.main'
                    }
                  }}
                >
                  {user.name}
                </Typography>
              }
              secondary={`${user.mutualFriends} mutual friends`}
              sx={{ ml: 1 }}
            />
            
            <Box sx={{ ml: 'auto' }}>
              {friendRequests[user.id] ? (
                <Button
                  variant="outlined"
                  size="small"
                  disabled
                  sx={{ 
                    borderRadius: 'var(--radius-full)',
                    minWidth: 100,
                    fontSize: '0.75rem'
                  }}
                >
                  Requested
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => handleConnect(user.id)}
                  disabled={loading}
                  sx={{ 
                    borderRadius: 'var(--radius-full)',
                    minWidth: 100,
                    fontSize: '0.75rem',
                    transition: 'all var(--transition-fast)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 'var(--shadow-sm)'
                    }
                  }}
                >
                  {loading ? <Skeleton width={60} /> : 'Connect'}
                </Button>
              )}
            </Box>
          </ListItem>
        ))}
      </List>
      
      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Button 
          component={Link}
          to="/friend-suggestions"
          variant="text" 
          color="primary"
          size="small"
          sx={{
            borderRadius: 'var(--radius-full)',
            transition: 'all var(--transition-fast)',
            '&:hover': {
              backgroundColor: 'action.hover',
              transform: 'translateY(-2px)'
            }
          }}
        >
          View More
        </Button>
      </Box>
    </Paper>
  )
}

export default UserSuggestions