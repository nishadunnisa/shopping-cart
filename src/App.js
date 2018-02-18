import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemoveAll = this.handleRemoveAll.bind(this);
    this.handleAddOptions = this.handleAddOptions.bind(this);

    this.state = {
      options: []
    };
  }

  handleRemoveAll() {
    this.setState({ options: [] });
  }

  handleAddOptions(option) {

    if (!option) {                                           //if there is no string
      return 'Enter valid option to add list';
    } else if (this.state.options.indexOf(option) > 1) {
      return 'This option already exists';
    }

    this.setState((prevState) => {
      return {
        options: prevState.options.concat([option])
      };
    });
  }

  render() {
    return (
      <div>
        <Header />
        <AddOption handleAddOptions={this.handleAddOptions} />
        <Options
          options={this.state.options}
          handleRemoveAll={this.handleRemoveAll}
        />
      </div>
    );
  }
}

class Header extends React.Component {
  render() {
    return (
      <div>
        <h1>Shopping-Cart</h1>
      </div>
    );
  }
}

class AddOption extends React.Component {

  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.state = {
      error: undefined
    };
  }

  handleFormSubmit(e) {
    e.preventDefault();

    const option = e.target.elements.option.value.trim(); //trim will fix spaces
    const error = this.props.handleAddOptions(option);
    this.setState({ error: error });

  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleFormSubmit}>
          <input type="text" name="option" onChange={(e) => this.handleChange(e)} />
          <button>Add List</button>
        </form>
      </div>
    );
  }
}

class Options extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.props.handleRemoveAll}>Remove All</button>
        {
          this.props.options.map((option, i) =>
            (<Option key={i} optionText={option} />))
        }
      </div>
    );
  }
}

class Option extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li>{this.props.optionText}</li>
        </ul>
      </div>
    );
  }
}

export default App;
