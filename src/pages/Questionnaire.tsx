
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { questions, generateSummaryTitle } from "@/data";
import { QuestionCard } from "@/components/questionnaire/QuestionCard";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/sonner";

const Questionnaire = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: string | number}>({});
  const navigate = useNavigate();

  const handleAnswer = (questionId: number, answer: string | number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Final question was answered, complete the questionnaire
      const summaryTitle = generateSummaryTitle(answers);
      const sessionData = {
        id: Date.now().toString(),
        userId: "user123", // This will come from authentication later
        createdAt: new Date(),
        answers,
        summaryTitle
      };

      // Save to localStorage for now (will be replaced with Firestore)
      const savedSessions = JSON.parse(localStorage.getItem("beliefSessions") || "[]");
      savedSessions.push(sessionData);
      localStorage.setItem("beliefSessions", JSON.stringify(savedSessions));

      toast.success("Questionnaire completed!");
      
      // Navigate to the summary page with the session ID
      navigate(`/summary/${sessionData.id}`);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-belief-purple mb-2">Identify Your Limiting Belief</h1>
          <p className="text-muted-foreground">
            Answer these questions to help uncover and examine your limiting beliefs.
          </p>
        </div>
        
        <div className="flex items-center gap-2 mb-8">
          <Progress value={progress} className="h-2" />
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            {currentQuestionIndex + 1}/{questions.length}
          </span>
        </div>
        
        <QuestionCard 
          question={currentQuestion}
          previousAnswers={answers}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onBack={handleBack}
          isFirst={currentQuestionIndex === 0}
          isLast={currentQuestionIndex === questions.length - 1}
        />
      </div>
    </div>
  );
};

export default Questionnaire;
