// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSchema, signupSchema } from '../../miscellaneous/formSchema';
import { loginUser, signupUser } from '../../reducers/auth/auth';

// eslint-disable-next-line react/prop-types
const DynamicForm = ({ isLogin = true }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  // Choose schema based on form type
  const currentSchema = isLogin ? loginSchema : signupSchema;

  // Validation function
  const validateField = (name, value) => {
    const fieldSchema = currentSchema.properties[name];
    if (!fieldSchema) return null;

    // Required validation
    if (fieldSchema.required && !value) {
      return fieldSchema.errorMessages.required;
    }

    // Pattern validation
    if (fieldSchema.pattern) {
      const regex = new RegExp(fieldSchema.pattern);
      if (!regex.test(value)) {
        return fieldSchema.errorMessages.pattern;
      }
    }

    // Length validation
    if (fieldSchema.minLength && value.length < fieldSchema.minLength) {
      return fieldSchema.errorMessages.minLength;
    }
    if (fieldSchema.maxLength && value.length > fieldSchema.maxLength) {
      return fieldSchema.errorMessages.maxLength;
    }

    // Confirm password validation (only for signup)
    if (name === 'confirmPassword' && !isLogin) {
      if (value !== formData.password) {
        return 'Passwords do not match';
      }
    }

    return null;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Update form data
    setFormData(prev => ({ ...prev, [name]: value }));
    setServerError(null);

    // Validate field
    const fieldError = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: fieldError
    }));
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(currentSchema.properties).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    // Set errors or submit form
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Prepare for submission
    setIsSubmitting(true);
    setServerError(null);

    try {
      // Dispatch appropriate action based on form type
      const actionResult = isLogin 
        ? await dispatch(loginUser(formData)).unwrap()
        : await dispatch(signupUser(formData)).unwrap();

      // Navigate to dashboard on successful authentication
      if(isLogin){
        navigate('/dashboard');
      }else{
        navigate('/');
      }
    } catch (error) {
      // Handle authentication errors
      setServerError(
        error || 
        (isLogin 
          ? 'Login failed. Please check your credentials.' 
          : 'Registration failed. Please try again.')
      );
      setIsSubmitting(false);
    }
  };

  // Render input fields
  const renderField = (name, fieldSchema) => {
    const inputType = name.includes('password') 
      ? 'password' 
      : name.includes('email') 
        ? 'email' 
        : 'text';
    
    return (
      <input
        type={inputType}
        name={name}
        placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
        value={formData[name] || ''}
        onChange={handleChange}
        disabled={isSubmitting}
        className={`
          w-full 
          px-4 
          py-2 
          border 
          rounded-md 
          focus:outline-none 
          focus:ring-2 
          ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
          ${errors[name] 
            ? 'border-red-500 focus:ring-red-500' 
            : 'border-gray-300 focus:ring-blue-500'
          }
        `}
      />
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isLogin ? 'Sign in to your account' : 'Create your account'}
          </h2>
        </div>

        {/* Server Error Message */}
        {serverError && (
          <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{serverError}</span>
          </div>
        )}

        <form 
          className="mt-8 space-y-6" 
          onSubmit={handleSubmit}
        >
          <div className="rounded-md shadow-sm -space-y-px">
            {Object.entries(currentSchema.properties).map(([name, fieldSchema], index) => (
              <div 
                key={name} 
                className={`${index > 0 ? '-mt-px' : ''}`}
              >
                <div className="mb-4">
                  {renderField(name, fieldSchema)}
                  {errors[name] && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors[name]}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                group 
                relative 
                w-full 
                flex 
                justify-center 
                py-2 
                px-4 
                border 
                border-transparent 
                text-sm 
                font-medium 
                rounded-md 
                text-white 
                ${isSubmitting 
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
                }
                focus:outline-none 
                focus:ring-2 
                focus:ring-offset-2 
                focus:ring-blue-500
              `}
            >
              {isSubmitting 
                ? (isLogin ? 'Signing In...' : 'Signing Up...') 
                : (isLogin ? 'Sign In' : 'Sign Up')
              }
            </button>
          </div>
        </form>

        {isLogin && (
          <div className="text-center">
            <p className="mt-2 text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <Link 
                to="/signup" 
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign up
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DynamicForm;