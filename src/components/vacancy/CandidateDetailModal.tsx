import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  Star,
  MessageSquare,
  Clock,
  Briefcase,
  Send,
  Download,
  ExternalLink,
  ChevronRight,
  User,
  History,
  Paperclip,
  Tags,
  UserX,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Candidate } from "@/data/mockVacancyData";
import { SendEmailModal } from "./SendEmailModal";
import { ScheduleMeetingModal } from "./ScheduleMeetingModal";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useToast } from "@/hooks/use-toast";

interface CandidateDetailModalProps {
  candidate: Candidate | null;
  currentStage: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onReject?: (candidateId: string) => void;
  onAssign?: () => void;
}

// Extended candidate data for the modal
const getCandidateDetails = (candidate: Candidate, stageName: string) => ({
  ...candidate,
  email: `${candidate.name.toLowerCase().replace(' ', '.')}@email.com`,
  phone: '+31 6 12345678',
  location: 'Amsterdam, Nederland',
  linkedin: `linkedin.com/in/${candidate.name.toLowerCase().replace(' ', '-')}`,
  appliedDate: '5 januari 2024',
  currentJob: 'Account Manager bij XYZ Corp',
  experience: '6 jaar ervaring',
  salary: '€55.000 - €65.000',
  availability: 'Per direct beschikbaar',
  tags: ['Ervaren', 'Sales background', 'B2B'],
  assignedVacancies: [
    { id: 'vac_1', title: 'Senior Accountmanager B2B', status: 'active' as const },
    { id: 'vac_2', title: 'Account Executive', status: 'rejected' as const },
  ],
  stageHistory: [
    { stage: 'Nieuw', date: '5 jan 2024', duration: '2 dagen' },
    { stage: 'Eerste gesprek', date: '7 jan 2024', duration: '4 dagen' },
    { stage: stageName, date: '11 jan 2024', duration: 'Huidig' },
  ],
  scorecard: {
    overall: candidate.score || null,
    criteria: [
      { name: 'Communicatie', score: 8 },
      { name: 'Ervaring', score: 7 },
      { name: 'Culture fit', score: 9 },
      { name: 'Motivatie', score: 8 },
    ],
    feedback: 'Sterke kandidaat met goede communicatieve vaardigheden. Past goed binnen het team.',
  },
  notes: [
    { id: 'n1', author: 'Sarah HR', date: '10 jan 2024', content: 'Eerste gesprek verlopen goed. Kandidaat heeft veel ervaring in B2B sales.' },
    { id: 'n2', author: 'Peter Manager', date: '8 jan 2024', content: 'CV doorgenomen, ziet er sterk uit. Uitnodigen voor gesprek.' },
  ],
  activity: [
    { id: 'a1', type: 'stage_change', description: 'Verplaatst naar Eerste gesprek', date: '7 jan 2024', actor: 'Sarah HR' },
    { id: 'a2', type: 'email', description: 'Uitnodiging verstuurd', date: '6 jan 2024', actor: 'Systeem' },
    { id: 'a3', type: 'new', description: 'Sollicitatie ontvangen', date: '5 jan 2024', actor: 'Via LinkedIn' },
  ],
  documents: [
    { id: 'd1', name: 'CV_Jan_Jansen.pdf', type: 'cv', date: '5 jan 2024' },
    { id: 'd2', name: 'Motivatiebrief.pdf', type: 'letter', date: '5 jan 2024' },
  ],
});

