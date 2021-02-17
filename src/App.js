import "./styles.css";
import { Component } from "react";
import { evaluate } from "mathjs";

export default class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputStr: "0",
      result: false
    };
    this.handleNum = this.handleNum.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.equals = this.equals.bind(this);
    this.clear = this.clear.bind(this);
  }

  // handles concatenating numbers to the end of inputStr when a number key is clicked
  handleNum(event) {
    this.setState((state) => {
      if (event.target.innerHTML === "0" && state.inputStr === "0") {
        return state;
      } else if (
        event.target.innerHTML !== "0" &&
        (state.inputStr === "0" || state.result)
      ) {
        return { inputStr: event.target.innerHTML, result: false };
      } else {
        return { inputStr: state.inputStr + event.target.innerHTML };
      }
    });
  }

  // handles concatenating an operator (+-×÷) to the end of inputStr when an operator key is clicked
  handleOperator(event) {
    // if the last char in inputStr is a number (otherwise expression wouldn't make sense),
    // concatenate the operator onto inputStr.
    // the question mark means that if this.state.inputStr[0] is null, it won't throw
    // an error.
    this.setState((state) => {
      if (
        state.inputStr[state.inputStr.length - 1]?.match(/\d/) ||
        (state.inputStr[state.inputStr.length - 1]?.match(/[+-×÷]/) &&
          event.target.innerHTML === "-")
      ) {
        return {
          inputStr: state.inputStr + event.target.innerHTML,
          result: false
        };
      } else if (state.inputStr.match(/\d[+-×÷]{2}$/)) {
        state.inputStr = state.inputStr.slice(0, -2);
        return {
          inputStr: state.inputStr + event.target.innerHTML,
          result: false
        };
      } else if (state.inputStr.match(/[+-×÷]{1}$/)) {
        state.inputStr = state.inputStr.slice(0, -1);
        return {
          inputStr: state.inputStr + event.target.innerHTML,
          result: false
        };
      }
    });
  }

  // handles concatenating '.' onto inputStr when decimal key is pressed
  handleDecimal(event) {
    if (!this.state.inputStr.match(/\d?\.\d?$/) && !this.state.result) {
      // if there is not already a decimal in the last number, concat a decimal point
      this.setState((state) => {
        return { inputStr: state.inputStr + event.target.innerHTML };
      });
    }
  }

  // evaluated inputStr (which should be a valid mathematical expression) using MathJS
  equals() {
    this.setState((state) => {
      // create a copy of inputStr to work on
      let evalStr = this.state.inputStr.slice();

      // if the final char is not a number, strip it
      if (!this.state.inputStr[this.state.inputStr.length - 1].match(/\d/)) {
        evalStr = evalStr.slice(0, -1);
      }

      // create a copy of inputStr and replace ×,÷ with *,/ so that mathjs can evaluate
      evalStr = evalStr.replace("×", "*");
      evalStr = evalStr.replace("÷", "/");

      // sets inputStr to the evaluated evalStr i.e. displays the result of the expression
      return {
        inputStr: evaluate(evalStr).toString(),
        result: true
      };
    });
  }

  // sets inputStr back to default when clear key is pressed
  clear() {
    this.setState({ inputStr: "0" });
  }

  render() {
    return (
      <div className="calculator">
        <div className="grid">
          <div id="display">{this.state.inputStr}</div>
          <div className="btn btn-operator" id="equals" onClick={this.equals}>
            =
          </div>
          <div className="btn btn-num" id="zero" onClick={this.handleNum}>
            0
          </div>
          <div className="btn btn-num" id="one" onClick={this.handleNum}>
            1
          </div>
          <div className="btn btn-num" id="two" onClick={this.handleNum}>
            2
          </div>
          <div className="btn btn-num" id="three" onClick={this.handleNum}>
            3
          </div>
          <div className="btn btn-num" id="four" onClick={this.handleNum}>
            4
          </div>
          <div className="btn btn-num" id="five" onClick={this.handleNum}>
            5
          </div>
          <div className="btn btn-num" id="six" onClick={this.handleNum}>
            6
          </div>
          <div className="btn btn-num" id="seven" onClick={this.handleNum}>
            7
          </div>
          <div className="btn btn-num" id="eight" onClick={this.handleNum}>
            8
          </div>
          <div className="btn btn-num" id="nine" onClick={this.handleNum}>
            9
          </div>
          <div
            className="btn btn-operator"
            id="add"
            onClick={this.handleOperator}
          >
            +
          </div>
          <div
            className="btn btn-operator"
            id="subtract"
            onClick={this.handleOperator}
          >
            -
          </div>
          <div
            className="btn btn-operator"
            id="multiply"
            onClick={this.handleOperator}
          >
            ×
          </div>
          <div
            className="btn btn-operator"
            id="divide"
            onClick={this.handleOperator}
          >
            ÷
          </div>
          <div
            className="btn btn-operator"
            id="decimal"
            onClick={this.handleDecimal}
          >
            .
          </div>
          <div className="btn btn-operator" id="clear" onClick={this.clear}>
            Clear
          </div>
        </div>
      </div>
    );
  }
}
