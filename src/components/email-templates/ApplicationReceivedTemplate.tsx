import * as React from 'react';
import {
  BaseEmailTemplate,
  EmailButton,
  EmailText,
  EmailHeading,
  EmailDivider,
  EmailInfoBox,
} from './BaseEmailTemplate';

export interface ApplicationReceivedTemplateProps {
  firstName: string;
  vacancyTitle: string;
  companyName: string;
  recruiterName: string;
  recruiterEmail: string;
  expectedResponseDays?: number;
  portalUrl?: string;
  previewMode?: boolean;
}

export function ApplicationReceivedTemplate({
  firstName,
  vacancyTitle,
  companyName,
  recruiterName,
  recruiterEmail,
  expectedResponseDays = 5,
  portalUrl,
  previewMode,
}: ApplicationReceivedTemplateProps) {
  return (
    <BaseEmailTemplate preheader={`Bedankt voor je sollicitatie voor ${vacancyTitle} bij ${companyName}`} previewMode={previewMode}>
      <EmailHeading>Sollicitatie Ontvangen</EmailHeading>
      
      <EmailText>Hoi {firstName},</EmailText>
      
      <EmailText>
        Bedankt voor je sollicitatie voor de functie <strong>{vacancyTitle}</strong> bij{' '}
        <strong>{companyName}</strong>. We hebben je sollicitatie in goede orde ontvangen.
      </EmailText>

      <EmailInfoBox>
        <EmailText style={{ margin: 0, fontSize: '16px' }}>
          ✅ Je sollicitatie is succesvol ontvangen en wordt beoordeeld door ons team.
        </EmailText>
      </EmailInfoBox>

      <EmailText style={{ fontWeight: 600 }}>Wat kun je verwachten?</EmailText>

      <table role="presentation" cellPadding={0} cellSpacing={0} style={{ marginBottom: '16px' }}>
        <tr>
          <td style={{ paddingLeft: '8px', paddingBottom: '8px' }}>
            <EmailText style={{ margin: 0 }}>
              1. We bekijken je sollicitatie binnen {expectedResponseDays} werkdagen
            </EmailText>
          </td>
        </tr>
        <tr>
          <td style={{ paddingLeft: '8px', paddingBottom: '8px' }}>
            <EmailText style={{ margin: 0 }}>
              2. Je ontvangt bericht over het vervolg via email
            </EmailText>
          </td>
        </tr>
        <tr>
          <td style={{ paddingLeft: '8px' }}>
            <EmailText style={{ margin: 0 }}>
              3. Bij een match nodigen we je uit voor een kennismakingsgesprek
            </EmailText>
          </td>
        </tr>
      </table>

      {portalUrl && (
        <EmailButton href={portalUrl}>Bekijk je Sollicitatie</EmailButton>
      )}

      <EmailDivider />

      <EmailText muted style={{ fontSize: '14px' }}>
        <strong>Vragen?</strong>
        <br />
        Neem gerust contact op met {recruiterName} via{' '}
        <a href={`mailto:${recruiterEmail}`} style={{ color: '#2d5a3d' }}>
          {recruiterEmail}
        </a>
      </EmailText>

      <EmailText muted style={{ fontSize: '14px', marginBottom: 0 }}>
        We wensen je veel succes!
      </EmailText>
    </BaseEmailTemplate>
  );
}
