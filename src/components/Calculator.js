/* eslint-disable no-eval */
/* eslint-disable no-useless-escape */
/* eslint-disable no-template-curly-in-string */
import React, { useState, useEffect } from "react";
import { Input, Button } from "antd";
import styled from "styled-components";

import { REG_EXP, breakVariable } from "../utils";
import FormulaPreview from "./FormulaPreview";

const CalculatorWrapper = styled.section`
  width: 500px;
  // margin: 0 auto;
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  text-align: center;
  background: #f9f9f9;
  border-radius: 10px;
  padding: 30px 15px;
  h3.formula,
  h3.variables,
  h3.preview,
  .formula-result {
    margin-top: 25px;
    text-align: center;
    text-transform: uppercase;
    color: grey;
    font-weight: bold;
  }
  .formula-input {
    width: 300px;
    margin: 0 auto;
    display: block;
  }
  .variable-input {
    width: 40%;
    margin: 10px auto;
    span {
      margin-right: 5px;
      text-align: center;
      text-transform: uppercase;
      color: grey;
      font-size: 0.8rem;
    }
    input {
      width: 70px;
    }
  }
  .formula-preview {
    display: block;
    text-transform: uppercase;
    .variable {
      padding: 1px 3px;
      font-size: 0.8rem;
      border-radius: 5px;
      background: tomato;
    }
    .operator {
      padding: 1px 3px;
    }
    .constant {
      padding: 1px 3px;
    }
  }
`;

const Calculator = () => {
  const [formula, setFormula] = useState("${var1:key1} * 100");
  const [variables, setVariables] = useState([]);
  const [result, setResult] = useState(null);
  const [inputData, setInputData] = useState({});

  useEffect(() => {
    const extractVariables = () => {
      const tokens = formula.split(" ");
      const result = [];
      tokens.forEach(token => {
        if (token.match(REG_EXP.INPUT)) {
          const { key, placeholder } = breakVariable(token);
          result.push({ key, placeholder });
        }
      });
      setVariables(result);
    };
    extractVariables();
  }, [formula]);

  const setInput = (key, value) =>
    setInputData(prev => ({ ...prev, [key]: value }));

  const calculate = () => {
    const variables = formula.match(REG_EXP.INPUT);
    console.log("matched variables:", variables);
    let expression = formula;
    variables.forEach(variable => {
      const { key } = breakVariable(variable);
      const variableValue = inputData[key];
      expression = expression.replace(variable, variableValue);
    });
    console.log("final expression:", expression);
    setResult(eval(expression));
  };

  return (
    <CalculatorWrapper id="calculator">
      <h3 className="formula">Formula</h3>
      <Input
        className="formula-input"
        value={formula}
        onChange={({ target: { value } }) => setFormula(value)}
      />
      <h3 className="variables">Variables</h3>
      {variables.map(({ key, placeholder }, i) => (
        <div className="variable-input" key={i}>
          <span>{placeholder}</span>
          <Input
            placeholder={placeholder.toUpperCase()}
            value={inputData[key]}
            onChange={({ target: { value } }) => setInput(key, value)}
          />
        </div>
      ))}
      <h3 className="preview">Formula Preview</h3>
      <span className="formula-preview">
        {<FormulaPreview formula={formula} />}
      </span>
      <h3
        style={{ visibility: `${!!result ? "visible" : "hidden"}` }}
        className="formula-result"
      >
        Result <div>{result}</div>
      </h3>
      <br />
      <Button type="danger" ghost onClick={calculate}>
        Calculate
      </Button>
    </CalculatorWrapper>
  );
};

export default Calculator;
