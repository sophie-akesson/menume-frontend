import { signIn } from 'next-auth/react';
import Link from 'next/link';

const LoginOptions = () => (
  <div>
    <h1>Login</h1>
    <div>
      <Link href='/api/auth/signin' passHref>
        <button
          onClick={e => {
            e.preventDefault();
            signIn();
          }}
        >
          Google
        </button>
      </Link>
      <button type='button'>Facebook</button>
    </div>
  </div>
);

export default LoginOptions;
