import { useAuth } from './context/AuthContext';
import { Link } from 'react-router-dom';

function Login() {
  const { signInWithGoogle } = useAuth();

  const handleGoogleLogin = () => {
    signInWithGoogle();
  };

  return (
    <section className="max-w-[960px] h-screen m-auto py-2 flex flex-col gap-2 items-center justify-center">
      <h1 className='text-2xl mb-8'>WIKI CHAT</h1>

      <div className='flex flex-col gap-1 justify-center items-center'>
        <button onClick={handleGoogleLogin} type="button" className="bg-white w-[250px] px-2 py-4 flex gap-2 items-center justify-center rounded-xl">
          <img src="assets/google.svg" alt="google" height={20} width={20} />
          iniciar con google
        </button>

        <p className='text-[#838383]'>o</p>

        <Link to='/Avatars' type="button" className="bg-white w-[250px] px-2 py-4 flex gap-2 items-center justify-center rounded-xl">
          <img src="assets/anonimo.svg" alt="google" height={25} width={25} />
          iniciar como anonimo
        </Link>
      </div>
    </section>
  );
}

export default Login;