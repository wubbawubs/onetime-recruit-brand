import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, RefreshCw, Loader2, Clock, CheckCircle, XCircle, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { mockMailEvents, type MailEvent, type InviteStatus } from "@/data/mockMailEvents";
import { format } from "date-fns";
import { nl } from "date-fns/locale";

function getStatusBadge(status: InviteStatus) {
  switch (status) {
    case 'delivered':
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 gap-1">
          <CheckCircle className="h-3 w-3" />
          Afgeleverd
        </Badge>
      );
    case 'pending':
      return (
        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 gap-1">
          <Clock className="h-3 w-3" />
          In behandeling
        </Badge>
      );
    case 'sent':
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 gap-1">
          <Send className="h-3 w-3" />
          Verstuurd
        </Badge>
      );
    case 'failed':
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 gap-1">
          <XCircle className="h-3 w-3" />
          Mislukt
        </Badge>
      );
  }
}

function getTemplateBadge(template: 'partner_invite' | 'client_invite') {
  switch (template) {
    case 'partner_invite':
      return <Badge variant="default">Partner</Badge>;
    case 'client_invite':
      return <Badge variant="secondary">Klant</Badge>;
  }
}

export function RecentInvitesTable() {
  const { toast } = useToast();
  const [resendingId, setResendingId] = useState<string | null>(null);

  const handleResend = async (invite: MailEvent) => {
    setResendingId(invite.id);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Uitnodiging opnieuw verstuurd",
      description: `Nieuwe uitnodiging is verstuurd naar ${invite.email}.`,
    });
    
    setResendingId(null);
  };

  if (mockMailEvents.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Recente Uitnodigingen
          </CardTitle>
          <CardDescription>
            Overzicht van verstuurde uitnodigingen.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Mail className="h-10 w-10 mx-auto mb-3 opacity-30" />
            <p>Nog geen uitnodigingen verstuurd.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Recente Uitnodigingen
        </CardTitle>
        <CardDescription>
          Overzicht van verstuurde uitnodigingen.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {mockMailEvents.map((invite) => (
            <div
              key={invite.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-medium truncate">
                      {invite.firstName && invite.lastName 
                        ? `${invite.firstName} ${invite.lastName}` 
                        : invite.email}
                    </p>
                    {getTemplateBadge(invite.template)}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {invite.email}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-xs text-muted-foreground hidden sm:block">
                  {format(new Date(invite.sentAt), 'd MMM yyyy', { locale: nl })}
                </span>
                {getStatusBadge(invite.status)}
                
                {(invite.status === 'failed' || invite.status === 'pending') && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleResend(invite)}
                    disabled={resendingId === invite.id}
                    className="h-8 gap-1"
                  >
                    {resendingId === invite.id ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <RefreshCw className="h-3.5 w-3.5" />
                    )}
                    <span className="hidden sm:inline">Opnieuw</span>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
