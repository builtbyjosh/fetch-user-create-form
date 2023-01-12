import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Col, Row, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import dogImage from '../images/dog2.jpg';

const Homepage = () => {
  const [formData, setFormData] = useState();
  const navigate = useNavigate();

  // Fetch States and occupations
  const fetchedData = async () => {
    let formInfo = await axios.get(
      'https://frontend-take-home.fetchrewards.com/form'
    );
    setFormData(formInfo.data);
  };

  useEffect(() => {
    fetchedData();
  }, []);

  const userSignup = () => {
    navigate('/signup', { state: { formData: formData } });
  };

  const backgroundImageStyles = {
    backgroundImage: `url(${dogImage})`,
    backgroundSize: 'cover',
    height: '100vh',
    backgroundPosition: 'center'
  };

  return (
    <Container fluid style={backgroundImageStyles}>
      <Row className="d-flex justify-content-center align-items-center vh-100">
        <Col className="text-center">
          <h4 className="mb-4">Welcome to Fetch</h4>
          <h1 className="mb-5">Its Nice to Meet You</h1>
          <Button
            disabled={formData !== undefined ? false : true}
            onClick={userSignup}
          >
            Sign Up
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Homepage;
