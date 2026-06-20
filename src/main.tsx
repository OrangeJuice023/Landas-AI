import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { supabase } from './lib/supabase'

// Give every visitor a session so their data is recorded and RLS works.
// They can optionally upgrade to a real account later (Phase 4).
supabase.auth.getSession().then(({ data: { session } }) => {
  if (!session) supabase.auth.signInAnonymously();
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
