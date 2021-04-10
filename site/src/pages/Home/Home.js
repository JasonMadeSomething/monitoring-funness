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
        <div >

          { /* Hero Artwork */}

          <div  >
            
          </div>
          <div >
            
          </div>

          { /* Hero Description */}

          <div >
            A Portfolio by Jason Teitelman
          </div>

          { /* Call To Action */}

          <div >

            <Link to='/register'>
              <Button variant="dark">
                Pre-register
              </Button>
            </Link>
          </div>
        </div>
      </Jumbotron>
    )
  }
}

export default withRouter(Home)