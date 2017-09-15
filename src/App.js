import React, { Component } from 'react';
import './App.css';

import CategoryList from './components/CategoryList';
import Category from './components/Category';
import Post from './components/Post';
import Header from './components/Header';

import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';

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
      <Header />
      <Switch>
        <Route exact path="/" render={() => <CategoryList categories={categories}/>}/>
        <Route exact path="/categories/:categoryUuid" render={() => <Category />}/>
        <Route exact path="/categories/:categoryUuid/posts/:postUuid" render={({ match }) => <Post linkPost={"/categories/" + match.params.categoryUuid + "/posts/" + match.params.postUuid } />}/>
      </Switch>
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
