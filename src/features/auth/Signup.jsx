
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { signupSchema } from './validation';

// I reuse it  form input component
const FormInput = ({ name, label, type = 'text', formik, ...props }) => {
  const hasError = formik.touched[name] && formik.errors[name];
  
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-700 text-sm font-medium mb-1">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[name]}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
          hasError ? 'border-red-500' : 'border-gray-300'
        }`}
        aria-invalid={hasError ? 'true' : 'false'}
        aria-describedby={hasError ? `${name}-error` : undefined}
        {...props}
      />
      {hasError && (
        <p id={`${name}-error`} className="mt-1 text-sm text-red-500">
          {formik.errors[name]}
        </p>
      )}
    </div>
  );
};

const Signup = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setSubmitError('');
      
      try {
        // Simulation of  API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Save user data to localStorage (mock successful registration) which found on my browser 
        localStorage.setItem('user', JSON.stringify({
          username: values.username,
          email: values.email
        }));
        
        setIsSuccess(true);
        
        // Redirect after success
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } catch (error) {
        setSubmitError('An error occurred during registration. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  });
  
  // Password strength indicator the reg expression 
  const getPasswordStrength = () => {
    const { password } = formik.values;
    if (!password) return { strength: 0, label: '' };
    
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    
    const labels = ['Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
    
    return {
      strength,
      label: labels[strength - 1] || '',
      color: colors[strength - 1] || ''
    };
  };
  
  const passwordStrength = getPasswordStrength();
  const isFormValid = formik.isValid && Object.keys(formik.touched).length === 4;
  
  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-primary text-white py-4 px-6">
          <h2 className="text-2xl font-bold">Join Us</h2>
        </div>
        
        <div className="p-6">
          {/* Success Message */}
          {isSuccess && (
            <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md flex items-center animate-fade-in">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Account created successfully! Redirecting to login...</span>
            </div>
          )}
          
          {/* Error Message */}
          {submitError && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md flex items-center animate-fade-in">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{submitError}</span>
            </div>
          )}
          
          <form onSubmit={formik.handleSubmit} noValidate>
            <FormInput 
              name="username" 
              label="Username" 
              formik={formik} 
              placeholder="Enter a username"
              disabled={isSubmitting || isSuccess}
            />
            
            <FormInput 
              name="email" 
              label="Email Address" 
              type="email" 
              formik={formik} 
              placeholder="username@gmail.com"
              disabled={isSubmitting || isSuccess}
            />
            
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                  formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Create a secure password"
                disabled={isSubmitting || isSuccess}
              />
              
              {formik.touched.password && formik.errors.password ? (
                <p className="mt-1 text-sm text-red-500">{formik.errors.password}</p>
              ) : formik.values.password ? (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full mr-2">
                      <div 
                        className={`h-full rounded-full ${passwordStrength.color}`} 
                        style={{ width: `${(passwordStrength.strength / 4) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">{passwordStrength.label}</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Password must be at least 8 characters with a number and special character
                  </p>
                </div>
              ) : null}
            </div>
            
            <FormInput 
              name="confirmPassword" 
              label="Confirm Password" 
              type="password" 
              formik={formik} 
              placeholder="Confirm your password"
              disabled={isSubmitting || isSuccess}
            />
            
            <button
              type="submit"
              className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors ${
                isSubmitting || !isFormValid 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-primary hover:bg-primary/90'
              }`}
              disabled={isSubmitting || isSuccess || !isFormValid}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </span>
              ) : (
                'Sign Up'
              )}
            </button>
          </form>
          
          {/* Login Link from auth folder */}
          <div className="mt-4 text-center text-sm">
            <span className="text-gray-600">Already have an account?</span>
            <a href="/login" className="ml-1 text-primary hover:underline">
              Log In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;