import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

export type NotificationType = 
  | 'new_account' 
  | 'lecture_created' 
  | 'comment_added' 
  | 'streak_achieved'
  | 'subscription_changed'
  | 'user_activated'
  | 'user_deactivated'
  | 'analysis_completed';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  userId?: string;
  userName?: string;
  userEmail?: string;
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
  metadata?: Record<string, any>;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAll: () => void;
  sendEmailNotification: (to: string, subject: string, body: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Sound effects for notifications
const playNotificationSound = (priority: 'low' | 'medium' | 'high') => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  // Different frequencies for different priorities
  const frequencies = {
    low: 400,
    medium: 600,
    high: 800,
  };

  oscillator.frequency.value = frequencies[priority];
  oscillator.type = 'sine';

  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.5);
};

export function NotificationProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    loadNotifications();
  }, [user]);

  const loadNotifications = () => {
    if (!user) return;
    
    const key = user.role === 'admin' 
      ? 'bible_nation_admin_notifications' 
      : `bible_nation_user_notifications_${user.id}`;
    
    const saved = JSON.parse(localStorage.getItem(key) || '[]');
    setNotifications(saved);
  };

  const saveNotifications = (notifs: Notification[]) => {
    if (!user) return;
    
    const key = user.role === 'admin' 
      ? 'bible_nation_admin_notifications' 
      : `bible_nation_user_notifications_${user.id}`;
    
    localStorage.setItem(key, JSON.stringify(notifs));
    setNotifications(notifs);
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotif: Notification = {
      ...notification,
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      read: false,
    };

    const updated = [newNotif, ...notifications];
    saveNotifications(updated);

    // Play sound for admin notifications
    if (user?.role === 'admin' && notification.priority !== 'low') {
      try {
        playNotificationSound(notification.priority);
      } catch (error) {
        console.log('Sound notification failed:', error);
      }
    }

    // Show toast notification
    const toastMessage = `${notification.title}: ${notification.message}`;
    switch (notification.priority) {
      case 'high':
        toast.error(toastMessage, { duration: 5000 });
        break;
      case 'medium':
        toast.warning(toastMessage, { duration: 4000 });
        break;
      default:
        toast.info(toastMessage, { duration: 3000 });
    }

    // Send email notification for admins on high priority
    if (user?.role === 'admin' && notification.priority === 'high') {
      sendEmailNotification(
        user.email,
        notification.title,
        notification.message
      );
    }
  };

  const markAsRead = (id: string) => {
    const updated = notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    );
    saveNotifications(updated);
  };

  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    saveNotifications(updated);
  };

  const deleteNotification = (id: string) => {
    const updated = notifications.filter(n => n.id !== id);
    saveNotifications(updated);
  };

  const clearAll = () => {
    saveNotifications([]);
  };

  const sendEmailNotification = (to: string, subject: string, body: string) => {
    // Mock email notification system
    // In production, this would integrate with an email service like SendGrid, AWS SES, etc.
    const emailLog = {
      id: `email-${Date.now()}`,
      to,
      subject,
      body,
      timestamp: new Date().toISOString(),
      status: 'sent',
    };

    // Store in localStorage for demo purposes
    const emails = JSON.parse(localStorage.getItem('bible_nation_email_logs') || '[]');
    emails.push(emailLog);
    localStorage.setItem('bible_nation_email_logs', JSON.stringify(emails));

    console.log('📧 Email sent:', emailLog);
    toast.success(`Email notification sent to ${to}`);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAll,
        sendEmailNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
