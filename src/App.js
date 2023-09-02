import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Cookies from 'js-cookie';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookList from './Components/BookList';
import Favorites from './Components/Favorites';


function App() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const location  = useRef('');

  useEffect(() => {
    // Verileri alma isteğini burada yapacağız
    fetch('https://data.aykhan.net/data/general/books.json')
      .then((response) => response.json())
      .then((data) => {
        // İlk 100 veriyi almak için slice kullanabilirsiniz
        const limitedData = data.slice(0, 100);
        
        setBooks(limitedData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Verileri alma hatası:', error);
        setIsLoading(false);
      });
      

  }, []);
  useEffect(() => {
    const favoriteBooks = Cookies.get('favoriteBooks');
    if (favoriteBooks) {
      setFavorites(JSON.parse(favoriteBooks));
    }
  }, []);
  
  
  return (
    <div>
      <Router >

        <Navbar location={location} books={books} favorites={favorites} setFavorites={setFavorites} setBooks={setBooks} ></Navbar>
        <hr />
        <Routes>
          <Route exact path='/' element={<BookList books={books} favorites={favorites} setFavorites={setFavorites}></BookList>}></Route>
          <Route exact path='/favorites' element={<Favorites favorites={favorites} setFavorites={setFavorites}></Favorites>}></Route>
        </Routes>
        
      </Router>
    </div>
  );
}

export default App;
