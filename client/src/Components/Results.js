import React from 'react';
import { css } from 'emotion';

import PersonList from './PersonList';

const Results = props => {
  let people = props.people;
  let constituency = props.constituency;
  let scrollRef = props.scrollRef;
  let resultsVisible = props.resultsVisible;

  return (
    <div
      ref={scrollRef}
      className={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        visibility: ${resultsVisible};
        background-color: #212121;
        padding: 1rem;
        color: #fafafa;
      `}
    >
      <span
        className={css`
          font-size: 1.6rem;
          margin: 3rem 0 2rem 0;
        `}
      >
        Your constituency is{' '}
        <span
          className={css`
            color: #03a9f4;
            white-space: nowrap;
          `}
        >
          {constituency}
        </span>
      </span>
      <PersonList people={people} position="MP" />
      <PersonList people={people} position="MLA" />
      <PersonList people={people} position="MEP" />
    </div>
  );
};

export default Results;
