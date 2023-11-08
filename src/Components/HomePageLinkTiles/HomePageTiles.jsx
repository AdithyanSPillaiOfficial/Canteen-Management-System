import React from 'react'
import './HomePageTiles.css'

function HomePageTiles(props) {
  return (
    <div className='tile'>
        <img src={props.image} alt="" className='image'/>
        <h3 className='title'>{props.name}</h3>
    </div>
  )
}

export default HomePageTiles