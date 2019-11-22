import React from 'react'

const ListItem = ({ link, url }) => {
  return (
    <React.Fragment>
      <li>
        <a href={url}>{link}</a>
      </li>
      <style jsx>{`
        li {
            list-style-type: none;
            margin: 0 2em;
        }

        a {
            text-decoration: none;
            color: #000;
        }

        a:hover {
            color: #ccc;
            
        }
      `}</style>
    </React.Fragment>
  )
}

export default ListItem
