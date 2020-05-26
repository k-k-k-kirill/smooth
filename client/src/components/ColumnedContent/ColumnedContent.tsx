import React from 'react'

const ColumnedContent: React.FC = ({ children }) => {
    return(
        <section className="columned-content container py-10">
            <div className="row d-flex flex-row align-items-center columned-content__row">
                {children}
            </div>
        </section>
    )
}

export default ColumnedContent