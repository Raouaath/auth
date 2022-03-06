import React from "react";
import { useDispatch } from "react-redux";
import {
  Modal,
  Button,
  Form,
  InputGroup,
  Dropdown,
  SplitButton,
} from "react-bootstrap";
import { useState } from "react";
import { registerHandler } from "../../js/Actions/authActions";

export default function Example() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const dispatch = useDispatch();
  const registerUser = (e) => {
    e.preventDefault();
    const newUser = { name, email, password };
    dispatch(registerHandler(newUser));
    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        SignUp
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>user Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                onChange={(e) => setname(e.target.value)}
              />

              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setemail(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setpassword(e.target.value)}
              />
              <InputGroup className="mb-3">
                <SplitButton
                  variant="outline-secondary"
                  title="Role"
                  id="segmented-button-dropdown-2"
                  alignRight
                >
                  <Dropdown.Item href="#">Client</Dropdown.Item>
                  <Dropdown.Item href="#">User</Dropdown.Item>

                  <Dropdown.Divider />
                </SplitButton>
              </InputGroup>
            </Form.Group>

            <Button variant="primary" type="submit" onClick={registerUser}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
