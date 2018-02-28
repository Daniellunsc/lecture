import React, {Component} from 'react'
import {connect} from 'react-redux'
import { List, Icon, Label } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import * as helpers from '../utils/Helpers'

class PostList extends Component {

    

    componentWillReceiveProps(props){
        console.log(props)
    }

    render(){
        const {posts} = this.props
        console.log(posts)
        return(
            <List relaxed='very' selection animated divided>
                {posts.map(post=> (
                    <List.Item key={post.id} as={Link} name='post' to={`/${post.category}/${post.id}`}>
                        <Icon name='comments outline' size='large' />
                        <List.Content>
                            <List.Header>
                            <h3>
                                {post.title}
                            </h3>    
                            </List.Header>
                                <List.Description style={{paddingTop:10}}>
                                    <Label>
                                     <Icon name='heart' /> {post.voteScore}
                                    </Label>
                                    <Label>
                                     Posted by <b>{post.author}</b> in {helpers.handleDateTime(post.timestamp)}  
                                    </Label>
                                </List.Description>
                        </List.Content>
                    </List.Item>
                ))}
            </List>
        )
    }
}

function MapStateToProps({posts}){
    return{
        posts
    }
}

function mapDispatchToProps(dispatch) {
    return{
        //defineCategories: (categories) => dispatch(setCategories(categories))
    }  
}

export default connect(MapStateToProps, mapDispatchToProps)(PostList)