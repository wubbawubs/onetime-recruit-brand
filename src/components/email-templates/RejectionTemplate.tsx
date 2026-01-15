import * as React from 'react';
import {
  BaseEmailTemplate,
  EmailText,
  EmailHeading,
  EmailDivider,
} from './BaseEmailTemplate';

export interface RejectionTemplateProps {
  firstName: string;
  vacancyTitle: string;
  companyName: string;
  recruiterName: string;
  feedbackMessage?: string;
  keepInTouch?: boolean;
  previewMode?: boolean;
}

export function RejectionTemplate({
  firstName,
  vacancyTitle,
  companyName,
  recruiterName,
  feedbackMessage,
  keepInTouch = true,
  previewMode,
}: RejectionTemplateProps) {
  return (
    <BaseEmailTemplate preheader={`Update over je sollicitatie voor ${vacancyTitle}`} previewMode={previewMode}>
      <EmailHeading>Bedankt voor je interesse</EmailHeading>
      
      <EmailText>Beste {firstName},</EmailText>
      
      <EmailText>
        Hartelijk dank voor je sollicitatie voor de functie <strong>{vacancyTitle}</strong> bij{' '}
        <strong>{companyName}</strong> en de tijd die je hebt genomen om met ons te spreken.
      </EmailText>

      <EmailText>
        Na zorgvuldige overweging hebben we besloten om verder te gaan met andere kandidaten 
        wiens profiel op dit moment beter aansluit bij wat we zoeken. Dit was geen gemakkelijke 
        beslissing, gezien de kwaliteit van je achtergrond en ervaring.
      </EmailText>

      {feedbackMessage && (
        <>
          <EmailText style={{ fontWeight: 600 }}>Persoonlijke feedback:</EmailText>
          <EmailText style={{ 
            fontStyle: 'italic', 
            borderLeft: '3px solid #2d5a3d', 
            paddingLeft: '16px',
            color: '#3a4a3a'
          }}>
            "{feedbackMessage}"
          </EmailText>
        </>
      )}

      {keepInTouch && (
        <EmailText>
          We willen graag in contact blijven. Mocht er in de toekomst een passende 
          vacature ontstaan, nemen we graag opnieuw contact met je op. Je profiel 
          blijft in ons systeem bewaard.
        </EmailText>
      )}

      <EmailDivider />

      <EmailText muted style={{ fontSize: '14px' }}>
        We wensen je veel succes in je verdere carrière en hopen je in de toekomst 
        wellicht te mogen verwelkomen.
      </EmailText>

      <EmailText style={{ marginBottom: 0 }}>
        Met vriendelijke groet,
        <br />
        <strong>{recruiterName}</strong>
        <br />
        <span style={{ color: '#5a6b5a' }}>namens {companyName}</span>
      </EmailText>
    </BaseEmailTemplate>
  );
}
