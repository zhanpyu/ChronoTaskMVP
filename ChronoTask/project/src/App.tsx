import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Onboarding } from './components/Onboarding';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { LandingPage } from './components/landing/LandingPage';
import { AuthForm } from './components/auth/AuthForm';
import { useStore } from './store/useStore';
import { supabase } from './lib/supabase';

function App() {
  const { user, setUser, responses } = useStore();
  const isOnboardingComplete = responses.length === 5;

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({ id: session.user.id, email: session.user.email! });
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({ id: session.user.id, email: session.user.email! });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" /> : <AuthForm />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/dashboard" /> : <AuthForm />}
        />
        <Route
          path="/dashboard/*"
          element={
            user ? (
              isOnboardingComplete ? (
                <DashboardLayout />
              ) : (
                <Onboarding />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;