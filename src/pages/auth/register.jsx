import library from "/library-login.png";
import { LoginImage } from "../../contexts/auth/components/login-image";
import { Container } from "../../components/container";
import { RegisterForm } from "../../contexts/auth/register/components/register-form";

export function Register() {
  return (
    <section className="min-h-screen bg-zinc-900 flex items-center justify-center p-4">
      <Container className="flex bg-zinc-800 rounded-2xl shadow-2xl px-0 overflow-hidden">
        <LoginImage src={library} alt="Library" />
        <RegisterForm />
      </Container>
    </section>
  );
}