export function CandidateDetailModal({ candidate, currentStage, open, onOpenChange, onReject, onAssign }: CandidateDetailModalProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [newNote, setNewNote] = useState('');
  const [confirmRejectOpen, setConfirmRejectOpen] = useState(false);

  if (!candidate) return null;

  const details = getCandidateDetails(candidate, currentStage);

  const handleReject = () => {
    setConfirmRejectOpen(false);
    onReject?.(candidate.id);
    onOpenChange(false);
    toast({
      title: "Kandidaat afgewezen",
      description: `${candidate.name} is afgewezen voor deze vacature.`,
      variant: "destructive",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] p-0 gap-0">
        {/* Header */}
        <DialogHeader className="p-6 pb-4 border-b">
          <div className="flex items-start gap-4">
            <div className={cn(
              "h-14 w-14 rounded-full flex items-center justify-center text-lg font-semibold text-white",
              candidate.color
            )}>
              {candidate.initials}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <DialogTitle className="text-xl font-semibold">{candidate.name}</DialogTitle>
                <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                  {currentStage}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{details.currentJob}</p>
              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  {details.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  {details.phone}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {details.location}
                </span>
              </div>
            </div>
            <div className="flex gap-2 pr-8">
              <SendEmailModal candidate={candidate} />
              <ScheduleMeetingModal candidate={candidate} />
              {onAssign && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={onAssign}
                >
                  <Briefcase className="h-4 w-4 mr-1" />
                  Toewijzen
                </Button>
              )}
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setConfirmRejectOpen(true)}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <UserX className="h-4 w-4 mr-1" />
                Afwijzen
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
          <div className="border-b px-4 sm:px-6 overflow-x-auto">
            <TabsList className="h-12 bg-transparent p-0 gap-2 sm:gap-6 min-w-max">
              <TabsTrigger value="overview" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-1 sm:px-0 pb-3 text-xs sm:text-sm">
                <User className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Overzicht</span>
                <span className="sm:hidden">Info</span>
              </TabsTrigger>
              <TabsTrigger value="scorecard" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-1 sm:px-0 pb-3 text-xs sm:text-sm">
                <Star className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Scorecard</span>
                <span className="sm:hidden">Score</span>
              </TabsTrigger>
              <TabsTrigger value="notes" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-1 sm:px-0 pb-3 text-xs sm:text-sm">
                <MessageSquare className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Notities</span>
                <span className="sm:hidden">Notes</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-1 sm:px-0 pb-3 text-xs sm:text-sm">
                <History className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Geschiedenis</span>
                <span className="sm:hidden">Log</span>
              </TabsTrigger>
              <TabsTrigger value="documents" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-1 sm:px-0 pb-3 text-xs sm:text-sm">
                <Paperclip className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Documenten</span>
                <span className="sm:hidden">Docs</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="h-[calc(90vh-220px)]">
            {/* Overview Tab */}
            <TabsContent value="overview" className="m-0 p-4 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Left column */}
                <div className="space-y-6">
                  {/* Personal Info */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Persoonlijke informatie
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Ervaring</span>
                        <span>{details.experience}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Gewenst salaris</span>
                        <span>{details.salary}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Beschikbaarheid</span>
                        <span>{details.availability}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Bron</span>
                        <Badge variant="outline" className="text-xs">{candidate.source}</Badge>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="text-muted-foreground">LinkedIn</span>
                        <a href="#" className="text-primary hover:underline flex items-center gap-1">
                          Profiel bekijken
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Tags */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Tags className="h-4 w-4" />
                        Tags
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {details.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 px-2 text-xs text-muted-foreground"
                          onClick={() => toast({
                            title: "Komt binnenkort",
                            description: "Tags toevoegen wordt binnenkort beschikbaar.",
                          })}
                        >
                          + Tag toevoegen
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Assigned Vacancies */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        Toegewezen vacatures
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {details.assignedVacancies.map((vacancy) => (
                        <div key={vacancy.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                          <span className="text-sm">{vacancy.title}</span>
                          <Badge 
                            variant="outline" 
                            className={cn(
                              "text-xs",
                              vacancy.status === 'active' 
                                ? "bg-success/10 text-success border-success/20"
                                : "bg-destructive/10 text-destructive border-destructive/20"
                            )}
                          >
                            {vacancy.status === 'active' ? 'Actief' : 'Afgewezen'}
                          </Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                {/* Right column */}
                <div className="space-y-6">
                  {/* Stage Progress */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Voortgang in pipeline
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {details.stageHistory.map((stage, idx) => (
                          <div key={stage.stage} className="flex items-center gap-3">
                            <div className={cn(
                              "h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium",
                              stage.duration === 'Huidig' 
                                ? "bg-primary text-primary-foreground" 
                                : "bg-muted text-muted-foreground"
                            )}>
                              {idx + 1}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">{stage.stage}</p>
                              <p className="text-xs text-muted-foreground">{stage.date}</p>
                            </div>
                            <span className="text-xs text-muted-foreground">{stage.duration}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Score */}
                  {details.scorecard.overall && (
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          <Star className="h-4 w-4" />
                          Beoordeling
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-4">
                          <div className="text-4xl font-bold text-primary">{details.scorecard.overall}</div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Gemiddelde score</p>
                            <p className="text-xs text-muted-foreground">Gebaseerd op {details.scorecard.criteria.length} criteria</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Recent Activity */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <History className="h-4 w-4" />
                        Recente activiteit
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {details.activity.slice(0, 3).map((activity) => (
                          <div key={activity.id} className="flex items-start gap-3 text-sm">
                            <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                            <div className="flex-1">
                              <p>{activity.description}</p>
                              <p className="text-xs text-muted-foreground">{activity.date} · {activity.actor}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Scorecard Tab */}
            <TabsContent value="scorecard" className="m-0 p-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Scorecard beoordeling</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {details.scorecard.overall ? (
                    <>
                      <div className="flex items-center gap-6 p-4 bg-muted/50 rounded-lg">
                        <div className="text-5xl font-bold text-primary">{details.scorecard.overall}</div>
                        <div>
                          <p className="font-medium">Totaalscore</p>
                          <p className="text-sm text-muted-foreground">Gemiddelde van alle criteria</p>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        {details.scorecard.criteria.map((criterion) => (
                          <div key={criterion.name} className="flex items-center gap-4">
                            <span className="w-32 text-sm">{criterion.name}</span>
                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary rounded-full transition-all"
                                style={{ width: `${criterion.score * 10}%` }}
                              />
                            </div>
                            <span className="w-8 text-sm font-medium text-right">{criterion.score}</span>
                          </div>
                        ))}
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Feedback</h4>
                        <p className="text-sm text-muted-foreground">{details.scorecard.feedback}</p>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Nog geen scorecard ingevuld</p>
                      <Button className="mt-4">
                        Scorecard invullen
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notes Tab */}
            <TabsContent value="notes" className="m-0 p-6">
              <div className="space-y-4">
                {/* Add note */}
                <Card>
                  <CardContent className="pt-6">
                    <Textarea
                      placeholder="Schrijf een notitie..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      className="min-h-[100px] mb-3"
                    />
                    <div className="flex justify-end">
                      <Button disabled={!newNote.trim()}>
                        <Send className="h-4 w-4 mr-2" />
                        Notitie toevoegen
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Existing notes */}
                {details.notes.map((note) => (
                  <Card key={note.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                          {note.author.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium">{note.author}</span>
                            <span className="text-xs text-muted-foreground">{note.date}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{note.content}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history" className="m-0 p-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Volledige activiteitengeschiedenis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {details.activity.map((activity, idx) => (
                      <div key={activity.id} className="flex items-start gap-4">
                        <div className="relative">
                          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                            {activity.type === 'stage_change' && <ChevronRight className="h-4 w-4" />}
                            {activity.type === 'email' && <Mail className="h-4 w-4" />}
                            {activity.type === 'new' && <User className="h-4 w-4" />}
                          </div>
                          {idx < details.activity.length - 1 && (
                            <div className="absolute left-4 top-8 w-[1px] h-8 bg-border" />
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <p className="text-sm font-medium">{activity.description}</p>
                          <p className="text-xs text-muted-foreground">{activity.date} · {activity.actor}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents" className="m-0 p-6">
              <div className="space-y-4">
                {details.documents.map((doc) => (
                  <Card key={doc.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
                          <FileText className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">Geüpload op {doc.date}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Card className="border-dashed">
                  <CardContent className="pt-6">
                    <div className="text-center py-4">
                      <Paperclip className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">Sleep bestanden hierheen of</p>
                      <Button variant="outline" size="sm">
                        Bestand uploaden
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>

      {/* Confirm Reject Dialog */}
      <ConfirmDialog
        open={confirmRejectOpen}
        onOpenChange={setConfirmRejectOpen}
        title="Kandidaat afwijzen?"
        description={`Weet je zeker dat je ${candidate.name} wilt afwijzen voor deze vacature? Deze actie kan niet ongedaan worden gemaakt.`}
        confirmLabel="Ja, afwijzen"
        variant="destructive"
        onConfirm={handleReject}
      />
    </Dialog>
  );
}
