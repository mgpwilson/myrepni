import React from 'react';
import { Row, Col, Table } from 'reactstrap';

const Person = props => {
  const { data } = props;

  if (!data) return <div />;

  return (
    <Row className="person">
      <Col sm="12" md={{ size: 4, offset: 4 }}>
        <h2 />
        <img />
        <span />
        <span />
        <Table>
          <tbody />
        </Table>
      </Col>
    </Row>
  );
};

export default Person;
