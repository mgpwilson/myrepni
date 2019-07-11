import React, { Component } from 'react';
import { css, cx } from 'emotion';

const Person = person => {
  const p = person.person;
  console.log(p);

  return (
    <div
      className={css`
        display: grid;
        grid-template-columns: 260px 260px;
        margin: 10px;
        width: 520px;
        align-items: center;
        background-color: #ff4136;
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
          width: 260px;
          height: 260px;
        `}
        src="http://placehold.jp/260x260.png"
        alt={`${p.forename} ${p.surname}`}
      />
      <div
        className={css`
          grid-column: 2;
          border-top-right-radius: 10px;
          border-bottom-right-radius: 10px;
          color: white;
        `}
      >
        <h4>
          {p.forename} {p.surname}
        </h4>
        <h6>
          {p.party_name} <br /> {p.position} for {p.constituency_name}
        </h6>
        <a
          className={css`
            color: white;
            :hover {
              color: white;
            }
          `}
          href="#"
        >
          Contact
        </a>
      </div>
    </div>
  );
};

export default Person;
