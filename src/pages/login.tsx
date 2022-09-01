
import { Button } from "../components/Button";
import { InputGroup } from "../components/InputGroup";
import { Link } from "../components/Link";
import { Logo } from "../components/Logo";
import { useAuth } from "../hooks/useAuth";
import { Access } from "../layouts/Access"
import { useForm } from "react-hook-form";

interface LogInInputs{
    email: string;
    password: string;
}

const Login = () => {
    const { login } = useAuth();
    const { register, handleSubmit, formState: {errors, isSubmitting} } = useForm<LogInInputs>();

    const handleLogIn = async (data: LogInInputs) => {
        await login(data);
    }

    return (
        <Access>
            <div className = 'p-6 mx-auto w-full max-w-[500px]'>
                <Logo/>
                <form onSubmit={handleSubmit(handleLogIn)} className = 'mt-4 mx-auto gap-4 flex justify-center align-center flex-col max-w-md'>
                    <InputGroup autoFocus autoComplete="off" label = 'Email'  {...register('email')}/>
                    <InputGroup type={'password'} autoComplete="off" label = 'Password'  {...register('password')}/>

                    <Button isLoading={isSubmitting}>Log In</Button>
                </form>

                <p className= 'mt-4'>{"Don't"} have an account? <Link href={'/signup'}>Sign up</Link></p>
            </div>
        </Access>
    )
}

export default Login;