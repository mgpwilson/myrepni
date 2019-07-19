import React from 'react';
import { css } from 'emotion';

import loader from '../img/loader.svg';
import down from '../img/down.svg';

const Loader = props => {
  const loaderVisible = props.loaderVisible;
  const resultsVisible = props.resultsVisible;

  return (
    <div>
      {loaderVisible && (
        <div
          className={css`
            visibility: ${loaderVisible};
            margin-top: -1rem;
          `}
        >
          <img
            src={loader}
            alt="Loading..."
            className={css`
              height: 5rem;
            `}
          />
        </div>
      )}

      {resultsVisible && (
        <div
          className={css`
            visibility: ${resultsVisible};
          `}
        >
          <img
            src={down}
            alt="Results below"
            className={css`
              height: 3.5rem;
            `}
          />
        </div>
      )}
    </div>
  );
};

export default Loader;
