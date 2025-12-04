import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Sparkles, Loader2 } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

interface VerseNotesProps {
  book: string;
  chapter: number;
  verse: number;
  verseText: string;
  version: string;
  onClose: () => void;
}

export function VerseNotes({ book, chapter, verse, verseText, version, onClose }: VerseNotesProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [notes, setNotes] = useState<{
    summary: string;
    keyPoints: string[];
    insight: string;
  } | null>(null);

  useEffect(() => {
    // Simulate AI analysis
    setIsLoading(true);
    setTimeout(() => {
      setNotes({
        summary: `This verse from ${book} ${chapter}:${verse} speaks to fundamental spiritual truths. The language and context reveal important themes about faith, God's character, and the believer's relationship with the divine.`,
        keyPoints: [
          "Central theme focuses on divine action and human response",
          "Historical context enriches understanding of the passage",
          "Literary structure emphasizes key theological concepts",
          "Connects to broader biblical narrative and themes",
        ],
        insight: "When read in context, this verse provides practical wisdom for daily living. It reminds readers of timeless truths that transcend cultural and temporal boundaries, offering guidance and encouragement for contemporary life.",
      });
      setIsLoading(false);
    }, 1500);
  }, [book, chapter, verse]);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <DialogTitle>AI Scripture Notes</DialogTitle>
          </div>
          <DialogDescription>
            {book} {chapter}:{verse}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[500px] pr-4">
          <div className="space-y-6">
            {/* Verse Text */}
            <div className="bg-muted p-4 rounded-lg border">
              <p className="italic">{verseText}</p>
              <div className="mt-2">
                <Badge variant="secondary" className="text-xs">
                  {version.toUpperCase()}
                </Badge>
              </div>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center space-y-3">
                  <Loader2 className="w-8 h-8 mx-auto animate-spin text-primary" />
                  <p className="text-muted-foreground">Generating AI insights...</p>
                </div>
              </div>
            ) : notes ? (
              <>
                {/* Summary */}
                <div className="space-y-3">
                  <h4>Summary</h4>
                  <p className="text-muted-foreground">{notes.summary}</p>
                </div>

                {/* Key Points */}
                <div className="space-y-3">
                  <h4>Key Points</h4>
                  <ul className="space-y-2">
                    {notes.keyPoints.map((point, index) => (
                      <li key={index} className="flex gap-2 text-muted-foreground">
                        <span className="text-primary">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Insight */}
                <div className="space-y-3">
                  <h4>Application</h4>
                  <p className="text-muted-foreground">{notes.insight}</p>
                </div>
              </>
            ) : null}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}