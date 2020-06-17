import React from 'react';
import {Link} from 'react-router-dom'
import Rating from '../Rating/Rating';
import Delete from './DeleteBookmark'
import './BookmarkItem.css';

export default function BookmarkItem(props) {
  return (
    <li className='BookmarkItem' key={props.id} id={props.id}>
      <div className='BookmarkItem__row'>
        <h3 className='BookmarkItem__title'>
          <a
            href={props.url}
            target='_blank'
            rel='noopener noreferrer'>
            {props.title}
          </a>
        </h3>
        <Rating value={props.rating} />
      </div>
      <p className='BookmarkItem__description'>
        {props.description}
      </p>
      <div className='BookmarkItem__buttons'>
        <Link to={`/update-bookmark/${props.id}`}>
          Update Bookmark
        </Link>
        <Delete onClickDelete={props.onClickDelete}/>
      </div>
    </li>
  )
}

BookmarkItem.defaultProps = {
  onClickDelete: () => {},
}


