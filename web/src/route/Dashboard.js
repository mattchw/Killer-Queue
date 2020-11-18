import React, { useState, useEffect } from 'react';
import cookie from 'js-cookie';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import CustomerDashboard from '../components/DashboardContainers/Customer/Customer';
import ShopOwnerDashboard from '../components/DashboardContainers/ShopOwner/ShopOwner';

// layout
import Layout from '../layouts/Default';

const drawerWidth = 200;

export default function Dashboard() {
  const history = useHistory();

  const token = cookie.get('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const [userType, setUserType] = useState('');
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
      {userType === "Admin" && <div>
        <h2>I am Admin!</h2>
      </div>}
      {userType === "ShopOwner" && <ShopOwnerDashboard user={user}/>}
      {userType === "Customer" && <CustomerDashboard user={user}/>}
    </Layout>
  );
}