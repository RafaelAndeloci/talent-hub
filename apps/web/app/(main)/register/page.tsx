import { RegisterForm } from "@/components/app/register/register-form";
import { RegistrationLayout } from "@/components/layouts/registration-layout";

export const metadata = {
  title: "Register | Talent Hub",
  description:
    "Create an account on Talent Hub to find jobs or post opportunities",
};

export default function RegisterPage({
  searchParams,
}: {
  searchParams: { role?: string; redirect?: string };
}) {
  // Pre-select role based on query parameter
  const defaultRole =
    searchParams.role === "employer"
      ? "employer"
      : searchParams.role === "student"
        ? "student"
        : undefined;
  const redirectPath = searchParams.redirect || "";

  return (
    <RegistrationLayout
      title="Join Talent Hub"
      subtitle="Create your account to get started"
      currentStep={1}
      totalSteps={2}
      steps={[
        {
          title: "Account",
          icon: <span className="text-xs font-medium">1</span>,
        },
        {
          title: "Profile",
          icon: <span className="text-xs font-medium">2</span>,
        },
      ]}
    >
      <RegisterForm defaultRole={defaultRole} redirectPath={redirectPath} />
    </RegistrationLayout>
  );
}
