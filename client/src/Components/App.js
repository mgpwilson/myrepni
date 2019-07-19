import React, { useState, useRef } from 'react';

import { css } from 'emotion';

import Header from './Header';
import Alert from './Alert';
import PostcodeInput from './PostcodeInput';
import Loader from './Loader';
import Results from './Results';

const App = () => {
  const [postcode, setPostcode] = useState('BT36 7SX'),
    [constituency, setConstituency] = useState(null),
    [people, setPeople] = useState([]),
    [alertVisible, setAlertVisible] = useState(false),
    [alertMessage, setAlertMessage] = useState(''),
    [resultsVisible, setResultsVisible] = useState(false),
    [loaderVisible, setLoaderVisible] = useState(false),
    scrollRef = useRef(null);

  const handleInputChange = e => {
    setPostcode(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setResultsVisible(false);
    setAlertVisible(false);
    const postcodeRegEx = /[bB][tT][0-9]{1,2} ?[0-9][a-zA-Z]{2}/g;
    if (postcodeRegEx.test(postcode)) {
      setLoaderVisible(true);
      getConstituency(postcode);
    } else showError('Please enter a valid Northern Ireland postcode');
  };

  const handleScrollToResults = e =>
    window.scrollTo({
      left: 0,
      top: scrollRef.current.offsetTop,
      behavior: 'smooth',
    });

  const showError = message => {
    setAlertVisible(true);
    setAlertMessage(message);
    setLoaderVisible(false);
  };

  const getConstituency = postcode => {
    fetch(`/api/constituency/${postcode}`)
      .then(res => res.json())
      .then(res => res['@graph'][1].constituencyGroupName)
      .then(res => {
        setLoaderVisible(false);
        return res;
      })
      .then(constituency => {
        setConstituency(constituency);
        getPeople(constituency);
      })
      .catch(() => showError('Postcode is either inactive or does not exist.'));
  };

  const getPeople = constituency => {
    fetch(`/api/person/${constituency}`)
      .then(res => res.json())
      .then(people => {
        setPeople(people);
        setResultsVisible(true);
        handleScrollToResults();
      })
      .catch(() => showError('Database error'));
  };

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
        <Header />
        {alertVisible && <Alert alertMessage={alertMessage} />}
        <PostcodeInput
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          postcode={postcode}
        />

        <Loader loaderVisible={loaderVisible} resultsVisible={resultsVisible} />
      </div>

      {/* Display results container */}
      {resultsVisible && (
        <Results
          people={people}
          constituency={constituency}
          scrollRef={scrollRef}
          resultsVisible={resultsVisible}
        />
      )}
    </div>
  );
};

export default App;
