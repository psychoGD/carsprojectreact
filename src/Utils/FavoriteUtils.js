import Cookies from 'js-cookie';


export const toggleFavorite = (book,favorites,setFavorites) => {
    const isFavorite = favorites.some((favoriteBook) => favoriteBook.Title === book.Title);
    if (isFavorite) {
      // Favorilerden kaldır
      const newFavorites = favorites.filter((favoriteBook) => favoriteBook.Title !== book.Title);
      setFavorites(newFavorites);
      Cookies.set('favoriteBooks', JSON.stringify(newFavorites));
    } else {
      // Favorilere ekle
      const newFavorites = [...favorites, book];
      setFavorites(newFavorites);
      Cookies.set('favoriteBooks', JSON.stringify(newFavorites));
    }
  };