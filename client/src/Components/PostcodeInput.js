import React from 'react';
import { css } from 'emotion';

const PostcodeInput = props => {
  const handleSubmit = props.handleSubmit;
  const handleInputChange = props.handleInputChange;
  const postcode = props.postcode;

  return (
    <div>
      <span
        className={css`
          font-size: 1.5rem;
        `}
      >
        Enter your postcode
      </span>
      <form
        onSubmit={handleSubmit}
        className={css`
          display: flex;
          flex-direction: column;
          margin: 1rem;
        `}
      >
        <input
          type="text"
          value={postcode}
          onChange={handleInputChange}
          className={css`
            margin-bottom: 10px;
            text-align: center;
            font-size: 2.2rem;
            color: #fafafa;
            width: 12.5rem;
            border: 0;
            border-bottom: solid 0.5px #fafafa;
            padding: 0;
            background: transparent;
          `}
        />
        <button
          className={css`
            margin: 1rem;
            height: 4rem;
            border-radius: 3px;
            font-size: 2rem;
            color: #fdfdfd;
            border: 0;
            background-color: #0288d1;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),
              0 1px 2px rgba(0, 0, 0, 0.24);
          `}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostcodeInput;
