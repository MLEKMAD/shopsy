import React, { Component } from 'react'
import * as yup from 'yup'
import { Formik } from 'formik';
import { Container, InputGroup, Button, Form } from 'react-bootstrap';
import ApiService from '../../../utils/Api';

const schema = yup.object({
    email: yup
        .string()
        .email()
        .required(),
    password: yup
        .string()
        .required()
        .min(6, 'Seems a bit short'),
})


export class SignIn extends Component {
    async login(payload) {
        const myApi = new ApiService();
        const data = await myApi.post('/users/sign-up',payload);
        console.log(data);
    }

    render() {
        return (
            <Formik
                validationSchema={schema}
                onSubmit={this.login}
            >
                {({
                    handleSubmit,
                    handleChange,
                    values,
                    errors,
                }) => (
                        <Container>
                            <Form noValidate onSubmit={handleSubmit}>
                                <Form.Group controlId="validationFormikEmail">
                                    <Form.Label>email</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                            type="text"
                                            placeholder="user@company.com"
                                            aria-describedby="inputGroupPrepend"
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            isInvalid={!!errors.email}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group controlId="validationFormikPassword">
                                    <Form.Label>Password</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="password"
                                            aria-describedby="inputGroupPrepend"
                                            name="password"
                                            value={values.password}
                                            onChange={handleChange}
                                            isInvalid={!!errors.password}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.password}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                                <Button type="submit">Login</Button>
                            </Form>
                        </Container>
                    )}


            </Formik>
        )
    }
}

export default SignIn
