import { Paper, Typography, List, ListItem, ListItemText, Box, Chip } from '@mui/material'
import { TrendingUp as TrendingIcon } from '@mui/icons-material'

const TrendingTopics = () => {
  // Sample trending topics
  const trendingTopics = [
    {
      id: 1,
      title: 'Artificial Intelligence',
      posts: 1250,
      trending: true
    },
    {
      id: 2,
      title: 'Space Exploration',
      posts: 890,
      trending: true
    },
    {
      id: 3,
      title: 'Climate Change',
      posts: 780,
      trending: false
    },
    {
      id: 4,
      title: 'Remote Work',
      posts: 650,
      trending: true
    },
    {
      id: 5,
      title: 'Quantum Computing',
      posts: 520,
      trending: false
    }
  ]
  
  return (
    <Paper
      sx={{
        p: 2,
        borderRadius: 'var(--radius-md)',
        animation: 'fadeIn var(--transition-normal)',
        animationDelay: '0.2s',
        opacity: 0,
        animationFillMode: 'forwards'
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Trending Topics
      </Typography>
      
      <List sx={{ p: 0 }}>
        {trendingTopics.map(topic => (
          <ListItem 
            key={topic.id}
            disablePadding
            sx={{ 
              py: 1,
              transition: 'background-color var(--transition-fast)',
              '&:hover': {
                backgroundColor: 'action.hover',
                borderRadius: 'var(--radius-sm)'
              },
              cursor: 'pointer'
            }}
          >
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {topic.title}
                  </Typography>
                  {topic.trending && (
                    <TrendingIcon 
                      fontSize="small" 
                      color="primary" 
                      sx={{ ml: 1 }}
                    />
                  )}
                </Box>
              }
              secondary={
                <Typography variant="caption" color="text.secondary">
                  {topic.posts.toLocaleString()} posts
                </Typography>
              }
            />
            
            <Chip 
              label="Follow" 
              size="small" 
              color="primary" 
              variant="outlined"
              sx={{ 
                borderRadius: 'var(--radius-full)',
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: 'white'
                },
                transition: 'all var(--transition-fast)'
              }}
              onClick={(e) => {
                e.stopPropagation()
                // Handle follow logic
              }}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}

export default TrendingTopics