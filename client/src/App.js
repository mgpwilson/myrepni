import React, { Component } from 'react';

import { css } from 'emotion';

import logo from './img/logo.svg';
import loader from './img/loader.svg';
import down from './img/down.svg';
import Person from './Person';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postcode: 'BT36 7SX',
      constituency: null,
      people: [],
      alertVisible: false,
      resultsVisible: false,
      loaderVisible: false,
    };

    this.scrollRef = React.createRef();
  }

  handleInputChange = e => {
    this.setState({ postcode: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ resultsVisible: false });
    this.setState({ alertVisible: false });
    let postcodeRegEx = /[bB][tT][0-9]{1,2} ?[0-9][a-zA-Z]{2}/g;
    if (postcodeRegEx.test(this.state.postcode)) {
      this.setState({ loaderVisible: true });
      this.getConstituency(this.state.postcode);
    } else this.setState({ alertVisible: true });
  };

  handleScrollToResults = e => {
    window.scrollTo({
      left: 0,
      top: this.scrollRef.current.offsetTop,
      behavior: 'smooth',
    });
  };

  getConstituency = postcode => {
    fetch(`/api/constituency/${postcode}`)
      .then(res => res.json())
      .then(res => res['@graph'][1].constituencyGroupName)
      .then(res => {
        this.setState({ loaderVisible: false });
        return res;
      })
      .then(constituency => {
        this.setState({ constituency });
        this.getPeople(constituency);
      })
      .catch(error => console.log(error));
  };

  getPeople = constituency => {
    fetch(`/api/person/${constituency}`)
      .then(res => res.json())
      .then(people => {
        this.setState({ people });
        this.setState({ resultsVisible: true });
        this.handleScrollToResults();
      });
  };

  render() {
    return (
      <div
        className={css`
          margin-right: auto;
          margin-left: auto;

          text-align: center;
        `}
      >
        <div
          className={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: start;
            height: 100vh;
            padding-top: 3rem;
          `}
        >
          <img
            src={logo}
            alt="Logo"
            className={css`
              width: 80%;
              max-height: 300px;
              object-fit: contain;
            `}
          />
          <h1
            className={css`
              font-size: 3rem;
              margin: 1rem 0;
            `}
          >
            MyRepNI
          </h1>
          {this.state.alertVisible && (
            <div
              className={css`
                border-radius: 3px;
                background-color: #d50000;
                color: #fdfdfd;
                padding: 1rem;
                margin: 0 0 1rem 0;
              `}
            >
              Please enter a valid Northern Irish postcode.
            </div>
          )}
          <p
            className={css`
              margin: 0;
              font-size: 1.5rem;
            `}
          >
            Enter your postcode
          </p>
          <form
            onSubmit={this.handleSubmit}
            className={css`
              display: flex;
              flex-direction: column;
              margin: 1rem;
            `}
          >
            <input
              type="text"
              value={this.state.postcode}
              onChange={this.handleInputChange}
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
              `}
            >
              Submit
            </button>
          </form>

          {this.state.loaderVisible && (
            <div
              className={css`
                visibility: ${this.state.loaderVisible};
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

          {this.state.resultsVisible && (
            <div
              className={css`
                visibility: ${this.state.resultsVisible};
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

        {/* Display results container */}
        {this.state.resultsVisible && (
          <div
            ref={this.scrollRef}
            className={css`
              display: flex;
              flex-direction: column;
              justify-content: center;
              visibility: ${this.state.resultsVisible};
              background-color: #212121;
              padding: 1rem;
              color: #fafafa;
              border-top: 1px solid black;
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
                `}
              >
                {this.state.constituency}
              </span>
            </span>
            <span className={css``}>
              Your Member of the United Kingdom Parliament
            </span>
            <div
              className={css`
                display: flex;
                justify-content: center;
              `}
            >
              {this.state.people.map(person => {
                if (person.position === 'MP') {
                  return (
                    <Person
                      key={`${person.forename}_${person.surname}`}
                      person={person}
                    />
                  );
                }
              })}
            </div>

            <span
              className={css`
                margin-top: 2rem;
              `}
            >
              Your Members of the Northern Irish Assembly
            </span>
            <div
              className={css`
                display: flex;
                flex-flow: row wrap;
                justify-content: center;
              `}
            >
              {this.state.people.map(person => {
                if (person.position === 'MLA') {
                  return (
                    <Person
                      key={`${person.forename}_${person.surname}`}
                      person={person}
                    />
                  );
                }
              })}
            </div>

            <span
              className={css`
                margin-top: 2rem;
              `}
            >
              Your Members of the European Parliament
            </span>
            <div
              className={css`
                display: flex;
                flex-flow: row wrap;
                justify-content: center;
              `}
            >
              {this.state.people.map(person => {
                if (person.position === 'MEP') {
                  return (
                    <Person
                      key={`${person.forename}_${person.surname}`}
                      person={person}
                    />
                  );
                }
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
