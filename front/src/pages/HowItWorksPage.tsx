import SectionHeading from '../components/SectionHeading'
import {
  companyPostingChecklist,
  companySteps,
  memberJourney,
  publicWorkflow,
  trustSignals,
} from '../data/siteContent'
import { pick, useLang } from '../i18n/LanguageContext'
import { routeHref } from '../lib/hashRouter'

const copy = {
  en: {
    eyebrow: 'How it works',
    h1: 'One platform, two workspaces, and a clean freelance loop.',
    intro: 'Legend connects students with scoped project work from verified companies. Every stage — discovery, application, matching, and delivery — has a dedicated surface built for it.',
    glanceLabel: 'At a glance',
    glanceStrong: 'Students browse, apply, and deliver. Companies post, review, and hire.',
    glanceBody: 'The public website is the discovery layer. Sign in to unlock the workspace, a separate dashboard tailored to each audience.',
    browseProjects: 'Browse projects',
    getStarted: 'Get started',
    coreEyebrow: 'Core flow',
    coreTitle: 'Five stages from browse to completed project.',
    coreDesc: 'Each step maps to a real page or module in the platform. Nothing is skipped or left to email.',
    studentEyebrow: 'Student path',
    studentTitle: 'Browse first, commit when it makes sense.',
    studentDesc: 'The student workspace is built around the full apply-to-deliver loop, not just a project list.',
    createStudent: 'Create student account',
    forStudents: 'For students',
    companyEyebrow: 'Company path',
    companyTitle: 'Post, review, match, and collaborate, all in one workspace.',
    companyDesc: 'The company side is intentionally separate so project publishing and applicant review have the right operational surface.',
    createCompany: 'Create company account',
    forCompanies: 'For companies',
    standardEyebrow: 'Brief standard',
    standardTitle: 'Every project answers the same core questions.',
    standardDesc: 'This is what makes the marketplace feel usable instead of vague. Strong briefs attract better-fit applicants.',
    mustInclude: 'What every brief must include',
    whyMatters: 'Why this matters',
    whyTitle: 'Clarity at the brief level reduces back-and-forth at every stage after',
    whyBody: 'Applicants who read a clear brief already know whether to apply. Companies who write a clear brief get applications that actually match the work.',
    nextKicker: 'What happens next',
    nextTitle: 'After submitting, students track status from the applications queue',
    nextBody: 'Status changes, messages, and milestone updates all flow through the same workspace — nothing gets lost in a separate inbox.',
    trustEyebrow: 'Trust signals',
    trustTitle: 'Credibility is visible on both sides of the marketplace.',
    trustDesc: 'Trust is a product decision, not a compliance task. These surfaces are designed in, not bolted on.',
    ctaEyebrow: 'Start using the platform',
    ctaTitle: 'The loop works best when you try it directly.',
    ctaBody: 'Browse the project board first. Sign in when you find a brief worth applying to. If you are a company, create an account and post your first scoped opportunity.',
    studentAccount: 'Student account',
    companyAccount: 'Company account',
  },
  fr: {
    eyebrow: 'Comment ça marche',
    h1: 'Une plateforme, deux ateliers, et une boucle freelance propre.',
    intro: 'Legend connecte les étudiants à du travail projet bien défini provenant d’entreprises vérifiées. Chaque étape — découverte, candidature, matching et livraison — a une surface dédiée bâtie pour elle.',
    glanceLabel: 'D’un coup d’œil',
    glanceStrong: 'Les étudiants explorent, postulent et livrent. Les entreprises publient, examinent et embauchent.',
    glanceBody: 'Le site public est la couche découverte. Connecte-toi pour débloquer l’atelier — un tableau séparé adapté à chaque audience.',
    browseProjects: 'Explorer les projets',
    getStarted: 'Commencer',
    coreEyebrow: 'Flux principal',
    coreTitle: 'Cinq étapes de l’exploration au projet complété.',
    coreDesc: 'Chaque étape correspond à une vraie page ou un module dans la plateforme. Rien n’est sauté ou laissé au courriel.',
    studentEyebrow: 'Parcours étudiant',
    studentTitle: 'Explore d’abord, engage-toi quand ça fait du sens.',
    studentDesc: 'L’atelier étudiant est bâti autour de toute la boucle postuler-livrer, pas juste une liste de projets.',
    createStudent: 'Créer mon compte étudiant',
    forStudents: 'Pour les étudiants',
    companyEyebrow: 'Parcours entreprise',
    companyTitle: 'Publiez, examinez, matchez et collaborez — tout dans un seul atelier.',
    companyDesc: 'Le côté entreprise est intentionnellement séparé pour que la publication et la revue de candidats aient la bonne surface opérationnelle.',
    createCompany: 'Créer un compte entreprise',
    forCompanies: 'Pour les entreprises',
    standardEyebrow: 'Standard de mandat',
    standardTitle: 'Chaque projet répond aux mêmes questions essentielles.',
    standardDesc: 'C’est ce qui rend la plateforme utilisable au lieu de vague. Les mandats solides attirent des candidats mieux ajustés.',
    mustInclude: 'Ce que chaque mandat doit inclure',
    whyMatters: 'Pourquoi c’est important',
    whyTitle: 'La clarté au niveau du mandat réduit les allers-retours à chaque étape suivante',
    whyBody: 'Les candidats qui lisent un mandat clair savent déjà s’il faut postuler. Les entreprises qui écrivent un mandat clair reçoivent des candidatures qui collent vraiment au travail.',
    nextKicker: 'Ce qui se passe ensuite',
    nextTitle: 'Après la soumission, les étudiants suivent le statut depuis la file de candidatures',
    nextBody: 'Changements de statut, messages et mises à jour d’étapes circulent tous par le même atelier — rien ne se perd dans une boîte de réception séparée.',
    trustEyebrow: 'Signaux de confiance',
    trustTitle: 'La crédibilité est visible des deux côtés de la plateforme.',
    trustDesc: 'La confiance est une décision produit, pas une tâche de conformité. Ces surfaces sont conçues dedans, pas boulonnées dessus.',
    ctaEyebrow: 'Commencer à utiliser la plateforme',
    ctaTitle: 'La boucle marche mieux quand tu l’essaies directement.',
    ctaBody: 'Explore d’abord le tableau de projets. Connecte-toi quand tu trouves un mandat qui vaut une candidature. Si tu es une entreprise, crée un compte et publie ta première opportunité bien définie.',
    studentAccount: 'Compte étudiant',
    companyAccount: 'Compte entreprise',
  },
}

