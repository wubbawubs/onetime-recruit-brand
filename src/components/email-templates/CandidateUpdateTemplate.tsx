import * as React from 'react';
import {
  BaseEmailTemplate,
  EmailButton,
  EmailText,
  EmailHeading,
  EmailDivider,
  EmailInfoBox,
} from './BaseEmailTemplate';

export interface CandidateUpdateTemplateProps {
  firstName: string;
  vacancyTitle: string;
  companyName: string;
  newStage: string;
  recruiterName: string;
  recruiterEmail: string;
  message?: string;
  portalUrl?: string;
  previewMode?: boolean;
}

export function CandidateUpdateTemplate({
  firstName,
  vacancyTitle,
  companyName,
  newStage,
  recruiterName,
  recruiterEmail,
  message,
  portalUrl,
  previewMode,
}: CandidateUpdateTemplateProps) {
  const getStageMessage = (stage: string) => {
    switch (stage.toLowerCase()) {
      case 'eerste gesprek':
        return 'Je bent uitgenodigd voor een eerste gesprek!';
      case 'tweede gesprek':
        return 'Je gaat door naar een tweede gesprek!';
      case 'aanbod':
        return 'We hebben een aanbod voor je!';
      case 'in dienst':
        return 'Welkom bij het team!';
      default:
        return `Je status is bijgewerkt naar: ${stage}`;
    }
  };

  return (
    <BaseEmailTemplate preheader={`Update over je sollicitatie voor ${vacancyTitle} bij ${companyName}`} previewMode={previewMode}>
      <EmailHeading>Update over je sollicitatie</EmailHeading>
      
      <EmailText>Hoi {firstName},</EmailText>
      
      <EmailText>
        Goed nieuws over je sollicitatie voor de functie <strong>{vacancyTitle}</strong> bij{' '}
        <strong>{companyName}</strong>.
      </EmailText>

      <EmailInfoBox>
        <EmailText style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#2d5a3d' }}>
          {getStageMessage(newStage)}
        </EmailText>
      </EmailInfoBox>

      {message && (
        <>
          <EmailText>
            <strong>Bericht van {recruiterName}:</strong>
          </EmailText>
          <EmailText style={{ fontStyle: 'italic', borderLeft: '3px solid #2d5a3d', paddingLeft: '16px' }}>
            "{message}"
          </EmailText>
        </>
      )}

      {portalUrl && (
        <EmailButton href={portalUrl}>Bekijk Details</EmailButton>
      )}

      <EmailDivider />

      <EmailText muted style={{ fontSize: '14px' }}>
        <strong>Vragen?</strong>
        <br />
        Neem contact op met {recruiterName} via{' '}
        <a href={`mailto:${recruiterEmail}`} style={{ color: '#2d5a3d' }}>
          {recruiterEmail}
        </a>
      </EmailText>

      <EmailText muted style={{ fontSize: '14px', marginBottom: 0 }}>
        We wensen je veel succes in het verdere proces!
      </EmailText>
    </BaseEmailTemplate>
  );
}
