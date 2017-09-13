import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { capitalize } from '../utils/helpers';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="header-title">
          <h2>Readable</h2>
        </div>

        <div className="header-nav">
          <ul>
          <Link className="headerLink" to="/">Home</Link>
          {this.props.categories.map((category, index) => (
            <li className="header-category" key={index}>
              <Link className="headerLink" to={`/categories/${category.path}`}>{capitalize(category.name)}</Link>
            </li>
          ))}
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  const categoryUuid = props.categoryUuid || props.match.params.categoryUuid;
  const category = state.categories.categories.find(category => category.path === categoryUuid) || {};
  return {
    categories: state.categories.categories,
    category: category,
  }
}

export default withRouter(connect(mapStateToProps)(Header))
