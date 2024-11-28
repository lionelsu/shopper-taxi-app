type ErrorMessageProps = {
  message: string | null;
};

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  if (!message) return null;

  return <p className="error-message">{message}</p>;
};

export default ErrorMessage;
