import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemoveAll = this.handleRemoveAll.bind(this);
    this.handleAddOptions = this.handleAddOptions.bind(this);

    this.state = {
      options: ['one', 'two', 'three', 'four']
    };
  }

  handleRemoveAll() {
    this.setState(() => {
      return {
        options: []
      };
    });
  }

  handleAddOptions(option) {
    //console.log(option);
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
          handleRemoveAll={this.handleRemoveAll} />
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

  handleFormSubmit(e) {
    e.preventDefault();

    const option = e.target.elements.option.value.trim(); //trim will fix spaces
    //console.log(option);
    if (option) {
      this.props.handleAddOptions(option);
    }
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit.bind(this)}>
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
