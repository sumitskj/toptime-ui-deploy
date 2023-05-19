export const storeLogin = (data) => {
  localStorage.setItem('auth-top-time', JSON.stringify(data));
};

export const removeLogin = () => {
  localStorage.removeItem('auth-top-time');
};

export const getLogin = () => {
  return localStorage.getItem('auth-top-time');
};
