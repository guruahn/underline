import React, { Component } from 'react'

export default class Home extends Component {
  constructor(props) {
      super(props);

  }
  
  render () {

    return (
      <div>
        Home. Not Protected. Anyone can see this.
      </div>
    )
  }
}
