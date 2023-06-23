export const storeLogin = (data) => {
  localStorage.setItem('auth-top-time', JSON.stringify(data));
};

export const removeLogin = () => {
  localStorage.removeItem('auth-top-time');
};

export const getLogin = () => {
  return localStorage.getItem('auth-top-time');
};

export const storeIsProfessional = (data) => {
  localStorage.setItem('isProfessional', JSON.stringify(data));
};

export const getIsProfessional = () => {
  return localStorage.getItem('isProfessional');
};

export const removeIsProfessional = () => {
  localStorage.removeItem('isProfessional');
};

export const storeAppliedProfessionalCategories = (data) => {
  localStorage.setItem('appliedCategories', JSON.stringify(data));
};

export const getAppliedProfessionalCategories = () => {
  return localStorage.getItem('appliedCategories');
};

export const removeAppliedProfessionalCategories = () => {
  localStorage.removeItem('appliedCategories');
};

export const storeCategories = (data) => {
  localStorage.setItem('categories', JSON.stringify(data));
};

export const getCategories = () => {
  return localStorage.getItem('categories');
};
export const removeCategories = () => {
  localStorage.removeItem('categories');
};

export const storeIsRegisteredUser = (data) => {
  localStorage.setItem('isRegisteredUser', JSON.stringify(data));
};

export const getIsRegisteredUser = () => {
  return localStorage.getItem('isRegisteredUser');
};
export const removeIsRegisteredUser = () => {
  localStorage.removeItem('isRegisteredUser');
};
