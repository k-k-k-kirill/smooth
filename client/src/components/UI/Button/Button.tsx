import React from 'react'

interface Props {
    label: string,
    purple?: boolean,
    clicked?: () => void,
    classes?: string
}

const Button: React.FC<Props> = ({ label, clicked, purple, classes }) => {
    return(
        <button className={`button button--${purple ? 'purple' : 'pinkish'} ${classes}`} onClick={clicked}>{label}</button>
    )
}

export default Button