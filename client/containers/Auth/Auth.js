import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import { clearAuthErrors, selectors as authSelectors } from '../../redux/modules/auth';

const redirectIfAuthenticated = ({ auth }) => {
  if (auth.isAuthenticated) {
    browserHistory.push('/');
  }
};

export default function authHoC(AuthComponent) {
  class WrapperComponent extends Component {
    componentDidMount() {
      redirectIfAuthenticated(this.props);
    }

    componentWillReceiveProps(nextProps) {
      redirectIfAuthenticated(nextProps);
    }

    componentWillUnmount() {
      this.props.clearAuthErrors();
    }

    render() {
      return <AuthComponent {...this.props} />;
    }
  }

  WrapperComponent.propTypes = {
    auth: PropTypes.object,
    clearAuthErrors: PropTypes.func.isRequired
  };

  return connect(
    state => ({
      auth: authSelectors.getAuth(state)
    }),
    { clearAuthErrors }
  )(WrapperComponent);
}
