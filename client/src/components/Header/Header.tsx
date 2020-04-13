import React from 'react'
import { ReactComponent as Logo } from '../../assets/images/smooth_logo.svg'
 
interface Props {
    logo_url?: string
}

const Header: React.FC<Props>  = (props: Props) => {
    return (
        <>
            <header className="app-header">
                <div>
                    <Logo />
                </div>
                <div>
                </div>
            </header>
            <div>
            </div>
        </>
    )
}

export default Header
