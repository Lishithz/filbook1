import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Box, Typography, Paper, List, ListItem, ListItemAvatar, ListItemText, Avatar, Divider, TextField, InputAdornment, IconButton, Badge, CircularProgress } from '@mui/material'
import { Search as SearchIcon, FiberManualRecord as OnlineIcon } from '@mui/icons-material'
import { formatDistanceToNow } from 'date-fns'

const Messages = () => {
  const [conversations, setConversations] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  
  // Sample conversation data
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setLoading(true)
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Sample data (would come from API)
        const conversationsData = [
          {
            id: 1,
            user: {
              id: 201,
              name: 'Jessica Williams',
              profilePicture: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
              online: true
            },
            lastMessage: {
              content: 'Are we still meeting tomorrow for coffee?',
              timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
              unread: true
            }
          },
          {
            id: 2,
            user: {
              id: 202,
              name: 'Robert Chen',
              profilePicture: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
              online: false
            },
            lastMessage: {
              content: 'I sent you that document we discussed.',
              timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
              unread: false
            }
          },
          {
            id: 3,
            user: {
              id: 203,
              name: 'Sophia Martinez',
              profilePicture: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
              online: true
            },
            lastMessage: {
              content: 'Thanks for your help with the project!',
              timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
              unread: false
            }
          },
          {
            id: 4,
            user: {
              id: 204,
              name: 'Michael Johnson',
              profilePicture: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
              online: false
            },
            lastMessage: {
              content: 'Looking forward to seeing you at the conference next week.',
              timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
              unread: false
            }
          }
        ]
        
        setConversations(conversationsData)
      } catch (err) {
        console.error('Failed to fetch conversations:', err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchConversations()
  }, [])
  
  // Filter conversations based on search query
  const filteredConversations = searchQuery.trim() === ''
    ? conversations
    : conversations.filter(convo => 
        convo.user.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
  
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Messages
      </Typography>
      
      <Paper
        sx={{
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          animation: 'fadeIn var(--transition-normal)'
        }}
      >
        {/* Search bar */}
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <TextField
            fullWidth
            placeholder="Search messages..."
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              sx: {
                borderRadius: 'var(--radius-full)'
              }
            }}
          />
        </Box>
        
        {/* Conversations list */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {filteredConversations.length > 0 ? (
              <List sx={{ p: 0 }}>
                {filteredConversations.map((convo, index) => (
                  <Box key={convo.id}>
                    <ListItem 
                      component={Link}
                      to={`/messages/${convo.id}`}
                      sx={{ 
                        textDecoration: 'none',
                        color: 'inherit',
                        bgcolor: convo.lastMessage.unread ? 'action.hover' : 'transparent',
                        transition: 'all var(--transition-fast)',
                        '&:hover': {
                          bgcolor: 'action.hover'
                        },
                        py: 1.5
                      }}
                    >
                      <ListItemAvatar>
                        <Badge
                          overlap="circular"
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                          badgeContent={
                            convo.user.online && (
                              <OnlineIcon 
                                sx={{ 
                                  color: 'success.main',
                                  fontSize: 12,
                                  bgcolor: 'background.paper',
                                  borderRadius: '50%'
                                }} 
                              />
                            )
                          }
                        >
                          <Avatar 
                            src={convo.user.profilePicture} 
                            alt={convo.user.name}
                            sx={{ 
                              width: 48, 
                              height: 48,
                              transition: 'transform var(--transition-fast)',
                              '&:hover': {
                                transform: 'scale(1.05)'
                              }
                            }}
                          />
                        </Badge>
                      </ListItemAvatar>
                      
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography 
                              variant="body1" 
                              sx={{ 
                                fontWeight: convo.lastMessage.unread ? 600 : 400,
                                color: 'text.primary'
                              }}
                            >
                              {convo.user.name}
                            </Typography>
                            <Typography 
                              variant="caption" 
                              sx={{ 
                                color: convo.lastMessage.unread ? 'primary.main' : 'text.secondary',
                                fontWeight: convo.lastMessage.unread ? 600 : 400
                              }}
                            >
                              {formatDistanceToNow(new Date(convo.lastMessage.timestamp), { addSuffix: true })}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: convo.lastMessage.unread ? 'text.primary' : 'text.secondary',
                              fontWeight: convo.lastMessage.unread ? 600 : 400,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            {convo.lastMessage.content}
                          </Typography>
                        }
                      />
                      
                      {convo.lastMessage.unread && (
                        <Box 
                          sx={{
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            bgcolor: 'primary.main',
                            ml: 1
                          }}
                        />
                      )}
                    </ListItem>
                    
                    {index < filteredConversations.length - 1 && (
                      <Divider />
                    )}
                  </Box>
                ))}
              </List>
            ) : (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h6" color="text.secondary">
                  No conversations found
                </Typography>
                {searchQuery.trim() !== '' ? (
                  <Typography variant="body2" color="text.secondary">
                    Try searching with a different name
                  </Typography>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Start a conversation with a friend!
                  </Typography>
                )}
              </Box>
            )}
          </>
        )}
      </Paper>
    </Box>
  )
}

export default Messages