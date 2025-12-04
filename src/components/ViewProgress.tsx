import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  BookOpen, 
  TrendingUp, 
  Calendar, 
  Award,
  Target,
  Clock,
  ChevronRight
} from 'lucide-react';
import { Button } from './ui/button';

export function ViewProgress() {
  const overallProgress = {
    totalBooks: 66,
    booksRead: 23,
    totalChapters: 1189,
    chaptersRead: 156,
    currentStreak: 7,
    longestStreak: 14,
    totalTime: '24h 32m',
  };

  const bookProgress = [
    { book: 'Genesis', chapters: 50, read: 50, percentage: 100, testament: 'OT' },
    { book: 'Exodus', chapters: 40, read: 25, percentage: 62.5, testament: 'OT' },
    { book: 'Matthew', chapters: 28, read: 28, percentage: 100, testament: 'NT' },
    { book: 'John', chapters: 21, read: 15, percentage: 71.4, testament: 'NT' },
    { book: 'Romans', chapters: 16, read: 8, percentage: 50, testament: 'NT' },
    { book: 'Psalms', chapters: 150, read: 45, percentage: 30, testament: 'OT' },
  ];

  const monthlyStats = [
    { month: 'November', chapters: 24, verses: 547, time: '12h 15m' },
    { month: 'October', chapters: 31, verses: 698, time: '15h 42m' },
    { month: 'September', chapters: 28, verses: 601, time: '14h 08m' },
  ];

  const achievements = [
    { name: 'Early Bird', description: '7-day reading streak', icon: '🔥', unlocked: true },
    { name: 'Gospel Reader', description: 'Read all 4 Gospels', icon: '📖', unlocked: true },
    { name: 'Psalm Lover', description: 'Read 50 Psalms', icon: '🎵', unlocked: false },
    { name: 'Bible Scholar', description: 'Read entire Bible', icon: '🎓', unlocked: false },
    { name: 'Devoted', description: '30-day reading streak', icon: '⭐', unlocked: false },
    { name: 'Wisdom Seeker', description: 'Read all wisdom books', icon: '💡', unlocked: false },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2">Reading Progress</h1>
          <p className="text-muted-foreground">
            Track your Bible reading journey and celebrate milestones
          </p>
        </div>

        {/* Overall Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Books Completed</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {overallProgress.booksRead}/{overallProgress.totalBooks}
              </div>
              <Progress 
                value={(overallProgress.booksRead / overallProgress.totalBooks) * 100} 
                className="mt-2"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chapters Read</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {overallProgress.chaptersRead}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                of {overallProgress.totalChapters} total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallProgress.currentStreak} days</div>
              <p className="text-xs text-muted-foreground mt-2">
                Record: {overallProgress.longestStreak} days
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reading Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallProgress.totalTime}</div>
              <p className="text-xs text-muted-foreground mt-2">
                This month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="books" className="space-y-4">
          <TabsList>
            <TabsTrigger value="books">
              <BookOpen className="h-4 w-4 mr-2" />
              By Book
            </TabsTrigger>
            <TabsTrigger value="monthly">
              <Calendar className="h-4 w-4 mr-2" />
              Monthly Stats
            </TabsTrigger>
            <TabsTrigger value="achievements">
              <Award className="h-4 w-4 mr-2" />
              Achievements
            </TabsTrigger>
          </TabsList>

          <TabsContent value="books" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Book Progress</CardTitle>
                <CardDescription>
                  See which books you've read and which ones are in progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookProgress.map((book, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Badge variant={book.testament === 'OT' ? 'default' : 'secondary'}>
                            {book.testament}
                          </Badge>
                          <span className="font-medium">{book.book}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {book.read}/{book.chapters} chapters
                        </div>
                      </div>
                      <Progress value={book.percentage} />
                      <div className="text-xs text-muted-foreground text-right">
                        {book.percentage.toFixed(0)}% complete
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monthly" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Statistics</CardTitle>
                <CardDescription>
                  Your reading activity over the past months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyStats.map((stat, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent transition-colors"
                    >
                      <div>
                        <div className="font-medium mb-1">{stat.month}</div>
                        <div className="text-sm text-muted-foreground">
                          {stat.chapters} chapters • {stat.verses} verses
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{stat.time}</div>
                        <div className="text-xs text-muted-foreground">reading time</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
                <CardDescription>
                  Unlock achievements as you read and study the Bible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${
                        achievement.unlocked
                          ? 'border-primary bg-primary/5'
                          : 'border-border opacity-60'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{achievement.name}</span>
                            {achievement.unlocked && (
                              <Badge variant="default" className="text-xs">
                                Unlocked
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
