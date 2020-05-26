import { RouteComponentProps } from 'react-router-dom'

interface NavItem {
    label: string,
    route: string
}

export interface Props extends RouteComponentProps {
    items: NavItem[]
}