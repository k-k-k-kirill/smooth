import React from 'react'

const SplitSection: React.FC = (props) => {
    return(
        <section className="split-section">
            {props.children}
        </section>
    )
}

export default SplitSection