import * as React from "react";
import {useState} from "react";

const NumberConverter: React.FunctionComponent = () => {
    const [number, setNumber] = useState<string>('');
    const [inBase, setInBase] = useState<number>(10);
    const [outBase, setOutBase] = useState<number>(2);

    const reset = function reset() {
        setNumber('');
        setInBase(10);
        setOutBase(2);
    }

    let output;
    if (number && inBase >= 2 && inBase <= 36 && outBase >= 2 && outBase <= 36) {
        output = parseInt(number, inBase).toString(outBase);
    } else {
        output = '';
    }

    return (
        <div id="number-converter" className="container">
            <form>
                <div className="row">
                    <div className="col-4"></div>
                    <div className="col-4">
                        <label htmlFor="number">Input number:</label>
                        <input id="number" name="number" type="number" value={number} onChange={e => setNumber(e.target.value)} />
                    </div>
                    <div className="col-4"></div>
                </div>
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-4">
                        <label htmlFor="inBase">Input base:</label>
                        <input id="inBase" name="inBase" type="number" min="2" max="36" value={inBase}
                               onChange={e => setInBase(parseInt(e.target.value, 10))} />
                    </div>
                    <div className="col-4">
                        <label htmlFor="inBase">Output base:</label>
                        <input id="outBase" name="outBase" type="number" min="2" max="36" value={outBase}
                               onChange={e => setOutBase(parseInt(e.target.value, 10))} />
                    </div>
                    <div className="col-2"></div>
                </div>
                <div className="row">
                    <div className="col-4"></div>
                    <div className="col-4">
                        <label htmlFor="outputNumber">Result:</label>
                        <input id="outputNumber" name="output" type="text" value={output} disabled />
                    </div>
                    <div className="col-4"></div>
                </div>

                <div className="row">
                    <div className="col">
                        <button id="inBinary" name="inBinary" onClick={e => {setInBase(2); e.preventDefault()}}>Input Binary</button>
                    </div>
                    <div className="col">
                        <button id="inOctal" name="inOctal" onClick={e => {setInBase(8); e.preventDefault()}}>Input Octal</button>
                    </div>
                    <div className="col">
                        <button id="inDecimal" name="inDecimal" onClick={e => {setInBase(10); e.preventDefault()}}>Input Decimal</button>
                    </div>
                    <div className="col">
                        <button id="inHex" name="inHex" onClick={e => {setInBase(16); e.preventDefault()}}>Input Hexadecimal</button>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <button id="outBinary" name="outBinary" onClick={e => {setOutBase(2); e.preventDefault()}}>Output Binary</button>
                    </div>
                    <div className="col">
                        <button id="outOctal" name="outOctal" onClick={e => {setOutBase(8); e.preventDefault()}}>Output Octal</button>
                    </div>
                    <div className="col">
                        <button id="outDecimal" name="outDecimal" onClick={e => {setOutBase(10); e.preventDefault()}}>Output Decimal</button>
                    </div>
                    <div className="col">
                        <button id="outHex" name="outHex" onClick={e => {setOutBase(16); e.preventDefault()}}>Output Hexadecimal</button>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <button id="resetNumbers" name="resetNumbers" onClick={e => {reset(); e.preventDefault()}}>Reset Inputs</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

const TEXT_CONVERSIONS: Record<string, Record<string, any>> = {
    binary: {
        name: "Binary",
        encode: (input: string): string => {
            let output = '';

            for (let char of input) {
                // @ts-ignore
                let bin = char.codePointAt(0).toString(2);
                while (bin.length % 8 !== 0) {
                    bin = '0' + bin;
                }
                if (bin.length > 8) {
                    for (let i = 8; i < bin.length; i += 8) {
                        output += bin.substring(i, i+8) + ' ';
                    }
                } else {
                    output += bin + ' ';
                }
            }

            return output;
        },
        decode: (input: string): string => {
            const characters = input.trim().split(' ');
            const codes = characters.map(char => Number.parseInt(char, 2));

            return String.fromCharCode(...codes);
        },
    },
    hex: {
        name: "Hexadecimal",
        encode: (input: string): string => {
            let output = '';

            for (let char of input) {
                // @ts-ignore
                let hex = char.codePointAt(0).toString(16);
                if (hex.length % 2 !== 0) {
                    hex = '0' + hex;
                }
                if (hex.length > 2) {
                    for (let i = 2; i < hex.length; i += 2) {
                        output += hex.substring(i, i+2) + ' ';
                    }
                } else {
                    output += hex + ' ';
                }
            }

            return output;
        },
        decode: (input: string): string => {
            const characters = input.trim().split(' ');
            const codes = characters.map(char => Number.parseInt(char, 16));

            return String.fromCharCode(...codes);
        },
    },
    base64: {
        name: "Base 64",
        encode: (input: string, setError: (error: string) => void): string => {
            try {
                return btoa(input);
            } catch (e: any) {
                setError(e.message);
                return '';
            }
        },
        decode: (input: string): string => {
            return atob(input);
        },
    },
};

const StringConverter: React.FunctionComponent = () => {
    const [inputText, setInputText] = useState('');
    const [conversion, setConversion] = useState('binary');
    const [outputText, setOutputText] = useState('');

    const [showExplanation, setShowExplanation] = useState(false);
    const [error, setError] = useState('');

    const convert = function encode(direction: string) {
        const convertFunc = TEXT_CONVERSIONS[conversion][direction];
        setOutputText(convertFunc(inputText, setError));
    };

    const conversionOptions: JSX.Element[] = [];
    for (let conversionKey in TEXT_CONVERSIONS) {
        conversionOptions.push(<option value={conversionKey} key={conversionKey}>{TEXT_CONVERSIONS[conversionKey]['name']}</option>)
    }

    const explanationJsx = showExplanation ? (
        <>
            <p>
                The binary and hexadecimal converters use Javascript's built-in String class to represent the input and output,
                and thus will create binary and hexadecimal representations of the <strong>UTF-16</strong> encoding of the
                contents. Since UTF-16 turned out not to be the standard encoding of content on the internet, the results of
                this encoder may not be compatible with other text encoding tools.
            </p>
            <p>
                The Base-64 converter uses Javascript's built-in btoa and atob functions, which are only defined to work
                on characters from the 7-bit ASCII character set.
            </p>
        </>
    ) : <></>;

    return (
        <div className="container" id="string-converter">
            <form onSubmit={e => e.preventDefault()}>
                <div className="row">
                    <p onClick={() => setShowExplanation(!showExplanation)} style={{textDecoration: 'underline dotted grey', cursor: 'pointer', margin: '10px auto'}}>
                        Note: These converters may produce undesirable results when used on characters outside of the standard ASCII set.
                    </p>
                    {explanationJsx}
                </div>
                <div className="row">
                    <div className="col-4"></div>
                    <div className="col-4">
                        <label htmlFor="inputText">Input:</label>
                        <textarea id="inputText" onChange={e => setInputText(e.target.value)} cols={40} rows={5} value={inputText}></textarea>
                    </div>
                    <div className="col-4"></div>
                </div>

                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-4">
                        <label htmlFor="type">Conversion:</label>
                        <select id="type" onChange={e => setConversion(e.target.value)}>
                            {conversionOptions}
                        </select>
                    </div>
                    <div className="col-4">
                        <button onClick={() => convert('encode')}>Encode</button>
                        <button onClick={() => convert('decode')}>Decode</button>
                    </div>
                    <div className="col-2"></div>
                </div>

                <div className="row">
                    <div className="col-3"></div>
                    <div className="col-6">
                        <label htmlFor="outputText">Output:</label>
                        <textarea id="outputText" cols={40} rows={5} value={outputText} readOnly={true}></textarea>
                    </div>
                    <div className="col-3"></div>
                </div>

                <div className="row">
                    {error !== '' ? (
                        <p style={{color: 'red', fontWeight: 'bold', margin: '10px auto'}}>
                            {error}
                        </p>
                    ) : <></>}

                </div>
            </form>
        </div>
    );
};

const BaseConverter: React.FunctionComponent = () => {
    return (
        <div className="content">
            <NumberConverter />
            <hr style={{marginTop: '5rem', marginBottom: '5rem'}} />
            <StringConverter />
        </div>
    );
};

export default BaseConverter;