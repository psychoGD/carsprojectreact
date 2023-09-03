import Cookies from 'js-cookie';


import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

export const toggleFavorite = (book,favorites,setFavorites) => {
    const isFavorite = favorites.some((favoriteBook) => favoriteBook.Title === book.Title);
    if (isFavorite) {
      toast("Deleted To Favorites!")
      // Favorilerden kaldır
      const newFavorites = favorites.filter((favoriteBook) => favoriteBook.Title !== book.Title);
      setFavorites(newFavorites);
      Cookies.set('favoriteBooks', JSON.stringify(newFavorites));
    } else {
      // Favorilere ekle
      toast("Added To Favorites!")
      const newFavorites = [...favorites, book];
      setFavorites(newFavorites);
      Cookies.set('favoriteBooks', JSON.stringify(newFavorites));
    }
  };