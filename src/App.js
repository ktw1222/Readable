import React, { Component } from 'react';
import './App.css';

// import Category from './components/Category';
import CategoryList from './components/CategoryList';

import { connect } from 'react-redux';

import { getCategories } from './actions/categories';

class App extends Component {

  componentDidMount() {
    this.props.fetchCategories()
    // this.props.fetchPosts()
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">

          <h2>Readable</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <CategoryList />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories.categories
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: () => dispatch(getCategories())
    // fetchPosts: () => dispatch(loadPosts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
