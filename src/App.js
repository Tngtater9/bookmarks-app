import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import AddBookmark from './AddBookmark/AddBookmark';
import UpdateBookmark from './BookmarkItem/UpdateBookmark'
import BookmarkList from './BookmarkList/BookmarkList';
import Nav from './Nav/Nav';
import config from './config';
import './App.css';

const bookmarks = [
  // {
  //   id: 0,
  //   title: 'Google',
  //   url: 'http://www.google.com',
  //   rating: '3',
  //   desc: 'Internet-related services and products.'
  // },
  // {
  //   id: 1,
  //   title: 'Thinkful',
  //   url: 'http://www.thinkful.com',
  //   rating: '5',
  //   desc: '1-on-1 learning to accelerate your way to a new high-growth tech career!'
  // },
  // {
  //   id: 2,
  //   title: 'Github',
  //   url: 'http://www.github.com',
  //   rating: '4',
  //   desc: 'brings together the world\'s largest community of developers.'
  // }
];

class App extends Component {
  state = {
    bookmarks,
    error: null,
  };

  setBookmarks = bookmarks => {
    this.setState({
      bookmarks,
      error: null,
    })
  }

  addBookmark = bookmark => {
    this.setState({
      bookmarks: [ ...this.state.bookmarks, bookmark ],
    })
  }

  updateBookmark = bookmark => {
    this.setState(prevState => {
      const updatedBookmarks = prevState.bookmarks.map(b => b.id === bookmark.id ? bookmark : b)
      return {
        ...prevState,
        bookmarks: updatedBookmarks
      }
    })
  }

  deleteBookmark = (id) => {
    fetch(config.API_ENDPOINT + id, {
      method: 'DELETE'
    })
    .then(() => {
      this.setState(prevState =>{
        const leftBookmarks = prevState.bookmarks.filter(bookmark => bookmark.id !== id)
        return {
          ...prevState,
          bookmarks: leftBookmarks
        }
      })
      
    })
  }

  componentDidMount() {
    fetch(config.API_ENDPOINT, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(this.setBookmarks)
      .catch(error => this.setState({ error }))
  }

  render() {
    const { bookmarks } = this.state
    return (
      <main className='App'>
        <h1>Bookmarks!</h1>
        <Nav />
        <div className='content' aria-live='polite'>
          <Route path='/add-bookmark'
            render={({ history }) => {
              return <AddBookmark
                onAddBookmark={this.addBookmark}
                onClickCancel={() => history.push('/')}
              />
            }}
          />
          <Route path='/update-bookmark/:id'
            render={({ history }) => {
              return <UpdateBookmark
                bookmarks={this.state.bookmarks}
                updateBookmark={this.updateBookmark}
                onClickCancel={() => history.push('/')}
              />
            }}
          />
          <Route exact path='/'
            render={() =>
              <BookmarkList
                bookmarks={bookmarks}
                deleteBookmark={this.deleteBookmark}
              />}
          />
        </div>
      </main>
    );
  }
}

export default App;
