import React from 'react'

//Components
import Header from '../../components/Header/Header'
import ColumnedContent from '../../components/ColumnedContent/ColumnedContent'
import Button from '../../components/UI/Button/Button'
import { RouteComponentProps } from 'react-router-dom'
import { ReactComponent as HomeIllustration } from '../../assets/images/undraw_next_tasks_iubr.svg'

interface Props extends RouteComponentProps {}

const Home: React.FC<Props> = ({ history }) => {
    return (
        <article>
            <Header />
            <ColumnedContent>
                <div className="content-column col-lg-6">
                    <h1>Not just another to-do list app</h1>
                    <p className="body-paragraph">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, </p>
                    <Button label='Start using' clicked={() => history.push('/signup')} />
                </div>
                <div className="illustration-column col-lg-6">
                    <HomeIllustration />
                </div>
            </ColumnedContent>
        </article>
    )
}

export default Home
