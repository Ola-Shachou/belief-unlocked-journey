
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ClockIcon } from "lucide-react";

interface SessionData {
  id: string;
  userId: string;
  createdAt: Date | string;
  summaryTitle: string;
}

const History = () => {
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load sessions from localStorage (will be replaced with Firestore)
    const loadSessions = () => {
      try {
        const savedSessions = JSON.parse(localStorage.getItem("beliefSessions") || "[]");
        
        // Sort sessions by date (newest first)
        savedSessions.sort((a: SessionData, b: SessionData) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return dateB - dateA;
        });
        
        setSessions(savedSessions);
        setLoading(false);
      } catch (error) {
        console.error("Error loading sessions:", error);
        setLoading(false);
      }
    };

    loadSessions();
  }, []);

  if (loading) {
    return (
      <div className="container py-12 flex justify-center">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 animate-enter">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-belief-purple mb-2">Your Belief Analysis History</h1>
          <p className="text-muted-foreground">
            Review all your past analyses and track your progress over time.
          </p>
        </div>

        {sessions.length === 0 ? (
          <Card className="belief-card">
            <CardContent className="pt-6 flex flex-col items-center">
              <div className="bg-belief-lightpurple p-3 rounded-full mb-4">
                <ClockIcon className="h-8 w-8 text-belief-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No analysis history yet</h3>
              <p className="text-muted-foreground text-center mb-6">
                Complete your first questionnaire to start tracking your limiting beliefs.
              </p>
              <Link to="/questionnaire" className="w-full max-w-xs">
                <button className="bg-belief-purple hover:bg-belief-purple/90 text-white w-full py-2 px-4 rounded-md transition-colors">
                  Start Your First Analysis
                </button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {sessions.map((session) => {
              // Format the date
              const date = new Date(session.createdAt);
              const formattedDate = date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric'
              });

              return (
                <Link to={`/summary/${session.id}`} key={session.id}>
                  <Card className="belief-card hover:bg-belief-lightpurple/10">
                    <CardHeader>
                      <CardTitle className="text-lg text-belief-purple">
                        {session.summaryTitle}
                      </CardTitle>
                      <CardDescription className="flex items-center mt-2">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        {formattedDate}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
