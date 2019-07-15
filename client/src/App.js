import React, { Component } from 'react';

import {
  Container,
  Navbar,
  NavbarBrand,
  Row,
  Col,
  Jumbotron,
  Input,
  Form,
  Button,
} from 'reactstrap';

import { css, cx } from 'emotion';

import Person from './Person';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postcode: '',
      constituency: null,
      people: [],
      resultsVisible: 'hidden',
    };
  }

  handleInputChange = e => {
    this.setState({ postcode: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.getConstituency(this.state.postcode);
  };

  getConstituency = postcode => {
    fetch(`/api/constituency/${postcode}`)
      .then(res => res.json())
      .then(res => res.name)
      .then(constituency => {
        this.setState({ constituency });
        this.getPeople(constituency);
      });
  };

  getPeople = constituency => {
    fetch(`/api/person/${constituency}`)
      .then(res => res.json())
      .then(people => {
        this.setState({ people });
        this.setState({ resultsVisible: 'visible' });
      });
  };

  componentDidMount() {}

  render() {
    return (
      <Container fluid className="text-center">
        <Navbar dark color="dark">
          <NavbarBrand href="/">MyRepNI</NavbarBrand>
        </Navbar>
        <Row>
          <Col>
            <Jumbotron>
              <h1 className="display-3">MyRepNI</h1>
              <p className="lead">Enter your postcode</p>
              <Form onSubmit={this.handleSubmit}>
                <Input
                  className="text-center mb-3"
                  value={this.state.postcode}
                  onChange={this.handleInputChange}
                />
                <Button color="primary">Submit</Button>
              </Form>
            </Jumbotron>
          </Col>
        </Row>

        <div
          className={css`
            display: grid;
            justify-content: center;
            visibility: ${this.state.resultsVisible};
          `}
        >
          <h1
            className={css`
              grid-row: auto;
              margin-top: 20px;
            `}
          >
            Your constituency is {this.state.constituency}
          </h1>
          <h2
            className={css`
              grid-row: auto;
              margin-top: 20px;
            `}
          >
            Your MP
          </h2>
          <div
            className={css`
              grid-row: auto;
              display: flex;
              justify-content: center;
            `}
          >
            {this.state.people.map(person => {
              if (person.position === 'MP') {
                console.log(person);
                return (
                  <Person
                    key={`${person.forename}_${person.surname}`}
                    person={person}
                  />
                );
              }
            })}
          </div>

          <h2
            className={css`
              grid-row: auto;
              margin-top: 40px;
            `}
          >
            Your MLAs
          </h2>
          <div
            className={css`
              grid-row: auto;
              display: flex;
              flex-flow: row wrap;
              justify-content: center;
            `}
          >
            {this.state.people.map(person => {
              if (person.position === 'MLA') {
                console.log(person);
                return (
                  <Person
                    key={`${person.forename}_${person.surname}`}
                    person={person}
                  />
                );
              }
            })}
          </div>

          <h2
            className={css`
              grid-row: auto;
              margin-top: 40px;
            `}
          >
            Your MEPs
          </h2>
          <div
            className={css`
              grid-row: auto;
              display: flex;
              flex-flow: row wrap;
              justify-content: center;
            `}
          >
            {this.state.people.map(person => {
              if (person.position === 'MEP') {
                console.log(person);
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
      </Container>
    );
  }
}

export default App;
