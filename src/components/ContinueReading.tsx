import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { BookOpen, Clock, ChevronRight, Play } from 'lucide-react';

interface ReadingSession {
  id: string;
  book: string;
  chapter: number;
  verse: number;
  progress: number;
  totalVerses: number;
  lastRead: string;
  timeSpent: string;
  version: string;
}

export function ContinueReading() {
  const continueSessions: ReadingSession[] = [
    {
      id: '1',
      book: 'Romans',
      chapter: 8,
      verse: 15,
      progress: 15,
      totalVerses: 39,
      lastRead: '2 hours ago',
      timeSpent: '12 min',
      version: 'KJV',
    },
    {
      id: '2',
      book: 'Genesis',
      chapter: 12,
      verse: 3,
      progress: 3,
      totalVerses: 20,
      lastRead: '1 day ago',
      timeSpent: '8 min',
      version: 'NIV',
    },
    {
      id: '3',
      book: 'Psalms',
      chapter: 119,
      verse: 45,
      progress: 45,
      totalVerses: 176,
      lastRead: '2 days ago',
      timeSpent: '25 min',
      version: 'ESV',
    },
    {
      id: '4',
      book: 'Matthew',
      chapter: 5,
      verse: 20,
      progress: 20,
      totalVerses: 48,
      lastRead: '3 days ago',
      timeSpent: '15 min',
      version: 'KJV',
    },
  ];

  const suggestedReading = [
    {
      title: 'Complete the Sermon on the Mount',
      description: 'You\'re reading Matthew 5. Continue with chapters 6-7',
      book: 'Matthew',
      chapters: '6-7',
    },
    {
      title: 'Finish Romans',
      description: 'You\'re in chapter 8. Only 8 chapters remaining!',
      book: 'Romans',
      chapters: '9-16',
    },
    {
      title: 'Daily Psalm',
      description: 'Continue your journey through the Psalms',
      book: 'Psalms',
      chapters: '120',
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="mb-2">Continue Reading</h1>
          <p className="text-muted-foreground">
            Pick up where you left off in your Bible reading
          </p>
        </div>

        {/* Active Reading Sessions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Active Reading Sessions</h2>
          <div className="grid gap-4">
            {continueSessions.map((session) => (
              <Card key={session.id} className="hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <BookOpen className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">
                            {session.book} {session.chapter}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Badge variant="outline">{session.version}</Badge>
                            <span>•</span>
                            <Clock className="h-3 w-3" />
                            {session.lastRead}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            Verse {session.verse} of {session.totalVerses}
                          </span>
                          <span className="font-medium">
                            {Math.round((session.progress / session.totalVerses) * 100)}% complete
                          </span>
                        </div>
                        <Progress value={(session.progress / session.totalVerses) * 100} />
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {session.timeSpent} spent
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          {session.totalVerses - session.progress} verses remaining
                        </div>
                      </div>
                    </div>

                    <Button className="gap-2">
                      <Play className="h-4 w-4" />
                      Continue
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Suggested Reading */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Suggested Reading</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {suggestedReading.map((suggestion, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-base">{suggestion.title}</CardTitle>
                  <CardDescription>{suggestion.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full justify-between">
                    <span>
                      {suggestion.book} {suggestion.chapters}
                    </span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Reading Tips */}
        <Card className="mt-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardHeader>
            <CardTitle className="text-base">💡 Reading Tip</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Try reading at the same time each day to build a consistent habit. Morning readings can set a positive tone for your day, while evening readings provide reflection time.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
