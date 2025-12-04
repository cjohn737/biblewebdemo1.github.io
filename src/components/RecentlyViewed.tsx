import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Clock, BookOpen, GraduationCap, MessageCircle, Trash2 } from 'lucide-react';

interface RecentItem {
  id: string;
  type: 'verse' | 'lecture' | 'chat';
  title: string;
  description: string;
  timestamp: string;
  tags?: string[];
}

export function RecentlyViewed() {
  const recentItems: RecentItem[] = [
    {
      id: '1',
      type: 'verse',
      title: 'John 3:16',
      description: 'For God so loved the world that he gave his one and only Son...',
      timestamp: '2 hours ago',
      tags: ['Love', 'Salvation'],
    },
    {
      id: '2',
      type: 'lecture',
      title: 'The Sermon on the Mount',
      description: 'Detailed study of Matthew 5-7',
      timestamp: '5 hours ago',
      tags: ['Matthew', 'Teaching'],
    },
    {
      id: '3',
      type: 'chat',
      title: 'Prayer and Faith',
      description: 'Discussion about the relationship between prayer and faith',
      timestamp: '1 day ago',
    },
    {
      id: '4',
      type: 'verse',
      title: 'Psalm 23:1-6',
      description: 'The LORD is my shepherd; I shall not want...',
      timestamp: '1 day ago',
      tags: ['Comfort', 'Peace'],
    },
    {
      id: '5',
      type: 'lecture',
      title: 'Understanding Grace',
      description: 'Exploring Ephesians 2:8-9',
      timestamp: '2 days ago',
      tags: ['Grace', 'Salvation'],
    },
    {
      id: '6',
      type: 'chat',
      title: 'Forgiveness',
      description: 'How to forgive others as God forgives us',
      timestamp: '3 days ago',
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'verse':
        return <BookOpen className="h-5 w-5" />;
      case 'lecture':
        return <GraduationCap className="h-5 w-5" />;
      case 'chat':
        return <MessageCircle className="h-5 w-5" />;
      default:
        return <BookOpen className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'verse':
        return 'bg-blue-500/10 text-blue-500';
      case 'lecture':
        return 'bg-purple-500/10 text-purple-500';
      case 'chat':
        return 'bg-green-500/10 text-green-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'verse':
        return 'Scripture';
      case 'lecture':
        return 'Lecture';
      case 'chat':
        return 'AI Chat';
      default:
        return type;
    }
  };

  const verses = recentItems.filter(item => item.type === 'verse');
  const lectures = recentItems.filter(item => item.type === 'lecture');
  const chats = recentItems.filter(item => item.type === 'chat');

  const ItemCard = ({ item }: { item: RecentItem }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor(item.type)}`}>
              {getIcon(item.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium truncate">{item.title}</h3>
                <Badge variant="outline" className="text-xs">
                  {getTypeLabel(item.type)}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                {item.description}
              </p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {item.timestamp}
                </div>
                {item.tags && (
                  <div className="flex gap-1">
                    {item.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm">
              View
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="flex items-center gap-2">
              <Clock className="h-8 w-8" />
              Recently Viewed
            </h1>
            <Button variant="outline" size="sm">
              Clear History
            </Button>
          </div>
          <p className="text-muted-foreground">
            Quick access to your recent verses, lectures, and conversations
          </p>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">
              All ({recentItems.length})
            </TabsTrigger>
            <TabsTrigger value="verses">
              <BookOpen className="h-4 w-4 mr-2" />
              Verses ({verses.length})
            </TabsTrigger>
            <TabsTrigger value="lectures">
              <GraduationCap className="h-4 w-4 mr-2" />
              Lectures ({lectures.length})
            </TabsTrigger>
            <TabsTrigger value="chats">
              <MessageCircle className="h-4 w-4 mr-2" />
              Chats ({chats.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-3">
            {recentItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </TabsContent>

          <TabsContent value="verses" className="space-y-3">
            {verses.length > 0 ? (
              verses.map((item) => <ItemCard key={item.id} item={item} />)
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <BookOpen className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-muted-foreground">No recently viewed verses</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="lectures" className="space-y-3">
            {lectures.length > 0 ? (
              lectures.map((item) => <ItemCard key={item.id} item={item} />)
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <GraduationCap className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-muted-foreground">No recently viewed lectures</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="chats" className="space-y-3">
            {chats.length > 0 ? (
              chats.map((item) => <ItemCard key={item.id} item={item} />)
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <MessageCircle className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-muted-foreground">No recent AI conversations</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
