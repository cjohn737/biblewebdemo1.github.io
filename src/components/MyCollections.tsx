import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { 
  BookMarked, 
  Heart, 
  Plus,
  Search,
  Folder,
  Tag,
  Clock,
  Trash2
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Label } from './ui/label';
import { ScrollArea } from './ui/scroll-area';

interface SavedVerse {
  id: string;
  book: string;
  chapter: number;
  verse: number;
  text: string;
  tags: string[];
  collection: string;
  savedDate: string;
  notes?: string;
}

interface Collection {
  id: string;
  name: string;
  description: string;
  count: number;
  color: string;
}

export function MyCollections() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);

  const collections: Collection[] = [
    { id: '1', name: 'Favorites', description: 'My most loved verses', count: 24, color: 'red' },
    { id: '2', name: 'Prayer', description: 'Verses about prayer', count: 12, color: 'blue' },
    { id: '3', name: 'Comfort', description: 'For difficult times', count: 18, color: 'green' },
    { id: '4', name: 'Wisdom', description: 'Guidance and wisdom', count: 15, color: 'purple' },
    { id: '5', name: 'Promises', description: 'God\'s promises', count: 21, color: 'orange' },
    { id: '6', name: 'Worship', description: 'Verses of praise', count: 9, color: 'pink' },
  ];

  const savedVerses: SavedVerse[] = [
    {
      id: '1',
      book: 'John',
      chapter: 3,
      verse: 16,
      text: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.',
      tags: ['Love', 'Salvation', 'Faith'],
      collection: 'Favorites',
      savedDate: '2 days ago',
      notes: 'The core message of the Gospel'
    },
    {
      id: '2',
      book: 'Philippians',
      chapter: 4,
      verse: 13,
      text: 'I can do all things through Christ which strengtheneth me.',
      tags: ['Strength', 'Faith', 'Encouragement'],
      collection: 'Favorites',
      savedDate: '1 week ago',
    },
    {
      id: '3',
      book: 'Psalm',
      chapter: 23,
      verse: 1,
      text: 'The LORD is my shepherd; I shall not want.',
      tags: ['Comfort', 'Peace', 'Trust'],
      collection: 'Comfort',
      savedDate: '3 days ago',
    },
    {
      id: '4',
      book: 'Proverbs',
      chapter: 3,
      verse: 5,
      text: 'Trust in the LORD with all thine heart; and lean not unto thine own understanding.',
      tags: ['Wisdom', 'Trust', 'Guidance'],
      collection: 'Wisdom',
      savedDate: '5 days ago',
    },
  ];

  const filteredVerses = selectedCollection
    ? savedVerses.filter(v => v.collection === selectedCollection)
    : savedVerses;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="flex items-center gap-2">
              <BookMarked className="h-8 w-8" />
              My Collections
            </h1>
            <Dialog>
              <DialogTrigger asChild>
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                  <Plus className="h-4 w-4" />
                  New Collection
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Collection</DialogTitle>
                  <DialogDescription>
                    Organize your saved verses into collections
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Collection Name</Label>
                    <Input id="name" placeholder="e.g., Prayer Verses" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input id="description" placeholder="Brief description..." />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Create Collection</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <p className="text-muted-foreground">
            Organize and access your saved verses and notes
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search collections and verses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Collections Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Collections</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[500px]">
                  <div className="space-y-1 p-4">
                    <Button
                      variant={selectedCollection === null ? 'secondary' : 'ghost'}
                      className="w-full justify-start"
                      onClick={() => setSelectedCollection(null)}
                    >
                      <BookMarked className="mr-2 h-4 w-4" />
                      All Verses
                      <Badge variant="secondary" className="ml-auto">
                        {savedVerses.length}
                      </Badge>
                    </Button>
                    
                    {collections.map((collection) => (
                      <Button
                        key={collection.id}
                        variant={selectedCollection === collection.name ? 'secondary' : 'ghost'}
                        className="w-full justify-start"
                        onClick={() => setSelectedCollection(collection.name)}
                      >
                        <Folder className={`mr-2 h-4 w-4 text-${collection.color}-500`} />
                        <span className="flex-1 text-left">{collection.name}</span>
                        <Badge variant="secondary">{collection.count}</Badge>
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Verses Grid */}
          <div className="lg:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                {selectedCollection || 'All Verses'}
              </h2>
              <p className="text-sm text-muted-foreground">
                {filteredVerses.length} {filteredVerses.length === 1 ? 'verse' : 'verses'}
              </p>
            </div>

            <div className="grid gap-4">
              {filteredVerses.map((verse) => (
                <Card key={verse.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base mb-1">
                          {verse.book} {verse.chapter}:{verse.verse}
                        </CardTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {verse.savedDate}
                          <Badge variant="outline" className="text-xs">
                            {verse.collection}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Heart className="h-4 w-4 fill-current text-red-500" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Trash2 className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm italic mb-4 leading-relaxed">
                      "{verse.text}"
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {verse.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="gap-1">
                          <Tag className="h-3 w-3" />
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {verse.notes && (
                      <div className="mt-3 pt-3 border-t">
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium">Notes:</span> {verse.notes}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
