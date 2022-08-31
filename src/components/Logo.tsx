import Router from "next/router";


interface LogoProps {
    className?: string;
}

export const Logo = ( {className}: LogoProps) => {
    
    return (
        <h1 className = {`cursor-pointer text-6xl text-center text-green-900 font-logo ${className}`} onClick={() => {
            Router.push('/');
        }}>VINCI</h1>
    )
}