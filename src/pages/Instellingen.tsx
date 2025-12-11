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
      <div className="space-y-8 page-enter page-enter-active">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Instellingen</h1>
          <p className="text-muted-foreground mt-1">
            Beheer account, organisatie, recruitmentproces en privacy.
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="account" className="space-y-6 sm:space-y-8">
          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            <TabsList className="bg-muted/50 p-1 h-auto inline-flex min-w-max">
              <TabsTrigger value="account" className="gap-1.5 sm:gap-2 data-[state=active]:bg-background px-2 sm:px-3 text-xs sm:text-sm">
                <User className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline sm:inline">Account</span>
              </TabsTrigger>
              <TabsTrigger value="organization" className="gap-1.5 sm:gap-2 data-[state=active]:bg-background px-2 sm:px-3 text-xs sm:text-sm">
                <Building2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline sm:inline">Organisatie</span>
              </TabsTrigger>
              <TabsTrigger value="recruitment" className="gap-1.5 sm:gap-2 data-[state=active]:bg-background px-2 sm:px-3 text-xs sm:text-sm">
                <GitBranch className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline sm:inline">Recruitment</span>
              </TabsTrigger>
              <TabsTrigger value="privacy" className="gap-1.5 sm:gap-2 data-[state=active]:bg-background px-2 sm:px-3 text-xs sm:text-sm">
                <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline sm:inline">Privacy</span>
              </TabsTrigger>
              <TabsTrigger value="integrations" className="gap-1.5 sm:gap-2 data-[state=active]:bg-background px-2 sm:px-3 text-xs sm:text-sm">
                <Plug className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline sm:inline">Integraties</span>
              </TabsTrigger>
            </TabsList>
          </div>

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
