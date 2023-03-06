import { Fragment } from 'react';
import DetailsProvider from '../Store/DetailsProvider';

import MainNavigation from './MainNavigation';

const Layout = (props) => {
  return (
    <DetailsProvider>
      <Fragment>
        <MainNavigation />
        <main>{props.children}</main>
      </Fragment>
    </DetailsProvider>
  );
};

export default Layout;
