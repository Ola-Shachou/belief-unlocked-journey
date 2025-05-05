
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HistoryIcon, PlusCircleIcon, BookOpenIcon } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="container py-8 animate-enter">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-belief-purple mb-2">Welcome to Belief Unlocked</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Identify and overcome your limiting beliefs to unlock your full potential. 
            Our guided process helps you understand what's holding you back.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="belief-card">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <PlusCircleIcon className="h-5 w-5 text-belief-purple" />
                <CardTitle>New Analysis</CardTitle>
              </div>
              <CardDescription>
                Start a new limiting belief analysis session
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm">
                Answer 5 targeted questions to identify and understand a limiting belief that's holding you back.
              </p>
              <Link to="/questionnaire">
                <Button className="w-full">Begin New Session</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="belief-card">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <HistoryIcon className="h-5 w-5 text-belief-purple" />
                <CardTitle>View History</CardTitle>
              </div>
              <CardDescription>
                Review your past analysis sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm">
                Track your progress over time and see how your limiting beliefs have changed.
              </p>
              <Link to="/history">
                <Button variant="outline" className="w-full">View History</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <Card className="belief-card bg-belief-softblue/30">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <BookOpenIcon className="h-5 w-5 text-belief-purple" />
              <CardTitle>Learn About Limiting Beliefs</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>
                <strong>What are limiting beliefs?</strong> Limiting beliefs are thoughts or perceptions that you believe to be absolute truth, but which hold you back in some way from reaching your full potential.
              </p>
              <p>
                <strong>How they form:</strong> Limiting beliefs often form in childhood, through traumatic experiences, from cultural messaging, or as a result of past failures.
              </p>
              <p>
                <strong>Common examples:</strong> "I'm not good enough," "I don't deserve success," "I'll always be rejected," or "I have to be perfect to be loved."
              </p>
              <p>
                <strong>How our app helps:</strong> By identifying and examining your limiting beliefs through our guided questionnaire, you take the first step toward overcoming them.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
