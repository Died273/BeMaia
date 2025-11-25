import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, ArrowRight, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useSurveys } from '@/hooks/useSurveys';
import Header from '@/components/Header';

const Surveys = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const { availableSurveys, loading } = useSurveys(userId);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login', { state: { from: '/surveys' } });
        return;
      }
      setUserId(user.id);
    };
    checkUser();
  }, [navigate]);

  if (loading || !userId) {
    return (
      <div className="min-h-screen flex items-center justify-center page-bg">
        <div className="text-primary text-lg">Loading surveys...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen page-bg">
      <Header />
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Available Surveys
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select a survey below to get started. Complete surveys will be removed from this list.
          </p>
        </div>

        {/* Surveys Grid */}
        {availableSurveys.length === 0 ? (
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-center">No Surveys Available</CardTitle>
              <CardDescription className="text-center">
                You have completed all available surveys or there are no surveys at this time.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Button onClick={() => navigate('/profile')}>
                Go to Profile
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableSurveys.map((survey) => (
              <Card
                key={survey.survey_id}
                className="hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => navigate(`/questionnaire/db?survey=${survey.survey_id}`)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <FileText className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                  <CardTitle className="text-xl mt-4">{survey.survey_name}</CardTitle>
                  <CardDescription>
                    {survey.is_started 
                      ? `Continue survey - ${survey.progress}% complete` 
                      : 'Click to start this survey'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {survey.is_started && survey.progress && survey.progress > 0 && (
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Progress</span>
                        <span>{survey.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary rounded-full h-2 transition-all" 
                          style={{ width: `${survey.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                  <Button className="w-full" variant="outline">
                    {survey.is_started ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Continue Survey
                      </>
                    ) : (
                      'Start Survey'
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Footer Info */}
        {availableSurveys.length > 0 && (
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              You have {availableSurveys.length} survey{availableSurveys.length !== 1 ? 's' : ''} available to complete
            </p>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default Surveys;
