
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

  // Group questions for the summary display
  const getSummarySection = (title: string, content: React.ReactNode) => (
    <div className="pb-4 mb-4 border-b border-muted last:border-0">
      <h3 className="font-medium text-belief-purple mb-2">{title}</h3>
      <div className="pl-4 border-l-2 border-belief-lightpurple">
        {content}
      </div>
    </div>
  );

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
                <CardTitle className="text-2xl text-belief-purple">Belief Exploration Summary</CardTitle>
                <CardDescription className="mt-1 text-belief-purple/80">
                  Understanding your challenge and how you experience it
                </CardDescription>
              </div>
              <BookmarkIcon className="h-6 w-6 text-belief-purple" />
            </div>
          </CardHeader>
          <CardContent className="pt-6 pb-2 space-y-6">
            {/* Main difficulty */}
            {getSummarySection(
              "The challenge you're currently facing:",
              <p className="py-1 font-medium">{session.answers[1] as string}</p>
            )}
            
            {/* Emotions */}
            {getSummarySection(
              "The emotions associated with this challenge:",
              <p className="py-1">{session.answers[2] as string}</p>
            )}
            
            {/* Body location */}
            {getSummarySection(
              "Where you physically experience these emotions:",
              <p className="py-1">{session.answers[3] as string}</p>
            )}
            
            {/* Visual representation */}
            <div className="pb-4 mb-4 border-b border-muted">
              <h3 className="font-medium text-belief-purple mb-2">How you visualize this challenge:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4 border-l-2 border-belief-lightpurple">
                {/* Shape */}
                <div>
                  <p className="text-sm text-muted-foreground">Shape:</p>
                  <p>{session.answers[4] as string}</p>
                  <p className="mt-2 text-sm text-muted-foreground">Dimensionality:</p>
                  <p>{session.answers[7] as string}</p>
                </div>
                
                {/* Colors and textures */}
                <div>
                  <p className="text-sm text-muted-foreground">Color:</p>
                  <p>{session.answers[5] as string}</p>
                  <p className="mt-2 text-sm text-muted-foreground">Texture:</p>
                  <p>{session.answers[6] as string}</p>
                  <p className="mt-2 text-sm text-muted-foreground">Background color:</p>
                  <p>{session.answers[8] as string}</p>
                </div>
              </div>
            </div>
            
            {/* Intensity */}
            {getSummarySection(
              "Intensity of emotional response:",
              <div className="flex items-center mt-2">
                <div className="bg-belief-lightpurple text-belief-purple font-medium rounded-full h-8 w-8 flex items-center justify-center">
                  {session.answers[9]}
                </div>
                <span className="ml-2 text-sm text-muted-foreground">out of 10</span>
              </div>
            )}
            
            {/* Memory */}
            {getSummarySection(
              "Your earliest memory of this experience:",
              <p className="py-1">{session.answers[10] as string}</p>
            )}
            
            {/* Title */}
            {getSummarySection(
              "How you've titled this experience:",
              <p className="py-1 font-semibold text-belief-purple">{session.answers[11] as string}</p>
            )}
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
