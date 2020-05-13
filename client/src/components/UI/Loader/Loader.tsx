import React from 'react'

const Loader = () => {
    return (
        <div className="loader">
            <div className="loader__container">
                <div className="loader__content">
                    <span className="loader__element loader__element--pinkish"></span>
                    <span className="loader__element loader__element--purple"></span>
                </div>
            </div>
        </div>
    )
}

export default Loader