import React from 'react'

interface Props {
    label: string,
    purple?: boolean,
    fluid?: boolean,
    clicked?: () => void,
    classes?: string
    type?: "button" | "submit" | "reset" | undefined
}

const Button: React.FC<Props> = ({ label, clicked, purple, classes, type, fluid }) => {
    return(
        <button type={type} className={`button ${ fluid ? 'button--fluid' : ''} button--${purple ? 'purple' : 'pinkish'} ${classes}`} onClick={clicked}>{label}</button>
    )
}

export default Button