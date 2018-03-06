import React, {Component} from 'react'
import {Menu, Label,} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import * as API from '../utils/API'
import * as Helpers from '../utils/Helpers'
import {setCategories, setErrorCategories} from '../actions/categoriesActions'


class PageHeader extends Component{

    state = {
        loading: true
    }

    componentDidMount(){
        const {defineCategories, dispatchError} = this.props
        API.getCategories()
            .then(categories=> categories !== {} ? defineCategories(categories) : defineCategories([]))
            .then(res=> this.setState({loading: false}))
            .catch(err => dispatchError(err))
    }
    
    renderCategories(categories){
        if(Helpers.isNotEmpty(categories))
        {
            return(
                categories.map(category => (
                    <Link 
                        key={category.path} 
                        to={`/p/${category.path}`} 
                        className='item'>{Helpers.capitalize(category.name)}</Link>
                ))
            )
        }
        return null
    }

    render(){
        const {loading} = this.state
        const {categories, error} = this.props
        return ( 
            !loading ?
            <Menu>
                <Link to='/' className='item'>All Posts</Link>
                {this.renderCategories(categories)}
                { error && <Label>We can't fetch the categories due to a error.</Label>}

            </Menu>

            :
            <Menu>               
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