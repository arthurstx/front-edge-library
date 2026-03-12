import { useState } from "react";
import { Button } from "../../../../components/button";
import { InputField } from "../../components/input-field";
import { Link } from "react-router";

/**
 * @typedef {{ name: string, email: string, password: string }} RegisterCredentials
 * @typedef {{ name: string, email?: string, password?: string }} FieldErrors
 */

export function RegisterForm({ onSubmit, loading, error }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  /** @type {[FieldErrors, React.Dispatch<React.SetStateAction<FieldErrors>>]} */
  const [fieldErrors, setFieldErrors] = useState({});

  /** @returns {FieldErrors} */
  function validate() {
    const errors = {};
    if (!name) errors.name = "name is required.";
    if (!email) errors.email = "Email is required.";
    if (!password) errors.password = "Password is required.";
    return errors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    await onSubmit({ name, email, password });
  }

  return (
    <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
      <h1 className="text-3xl font-semibold text-white mb-6">Create Account</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <InputField
          label="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          error={fieldErrors.name}
          disabled={loading}
        />
        <InputField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          error={fieldErrors.email}
          disabled={loading}
        />
        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          error={fieldErrors.password}
          disabled={loading}
        />

        {error && <span className="text-red-400 text-sm">{error}</span>}

        <Button type="submit" full handling={loading} className="mt-2">
          Create Account
        </Button>
      </form>
      <Link
        to="/"
        className=" text-sm text-zinc-400 mt-3 hover:text-zinc-200 transition"
      >
        Already have an account? Sign In
      </Link>
    </div>
  );
}
