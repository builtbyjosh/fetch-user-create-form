import React from 'react';
import { Button, Form, Col, Row, Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import dogImage from '../images/dog.jpg';

const SignupForm = () => {
  const navigate = useNavigate();
  const {
    state: { formData },
  } = useLocation();
  console.log(formData);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    let signupData = {
      name: data.name,
      email: data.email,
      password: data.password,
      occupation: data.occupation,
      state: data.state,
    };
    try {
      await axios({
        method: 'post',
        url: 'https://frontend-take-home.fetchrewards.com/form',
        data: signupData,
      }).then((res) => {
        console.log('RES: ', res);
        if (res.status === 201) {
          navigate('/success', { state: { userData: res.data } });
        }
      });
    } catch (error) {
      console.error(error);
    }
  });

  const backgroundImageStyles = {
    backgroundImage: `url(${dogImage})`,
    backgroundSize: 'cover',
    height: '100vh',
    backgroundPosition: 'center',
  };

  return (
    <Container fluid>
      <Row className="d-flex justify-content-center align-items-center vh-100">
        <Col>
          <Row className=" align-items-center">
            <Col
              md="6"
              className="d-none d-md-block "
              style={backgroundImageStyles}
            ></Col>

            <Col md="6" className="px-md-3 px-sm-1 ">
              <h2 className="fw-bold mb-4 text-center">Sign Up</h2>
              <form onSubmit={onSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="John Doe"
                    name="name"
                    {...register('name', { required: true })}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="johndoe@example.com"
                    name="email"
                    {...register('email', { required: true })}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="totallyNotPassword1"
                    name="password"
                    {...register('password', { required: true })}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="totallyNotPassword1"
                    name="confirmPassword"
                    {...register('confirmPassword', {
                      required: true,
                      validate: (value) => value === getValues('password'),
                    })}
                  />
                  {errors.confirmPassword &&
                    errors.confirmPassword.type === 'validate' && (
                      <div style={{ color: 'red', fontSize: '12px' }}>
                        Passwords do not match
                      </div>
                    )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Occupation</Form.Label>
                  <Form.Select {...register('occupation', { required: true })}>
                    <option value="">Pick an Occupation</option>
                    {formData &&
                      formData.occupations.map((occupation, index) => {
                        return <option key={index}>{occupation}</option>;
                      })}
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} sm className="mb-3">
                  <Form.Label>State</Form.Label>
                  <Form.Select {...register('state', { required: true })}>
                    <option value="">Pick a State</option>
                    {formData &&
                      formData.states.map((state, index) => {
                        return (
                          <option key={index} value={state.name}>
                            {state.abbreviation} - {state.name}
                          </option>
                        );
                      })}
                  </Form.Select>
                </Form.Group>

                <Button onClick={(e) => handleSubmit(e)} type="submit">
                  Submit
                </Button>
              </form>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupForm;
