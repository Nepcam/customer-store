import React, { useReducer } from 'react';
import uuid from 'uuid';
import customerContext from './customerContext'
import customerReducer from './customerReducer'
import {
  ADD_CUSTOMER,
  DELETE_CUSTOMER,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CUSTOMER,
  FILTER_CUSTOMER,
  CLEAR_FILTER
} from '../types';

const CustomerState = props => {
  const initialState = {
    customers: [
      {
        id: 1,
        name: 'Jill Johnson',
        email: 'jill@gmail.com',
        phone: '111-111-1111',
        type: 'personal'
      },
      {
        id: 2,
        name: 'Mike Tupaea',
        email: 'mikeyt@gmail.com',
        phone: '111-222-3333',
        type: 'business'
      },
      {
        id: 3,
        name: 'Ihaka Jaram',
        email: 'ihakaj@hot.com',
        phone: '444-555-6666',
        type: 'personal'
      },
    ]
  };

  const [state, dispatch] = useReducer(customerReducer, initialState);

  // Add Customer
  // Delete Customer
  // Set Current Customer
  // Clear Current Customer
  // Update Customer
  // Filter Customer
  // Clear Filter

  return (
    <customerContext.Provider
      value={{
        customers: state.customers
      }}
    >
      { props.children }
    </customerContext.Provider>
  );
};

export default CustomerState;