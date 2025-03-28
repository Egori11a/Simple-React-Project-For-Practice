import React, { useEffect, useState, useRef } from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('RUB');
    const [fromPrice, setFromPrice] = useState(1);
    const [toPrice, setToPrice] = useState(0);
    const [lastChangedInput, setLastChangedInput] = useState('from');
    const ratesRef = useRef({});

    useEffect(() => {
        fetch('https://v6.exchangerate-api.com/v6/240808c13ece5632c4b0c398/latest/USD')
            .then((res) => res.json())
            .then((json) => {
                ratesRef.current = json.conversion_rates;
                onChangeFromPrice(1);
            })
            .catch((err) => console.error(err));
    }, []);

    const onChangeFromPrice = (value) => {
        setLastChangedInput('from');
        const usdPrice = value / ratesRef.current[fromCurrency];
        const result = usdPrice * ratesRef.current[toCurrency];
        setFromPrice(value);
        setToPrice(parseFloat(result.toFixed(2)));
    };

    const onChangeToPrice = (value) => {
        setLastChangedInput('to');
        const usdPrice = value / ratesRef.current[toCurrency];
        const result = usdPrice * ratesRef.current[fromCurrency];
        setToPrice(value);
        setFromPrice(parseFloat(result.toFixed(2)));
    };

    useEffect(() => {
        if (lastChangedInput === 'from') {
            onChangeFromPrice(fromPrice);
        } else {
            onChangeToPrice(toPrice);
        }
    }, [fromCurrency, toCurrency]);

    return (
        <div className="App">
            <Block
                value={fromPrice}
                currency={fromCurrency}
                onChangeCurrency={setFromCurrency}
                onChangeValue={onChangeFromPrice}
            />
            <Block
                value={toPrice}
                currency={toCurrency}
                onChangeCurrency={setToCurrency}
                onChangeValue={onChangeToPrice}
            />
        </div>
    );
}

export default App;
