import React from "react";
import ReactDOM from "react-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Badge from "react-bootstrap/Badge";
import { ArrowRight } from "react-bootstrap-icons";
import { marked } from "marked";

class Preview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: `# THIS IS HEADING`,
    };

    this.updateInput = this.updateInput.bind(this);
  }
  updateInput(e) {
    this.setState({
      input: e.target.value,
    });
  }
  render() {
    const inputStyle = {
      width: "400px",
      height: "50vh",
      margin: "auto",
      padding: "10px",
    };

    const outputStyle = {
      width: "400px",
      height: "50vh",
      margin: "auto",
      backgroundColor: "#DCDCDC",
      padding: "10px",
    };
    return (
      <>
        <div className="Preview">
          <div className="container">
            <div className="row">
              <div className="col text-center">
                <h1>
                  <Badge className="text-align-center" variant="dark">
                    Markdown Previewer
                  </Badge>
                </h1>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-4">
                <div className="col text-center">
                  <h4>
                    <Badge className="text-align-center" variant="secondary">
                      Input
                    </Badge>
                  </h4>
                  <div className="mark-input">
                    <textarea id="editor" className="input" style={inputStyle} value={this.state.input} onChange={this.updateInput}></textarea>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="col text-center">
                  <ArrowRight color="royalblue" size={50} />
                </div>
              </div>
              <div className="col-md-4">
                <div className="col text-center">
                  <h4>
                    <Badge className="text-align-center" variant="secondary">
                      Output
                    </Badge>
                  </h4>
                </div>
                <div id="preview" style={outputStyle} dangerouslySetInnerHTML={{ __html: marked(this.state.input) }}></div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Preview />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
