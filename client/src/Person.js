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
        display: flex;
        flex-direction: column;
        margin: 10px;
        align-items: center;
        width: 300px;
        border-radius: 3px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        :hover {
          box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
            0 10px 10px rgba(0, 0, 0, 0.22);
        }
        background-color: ${p.party_color};
      `}
    >
      <img
        className={css`
          border-top-left-radius: 3px;
          border-top-right-radius: 3px;
          width: 100%;
        `}
        src={p.image_url}
        alt={`${p.forename} ${p.surname}`}
      />
      <div
        className={css`
          border-bottom-left-radius: 3px;
          border-bottom-right-radius: 3px;
          color: rgba(250, 250, 250, 0.84);
          padding: 1.5rem 0;
          background-color: ${p.party_color};
          width: 100%;
          display: flex;
          flex-direction: column;
        `}
      >
        <span
          className={css`
            font-size: 1.5rem;
          `}
        >
          {p.forename} {p.surname}
        </span>
        <span
          className={css`
            padding: 1rem 0;
          `}
        >
          {p.party_name} <br /> {p.position} for {p.constituency_name}
        </span>
        <details
          className={css`
            color: #333;
            background-color: #fdfdfd;
            > summary::-webkit-details-marker {
              display: none;
            }
            padding: 0.5rem;
            width: content;
            align-self: center;
            margin-top: 0.5rem;
            border-radius: 3px;
          `}
        >
          <summary
            className={css`
              font-weight: bold;
            `}
          >
            Contact
          </summary>
          <span
            className={css`
              margin: 0;
            `}
          >
            {p.phone_number}
            <br />
            {p.email_address}
          </span>
        </details>
      </div>
    </div>
  );
};

export default Person;
