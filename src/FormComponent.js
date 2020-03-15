import React from "react";
import {Col, Container, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import {languages} from "./calculators";
import './App.css'

export default function FormComponent({onChangeHandler, setTextLength, setLanguage, price, time}) {
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
                    <InputGroup className={'radioInputGroup'}>
                        <InputGroup.Prepend>
                            <InputGroup.Text>Select the language</InputGroup.Text>
                        </InputGroup.Prepend>
                        <div className={'radioButtons'}>
                            {languages.map((lang, index) => {
                                return (
                                    <div key={index}>
                                        <input
                                            type="radio"
                                            id={'radio' + index}
                                            name="formHorizontalRadios"
                                            defaultChecked={true}
                                            value={lang}
                                            onClick={e => onChangeHandler(setLanguage, e.target.value)}
                                            onFocus={e => onChangeHandler(setLanguage, e.target.value)}
                                        />
                                        <label key={index} htmlFor={'radio' + index}>{lang}</label>
                                    </div>
                                )
                            })}
                        </div>
                    </InputGroup>
                    <Form.Group as={Row}>
                        <Col sm={{span: 10}}>
                            <Row>
                                <div className='price'>{price.toFixed(2)}&#8372;</div>
                            </Row>
                            <Row>
                                <div className='time'
                                     hidden={!price}
                                >Text will be ready on {time}</div>
                            </Row>
                        </Col>
                    </Form.Group>
                </Form>
            </Row>
        </Container>
    )
}
