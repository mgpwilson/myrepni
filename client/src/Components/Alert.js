import React from 'react';
import { css } from 'emotion';

const Alert = props => {
  const alertMessage = props.alertMessage;
  return (
    <div
      className={css`
        border-radius: 3px;
        background-color: #d50000;
        color: #fdfdfd;
        padding: 1rem;
        margin: 0 0 1rem 0;
      `}
    >
      {alertMessage}
    </div>
  );
};
export default Alert;
