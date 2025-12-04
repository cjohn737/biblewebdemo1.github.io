import { useState } from "react";
import { Card } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { 
  bibleVersions, 
  oldTestamentBooks, 
  newTestamentBooks,
  getChapterVerses 
} from "../data/bibleData";
import { VerseNotes } from "./VerseNotes";

export function BibleReader() {
  const [version, setVersion] = useState("kjv");
  const [selectedBook, setSelectedBook] = useState("john");
  const [selectedChapter, setSelectedChapter] = useState(3);
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  const [testament, setTestament] = useState<"old" | "new">("new");

  const currentBooks = testament === "old" ? oldTestamentBooks : newTestamentBooks;
  const currentBookData = currentBooks.find(b => b.id === selectedBook);
  const verses = getChapterVerses(selectedBook, selectedChapter);

  const handleVerseClick = (verseNum: number) => {
    setSelectedVerse(verseNum);
    toast.success(`Opening insights for ${currentBookData?.name} ${selectedChapter}:${verseNum}`, {
      duration: 2000,
    });
  };

  const handleCloseNotes = () => {
    setSelectedVerse(null);
  };

  const goToPreviousChapter = () => {
    if (selectedChapter > 1) {
      setSelectedChapter(selectedChapter - 1);
    }
  };

  const goToNextChapter = () => {
    if (currentBookData && selectedChapter < currentBookData.chapters) {
      setSelectedChapter(selectedChapter + 1);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Navigation Sidebar */}
      <div className="lg:col-span-1">
        <Card className="p-6">
          <div className="space-y-6">
            {/* Version Selector */}
            <div className="space-y-2">
              <Label>Bible Version</Label>
              <Select value={version} onValueChange={setVersion}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {bibleVersions.map((v) => (
                    <SelectItem key={v.id} value={v.id}>
                      {v.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Testament Tabs */}
            <div>
              <Label className="mb-2 block">Testament</Label>
              <Tabs value={testament} onValueChange={(v) => setTestament(v as "old" | "new")}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="old">Old</TabsTrigger>
                  <TabsTrigger value="new">New</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Book Selector */}
            <div className="space-y-2">
              <Label>Book</Label>
              <ScrollArea className="h-[300px] border rounded-lg">
                <div className="p-2 space-y-1">
                  {currentBooks.map((book) => (
                    <Button
                      key={book.id}
                      variant={selectedBook === book.id ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => {
                        setSelectedBook(book.id);
                        setSelectedChapter(1);
                      }}
                    >
                      {book.name}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Chapter Selector */}
            <div className="space-y-2">
              <Label>Chapter</Label>
              <Select 
                value={selectedChapter.toString()} 
                onValueChange={(v) => setSelectedChapter(parseInt(v))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: currentBookData?.chapters || 1 }, (_, i) => i + 1).map((ch) => (
                    <SelectItem key={ch} value={ch.toString()}>
                      Chapter {ch}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
      </div>

      {/* Reading Area */}
      <div className="lg:col-span-3">
        <Card className="p-6 md:p-8">
          <div className="space-y-6">
            {/* Chapter Header */}
            <div className="flex items-center justify-between border-b pb-4 mb-2">
              <div>
                <h2 className="mb-1">{currentBookData?.name} {selectedChapter}</h2>
                <p className="text-muted-foreground text-sm">
                  {bibleVersions.find(v => v.id === version)?.name}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToPreviousChapter}
                  disabled={selectedChapter === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToNextChapter}
                  disabled={selectedChapter === currentBookData?.chapters}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Verses */}
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-4">
                {Object.entries(verses).map(([verseNum, verseText]) => (
                  <div key={verseNum} className="group">
                    <div 
                      className="flex gap-3 p-3 rounded-lg hover:bg-accent cursor-pointer transition-colors"
                      onClick={() => handleVerseClick(parseInt(verseNum))}
                    >
                      <Badge 
                        variant="outline" 
                        className="h-6 flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      >
                        {verseNum}
                      </Badge>
                      <p className="flex-1">
                        {verseText}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </Card>
      </div>

      {/* Verse Notes Dialog */}
      {selectedVerse !== null && (
        <VerseNotes
          book={currentBookData?.name || ""}
          chapter={selectedChapter}
          verse={selectedVerse}
          verseText={verses[selectedVerse]}
          version={version}
          onClose={handleCloseNotes}
        />
      )}
    </div>
  );
}