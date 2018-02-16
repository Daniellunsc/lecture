import React, {Component} from 'react'
import {Menu} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import * as API from '../utils/API'
import * as Helpers from '../utils/Helpers'
import {setCategories} from '../actions'


class PageHeader extends Component{

    componentWillMount(){
        API.getCategories().then(categories=> this.props.defineCategories(categories))
    }

    render(){
        const {categories} = this.props
        return ( 
            <Menu>
                <Link to='/' className='item'>All Posts</Link>

                {categories.map(category => (
                    <Link 
                        key={category.path} 
                        to={`/${category.path}`} 
                        className='item'>{Helpers.capitalize(category.name)}</Link>
                ))}
            </Menu>
        )
    }
}

function MapStateToProps({categories}){
    return{
        categories
    }
}

function mapDispatchToProps(dispatch) {
    return{
        defineCategories: (categories) => dispatch(setCategories(categories))
    }  
}

export default connect(MapStateToProps, mapDispatchToProps)(PageHeader)