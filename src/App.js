import React from 'react';
import PropTypes from 'prop-types';

const randomKey = require('random-key');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemoveAll = this.handleRemoveAll.bind(this);
    this.handleAddOptions = this.handleAddOptions.bind(this);
    this.handleRemoveOption = this.handleRemoveOption.bind(this);
    this.handleSortOptions = this.handleSortOptions.bind(this);
    this.handleEditing = this.handleEditing.bind(this);
    this.state = {
      options: props.options
    };
  }

  componentDidMount() {
    console.log('component mounting');
    const options = JSON.parse(localStorage.getItem('options') || {});
    this.setState({ options });
  }

  componentDidUpdate() {
     console.log('component updated or saving data');
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
    } else if (this.state.options.indexOf(option) > -1) {
      return 'This option already exists';
    }
    this.setState((prevState) => ({ options: prevState.options.concat([option]) }));
  }

  handleSortOptions() {
    //console.log('sorting');
    this.setState((prevState) => ({
      options: prevState.options.sort()
    }));
  }

  handleEditing() {
    console.log('editing');
  }

  render() {
    return (
      <div>
        <Header />
        <AddOption handleAddOptions={this.handleAddOptions} />
        <Options
          options={this.state.options}
          handleRemoveOption={this.handleRemoveOption}
          handleEditing={this.handleEditing}
        />
        <Footer
          handleRemoveAll={this.handleRemoveAll}
          handleSortOptions={this.handleSortOptions}
        />
      </div>
    );
  }
}
App.defaultProps = {
  options: []
};

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
    if (!error) {
      e.target.elements.option.value = '';
    }

  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  render() {
    return (
      <div className="form">
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleFormSubmit}>
          <input type="text" name="option" placeholder="Add your list here"
            onChange={(e) => this.handleChange(e)}
          />
        </form>
      </div>
    );
  }
}

class Options extends React.Component {
  render() {
    return (
      <div className="options">
        {this.props.options && this.props.options.length === 0 && <p>Please add list to get started</p>}
        {
          this.props.options.map((option, i) =>
            (<Option
              key={i}
              id={randomKey.generate()}
              optionText={option}
              handleRemoveOption={this.props.handleRemoveOption}
              handleEditing={this.props.handleEditing}
            />))
        }
      </div>
    );
  }
}

Options.defaultProps = {
  options: []
}

Options.propTypes = {
  options: PropTypes.array.isRequired
}

class Option extends React.Component {
  render() {
    return (
      <div className="option-list">

        <ul>
          <li>
            <div onDoubleClick={this.props.handleEditing}>

              {this.props.optionText}

              <button className="remove-button" onClick={() => {
                this.props.handleRemoveOption(this.props.optionText)
              }}>
              </button>

            </div>
          </li>
        </ul>


      </div>
    );
  }
}

class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <button className="footer-button remove-all" onClick={this.props.handleRemoveAll}>Remove All</button>
        <button className="footer-button sort-button" onClick={this.props.handleSortOptions}>Sort</button>
      </div>
    )
  }
}

export default App;
