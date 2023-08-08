import { Link } from 'react-router-dom'
import Badge from '../img/GWbadge.png'


export const Welcome = () => {

    const content = (
        <section className="welcome">
            <header>
                <h1 className="title">Great Western Ticket Exchange</h1>
            </header>
            <main className="public__main">
				<img src={Badge} alt="logo" height="300" style={{}}></img>
                <p></p>
            </main>
        </section>

    )
    return content
}
