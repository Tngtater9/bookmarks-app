import React, { Component } from  'react';
import {withRouter} from 'react-router-dom'
import config from '../config'
import '../AddBookmark/AddBookmark.css';

class UpdateBookmark extends Component {
  static defaultProps = {
    onUpdateBookmark: () => {}
  };

  state = {
    bookmark: {},
    error: null,
  };

  setBookmark = bookmark => {
    this.setState({
      bookmark: bookmark,
      error: null,
    })
  }

  serializeBookmark = bookmark => {
    for (let [key] of Object.entries(bookmark)) {
      if(!bookmark[key] || bookmark[key] === ""){
        bookmark[key] = this.state.bookmark[key]
      }
    }
    return bookmark
  }

  componentDidMount () {
    fetch(config.API_ENDPOINT + this.props.match.params.id, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res => {
      if(!res.ok){
        return res.json().then(error =>{
          throw error
        })
      }
      return res.json()
    })
    .then(data => {
      this.setBookmark(data)})
    .catch(error => this.setState({ error }))
  }

  handleSubmit = e => {
    e.preventDefault()
    // get the form fields from the event
    const { title, url, description, rating} = e.target
    const bookmark = {
      title: title.value,
      url: url.value,
      description: description.value,
      rating: rating.value,
    }
    const updates = this.serializeBookmark(bookmark)
    this.setState({ error: null })
    fetch(config.API_ENDPOINT + this.props.match.params.id, {
      method: 'PATCH',
      body: JSON.stringify(updates),
      headers: {
        'content-type': 'application/json',
      }
    })
    .then(() => {
      this.props.history.push('/')
      window.location.reload(true)
      this.props.updateBookmark(updates)
    })
    .catch(error => {
      this.setState({ error })
    })
  }

  render() {
    const { error } = this.state
    const { onClickCancel } = this.props
    return (
      <section className='UpdateBookmark'>
        <h2>Update {this.state.bookmark.title} bookmark</h2>
        <form
          className='UpdateBookmark__form'
          onSubmit={this.handleSubmit}
        >
          <div className='UpdateBookmark__error' role='alert'>
            {error && <p>{error.message}</p>}
          </div>
          <h4>Please update atleast one field</h4>
          <div>
            <label htmlFor='title'>
              Title
              {' '}
            </label>
            <input
              type='text'
              name='title'
              id='title'
              placeholder={this.state.bookmark.title}
            />
          </div>
          <div>
            <label htmlFor='url'>
              URL
              {' '}
            </label>
            <input
              type='url'
              name='url'
              id='url'
              placeholder={this.state.bookmark.url}
            />
          </div>
          <div>
            <label htmlFor='description'>
              Description
              {' '}
            </label>
            <textarea
              name='description'
              id='description'
              placeholder={this.state.bookmark.description}
            />
          </div>
          <div>
            <label htmlFor='rating'>
              Rating
              {' '}
            </label>
            <input
              type='number'
              name='rating'
              id='rating'
              defaultValue={this.state.bookmark.rating}
              min='1'
              max='5'
            />
          </div>
          <div className='UpdateBookmark__buttons'>
            <button type='button' onClick={onClickCancel}>
              Cancel
            </button>
            {' '}
            <button type='submit'>
              Save
            </button>
          </div>
        </form>
      </section>
    );
  }
}

export default withRouter(UpdateBookmark);
