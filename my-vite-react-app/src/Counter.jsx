import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <section>
      <p role="status">Товаров: {count}</p>
      <button onClick={() => setCount((current) => current + 1)}>
        Добавить товар
      </button>
    </section>
  );
}
