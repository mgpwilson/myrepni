import React, { Component } from 'react';

import {
  Container,
  Navbar,
  NavbarBrand,
  Row,
  Col,
  Jumbotron,
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
  FormGroup,
} from 'reactstrap';

import Person from './Person';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      person: null,
      postcodeList: [],
      newPostcode: '',
    };
  }

  getPostcodeList = () => {
    fetch('/api/postcode')
      .then(res => res.json())
      .then(res => {
        let postcodeList = res.map(r => r.code);
        this.setState({ postcodeList });
      });
  };

  handleInputChange = e => {
    this.setState({ newPostcode: e.target.value });
  };

  handleAddPostcode = () => {
    fetch('api/postcode', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postcode: this.state.newPostcode }),
    })
      .then(res => res.json())
      .then(res => {
        this.getPostcodeList();
        this.setState({ newPostcode: '' });
      });
  };

  getPerson = postcode => {
    fetch(`/api/constituency/${postcode}`)
      .then(res => res.json())
      .then(person => {
        console.log(person);
        this.setState({ person });
      });
  };

  handleChangePostcode = e => {
    this.getPerson(e.target.value);
  };

  componentDidMount() {
    this.getPostcodeList();
  }

  render() {
    return (
      <Container fluid className="centered">
        <Navbar dark color="dark">
          <NavbarBrand href="/">MyRepNI</NavbarBrand>
        </Navbar>
        <Row>
          <Col>
            <Jumbotron>
              <h1 className="display-3">MyRepNI</h1>
              <p className="lead">Enter your postcode</p>
              <InputGroup>
                <Input
                  className="centered"
                  value={this.state.newPostcode}
                  onChange={this.handleInputChange}
                />
                <InputGroupAddon addonType="append">
                  <Button color="primary" onClick={this.handleAddPostcode}>
                    Submit
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col>
            <h1 className="display-5">Current Postcode</h1>
            <FormGroup>
              <Input type="select" onChange={this.handleChangePostcode}>
                {this.state.postcodeList.length === 0 && (
                  <option>No postcodes added yet.</option>
                )}
                {this.state.postcodeList.length > 0 && (
                  <option>Select a postcode.</option>
                )}
                {this.state.postcodeList.map((postcode, i) => (
                  <option key={i}>{postcode}</option>
                ))}
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Person />
      </Container>
    );
  }
}

export default App;
