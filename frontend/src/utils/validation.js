// Validate Username

export const validateUsername = (username) => {
  const value = username.trim();

  if (!value) return "Username is required";
  if (value.length < 6) return "Username has to be at least 6 characters";

  return null;
};
// Validate Password

export const validatePassword = (password) => {
  const checks = {
    required: password.trim().length > 0,
    minLength: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[^\w\s]/.test(password),
  };

  const isValid = Object.values(checks).every((value) => value === true);

  return { checks, isValid };
};

// Get Password Errors

export const getPasswordError = (password) => {
  const { checks } = validatePassword(password);
  if (!checks.required) return "Password is required";
  if (!checks.minLength) return "Password must be at least 8 characters";
  if (!checks.lowercase) return "Add at least one lowercase letter";
  if (!checks.uppercase) return "Add at least one uppercase letter";
  if (!checks.number) return "Add at least one number";
  if (!checks.special) return "Add at least one special character";

  return null;
};

// Valite Confirm Password

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword.trim()) {
    return "Please confirm your password";
  }

  if (password !== confirmPassword) {
    return "Passwords do not match";
  }

  return null;
};

// Validate First Name, Last Name and date

export const validateFields = (value, fieldName = "The field") => {
  if (!value) {
    return `${fieldName} cannot be empty`;
  }

  if (typeof value === "string" && !value.trim()) {
    return `${fieldName} cannot be empty`;
  }

  return null;
};
