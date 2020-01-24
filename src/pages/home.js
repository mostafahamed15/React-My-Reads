import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Shelf from '../component/shelf';
import { getAll, update} from '../BooksAPI'

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: []
        }
    }

    componentDidMount() {
        this.getAllBooks();
    }

    getAllBooks() {
        getAll().then(data => {
            this.setState({books: data})
        })
    }
    
    filterBooksByShelf(shelf) {
        return this.state.books.filter( book => book.shelf === shelf)
    }

    updateHandler(book, shelf) {
        this.updateBook(book, shelf)
        update(book, shelf).then(() => console.log("Book updated successfully!"))
    }

    updateBook(book, shelf) {
        let books = this.state.books;
        books.forEach((oldBook, ind) => {
            if(oldBook.id === book.id) {
                books[ind].shelf = shelf
            }
        })

        this.setState({books: books})
    }
    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>

                <div className="list-books-content">
                    <Shelf caption="currently Reading" books={this.filterBooksByShelf('currentlyReading')} handler={this.updateHandler.bind(this)} />
                    <Shelf caption="Want to Read" books={this.filterBooksByShelf('wantToRead')} handler={this.updateHandler.bind(this)} />
                    <Shelf caption="Read" books={this.filterBooksByShelf('read')} handler={this.updateHandler.bind(this)} />
                </div>

                <div className='open-search'>
                    <Link to='/search'>Add a book</Link>
                </div>
                
            </div>
        )
    }
}
