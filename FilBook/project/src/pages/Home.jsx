import { useState, useEffect } from 'react'
import { Box, Grid, CircularProgress, Typography, Button, useMediaQuery } from '@mui/material'
import { Refresh as RefreshIcon } from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'
import PostCard from '../components/posts/PostCard'
import NewPostForm from '../components/posts/NewPostForm'
import UserSuggestions from '../components/users/UserSuggestions'
import TrendingTopics from '../components/common/TrendingTopics'
import axios from 'axios'
import { API_URL } from '../config/constants'

const Home = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [refreshing, setRefreshing] = useState(false)
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

  // Sample data (would be fetched from API)
  const samplePosts = [
    {
      id: 1,
      user: {
        id: 101,
        name: 'Alex Johnson',
        profilePicture: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      },
      content: 'Just finished a great book on artificial intelligence. The future is fascinating!',
      image: 'https://images.pexels.com/photos/6153354/pexels-photo-6153354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      likes: 42,
      comments: 8,
      createdAt: '2023-06-15T08:30:00Z',
      liked: false
    },
    {
      id: 2,
      user: {
        id: 102,
        name: 'Sarah Miller',
        profilePicture: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      },
      content: 'Hiking in the mountains this weekend was incredible! The views were breathtaking.',
      image: 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      likes: 78,
      comments: 15,
      createdAt: '2023-06-14T15:45:00Z',
      liked: true
    },
    {
      id: 3,
      user: {
        id: 103,
        name: 'Michael Chen',
        profilePicture: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      },
      content: 'Working on a new project that combines machine learning with renewable energy solutions. So excited about the potential impact!',
      image: null,
      likes: 35,
      comments: 7,
      createdAt: '2023-06-14T12:20:00Z',
      liked: false
    }
  ]
  
  // Fetch posts (simulation)
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        // Actual API call (commented out since backend is not provided)
        // const response = await axios.get(`${API_URL}/api/posts`)
        // setPosts(response.data)
        
        // Simulate API delay
        setTimeout(() => {
          setPosts(samplePosts)
          setLoading(false)
        }, 1000)
      } catch (err) {
        setError('Failed to load posts. Please try again later.')
        setLoading(false)
      }
    }
    
    fetchPosts()
  }, [])
  
  // Handle refresh
  const handleRefresh = () => {
    setRefreshing(true)
    
    // Simulate refresh
    setTimeout(() => {
      // Shuffle posts to simulate new content
      const shuffled = [...samplePosts].sort(() => 0.5 - Math.random())
      setPosts(shuffled)
      setRefreshing(false)
    }, 1000)
  }
  
  // Handle new post creation
  const handleNewPost = (newPost) => {
    setPosts(prev => [newPost, ...prev])
  }
  
  // Handle like toggle
  const handleLikeToggle = (postId) => {
    setPosts(prev => 
      prev.map(post => {
        if (post.id === postId) {
          const liked = !post.liked
          return {
            ...post,
            liked,
            likes: liked ? post.likes + 1 : post.likes - 1
          }
        }
        return post
      })
    )
  }
  
  // Render loading state
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', pt: 8 }}>
        <CircularProgress />
      </Box>
    )
  }
  
  // Render error state
  if (error) {
    return (
      <Box sx={{ textAlign: 'center', pt: 8 }}>
        <Typography variant="h6" color="error" gutterBottom>
          {error}
        </Typography>
        <Button 
          variant="outlined" 
          startIcon={<RefreshIcon />}
          onClick={handleRefresh}
          sx={{ mt: 2 }}
        >
          Try Again
        </Button>
      </Box>
    )
  }
  
  return (
    <Grid container spacing={3}>
      {/* Main content area */}
      <Grid item xs={12} md={8}>
        {/* New post form */}
        <NewPostForm onPostCreated={handleNewPost} />
        
        {/* Refresh button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <Button 
            variant="outlined" 
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
            disabled={refreshing}
            sx={{
              borderRadius: 'var(--radius-full)',
              px: 3,
              transition: 'all var(--transition-fast)',
              '&:hover': {
                transform: 'translateY(-2px)'
              }
            }}
          >
            {refreshing ? 'Refreshing...' : 'Refresh Feed'}
          </Button>
        </Box>
        
        {/* Posts */}
        {posts.map(post => (
          <PostCard 
            key={post.id} 
            post={post} 
            onLikeToggle={handleLikeToggle}
          />
        ))}
        
        {posts.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No posts to display.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Follow some users or create your first post!
            </Typography>
          </Box>
        )}
      </Grid>
      
      {/* Right sidebar (only on larger screens) */}
      {!isSmallScreen && (
        <Grid item md={4}>
          <Box sx={{ position: 'sticky', top: 84 }}>
            <UserSuggestions />
            <TrendingTopics />
          </Box>
        </Grid>
      )}
    </Grid>
  )
}

export default Home