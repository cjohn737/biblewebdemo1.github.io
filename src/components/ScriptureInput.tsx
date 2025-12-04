import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card } from "./ui/card";
import { Sparkles } from "lucide-react";

interface ScriptureInputProps {
  onAnalyze: (text: string) => void;
  isLoading?: boolean;
}

export function ScriptureInput({ onAnalyze, isLoading }: ScriptureInputProps) {
  const [scriptureText, setScriptureText] = useState("");
  const [book, setBook] = useState("");
  const [chapter, setChapter] = useState("");
  const [verse, setVerse] = useState("");

  const handleAnalyze = () => {
    if (scriptureText.trim()) {
      onAnalyze(scriptureText);
    }
  };

  return (
    <Card className="p-6">
      <Tabs defaultValue="paste" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="paste">Paste Scripture</TabsTrigger>
          <TabsTrigger value="select">Select Reference</TabsTrigger>
        </TabsList>
        
        <TabsContent value="paste" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="scripture">Enter Scripture Text</Label>
            <Textarea
              id="scripture"
              placeholder="Paste your scripture or reading here..."
              className="min-h-[200px] resize-none"
              value={scriptureText}
              onChange={(e) => setScriptureText(e.target.value)}
            />
          </div>
          <Button 
            className="w-full gap-2" 
            onClick={handleAnalyze}
            disabled={!scriptureText.trim() || isLoading}
          >
            <Sparkles className="w-4 h-4" />
            {isLoading ? "Analyzing..." : "Analyze with AI"}
          </Button>
        </TabsContent>
        
        <TabsContent value="select" className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="book">Book</Label>
              <Select value={book} onValueChange={setBook}>
                <SelectTrigger id="book">
                  <SelectValue placeholder="Select book" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="genesis">Genesis</SelectItem>
                  <SelectItem value="exodus">Exodus</SelectItem>
                  <SelectItem value="john">John</SelectItem>
                  <SelectItem value="romans">Romans</SelectItem>
                  <SelectItem value="psalms">Psalms</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="chapter">Chapter</Label>
              <Select value={chapter} onValueChange={setChapter}>
                <SelectTrigger id="chapter">
                  <SelectValue placeholder="Chapter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="verse">Verse</Label>
              <Select value={verse} onValueChange={setVerse}>
                <SelectTrigger id="verse">
                  <SelectValue placeholder="Verse" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button 
            className="w-full gap-2"
            disabled={!book || !chapter || isLoading}
          >
            <Sparkles className="w-4 h-4" />
            Load & Analyze
          </Button>
        </TabsContent>
      </Tabs>
    </Card>
  );
}