import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import * as bookApi from '../BooksAPI';
import Book from '../component/book';
import { Link } from 'react-router-dom';
// import Book from '../component/book';
export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            reqCount: 0,
            maxReq: 0,
            allBooks: []
        }
    }

    componentDidMount() {
        this.getAllBooks()
    }

    getAllBooks() {
        bookApi.getAll().then( data => {
            this.setState({allBooks: data})
        })
    }

    setSearchState(books, curReq) {
        if(curReq < this.state.maxReq) {
            return;
        }
        this.setState({books: books, maxReq: curReq})
    }

    doSearch(term) {
        let curReq = this.state.reqCount + 1
        this.setState({reqCount: curReq})
        if(!term) {
            this.setSearchState([], curReq)
            return;
        }
        bookApi.search(term).then( books =>{
            this.setSearchState(books, curReq)
        }).catch(() => {
            this.setSearchState([], curReq)
        })
    }

    inputChange(event) {
        const term = event.target.value.trim()
        this.doSearch(term)
    }

    updateHandler(book, shelf) {
        this.updateBook(book, shelf)
        bookApi.update(book, shelf).then(() =>{})
    }

    updateBook(book, shelf) {
        let books =this.state.allBooks
        let found = false
        books.forEach((oldBook, inds) => {
            if(oldBook.id === book.id) {
                books[inds].shelf = shelf
                found = true
            }
        })
        if(!found) {
            books[book.id] = JSON.parse(JSON.stringify(book))
            books[book.id].shelf = shelf
        }
        this.setState({allBooks: books})
    }

    getBook(searchBook) {
        let books = this.state.allBooks
        for (let key in books) {
            if(books[key].id === searchBook.id) {
               return books[key]
            }
        }
        return searchBook
    }
    render() {
        let books = this.state.books.map((book) => (
            <Book key={book.id} {...this.getBook(book)} handler={this.updateHandler.bind(this)} />
        ))
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input onChange={this.inputChange.bind(this)} 
                        type="text"
                        placeholder="Search by title or author" />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {books}
                    </ol>
                </div>
                
            </div>
        )
    }
}
