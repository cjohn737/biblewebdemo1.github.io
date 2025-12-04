import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { useAuth } from '../contexts/AuthContext';
import { Flame, Calendar, TrendingUp } from 'lucide-react';

export function StreakDisplay() {
  const { user, getCurrentStreak } = useAuth();
  const streak = getCurrentStreak();

  if (!user || user.role === 'admin') return null;

  const getStreakMessage = (days: number) => {
    if (days === 0) return "Start your journey today!";
    if (days === 1) return "Great start! Keep it up!";
    if (days < 7) return "Building momentum!";
    if (days < 30) return "On fire! 🔥";
    if (days < 100) return "Incredible dedication!";
    return "Legendary streak! ⭐";
  };

  const getStreakColor = (days: number) => {
    if (days === 0) return "bg-gray-500";
    if (days < 7) return "bg-blue-500";
    if (days < 30) return "bg-orange-500";
    if (days < 100) return "bg-yellow-500";
    return "bg-purple-500";
  };

  return (
    <Card className="relative overflow-hidden">
      <div className={`absolute inset-0 ${getStreakColor(streak)} opacity-5`} />
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className={`h-5 w-5 ${streak > 0 ? 'text-orange-500' : 'text-muted-foreground'}`} />
            <CardTitle>Login Streak</CardTitle>
          </div>
          {streak >= 7 && (
            <Badge className={getStreakColor(streak) + " text-white"}>
              {streak >= 100 ? "Legendary" : streak >= 30 ? "Master" : "Hot Streak"}
            </Badge>
          )}
        </div>
        <CardDescription>
          {getStreakMessage(streak)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold">{streak}</span>
              <span className="text-muted-foreground">days</span>
            </div>
            {user.lastLoginDate && (
              <p className="text-sm text-muted-foreground mt-2">
                Last login: {new Date(user.lastLoginDate).toLocaleDateString()}
              </p>
            )}
          </div>
          
          {streak > 0 && (
            <div className="flex flex-col items-center gap-2">
              <Flame 
                className={`h-16 w-16 ${
                  streak >= 100 ? 'text-purple-500' :
                  streak >= 30 ? 'text-yellow-500' :
                  streak >= 7 ? 'text-orange-500' :
                  'text-blue-500'
                }`} 
              />
            </div>
          )}
        </div>

        {/* Milestones */}
        <div className="mt-6 space-y-2">
          <p className="text-sm font-medium">Next Milestone:</p>
          <div className="flex gap-2">
            {[7, 30, 100].map((milestone) => (
              <Badge 
                key={milestone}
                variant={streak >= milestone ? "default" : "outline"}
                className={streak >= milestone ? getStreakColor(milestone) + " text-white" : ""}
              >
                {milestone} days
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
