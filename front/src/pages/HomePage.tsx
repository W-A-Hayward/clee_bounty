import { useMemo } from 'react'
import MagneticButton from '../components/MagneticButton'
import ScrollReveal from '../components/ScrollReveal'
import SectionHeading from '../components/SectionHeading'
import TiltCard from '../components/TiltCard'
import { companyProjects as staticCompanyProjects, type CompanyProject } from '../data/companyPortal'
import { faqItems } from '../data/siteContent'
import { useLang, pick } from '../i18n/LanguageContext'
import type { StudentProject } from '../data/studentPortal'
import type { DemoSession } from '../lib/demoSession'
import { routeHref } from '../lib/hashRouter'
import legendHeroImage from '../assets/legend-hero-image.png'

type HomePageProps = {
  session?: DemoSession
  studentProjects: StudentProject[]
  companyProjects: CompanyProject[]
  onOpenPalette: () => void
}

const copy = {
  en: {
    badge: (n: number) => `Live legend · ${n} open briefs`,
    heroPre: 'Real work for',
    heroWords: ['students.', 'designers.', 'engineers.', 'analysts.', 'writers.', 'researchers.'],
    heroIntro: 'Put yourself on the map. Browse verified briefs, apply with context, and turn every project into a chapter of your portfolio.',
    browseMarketplace: 'Browse the marketplace',
    openCompanyDash: 'Open company dashboard',
    openMyDash: 'Open my dashboard',
    signIn: 'Sign in',
    statsLive: 'Live briefs',
    statsCompanies: 'Companies',
    statsReply: 'Avg reply',
    heroAlt: 'Legend opportunity map connecting Montreal campus nodes and company opportunities',
    flowEyebrow: 'The flow',
    flowTitle: 'Three motions. One workspace. Zero noise.',
    flowDesc: 'Every map has a legend. This is yours: browse, apply, deliver, and keep the opportunity path clear on both sides.',
    pillars: [
      { counter: '01', title: 'Browse like a feed', body: 'Every brief carries scope, budget, timeline, deliverables, work mode, and required skills before you click. No teaser cards.' },
      { counter: '02', title: 'Apply with sharp context', body: 'Your school identity, portfolio, availability and rate ride along. Companies receive a complete picture, not a CV blob.' },
      { counter: '03', title: 'Deliver inside the platform', body: 'Milestones, threads, file handoff and reviews live in one workspace. Email scatter is replaced by structured stages.' },
    ],
    openNowEyebrow: 'Open right now',
    openNowTitle: 'Briefs you can apply to today.',
    openNowDesc: 'Each card carries scope, fit signal, and a direct route into the brief, and the apply form.',
    viewAll: (n: number) => `View all ${n}`,
    fitSuffix: 'fit',
    openBrief: 'Open brief',
    forStudentsKicker: 'For students',
    forStudentsTitle: 'Browse the board.',
    forStudentsTitleEm: ' Apply when it fits.',
    forStudentsBody: 'Project briefs are public. No forced sign-up to read what is on the board. Sign in only when you are ready to apply or open your dashboard.',
    forStudentsBullets: [
      'Full scope, budget, deliverables visible upfront',
      'Pipeline workspace, applications, messages, milestones',
      'School-verified identity from day one',
    ],
    createStudent: 'Create student account',
    learnMore: 'Learn more',
    forCompaniesKicker: 'For companies',
    forCompaniesTitle: 'Post structured work.',
    forCompaniesTitleEm: ' Receive sharper applicants.',
    forCompaniesBody: 'Write a structured brief once. Receive applications from students who already understand scope, budget, deliverables, and review cadence.',
    postProject: 'Post a project',
    applicantsLabel: 'applicants',
    trustEyebrow: 'Why it works',
    trustTitle: 'Identity, structure, moderation, engineered into the product.',
    trustDesc: 'Both sides of the marketplace need to trust each other before a project can succeed. Trust is a product surface, not a slogan.',
    trustPillars: [
      { kicker: 'Identity', title: 'School-verified profiles, work-email companies', body: 'Every account carries a real-world signal, not just a username and password.' },
      { kicker: 'Structure', title: 'Briefs hit a standard before they go live', body: 'Scope, deliverables, budget, timeline and review cadence are required fields, not optional.' },
      { kicker: 'Moderation', title: 'Disputes & quality control are first-class surfaces', body: 'Platform governance is visible, not buried in fine print or ToS.' },
    ],
    faqEyebrow: 'FAQ',
    faqTitle: 'What people ask before they get started.',
    faqDesc: 'More detail lives on the how-it-works page, and inside the workspace once you sign in.',
    ctaEyebrow: 'Step in',
    ctaTitle: 'The marketplace is live. Walk in.',
    ctaBody: 'Students get real portfolio work with verified companies. Companies receive structured output without recruiting overhead. The platform keeps both sides accountable.',
    joinAsStudent: 'Join as student',
    browseFirst: 'Browse first',
  },
  fr: {
    badge: (n: number) => `Légende en direct · ${n} mandats ouverts`,
    heroPre: 'Du vrai travail pour',
    heroWords: ['les étudiants.', 'les designers.', 'les développeurs.', 'les analystes.', 'les rédacteurs.', 'les chercheurs.'],
    heroIntro: 'Trouve ta place sur la carte. Explore des mandats vérifiés, postule en contexte, et transforme chaque projet en chapitre de ton portfolio.',
    browseMarketplace: 'Explorer les projets',
    openCompanyDash: 'Ouvrir mon espace entreprise',
    openMyDash: 'Mon tableau de bord',
    signIn: 'Connexion',
    statsLive: 'Mandats actifs',
    statsCompanies: 'Entreprises',
    statsReply: 'Réponse moy.',
    heroAlt: 'Carte des opportunités Legend reliant les campus montréalais aux entreprises',
    flowEyebrow: 'Le flow',
    flowTitle: 'Trois mouvements. Un atelier. Zéro bruit.',
    flowDesc: 'Chaque carte a sa légende. Voici la tienne : explore, postule, livre, et garde le chemin clair des deux côtés.',
    pillars: [
      { counter: '01', title: 'Explore comme un fil', body: 'Chaque mandat affiche scope, budget, échéance, livrables, mode de travail et compétences avant que tu cliques. Aucune carte teaser.' },
      { counter: '02', title: 'Postule avec contexte', body: 'Ton identité étudiante, ton portfolio, ta disponibilité et ton taux suivent ta candidature. Les entreprises reçoivent un vrai portrait, pas un CV brut.' },
      { counter: '03', title: 'Livre dans la plateforme', body: 'Étapes, fils de discussion, remise de fichiers et revues vivent dans un seul atelier. Fini les courriels éparpillés.' },
    ],
    openNowEyebrow: 'Ouvert maintenant',
    openNowTitle: 'Des mandats où tu peux postuler aujourd’hui.',
    openNowDesc: 'Chaque carte porte le scope, le signal d’adéquation, et un accès direct au mandat et au formulaire.',
    viewAll: (n: number) => `Tout voir (${n})`,
    fitSuffix: 'match',
    openBrief: 'Voir le mandat',
    forStudentsKicker: 'Pour les étudiants',
    forStudentsTitle: 'Explore le tableau.',
    forStudentsTitleEm: ' Postule quand ça colle.',
    forStudentsBody: 'Les mandats sont publics. Pas besoin de créer un compte pour lire ce qui est affiché. Tu te connectes seulement pour postuler ou ouvrir ton tableau.',
    forStudentsBullets: [
      'Scope, budget, livrables visibles dès le départ',
      'Atelier complet : candidatures, messages, étapes',
      'Identité étudiante vérifiée dès le jour un',
    ],
    createStudent: 'Créer mon compte étudiant',
    learnMore: 'En savoir plus',
    forCompaniesKicker: 'Pour les entreprises',
    forCompaniesTitle: 'Publiez du travail structuré.',
    forCompaniesTitleEm: ' Recevez des candidats plus aiguisés.',
    forCompaniesBody: 'Rédigez un mandat structuré une seule fois. Recevez des candidatures d’étudiants qui comprennent déjà le scope, le budget, les livrables et la cadence de révision.',
    postProject: 'Publier un projet',
    applicantsLabel: 'candidats',
    trustEyebrow: 'Pourquoi ça marche',
    trustTitle: 'Identité, structure, modération — intégrées au produit.',
    trustDesc: 'Les deux côtés doivent se faire confiance avant qu’un projet réussisse. La confiance est une surface produit, pas un slogan.',
    trustPillars: [
      { kicker: 'Identité', title: 'Profils étudiants vérifiés, entreprises avec courriel pro', body: 'Chaque compte porte un signal réel, pas juste un nom d’utilisateur et un mot de passe.' },
      { kicker: 'Structure', title: 'Les mandats atteignent un standard avant publication', body: 'Scope, livrables, budget, échéance, cadence de revue : champs obligatoires, pas optionnels.' },
      { kicker: 'Modération', title: 'Litiges et qualité visibles dans le produit', body: 'La gouvernance de la plateforme est visible, pas enterrée dans les conditions d’utilisation.' },
    ],
    faqEyebrow: 'FAQ',
    faqTitle: 'Ce qu’on demande avant de commencer.',
    faqDesc: 'Plus de détails sur la page « Comment ça marche », et dans l’atelier une fois connecté.',
    ctaEyebrow: 'Entre',
    ctaTitle: 'La plateforme est en direct. Entre.',
    ctaBody: 'Les étudiants obtiennent du vrai travail portfolio avec des entreprises vérifiées. Les entreprises reçoivent une sortie structurée sans coût de recrutement. La plateforme garde les deux côtés responsables.',
    joinAsStudent: 'Rejoindre comme étudiant',
    browseFirst: 'Explorer d’abord',
  },
}

