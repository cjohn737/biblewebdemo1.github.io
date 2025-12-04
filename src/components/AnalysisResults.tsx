import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { BookOpen, Lightbulb, History, Heart, MessageSquare } from "lucide-react";

interface AnalysisResultsProps {
  analysis: {
    scripture: string;
    reference?: string;
    summary: string;
    keyThemes: string[];
    historicalContext: string;
    modernApplication: string;
    reflection: string;
  } | null;
}

export function AnalysisResults({ analysis }: AnalysisResultsProps) {
  if (!analysis) {
    return (
      <Card className="p-12 text-center">
        <BookOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="mb-2">No Analysis Yet</h3>
        <p className="text-muted-foreground">
          Enter a scripture above and click "Analyze with AI" to see the breakdown
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          {analysis.reference && (
            <div>
              <Badge variant="secondary">{analysis.reference}</Badge>
            </div>
          )}
          <div className="bg-muted p-4 rounded-lg border border-border">
            <p className="italic">{analysis.scripture}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5" />
            <h3>AI Summary</h3>
          </div>
          <p className="text-muted-foreground">{analysis.summary}</p>
        </div>
      </Card>

      <Card className="p-6">
        <div className="space-y-4">
          <h3>Key Themes</h3>
          <div className="flex flex-wrap gap-2">
            {analysis.keyThemes.map((theme, index) => (
              <Badge key={index} variant="outline">
                {theme}
              </Badge>
            ))}
          </div>
        </div>
      </Card>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="historical" className="border rounded-lg px-6 mb-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <History className="w-5 h-5" />
              <span>Historical Context</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground pt-4">
            {analysis.historicalContext}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="modern" className="border rounded-lg px-6 mb-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              <span>Modern Application</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground pt-4">
            {analysis.modernApplication}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="reflection" className="border rounded-lg px-6">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              <span>Reflection Questions</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground pt-4">
            {analysis.reflection}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}