interface AuthIamgeProps {
  title: string;
  subtitle: string;
}

const AuthImagePattern: React.FC<AuthIamgeProps> = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="max-w-md text-center">
        <img src="/sample.png" alt="sample image" />
      </div>
    </div>
  );
};

export default AuthImagePattern;
