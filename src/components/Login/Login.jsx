import React from 'react'
import { Alert, Button, Col, Form, Row, Spinner, Container } from 'react-bootstrap'
import './Login.css';

class Login extends React.Component {
    state = {
        newUser: {
            name: '',
            email: ''
        },
        loading: false
    }
   
   
    //updates the fields of the form
    updatenewUserField = (e) => {
        let newUser = { ...this.state.newUser }
        let currentId = e.currentTarget.id
        newUser[currentId] = e.currentTarget.value
        this.setState({ newUser: newUser })
    }


    //post method of the product
    submitnewUser = async (e) => {
        e.preventDefault();
       await localStorage.setItem('name', JSON.stringify(this.state.newUser.name));
       await localStorage.setItem('email', JSON.stringify(this.state.newUser.email));
        this.setState({loading: true})
        this.props.history.push('/exam')
    }


    render() {
        return (
            <>
                {
                    this.state.errMessage ? (
                        <Alert variant="danger" className="mt-5">
                            We encountered a problem with your request
                            {this.state.errMessage}
                        </Alert>

                    ) :
                        (
                            <Container className="pt-5 mt-3 justify-content-center align-items-center text-center" fluid>
                                <h1 className="text-white">Please Login for attending your quiz</h1>
                                <Form className="mt-5 p-3 d-flex justify-content-center align-items-center text-center formproduct" style={{ flexDirection: "column" }} onSubmit={this.submitnewUser}>
                                    <div className="formDiv p-4">
                                        <Col md={12}>
                                            <Form.Group>
                                                <Form.Label htmlFor="name">Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    className="input"
                                                    placeholder="Your name"
                                                    value={this.state.newUser.name}
                                                    onChange={this.updatenewUserField}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={12}>
                                            <Form.Group>
                                                <Form.Label htmlFor="email">email</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    name="email"
                                                    className="input"
                                                    id="email"
                                                    placeholder="email"
                                                    value={this.state.newUser.email}
                                                    onChange={this.updatenewUserField}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Row className="d-flex justify-content-right text-right align-items-right">
                                            <Col>
                                                <Button type="submit" className="addProductButton" >Submit</Button>
                                            </Col>
                                        </Row>
                                    </div>
                                </Form>
                            </Container>
                        )
                }
            </>
        )
    }
}

export default Login