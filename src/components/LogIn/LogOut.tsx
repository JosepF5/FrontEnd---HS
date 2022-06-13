import { useDispatch, useSelector } from "react-redux";
import Button from 'react-bootstrap/Button';
import { logOutInReducer } from "../../features/loggedInSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

function LogOut() {
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const logOutButton = () => {
    dispatch(logOutInReducer())
    navigate('/welcome')
  }
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    logOutButton();
  };
  const handleShow = () => setShow(true);

    return (
        <>
      <Button variant="danger" onClick={handleShow}>
      Log Out
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Log Out</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to log out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Back
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Exit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default LogOut
