import React from 'react'
import Head from './components/Head/Head'

const App = () => {
  return (
    <React.Fragment>
      <div>
        <Head />
      </div>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
        }
      `}</style>
    </React.Fragment>
  )
}

export default App
