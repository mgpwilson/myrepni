import React from 'react';
import { css } from 'emotion';

const Person = person => {
  const p = person.person;

  if (p.image_url === null) {
    p.image_url = 'http://placehold.jp/260x260.png';
  }

  return (
    <div
      className={css`
        display: grid;
        grid-template-columns: auto 260px;
        margin: 10px;
        align-items: center;
        background-color: ${p.party_color};
        border-top-left-radius: 11px;
        border-bottom-left-radius: 11px;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
      `}
    >
      <img
        className={css`
          grid-column: 1;
          border-top-left-radius: 10px;
          border-bottom-left-radius: 10px;
          height: 260px;
        `}
        src={p.image_url}
        alt={`${p.forename} ${p.surname}`}
      />
      <div
        className={css`
          grid-column: 2;
          border-top-right-radius: 10px;
          border-bottom-right-radius: 10px;
          color: white;
          padding-left: 10px;
          padding-right: 10px;
        `}
      >
        <h4>
          {p.forename} {p.surname}
        </h4>
        <h6>
          {p.party_name} <br /> {p.position} for {p.constituency_name}
        </h6>
        <details>
          <summary>Contact</summary>
          <p>
            {p.phone_number}
            <br />
            {p.email_address}
          </p>
        </details>
      </div>
    </div>
  );
};

export default Person;
