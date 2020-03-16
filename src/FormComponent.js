import React from "react";
import {Col, Container, Form, FormControl, InputGroup, Row, ButtonGroup, Button} from "react-bootstrap";
import {languages} from "./calculators";
import PropTypes from 'prop-types';
import './App.css'

function FormComponent({onChangeHandler, setTextLength, textLength, setLanguage, language, price, time}) {
    return (
        <Container>
            <Row>
                <h1>Text correction</h1>
            </Row>
            <Row>
                <Form>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>Type your text</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            onKeyUp={e => onChangeHandler(setTextLength, e.target.value.length)}
                            as="textarea"
                            rows='5'
                            aria-label="With textarea"/>
                    </InputGroup>
                    <Row className={'textLength'}>{textLength}</Row>
                    <InputGroup className={'radioInputGroup'}>
                        <InputGroup.Prepend>
                            <InputGroup.Text>Select the language</InputGroup.Text>
                        </InputGroup.Prepend>
                        <ButtonGroup aria-label="Basic example">
                            {languages.map((lang, index) => {
                                return (
                                    <Button variant={language === lang ? 'primary' : "outline-primary"}
                                            key={index}
                                            value={lang}
                                            onClick={e => onChangeHandler(setLanguage, e.target.value)}
                                            onFocus={e => onChangeHandler(setLanguage, e.target.value)}
                                    >{lang}</Button>
                                )
                            })}
                        </ButtonGroup>
                    </InputGroup>
                    <Form.Group as={Row}>
                        <Col sm={{span: 10}}>
                            <Row>
                                <div className='price'>{price.toFixed(2)}&#8372;</div>
                            </Row>
                            <Row>
                                <div className='time'
                                ><span hidden={!price}>Text will be ready on {time} </span></div>
                            </Row>
                        </Col>
                    </Form.Group>
                </Form>
            </Row>
        </Container>
    )
}

FormComponent.propTypes = {
    onChangeHandler: PropTypes.func.isRequired,
    setTextLength: PropTypes.func.isRequired,
    textLength: PropTypes.number.isRequired,
    setLanguage: PropTypes.func.isRequired,
    language: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired
};

FormComponent.defaultProps = {
    textLength: 0,
    language: '',
    price: 0,
    time: ''
};

export default FormComponent;
