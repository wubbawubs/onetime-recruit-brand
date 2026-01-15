import * as React from 'react';

interface BaseEmailTemplateProps {
  children: React.ReactNode;
  preheader?: string;
  /** When true, renders just the visual content without html/head/body tags for preview */
  previewMode?: boolean;
}

export function BaseEmailTemplate({ children, preheader, previewMode = false }: BaseEmailTemplateProps) {
  // Inner content that can be rendered standalone for preview
  const emailContent = (
    <>
      {/* Preheader text - hidden but shows in inbox preview */}
      {preheader && !previewMode && (
        <div
          style={{
            display: 'none',
            fontSize: '1px',
            color: '#f4f7f4',
            lineHeight: '1px',
            maxHeight: 0,
            maxWidth: 0,
            opacity: 0,
            overflow: 'hidden',
          }}
        >
          {preheader}
          {/* Padding to push other content out of preview */}
          {'\u00A0'.repeat(150)}
        </div>
      )}

      {/* Main container */}
      <table
        role="presentation"
        cellPadding={0}
        cellSpacing={0}
        style={{
          width: '100%',
          backgroundColor: '#f4f7f4',
          padding: '40px 0',
        }}
      >
        <tbody>
          <tr>
            <td align="center">
              <table
                role="presentation"
                className="email-container"
                cellPadding={0}
                cellSpacing={0}
                style={{
                  width: '600px',
                  maxWidth: '600px',
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                }}
              >
                <tbody>
                  {/* Header */}
                  <tr>
                    <td
                      className="email-header"
                      align="center"
                      style={{
                        background: 'linear-gradient(135deg, #2d5a3d 0%, #4a7c59 50%, #d4a574 100%)',
                        padding: '32px 40px',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '28px',
                          fontWeight: 800,
                          color: '#ffffff',
                          letterSpacing: '-0.5px',
                          textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        }}
                      >
                        One Rooted
                      </div>
                    </td>
                  </tr>

                  {/* Content */}
                  <tr>
                    <td
                      className="email-content"
                      style={{
                        padding: '40px',
                        backgroundColor: '#ffffff',
                      }}
                    >
                      {children}
                    </td>
                  </tr>

                  {/* Footer */}
                  <tr>
                    <td
                      className="email-footer"
                      style={{
                        backgroundColor: '#f8faf8',
                        borderTop: '1px solid #e8ede8',
                      }}
                    >
                      <table
                        role="presentation"
                        cellPadding={0}
                        cellSpacing={0}
                        style={{ width: '100%' }}
                      >
                        <tbody>
                          <tr>
                            <td
                              className="email-footer-content"
                              align="center"
                              style={{ padding: '24px 40px' }}
                            >
                              <p
                                className="email-text-muted"
                                style={{
                                  margin: '0 0 8px 0',
                                  fontSize: '13px',
                                  lineHeight: '20px',
                                  color: '#5a6b5a',
                                }}
                              >
                                © {new Date().getFullYear()} One Rooted. Alle rechten voorbehouden.
                              </p>
                              <p
                                className="email-text-muted"
                                style={{
                                  margin: 0,
                                  fontSize: '13px',
                                  lineHeight: '20px',
                                  color: '#5a6b5a',
                                }}
                              >
                                Amsterdam, Nederland
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Footer links outside container */}
              <table
                role="presentation"
                cellPadding={0}
                cellSpacing={0}
                style={{ width: '600px', maxWidth: '600px' }}
              >
                <tbody>
                  <tr>
                    <td
                      align="center"
                      style={{ padding: '24px 0' }}
                    >
                      <p
                        style={{
                          margin: 0,
                          fontSize: '12px',
                          lineHeight: '18px',
                          color: '#8a9a8a',
                        }}
                      >
                        <a
                          href="{{unsubscribe_url}}"
                          style={{
                            color: '#5a6b5a',
                            textDecoration: 'underline',
                          }}
                        >
                          Uitschrijven
                        </a>
                        {' · '}
                        <a
                          href="https://onerooted.nl/privacy"
                          style={{
                            color: '#5a6b5a',
                            textDecoration: 'underline',
                          }}
                        >
                          Privacy Policy
                        </a>
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );

  // For preview mode, just return the content without html/body wrapper
  if (previewMode) {
    return (
      <div
        style={{
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        }}
      >
        {emailContent}
      </div>
    );
  }

  // Full HTML for email export
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="light only" />
        <meta name="supported-color-schemes" content="light only" />
        <title>One Rooted</title>
        {/* MSO/Outlook force light mode */}
        {/* eslint-disable-next-line react/no-danger */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              /* Force light mode in dark mode email clients */
              :root { color-scheme: light only !important; }
              
              @media (prefers-color-scheme: dark) {
                /* Override dark mode - force light colors */
                .email-body { background-color: #f4f7f4 !important; }
                .email-container { background-color: #ffffff !important; }
                .email-content { background-color: #ffffff !important; }
                .email-text { color: #1a2e1a !important; }
                .email-text-muted { color: #5a6b5a !important; }
                .email-footer { background-color: #f8faf8 !important; border-color: #e8ede8 !important; }
                .email-divider { border-color: #e8ede8 !important; }
                
                /* Force text colors */
                h1, h2, h3, p, td, th, span, div { color: inherit !important; }
                
                /* Gmail specific overrides */
                u + .email-body { background-color: #f4f7f4 !important; }
                u + .email-body .email-container { background-color: #ffffff !important; }
              }
              
              /* Yahoo Mail dark mode fix */
              [data-ogsc] .email-body { background-color: #f4f7f4 !important; }
              [data-ogsc] .email-container { background-color: #ffffff !important; }
              [data-ogsc] .email-content { background-color: #ffffff !important; }
              [data-ogsc] .email-text { color: #1a2e1a !important; }
              
              @media only screen and (max-width: 600px) {
                .email-container { width: 100% !important; border-radius: 0 !important; }
                .email-content { padding: 24px 20px !important; }
                .email-header { padding: 24px 20px !important; }
                .email-footer-content { padding: 20px !important; }
              }
            `,
          }}
        />
      </head>
      <body
        className="email-body"
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: '#f4f7f4',
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          WebkitTextSizeAdjust: '100%',
        }}
      >
        {emailContent}
      </body>
    </html>
  );
}

// Shared email components
export function EmailButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <table
      role="presentation"
      cellPadding={0}
      cellSpacing={0}
      style={{ margin: '24px 0' }}
    >
      <tbody>
        <tr>
          <td
            align="center"
            style={{
              backgroundColor: '#2d5a3d',
              borderRadius: '8px',
            }}
          >
            <a
              href={href}
              style={{
                display: 'inline-block',
                padding: '14px 32px',
                fontSize: '16px',
                fontWeight: 600,
                color: '#ffffff',
                textDecoration: 'none',
                borderRadius: '8px',
              }}
            >
              {children}
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export function EmailText({
  children,
  muted = false,
  style = {},
}: {
  children: React.ReactNode;
  muted?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <p
      className={muted ? 'email-text-muted' : 'email-text'}
      style={{
        margin: '0 0 16px 0',
        fontSize: '16px',
        lineHeight: '26px',
        color: muted ? '#5a6b5a' : '#1a2e1a',
        ...style,
      }}
    >
      {children}
    </p>
  );
}

export function EmailHeading({
  children,
  style = {},
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <h1
      className="email-text"
      style={{
        margin: '0 0 24px 0',
        fontSize: '24px',
        fontWeight: 700,
        lineHeight: '32px',
        color: '#1a2e1a',
        ...style,
      }}
    >
      {children}
    </h1>
  );
}

export function EmailDivider() {
  return (
    <hr
      className="email-divider"
      style={{
        border: 'none',
        borderTop: '1px solid #e8ede8',
        margin: '24px 0',
      }}
    />
  );
}

export function EmailInfoBox({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <table
      role="presentation"
      cellPadding={0}
      cellSpacing={0}
      style={{ width: '100%', margin: '24px 0' }}
    >
      <tbody>
        <tr>
          <td
            style={{
              backgroundColor: '#f4f7f4',
              borderRadius: '8px',
              padding: '20px',
              border: '1px solid #e8ede8',
            }}
          >
            {children}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
