import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { useNotifications } from '../contexts/NotificationContext';
import { useAuth } from '../contexts/AuthContext';
import { Bell, Flame, X, CheckCircle2, TrendingUp } from 'lucide-react';

export function UserNotifications() {
  const { user } = useAuth();
  const { notifications, markAsRead, deleteNotification, clearAll } = useNotifications();

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

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'streak_achieved':
        return <Flame className="h-5 w-5 text-orange-500" />;
      default:
        return <Bell className="h-5 w-5 text-primary" />;
    }
  };

  if (!user || user.role === 'admin') return null;

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <CardTitle>Notifications</CardTitle>
            {unreadCount > 0 && (
              <Badge variant="default">{unreadCount}</Badge>
            )}
          </div>
          {notifications.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAll}
            >
              Clear All
            </Button>
          )}
        </div>
        <CardDescription>
          Your recent activities and achievements
        </CardDescription>
      </CardHeader>
      <CardContent>
        {notifications.length > 0 ? (
          <ScrollArea className="h-[300px] pr-4">
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
          <div className="text-center py-8 text-muted-foreground">
            <Bell className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p>No notifications yet</p>
            <p className="text-sm mt-2">Keep using Bible Nation to unlock achievements!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
