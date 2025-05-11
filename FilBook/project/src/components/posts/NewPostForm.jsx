import { useState } from 'react'
import { Card, CardContent, TextField, Button, Avatar, Box, IconButton, Divider, CircularProgress } from '@mui/material'
import { 
  Image as ImageIcon,
  VideoLibrary as VideoIcon,
  EmojiEmotions as EmojiIcon,
  Close as CloseIcon
} from '@mui/icons-material'
import { useAuth } from '../../context/AuthContext'
import { MAX_POST_LENGTH, ERROR_MESSAGES, DEFAULT_AVATAR } from '../../config/constants'

const NewPostForm = ({ onPostCreated }) => {
  const [postContent, setPostContent] = useState('')
  const [postImage, setPostImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { user } = useAuth()
  
  const handleContentChange = (e) => {
    const content = e.target.value
    setPostContent(content)
    
    if (content.length > MAX_POST_LENGTH) {
      setError(ERROR_MESSAGES.POST_TOO_LONG)
    } else {
      setError('')
    }
  }
  
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    if (!file.type.match('image.*')) {
      setError('Only image files are allowed')
      return
    }
    
    setPostImage(file)
    
    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result)
    }
    reader.readAsDataURL(file)
    
    setError('')
  }
  
  const clearImage = () => {
    setPostImage(null)
    setImagePreview(null)
  }
  
  const handleSubmit = async () => {
    if (!postContent.trim() && !postImage) return
    if (error) return
    
    try {
      setLoading(true)
      
      // In a real app, we would upload the image and send the post data to the server
      // const formData = new FormData()
      // formData.append('content', postContent)
      // if (postImage) formData.append('image', postImage)
      // const response = await axios.post(`${API_URL}/api/posts`, formData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Create new post object (normally this would come from the API response)
      const newPost = {
        id: Date.now(),
        user: {
          id: user?.id || 104,
          name: user?.name || 'Current User',
          profilePicture: user?.profilePicture || DEFAULT_AVATAR
        },
        content: postContent,
        image: imagePreview,
        likes: 0,
        comments: 0,
        createdAt: new Date().toISOString(),
        liked: false
      }
      
      // Notify parent component
      onPostCreated(newPost)
      
      // Reset form
      setPostContent('')
      setPostImage(null)
      setImagePreview(null)
    } catch (err) {
      setError('Failed to create post. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <Card 
      sx={{ 
        mb: 3, 
        borderRadius: 'var(--radius-md)',
        transition: 'box-shadow var(--transition-fast)',
        '&:hover': {
          boxShadow: 'var(--shadow-md)'
        }
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', mb: 2 }}>
          <Avatar 
            src={user?.profilePicture || DEFAULT_AVATAR} 
            alt={user?.name || 'User'}
            sx={{ mr: 1.5, width: 40, height: 40 }}
          />
          <TextField
            fullWidth
            multiline
            rows={2}
            placeholder="What's on your mind?"
            variant="outlined"
            value={postContent}
            onChange={handleContentChange}
            error={!!error}
            helperText={error}
            sx={{ 
              '& .MuiOutlinedInput-root': {
                borderRadius: 'var(--radius-md)',
              }
            }}
          />
        </Box>
        
        {imagePreview && (
          <Box sx={{ position: 'relative', mt: 2, mb: 3 }}>
            <IconButton
              size="small"
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                bgcolor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                '&:hover': {
                  bgcolor: 'rgba(0, 0, 0, 0.7)',
                }
              }}
              onClick={clearImage}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
            <Box
              component="img"
              src={imagePreview}
              alt="Post image preview"
              sx={{
                width: '100%',
                maxHeight: 300,
                objectFit: 'contain',
                borderRadius: 'var(--radius-sm)',
              }}
            />
          </Box>
        )}
        
        <Divider sx={{ my: 2 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <IconButton 
              color="primary" 
              component="label"
              sx={{
                transition: 'transform var(--transition-fast)',
                '&:active': {
                  transform: 'scale(0.95)'
                }
              }}
            >
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
              <ImageIcon />
            </IconButton>
            <IconButton 
              color="primary"
              sx={{
                transition: 'transform var(--transition-fast)',
                '&:active': {
                  transform: 'scale(0.95)'
                }
              }}
            >
              <VideoIcon />
            </IconButton>
            <IconButton 
              color="primary"
              sx={{
                transition: 'transform var(--transition-fast)',
                '&:active': {
                  transform: 'scale(0.95)'
                }
              }}
            >
              <EmojiIcon />
            </IconButton>
          </Box>
          
          <Button
            variant="contained"
            color="primary"
            disabled={(!postContent.trim() && !postImage) || !!error || loading}
            onClick={handleSubmit}
            sx={{
              borderRadius: 'var(--radius-full)',
              px: 3,
              py: 1,
              transition: 'all var(--transition-fast)',
              '&:hover:not(:disabled)': {
                transform: 'translateY(-2px)',
                boxShadow: 'var(--shadow-md)'
              }
            }}
          >
            {loading ? <CircularProgress size={24} /> : 'Post'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default NewPostForm