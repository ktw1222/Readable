import React, { Component } from 'react';
import './App.css';

// import Category from './components/Category';
import CategoryList from './components/CategoryList';
import Category from './components/Category';
import Post from './components/Post';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getCategories } from './actions/categories';
import { getPosts } from './actions/posts';

class App extends Component {

  componentDidMount() {
    this.props.fetchCategories()
    this.props.fetchPosts()
  }

  render() {
    const { categories } = this.props

    return (
      <div className="App">
        <div className="App-header">

          <h2>Readable</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <CategoryList categories={categories} />
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
    fetchCategories: () => dispatch(getCategories()),
    fetchPosts: () => dispatch(getPosts())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
