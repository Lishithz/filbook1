import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Box, Typography, Paper, Tabs, Tab, List, ListItem, ListItemAvatar, ListItemText, Avatar, Button, Divider, CircularProgress } from '@mui/material'

const FriendRequests = () => {
  const [tabValue, setTabValue] = useState(0)
  const [loading, setLoading] = useState(true)
  const [requests, setRequests] = useState([])
  const [sent, setSent] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const [actionStates, setActionStates] = useState({})
  
  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }
  
  // Fetch friend requests data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Sample data (would come from API)
        const requestsData = [
          {
            id: 301,
            user: {
              id: 201,
              name: 'Jessica Williams',
              profilePicture: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
              mutualFriends: 5
            },
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() // 2 hours ago
          },
          {
            id: 302,
            user: {
              id: 202,
              name: 'Robert Chen',
              profilePicture: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
              mutualFriends: 3
            },
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() // 1 day ago
          }
        ]
        
        const sentData = [
          {
            id: 303,
            user: {
              id: 203,
              name: 'Sophia Martinez',
              profilePicture: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
              mutualFriends: 8
            },
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString() // 12 hours ago
          }
        ]
        
        const suggestionsData = [
          {
            id: 401,
            user: {
              id: 204,
              name: 'Michael Johnson',
              profilePicture: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
              mutualFriends: 12
            }
          },
          {
            id: 402,
            user: {
              id: 205,
              name: 'Emily Davis',
              profilePicture: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
              mutualFriends: 7
            }
          },
          {
            id: 403,
            user: {
              id: 206,
              name: 'James Wilson',
              profilePicture: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
              mutualFriends: 4
            }
          }
        ]
        
        setRequests(requestsData)
        setSent(sentData)
        setSuggestions(suggestionsData)
      } catch (err) {
        console.error('Failed to fetch friend requests:', err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])
  
  // Handle action button clicks
  const handleAction = (id, action, type) => {
    setActionStates(prev => ({ ...prev, [id]: { loading: true } }))
    
    // Simulate API call
    setTimeout(() => {
      if (type === 'requests') {
        if (action === 'accept') {
          // Accept friend request
          setActionStates(prev => ({ ...prev, [id]: { accepted: true } }))
        } else {
          // Reject friend request
          setRequests(prev => prev.filter(request => request.id !== id))
        }
      } else if (type === 'sent') {
        // Cancel sent request
        setSent(prev => prev.filter(request => request.id !== id))
      } else if (type === 'suggestions') {
        // Send friend request
        setActionStates(prev => ({ ...prev, [id]: { sent: true } }))
      }
    }, 500)
  }
  
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Friend Requests
      </Typography>
      
      <Paper
        sx={{
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          animation: 'fadeIn var(--transition-normal)'
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="friend requests tabs"
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              minWidth: 100
            }
          }}
        >
          <Tab label={`Received (${requests.length})`} />
          <Tab label={`Sent (${sent.length})`} />
          <Tab label="Suggestions" />
        </Tabs>
        
        {/* Loading state */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {/* Received requests tab */}
            {tabValue === 0 && (
              <List sx={{ p: 0 }}>
                {requests.length > 0 ? (
                  requests.map((request, index) => (
                    <Box key={request.id}>
                      <ListItem sx={{ py: 2 }}>
                        <ListItemAvatar>
                          <Avatar 
                            component={Link}
                            to={`/profile/${request.user.id}`}
                            src={request.user.profilePicture} 
                            alt={request.user.name}
                            sx={{ 
                              width: 56, 
                              height: 56,
                              mr: 1,
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
                              to={`/profile/${request.user.id}`}
                              variant="subtitle1" 
                              sx={{ 
                                fontWeight: 600,
                                textDecoration: 'none',
                                color: 'text.primary',
                                '&:hover': {
                                  color: 'primary.main'
                                }
                              }}
                            >
                              {request.user.name}
                            </Typography>
                          }
                          secondary={
                            <Typography variant="body2" color="text.secondary">
                              {request.user.mutualFriends} mutual friends
                            </Typography>
                          }
                        />
                        
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          {actionStates[request.id]?.accepted ? (
                            <Button
                              variant="outlined"
                              disabled
                              sx={{ borderRadius: 'var(--radius-full)' }}
                            >
                              Friend Added
                            </Button>
                          ) : (
                            <>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleAction(request.id, 'accept', 'requests')}
                                disabled={actionStates[request.id]?.loading}
                                sx={{
                                  borderRadius: 'var(--radius-full)',
                                  transition: 'all var(--transition-fast)',
                                  '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: 'var(--shadow-sm)'
                                  }
                                }}
                              >
                                {actionStates[request.id]?.loading ? 'Processing...' : 'Accept'}
                              </Button>
                              <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => handleAction(request.id, 'reject', 'requests')}
                                disabled={actionStates[request.id]?.loading}
                                sx={{
                                  borderRadius: 'var(--radius-full)',
                                  transition: 'all var(--transition-fast)',
                                  '&:hover': {
                                    transform: 'translateY(-2px)'
                                  }
                                }}
                              >
                                Decline
                              </Button>
                            </>
                          )}
                        </Box>
                      </ListItem>
                      
                      {index < requests.length - 1 && <Divider />}
                    </Box>
                  ))
                ) : (
                  <Box sx={{ textAlign: 'center', py: 8 }}>
                    <Typography variant="h6" color="text.secondary">
                      No friend requests
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      When someone sends you a friend request, it will appear here.
                    </Typography>
                  </Box>
                )}
              </List>
            )}
            
            {/* Sent requests tab */}
            {tabValue === 1 && (
              <List sx={{ p: 0 }}>
                {sent.length > 0 ? (
                  sent.map((request, index) => (
                    <Box key={request.id}>
                      <ListItem sx={{ py: 2 }}>
                        <ListItemAvatar>
                          <Avatar 
                            component={Link}
                            to={`/profile/${request.user.id}`}
                            src={request.user.profilePicture} 
                            alt={request.user.name}
                            sx={{ 
                              width: 56, 
                              height: 56,
                              mr: 1,
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
                              to={`/profile/${request.user.id}`}
                              variant="subtitle1" 
                              sx={{ 
                                fontWeight: 600,
                                textDecoration: 'none',
                                color: 'text.primary',
                                '&:hover': {
                                  color: 'primary.main'
                                }
                              }}
                            >
                              {request.user.name}
                            </Typography>
                          }
                          secondary={
                            <Typography variant="body2" color="text.secondary">
                              {request.user.mutualFriends} mutual friends
                            </Typography>
                          }
                        />
                        
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() => handleAction(request.id, 'cancel', 'sent')}
                          disabled={actionStates[request.id]?.loading}
                          sx={{
                            borderRadius: 'var(--radius-full)',
                            transition: 'all var(--transition-fast)',
                            '&:hover': {
                              transform: 'translateY(-2px)'
                            }
                          }}
                        >
                          {actionStates[request.id]?.loading ? 'Processing...' : 'Cancel Request'}
                        </Button>
                      </ListItem>
                      
                      {index < sent.length - 1 && <Divider />}
                    </Box>
                  ))
                ) : (
                  <Box sx={{ textAlign: 'center', py: 8 }}>
                    <Typography variant="h6" color="text.secondary">
                      No sent requests
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      When you send friend requests, they will appear here.
                    </Typography>
                  </Box>
                )}
              </List>
            )}
            
            {/* Suggestions tab */}
            {tabValue === 2 && (
              <List sx={{ p: 0 }}>
                {suggestions.map((suggestion, index) => (
                  <Box key={suggestion.id}>
                    <ListItem sx={{ py: 2 }}>
                      <ListItemAvatar>
                        <Avatar 
                          component={Link}
                          to={`/profile/${suggestion.user.id}`}
                          src={suggestion.user.profilePicture} 
                          alt={suggestion.user.name}
                          sx={{ 
                            width: 56, 
                            height: 56,
                            mr: 1,
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
                            to={`/profile/${suggestion.user.id}`}
                            variant="subtitle1" 
                            sx={{ 
                              fontWeight: 600,
                              textDecoration: 'none',
                              color: 'text.primary',
                              '&:hover': {
                                color: 'primary.main'
                              }
                            }}
                          >
                            {suggestion.user.name}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body2" color="text.secondary">
                            {suggestion.user.mutualFriends} mutual friends
                          </Typography>
                        }
                      />
                      
                      {actionStates[suggestion.id]?.sent ? (
                        <Button
                          variant="outlined"
                          disabled
                          sx={{ borderRadius: 'var(--radius-full)' }}
                        >
                          Request Sent
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleAction(suggestion.id, 'send', 'suggestions')}
                          disabled={actionStates[suggestion.id]?.loading}
                          sx={{
                            borderRadius: 'var(--radius-full)',
                            transition: 'all var(--transition-fast)',
                            '&:hover': {
                              transform: 'translateY(-2px)',
                              boxShadow: 'var(--shadow-sm)'
                            }
                          }}
                        >
                          {actionStates[suggestion.id]?.loading ? 'Processing...' : 'Add Friend'}
                        </Button>
                      )}
                    </ListItem>
                    
                    {index < suggestions.length - 1 && <Divider />}
                  </Box>
                ))}
              </List>
            )}
          </>
        )}
      </Paper>
    </Box>
  )
}

export default FriendRequests