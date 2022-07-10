import "./App.css";
import { useState } from "react";
import Footer from "./components/Footer";

function App() {
  const [data, setData] = useState({
    value: null,
    displayValue: "0",
    operator: null,
    waiting: false,
  });

  const inputDot = () => {
    if (data.displayValue.includes(".")) {
    } else {
      setData((prevData) => ({
        ...prevData,
        displayValue: data.displayValue + ".",
      }));
    }
  };

  const inputDigit = (digit) => {
    if (data.waiting) {
      setData((prevData) => ({
        ...prevData,
        displayValue: String(digit),
        waiting: false,
      }));
    } else {
      data.displayValue === "0"
        ? setData((prevData) => ({ ...prevData, displayValue: String(digit) }))
        : setData((prevData) => ({
            ...prevData,
            displayValue: data.displayValue + String(digit),
          }));
    }
  };

  //Operations
  const Operations = {
    Divison: (prevValue, nextValue) => prevValue / nextValue,
    Multiply: (prevValue, nextValue) => prevValue * nextValue,
    Rest: (prevValue, nextValue) => prevValue - nextValue,
    Plus: (prevValue, nextValue) => prevValue + nextValue,
    Equal: (prevValue, nextValue) => nextValue,
  };

  //Invert Handler
  const invertHandler = () => {
    setData((prevData) => ({
      ...prevData,
      displayValue: (parseFloat(data.displayValue) * -1).toString(),
    }));
  };

  //Percent Handler
  const percentHandler = () => {
    setData((prevData) => ({
      ...prevData,
      displayValue: (parseFloat(data.displayValue) / 100).toString(),
    }));
  };

  const doOperation = (newMode) => {
    if (data.operator === null) {
      setData({
        ...data,
        value: parseFloat(data.displayValue),
        operator: newMode,
        waiting: true,
      });
    } else if (data.operator === newMode) {
      // We don't do anything
    } else if (data.operator) {
      const inputValue = parseFloat(data.displayValue);
      const newValue = Operations[data.operator](data.value, inputValue);
      setData(() => ({
        value: newValue,
        displayValue: String(newValue),
        operator: newMode,
        waiting: true,
      }));
    }
  };

  const deleteButtom = data.displayValue === "0" ? "AC" : "C";

  const deleteButtomHandler = () => {
    setData({ value: null, displayValue: "0", operator: null, waiting: false });
  };

  const DisplayValue = () => {
    if (data.displayValue > 99999999 || data.displayValue < -99999999) {
      return "Exceeded";
    } else {
      return data.displayValue;
    }
  };

  return (
    <div className="App">
      <div className="mainContainer">
        <div className="result">
          <DisplayValue />
        </div>
        <div
          className="ac buttom"
          onClick={() => {
            deleteButtomHandler();
          }}
        >
          {deleteButtom}
        </div>
        <div className="invert buttom" onClick={() => invertHandler()}>
          ±
        </div>
        <div className="percent buttom" onClick={() => percentHandler()}>
          %
        </div>
        <div
          className="division buttom"
          onClick={() => doOperation("Division")}
        >
          ÷
        </div>
        <div className="seven buttom" onClick={() => inputDigit(7)}>
          7
        </div>
        <div className="eigth buttom" onClick={() => inputDigit(8)}>
          8
        </div>
        <div className="nine buttom" onClick={() => inputDigit(9)}>
          9
        </div>
        <div
          className="multiply buttom"
          onClick={() => doOperation("Multiply")}
        >
          x
        </div>
        <div className="four buttom" onClick={() => inputDigit(4)}>
          4
        </div>
        <div className="five buttom" onClick={() => inputDigit(5)}>
          5
        </div>
        <div className="six buttom" onClick={() => inputDigit(6)}>
          6
        </div>
        <div className="rest buttom" onClick={() => doOperation("Rest")}>
          -
        </div>
        <div className="one buttom" onClick={() => inputDigit(1)}>
          1
        </div>
        <div className="two buttom" onClick={() => inputDigit(2)}>
          2
        </div>
        <div className="three buttom" onClick={() => inputDigit(3)}>
          3
        </div>
        <div className="plus buttom" onClick={() => doOperation("Plus")}>
          +
        </div>
        <div className="zero buttom" onClick={() => inputDigit(0)}>
          0
        </div>
        <div className="dot buttom" onClick={() => inputDot()}>
          .
        </div>
        <div className="equal buttom" onClick={() => doOperation("Equal")}>
          =
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default App;
