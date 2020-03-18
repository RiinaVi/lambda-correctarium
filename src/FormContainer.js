import React, {useEffect, useState} from "react";
import {calculateDeadline, calculatePrice, calculateTime} from "./calculators";
import FormComponent from "./FormComponent";


export default function FormContainer() {
    const [time, setTime] = useState('');
    const [price, setPrice] = useState(0);
    const [language, setLanguage] = useState('Ukrainian');
    const [textLength, setTextLength] = useState(0);

    function onChangeHandler(setter, value) {
        setter(value);
    }

    useEffect(()=>{
        setPrice(calculatePrice(textLength, language));
        setTime(calculateDeadline(calculateTime(textLength, language)))
    }, [textLength, language]);

    return(
        <FormComponent
            onChangeHandler={onChangeHandler}
            setTextLength={setTextLength}
            textLength={textLength}
            setLanguage={setLanguage}
            language={language}
            price={price}
            time={time}
        />
    )
}
