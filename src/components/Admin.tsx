import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useAuth } from '../contexts/AuthContext';
import { Users, BookOpen, MessageSquare, TrendingUp, Bell, CheckCircle2, UserPlus, X, UserCheck, UserX, Trash2, Archive } from 'lucide-react';
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
}

interface Notification {
  id: string;
  type: 'new_account';
  userName: string;
  userEmail: string;
  timestamp: string;
  read: boolean;
}

export function Admin() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAnalyses: 0,
    totalNotes: 0,
    activeToday: 0,
  });

  useEffect(() => {
    loadUsers();
    loadStats();
    loadNotifications();

    // Poll for new notifications every 5 seconds
    const interval = setInterval(loadNotifications, 5000);
    return () => clearInterval(interval);
  }, []);

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
      totalAnalyses: 0, // Would calculate from user data
      totalNotes: 0, // Would calculate from user data
      activeToday: 1, // Mock data
    });
  };

  const loadNotifications = () => {
    const savedNotifications = JSON.parse(
      localStorage.getItem('bible_nation_admin_notifications') || '[]'
    );
    setNotifications(savedNotifications);
  };

  const markNotificationAsRead = (id: string) => {
    const updated = notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updated);
    localStorage.setItem('bible_nation_admin_notifications', JSON.stringify(updated));
  };

  const dismissNotification = (id: string) => {
    const updated = notifications.filter(n => n.id !== id);
    setNotifications(updated);
    localStorage.setItem('bible_nation_admin_notifications', JSON.stringify(updated));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    localStorage.setItem('bible_nation_admin_notifications', JSON.stringify([]));
  };

  const activateUser = (userId: string) => {
    const savedUsers = JSON.parse(localStorage.getItem('bible_nation_users') || '[]');
    const userIndex = savedUsers.findIndex((u: any) => u.id === userId);
    
    if (userIndex !== -1) {
      savedUsers[userIndex].isActive = true;
      localStorage.setItem('bible_nation_users', JSON.stringify(savedUsers));
      loadUsers();
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

        {/* Notifications Section */}
        {notifications.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                <h2 className="font-semibold">Notifications</h2>
                <Badge variant="default">{notifications.filter(n => !n.read).length}</Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllNotifications}
              >
                Clear All
              </Button>
            </div>
            <ScrollArea className="h-[200px]">
              <div className="space-y-2 pr-4">
                {notifications.map((notification) => (
                  <Alert
                    key={notification.id}
                    className={`${
                      notification.read ? 'opacity-60' : 'border-primary/50 bg-primary/5'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <UserPlus className="h-5 w-5 text-primary mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <AlertTitle className="text-sm">
                            New Account Created
                            {!notification.read && (
                              <Badge variant="default" className="ml-2 text-xs">
                                New
                              </Badge>
                            )}
                          </AlertTitle>
                          <AlertDescription className="text-sm mt-1">
                            <span className="font-medium">{notification.userName}</span> ({notification.userEmail}) just signed up!
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
                            onClick={() => markNotificationAsRead(notification.id)}
                            className="h-8 w-8 p-0"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => dismissNotification(notification.id)}
                          className="h-8 w-8 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Alert>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                Registered accounts
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Analyses Created</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalAnalyses}</div>
              <p className="text-xs text-muted-foreground">
                AI-generated insights
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Notes Saved</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalNotes}</div>
              <p className="text-xs text-muted-foreground">
                User annotations
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Today</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeToday}</div>
              <p className="text-xs text-muted-foreground">
                Users online
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="users" className="space-y-4">
          <TabsList>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
              {notifications.filter(n => !n.read).length > 0 && (
                <Badge variant="default" className="ml-2">
                  {notifications.filter(n => !n.read).length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  View and manage all registered users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Subscription</TableHead>
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
                        <Badge variant="default">Admin</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-purple-500 text-white">Admin</Badge>
                      </TableCell>
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
                            <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {getSubscriptionBadge(user.subscriptionStatus)}
                          </TableCell>
                          <TableCell>{formatDate(user.createdAt)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              {isDeleted ? (
                                <>
                                  {/* Restore button */}
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => restoreUser(user.id)}
                                    title="Restore account"
                                  >
                                    <Archive className="h-4 w-4 mr-1" />
                                    Restore
                                  </Button>
                                  
                                  {/* Permanent delete with confirmation */}
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
                                  {/* Activate/Deactivate button */}
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

                                  {/* Soft delete with confirmation */}
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
                      onClick={clearAllNotifications}
                    >
                      Clear All
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {notifications.length > 0 ? (
                  <div className="space-y-3">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 rounded-lg border ${
                          notification.read
                            ? 'bg-background border-border opacity-60'
                            : 'bg-primary/5 border-primary/30'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3 flex-1">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <UserPlus className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium text-sm">New Account Created</h4>
                                {!notification.read && (
                                  <Badge variant="default" className="text-xs">
                                    New
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                <span className="font-medium text-foreground">
                                  {notification.userName}
                                </span>{' '}
                                ({notification.userEmail}) has joined Bible Nation
                              </p>
                              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                <span>{getTimeAgo(notification.timestamp)}</span>
                                <span>•</span>
                                <span>
                                  {new Date(notification.timestamp).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markNotificationAsRead(notification.id)}
                                className="h-8 w-8 p-0"
                                title="Mark as read"
                              >
                                <CheckCircle2 className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => dismissNotification(notification.id)}
                              className="h-8 w-8 p-0"
                              title="Dismiss"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Bell className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-50" />
                    <h3 className="font-medium mb-1">No Notifications</h3>
                    <p className="text-sm text-muted-foreground">
                      You're all caught up! New notifications will appear here.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Content Management</CardTitle>
                <CardDescription>
                  Manage lectures, analyses, and study materials
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Content management features coming soon...
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Application Settings</CardTitle>
                <CardDescription>
                  Configure application-wide settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Settings panel coming soon...
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}