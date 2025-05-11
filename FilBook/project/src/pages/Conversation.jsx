import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Box, Typography, Paper, AppBar, Toolbar, IconButton, Avatar, TextField, Button, Divider, CircularProgress, Badge } from '@mui/material'
import { ArrowBack, Send as SendIcon, AttachFile, EmojiEmotions, Image, FiberManualRecord as OnlineIcon } from '@mui/icons-material'
import { formatDistanceToNow } from 'date-fns'

const Conversation = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [conversation, setConversation] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef(null)
  
  // Load conversation data
  useEffect(() => {
    const fetchConversation = async () => {
      try {
        setLoading(true)
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Sample data (would come from API)
        const conversationData = {
          id: parseInt(id),
          user: {
            id: parseInt(id) + 200, // Just to generate different IDs
            name: 'Jessica Williams',
            profilePicture: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            online: true,
            lastActive: new Date().toISOString()
          }
        }
        
        const messagesData = [
          {
            id: 1,
            sender: conversationData.user.id,
            content: 'Hey there! How are you doing today?',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
            read: true
          },
          {
            id: 2,
            sender: 'current-user', // Current user
            content: 'Hi Jessica! I\'m doing great, thanks for asking. How about you?',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 + 1000 * 60 * 5).toISOString(), // 1 day ago + 5 minutes
            read: true
          },
          {
            id: 3,
            sender: conversationData.user.id,
            content: 'I\'m good too! Just working on some new designs for the project.',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
            read: true
          },
          {
            id: 4,
            sender: conversationData.user.id,
            content: 'By the way, are we still meeting tomorrow for coffee?',
            timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
            read: false
          }
        ]
        
        setConversation(conversationData)
        setMessages(messagesData)
      } catch (err) {
        console.error('Failed to fetch conversation:', err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchConversation()
  }, [id])
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])
  
  // Handle message input
  const handleMessageChange = (e) => {
    setNewMessage(e.target.value)
  }
  
  // Handle message submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!newMessage.trim()) return
    
    try {
      setSending(true)
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const newMsg = {
        id: Date.now(),
        sender: 'current-user',
        content: newMessage,
        timestamp: new Date().toISOString(),
        read: false
      }
      
      setMessages(prev => [...prev, newMsg])
      setNewMessage('')
    } catch (err) {
      console.error('Failed to send message:', err)
    } finally {
      setSending(false)
    }
  }
  
  // Render loading state
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress />
      </Box>
    )
  }
  
  return (
    <Box sx={{ height: 'calc(100vh - 130px)', display: 'flex', flexDirection: 'column' }}>
      {/* Conversation header */}
      <AppBar 
        position="static" 
        color="inherit" 
        elevation={0}
        sx={{ 
          borderBottom: 1, 
          borderColor: 'divider',
          borderTopLeftRadius: 'var(--radius-md)',
          borderTopRightRadius: 'var(--radius-md)',
        }}
      >
        <Toolbar>
          <IconButton 
            edge="start" 
            component={Link} 
            to="/messages"
            aria-label="back"
            sx={{ mr: 1 }}
          >
            <ArrowBack />
          </IconButton>
          
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              conversation.user.online && (
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
              src={conversation.user.profilePicture} 
              alt={conversation.user.name}
              sx={{ 
                width: 40, 
                height: 40,
                mr: 1.5
              }}
            />
          </Badge>
          
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {conversation.user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {conversation.user.online 
                ? 'Online' 
                : `Last active ${formatDistanceToNow(new Date(conversation.user.lastActive), { addSuffix: true })}`
              }
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      
      {/* Messages */}
      <Paper 
        sx={{ 
          flexGrow: 1, 
          overflow: 'auto', 
          p: 2,
          bgcolor: 'background.default'
        }}
      >
        {messages.map((message, index) => {
          const isUser = message.sender === 'current-user'
          const showDate = index === 0 || new Date(message.timestamp).getDate() !== new Date(messages[index - 1].timestamp).getDate()
          
          return (
            <Box key={message.id}>
              {showDate && (
                <Box sx={{ textAlign: 'center', my: 2 }}>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      bgcolor: 'action.hover', 
                      px: 2, 
                      py: 0.5, 
                      borderRadius: 'var(--radius-full)' 
                    }}
                  >
                    {new Date(message.timestamp).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                  </Typography>
                </Box>
              )}
              
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: isUser ? 'flex-end' : 'flex-start',
                  mb: 1.5
                }}
              >
                {!isUser && (
                  <Avatar 
                    src={conversation.user.profilePicture} 
                    alt={conversation.user.name}
                    sx={{ 
                      width: 32, 
                      height: 32,
                      mr: 1,
                      mt: 1
                    }}
                  />
                )}
                
                <Box
                  sx={{
                    maxWidth: '75%'
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: isUser ? 'primary.main' : 'action.hover',
                      color: isUser ? 'white' : 'text.primary',
                      p: 1.5,
                      borderRadius: isUser 
                        ? 'var(--radius-md) var(--radius-md) 0 var(--radius-md)' 
                        : 'var(--radius-md) var(--radius-md) var(--radius-md) 0',
                      boxShadow: 'var(--shadow-sm)',
                      animation: 'fadeIn var(--transition-fast)'
                    }}
                  >
                    <Typography variant="body1">{message.content}</Typography>
                  </Box>
                  
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: isUser ? 'flex-end' : 'flex-start',
                      mt: 0.5
                    }}
                  >
                    <Typography 
                      variant="caption" 
                      color="text.secondary"
                      sx={{ mr: 0.5 }}
                    >
                      {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
                    </Typography>
                    
                    {isUser && (
                      <Typography 
                        variant="caption" 
                        color={message.read ? 'primary.main' : 'text.secondary'}
                      >
                        {message.read ? 'Read' : 'Sent'}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          )
        })}
        <div ref={messagesEndRef} />
      </Paper>
      
      {/* Message input */}
      <Paper 
        component="form" 
        onSubmit={handleSubmit}
        sx={{ 
          p: 2, 
          borderTop: 1, 
          borderColor: 'divider',
          borderBottomLeftRadius: 'var(--radius-md)',
          borderBottomRightRadius: 'var(--radius-md)',
          display: 'flex', 
          alignItems: 'center'
        }}
      >
        <IconButton color="primary">
          <AttachFile />
        </IconButton>
        <IconButton color="primary">
          <Image />
        </IconButton>
        <IconButton color="primary">
          <EmojiEmotions />
        </IconButton>
        
        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
        
        <TextField
          fullWidth
          placeholder="Type a message..."
          variant="outlined"
          size="small"
          value={newMessage}
          onChange={handleMessageChange}
          disabled={sending}
          autoComplete="off"
          InputProps={{
            sx: {
              borderRadius: 'var(--radius-full)'
            }
          }}
          sx={{ mx: 1 }}
        />
        
        <Button
          type="submit"
          variant="contained"
          color="primary"
          endIcon={<SendIcon />}
          disabled={!newMessage.trim() || sending}
          sx={{
            borderRadius: 'var(--radius-full)',
            px: 2,
            height: 40,
            transition: 'all var(--transition-fast)',
            '&:hover:not(:disabled)': {
              transform: 'translateY(-2px)',
              boxShadow: 'var(--shadow-sm)'
            }
          }}
        >
          Send
        </Button>
      </Paper>
    </Box>
  )
}

export default Conversation