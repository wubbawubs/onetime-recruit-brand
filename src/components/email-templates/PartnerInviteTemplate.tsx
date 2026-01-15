import * as React from 'react';
import {
  BaseEmailTemplate,
  EmailButton,
  EmailText,
  EmailHeading,
  EmailDivider,
} from './BaseEmailTemplate';

export interface PartnerInviteTemplateProps {
  firstName: string;
  inviterName: string;
  inviteUrl: string;
  expiresIn?: string;
  previewMode?: boolean;
}

export function PartnerInviteTemplate({
  firstName,
  inviterName,
  inviteUrl,
  expiresIn = '7 dagen',
  previewMode,
}: PartnerInviteTemplateProps) {
  return (
    <BaseEmailTemplate preheader={`${inviterName} heeft je uitgenodigd om partner te worden bij One Rooted`} previewMode={previewMode}>
      <EmailHeading>Welkom bij One Rooted</EmailHeading>
      
      <EmailText>Hoi {firstName},</EmailText>
      
      <EmailText>
        Goed nieuws! <strong>{inviterName}</strong> heeft je uitgenodigd om deel te nemen 
        aan One Rooted als partner. Met One Rooted krijg je toegang tot een modern 
        recruitment platform waarmee je efficiënter kunt werven.
      </EmailText>

      <EmailText>
        Als partner kun je:
      </EmailText>

      <table role="presentation" cellPadding={0} cellSpacing={0} style={{ marginBottom: '16px' }}>
        <tbody>
          <tr>
            <td style={{ paddingLeft: '8px', paddingBottom: '8px' }}>
              <EmailText style={{ margin: 0 }}>✓ Vacatures beheren voor je klanten</EmailText>
            </td>
          </tr>
          <tr>
            <td style={{ paddingLeft: '8px', paddingBottom: '8px' }}>
              <EmailText style={{ margin: 0 }}>✓ Kandidaten door de pipeline begeleiden</EmailText>
            </td>
          </tr>
          <tr>
            <td style={{ paddingLeft: '8px', paddingBottom: '8px' }}>
              <EmailText style={{ margin: 0 }}>✓ Rapportages en inzichten bekijken</EmailText>
            </td>
          </tr>
          <tr>
            <td style={{ paddingLeft: '8px' }}>
              <EmailText style={{ margin: 0 }}>✓ Samenwerken met je team</EmailText>
            </td>
          </tr>
        </tbody>
      </table>

      <EmailButton href={inviteUrl}>Account Activeren</EmailButton>

      <EmailDivider />

      <EmailText muted style={{ fontSize: '14px' }}>
        Deze uitnodiging is {expiresIn} geldig. Na het activeren van je account kun 
        je direct aan de slag. Heb je vragen? Neem contact op met {inviterName}.
      </EmailText>

      <EmailText muted style={{ fontSize: '14px', marginBottom: 0 }}>
        Als je deze uitnodiging niet verwacht had, kun je deze email negeren.
      </EmailText>
    </BaseEmailTemplate>
  );
}
