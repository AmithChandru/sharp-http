import { useContext } from 'react';
import { Link } from 'react-router-dom';
import DetailsContext from '../Store/DetailsContext';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {

  const detailsCtx = useContext(DetailsContext);
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          <li>
            {!detailsCtx.details && <Link to='/auth'>Login</Link>}
          </li>
          <li>
            {detailsCtx.details && <Link to='/profile'>Profile</Link>}
          </li>
          <li>
            {detailsCtx.details && <button onClick={() => detailsCtx.removeDetails()}>Logout</button>}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
