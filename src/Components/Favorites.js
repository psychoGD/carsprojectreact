import React, { useState } from 'react'
import { toggleFavorite } from '../Utils/FavoriteUtils'
import { Books, CurrentSetter, SetBooks, SetSetter } from '../Utils/CurrentList'
import './../Button86.css'
export default function Favorites(props) {
    //favorites favorite edilmis booklar
    //setFavorite
    const [favorite,setFavorite] = useState([])
    SetBooks(props.favorites)
    SetSetter(setFavorite)
    // setFavorite(props.favorites)
  return (
    <div id="large-th">
          <div className="container">
            <h1> Favorites Books</h1>
            <br />
            <div className="choose">
              <a href="#list-th"><i className="fa fa-th-list" aria-hidden="true"></i></a>
              <a href="#large-th"><i className="fa fa-th-large" aria-hidden="true"></i></a>
            </div>
            <div id="list-th">
              {props.favorites.map((book, index) => (
                <div className={`book ${book.read ? 'read' : 'unread'}`} key={index}>
                  <div className="cover">
                    <img src={book.CoverUrl} alt="Book Cover" />
                  </div>
                  <div className="description" style={{ height: '20%' }}>
                    <p className="title">
                      {book.Title.length > 30 ? `${book.Title.slice(0, 30)}...` : book.Title}<br />
                      <span className="author">{book.Author.length > 25 ? `${book.Author.slice(0, 25)}...` : book.Author}</span>
                    </p>

                  </div>
                  <div className='comments'>
                    <button onClick={props.openModal}>Add Comment</button>
                  </div>
                  <button onClick={() => toggleFavorite(book,props.favorites,props.setFavorites)} className="button-86">
                  Favorite Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
  )
}
