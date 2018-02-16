import React, {Component} from 'react'
import {connect} from 'react-redux'
import  { List, Icon, Button } from 'semantic-ui-react'

class PostList extends Component {

    handleDateTime(timestamp=0){
        let data = new Date(timestamp)
        return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`    
    }

    componentWillReceiveProps(props){
        console.log(props)
    }

    render(){
        const {posts} = this.props
        console.log(posts)
        return(
            <List relaxed='very' selection animated divided >
                {posts.map(post=> (
                    <List.Item key={post.id}>
                        <Icon name='comments outline' size='large' />
                        <List.Content>
                            <List.Header>
                            <h3>
                                {post.title}
                            </h3>    
                            </List.Header>
                                <List.Description style={{paddingTop:10}}>
                                    Posted by <b>{post.author}</b> in {this.handleDateTime(post.timestamp)}.
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