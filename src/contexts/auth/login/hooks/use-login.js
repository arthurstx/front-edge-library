import { api } from "../../../../helper/api";

export function useLogin() {
  async function authentication(data) {
    const response = await api.post("/auth/login", {
      email: data.email,
      password: data.password,
    });
    console.log(response);
  }

  return { authentication };
}
