import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from './header';

  function AuthLayout() {

  return (
    <>
      <Header />

      <div className="container-lg d-flex justify-content-center my-4">
        <Outlet />
      </div>
    </>
  );
}

export default AuthLayout;