import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import app from "../../firebase.init";
import "./LogIn.css";
const auth = getAuth(app);

const LogIn = () => {
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);

  const handleEmailBlur = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordBlur = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = (event) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        console.log(error);
      });
    event.preventDefault();
  };
  return (
    <div className="w-50 mx-auto mt-2 login">
      <h1 className="text-primary text-center">Log In</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onBlur={handleEmailBlur}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onBlur={handlePasswordBlur}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Log In
        </Button>
      </Form>
    </div>
  );
};

export default LogIn;
