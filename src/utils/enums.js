export const getBookingTypeFromValue = (value) => {
  if (value === 0) return 'Voice Call';
  if (value === 1) return 'Video Call';
  return '';
};

export const getBookingStatusFromValue = (value) => {
  if (value === 0) return 'CREATED';
  if (value === 1) return 'WAITING FOR PROFESSIONAL';
  if (value === 2) return 'WAITING FOR USER';
  if (value === 3) return 'CONFIRMED';
  if (value === 4) return 'INPROGRESS';
  if (value === 5) return 'PROCESSING FEEDBACKS';
  if (value === 6) return 'COMPLETED';
  if (value === 7) return 'PARTIALLY COMPLETED';
  if (value === 8) return 'CANCELLED BY USER';
  if (value === 9) return 'CANCELLED BY PROFESSIONAL';
  return '';
};
