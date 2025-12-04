import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';
import { Users, BookOpen, MessageSquare, TrendingUp, Bell, CheckCircle2, UserPlus, X, UserCheck, UserX, Trash2, Archive, Mail, Volume2, Flame, Calendar, Settings as SettingsIcon, BarChart3 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { ScrollArea } from './ui/scroll-area';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { toast } from 'sonner';

interface User {
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

export function AdminEnhanced() {
  const { user: currentUser } = useAuth();
  const { notifications, markAsRead, deleteNotification, clearAll, addNotification, sendEmailNotification } = useNotifications();
  const [users, setUsers] = useState<User[]>([]);
  const [emailLogs, setEmailLogs] = useState<any[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAnalyses: 0,
    totalNotes: 0,
    activeToday: 0,
  });

  useEffect(() => {
    loadUsers();
    loadStats();
    loadEmailLogs();

    // Poll for new users every 5 seconds
    const interval = setInterval(() => {
      const prevCount = users.length;
      loadUsers();
      const newCount = JSON.parse(localStorage.getItem('bible_nation_users') || '[]').length;
      
      if (newCount > prevCount) {
        // New user detected - play sound and send notification
        if (soundEnabled) {
          playNotificationSound();
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [users.length, soundEnabled]);

  const loadUsers = () => {
    const savedUsers = JSON.parse(localStorage.getItem('bible_nation_users') || '[]');
    const formattedUsers = savedUsers.map((u: any) => ({
      id: u.id,
      email: u.email,
      name: u.name,
      role: u.role || 'user',
      createdAt: u.createdAt,
      subscriptionStatus: u.subscriptionStatus || 'free',
      subscribedDate: u.subscribedDate,
      isActive: u.isActive,
      deletedAt: u.deletedAt,
      streak: u.streak || 0,
      lastLoginDate: u.lastLoginDate,
    }));
    setUsers(formattedUsers);
  };

  const loadStats = () => {
    const savedUsers = JSON.parse(localStorage.getItem('bible_nation_users') || '[]');
    const allData = Object.keys(localStorage)
      .filter(key => key.startsWith('bible_nation_'))
      .map(key => localStorage.getItem(key));

    setStats({
      totalUsers: savedUsers.length + 1, // +1 for admin
      totalAnalyses: 0,
      totalNotes: 0,
      activeToday: 1,
    });
  };

  const loadEmailLogs = () => {
    const logs = JSON.parse(localStorage.getItem('bible_nation_email_logs') || '[]');
    setEmailLogs(logs);
  };

  const playNotificationSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 800;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
      console.log('Sound notification failed:', error);
    }
  };

  const activateUser = (userId: string) => {
    const savedUsers = JSON.parse(localStorage.getItem('bible_nation_users') || '[]');
    const userIndex = savedUsers.findIndex((u: any) => u.id === userId);
    
    if (userIndex !== -1) {
      savedUsers[userIndex].isActive = true;
      localStorage.setItem('bible_nation_users', JSON.stringify(savedUsers));
      loadUsers();
      
      // Send notification
      addNotification({
        type: 'user_activated',
        title: 'User Activated',
        message: `${savedUsers[userIndex].name} account has been activated`,
        priority: 'low',
        userId: savedUsers[userIndex].id,
        userName: savedUsers[userIndex].name,
      });
      
      toast.success('User account activated successfully');
    }
  };

  const deactivateUser = (userId: string) => {
    const savedUsers = JSON.parse(localStorage.getItem('bible_nation_users') || '[]');
    const userIndex = savedUsers.findIndex((u: any) => u.id === userId);
    
    if (userIndex !== -1) {
      savedUsers[userIndex].isActive = false;
      localStorage.setItem('bible_nation_users', JSON.stringify(savedUsers));
      loadUsers();
      
      // Send notification
      addNotification({
        type: 'user_deactivated',
        title: 'User Deactivated',
        message: `${savedUsers[userIndex].name} account has been deactivated`,
        priority: 'medium',
        userId: savedUsers[userIndex].id,
        userName: savedUsers[userIndex].name,
      });
      
      toast.success('User account deactivated');
    }
  };

  const softDeleteUser = (userId: string) => {
    const savedUsers = JSON.parse(localStorage.getItem('bible_nation_users') || '[]');
    const userIndex = savedUsers.findIndex((u: any) => u.id === userId);
    
    if (userIndex !== -1) {
      savedUsers[userIndex].deletedAt = new Date().toISOString();
      savedUsers[userIndex].isActive = false;
      localStorage.setItem('bible_nation_users', JSON.stringify(savedUsers));
      loadUsers();
      toast.success('User account moved to trash (soft deleted)');
    }
  };

  const permanentDeleteUser = (userId: string) => {
    const savedUsers = JSON.parse(localStorage.getItem('bible_nation_users') || '[]');
    const filteredUsers = savedUsers.filter((u: any) => u.id !== userId);
    
    localStorage.setItem('bible_nation_users', JSON.stringify(filteredUsers));
    loadUsers();
    loadStats();
    toast.success('User account permanently deleted');
  };

  const restoreUser = (userId: string) => {
    const savedUsers = JSON.parse(localStorage.getItem('bible_nation_users') || '[]');
    const userIndex = savedUsers.findIndex((u: any) => u.id === userId);
    
    if (userIndex !== -1) {
      savedUsers[userIndex].deletedAt = null;
      savedUsers[userIndex].isActive = true;
      localStorage.setItem('bible_nation_users', JSON.stringify(savedUsers));
      loadUsers();
      toast.success('User account restored');
    }
  };

  const sendTestEmail = () => {
    sendEmailNotification(
      currentUser?.email || 'admin@biblenation.com',
      'Test Email Notification',
      'This is a test email from Bible Nation Admin Dashboard'
    );
    loadEmailLogs();
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date().getTime();
    const then = new Date(timestamp).getTime();
    const diff = now - then;
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'new_account':
        return <UserPlus className="h-5 w-5 text-primary" />;
      case 'lecture_created':
        return <BookOpen className="h-5 w-5 text-blue-500" />;
      case 'comment_added':
        return <MessageSquare className="h-5 w-5 text-green-500" />;
      case 'streak_achieved':
        return <Flame className="h-5 w-5 text-orange-500" />;
      case 'user_activated':
        return <UserCheck className="h-5 w-5 text-green-500" />;
      case 'user_deactivated':
        return <UserX className="h-5 w-5 text-orange-500" />;
      default:
        return <Bell className="h-5 w-5 text-primary" />;
    }
  };

  if (currentUser?.role !== 'admin') {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>You need admin privileges to view this page.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage users, view analytics, and monitor application activity
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">Registered accounts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Notifications</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{notifications.filter(n => !n.read).length}</div>
              <p className="text-xs text-muted-foreground">Unread messages</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Emails Sent</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{emailLogs.length}</div>
              <p className="text-xs text-muted-foreground">Total email notifications</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Today</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeToday}</div>
              <p className="text-xs text-muted-foreground">Users online</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="users" className="space-y-4">
          <TabsList>
            <TabsTrigger value="users">
              <Users className="h-4 w-4 mr-2" />
              User Management
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
              {notifications.filter(n => !n.read).length > 0 && (
                <Badge variant="default" className="ml-2">
                  {notifications.filter(n => !n.read).length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="emails">
              <Mail className="h-4 w-4 mr-2" />
              Email Logs
            </TabsTrigger>
            <TabsTrigger value="settings">
              <SettingsIcon className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* User Management Tab */}
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  View and manage all registered users, track streaks, and control access
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Streak</TableHead>
                      <TableHead>Subscription</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {/* Admin row */}
                    <TableRow>
                      <TableCell className="font-medium">Admin User</TableCell>
                      <TableCell>admin@biblenation.com</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500 text-white">Active</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">N/A</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-purple-500 text-white">Admin</Badge>
                      </TableCell>
                      <TableCell>Current session</TableCell>
                      <TableCell>{formatDate(new Date().toISOString())}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant="outline">Current User</Badge>
                      </TableCell>
                    </TableRow>
                    
                    {users.map((user) => {
                      const getSubscriptionBadge = (status?: string) => {
                        if (status === 'premium') {
                          return <Badge className="bg-yellow-500 text-white">Premium</Badge>;
                        }
                        if (status === 'trial') {
                          return <Badge className="bg-blue-500 text-white">Trial</Badge>;
                        }
                        return <Badge variant="secondary">Free</Badge>;
                      };

                      const getStatusBadge = () => {
                        if (user.deletedAt) {
                          return <Badge variant="destructive">Deleted</Badge>;
                        }
                        if (user.isActive === false) {
                          return <Badge variant="outline" className="border-orange-500 text-orange-500">Inactive</Badge>;
                        }
                        return <Badge className="bg-green-500 text-white">Active</Badge>;
                      };

                      const isDeleted = !!user.deletedAt;
                      const isActive = user.isActive !== false && !isDeleted;

                      return (
                        <TableRow key={user.id} className={isDeleted ? 'opacity-50' : ''}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{getStatusBadge()}</TableCell>
                          <TableCell>
                            {user.streak && user.streak > 0 ? (
                              <div className="flex items-center gap-1">
                                <Flame className="h-4 w-4 text-orange-500" />
                                <span className="font-medium">{user.streak}</span>
                                <span className="text-xs text-muted-foreground">days</span>
                              </div>
                            ) : (
                              <Badge variant="secondary">0</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            {getSubscriptionBadge(user.subscriptionStatus)}
                          </TableCell>
                          <TableCell>
                            {user.lastLoginDate ? (
                              <span className="text-sm">{getTimeAgo(user.lastLoginDate)}</span>
                            ) : (
                              <span className="text-sm text-muted-foreground">Never</span>
                            )}
                          </TableCell>
                          <TableCell>{formatDate(user.createdAt)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              {isDeleted ? (
                                <>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => restoreUser(user.id)}
                                    title="Restore account"
                                  >
                                    <Archive className="h-4 w-4 mr-1" />
                                    Restore
                                  </Button>
                                  
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-red-500 hover:text-red-700"
                                        title="Permanently delete"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Permanently Delete User</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          This will permanently delete <span className="font-semibold">{user.name}</span>'s account. This action cannot be undone and all user data will be lost.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                          onClick={() => permanentDeleteUser(user.id)}
                                          className="bg-red-500 hover:bg-red-600"
                                        >
                                          Permanently Delete
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </>
                              ) : (
                                <>
                                  {isActive ? (
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          title="Deactivate account"
                                        >
                                          <UserX className="h-4 w-4 mr-1" />
                                          Deactivate
                                        </Button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>Deactivate User Account</AlertDialogTitle>
                                          <AlertDialogDescription>
                                            This will deactivate <span className="font-semibold">{user.name}</span>'s account. They will not be able to log in until reactivated.
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                                          <AlertDialogAction onClick={() => deactivateUser(user.id)}>
                                            Deactivate
                                          </AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                  ) : (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => activateUser(user.id)}
                                      title="Activate account"
                                      className="text-green-600 hover:text-green-700"
                                    >
                                      <UserCheck className="h-4 w-4 mr-1" />
                                      Activate
                                    </Button>
                                  )}

                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        title="Move to trash (soft delete)"
                                      >
                                        <Archive className="h-4 w-4" />
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Move User to Trash</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          This will soft delete <span className="font-semibold">{user.name}</span>'s account. The account can be restored later from the trash.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => softDeleteUser(user.id)}>
                                          Move to Trash
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>

                {users.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No users registered yet. Only the admin account exists.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Activity Notifications</CardTitle>
                    <CardDescription>
                      Recent system events and user activities
                    </CardDescription>
                  </div>
                  {notifications.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearAll}
                    >
                      Clear All
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {notifications.length > 0 ? (
                  <ScrollArea className="h-[500px] pr-4">
                    <div className="space-y-3">
                      {notifications.map((notification) => (
                        <Alert
                          key={notification.id}
                          className={`${
                            notification.read ? 'opacity-60' : 'border-primary/50 bg-primary/5'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-3 flex-1">
                              {getNotificationIcon(notification.type)}
                              <div className="flex-1 min-w-0">
                                <AlertTitle className="text-sm">
                                  {notification.title}
                                  {!notification.read && (
                                    <Badge variant="default" className="ml-2 text-xs">
                                      New
                                    </Badge>
                                  )}
                                  <Badge 
                                    variant={
                                      notification.priority === 'high' 
                                        ? 'destructive' 
                                        : notification.priority === 'medium'
                                        ? 'default'
                                        : 'secondary'
                                    } 
                                    className="ml-2 text-xs"
                                  >
                                    {notification.priority}
                                  </Badge>
                                </AlertTitle>
                                <AlertDescription className="text-sm mt-1">
                                  {notification.message}
                                  <div className="text-xs text-muted-foreground mt-1">
                                    {getTimeAgo(notification.timestamp)}
                                  </div>
                                </AlertDescription>
                              </div>
                            </div>
                            <div className="flex gap-1">
                              {!notification.read && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => markAsRead(notification.id)}
                                  className="h-8 w-8 p-0"
                                  title="Mark as read"
                                >
                                  <CheckCircle2 className="h-4 w-4" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteNotification(notification.id)}
                                className="h-8 w-8 p-0"
                                title="Dismiss"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </Alert>
                      ))}
                    </div>
                  </ScrollArea>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Bell className="h-12 w-12 mx-auto mb-4 opacity-20" />
                    <p>No notifications yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Email Logs Tab */}
          <TabsContent value="emails" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Email Notification Logs</CardTitle>
                    <CardDescription>
                      History of all email notifications sent from the system
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={sendTestEmail}>
                    <Mail className="h-4 w-4 mr-2" />
                    Send Test Email
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {emailLogs.length > 0 ? (
                  <ScrollArea className="h-[500px]">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>To</TableHead>
                          <TableHead>Subject</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Sent At</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {emailLogs.map((email) => (
                          <TableRow key={email.id}>
                            <TableCell className="font-medium">{email.to}</TableCell>
                            <TableCell>{email.subject}</TableCell>
                            <TableCell>
                              <Badge className="bg-green-500 text-white">
                                {email.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{formatDateTime(email.timestamp)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Mail className="h-12 w-12 mx-auto mb-4 opacity-20" />
                    <p>No emails sent yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Admin Settings</CardTitle>
                <CardDescription>
                  Configure notification preferences and system settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Volume2 className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Sound Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Play sound for new admin notifications
                      </p>
                    </div>
                  </div>
                  <Button
                    variant={soundEnabled ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      setSoundEnabled(!soundEnabled);
                      toast.success(
                        soundEnabled 
                          ? 'Sound notifications disabled' 
                          : 'Sound notifications enabled'
                      );
                    }}
                  >
                    {soundEnabled ? 'Enabled' : 'Disabled'}
                  </Button>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-medium mb-4">Notification Types</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <UserPlus className="h-4 w-4 text-primary" />
                      <span>New account registrations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-blue-500" />
                      <span>Lecture sessions created</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-green-500" />
                      <span>Comments and interactions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Flame className="h-4 w-4 text-orange-500" />
                      <span>User streak milestones</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <UserCheck className="h-4 w-4 text-green-500" />
                      <span>Account activations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <UserX className="h-4 w-4 text-orange-500" />
                      <span>Account deactivations</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
