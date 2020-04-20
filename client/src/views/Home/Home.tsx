import React from 'react'
import { ReactComponent as HomeIllustration } from '../../assets/images/undraw_next_tasks_iubr.svg'

//Components
import Header from '../../components/Header/Header'
import SplitSection from '../../components/SplitSection/SplitSection'
import Button from '../../components/Button/Button'
import { RouteComponentProps } from 'react-router-dom'

interface Props extends RouteComponentProps {}

const Home: React.FC<Props> = ({ history }) => {
    return (
        <article>
            <Header />
            <SplitSection>
                <div className="content-column">
                    <h1>Not just another to-do list app</h1>
                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, </p>
                    <Button label='Start using' clicked={() => history.push('/signup')} />
                </div>
                <div className="illustration-column">
                    <HomeIllustration />
                </div>
            </SplitSection>
        </article>
    )
}

export default Home
