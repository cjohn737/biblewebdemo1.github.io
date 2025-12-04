import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Clock, BookmarkPlus } from "lucide-react";
import { Button } from "./ui/button";

const recentAnalyses = [
  { reference: "John 3:16", date: "Today" },
  { reference: "Psalms 23:1-6", date: "Yesterday" },
  { reference: "Romans 8:28", date: "2 days ago" },
  { reference: "Genesis 1:1", date: "1 week ago" },
];

export function Sidebar() {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5" />
            <h3>Recent Analyses</h3>
          </div>
          <ScrollArea className="h-[300px]">
            <div className="space-y-3">
              {recentAnalyses.map((item, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg border border-border hover:bg-accent cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span>{item.reference}</span>
                    <Badge variant="secondary" className="text-xs">
                      {item.date}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </Card>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <BookmarkPlus className="w-5 h-5" />
            <h3>Quick Actions</h3>
          </div>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              Save Analysis
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Export as PDF
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Share Link
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-primary text-primary-foreground">
        <div className="space-y-3">
          <h4>Daily Verse</h4>
          <p className="text-sm">
            "For I know the plans I have for you," declares the Lord...
          </p>
          <Badge variant="secondary" className="mt-2">
            Jeremiah 29:11
          </Badge>
        </div>
      </Card>
    </div>
  );
}