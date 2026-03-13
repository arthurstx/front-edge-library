# Front-Edge Library - Especificações do Projeto

## 🚀 Visão Geral
Este projeto é uma biblioteca de componentes e funcionalidades construída com foco em performance, manutenibilidade e experiência do desenvolvedor.

### Tech Stack Principal
- **Framework:** React 19
- **Roteamento:** React Router v7
- **Data Fetching:** React Query v5 (@tanstack/react-query)
- **Estilização:** Tailwind CSS v4 (via @tailwindcss/vite)
- **Formulários:** React Hook Form + Zod
- **Componentes:** CVA (class-variance-authority) + clsx + tailwind-merge
- **Notificações:** Sonner
- **Bundler:** Vite 8
- **SVG:** vite-plugin-svgr

---

## 🧩 Guia de Componentes React

### Padrões de Implementação
- **Function Components:** Sempre utilize arrow functions.
- **Props:** Devem ser desestruturadas diretamente na assinatura da função.
- **Exportação:** Prefira exportações nomeadas para melhor suporte a refatoração e IntelliSense.

```jsx
export const MyComponent = ({ propA, propB, className }) => {
  return <div className={cn("base-style", className)}>{propA}</div>;
};
```

### Composição de Classes (Utilitário `cn`)
Para combinar classes do Tailwind de forma segura (resolvendo conflitos), utilizamos o utilitário `cn`:

```javascript
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
```

### Componentes com Variantes (CVA)
Utilize `class-variance-authority` para gerenciar variantes de estilo (ex: botões, inputs).

```jsx
import { cva } from "class-variance-authority";

const buttonVariants = cva("base-classes", {
  variants: {
    variant: {
      primary: "bg-blue-600",
      secondary: "bg-gray-600",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});
```

### Importação de SVGs
SVGs devem ser importados como componentes React através do sufixo `?react`:

```jsx
import MyIcon from "./assets/my-icon.svg?react";

const Component = () => <MyIcon className="w-4 h-4" />;
```

---

## 🎨 Guia de Estilização

- **Tailwind CSS v4:** Única fonte de estilos.
- **CSS Inline:** Proibido, exceto para valores dinâmicos calculados em tempo de execução que não podem ser resolvidos via classes.
- **Arquivos CSS:** Não crie arquivos `.css` por componente. Utilize as utilidades do Tailwind e o CVA para variantes.

---

## 📝 Guia de Formulários

Padrão obrigatório: **React Hook Form** + **Zod**.

```jsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  email: z.string().email(),
});

const MyForm = () => {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });
  // ...
};
```

---

## 🌐 Guia de Data Fetching

Utilize **React Query v5** para todas as interações assíncronas com APIs.
- Siga a convenção de Query Keys (arrays).
- Centralize hooks de mutation/query quando possível.

---

## 🔔 Notificações

Utilize o **Sonner** para feedbacks visuais.

```javascript
import { toast } from "sonner";

toast.success("Operação realizada com sucesso!");
toast.error("Ocorreu um erro.");
```
