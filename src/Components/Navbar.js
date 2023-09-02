import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useLocation } from 'react-router-dom';
import { filterBooks } from '../Utils/NavbarUtil';
export default function Navbar(props) {
    props.location.current=useLocation()
    return (
        <nav className="navbar navbar-light bg-light justify-content-between">
            <a className="navbar-brand" style={{color:'#4DAA80',marginLeft:'5%'}} href='/'>My Library</a>
            <Link style={{textDecoration:'none',color:'#4DAA80'}} to="/">Home</Link>
            <Link style={{textDecoration:'none',color:'#4DAA80'}} to="/favorites">Favorites</Link>
            <form style={{marginRight:'5%'}} onSubmit={(e)=>e.preventDefault()} className="form-inline">
                <div className="input-group">
                    <input onChange={(e)=>props.setInput(e.target.value)} className="form-control" type="search" placeholder="Search" aria-label="Search" id='input' />
                    <div className="input-group-append">
                        <button onClick={()=>filterBooks(props.location==='/favorites' ? props.favorites:props.books,
                        document.getElementById('input').value)} className="btn btn-outline-success" type="submit">Search</button>
                    </div>
                </div>
            </form>
        </nav>
    )
}