function HomePage({ session = null, studentProjects, companyProjects }: HomePageProps) {
  const lang = useLang()
  const t = copy[lang]
  const dashboardRoute = session?.role === 'company' ? '/company/dashboard' : '/dashboard'
  const dashboardCtaRoute = session ? dashboardRoute : '/auth'
  const dashboardLabel = session
    ? session.role === 'company'
      ? t.openCompanyDash
      : t.openMyDash
    : t.signIn

  const previewProjects = studentProjects.slice(0, 3)
  const displayedFaqItems = faqItems.slice(0, 6)
  const displayedCompanyProjects = companyProjects.length > 0 ? companyProjects : staticCompanyProjects
  const uniqueCompanies = useMemo(
    () => Array.from(new Set(studentProjects.map((p) => p.company))),
    [studentProjects],
  )
  const marqueeCompanies = uniqueCompanies.length > 0 ? uniqueCompanies : ['Legend', 'Northline', 'Harbor Foods']

  return (
    <div className="home-page">
      <section className="clee-hero">
        <div className="clee-hero-copy">
          <span className="clee-hero-badge">
            <span aria-hidden="true" />
            {t.badge(studentProjects.length)}
          </span>

          <h1 className="clee-hero-title">
            <span>{t.heroPre}</span>
            <span className="clee-word-reel" aria-label={t.heroWords.join(', ')}>
              <span>
                {t.heroWords.map((word) => (
                  <em key={word}>{word}</em>
                ))}
              </span>
            </span>
          </h1>

          <p>{t.heroIntro}</p>

          <div className="clee-hero-actions">
            <MagneticButton className="button button-primary" href={routeHref('/projects')}>
              {t.browseMarketplace}
            </MagneticButton>
            <MagneticButton className="button button-secondary" href={routeHref(dashboardCtaRoute)}>
              {dashboardLabel}
            </MagneticButton>
          </div>

          <div className="clee-hero-stats">
            <div>
              <strong>{studentProjects.length}</strong>
              <span>{t.statsLive}</span>
            </div>
            <div>
              <strong>{uniqueCompanies.length}</strong>
              <span>{t.statsCompanies}</span>
            </div>
            <div>
              <strong>36h</strong>
              <span>{t.statsReply}</span>
            </div>
          </div>
        </div>

        <div className="clee-hero-visual">
          <img
            className="clee-hero-image"
            src={legendHeroImage}
            alt={t.heroAlt}
          />
        </div>
      </section>

      <ScrollReveal>
        <section className="section-block home-section portal-section-tight">
          <div className="marquee" aria-hidden>
            <div className="marquee-track">
              {[...marqueeCompanies, ...marqueeCompanies, ...marqueeCompanies].slice(0, 24).map((company, idx) => (
                <span key={`${company}-${idx}`} className="marquee-item">{company}</span>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <section className="section-block home-section home-flow-section">
        <ScrollReveal>
          <SectionHeading
            eyebrow={t.flowEyebrow}
            title={t.flowTitle}
            description={t.flowDesc}
          />
        </ScrollReveal>

        <div className="kinetic-pillars home-flow-grid">
          {t.pillars.map((pillar, idx) => (
            <ScrollReveal className="home-flow-reveal" key={pillar.counter} delay={idx * 0.1}>
              <article className="kinetic-pillar">
                <div className="kinetic-pillar-counter">{pillar.counter}</div>
                <h3>{pillar.title}</h3>
                <p>{pillar.body}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="section-block home-section home-project-section">
        <ScrollReveal>
          <div className="home-section-toolbar">
            <SectionHeading
              eyebrow={t.openNowEyebrow}
              title={t.openNowTitle}
              description={t.openNowDesc}
            />
            <a className="button button-ghost" href={routeHref('/projects')}>
              {t.viewAll(studentProjects.length)}
            </a>
          </div>
        </ScrollReveal>

        <div className="project-grid home-project-grid">
          {previewProjects.map((project, idx) => (
            <ScrollReveal className="home-project-reveal" key={project.slug} delay={idx * 0.08}>
              <TiltCard className={`project-card ${project.tone}`} href={routeHref(`/projects/${project.slug}`)}>
                <div className="project-card-topline">
                  <span className="card-kicker">{project.company}</span>
                  <span className="meta-chip">{pick(project.workMode, lang)}</span>
                </div>
                <h3>{pick(project.title, lang)}</h3>
                <p>{pick(project.summary, lang)}</p>
                <div className="project-card-meta">
                  <span>{project.budget}</span>
                  <span>{pick(project.duration, lang)}</span>
                  <span>{pick(project.experienceLevel, lang)}</span>
                </div>
                <div className="tag-row">
                  {project.skills.slice(0, 4).map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
                <div className="project-card-footer">
                  <div className="project-card-fit">
                    <strong>{project.matchScore}%</strong>
                    <small>{t.fitSuffix}</small>
                  </div>
                  <span className="project-card-cta">{t.openBrief}</span>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="section-block home-section dual-channel">
        <ScrollReveal>
          <article className="dual-channel-card tone-green">
            <span className="card-kicker">{t.forStudentsKicker}</span>
            <h2 className="dual-channel-title">
              {t.forStudentsTitle}
              <em>{t.forStudentsTitleEm}</em>
            </h2>
            <p>{t.forStudentsBody}</p>
            <ul className="point-list">
              {t.forStudentsBullets.map((b) => <li key={b}>{b}</li>)}
            </ul>
            <div className="hero-actions">
              <MagneticButton className="button button-primary" href={routeHref('/students/create-account')}>
                {t.createStudent}
              </MagneticButton>
              <a className="button button-ghost" href={routeHref('/students')}>{t.learnMore}</a>
            </div>
          </article>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <article className="dual-channel-card tone-blue">
            <span className="card-kicker">{t.forCompaniesKicker}</span>
            <h2 className="dual-channel-title">
              {t.forCompaniesTitle}
              <em>{t.forCompaniesTitleEm}</em>
            </h2>
            <p>{t.forCompaniesBody}</p>
            <div className="list-stack">
              {displayedCompanyProjects.slice(0, 2).map((project) => (
                <article key={project.id} className="list-card">
                  <div>
                    <strong>{pick(project.title, lang)}</strong>
                    <p>{pick(project.projectType, lang)} · {project.budget} · {pick(project.workMode, lang)}</p>
                  </div>
                  <div className="status-column">
                    <span className={`status-pill status-${project.status}`}>{pick(project.statusLabel, lang)}</span>
                    <small>{project.applicants} {t.applicantsLabel}</small>
                  </div>
                </article>
              ))}
            </div>
            <div className="hero-actions">
              <MagneticButton className="button button-primary" href={routeHref('/companies/create-account')}>
                {t.postProject}
              </MagneticButton>
              <a className="button button-ghost" href={routeHref('/companies')}>{t.learnMore}</a>
            </div>
          </article>
        </ScrollReveal>
      </section>

      <section className="section-block home-section">
        <ScrollReveal>
          <SectionHeading
            eyebrow={t.trustEyebrow}
            title={t.trustTitle}
            description={t.trustDesc}
          />
        </ScrollReveal>

        <div className="feature-grid feature-grid-three">
          {t.trustPillars.map((pillar, idx) => (
            <ScrollReveal key={pillar.kicker} delay={idx * 0.08}>
              <article className="trust-pillar">
                <span className="card-kicker">{pillar.kicker}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.body}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="section-block home-section">
        <ScrollReveal>
          <SectionHeading
            eyebrow={t.faqEyebrow}
            title={t.faqTitle}
            description={t.faqDesc}
          />
        </ScrollReveal>

        <div className="faq-grid">
          {displayedFaqItems.map((item, idx) => (
            <ScrollReveal key={pick(item.question, 'en')} delay={idx * 0.05}>
              <article className="faq-item">
                <h3>{pick(item.question, lang)}</h3>
                <p>{pick(item.answer, lang)}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <ScrollReveal>
          <div className="cta-panel-full">
            <div>
              <p className="eyebrow">{t.ctaEyebrow}</p>
              <h2>{t.ctaTitle}</h2>
              <p>{t.ctaBody}</p>
            </div>
            <div className="cta-panel-actions">
              <MagneticButton className="button button-primary" href={routeHref('/students/create-account')}>
                {t.joinAsStudent}
              </MagneticButton>
              <MagneticButton className="button button-secondary" href={routeHref('/companies/create-account')}>
                {t.postProject}
              </MagneticButton>
              <a className="button button-ghost" href={routeHref('/projects')}>{t.browseFirst}</a>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  )
}

export default HomePage
