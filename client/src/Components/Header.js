import React from 'react';
import { css } from 'emotion';

import Title from './Title';
import Alert from './Alert';
import PostcodeInput from './PostcodeInput';
import Loader from './Loader';

const Header = props => {
  const alertVisible = props.alertVisible,
    alertMessage = props.alertMessage,
    handleSubmit = props.handleSubmit,
    handleInputChange = props.handleInputChange,
    postcode = props.postcode,
    loaderVisible = props.loaderVisible,
    resultsVisible = props.resultsVisible;

  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        padding-top: 3rem;
      `}
    >
      <Title />
      {alertVisible && <Alert alertMessage={alertMessage} />}
      <PostcodeInput
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        postcode={postcode}
      />

      <Loader loaderVisible={loaderVisible} resultsVisible={resultsVisible} />
    </div>
  );
};

export default Header;
