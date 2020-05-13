import { useLocation } from 'react-router-dom'

const useParser = () => {
    return new URLSearchParams(useLocation().search)
}

export default useParser