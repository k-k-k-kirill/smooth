import React from 'react'

interface Props {
    label: string,
    clicked?: () => void
}

const Button: React.FC<Props> = ({ label, clicked }) => {
    return(
        <button className="button button--pinkish" onClick={clicked}>{label}</button>
    )
}

export default Button