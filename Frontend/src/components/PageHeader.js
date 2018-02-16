import React from 'react'
import {Menu} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const PageHeader = () => (
    <Menu>
        <Link to='/' className='item'>All Posts</Link>
        <Link to='/page1' className='item'>React</Link>
        <Link to='/page2' className='item'>Redux</Link>
        <Link to='/page3' className='item'>Udacity</Link>
    </Menu>
)

export default PageHeader