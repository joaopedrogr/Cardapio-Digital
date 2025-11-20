import { useState } from "react";
import "./AIRecommendation.css";

type Props = {
  token: string;
  onError: (error: string) => void;
};

type Recommendation = {
  name: string;
  description: string;
  reason: string;
};

export default function AIRecommendation({ token, onError }: Props) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Recommendation | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE}/api/ai/recommend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      if (res.ok) {
        setResult(data);
        setMessage("");
      } else {
        onError(data.message || "Erro ao obter recomendação");
      }
    } catch (err: any) {
      onError(err.message || "Erro na conexão");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="ai-container">
      <form onSubmit={handleSubmit} className="ai-form">
        <input
          placeholder="Ex: Quero algo apimentado, ou algo típico do sul da Grécia"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Pensando..." : "Recomendar"}
        </button>
      </form>

      {result && (
        <div className="ai-result">
          <h3>{result.name}</h3>
          <p>{result.description}</p>
          <p>
            <strong>Por quê?</strong> {result.reason}
          </p>
        </div>
      )}
    </div>
  );
}
