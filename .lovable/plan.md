✅ COMPLETED


# Job Site voor Client Websites

## Samenvatting
Een publieke vacaturepagina die klanten kunnen gebruiken op hun eigen website, volledig gebranded met hun huiskleur, logo en bedrijfsnaam. Beter dan Workable door: premium design, snellere laadtijd, en naadloze integratie met jullie ATS.

## Wat we gaan bouwen

### 1. Publieke Routes (geen login nodig)
```
/jobs/:subdomain              → Vacature overzicht voor klant
/jobs/:subdomain/:vacancyId   → Vacature detail + sollicitatieformulier
```

### 2. Job Board Homepage
- **Hero sectie** met klant logo, bedrijfsnaam, custom tagline
- **Zoekveld** + filters (locatie, contracttype, afdeling)
- **Vacature cards** in clean grid/list layout
- **Footer** met "Powered by One Rooted" (optioneel te verbergen)

### 3. Vacature Detail Pagina
- Vacature titel, locatie, contracttype badges
- Volledige beschrijving met rich formatting
- Sidebar met "Solliciteer nu" CTA
- Social share buttons
- "Vergelijkbare vacatures" sectie

### 4. Sollicitatieformulier
- Naam, email, telefoon
- CV upload
- Motivatie (optioneel)
- Privacy consent checkbox
- Succesbevestiging na versturen

### 5. Client Branding Systeem
Per client customiseerbaar:
- Logo
- Primaire kleur (buttons, links, accenten)
- Bedrijfsnaam
- Custom intro tekst
- Achtergrond optie (kleur of afbeelding)

## Design Principes

**Beter dan Workable door:**
- Meer whitespace, premium look (Linear/Notion inspired)
- Snellere animaties, geen clunky page loads
- Mobile-first responsive design
- Geen "application required" barriers voor bekijken
- Clean typography, geen overbodige UI elementen

## Technische Aanpak

### Nieuwe Bestanden
```
src/pages/
├── jobs/
│   ├── JobBoard.tsx           # Hoofdpagina met vacature lijst
│   └── JobDetail.tsx          # Vacature detail + solliciteren

src/components/jobs/
├── JobBoardHeader.tsx         # Hero met branding
├── JobCard.tsx                # Vacature card
├── JobFilters.tsx             # Zoek + filter controls
├── JobApplicationForm.tsx     # Sollicitatieformulier
└── ClientBrandProvider.tsx    # Context voor client theming

src/data/
└── mockClientBrandingData.ts  # Mock branding per client
```

### Route Setup
- Publieke routes buiten `ProtectedRoute` wrapper
- Dynamic routing voor subdomain/vacancy ID
- SEO-friendly URL structuur

### Branding Implementatie
- CSS custom properties voor dynamic kleuren
- Client brand context die logo/colors injecteert
- Fallback naar One Rooted branding indien niet geconfigureerd

## Data Model Uitbreiding

Toevoegen aan Partner/Client:

```typescript
interface ClientBranding {
  logoUrl?: string;
  primaryColor: string;
  backgroundColor?: string;
  heroImageUrl?: string;
  tagline?: string;
  hideFooterBadge?: boolean;
}
```

## Responsive Breakpoints
- Mobile: Single column, sticky apply button
- Tablet: 2-kolom grid
- Desktop: Sidebar layout op detail pagina

## Wat NIET in scope
- Eigen subdomain hosting (komt later met backend)
- Email notificaties bij sollicitatie (hangt af van Resend edge function)
- ATS tracking/analytics (backend vereist)

---

## Technische Details

### URL Structuur
```
/jobs/techbedrijf                    → TechBedrijf BV vacatures
/jobs/techbedrijf/vac_senior_dev     → Senior Developer bij TechBedrijf
```

### Branding Context
```typescript
// Haalt branding op basis van subdomain
const { branding } = useClientBranding(subdomain);

// Injecteert CSS variables
<div style={{ 
  '--client-primary': branding.primaryColor,
  '--client-bg': branding.backgroundColor 
}}>
```

### Vacature Filtering
- Alleen `status: 'live'` vacatures tonen
- Filter op partnerId van de subdomain
- Zoeken op titel, locatie

### Sollicitatie Flow
1. Kandidaat vult formulier in
2. Frontend validatie (Zod)
3. (Later: POST naar Edge Function)
4. Succes screen met bevestiging
5. (Later: Email naar kandidaat + recruiter)

