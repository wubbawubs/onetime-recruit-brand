import * as React from 'react';
import {
  BaseEmailTemplate,
  EmailButton,
  EmailText,
  EmailHeading,
  EmailDivider,
} from './BaseEmailTemplate';

export interface WelcomeTemplateProps {
  firstName: string;
  loginUrl: string;
  supportEmail?: string;
  previewMode?: boolean;
}

export function WelcomeTemplate({
  firstName,
  loginUrl,
  supportEmail = 'support@onerooted.nl',
  previewMode,
}: WelcomeTemplateProps) {
  return (
    <BaseEmailTemplate preheader="Welkom bij One Rooted - Je account is aangemaakt!" previewMode={previewMode}>
      <EmailHeading>Welkom bij One Rooted!</EmailHeading>
      
      <EmailText>Hoi {firstName},</EmailText>
      
      <EmailText>
        Gefeliciteerd! Je account is succesvol aangemaakt. We zijn blij dat je hebt 
        gekozen voor One Rooted als jouw recruitment platform.
      </EmailText>

      <EmailText style={{ fontWeight: 600 }}>
        Wat kun je nu doen?
      </EmailText>

      <table role="presentation" cellPadding={0} cellSpacing={0} style={{ marginBottom: '16px' }}>
        <tbody>
          <tr>
            <td style={{ paddingLeft: '8px', paddingBottom: '8px' }}>
              <EmailText style={{ margin: 0 }}>🚀 Log in en verken het platform</EmailText>
            </td>
          </tr>
          <tr>
            <td style={{ paddingLeft: '8px', paddingBottom: '8px' }}>
              <EmailText style={{ margin: 0 }}>📋 Maak je eerste vacature aan</EmailText>
            </td>
          </tr>
          <tr>
            <td style={{ paddingLeft: '8px', paddingBottom: '8px' }}>
              <EmailText style={{ margin: 0 }}>👥 Nodig je team uit om samen te werken</EmailText>
            </td>
          </tr>
          <tr>
            <td style={{ paddingLeft: '8px' }}>
              <EmailText style={{ margin: 0 }}>⚙️ Stel je voorkeuren in via Instellingen</EmailText>
            </td>
          </tr>
        </tbody>
      </table>

      <EmailButton href={loginUrl}>Naar One Rooted</EmailButton>

      <EmailDivider />

      <EmailText muted style={{ fontSize: '14px' }}>
        <strong>Hulp nodig?</strong>
        <br />
        Ons team staat voor je klaar. Neem contact op via{' '}
        <a href={`mailto:${supportEmail}`} style={{ color: '#2d5a3d' }}>
          {supportEmail}
        </a>
      </EmailText>

      <EmailText muted style={{ fontSize: '14px', marginBottom: 0 }}>
        Veel succes met werven!
      </EmailText>
    </BaseEmailTemplate>
  );
}
