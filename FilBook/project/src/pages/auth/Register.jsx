import { useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { TextField, Button, Box, Typography, InputAdornment, IconButton, Link, CircularProgress, Grid, Alert } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useAuth } from '../../context/AuthContext'
import { ERROR_MESSAGES, EMAIL_PATTERN, PASSWORD_PATTERN } from '../../config/constants'

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [success, setSuccess] = useState(false)
  const { register, loading } = useAuth()
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
    
    // First name validation
    if (!formData.firstName) {
      newErrors.firstName = ERROR_MESSAGES.REQUIRED
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = ERROR_MESSAGES.NAME_TOO_SHORT
    }
    
    // Last name validation
    if (!formData.lastName) {
      newErrors.lastName = ERROR_MESSAGES.REQUIRED
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = ERROR_MESSAGES.NAME_TOO_SHORT
    }
    
    // Email validation
    if (!formData.email) {
      newErrors.email = ERROR_MESSAGES.REQUIRED
    } else if (!EMAIL_PATTERN.test(formData.email)) {
      newErrors.email = ERROR_MESSAGES.EMAIL_INVALID
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = ERROR_MESSAGES.REQUIRED
    } else if (!PASSWORD_PATTERN.test(formData.password)) {
      newErrors.password = ERROR_MESSAGES.PASSWORD_REQUIREMENTS
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = ERROR_MESSAGES.REQUIRED
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = ERROR_MESSAGES.PASSWORDS_DONT_MATCH
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    }
    
    const result = await register(userData)
    
    if (result.success) {
      setSuccess(true)
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      })
      
      // Redirect to login after short delay
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    } else {
      setErrors({ submit: result.error })
    }
  }
  
  const toggleShowPassword = () => {
    setShowPassword(prev => !prev)
  }
  
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(prev => !prev)
  }
  
  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      {success && (
        <Alert 
          severity="success" 
          sx={{ mb: 3, animation: 'fadeIn var(--transition-normal)' }}
        >
          Registration successful! Redirecting to login...
        </Alert>
      )}
      
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            autoComplete="given-name"
            value={formData.firstName}
            onChange={handleChange}
            error={!!errors.firstName}
            helperText={errors.firstName}
            InputProps={{
              sx: {
                borderRadius: 'var(--radius-md)',
              }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
            value={formData.lastName}
            onChange={handleChange}
            error={!!errors.lastName}
            helperText={errors.lastName}
            InputProps={{
              sx: {
                borderRadius: 'var(--radius-md)',
              }
            }}
          />
        </Grid>
      </Grid>
      
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
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
        autoComplete="new-password"
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
      
      <TextField
        margin="normal"
        required
        fullWidth
        name="confirmPassword"
        label="Confirm Password"
        type={showConfirmPassword ? 'text' : 'password'}
        id="confirmPassword"
        autoComplete="new-password"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle confirm password visibility"
                onClick={toggleShowConfirmPassword}
                edge="end"
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
        disabled={loading || success}
      >
        {loading ? <CircularProgress size={24} /> : 'Sign Up'}
      </Button>
      
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="body2">
          Already have an account?{' '}
          <Link 
            component={RouterLink} 
            to="/login" 
            sx={{ 
              fontWeight: 600,
              transition: 'color var(--transition-fast)',
              '&:hover': {
                color: 'primary.dark'
              }
            }}
          >
            Sign In
          </Link>
        </Typography>
      </Box>
    </Box>
  )
}

export default Register