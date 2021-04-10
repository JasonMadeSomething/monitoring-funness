import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'


/**
 * Render App
 */

ReactDOM.render(
  <React.StrictMode>
    <App />
    <link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
  integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
  crossorigin="anonymous"
/>
  </React.StrictMode>,
  document.getElementById('root')
)