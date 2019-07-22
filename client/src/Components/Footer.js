import React from 'react';
import { css } from 'emotion';

const Footer = () => {
  return (
    <div
      className={css`
        background-color: #424242;
        padding: 1rem;
        color: rgba(250, 250, 250, 0.84);
      `}
    >
      Developed by{' '}
      <a
        href="https://github.com/mgpwilson/myrepni"
        target="_blank"
        rel="noopener noreferrer"
        className={css`
          color: #0288d1;
          text-decoration: none;
          :hover {
            text-decoration: underline;
          }
        `}
      >
        Matthew Wilson
      </a>
    </div>
  );
};

export default Footer;
