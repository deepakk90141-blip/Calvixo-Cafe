import logo from '../assets/logo.png'

const CalvixoLogo = ({ width=140, height=43}) => {
    return (
        <div>
            <img
                src={logo}
                alt="Calvixo Logo"
                width={width}
                height={height}
            />
        </div>
    )
}

export default CalvixoLogo