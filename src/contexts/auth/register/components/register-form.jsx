import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router";
import { Button } from "../../../../components/button";
import { InputField } from "../../components/input-field";
import { registerFormSchema } from "../models/schemas";
import { useRegister } from "../hooks/use-register";

/**
 * @typedef {{ name: string, email: string, password: string }} RegisterCredentials
 * @typedef {{ name?: string, email?: string, password?: string }} FieldErrors
 */

export function RegisterForm() {
  const { register: registerAccount } = useRegister();
  const [isPending, startTransition] = React.useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerFormSchema),
  });

  async function onSubmit(data) {
    startTransition(async () => {
      await registerAccount(data);
    });
  }

  return (
    <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
      <h1 className="text-3xl font-semibold text-white mb-6">Create Account</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <InputField
          label="Name"
          type="text"
          {...register("name")}
          placeholder="Your Name"
          error={errors.name?.message}
          disabled={isPending}
        />
        <InputField
          label="Email"
          type="email"
          {...register("email")}
          placeholder="your@email.com"
          error={errors.email?.message}
          disabled={isPending}
        />
        <InputField
          label="Password"
          type="password"
          {...register("password")}
          placeholder="••••••••"
          error={errors.password?.message}
          disabled={isPending}
        />

        <Button type="submit" full handling={isPending} className="mt-2">
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
