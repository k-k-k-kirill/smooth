import React from 'react'

interface Props {}

const InputError: React.FC<Props> = ({children}) => {
    return (
        <span className="input-error">{children}</span>
    )
}

export default InputError