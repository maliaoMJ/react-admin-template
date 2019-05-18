import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import PropTypes from 'prop-types'
import Index from './pages/Home/'
import About from './pages/About/'
import Conact from './pages/Conact/'
import NoFound from './pages/NoFound/'
import Login from './pages/Login/'
import Register from './pages/Register/'
import { getUserName, setUserName } from './store/user/action'

class App extends React.Component {
  static propTypes = {
    userName: PropTypes.string
  }
  async componentDidMount() {
    console.log(this.props)
    await this.props.setUserName('admin-template')
    console.log(this.props)
  }
  render() {
    const isSignIn = false
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return isSignIn ? <Redirect to="/home" /> : <Login />
            }}
          />
          <Route path="/register" component={Register} />
          <Route path="/home" component={Index} />
          <Route path="/about" component={About} />
          <Route path="/conact" component={Conact} />
          <Route component={NoFound} />
        </Switch>
      </Router>
    )
  }
}
function mapStateToProps(state) {
  return {
    userName: state.userReducer.userName
  }
}
function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({ setUserName, getUserName }, dispatch)
  }
}
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
)
