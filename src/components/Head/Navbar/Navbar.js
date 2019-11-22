import React from 'react'
import ListItem from './ListItem'

const Navbar = () => {
  const links = {
    home: 'Home',
    posts: 'Posts',
    user: 'User'
  }

  return (
    <React.Fragment>
      <nav>
        <ul>
          {Object.entries(links).map(([url, link]) => (
            <ListItem link={link} url={url} key={url} />
          ))}
        </ul>
        <div>
            <h5>okaaay</h5>
        </div>
      </nav>
      <style jsx>{`
        nav {
            height: 10vh;
            background: red; 
            display: flex;
            justify-content: space-around;
            align-items: center;
        }

        ul {
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }
            
      `}</style>
    </React.Fragment>
  )
}

export default Navbar
