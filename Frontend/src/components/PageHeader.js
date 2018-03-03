import React, {Component} from 'react'
import {Menu, Label} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import * as API from '../utils/API'
import * as Helpers from '../utils/Helpers'
import {setCategories, setErrorCategories} from '../actions/categoriesActions'


class PageHeader extends Component{

    componentWillMount(){

        const {defineCategories, dispatchError} = this.props

        API.getCategories()
            .then(categories=> defineCategories(categories))
            .catch(err => dispatchError(err))
    }

    render(){
        console.log(this.props)
        const {categories, error} = this.props
        return ( 
            <Menu>
                <Link to='/' className='item'>All Posts</Link>

                { !error && categories.map(category => (
                    <Link 
                        key={category.path} 
                        to={`/${category.path}`} 
                        className='item'>{Helpers.capitalize(category.name)}</Link>
                ))} 

                { error && <Label>We can't fetch the categories due to a error.</Label>}

            </Menu>
        )
    }
}

function MapStateToProps({categoriesReducer}){
    return{
        categories: categoriesReducer.categories,
        error: categoriesReducer.error
    }
}

function mapDispatchToProps(dispatch) {
    return{
        defineCategories: (categories) => dispatch(setCategories(categories)),
        dispachError: (error) => dispatch(setErrorCategories(error))
    }  
}

export default connect(MapStateToProps, mapDispatchToProps)(PageHeader)