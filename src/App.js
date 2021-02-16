import "./styles.css";
import { Component } from "react";
import { evaluate } from "mathjs";

export default class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputStr: "0"
    };
    this.handleNum = this.handleNum.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.equals = this.equals.bind(this);
    this.clear = this.clear.bind(this);
  }

  // handles concatenating numbers to the end of inputStr when a number key is clicked
  handleNum(event) {
    if (event.target.innerHTML === "0" && this.state.inputStr === "0") {
      // if '0' is clicked and inputStr is just '0', does not do anything (so can't type '00')
      this.setState((state) => state);
    } else if (event.target.innerHTML !== "0" && this.state.inputStr === "0") {
      // else if any other number is clicked and inputStr is just '0', replaces '0' with the number
      this.setState((state) => {
        return { inputStr: event.target.innerHTML };
      });
    } else {
      // else just concatenate the clicked number onto the end of inputStr
      this.setState((state) => {
        return { inputStr: state.inputStr + event.target.innerHTML };
      });
    }
  }

  // handles concatenating an operator (+-×÷) to the end of inputStr when an operator key is clicked
  handleOperator(event) {
    if (this.state.inputStr[0].match(/\d/)) {
      // if the last char in inputStr is a number (otherwise expression wouldn't make sense),
      // concatenate the operator onto inputStr
      this.setState((state) => {
        return { inputStr: state.inputStr + event.target.innerHTML };
      });
    }
  }

  // handles concatenating '.' onto inputStr when decimal key is pressed
  // BUG: does not allow '.' to be added if a '.' exists anywhere in expression
  // should just be if there is already a '.' in the current number
  handleDecimal(event) {
    if (
      this.state.inputStr.indexOf(".") === -1 &&
      this.state.inputStr[this.state.inputStr.length - 1].match(/\d/)
    ) {
      // if there is no dot already in expression, add a '.' to the end
      this.setState((state) => {
        return { inputStr: state.inputStr + event.target.innerHTML };
      });
    }
  }

  // evaluated inputStr (which should be a valid mathematical expression) using MathJS
  equals() {
    // BUG: this is not working
    let scope = {
      "×": "*",
      "÷": "/"
    };
    this.setState((state) => ({
      inputStr: evaluate(this.state.inputStr, scope)
    }));
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
            −
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
