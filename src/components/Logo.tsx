
interface LogoProps {
    className?: string;
}

export const Logo = ( {className}: LogoProps) => {
    return (
        <h1 className = {`text-6xl text-center text-green-900 font-logo ${className}`}>VINCI</h1>
    )
}