
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { questions } from "@/data/questionnaireData";
import { ArrowLeftIcon, BookmarkIcon } from "lucide-react";

interface SessionData {
  id: string;
  userId: string;
  createdAt: Date | string;
  answers: {
    [key: number]: string | number;
  };
  summaryTitle: string;
}

const Summary = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [session, setSession] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load session data from localStorage (will be replaced with Firestore)
    const loadSession = () => {
      try {
        const savedSessions = JSON.parse(localStorage.getItem("beliefSessions") || "[]");
        const foundSession = savedSessions.find((s: SessionData) => s.id === sessionId);
        
        if (foundSession) {
          // Convert date string back to Date object if needed
          foundSession.createdAt = new Date(foundSession.createdAt);
          setSession(foundSession);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error loading session:", error);
        setLoading(false);
      }
    };

    loadSession();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="container py-12 flex justify-center">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your results...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="container py-12">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Session Not Found</CardTitle>
            <CardDescription>
              The session you're looking for doesn't exist or has been deleted.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link to="/dashboard">
              <Button>Go Back to Dashboard</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Format the date
  const formattedDate = session.createdAt instanceof Date 
    ? session.createdAt.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : 'Unknown date';

  return (
    <div className="container py-8 animate-enter">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center text-primary hover:underline">
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
          <span className="text-sm text-muted-foreground">{formattedDate}</span>
        </div>

        <Card className="border-belief-purple/20">
          <CardHeader className="bg-belief-lightpurple rounded-t-xl">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl text-belief-purple">Limiting Belief Analysis</CardTitle>
                <CardDescription className="mt-1 text-belief-purple/80">
                  Understanding your limiting belief and its impact
                </CardDescription>
              </div>
              <BookmarkIcon className="h-6 w-6 text-belief-purple" />
            </div>
          </CardHeader>
          <CardContent className="pt-6 pb-2 space-y-6">
            {questions.map((question) => (
              <div key={question.id} className="pb-4 border-b border-muted last:border-0">
                <h3 className="font-medium text-belief-purple mb-1">{question.text}</h3>
                <div className="pl-4 border-l-2 border-belief-lightpurple">
                  {question.type === 'scale' ? (
                    <div className="flex items-center mt-2">
                      <div className="bg-belief-lightpurple text-belief-purple font-medium rounded-full h-8 w-8 flex items-center justify-center">
                        {session.answers[question.id]}
                      </div>
                      <span className="ml-2 text-sm text-muted-foreground">out of 10</span>
                    </div>
                  ) : (
                    <p className="py-1">{session.answers[question.id] as string}</p>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter className="pt-2 pb-6 flex justify-center">
            <Link to="/questionnaire">
              <Button variant="outline">Start New Analysis</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Summary;
