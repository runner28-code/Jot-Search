export function validateInput(name, value, errors, password) {
  const newErrors = { ...errors };
  
  // Email validation
  if ( name === 'email' ) {
    const validEmail = /\S+@\S+\.\S+/.test(value);
    if ( !validEmail ) {
      newErrors[name] = 'Please enter a valid email address';
    } else {
      newErrors[name] = '';
    }
    return newErrors;
  } 
  // Password validation
  else if ( name === 'verifyPassword' ) {
    if ( value !== password ) {
      newErrors[name] = 'Passwords do not match';
    } else {
      newErrors[name] = '';
    }
  } 
  else if ( value === '' ) { // Add to errors if empty
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
    newErrors[name] = `${capitalizedName} is required`;
  } else if ( errors[name] ) { // Remove from errors if not empty
    newErrors[name] = '';
  }

  return newErrors;
