import React, { useState, useRef } from 'react';

import { css } from 'emotion';

import Header from './Header';
import Results from './Results';
import Footer from './Footer';

const App = () => {
  const [postcode, setPostcode] = useState(''),
    [constituency, setConstituency] = useState(null),
    [people, setPeople] = useState([]),
    [alertVisible, setAlertVisible] = useState(false),
    [alertMessage, setAlertMessage] = useState(''),
    [resultsVisible, setResultsVisible] = useState(false),
    [loaderVisible, setLoaderVisible] = useState(false),
    scrollRef = useRef(null);

  const PRODUCTION = process.env.NODE_ENV === 'production';
  const SERVER = PRODUCTION
    ? 'https://api.myrepni.com'
    : 'http://localhost:5000';

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
    fetch(`${SERVER}/getConstituency/${postcode}`)
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
      .catch(err => {
        showError('Postcode is either inactive or does not exist.');
      });
  };

  const getPeople = constituency => {
    fetch(`${SERVER}/getPeople/${constituency}`)
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
      <Header
        alertVisible={alertVisible}
        alertMessage={alertMessage}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        postcode={postcode}
        loaderVisible={loaderVisible}
        resultsVisible={resultsVisible}
      />

      {/* Display results container */}
      {resultsVisible && (
        <div>
          <Results
            people={people}
            constituency={constituency}
            scrollRef={scrollRef}
            resultsVisible={resultsVisible}
          />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default App;
