import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: ['one', 'two', 'three', 'four']
    };
  }
  render() {
    return (
      <div>
        <Header />
        <AddOption />
        <Options options={this.state.options} />
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
    console.log(option);
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

  handleRemoveAll() {
    //alert('removed');
    console.log(this.props.options);
  }

  render() {
    return (
      <div>
        <button onClick={this.handleRemoveAll.bind(this)}>Remove All</button>
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
