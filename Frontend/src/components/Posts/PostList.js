import React, {Component} from 'react'
import {connect} from 'react-redux'
import { List, Icon, Label, Button, Confirm} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import VotePost from './VotePost'

import * as Helpers from '../../utils/Helpers'

const PostList = ({posts, author, handleDelete}) => (
    <List relaxed='very' selection animated divided>
    {
    Helpers.isNotEmpty(posts) &&
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
                                Posted by <b>{post.author}</b> in {Helpers.handleDateTime(post.timestamp)}  
                                </Label>
                                
                                {
                                    post.author === author 
                                    ?
                                    <Button.Group size='tiny'>
                                        <Button icon labelPosition='left' size='tiny' color='red' floated='right' onClick={()=>handleDelete(post.id)}>
                                            <Icon name='delete'/> Delete
                                        </Button>
                                        <Button icon labelPosition='left'  as={Link} to={`/e/${post.id}`} size='tiny' color='blue' floated='right'>
                                            <Icon name='edit'/> Edit
                                        </Button>
                                    </Button.Group>       
                                    :
                                    null
                                }
                            </List.Description>
                    </List.Content>
                </List.Item>
            )
        )
    }
    </List>
)

function MapStateToProps({postsReducer, loginReducer, postOrderReducer}){
    return{
        posts: postsReducer.posts
        .slice()
        .filter(post=> post.deleted==false)
        .sort((a, b) => {
          return (postOrderReducer.postOrder.asc === 1)
            ? b[postOrderReducer.postOrder.type] - a[postOrderReducer.postOrder.type]
            : a[postOrderReducer.postOrder.type] - b[postOrderReducer.postOrder.type]
        }),
        author: loginReducer.username
    }
}

export default connect(MapStateToProps, null)(PostList)