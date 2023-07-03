import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from 'react-router-dom';

function ErrorMessage() {
  const navigate = useNavigate();
  const error = useRouteError();

  return (
    <div>
      <h1>
        {isRouteErrorResponse(error)
          ? `${error.status} ${error.statusText}`
          : 'Something went wrong 😢'}
      </h1>
      <p>
        {isRouteErrorResponse(error)
          ? error.data
          : error instanceof Error
          ? error.message
          : 'Unknown error'}
      </p>
      <button onClick={() => navigate(-1)}>&larr; Go back</button>
    </div>
  );
}

export default ErrorMessage;
