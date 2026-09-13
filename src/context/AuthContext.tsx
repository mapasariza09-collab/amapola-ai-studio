import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserSession } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { auth, googleAuthProvider } from '../lib/firebase';
import { signInWithPopup, onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';

interface AuthContextType {
  user: UserSession | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  register: (email: string, pass: string, name: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  logout: () => Promise<void>;
}

const DEFAULT_USER: UserSession = {
  id: 'usr_chef_executive',
  email: 'admin@amapolagourmet.com',
  name: 'admin',
  role: 'Master Admin / Chef Ejecutiva',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  provider: 'local',
};

const AuthContext = createContext<AuthContextType>({
  user: DEFAULT_USER,
  loading: false,
  login: async () => true,
  register: async () => true,
  loginWithGoogle: async () => true,
  logout: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserSession | null>(() => {
    const saved = localStorage.getItem('amapola_auth_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && (parsed.name === 'Chef Valentina Morales' || !parsed.name)) {
          parsed.name = 'admin';
          localStorage.setItem('amapola_auth_user', JSON.stringify(parsed));
        }
        return parsed;
      } catch {
        return DEFAULT_USER;
      }
    }
    return DEFAULT_USER;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 1. Supabase Auth state listener if configured
    if (isSupabaseConfigured) {
      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (session?.user) {
            const newUser: UserSession = {
              id: session.user.id,
              email: session.user.email || 'usuario@amapolagourmet.com',
              name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Operador',
              role: 'Administrador Gourmet',
              avatar: session.user.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
              provider: 'supabase',
            };
            setUser(newUser);
            localStorage.setItem('amapola_auth_user', JSON.stringify(newUser));
          } else if (event === 'SIGNED_OUT') {
            setUser(null);
            localStorage.removeItem('amapola_auth_user');
          }
        }
      );

      return () => {
        authListener?.subscription.unsubscribe();
      };
    }

    // 2. Firebase Auth state listener if configured
    try {
      const unsub = onAuthStateChanged(auth, (fbUser) => {
        if (fbUser) {
          const newUser: UserSession = {
            id: fbUser.uid,
            email: fbUser.email || 'usuario@amapolagourmet.com',
            name: fbUser.displayName || fbUser.email?.split('@')[0] || 'Operador Gourmet',
            role: 'Administrador Cloud SQL',
            avatar: fbUser.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
            provider: 'google-firebase',
          };
          setUser(newUser);
          localStorage.setItem('amapola_auth_user', JSON.stringify(newUser));
        }
      });
      return () => unsub();
    } catch {
      // Firebase auth background listener optional fallback
    }
  }, []);

  const login = async (email: string, _pass: string): Promise<boolean> => {
    setLoading(true);
    try {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password: _pass,
        });
        if (error) throw error;
        if (data.user) {
          const loggedUser: UserSession = {
            id: data.user.id,
            email: data.user.email || email,
            name: data.user.user_metadata?.full_name || email.split('@')[0],
            role: 'Chef Ejecutivo',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
            provider: 'supabase',
          };
          setUser(loggedUser);
          localStorage.setItem('amapola_auth_user', JSON.stringify(loggedUser));
          return true;
        }
      }

      // Simulated instant authentication for development & sandbox
      await new Promise((r) => setTimeout(r, 600));
      const simulatedUser: UserSession = {
        id: `usr_${Date.now()}`,
        email,
        name: email.split('@')[0].toUpperCase(),
        role: 'Chef Ejecutivo / Propietario',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        provider: 'local',
      };
      setUser(simulatedUser);
      localStorage.setItem('amapola_auth_user', JSON.stringify(simulatedUser));
      return true;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, _pass: string, name: string): Promise<boolean> => {
    setLoading(true);
    try {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password: _pass,
          options: {
            data: { full_name: name },
          },
        });
        if (error) throw error;
        if (data.user) {
          const registeredUser: UserSession = {
            id: data.user.id,
            email,
            name,
            role: 'Administrador Gourmet',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
            provider: 'supabase',
          };
          setUser(registeredUser);
          localStorage.setItem('amapola_auth_user', JSON.stringify(registeredUser));
          return true;
        }
      }

      await new Promise((r) => setTimeout(r, 700));
      const newUser: UserSession = {
        id: `usr_${Date.now()}`,
        email,
        name,
        role: 'Nuevo Operador Gourmet',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        provider: 'local',
      };
      setUser(newUser);
      localStorage.setItem('amapola_auth_user', JSON.stringify(newUser));
      return true;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    setLoading(true);
    try {
      if (auth) {
        const result = await signInWithPopup(auth, googleAuthProvider);
        const fbUser = result.user;
        const loggedUser: UserSession = {
          id: fbUser.uid,
          email: fbUser.email || 'usuario@amapolagourmet.com',
          name: fbUser.displayName || 'Operador Google',
          role: 'Administrador Cloud SQL',
          avatar: fbUser.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          provider: 'google-firebase',
        };
        setUser(loggedUser);
        localStorage.setItem('amapola_auth_user', JSON.stringify(loggedUser));
        return true;
      }
      return false;
    } catch (err) {
      console.warn('Google sign-in popup closed or fallback triggered:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      if (isSupabaseConfigured) {
        await supabase.auth.signOut();
      }
      try {
        await firebaseSignOut(auth);
      } catch {
        // ignore
      }
      setUser(null);
      localStorage.removeItem('amapola_auth_user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
