import React from 'react'

const ColumnedContent: React.FC = (props) => {
    return(
        <section className="split-section container py-10">
            <div className="row d-flex flex-row align-items-center">
                {props.children}
            </div>
        </section>
    )
}

export default ColumnedContent