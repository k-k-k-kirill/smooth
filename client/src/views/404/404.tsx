import React from 'react'

//Components
import LayoutVertical from '../../components/Layouts/LayoutVertical/LayoutVertical'

const NotFound: React.FC = () => {
    return (
        <LayoutVertical>
            <div className="not-found">
                <div>
                    <h1>Error 404</h1>
                    <h4 className="not-found__subtitle">We could not find page you requested.</h4>
                </div>
            </div>
        </LayoutVertical>
    )
}

export default NotFound