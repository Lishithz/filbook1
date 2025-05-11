import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Paper, Avatar, Typography, Button, Tabs, Tab, Grid, CircularProgress, Divider } from '@mui/material'
import { Edit as EditIcon, PersonAdd as PersonAddIcon, PersonAddDisabled as PersonRemoveIcon } from '@mui/icons-material'
import { useAuth } from '../context/AuthContext'
import PostCard from '../components/posts/PostCard'
import { DEFAULT_AVATAR, DEFAULT_COVER } from '../config/constants'

const Profile = () => {
  const { id } = useParams()
  const { user: currentUser } = useAuth()
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState(null)
  const [tabValue, setTabValue] = useState(0)
  const [postsLoading, setPostsLoading] = useState(false)
  const [posts, setPosts] = useState([])
  const [isFriend, setIsFriend] = useState(false)
  const [friendRequestSent, setFriendRequestSent] = useState(false)
  
  // Check if this is the current user's profile
  const isCurrentUser = currentUser && currentUser.id === parseInt(id)
  
  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true)
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Sample profile data (would come from API)
        const profileData = {
          id: parseInt(id),
          firstName: 'Bhavya',
          lastName: 'Chava',
          fullName: 'Bhavya Chava',
          bio: 'Software engineer passionate about building innovative solutions. Love hiking and photography in my free time.',
          location: 'Andhra Pradesh, India',
          occupation: 'Developer at Tech Innovations',
          profilePicture: 'data:image/jpeg;base64,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',
          coverPhoto: 'https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          friendsCount: 256,
          postsCount: 48,
          joined: '2022-03-15T00:00:00Z'
        }
        
        setProfile(profileData)
        setIsFriend(true) // Simulate friend status
        
        // Load initial posts
        fetchPosts()
      } catch (err) {
        console.error('Failed to fetch profile:', err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchProfile()
  }, [id])
  
  // Fetch posts
  const fetchPosts = async () => {
    try {
      setPostsLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Sample posts data (would come from API)
      const postsData = [
        {
          id: 101,
          user: {
            id: parseInt(id),
            name: 'Bhavya Chava',
            profilePicture: 'data:image/jpeg;base64,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'
          },
          content: 'Just finished implementing a new feature at work. Really proud of how it turned out!',
          image: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          likes: 24,
          comments: 5,
          createdAt: '2023-06-10T14:30:00Z',
          liked: false
        },
        {
          id: 102,
          user: {
            id: parseInt(id),
            name: 'Bhavya Chava',
            profilePicture: 'data:image/jpeg;base64,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'
          },
          content: 'Weekend hike with friends. Nature is the best therapy!',
          image: 'data:image/jpeg;base64,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np',
          likes: 42,
          comments: 8,
          createdAt: '2023-06-05T18:15:00Z',
          liked: true
        }
      ]
      
      setPosts(postsData)
    } catch (err) {
      console.error('Failed to fetch posts:', err)
    } finally {
      setPostsLoading(false)
    }
  }
  
  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }
  
  // Handle friend request
  const handleFriendRequest = () => {
    if (isFriend) {
      // Remove friend
      setIsFriend(false)
    } else if (friendRequestSent) {
      // Cancel request
      setFriendRequestSent(false)
    } else {
      // Send request
      setFriendRequestSent(true)
    }
  }
  
  // Handle post like toggle
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
  
  return (
    <Box>
      {/* Cover photo */}
      <Paper
        sx={{
          height: { xs: 150, sm: 200, md: 250 },
          borderRadius: 'var(--radius-md)',
          backgroundImage: `url(${profile.coverPhoto || DEFAULT_COVER})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          mb: { xs: 7, sm: 8 },
          overflow: 'hidden',
        }}
      >
        {/* Profile picture */}
        <Avatar
          src={profile.profilePicture || DEFAULT_AVATAR}
          alt={profile.fullName}
          sx={{
            width: { xs: 100, sm: 120, md: 140 },
            height: { xs: 100, sm: 120, md: 140 },
            border: '4px solid white',
            position: 'absolute',
            bottom: { xs: -50, sm: -60, md: -70 },
            left: { xs: 24, sm: 32 },
            boxShadow: 'var(--shadow-md)',
            transition: 'transform var(--transition-fast)',
            '&:hover': {
              transform: 'scale(1.05)'
            }
          }}
        />
        
        {/* Edit cover button (only for current user) */}
        {isCurrentUser && (
          <Button
            variant="contained"
            size="small"
            startIcon={<EditIcon />}
            sx={{
              position: 'absolute',
              bottom: 16,
              right: 16,
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
              }
            }}
          >
            Edit Cover
          </Button>
        )}
      </Paper>
      
      {/* Profile info */}
      <Box sx={{ px: { xs: 2, sm: 4 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {profile.fullName}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {profile.bio}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                <b>{profile.friendsCount}</b> friends
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <b>{profile.postsCount}</b> posts
              </Typography>
            </Box>
          </Box>
          
          {/* Action buttons */}
          <Box>
            {isCurrentUser ? (
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                sx={{
                  borderRadius: 'var(--radius-full)',
                  transition: 'all var(--transition-fast)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 'var(--shadow-md)'
                  }
                }}
              >
                Edit Profile
              </Button>
            ) : (
              <Button
                variant={isFriend || friendRequestSent ? "outlined" : "contained"}
                color={isFriend ? "secondary" : "primary"}
                startIcon={isFriend ? <PersonRemoveIcon /> : <PersonAddIcon />}
                onClick={handleFriendRequest}
                sx={{
                  borderRadius: 'var(--radius-full)',
                  transition: 'all var(--transition-fast)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 'var(--shadow-sm)'
                  }
                }}
              >
                {isFriend ? 'Friends' : (friendRequestSent ? 'Request Sent' : 'Add Friend')}
              </Button>
            )}
          </Box>
        </Box>
        
        <Divider sx={{ mb: 3 }} />
        
        {/* Tabs */}
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="profile tabs"
          sx={{
            mb: 3,
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              mx: 1,
              borderRadius: 'var(--radius-full)',
              transition: 'all var(--transition-fast)',
              '&:hover': {
                backgroundColor: 'action.hover',
              }
            }
          }}
        >
          <Tab label="Posts" />
          <Tab label="About" />
          <Tab label="Friends" />
          <Tab label="Photos" />
        </Tabs>
        
        {/* Tab content */}
        <Box sx={{ mt: 2 }}>
          {/* Posts tab */}
          {tabValue === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                {postsLoading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <>
                    {posts.map(post => (
                      <PostCard 
                        key={post.id} 
                        post={post} 
                        onLikeToggle={handleLikeToggle}
                      />
                    ))}
                    
                    {posts.length === 0 && (
                      <Box sx={{ textAlign: 'center', py: 6 }}>
                        <Typography variant="h6" color="text.secondary">
                          No posts to display.
                        </Typography>
                      </Box>
                    )}
                  </>
                )}
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 'var(--radius-md)',
                    mb: 3
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    About
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      <b>Location:</b> {profile.location}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      <b>Work:</b> {profile.occupation}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <b>Joined:</b> {new Date(profile.joined).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </Typography>
                  </Box>
                  
                  <Button 
                    variant="text" 
                    onClick={() => setTabValue(1)}
                    sx={{ 
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: 'action.hover'
                      }
                    }}
                  >
                    See all details
                  </Button>
                </Paper>
                
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 'var(--radius-md)',
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Friends ({profile.friendsCount})
                  </Typography>
                  
                  <Grid container spacing={1}>
                    {[1, 2, 3, 4, 5, 6].map(i => (
                      <Grid item xs={4} key={i}>
                        <Box sx={{ textAlign: 'center', mb: 1 }}>
                          <Avatar
                            src={`https://i.pravatar.cc/150?img=${i + 10}`}
                            alt={`Friend ${i}`}
                            sx={{
                              width: 64,
                              height: 64,
                              mx: 'auto',
                              mb: 1,
                              transition: 'transform var(--transition-fast)',
                              '&:hover': {
                                transform: 'scale(1.05)',
                                cursor: 'pointer'
                              }
                            }}
                          />
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              fontWeight: 500,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              '&:hover': {
                                color: 'primary.main',
                                cursor: 'pointer'
                              }
                            }}
                          >
                            Friend {i}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                  
                  <Button 
                    variant="text" 
                    onClick={() => setTabValue(2)}
                    sx={{ 
                      textTransform: 'none',
                      mt: 1,
                      '&:hover': {
                        backgroundColor: 'action.hover'
                      }
                    }}
                  >
                    See all friends
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          )}
          
          {/* About tab (placeholder) */}
          {tabValue === 1 && (
            <Typography variant="body1">
              About content will go here...
            </Typography>
          )}
          
          {/* Friends tab (placeholder) */}
          {tabValue === 2 && (
            <Typography variant="body1">
              Friends list will go here...
            </Typography>
          )}
          
          {/* Photos tab (placeholder) */}
          {tabValue === 3 && (
            <Typography variant="body1">
              Photos will go here...
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default Profile