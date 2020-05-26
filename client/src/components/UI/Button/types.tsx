export interface Props {
    label: string,
    purple?: boolean,
    fluid?: boolean,
    clicked?: () => void,
    classes?: string
    type?: "button" | "submit" | "reset" | undefined
}