import React from 'react';
import { Container, Row, Col, InputGroup, FormControl, Form, Button } from 'react-bootstrap'
import './LoginPage.css'

export default function LoginPage(props) {
    return (
        <Container>
            <Row>
                <Col md={{ span: 2, offset: 5}}>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}