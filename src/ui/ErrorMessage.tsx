import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";

function ErrorMessage() {
  const error = useRouteError();

  return (
    <div>
      <h1>
        {isRouteErrorResponse(error)
          ? `${error.status} ${error.statusText}`
          : "Something went wrong 😢"}
      </h1>
      <p>
        {isRouteErrorResponse(error)
          ? error.data
          : error instanceof Error
          ? error.message
          : "Unknown error"}
      </p>
      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default ErrorMessage;
