import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  createdAt: string;
  subscriptionStatus?: 'free' | 'trial' | 'premium';
  subscribedDate?: string;
  isActive?: boolean;
  deletedAt?: string | null;
  streak?: number;
  lastLoginDate?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (name: string, email: string) => boolean;
  getCurrentStreak: () => number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('bible_nation_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error loading user:', error);
        localStorage.removeItem('bible_nation_user');
      }
    }

    // Initialize demo user if not exists
    const users = JSON.parse(localStorage.getItem('bible_nation_users') || '[]');
    const demoUserExists = users.find((u: any) => u.email === 'demo@biblenation.com');
    
    if (!demoUserExists) {
      const demoUser = {
        id: 'demo-user-1',
        email: 'demo@biblenation.com',
        name: 'Demo User',
        role: 'user',
        createdAt: new Date().toISOString(),
        password: 'demo123',
        subscriptionStatus: 'free',
        isActive: true, // Demo user is active by default
        deletedAt: null,
      };
      users.push(demoUser);
      localStorage.setItem('bible_nation_users', JSON.stringify(users));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in production, this would call your backend
    const users = JSON.parse(localStorage.getItem('bible_nation_users') || '[]');
    const foundUser = users.find((u: any) => u.email === email && u.password === password);

    if (foundUser) {
      // Check if account is soft deleted
      if (foundUser.deletedAt) {
        throw new Error('This account has been deleted. Please contact support.');
      }

      // Check if account is active
      if (foundUser.isActive === false) {
        throw new Error('Your account is pending activation. Please contact the administrator.');
      }

      // Update streak
      const today = new Date().toDateString();
      const lastLogin = foundUser.lastLoginDate ? new Date(foundUser.lastLoginDate).toDateString() : null;
      const yesterday = new Date(Date.now() - 86400000).toDateString();

      let newStreak = foundUser.streak || 0;
      let streakAchieved = false;

      if (lastLogin !== today) {
        if (lastLogin === yesterday) {
          // Consecutive day login
          newStreak += 1;
          streakAchieved = true;
        } else if (lastLogin === null) {
          // First login
          newStreak = 1;
        } else {
          // Streak broken
          newStreak = 1;
        }

        // Update user in storage
        const userIndex = users.findIndex((u: any) => u.id === foundUser.id);
        if (userIndex !== -1) {
          users[userIndex].streak = newStreak;
          users[userIndex].lastLoginDate = new Date().toISOString();
          localStorage.setItem('bible_nation_users', JSON.stringify(users));
        }
      }

      const { password: _, ...userWithoutPassword } = foundUser;
      const updatedUser = {
        ...userWithoutPassword,
        streak: newStreak,
        lastLoginDate: new Date().toISOString(),
      };

      setUser(updatedUser);
      localStorage.setItem('bible_nation_user', JSON.stringify(updatedUser));

      // Create streak notification for milestones
      if (streakAchieved && (newStreak === 7 || newStreak === 30 || newStreak % 100 === 0)) {
        setTimeout(() => {
          const streakNotifications = JSON.parse(
            localStorage.getItem(`bible_nation_user_notifications_${foundUser.id}`) || '[]'
          );
          streakNotifications.push({
            id: `notif-${Date.now()}`,
            type: 'streak_achieved',
            title: 'Streak Milestone!',
            message: `Congratulations! You've maintained a ${newStreak}-day login streak! 🔥`,
            timestamp: new Date().toISOString(),
            read: false,
            priority: 'medium',
            metadata: { streak: newStreak },
          });
          localStorage.setItem(
            `bible_nation_user_notifications_${foundUser.id}`,
            JSON.stringify(streakNotifications)
          );
        }, 1000);
      }

      return true;
    }

    // Default admin account
    if (email === 'admin@biblenation.com' && password === 'admin123') {
      const adminUser: User = {
        id: 'admin-1',
        email: 'admin@biblenation.com',
        name: 'Admin User',
        role: 'admin',
        createdAt: new Date().toISOString(),
        isActive: true,
        deletedAt: null,
      };
      setUser(adminUser);
      localStorage.setItem('bible_nation_user', JSON.stringify(adminUser));
      return true;
    }

    return false;
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    // Mock signup - in production, this would call your backend
    const users = JSON.parse(localStorage.getItem('bible_nation_users') || '[]');
    
    // Check if user already exists
    if (users.find((u: any) => u.email === email)) {
      return false;
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name,
      role: 'user',
      createdAt: new Date().toISOString(),
      isActive: false, // New accounts require admin activation
      deletedAt: null,
      subscriptionStatus: 'free',
    };

    users.push({ ...newUser, password });
    localStorage.setItem('bible_nation_users', JSON.stringify(users));
    
    // Create admin notification for new signup
    const notifications = JSON.parse(
      localStorage.getItem('bible_nation_admin_notifications') || '[]'
    );
    notifications.push({
      id: `notif-${Date.now()}`,
      type: 'new_account',
      userName: name,
      userEmail: email,
      timestamp: new Date().toISOString(),
      read: false,
    });
    localStorage.setItem('bible_nation_admin_notifications', JSON.stringify(notifications));
    
    setUser(newUser);
    localStorage.setItem('bible_nation_user', JSON.stringify(newUser));
    
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bible_nation_user');
  };

  const updateProfile = (name: string, email: string): boolean => {
    if (!user) return false;

    const updatedUser = { ...user, name, email };
    setUser(updatedUser);
    localStorage.setItem('bible_nation_user', JSON.stringify(updatedUser));

    // Also update in users array
    const users = JSON.parse(localStorage.getItem('bible_nation_users') || '[]');
    const userIndex = users.findIndex((u: any) => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], name, email };
      localStorage.setItem('bible_nation_users', JSON.stringify(users));
    }

    return true;
  };

  const getCurrentStreak = (): number => {
    if (!user) return 0;
    return user.streak || 0;
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    login,
    signup,
    logout,
    updateProfile,
    getCurrentStreak,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}