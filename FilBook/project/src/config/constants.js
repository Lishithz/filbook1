// API URL
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

// Default image placeholders
export const DEFAULT_AVATAR = 'https://images.pexels.com/photos/3767392/pexels-photo-3767392.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
export const DEFAULT_COVER = 'https://images.pexels.com/photos/3377405/pexels-photo-3377405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'

// Post constants
export const MAX_POST_LENGTH = 500
export const MAX_COMMENT_LENGTH = 200

// Pagination defaults
export const DEFAULT_PAGE_SIZE = 10

// Validation patterns
export const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
export const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

// Error messages
export const ERROR_MESSAGES = {
  REQUIRED: 'This field is required',
  EMAIL_INVALID: 'Please enter a valid email address',
  PASSWORD_REQUIREMENTS: 'Password must be at least 8 characters with uppercase, lowercase and a number',
  NAME_TOO_SHORT: 'Name must be at least 2 characters',
  PASSWORDS_DONT_MATCH: 'Passwords do not match',
  POST_TOO_LONG: `Post cannot exceed ${MAX_POST_LENGTH} characters`,
  COMMENT_TOO_LONG: `Comment cannot exceed ${MAX_COMMENT_LENGTH} characters`,
}