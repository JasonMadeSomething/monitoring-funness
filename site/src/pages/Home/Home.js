import React, { Component } from 'react'
import {
  Link,
  withRouter
} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron'

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  async componentDidMount() { }

  render() {

    return (
      <Jumbotron >
        <div class="row justify-content-center">

          { /* Call To Action */}

          <div >
            <div class="text-center">
              <p>
              A Portfolio by Jason Teitelman
              </p>
            </div>
            <div class="text-center">
            <Link to='/register'>
              <Button variant="dark">
                Pre-register
              </Button>
            </Link>
            </div>
            
          </div>
        </div>
      </Jumbotron>
    )
  }
}

export default withRouter(Home)