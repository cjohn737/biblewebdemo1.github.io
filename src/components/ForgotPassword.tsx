import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { toast } from 'sonner@2.0.3';
import { Mail, KeyRound, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

interface ForgotPasswordProps {
  onBackToLogin: () => void;
}

export function ForgotPassword({ onBackToLogin }: ForgotPasswordProps) {
  const [step, setStep] = useState<'email' | 'code' | 'reset'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generateResetCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Check if email exists
    const users = JSON.parse(localStorage.getItem('bible_nation_users') || '[]');
    const userExists = users.find((u: any) => u.email === email) || email === 'admin@biblenation.com';

    if (!userExists) {
      toast.error('No account found with this email address');
      setIsLoading(false);
      return;
    }

    // Generate and store reset code
    const resetCode = generateResetCode();
    setGeneratedCode(resetCode);
    
    // Store reset code with timestamp
    localStorage.setItem('bible_nation_reset_code', JSON.stringify({
      email,
      code: resetCode,
      timestamp: Date.now(),
    }));

    // Simulate email sending delay
    setTimeout(() => {
      setIsLoading(false);
      setStep('code');
      toast.success('Reset code sent to your email!');
      // Show the code in console for demo purposes
      console.log('🔐 Password Reset Code:', resetCode);
      toast.info(`Demo: Your reset code is ${resetCode}`);
    }, 1500);
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const storedData = JSON.parse(localStorage.getItem('bible_nation_reset_code') || '{}');
    
    // Check if code matches and is not expired (5 minutes)
    const isExpired = Date.now() - storedData.timestamp > 5 * 60 * 1000;
    
    if (isExpired) {
      toast.error('Reset code has expired. Please request a new one.');
      setIsLoading(false);
      setStep('email');
      localStorage.removeItem('bible_nation_reset_code');
      return;
    }

    if (code !== storedData.code) {
      toast.error('Invalid reset code. Please try again.');
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      setIsLoading(false);
      setStep('reset');
      toast.success('Code verified successfully!');
    }, 1000);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    const storedData = JSON.parse(localStorage.getItem('bible_nation_reset_code') || '{}');
    
    // Update password
    if (storedData.email === 'admin@biblenation.com') {
      toast.info('Admin password cannot be changed in demo mode');
      setIsLoading(false);
      return;
    }

    const users = JSON.parse(localStorage.getItem('bible_nation_users') || '[]');
    const userIndex = users.findIndex((u: any) => u.email === storedData.email);

    if (userIndex !== -1) {
      users[userIndex].password = newPassword;
      localStorage.setItem('bible_nation_users', JSON.stringify(users));
      localStorage.removeItem('bible_nation_reset_code');

      setTimeout(() => {
        setIsLoading(false);
        toast.success('Password reset successfully!');
        onBackToLogin();
      }, 1000);
    }
  };

  const handleResendCode = () => {
    const resetCode = generateResetCode();
    setGeneratedCode(resetCode);
    
    localStorage.setItem('bible_nation_reset_code', JSON.stringify({
      email,
      code: resetCode,
      timestamp: Date.now(),
    }));

    console.log('🔐 New Password Reset Code:', resetCode);
    toast.success('New code sent to your email!');
    toast.info(`Demo: Your new reset code is ${resetCode}`);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 px-4 py-12">
      <Card className="w-full max-w-md shadow-xl">
        {step === 'email' && (
          <>
            <CardHeader className="space-y-1">
              <div className="flex items-center gap-2 mb-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onBackToLogin}
                  className="p-0 h-auto"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
              </div>
              <CardTitle className="text-2xl text-center">Forgot Password?</CardTitle>
              <CardDescription className="text-center">
                Enter your email address and we'll send you a reset code
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSendCode}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isLoading}
                      className="pl-9"
                    />
                  </div>
                </div>

                <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                  <AlertDescription className="text-sm">
                    <p className="font-medium mb-2">Demo Test Account:</p>
                    <p>Email: <span className="font-mono">demo@biblenation.com</span></p>
                    <p className="text-xs text-muted-foreground mt-2">
                      The reset code will be displayed on screen for testing
                    </p>
                  </AlertDescription>
                </Alert>
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending code...' : 'Send Reset Code'}
                </Button>
              </CardFooter>
            </form>
          </>
        )}

        {step === 'code' && (
          <>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Enter Reset Code</CardTitle>
              <CardDescription className="text-center">
                We've sent a 6-digit code to {email}
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleVerifyCode}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="code">Reset Code</Label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="code"
                      type="text"
                      placeholder="000000"
                      value={code}
                      onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      required
                      disabled={isLoading}
                      className="pl-9 text-center text-lg tracking-widest"
                      maxLength={6}
                    />
                  </div>
                </div>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleResendCode}
                    className="text-sm text-primary hover:underline"
                  >
                    Didn't receive the code? Resend
                  </button>
                </div>

                <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-sm">
                    Code sent successfully! Check your email or console logs.
                  </AlertDescription>
                </Alert>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading || code.length !== 6}
                >
                  {isLoading ? 'Verifying...' : 'Verify Code'}
                </Button>
                <Button 
                  type="button"
                  variant="ghost"
                  onClick={() => setStep('email')}
                  className="w-full"
                >
                  Change Email
                </Button>
              </CardFooter>
            </form>
          </>
        )}

        {step === 'reset' && (
          <>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Create New Password</CardTitle>
              <CardDescription className="text-center">
                Enter your new password below
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleResetPassword}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    minLength={6}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
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
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? 'Resetting password...' : 'Reset Password'}
                </Button>
              </CardFooter>
            </form>
          </>
        )}
      </Card>
    </div>
  );
}
