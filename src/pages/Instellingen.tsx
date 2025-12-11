import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Building2, GitBranch, Shield, Plug } from "lucide-react";
import AccountTab from "@/components/settings/AccountTab";
import OrganizationTab from "@/components/settings/OrganizationTab";
import RecruitmentTab from "@/components/settings/RecruitmentTab";
import PrivacyTab from "@/components/settings/PrivacyTab";
import IntegrationsTab from "@/components/settings/IntegrationsTab";

const Instellingen = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Instellingen</h1>
          <p className="text-muted-foreground mt-1">
            Beheer account, organisatie, recruitmentproces en privacy.
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="account" className="space-y-8">
          <TabsList className="bg-muted/50 p-1 h-auto flex-wrap">
            <TabsTrigger value="account" className="gap-2 data-[state=active]:bg-background">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Account</span>
            </TabsTrigger>
            <TabsTrigger value="organization" className="gap-2 data-[state=active]:bg-background">
              <Building2 className="h-4 w-4" />
              <span className="hidden sm:inline">Organisatie</span>
            </TabsTrigger>
            <TabsTrigger value="recruitment" className="gap-2 data-[state=active]:bg-background">
              <GitBranch className="h-4 w-4" />
              <span className="hidden sm:inline">Recruitment</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="gap-2 data-[state=active]:bg-background">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Privacy</span>
            </TabsTrigger>
            <TabsTrigger value="integrations" className="gap-2 data-[state=active]:bg-background">
              <Plug className="h-4 w-4" />
              <span className="hidden sm:inline">Integraties</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="mt-8">
            <AccountTab />
          </TabsContent>

          <TabsContent value="organization" className="mt-8">
            <OrganizationTab />
          </TabsContent>

          <TabsContent value="recruitment" className="mt-8">
            <RecruitmentTab />
          </TabsContent>

          <TabsContent value="privacy" className="mt-8">
            <PrivacyTab />
          </TabsContent>

          <TabsContent value="integrations" className="mt-8">
            <IntegrationsTab />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Instellingen;
