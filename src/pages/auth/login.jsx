import { Container } from "../../components/container";
import { LoginImage } from "../../contexts/auth/components/login-image";
import { LoginForm } from "../../contexts/auth/login/components/login-form";
import library from "/library-login.png";

export function Login() {
  return (
    <section className="min-h-screen bg-zinc-900 flex items-center justify-center p-4">
      <Container className="flex bg-zinc-800 rounded-2xl shadow-2xl px-0 overflow-hidden">
        <LoginImage src={library} alt="Library" />
        <LoginForm />
      </Container>
    </section>
  );
}
