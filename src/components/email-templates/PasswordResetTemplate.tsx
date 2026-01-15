import * as React from 'react';
import {
  BaseEmailTemplate,
  EmailButton,
  EmailText,
  EmailHeading,
  EmailDivider,
  EmailInfoBox,
} from './BaseEmailTemplate';

export interface PasswordResetTemplateProps {
  firstName: string;
  resetUrl: string;
  expiresIn?: string;
}

export function PasswordResetTemplate({
  firstName,
  resetUrl,
  expiresIn = '1 uur',
}: PasswordResetTemplateProps) {
  return (
    <BaseEmailTemplate preheader="Je hebt een wachtwoord reset aangevraagd voor One Rooted">
      <EmailHeading>Wachtwoord Resetten</EmailHeading>
      
      <EmailText>Hoi {firstName},</EmailText>
      
      <EmailText>
        We hebben een verzoek ontvangen om het wachtwoord van je One Rooted account 
        te resetten. Klik op de onderstaande knop om een nieuw wachtwoord in te stellen.
      </EmailText>

      <EmailButton href={resetUrl}>Nieuw Wachtwoord Instellen</EmailButton>

      <EmailInfoBox>
        <EmailText style={{ margin: 0, fontSize: '14px' }}>
          ⏱️ Deze link is <strong>{expiresIn}</strong> geldig. Na deze periode moet 
          je een nieuwe reset aanvragen.
        </EmailText>
      </EmailInfoBox>

      <EmailDivider />

      <EmailText muted style={{ fontSize: '14px' }}>
        <strong>Heb je dit niet aangevraagd?</strong>
        <br />
        Dan kun je deze email negeren. Je wachtwoord blijft ongewijzigd en je account 
        is veilig. Als je je zorgen maakt over de beveiliging van je account, neem dan 
        contact met ons op.
      </EmailText>

      <EmailText muted style={{ fontSize: '14px', marginBottom: 0 }}>
        Voor je veiligheid: One Rooted zal nooit via email om je wachtwoord vragen.
      </EmailText>
    </BaseEmailTemplate>
  );
}
