import React from 'react';
import FooterComponent from './Footer';
import NavigationComponent from './Navigation';

const Layout = ({ children }) => {
  return (
    <div>
      <NavigationComponent />
      <main className='p-2 pt-16'>{children}</main>
      <FooterComponent />
    </div>
  );
};

export default Layout;
