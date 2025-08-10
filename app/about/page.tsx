"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <main>
      <h1>About Us</h1>
      <p>Welcome to our amazing application! This is the about page where you can learn more about what we do.</p>
      
      <div style={{ marginTop: 24 }}>
        <h2>Features</h2>
        <ul>
          <li>Todo management</li>
          <li>Calculator functionality</li>
          <li>User authentication</li>
          <li>Data persistence</li>
        </ul>
      </div>
      
      <div style={{ marginTop: 24 }}>
        <Link href="/" style={{ 
          display: 'inline-block',
          padding: '12px 24px',
          backgroundColor: '#0070f3',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '6px',
          fontWeight: '500'
        }}>
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
