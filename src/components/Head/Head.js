import React from 'react'
import Navbar from './Navbar/Navbar'

const Head = () => (
  <React.Fragment>
    <div className="wrapper">
      <Navbar />
    </div>
    <style jsx>{`
        .wrapper {
            height: 100vh;
            background: mistyrose;
        }

    `}</style>
  </React.Fragment>
)

export default Head
