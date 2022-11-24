import { ButtonCotainer } from "./Button.styles";

interface ButtonProps {
  color?: "primary";
}

export function Button({ color = "primary" }: ButtonProps) {
  return <h1>Testando aplicação com Vite.</h1>;
}
