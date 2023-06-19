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

export const storeAppliedProfessionalCategories = (data) => {
  localStorage.setItem('appliedCategories', JSON.stringify(data));
};

export const getAppliedProfessionalCategories = () => {
  return localStorage.getItem('appliedCategories');
};
