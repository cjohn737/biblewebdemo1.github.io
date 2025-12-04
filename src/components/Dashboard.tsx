import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { ScrollArea } from "./ui/scroll-area";
import { Footer } from "./Footer";
import { UserNotifications } from "./UserNotifications";
import { StreakDisplay } from "./StreakDisplay";
import { useAuth } from "../contexts/AuthContext";
import { 
  BookOpen, 
  BookMarked, 
  Clock, 
  TrendingUp, 
  Calendar,
  Heart,
  ChevronRight,
  Flame
} from "lucide-react";

interface DashboardProps {
  onNavigateToRead: () => void;
  onNavigateToProgress?: () => void;
  onNavigateToCollections?: () => void;
  onNavigateToContinue?: () => void;
  onNavigateToRecent?: () => void;
  onNavigateToChatbot?: () => void;
}

export function Dashboard({ 
  onNavigateToRead,
  onNavigateToProgress,
  onNavigateToCollections,
  onNavigateToContinue,
  onNavigateToRecent,
  onNavigateToChatbot
}: DashboardProps) {
  const { getCurrentStreak } = useAuth();
  const currentStreak = getCurrentStreak();
  
  // Mock data - in a real app, this would come from an API
  const recentReadings = [
    { book: "John", chapter: 3, verse: 16, date: "2 hours ago" },
    { book: "Psalms", chapter: 23, verse: 1, date: "1 day ago" },
    { book: "Genesis", chapter: 1, verse: 1, date: "2 days ago" },
    { book: "Romans", chapter: 8, verse: 28, date: "3 days ago" },
  ];

  const savedVerses = [
    { 
      book: "John", 
      chapter: 3, 
      verse: 16, 
      text: "For God so loved the world, that he gave his only begotten Son...",
      tags: ["Love", "Salvation"]
    },
    { 
      book: "Philippians", 
      chapter: 4, 
      verse: 13, 
      text: "I can do all things through Christ which strengtheneth me.",
      tags: ["Strength", "Faith"]
    },
    { 
      book: "Jeremiah", 
      chapter: 29, 
      verse: 11, 
      text: "For I know the thoughts that I think toward you...",
      tags: ["Hope", "Future"]
    },
  ];

  const readingGoals = [
    { name: "Old Testament", progress: 45, total: 929 },
    { name: "New Testament", progress: 78, total: 260 },
    { name: "This Week", progress: 12, total: 20 },
  ];

  return (
    <div className="bg-background">
      <main className="container mx-auto px-4 py-8 min-h-[calc(100vh-4rem)]">
        {/* Welcome Section */}
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-3 duration-500">
          <h1 className="mb-2">Welcome back!</h1>
          <p className="text-muted-foreground">
            Continue your spiritual journey and track your progress
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <Card className="p-4 md:p-6 hover:shadow-lg transition-all hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-3 duration-500 delay-100">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <BookOpen className="h-5 w-5 md:h-6 md:w-6 text-primary" />
              </div>
              <Badge variant="secondary" className="text-xs">This week</Badge>
            </div>
            <h2 className="mb-1">24</h2>
            <p className="text-sm text-muted-foreground">Chapters read</p>
          </Card>

          <Card className="p-4 md:p-6 hover:shadow-lg transition-all hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-3 duration-500 delay-200">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-chart-2/10 flex items-center justify-center">
                <Flame className="h-5 w-5 md:h-6 md:w-6 text-chart-2" />
              </div>
              <Badge variant="secondary" className="text-xs">Streak</Badge>
            </div>
            <h2 className="mb-1">{currentStreak}</h2>
            <p className="text-sm text-muted-foreground">Days in a row</p>
          </Card>

          <Card className="p-4 md:p-6 hover:shadow-lg transition-all hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-3 duration-500 delay-300">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-chart-3/10 flex items-center justify-center">
                <BookMarked className="h-5 w-5 md:h-6 md:w-6 text-chart-3" />
              </div>
              <Badge variant="secondary" className="text-xs">Total</Badge>
            </div>
            <h2 className="mb-1">156</h2>
            <p className="text-sm text-muted-foreground">Saved verses</p>
          </Card>

          <Card className="p-4 md:p-6 hover:shadow-lg transition-all hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-3 duration-500 delay-[400ms]">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-chart-4/10 flex items-center justify-center">
                <Clock className="h-5 w-5 md:h-6 md:w-6 text-chart-4" />
              </div>
              <Badge variant="secondary" className="text-xs">This month</Badge>
            </div>
            <h2 className="mb-1">12h</h2>
            <p className="text-sm text-muted-foreground">Reading time</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Recent & Saved */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Readings */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <h3>Recent Readings</h3>
                </div>
                <Button variant="ghost" size="sm" onClick={onNavigateToRead}>
                  View all
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-4">
                {recentReadings.map((reading, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent cursor-pointer transition-colors"
                    onClick={onNavigateToRead}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">
                          {reading.book} {reading.chapter}:{reading.verse}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {reading.date}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </Card>

            {/* Saved Verses */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-muted-foreground" />
                  <h3>Saved Verses</h3>
                </div>
                <Button variant="ghost" size="sm">
                  View all
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {savedVerses.map((verse, index) => (
                    <div 
                      key={index}
                      className="p-4 rounded-lg border border-border hover:bg-accent cursor-pointer transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="font-medium">
                          {verse.book} {verse.chapter}:{verse.verse}
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Heart className="h-4 w-4 fill-current text-destructive" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground italic mb-3">
                        "{verse.text}"
                      </p>
                      <div className="flex gap-2">
                        {verse.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>
          </div>

          {/* Right Column - Goals & Activity */}
          <div className="space-y-6">
            {/* Streak Display */}
            <StreakDisplay />

            {/* User Notifications */}
            <UserNotifications />

            {/* Reading Goals */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="h-5 w-5 text-muted-foreground" />
                <h3>Reading Goals</h3>
              </div>
              <div className="space-y-6">
                {readingGoals.map((goal, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium">{goal.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {goal.progress}/{goal.total}
                      </div>
                    </div>
                    <Progress value={(goal.progress / goal.total) * 100} />
                  </div>
                ))}
              </div>
              <Button className="w-full mt-6" variant="outline">
                Set New Goal
              </Button>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}