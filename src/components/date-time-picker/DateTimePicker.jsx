import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import './date-time.css';
import 'react-datepicker/dist/react-datepicker.css';

const DateTimePicker = ({ startDate, handleChange }) => {
  let handleColor = (time) => {
    return time.getHours() > 12 ? 'text-success' : 'text-error';
  };
  return (
    <DatePicker
      showTimeSelect
      dateFormat='dd/MM/yyyy hh:mm a'
      selected={startDate}
      onChange={(date) => handleChange(date)}
      timeClassName={handleColor}
      minDate={new Date()}
      className='app_dt_main'
      placeholderText='Date Time'
    />
  );
};

DateTimePicker.propTypes = {
  startDate: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default DateTimePicker;
