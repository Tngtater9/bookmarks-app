import React from 'react'
import {withRouter} from 'react-router-dom'

class deleteBookmark extends React.Component {
    render () {
        return (<button 
        onClick={(e)=>{
            this.props.onClickDelete(e.target.parentNode.parentNode.id); 
            this.props.history.push('/');
        }}>Delete</button>)
    }
}

export default withRouter(deleteBookmark)