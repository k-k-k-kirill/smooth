import { ChangeEvent } from 'react'

export interface Props {
    id?: string,
    label?: string,
    name: string,
    value?: string,
    placeholder: string,
    change: (eventOrPath: string | ChangeEvent<HTMLInputElement>) => void,
    blur?: (eventOrPath: string | ChangeEvent<HTMLInputElement>) => void,
    classes?: string,
    type?: string
}
