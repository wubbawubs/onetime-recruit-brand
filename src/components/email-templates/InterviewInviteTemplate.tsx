import * as React from 'react';
import {
  BaseEmailTemplate,
  EmailButton,
  EmailText,
  EmailHeading,
  EmailDivider,
  EmailInfoBox,
} from './BaseEmailTemplate';

export interface InterviewInviteTemplateProps {
  firstName: string;
  vacancyTitle: string;
  companyName: string;
  date: string;
  time: string;
  duration: string;
  locationType: 'online' | 'physical';
  location: string; // URL for online, address for physical
  interviewerName: string;
  interviewerRole?: string;
  calendarUrl?: string;
  notes?: string;
}

export function InterviewInviteTemplate({
  firstName,
  vacancyTitle,
  companyName,
  date,
  time,
  duration,
  locationType,
  location,
  interviewerName,
  interviewerRole,
  calendarUrl,
  notes,
}: InterviewInviteTemplateProps) {
  return (
    <BaseEmailTemplate preheader={`Uitnodiging voor gesprek: ${vacancyTitle} bij ${companyName} op ${date}`}>
      <EmailHeading>Uitnodiging voor Gesprek</EmailHeading>
      
      <EmailText>Hoi {firstName},</EmailText>
      
      <EmailText>
        We willen je graag uitnodigen voor een gesprek over de functie{' '}
        <strong>{vacancyTitle}</strong> bij <strong>{companyName}</strong>.
      </EmailText>

      <EmailInfoBox>
        <table role="presentation" cellPadding={0} cellSpacing={0} style={{ width: '100%' }}>
          <tr>
            <td style={{ paddingBottom: '12px' }}>
              <EmailText style={{ margin: 0, fontSize: '14px', color: '#5a6b5a' }}>
                📅 Datum
              </EmailText>
              <EmailText style={{ margin: '4px 0 0 0', fontWeight: 600 }}>
                {date}
              </EmailText>
            </td>
            <td style={{ paddingBottom: '12px' }}>
              <EmailText style={{ margin: 0, fontSize: '14px', color: '#5a6b5a' }}>
                🕐 Tijd
              </EmailText>
              <EmailText style={{ margin: '4px 0 0 0', fontWeight: 600 }}>
                {time} ({duration})
              </EmailText>
            </td>
          </tr>
          <tr>
            <td colSpan={2} style={{ paddingBottom: '12px' }}>
              <EmailText style={{ margin: 0, fontSize: '14px', color: '#5a6b5a' }}>
                {locationType === 'online' ? '💻 Online meeting' : '📍 Locatie'}
              </EmailText>
              <EmailText style={{ margin: '4px 0 0 0', fontWeight: 600 }}>
                {locationType === 'online' ? (
                  <a href={location} style={{ color: '#2d5a3d' }}>{location}</a>
                ) : (
                  location
                )}
              </EmailText>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <EmailText style={{ margin: 0, fontSize: '14px', color: '#5a6b5a' }}>
                👤 Je spreekt met
              </EmailText>
              <EmailText style={{ margin: '4px 0 0 0', fontWeight: 600 }}>
                {interviewerName}{interviewerRole && ` - ${interviewerRole}`}
              </EmailText>
            </td>
          </tr>
        </table>
      </EmailInfoBox>

      {calendarUrl && (
        <EmailButton href={calendarUrl}>Toevoegen aan Agenda</EmailButton>
      )}

      {notes && (
        <>
          <EmailText style={{ fontWeight: 600 }}>Ter voorbereiding:</EmailText>
          <EmailText>{notes}</EmailText>
        </>
      )}

      <EmailDivider />

      <EmailText muted style={{ fontSize: '14px' }}>
        <strong>Kun je niet op dit tijdstip?</strong>
        <br />
        Laat het ons zo snel mogelijk weten, dan zoeken we een ander moment.
      </EmailText>

      <EmailText muted style={{ fontSize: '14px', marginBottom: 0 }}>
        We kijken uit naar het gesprek!
      </EmailText>
    </BaseEmailTemplate>
  );
}
