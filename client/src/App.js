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
  ListGroup,
  ListGroupItem,
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
        console.log(constituency);
        this.setState({ constituency });
        this.getPeople(constituency);
      });
  };

  getPeople = constituency => {
    fetch(`/api/person/${constituency}`)
      .then(res => res.json())
      .then(people => {
        this.setState({ people });
        console.log(people);
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
        <Row>
          <Col>
            <ListGroup>
              {this.state.people.map((person, index) => {
                return (
                  <ListGroupItem key={`${person.forename}_${person.surname}`}>
                    {person.forename} {person.surname} {person.position} {'- '}
                    {person.party_name}
                  </ListGroupItem>
                );
              })}
            </ListGroup>
          </Col>
        </Row>
        <div
          className={css`
            display: flex;
            flex-flow: row wrap;
            justify-content: center;
          `}
        >
          {this.state.people.map((person, index) => {
            return (
              <Person
                key={`${person.forename}_${person.surname}`}
                person={person}
              />
            );
          })}
        </div>
      </Container>
    );
  }
}

export default App;
