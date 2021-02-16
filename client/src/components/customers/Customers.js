import React, { Fragment, useContext } from 'react';
import CustomerItem from './CustomerItem';
import CustomerContext from '../../context/customer/customerContext';

const Customers = () => {
  const customerContext = useContext(CustomerContext);

  const { customers } = customerContext;

  return (
    <Fragment>
      {customers.map(customers => (
        <CustomerItem key={customers.id} customer={customers} />
      ))}
    </Fragment>
  );
};

export default Customers;
