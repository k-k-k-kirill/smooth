import React from 'react'

//Components
import Header from '../../components/Header/Header'

const NotFound: React.FC = () => {
    return (
        <article>
            <Header />
            <div className="not-found">
                <div>
                    <h1>Error 404</h1>
                    <h4 className="not-found__subtitle">We could not find page you requested.</h4>
                </div>
            </div>
        </article>
    )
}

export default NotFound