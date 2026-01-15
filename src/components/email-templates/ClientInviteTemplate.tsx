import * as React from 'react';
import {
  BaseEmailTemplate,
  EmailButton,
  EmailText,
  EmailHeading,
  EmailDivider,
} from './BaseEmailTemplate';

export interface ClientInviteTemplateProps {
  firstName: string;
  companyName: string;
  partnerName: string;
  inviteUrl: string;
}

export function ClientInviteTemplate({
  firstName,
  companyName,
  partnerName,
  inviteUrl,
}: ClientInviteTemplateProps) {
  return (
    <BaseEmailTemplate preheader={`Volg je kandidaten en vacatures bij ${companyName} via One Rooted`}>
      <EmailHeading>Welkom bij One Rooted</EmailHeading>
      
      <EmailText>Hoi {firstName},</EmailText>
      
      <EmailText>
        <strong>{partnerName}</strong> werkt voor <strong>{companyName}</strong> met One Rooted 
        om het wervingsproces te stroomlijnen. Je bent uitgenodigd om toegang te krijgen 
        tot het platform.
      </EmailText>

      <EmailText>
        Met je account kun je:
      </EmailText>

      <table role="presentation" cellPadding={0} cellSpacing={0} style={{ marginBottom: '16px' }}>
        <tr>
          <td style={{ paddingLeft: '8px', paddingBottom: '8px' }}>
            <EmailText style={{ margin: 0 }}>✓ De voortgang van je vacatures volgen</EmailText>
          </td>
        </tr>
        <tr>
          <td style={{ paddingLeft: '8px', paddingBottom: '8px' }}>
            <EmailText style={{ margin: 0 }}>✓ Kandidaatprofielen en scores bekijken</EmailText>
          </td>
        </tr>
        <tr>
          <td style={{ paddingLeft: '8px', paddingBottom: '8px' }}>
            <EmailText style={{ margin: 0 }}>✓ Feedback geven op kandidaten</EmailText>
          </td>
        </tr>
        <tr>
          <td style={{ paddingLeft: '8px' }}>
            <EmailText style={{ margin: 0 }}>✓ Real-time updates ontvangen</EmailText>
          </td>
        </tr>
      </table>

      <EmailButton href={inviteUrl}>Account Aanmaken</EmailButton>

      <EmailDivider />

      <EmailText muted style={{ fontSize: '14px' }}>
        Dit is een uitnodiging van {partnerName}. Na het aanmaken van je account 
        heb je direct toegang tot alle informatie over je lopende vacatures.
      </EmailText>

      <EmailText muted style={{ fontSize: '14px', marginBottom: 0 }}>
        Vragen? Neem contact op met je contactpersoon bij {partnerName}.
      </EmailText>
    </BaseEmailTemplate>
  );
}
