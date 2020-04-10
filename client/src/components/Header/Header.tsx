import React from 'react'
import { ReactComponent as Logo } from '../../assets/images/smooth_logo.svg'
 
interface Props {
    logo_url?: string
}

const Header: React.FC<Props>  = (props: Props) => {
    return (
        <header className="header">
            <div>
                <Logo />
            </div>
            <h1>Header</h1>
        </header>
    )
}

export default Header
