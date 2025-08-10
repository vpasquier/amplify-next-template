"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { useAuthenticator } from "@aws-amplify/ui-react";
import Link from "next/link";
import SubscribeComponent from './SubscribeComponent';


Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const { signOut } = useAuthenticator();

  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }


  useEffect(() => {
    listTodos();
  }, []);

  function createTodo() {
    client.models.Todo.create({
      content: window.prompt("Todo content"),
    });
  }

  function createNumber() {
    const number = window.prompt("Number");
    if (number) {
      client.models.Number.create({
        number,
      });
    }
  }

  async function handleCalculate() {
    const response = await fetch("/api/calculate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a, b }),
    });
    const data = await response.json();
    setResult(data.result);
  }

  return (
    <main>
      <h1>My todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.content}</li>
        ))}
      </ul>
      <div style={{ marginTop: 16 }}>
        <h2>Calculator</h2>
        <input
          placeholder="a"
          value={a}
          onChange={(e) => setA(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <input
          placeholder="b"
          value={b}
          onChange={(e) => setB(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <button onClick={handleCalculate}>Calculate</button>
        {result !== null && <p>Result: {result}</p>}
        <button onClick={createNumber}>Create Number</button>
      </div>
      <SubscribeComponent
        priceId="price_1QZ002FZ00000000000000000"
        description="Premium Plan"
      />
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/">
          Review next steps of this tutorial.
        </a>
        <br />
        <Link href="/about" style={{ 
          display: 'inline-block',
          marginTop: '16px',
          padding: '8px 16px',
          backgroundColor: '#28a745',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px',
          fontWeight: '500'
        }}>
          About Us
        </Link>
      </div>
      <button onClick={signOut}>Sign out</button>
    </main>
  );
}
