import React, { ChangeEvent } from 'react'

interface Props {
    id?: string,
    label?: string,
    name: string,
    value?: string,
    placeholder: string,
    change: (eventOrPath: string | ChangeEvent<any>) => void,
    blur?: (eventOrPath: string | ChangeEvent<any>) => void,
    classes?: string,
    type?: string
}

const TextField: React.FC<Props> = ({ id, label, name, value, placeholder, change, classes, blur, type }) => {
    return (
        <div className="text-field">
            { label && id ? (
                <label htmlFor={id}>{label}</label>
            ) : null }
            <input className={`text-field__input ${classes ? classes : ''}`} type={type ? type : 'text'} onChange={change} onBlur={blur} name={name} value={value} placeholder={placeholder} />
        </div>
    )
}

export default TextField