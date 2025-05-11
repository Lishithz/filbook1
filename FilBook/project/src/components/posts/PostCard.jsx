import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Typography, Box, Collapse, TextField, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import { 
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteOutlinedIcon,
  ChatBubbleOutline as CommentIcon,
  Share as ShareIcon,
  MoreVert as MoreVertIcon,
  Send as SendIcon
} from '@mui/icons-material'
import { formatDistanceToNow } from 'date-fns'
import { MAX_COMMENT_LENGTH, ERROR_MESSAGES } from '../../config/constants'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props
  return <div {...other} />
})(({ theme, expand }) => ({
  display: 'flex',
  padding: '8px 0',
  alignItems: 'center',
  cursor: 'pointer',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shorter,
  }),
}))

const PostCard = ({ post, onLikeToggle }) => {
  const [expanded, setExpanded] = useState(false)
  const [comment, setComment] = useState('')
  const [commentError, setCommentError] = useState('')
  const [comments, setComments] = useState([
    {
      id: 1,
      user: {
        id: 105,
        name: 'David Kim',
        profilePicture: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      content: 'This is really interesting! Thanks for sharing.',
      createdAt: '2023-06-15T09:30:00Z',
    },
    {
      id: 2,
      user: {
        id: 106,
        name: 'Emily Johnson',
        profilePicture: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      content: 'I agree with your perspective. Have you considered looking into related topics?',
      createdAt: '2023-06-15T12:15:00Z',
    },
  ])
  
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }
  
  const handleLikeClick = () => {
    onLikeToggle(post.id)
  }
  
  const handleCommentChange = (e) => {
    const value = e.target.value
    setComment(value)
    
    if (value.length > MAX_COMMENT_LENGTH) {
      setCommentError(ERROR_MESSAGES.COMMENT_TOO_LONG)
    } else {
      setCommentError('')
    }
  }
  
  const handleSubmitComment = () => {
    if (!comment.trim() || commentError) return
    
    const newComment = {
      id: Date.now(),
      user: {
        id: 104, // Current user ID (would come from auth context)
        name: 'Current User', // Current user name
        profilePicture: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      content: comment,
      createdAt: new Date().toISOString(),
    }
    
    setComments(prev => [newComment, ...prev])
    setComment('')
  }
  
  return (
    <Card 
      sx={{ 
        mb: 3, 
        borderRadius: 'var(--radius-md)',
        transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)',
        '&:hover': {
          boxShadow: 'var(--shadow-md)'
        }
      }}
    >
      <CardHeader
        avatar={
          <Avatar 
            component={Link}
            to={`/profile/${post.user.id}`}
            src={post.user.profilePicture} 
            alt={post.user.name}
            sx={{ 
              width: 40, 
              height: 40,
              transition: 'transform var(--transition-fast)',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
          />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Typography 
            component={Link}
            to={`/profile/${post.user.id}`}
            sx={{ 
              fontWeight: 600, 
              color: 'text.primary',
              textDecoration: 'none',
              '&:hover': {
                color: 'primary.main'
              }
            }}
          >
            {post.user.name}
          </Typography>
        }
        subheader={formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
      />
      
      <CardContent sx={{ py: 1 }}>
        <Typography variant="body1" color="text.primary">
          {post.content}
        </Typography>
      </CardContent>
      
      {post.image && (
        <CardMedia
          component="img"
          image={post.image}
          alt="Post image"
          sx={{ 
            maxHeight: 400,
            objectFit: 'cover',
            transition: 'all var(--transition-fast)',
            '&:hover': {
              filter: 'brightness(1.05)'
            }
          }}
        />
      )}
      
      <CardActions disableSpacing>
        <IconButton 
          aria-label="like post" 
          onClick={handleLikeClick}
          sx={{
            color: post.liked ? 'error.main' : 'action.active',
            transition: 'transform var(--transition-fast)',
            '&:active': {
              transform: 'scale(0.9)'
            }
          }}
        >
          {post.liked ? (
            <FavoriteIcon sx={{ color: 'error.main' }} />
          ) : (
            <FavoriteOutlinedIcon />
          )}
        </IconButton>
        <Typography variant="body2" color="text.secondary">
          {post.likes}
        </Typography>
        
        <IconButton 
          aria-label="comment" 
          onClick={handleExpandClick}
          sx={{ ml: 2 }}
        >
          <CommentIcon />
        </IconButton>
        <Typography variant="body2" color="text.secondary">
          {post.comments}
        </Typography>
        
        <IconButton aria-label="share" sx={{ ml: 2 }}>
          <ShareIcon />
        </IconButton>
      </CardActions>
      
      <ExpandMore
        expand={expanded}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show comments"
      >
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            ml: 2,
            cursor: 'pointer',
            '&:hover': {
              color: 'primary.main'
            }
          }}
        >
          {expanded ? 'Hide comments' : 'View all comments'}
        </Typography>
      </ExpandMore>
      
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ display: 'flex', mb: 3 }}>
            <Avatar 
              src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Your avatar"
              sx={{ width: 36, height: 36, mr: 1 }}
            />
            <Box sx={{ flexGrow: 1 }}>
              <TextField
                fullWidth
                placeholder="Write a comment..."
                variant="outlined"
                size="small"
                value={comment}
                onChange={handleCommentChange}
                error={!!commentError}
                helperText={commentError}
                InputProps={{
                  endAdornment: (
                    <IconButton 
                      onClick={handleSubmitComment}
                      disabled={!comment.trim() || !!commentError}
                      color="primary"
                      edge="end"
                    >
                      <SendIcon />
                    </IconButton>
                  ),
                  sx: {
                    borderRadius: 'var(--radius-full)',
                  }
                }}
              />
            </Box>
          </Box>
          
          {comments.map(comment => (
            <Box key={comment.id} sx={{ display: 'flex', mb: 2 }}>
              <Avatar 
                component={Link}
                to={`/profile/${comment.user.id}`}
                src={comment.user.profilePicture} 
                alt={comment.user.name}
                sx={{ width: 32, height: 32, mr: 1.5 }}
              />
              <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ bgcolor: 'action.hover', borderRadius: 'var(--radius-md)', p: 1.5 }}>
                  <Typography 
                    component={Link}
                    to={`/profile/${comment.user.id}`}
                    variant="body2" 
                    sx={{ 
                      fontWeight: 600,
                      color: 'text.primary',
                      textDecoration: 'none',
                      '&:hover': {
                        color: 'primary.main'
                      }
                    }}
                  >
                    {comment.user.name}
                  </Typography>
                  <Typography variant="body2">{comment.content}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5, ml: 1 }}>
                  <Typography 
                    variant="caption" 
                    color="text.secondary"
                    sx={{ mr: 2 }}
                  >
                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      cursor: 'pointer',
                      fontWeight: 500,
                      '&:hover': {
                        color: 'primary.main'
                      }
                    }}
                  >
                    Like
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      ml: 2, 
                      cursor: 'pointer',
                      fontWeight: 500,
                      '&:hover': {
                        color: 'primary.main'
                      }
                    }}
                  >
                    Reply
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default PostCard