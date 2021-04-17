import React, { Component } from 'react'


export default class Loading extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  async componentDidMount() {}

  render() {
    return (
      <div className={`${this.props.className}`}>
        <div >

          

          <p>loading...</p>

        </div>
      </div>
    )
  }
}