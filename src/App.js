import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { Link, Route } from "react-router-dom";
import { bindActionCreators } from "redux";
import "./App.css";
import AddPhoto from "./components/AddPhoto";
import PhotoWall from "./components/PhotoWall";
import Single from "./components/Single";
import PageNotFound from "./components/PageNotFound";
import * as actions from "./store/actions";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }
  // state = { loading: true };

  componentDidMount() {
    this.props.startloadingPost().then(() => {
      this.setState({ loading: false });
    });
    this.props.startLoadingComments();
  }
  render() {
    return (
      <div>
        <h1>
          <Link to="/">PhotoWall</Link>
        </h1>
        <Route
          exact
          path="/"
          render={() => (
            <div>
              <PhotoWall {...this.props} />
            </div>
          )}
        />

        <Route
          path="/addPhoto"
          render={({ history }) => (
            <AddPhoto {...this.props} onHistory={history} />
          )}
        />
        <Route
          path="/single/:id"
          render={(params) => (
            <Single loading={this.state.loading} {...this.props} {...params} />
          )}
        />
        <Route
          path="/404"
          render={() => (
            <div>
              <PageNotFound />
            </div>
          )}
        />
        <Redirect to="/404" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    comments: state.comments,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
