import React, { useReducer } from 'react';
import uuid from 'uuid';
import CustomerContext from './customerContext'
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
        name: 'Pae Jaram',
        email: 'pae@gmail.com',
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
    <CustomerContext.Provider
      value={{
        customers: state.customers
      }}
    >
      { props.children }
    </CustomerContext.Provider>
  );
};

export default CustomerState;