function HowItWorksPage() {
  const lang = useLang()
  const t = copy[lang]
  return (
    <>
      <section className="page-header split-header">
        <div>
          <p className="eyebrow">{t.eyebrow}</p>
          <h1>{t.h1}</h1>
          <p className="page-intro">{t.intro}</p>
        </div>

        <article className="info-card tone-blue">
          <span className="mini-label">{t.glanceLabel}</span>
          <strong>{t.glanceStrong}</strong>
          <p>{t.glanceBody}</p>
          <div className="hero-actions">
            <a className="button button-primary" href={routeHref('/projects')}>
              {t.browseProjects}
            </a>
            <a className="button button-secondary" href={routeHref('/auth')}>
              {t.getStarted}
            </a>
          </div>
        </article>
      </section>

      <section className="section-block">
        <SectionHeading
          eyebrow={t.coreEyebrow}
          title={t.coreTitle}
          description={t.coreDesc}
        />

        <div className="workflow-grid">
          {publicWorkflow.map((step) => (
            <article key={step.step} className={`workflow-card ${step.tone}`}>
              <span className="workflow-step">{step.step}</span>
              <h3>{pick(step.title, lang)}</h3>
              <p>{pick(step.body, lang)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block portal-two-column">
        <article className="panel-card">
          <SectionHeading
            eyebrow={t.studentEyebrow}
            title={t.studentTitle}
            description={t.studentDesc}
          />

          <div className="list-stack">
            {memberJourney.map((step) => {
              const titleStr = pick(step.title, lang)
              return (
                <article key={titleStr} className={`list-card ${step.tone}`}>
                  <div>
                    <strong>{titleStr}</strong>
                    <p>{pick(step.body, lang)}</p>
                  </div>
                </article>
              )
            })}
          </div>

          <div className="hero-actions">
            <a className="button button-primary" href={routeHref('/students/create-account')}>
              {t.createStudent}
            </a>
            <a className="button button-ghost" href={routeHref('/students')}>
              {t.forStudents}
            </a>
          </div>
        </article>

        <article className="panel-card">
          <SectionHeading
            eyebrow={t.companyEyebrow}
            title={t.companyTitle}
            description={t.companyDesc}
          />

          <div className="list-stack">
            {companySteps.map((step) => {
              const titleStr = pick(step.title, lang)
              return (
                <article key={titleStr} className="list-card">
                  <div>
                    <strong>{titleStr}</strong>
                    <p>{pick(step.body, lang)}</p>
                  </div>
                </article>
              )
            })}
          </div>

          <div className="hero-actions">
            <a className="button button-primary" href={routeHref('/companies/create-account')}>
              {t.createCompany}
            </a>
            <a className="button button-ghost" href={routeHref('/companies')}>
              {t.forCompanies}
            </a>
          </div>
        </article>
      </section>

      <section className="section-block">
        <SectionHeading
          eyebrow={t.standardEyebrow}
          title={t.standardTitle}
          description={t.standardDesc}
        />

        <div className="feature-grid feature-grid-two">
          <article className="panel-card">
            <p className="eyebrow">{t.mustInclude}</p>
            <ul className="point-list">
              {companyPostingChecklist.map((item, idx) => (
                <li key={idx}>{pick(item, lang)}</li>
              ))}
            </ul>
          </article>

          <div className="list-stack">
            <article className="feature-card tone-blue">
              <span className="card-kicker">{t.whyMatters}</span>
              <h3>{t.whyTitle}</h3>
              <p>{t.whyBody}</p>
            </article>
            <article className="feature-card tone-green">
              <span className="card-kicker">{t.nextKicker}</span>
              <h3>{t.nextTitle}</h3>
              <p>{t.nextBody}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-block">
        <SectionHeading
          eyebrow={t.trustEyebrow}
          title={t.trustTitle}
          description={t.trustDesc}
        />

        <div className="feature-grid feature-grid-three">
          {trustSignals.map((signal) => {
            const titleStr = pick(signal.title, lang)
            return (
              <article key={titleStr} className={`feature-card ${signal.tone}`}>
                <h3>{titleStr}</h3>
                <p>{pick(signal.body, lang)}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section className="section-block">
        <div className="cta-panel-full">
          <div>
            <p className="eyebrow">{t.ctaEyebrow}</p>
            <h2>{t.ctaTitle}</h2>
            <p>{t.ctaBody}</p>
          </div>
          <div className="cta-panel-actions">
            <a className="button button-primary" href={routeHref('/projects')}>
              {t.browseProjects}
            </a>
            <a className="button button-secondary" href={routeHref('/students/create-account')}>
              {t.studentAccount}
            </a>
            <a className="button button-ghost" href={routeHref('/companies/create-account')}>
              {t.companyAccount}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default HowItWorksPage
