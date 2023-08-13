import { Link, useLocation } from 'react-router-dom';

import { AUTH, LOCATION } from '../../../constants/index';

import './header.css';

function Header(props) {
  const location = useLocation();

  return (
    <header className="App-header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to={LOCATION.HOME}>
          Trang chủ
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {AUTH.map((item, index) => (
              <li key={index} className="nav-item">
                <Link className={`nav-link ${location.pathname.includes(item.path) ? 'disabled' : ''}`} to={item.path}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
