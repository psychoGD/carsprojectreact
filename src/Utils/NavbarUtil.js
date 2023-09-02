import { Books, CurrentSetter } from "./CurrentList";



export const filterBooks = (books,keyword) => {
    let searchedBooks = [];
    books.forEach(b => {
        delete b.Id;
        if(JSON.stringify(b).includes(keyword)){

            console.log(JSON.stringify(b))
            searchedBooks.push(b);
        }
    });
    return searchedBooks
  };