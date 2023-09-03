import React, { useState, useEffect, useRef, Fragment } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Cookies from 'js-cookie';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookList from './Components/BookList';
import Favorites from './Components/Favorites';
import { filterBooks } from './Utils/NavbarUtil';
import './Button86.css'
import FullBook from './Components/FullBook';
import { ToastContainer } from 'react-toastify';

function App() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const location = useRef('');
  const [inputedText, setInputedText] = useState('');



  useEffect(() => {
    // Verileri alma isteğini burada yapacağız
    fetch('https://data.aykhan.net/data/general/books.json')
      .then((response) => response.json())
      .then((data) => {
        // İlk 100 veriyi almak için slice kullanabilirsiniz
        const limitedData = data.slice(0, 100);
        console.log(limitedData)
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


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const currentCommentId = useRef('')
  const openModal = (id) => {
    currentCommentId.current=id
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddClick = () => {
    // Burada input değerini kullanabilirsiniz (inputValue)
    // Yapmak istediğiniz işlemi gerçekleştirebilirsiniz
    // Örneğin, bu işlemi tamamladığınızda modalı kapatmak için closeModal() fonksiyonunu çağırabilirsiniz.
    let comments = Cookies.get(currentCommentId.current);
    console.log(typeof currentCommentId.current)
    console.log(comments)
    console.log(inputValue)
    console.log(JSON.stringify(inputValue))

    if(comments===undefined){
      console.log("undefined is worked")
      comments=inputValue
    }
    else{
      console.log("else is worked")

      comments+=inputValue
    }
    comments+='&'
    Cookies.set(currentCommentId.current, comments);

    closeModal();
  };
  function getById(id){
    return books.find((b)=> b.Id==id);
  }
  return (
    <div>
      <Router >
        <Navbar location={location} books={books} favorites={favorites} setInput={setInputedText} ></Navbar>
        <ToastContainer></ToastContainer>
        {isModalOpen ? (
          <div className="modal" style={{display: 'block'}}>
            <div className="modal-content-2">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <h2>Add Your Comment</h2>
              <input  id='modal-input-2'
                type="text"
                placeholder="Bir şeyler yazın"
                value={inputValue}
                onChange={handleInputChange}
              />
              <button className='button-86' onClick={handleAddClick}>Add Comment</button>
            </div>
          </div>
        ) :
          <Fragment>

            <hr />

            <Routes>
              <Route exact path='/fullview/:id' element={<FullBook getById={getById}/>}></Route>
              {inputedText === '' ? (
                <Route exact path='/' element={<BookList books={books} openModal={openModal} favorites={favorites} setFavorites={setFavorites}></BookList>}></Route>
              ) : (<Route exact path='/' element={<BookList books={filterBooks(books, inputedText)} openModal={openModal} favorites={favorites} setFavorites={setFavorites}></BookList>}></Route>)}
              {inputedText === '' ? (
                <Route exact path='/favorites' element={<Favorites favorites={favorites} openModal={openModal} setFavorites={setFavorites}></Favorites>}></Route>
              ) : (<Route exact path='/favorites' element={<Favorites favorites={filterBooks(favorites, inputedText)} openModal={openModal} setFavorites={setFavorites}></Favorites>}></Route>)}


            </Routes>
          </Fragment>
        }

      </Router>
    </div>
  );
}

export default App;
