import './global.css'

export const metadata = {
    title: 'WWEGPT',
    description: 'The place to go for all your WWE questions'
}

const RootLayout = ({children}) => {
    return (
        <html lang='en' >
            <body  >
                {children}
            </body>
        </html>
    )
}

export default RootLayout