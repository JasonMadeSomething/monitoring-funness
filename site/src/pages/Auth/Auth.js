import React, { Component } from 'react'
import {
  Link,
  withRouter,
} from 'react-router-dom'

import Loading from '../../fragments/Loading'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'

import {
  userRegister,
  userLogin,
  userGet,
  saveSession,
} from '../../utils'

class Auth extends Component {

  constructor(props) {
    super(props)

    const pathName = window.location.pathname.replace('/', '')

    this.state = {}
    this.state.state = pathName
    this.state.loading = true
    this.state.error = null
    this.state.formEmail = ''
    this.state.formPassword = ''

    // Bindings
    this.handleFormInput = this.handleFormInput.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleFormTypeChange = this.handleFormTypeChange.bind(this)
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    this.setState({
      loading: false
    })

    // Clear query params
    const url = document.location.href
    window.history.pushState({}, '', url.split('?')[0])
  }

  /**
   * Handles a form change
   */
  handleFormTypeChange(type) {
    this.setState({ state: type },
      () => {
        this.props.history.push(`/${type}`)
      })
  }

  /**
   * Handle text changes within form fields
   */
  handleFormInput(field, value) {
    value = value.trim()

    const nextState = {}
    nextState[field] = value

    this.setState(Object.assign(this.state, nextState))
  }

  /**
   * Handles form submission
   * @param {object} evt 
   */
  async handleFormSubmit(evt) {
    evt.preventDefault()

    this.setState({ loading: true })

    // Validate email
    if (!this.state.formEmail) {
      return this.setState({
        loading: false,
        formError: 'email is required'
      })
    }

    // Validate password
    if (!this.state.formPassword) {
      return this.setState({
        loading: false,
        formError: 'password is required'
      })
    }

    let token
    try {
      if (this.state.state === 'register') {
        token = await userRegister(this.state.formEmail, this.state.formPassword)
      } else {
        token = await userLogin(this.state.formEmail, this.state.formPassword)
      }
    } catch (error) {
      console.log(error)
      if (error.message) {
        this.setState({
          formError: error.message,
          loading: false
        })
      } else {
        this.setState({
          formError: 'Sorry, something unknown went wrong.  Please try again.',
          loading: false
        })
      }
      return
    }

    // Fetch user record and set session in cookie
    let user = await userGet(token.token)
    user = user.user
    saveSession(user.id, user.email, token.token)

    window.location.replace('/')
  }

  render() {

    return (
      <div >
        <div >

          { /* Logo */}

          <Link to='/' >
            
          </Link>

          { /* Loading */}

          {this.state.loading && (
            <div>
              {< Loading  />}
            </div>
          )}

          { /* Registration Form */}

          {!this.state.loading && (
            <div >
              <div
                
                onClick={(e) => { this.handleFormTypeChange('register') }}>
                Register
              </div>
              <div
                
                onClick={(e) => { this.handleFormTypeChange('login') }}>
                Sign-In
              </div>
            </div>
          )}

          {this.state.state === 'register' && !this.state.loading && (
            <div >

              <Form  onSubmit={this.handleFormSubmit}>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>Email</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    type='text'
                    placeholder='yours@example.com'
                    value={this.state.formEmail}
                    onChange={(e) => { this.handleFormInput('formEmail', e.target.value) }}
                  />

                </InputGroup>
                <InputGroup >
                <InputGroup.Prepend>
                    <InputGroup.Text>Password</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    type='password'
                    placeholder='your password'
                    value={this.state.formPassword}
                    onChange={(e) => { this.handleFormInput('formPassword', e.target.value) }}
                  />
                </InputGroup>

                {this.state.formError && (
                  <div >{this.state.formError}</div>
                )}

                <Button
                  variant="primary"
                  type="submit"
                  value="Register"
                  disabled={this.state.loading}
                >Register</Button>

              </Form>
            </div>
          )}

          {this.state.state === 'login' && !this.state.loading && (
            <div >

              <Form  onSubmit={this.handleFormSubmit}>
              <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>Email</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    type='text'
                    placeholder='yours@example.com'
                    value={this.state.formEmail}
                    onChange={(e) => { this.handleFormInput('formEmail', e.target.value) }}
                  />

                </InputGroup>
                <InputGroup >
                <InputGroup.Prepend>
                    <InputGroup.Text>Password</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    type='password'
                    placeholder='your password'
                    value={this.state.formPassword}
                    onChange={(e) => { this.handleFormInput('formPassword', e.target.value) }}
                  />
                </InputGroup>

                {this.state.formError && (
                  <div >{this.state.formError}</div>
                )}

                
                <Button
                  variant="primary"
                  type="submit"
                  value="Sign In"
                  disabled={this.state.loading}
                >Sign In</Button>
              </Form>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default withRouter(Auth)