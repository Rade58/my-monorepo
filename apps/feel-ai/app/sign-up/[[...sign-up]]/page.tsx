import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <SignUp
      afterSignUpUrl="/new-user"
      afterSignInUrl="/new-user"
      redirectUrl="/new-user"
    />
  );
}
