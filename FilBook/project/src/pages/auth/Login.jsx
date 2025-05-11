import { useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { TextField, Button, Box, Typography, InputAdornment, IconButton, Link, CircularProgress } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useAuth } from '../../context/AuthContext'
import { ERROR_MESSAGES, EMAIL_PATTERN } from '../../config/constants'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const { login, loading } = useAuth()
  const navigate = useNavigate()
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }
  
  const validateForm = () => {
    const newErrors = {}
    
    // Email validation
    if (!formData.email) {
      newErrors.email = ERROR_MESSAGES.REQUIRED
    } else if (!EMAIL_PATTERN.test(formData.email)) {
      newErrors.email = ERROR_MESSAGES.EMAIL_INVALID
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = ERROR_MESSAGES.REQUIRED
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    const result = await login(formData.email, formData.password)
    
    if (result.success) {
      navigate('/')
    } else {
      setErrors({ submit: result.error })
    }
  }
  
  const toggleShowPassword = () => {
    setShowPassword(prev => !prev)
  }
  
  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        value={formData.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
        InputProps={{
          sx: {
            borderRadius: 'var(--radius-md)',
          }
        }}
      />
      
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type={showPassword ? 'text' : 'password'}
        id="password"
        autoComplete="current-password"
        value={formData.password}
        onChange={handleChange}
        error={!!errors.password}
        helperText={errors.password}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={toggleShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
          sx: {
            borderRadius: 'var(--radius-md)',
          }
        }}
      />
      
      {errors.submit && (
        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
          {errors.submit}
        </Typography>
      )}
      
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        sx={{ 
          mt: 3, 
          mb: 2, 
          py: 1.2,
          borderRadius: 'var(--radius-md)',
          transition: 'all var(--transition-fast)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: 'var(--shadow-md)'
          }
        }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Sign In'}
      </Button>
      
      <Box sx={{ textAlign: 'center' }}>
        <Link 
          component={RouterLink} 
          to="/forgot-password" 
          variant="body2" 
          sx={{ 
            color: 'text.secondary',
            transition: 'color var(--transition-fast)',
            '&:hover': {
              color: 'primary.main'
            }
          }}
        >
          Forgot password?
        </Link>
        
        <Typography variant="body2" sx={{ mt: 2 }}>
          Don't have an account?{' '}
          <Link 
            component={RouterLink} 
            to="/register" 
            sx={{ 
              fontWeight: 600,
              transition: 'color var(--transition-fast)',
              '&:hover': {
                color: 'primary.dark'
              }
            }}
          >
            Sign Up
          </Link>
        </Typography>
      </Box>
    </Box>
  )
}

export default Login