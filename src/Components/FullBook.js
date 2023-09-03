import React, { useRef } from 'react'
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
export default function FullBook(props) {
    let comments = []
    let book = '';
    const{id}=useParams();
    function GetComments(){
        console.log(id)
        console.log(props.getById(id))
        book = props.getById(id)
        console.log(book)
        let commentsString = Cookies.get(book.Id)
        comments = commentsString.split('&')
    }
    GetComments()
    return (
        <div>
            <div >
                <div >
                    <img src={book.CoverUrl} alt={book.Title} />
                </div>
                <div >
                    <div class="name">{book.Title}</div>
                    <div class="subname">{book.Author}</div>
                    <div class="description">
                        <p>
                            {book.Description}
                        </p>
                    </div>
                    {comments.map((c)=>(
                        <p>{c}</p>
                    ))}
                </div>
            </div>
        </div>
    )
}
