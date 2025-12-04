import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { useAuth } from '../contexts/AuthContext';
import { useSubscription } from '../contexts/SubscriptionContext';
import { User, Mail, Lock, Crown, Calendar, Check, Sparkles } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';

export function PersonalPage() {
  const { user } = useAuth();
  const { isSubscribed, hasActiveTrial, trialDaysRemaining, subscribe } = useSubscription();
  
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);

  const handleSaveProfile = () => {
    if (!user) return;

    // Validate inputs
    if (!name.trim() || !email.trim()) {
      toast.error('Name and email are required');
      return;
    }

    // Update user data in localStorage
    const users = JSON.parse(localStorage.getItem('bible_nation_users') || '[]');
    const userIndex = users.findIndex((u: any) => u.id === user.id);
    
    if (userIndex !== -1) {
      users[userIndex] = {
        ...users[userIndex],
        name: name.trim(),
        email: email.trim(),
      };
      
      localStorage.setItem('bible_nation_users', JSON.stringify(users));
      
      // Update current user session
      const updatedUser = { ...user, name: name.trim(), email: email.trim() };
      localStorage.setItem('bible_nation_user', JSON.stringify(updatedUser));
      
      // Force page reload to update user across app
      window.location.reload();
      
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    }
  };

  const handleChangePassword = () => {
    if (!user || !currentPassword || !newPassword || !confirmPassword) {
      toast.error('All password fields are required');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    // Verify current password and update
    const users = JSON.parse(localStorage.getItem('bible_nation_users') || '[]');
    const userIndex = users.findIndex((u: any) => u.id === user.id);
    
    if (userIndex !== -1) {
      const currentUser = users[userIndex];
      
      if (currentUser.password !== currentPassword) {
        toast.error('Current password is incorrect');
        return;
      }

      users[userIndex].password = newPassword;
      localStorage.setItem('bible_nation_users', JSON.stringify(users));
      
      toast.success('Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  const handleUpgrade = () => {
    subscribe();
    setShowUpgradeDialog(false);
    toast.success('🎉 Congratulations! Your account has been upgraded to Premium!');
    
    // Update user subscription status in localStorage for admin tracking
    const users = JSON.parse(localStorage.getItem('bible_nation_users') || '[]');
    const userIndex = users.findIndex((u: any) => u.id === user?.id);
    
    if (userIndex !== -1) {
      users[userIndex].subscriptionStatus = 'premium';
      users[userIndex].subscribedDate = new Date().toISOString();
      localStorage.setItem('bible_nation_users', JSON.stringify(users));
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getAccountStatus = () => {
    if (isSubscribed) return { label: 'Premium', color: 'bg-yellow-500' };
    if (hasActiveTrial) return { label: `Trial (${trialDaysRemaining} days left)`, color: 'bg-blue-500' };
    return { label: 'Free', color: 'bg-gray-500' };
  };

  const accountStatus = getAccountStatus();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Please log in to view your profile</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8 animate-in fade-in slide-in-from-bottom-3 duration-500">
        <h1 className="mb-3">Personal Profile</h1>
        <p className="text-muted-foreground">
          Manage your account information and subscription
        </p>
      </div>

      <div className="space-y-6">
        {/* Account Status Card */}
        <Card className="p-6 border-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2>{user.name}</h2>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <Badge className={`${accountStatus.color} text-white`}>
              {accountStatus.label}
            </Badge>
          </div>

          <Separator className="my-4" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Joined:</span>
              <span>{formatDate(user.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Role:</span>
              <span className="capitalize">{user.role}</span>
            </div>
          </div>
        </Card>

        {/* Upgrade Section */}
        {!isSubscribed && (
          <Card className="p-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Crown className="w-6 h-6 text-yellow-500" />
                  <h3>Upgrade to Premium</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Unlock unlimited AI-powered scripture analysis, chatbot access, and exclusive features
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500" />
                    Unlimited AI Chatbot Questions
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500" />
                    Advanced Scripture Analysis
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500" />
                    Personalized Study Plans
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500" />
                    Priority Support
                  </li>
                </ul>
                <Button 
                  onClick={() => setShowUpgradeDialog(true)}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Upgrade Now
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Edit Profile Card */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3>Profile Information</h3>
            {!isEditing ? (
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsEditing(false);
                    setName(user.name);
                    setEmail(user.email);
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleSaveProfile}>
                  Save Changes
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!isEditing}
                placeholder="Enter your name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEditing}
                placeholder="Enter your email"
              />
            </div>
          </div>
        </Card>

        {/* Change Password Card */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Lock className="w-5 h-5" />
            <h3>Change Password</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
              />
            </div>

            <Button onClick={handleChangePassword} variant="outline">
              Update Password
            </Button>
          </div>
        </Card>
      </div>

      {/* Upgrade Confirmation Dialog */}
      <AlertDialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-500" />
              Upgrade to Premium
            </AlertDialogTitle>
            <AlertDialogDescription>
              You're about to upgrade your account to Premium. This will give you:
              <ul className="mt-4 space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  Unlimited AI Chatbot access
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  Advanced scripture analysis features
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  Priority support and updates
                </li>
              </ul>
              <p className="mt-4">Continue with upgrade?</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleUpgrade}>
              Confirm Upgrade
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
