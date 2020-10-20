import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// layout
import Layout from '../layouts/Default';

// container
import Customer from '../components/TicketsContainers/Customer/Customer'

// actions
import { shopsActions } from '../actions/shops.action';

export default function Tickets() {
  const history = useHistory();
  const shops = useSelector(state => state.shops.searchShops);
  const searchKeyword = useSelector(state => state.shops.searchKeyword);
  const searchPage = useSelector(state => state.shops.searchPage);

  const user = JSON.parse(localStorage.getItem('user'));
  const [userType, setUserType] = useState('');
  const [coords, setCoords] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setUserType(user.type);
    } else {
      history.push('/login');
    }
  }, []);

  return (
    <Layout userType={userType}>
      {userType === "Customer" && <Customer user={user}/>}
    </Layout>
  );
}