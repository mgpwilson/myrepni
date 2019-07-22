import React from 'react';
import { css } from 'emotion';

import Person from './Person';

const PersonList = props => {
  const people = props.people;
  const position = props.position;
  let legislature;
  let isPlural = true;
  switch (position) {
    case 'MP':
      isPlural = false;
      legislature = 'House of Commons';
      break;
    case 'MLA':
      legislature = 'Northern Ireland Assembly';
      break;
    case 'MEP':
      legislature = 'European Parliament';
      break;
    default:
      throw Object.assign(new Error('Role not found in PersonList switch.'));
  }

  return (
    <div
      className={css`
        margin-top: 2rem;
      `}
    >
      <span>
        Your representative{isPlural ? 's' : ''} in the {legislature}.
      </span>
      <div
        className={css`
          display: flex;
          flex-flow: row wrap;
          justify-content: center;
        `}
      >
        {people
          .filter(person => person.position === position)
          .map(person => (
            <Person
              key={`${person.forename}_${person.surname}`}
              person={person}
            />
          ))}
      </div>
    </div>
  );
};

export default PersonList;
