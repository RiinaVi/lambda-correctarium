import React, {useEffect, useState} from "react";
import {Form, Row, Col, Container, InputGroup, FormControl} from 'react-bootstrap'
import {languages, timeCalculator, priceCalculator, deadlineCalculator} from "./calculators";
import './App.css'


export default function FormComponent() {

    const [time, setTime] = useState([]);
    const [price, setPrice] = useState(0);
    const [language, setLanguage] = useState('Ukrainian');
    const [textLength, setTextLength] = useState(0);

    function onChangeHandler(setter, value) {
        setter(value);
    }

    useEffect(()=>{
        setPrice(priceCalculator(textLength, language));
        setTime(deadlineCalculator(timeCalculator(textLength, language)))
    }, [textLength, language]);


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
                                <div className='time' hidden={!price}>It will be ready in {time}</div>
                            </Row>
                        </Col>
                    </Form.Group>
                </Form>
            </Row>
        </Container>
    )
}
