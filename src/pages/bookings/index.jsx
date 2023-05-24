import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Tabs, Tab, Avatar } from '@mui/material';

import { TabPanel } from './TabPanel';
import { getBookings } from './api/bookings';
import { setBookings } from './slice/bookings';

import ReactTable from '../../components/data-grid/ReactTable';

const BOOKINGTYPES = {
  0: 'Voice',
  1: 'Video',
};

function a11yProps(index) {
  return {
    id: `booking-tab-${index}`,
    'aria-controls': `booking-tabpanel-${index}`,
  };
}

const Bookings = () => {
  const dispatch = useDispatch();
  const bookingsData = useSelector((state) => state.bookings);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchBookings = async () => {
    try {
      const query = `?status=${value}&page=0&limit=15`;
      const resp = await dispatch(getBookings(query)).unwrap();
      if (resp.ok) {
        const respJson = await resp.json();
        console.log('response is bookings wala ', respJson);
        dispatch(setBookings({ id: value, data: respJson }));
      }
    } catch (error) {
      console.log('Error: fetch bookings::', error);
    }
  };

  const columns = useMemo(() => {
    return [
      {
        accessor: 'bookingType',
        Header: 'Booking Type',
        Cell: ({ data }) => BOOKINGTYPES[data[0].bookingType],
      },
      {
        accessor: 'avatar',
        Header: 'Image',
        // eslint-disable-next-line react/prop-types
        Cell: ({ data }) => (
          // eslint-disable-next-line react/prop-types
          <Avatar alt={data[0].professionalFirstName} src={data[0].professionalPicUrl} />
        ),
      },
      {
        accessor: 'pfullName',
        Header: 'Professional Name',
        Cell: ({ data }) => `${data[0].professionalFirstName} ${data[0].professionalLastName}`,
        width: 200,
      },
      {
        accessor: 'duration',
        Header: 'Duration (Minutes)',
        width: 200,
      },
      {
        accessor: 'rate',
        Header: 'Rate (per Minutes)',
        width: 200,
      },
      {
        accessor: 'totalAmount',
        Header: 'Total',
        type: 'number',
        width: 200,
      },
      {
        accessor: 'initialBookingTime',
        Header: 'Initial Booking Time',
        Cell: ({ data }) => new Date(data[0].initialBookingTime).toLocaleString(),
        width: 200,
      },
      {
        accessor: 'finalBookingTime',
        Header: 'Final Booking Time',
        Cell: ({ data }) =>
          data[0].finalBookingTime ? new Date(data[0].finalBookingTime).toLocaleString() : '',
        width: 200,
      },
    ];
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [value]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box sx={{ width: '100%' }}>
          <Tabs value={value} onChange={handleChange} aria-label='bookings tabs'>
            <Tab label='Inprogress' {...a11yProps(0)} />
            <Tab label='Completed' {...a11yProps(1)} />
            <Tab label='Cancelled' {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <ReactTable data={bookingsData['0']} columns={columns} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ReactTable data={bookingsData['1']} columns={columns} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ReactTable data={bookingsData['2']} columns={columns} />
        </TabPanel>
      </Grid>
    </Grid>
  );
};

export default Bookings;
