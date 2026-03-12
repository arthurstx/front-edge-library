import { useState } from "react";
import library from "/library-login.png";
import { LoginImage } from "../../contexts/auth/components/login-image";
import { Container } from "../../components/container";
import { useNavigate } from "react-router";
import { RegisterForm } from "../../contexts/auth/register/components/register-form";

export function Register() {
  let navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleRegister({ name, email, password }) {
    setError("");
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        },
      );
      if (response.ok) {
        navigate("/");
      }
      if (!response.ok) throw new Error("Invalid credentials.");

      // TODO: handle success (ex: redirect, store token)
    } catch (err) {
      setError(err.message || "Error signing up. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-screen bg-zinc-900 flex items-center justify-center p-4">
      <Container className="flex bg-zinc-800 rounded-2xl shadow-2xl px-0 overflow-hidden">
        <LoginImage src={library} alt="Library" />
        <RegisterForm
          onSubmit={handleRegister}
          loading={loading}
          error={error}
        />
      </Container>
    </section>
  );
}
