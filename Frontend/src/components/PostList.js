import React, {Component} from 'react'
import {connect} from 'react-redux'
import { List, Icon, Label} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import * as helpers from '../utils/Helpers'
import VotePost from './VotePost'

import * as Helpers from '../utils/Helpers'

class PostList extends Component {

    render(){
        const {posts} = this.props
        return(
            <List relaxed='very' selection animated divided>
                {
                    posts.map(post=> (
                            <List.Item key={post.id}>
                                <Icon name='comments outline' size='large' />
                                <List.Content>
                                    <List.Header as={Link} name='post' to={`/${post.category}/${post.id}`}>
                                    <h3>
                                        {post.title}
                                    </h3>    
                                    </List.Header>              
                                        <List.Description style={{paddingTop:10}}>
                                            <VotePost post={post}/>
                                            <Label>
                                             <Icon name='comments' color='blue'/> {post.commentCount}
                                            </Label>
                                            <Label>
                                             Posted by <b>{post.author}</b> in {helpers.handleDateTime(post.timestamp)}  
                                            </Label>              
                                        </List.Description>
                                </List.Content>
                            </List.Item>
                        ))
                }
            </List>
        )
    }
}

function MapStateToProps({postsReducer}){

    return{
        posts: postsReducer.posts
        .slice()
        .sort((a, b) => {
          return (postsReducer.postOrder.asc == 1)
            ? b[postsReducer.postOrder.type] - a[postsReducer.postOrder.type]
            : a[postsReducer.postOrder.type] - b[postsReducer.postOrder.type]
        }),
    }
}

export default connect(MapStateToProps, null)(PostList)