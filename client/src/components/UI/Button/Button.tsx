import React from 'react'

//Types
import { Props } from './types'

const Button: React.FC<Props> = ({ label, clicked, purple, classes, type, fluid }) => {
    return(
        <button type={type} className={`button ${ fluid ? 'button--fluid' : ''} button--${purple ? 'purple' : 'pinkish'} ${classes}`} onClick={clicked}>{label}</button>
    )
}

export default Button