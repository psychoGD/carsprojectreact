import { Books, CurrentSetter } from "./CurrentList";



export const filterBooks = (books,keyword,setter) => {
// Author: "Philip Anderson"
// CoverUrl: "https://media.aykhan.net/assets/images/step-it-academy/react/task13/book-images/handbook_of_clinical_drug_data.jpg"
// Id: "d2aceb1a-25dd-45d5-a584-b015e13d341c"
// Language: "English"
// Pages: "1163"
// Publisher: "McGraw-Hill Medical"
// Title: "Handbook of Clinical Drug Data"
// Year: "2001"
    console.log(books)
    console.log(Books)
    let searchedBooks = [];
    books.forEach(b => {
        if(JSON.stringify(b).includes(keyword)){
            searchedBooks.push(b);
        }
    });
    setter(searchedBooks)
  };