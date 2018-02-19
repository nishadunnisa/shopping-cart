import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemoveAll = this.handleRemoveAll.bind(this);
    this.handleAddOptions = this.handleAddOptions.bind(this);
    this.handleRemoveOption = this.handleRemoveOption.bind(this);
    this.state = {
      options: []
    };
  }

  componentDidMount() {
    //console.log('component mounting');
    const options = JSON.parse(localStorage.getItem('options'));
    this.setState({ options });
  }

  componentDidUpdate() {
    // console.log('component updated or saving data');
    localStorage.setItem('options', JSON.stringify(this.state.options));
  }

  handleRemoveAll() {
    this.setState({ options: [] });
  }

  handleRemoveOption(optionToRemove) {
    this.setState((prevState) => ({
      options: prevState.options.filter((option) => option !== optionToRemove)
    }));
  }

  handleAddOptions(option) {

    if (!option) {                                           //if there is no string
      return 'Enter valid option to add list';
    } else if (this.state.options.indexOf(option) > 1) {
      return 'This option already exists';
    }
    this.setState((prevState) => ({ options: prevState.options.concat([option]) }));
  }

  render() {
    return (
      <div>
        <Header />
        <AddOption handleAddOptions={this.handleAddOptions} />
        <Options
          options={this.state.options}
          handleRemoveAll={this.handleRemoveAll}
          handleRemoveOption={this.handleRemoveOption}
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
        {this.props.options.length === 0 && <p>Please add list to get started</p>}
        {
          this.props.options.map((option, i) =>
            (<Option
              key={i}
              optionText={option}
              handleRemoveOption={this.props.handleRemoveOption}
            />))
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

          <button onClick={() => {
            this.props.handleRemoveOption(this.props.optionText)
          }}>
            Remove
          </button>
        </ul>
      </div>
    );
  }
}

export default App;
