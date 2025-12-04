import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { CheckCircle2, Sparkles, Gift, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';

interface SignupProps {
  onSwitchToLogin: () => void;
  onSignupSuccess: () => void;
}

export function Signup({ onSwitchToLogin, onSignupSuccess }: SignupProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const { signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    // Check if account already exists
    const users = JSON.parse(localStorage.getItem('bible_nation_users') || '[]');
    const existingUser = users.find((u: any) => u.email === email);
    
    if (existingUser || email === 'admin@biblenation.com') {
      toast.error('An account with this email already exists', {
        description: 'Please use a different email or sign in to your existing account.',
        duration: 5000,
      });
      return;
    }

    setIsLoading(true);

    try {
      const success = await signup(email, password, name);
      
      if (success) {
        // Add notification for admin
        const notifications = JSON.parse(localStorage.getItem('bible_nation_admin_notifications') || '[]');
        notifications.unshift({
          id: Date.now().toString(),
          type: 'new_account',
          userName: name,
          userEmail: email,
          timestamp: new Date().toISOString(),
          read: false,
        });
        localStorage.setItem('bible_nation_admin_notifications', JSON.stringify(notifications));

        // Show congratulations animation
        setShowCongrats(true);
        
        // Auto-close after animation and redirect
        setTimeout(() => {
          setShowCongrats(false);
          toast.success('Account created successfully!');
          onSignupSuccess();
        }, 4000);
      } else {
        toast.error('An account with this email already exists');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 px-4 py-12">
        <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Create Account</CardTitle>
          <CardDescription className="text-center">
            Join Bible Nation to start your scripture study journey
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                minLength={6}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={isLoading}
                minLength={6}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>
            <div className="text-sm text-center text-muted-foreground">
              Already have an account?{' '}
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-primary hover:underline font-medium"
              >
                Sign in
              </button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>

    {/* Congratulations Dialog */}
    <Dialog open={showCongrats} onOpenChange={setShowCongrats}>
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col items-center justify-center py-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20 
            }}
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-50"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <CheckCircle2 className="h-24 w-24 text-green-500 relative z-10" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-6"
          >
            <DialogHeader>
              <DialogTitle className="text-2xl mb-2">
                🎉 Congratulations, {name}!
              </DialogTitle>
              <DialogDescription className="text-base">
                Your Bible Nation account has been created successfully!
              </DialogDescription>
              <DialogDescription className="text-sm mt-3 text-orange-600 dark:text-orange-400 font-medium">
                ⚠️ Your account is pending activation by an administrator. You'll be able to log in once your account is activated.
              </DialogDescription>
            </DialogHeader>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 space-y-3 w-full"
          >
            <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10">
              <Gift className="h-5 w-5 text-primary flex-shrink-0" />
              <p className="text-sm">Start your 7-day free trial</p>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10">
              <Sparkles className="h-5 w-5 text-primary flex-shrink-0" />
              <p className="text-sm">Access AI-powered Bible study tools</p>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10">
              <BookOpen className="h-5 w-5 text-primary flex-shrink-0" />
              <p className="text-sm">Join a community of believers</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6"
          >
            <p className="text-sm text-muted-foreground">
              Redirecting you to your dashboard...
            </p>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
    </>
  );
}