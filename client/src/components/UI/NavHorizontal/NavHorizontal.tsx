import React from 'react'
import { withRouter, Link } from 'react-router-dom'

// Component imports
import Hamburger from '../Hamburger/Hamburger'
import Button from '../Button/Button'

//Types
import { Props } from './types'

const NavHorizontal: React.FC<Props> = ({ items, history }) => {
    let navItems: JSX.Element[] | null = []

    if(items.length > 0) {
        navItems = items.map((item) => {
             return <Link key={item.label} className="link link--top" to={item.route}>{item.label}</Link>
        })
    }

    return(
        <nav>
            <div className="nav-items">{navItems}</div>
            <Hamburger />
            <div className="nav-items nav-items--mobile">
                <div className="inner">
                    <Button classes="nav-items__button" purple={true} label='Sign Up' clicked={() => history.push('/signup')} />
                    {navItems}
                </div>
            </div>
        </nav>
    )
}

export default withRouter(NavHorizontal)