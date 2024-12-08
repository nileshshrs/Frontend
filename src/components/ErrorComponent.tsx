
const ErrorComponent = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="bg-destructive text-destructive-foreground p-6 rounded-lg shadow-lg border-custom-border w-[500px] text-center">
        <h3 className="font-semibold text-xl mb-4">Oops! Something went wrong</h3>
        <p>Please try again.</p>
      </div>
    </div>
  );
};

export default ErrorComponent;
