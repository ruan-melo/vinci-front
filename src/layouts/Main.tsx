import { Header } from "../components/Header"
import { Logo } from "../components/Logo"

interface MainProps {
    children: React.ReactNode;
}

export const Main = ( {children}: MainProps) => {
    return (
        <>
            <div id='modal-root'/>
            <Header/>
            <main>
                {children}
            </main>
        </>
        
    )
}