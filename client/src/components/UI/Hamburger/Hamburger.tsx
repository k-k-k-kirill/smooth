import React, { useState } from 'react'

interface Props{}

const Hamburger: React.FC<Props> = () => {
    const [isActive, setActiveState] = useState(false)

    return(
        <button className={`hamburger hamburger--collapse ${isActive ? 'is-active' : null}`} onClick={(event: React.MouseEvent<HTMLButtonElement>) => setActiveState(!isActive)} type="button">
            <span className="hamburger-box">
                <span className="hamburger-inner"></span>
            </span>
        </button>
    )
}

export default Hamburger