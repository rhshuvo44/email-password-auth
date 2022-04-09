import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword
} from "firebase/auth";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import app from "../../firebase.init";
import "./LogIn.css";
const auth = getAuth(app);

const LogIn = () => {
  const [validated, setValidated] = useState(false);
  const [registered, setregistered] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailBlur = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordBlur = (event) => {
    setPassword(event.target.value);
  };
  const handleCheck = (event) => {
    setregistered(event.target.checked);
  };
  const handleSubmit = (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    setValidated(true);

    if (registered) {
      signInWithEmailAndPassword(auth, email, password)
        .then((result) => {
          const user = result.user;
          console.log(user);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          emailVarification();
        })
        .catch((error) => {
          console.log(error);
        });
    }
    const handlePasswordReset=()=>{
      sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // ..
        console.log('reset');
      })
    }
    const emailVarification = () => {
      sendEmailVerification(auth.currentUser).then(() => {
        // Email verification sent!
        console.log("sent");
        // ...
      });
    };
   
    event.preventDefault();
  };
  return (
    <div className="w-50 mx-auto mt-2 login">
      <h1 className="text-primary text-center">
        {registered ? "Log In" : "Sign Up"}
      </h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onBlur={handleEmailBlur}
            type="email"
            placeholder="Enter email"
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid Email.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onBlur={handlePasswordBlur}
            type="password"
            placeholder="Password"
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid Password.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            onChange={handleCheck}
            type="checkbox"
            label="All ready registered"
          />
        </Form.Group>
        <Button onClick={handlePasswordReset} variant="link">Password Rest</Button>
        <br />
        <Button variant="primary" type="submit">
          {registered ? "Log In" : "Sign Up"}
        </Button>
      </Form>
    </div>
  );
};

export default LogIn;
