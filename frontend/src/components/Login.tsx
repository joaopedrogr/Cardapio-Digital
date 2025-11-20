import { useState } from "react";
import "./Login.css";

type Props = {
  onLogin: (token: string, user: any) => void;
  onError: (error: string) => void;
};

export default function Login({ onLogin, onError }: Props) {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const endpoint = isRegister ? "/api/auth/register" : "/api/auth/login";
    const body = isRegister ? { name, email, password } : { email, password };

    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.ok) {
        onLogin(data.token, data.user);
        setName("");
        setEmail("");
        setPassword("");
      } else {
        onError(data.message || "Erro ao autenticar");
      }
    } catch (err: any) {
      onError(err.message || "Erro na conexão");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        {isRegister && (
          <input
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Aguarde..." : isRegister ? "Cadastrar" : "Entrar"}
        </button>
      </form>
      <div className="auth-toggle">
        {isRegister ? "Já tem conta?" : "Não tem conta?"}{" "}
        <button type="button" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "Entrar" : "Cadastrar"}
        </button>
      </div>
    </div>
  );
}
