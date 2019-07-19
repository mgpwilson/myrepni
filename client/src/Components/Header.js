import React from 'react';
import { css } from 'emotion';

import logo from '../img/logo.svg';

const Header = () => {
  return (
    <div
      className={css`
        width: 100%;
      `}
    >
      <img
        src={logo}
        alt="Logo"
        className={css`
          width: 80%;
          max-height: 300px;
          object-fit: contain;
        `}
      />
      <h1
        className={css`
          font-size: 3rem;
          margin: 1rem 0;
          color: #0288d1;
        `}
      >
        MyRepNI
      </h1>
    </div>
  );
};

export default Header;
