import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Container, Col, Row, Button } from 'react-bootstrap';
import dogImage from '../images/dog3.jpg';
const UserCreatedPage = () => {
  const {
    state: { userData },
  } = useLocation();
  const navigate = useNavigate();
  if (!userData) {
    navigate('/');
  }
  const backgroundImageStyles = {
    backgroundImage: `url(${dogImage})`,
    backgroundSize: 'cover',
    height: '100vh',
  };

  return (
    <Container fluid className="bg-dark" style={backgroundImageStyles}>
      <Row className="d-flex justify-content-center align-items-center vh-100">
        <Col md={5}>
          <Card className="mx-4">
            <Card.Body>
              <Card.Title as='h2'>Welcome {userData.name} from {userData.state}!</Card.Title>
              <Card.Text>
                Thanks for signing up with Fetch! We will be sure to send any new updates to {userData.email}
              </Card.Text>
              <Card.Text>
                Especially if it is about... What is it you do again? Oh yeah! You are a {userData.occupation}!
              </Card.Text>
              <Button onClick={()=> navigate('/')}>Head Home</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}></Col>
      </Row>
    </Container>
  );
};

export default UserCreatedPage;
