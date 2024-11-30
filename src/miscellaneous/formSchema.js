export const loginSchema = {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        required: true,
        pattern: '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$',
        errorMessages: {
          required: 'Email is required',
          pattern: 'Invalid email format'
        }
      },
      password: {
        type: 'string',
        required: true,
        minLength: 5,
        errorMessages: {
          required: 'Password is required',
          minLength: 'Password must be at least 6 characters'
        }
      }
    }
  };
  
  export const signupSchema = {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        required: true,
        minLength: 2,
        maxLength: 50,
        errorMessages: {
          required: 'Name is required',
          minLength: 'Name must be at least 2 characters',
          maxLength: 'Name cannot exceed 50 characters'
        }
      },
      email: {
        type: 'string',
        required: true,
        pattern: '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$',
        errorMessages: {
          required: 'Email is required',
          pattern: 'Invalid email format'
        }
      },
      password: {
        type: 'string',
        required: true,
        minLength: 6,
        pattern: '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$',
        errorMessages: {
          required: 'Password is required',
          minLength: 'Password must be at least 6 characters',
          pattern: 'Password must contain at least one letter and one number'
        }
      }
    }
  };