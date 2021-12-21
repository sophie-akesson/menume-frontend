import Router from 'next/router';

const LoginOptions = () => (
  <div>
    <h1>Login</h1>
    <div>
      <button
        onClick={(event: React.MouseEvent<HTMLInputElement>) => {
          Router.replace(
            `${process.env.NEXT_PUBLIC_API_URL}/api/connect/google/callback`
          );
        }}
      >
        Google
      </button>
      <button type='button'>Facebook</button>
    </div>
  </div>
);

export default LoginOptions;
