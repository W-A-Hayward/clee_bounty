import SectionHeading from '../components/SectionHeading'
import {
  companyOperatingPrinciples,
  companyPostingChecklist,
  companySteps,
  trustSignals,
} from '../data/siteContent'
import { pick, useLang } from '../i18n/LanguageContext'
import { routeHref } from '../lib/hashRouter'

const copy = {
  en: {
    eyebrow: 'For companies',
    h1: 'Post short-term work and hire emerging talent without the overhead.',
    intro: 'Legend gives companies a structured way to publish scoped freelance projects, review school-verified applicants, and manage delivery, without the usual recruiting chaos.',
    valueLabel: 'Company value',
    valueStrong: 'Structured briefs → verified applicants → milestone delivery',
    valueBody: 'Create a company profile, publish your first brief, and start collecting applications from students who already know exactly what the work involves.',
    createCompany: 'Create company account',
    companySignIn: 'Company sign in',
    benefitsEyebrow: 'What companies get',
    benefitsTitle: 'A structured hiring loop from brief to delivery.',
    benefitsDesc: 'These are the concrete advantages over the typical informal gig arrangement or expensive recruiter process.',
    benefits: [
      { title: 'Post scoped work in under 10 minutes', body: 'The posting form structures the brief as you fill it out, title, scope, budget, skills, and review cadence are all prompted.', tone: 'tone-blue' },
      { title: 'Get applicants who read the whole brief', body: 'Students see every detail before they apply. The applications you receive are from people who already understood the scope.', tone: 'tone-green' },
      { title: 'Review candidates in one organized queue', body: 'All applicants for all projects appear in the applicants section. Filter by project, see fit scores, and take action directly.', tone: 'tone-orange' },
      { title: 'Keep hiring conversations inside the platform', body: 'Company messages are threaded, project-linked, and visible to your whole team. No more forwarding email chains.', tone: 'tone-blue' },
      { title: 'Milestone-based execution from day one', body: 'When a student is matched, the work moves through staged milestones, not vague task lists that drift into scope creep.', tone: 'tone-green' },
      { title: 'No recruiting overhead', body: 'No job boards, no long interview loops, no legal complexity. Post a scoped brief, review applicants, and start the work.', tone: 'tone-orange' },
    ],
    journeyEyebrow: 'Company journey',
    journeyTitle: 'From first account to active project, three clean steps.',
    journeyDesc: 'The company workspace is purpose-built so the operational tasks each have the right surface.',
    opEyebrow: 'Operating principles',
    opTitle: 'What the platform expects from companies.',
    opDesc: 'These principles are what make Legend feel different from a generic gig board, for companies and students alike.',
    standardEyebrow: 'Brief standard',
    standardTitle: 'What every strong project brief includes.',
    standardDesc: 'Students can tell the difference between a real brief and a lazy posting. A strong brief earns stronger applicants.',
    seeForm: 'See the posting form',
    workspaceEyebrow: 'Company workspace',
    workspaceTitle: 'Every surface available after you sign in.',
    workspaceDesc: 'These pages are built for the company-side workflow. Each one covers a specific part of the hiring and delivery loop.',
    companyPages: [
      { title: 'Company dashboard', href: '/company/dashboard', body: 'Live project inventory, applicant volume, shortlist health, and pipeline status in one view.', tone: 'tone-blue' },
      { title: 'Post a project', href: '/company/post-project', body: 'Draft a project brief with scope, budget, skills, and delivery expectations. Preview it as candidates will see it.', tone: 'tone-green' },
      { title: 'Applicants', href: '/company/applicants', body: 'All candidates across your live projects in one queue. Shortlist, invite, or decline with full profile context.', tone: 'tone-orange' },
      { title: 'Company messages', href: '/company/messages', body: 'Project-linked conversations with applicants. Reply fast, keep context, and maintain a clear hiring record.', tone: 'tone-blue' },
    ],
    trustEyebrow: 'Trust on the company side',
    trustTitle: 'Why applicants need to trust you before they invest time applying.',
    trustDesc: 'The platform enforces the same trust standard for companies that it does for students.',
    ctaEyebrow: 'Ready to hire?',
    ctaTitle: 'Post your first scoped project today.',
    ctaBody: 'Create a company account, fill in the brief form, and your opportunity goes live on the student board. No job board fees. No vague gig descriptions. Just structured work that attracts the right applicants.',
  },
  fr: {
    eyebrow: 'Pour les entreprises',
    h1: 'Publiez du travail à court terme et embauchez des talents émergents sans le surcoût.',
    intro: 'Legend donne aux entreprises une façon structurée de publier des projets freelance bien définis, d’examiner des candidats vérifiés par leur école et de gérer la livraison — sans le chaos de recrutement habituel.',
    valueLabel: 'Valeur entreprise',
    valueStrong: 'Mandats structurés → candidats vérifiés → livraison par étapes',
    valueBody: 'Créez un profil d’entreprise, publiez votre premier mandat, et commencez à recevoir des candidatures d’étudiants qui savent déjà exactement ce qu’implique le travail.',
    createCompany: 'Créer un compte entreprise',
    companySignIn: 'Connexion entreprise',
    benefitsEyebrow: 'Ce que les entreprises obtiennent',
    benefitsTitle: 'Une boucle d’embauche structurée du mandat à la livraison.',
    benefitsDesc: 'Ce sont les avantages concrets sur l’arrangement gig informel typique ou le processus de recruteur coûteux.',
    benefits: [
      { title: 'Publiez du travail défini en moins de 10 minutes', body: 'Le formulaire structure le mandat au fur et à mesure — titre, scope, budget, compétences et cadence de revue sont tous demandés.', tone: 'tone-blue' },
      { title: 'Recevez des candidats qui ont lu tout le mandat', body: 'Les étudiants voient chaque détail avant de postuler. Les candidatures que vous recevez viennent de gens qui ont déjà compris le scope.', tone: 'tone-green' },
      { title: 'Examinez les candidats dans une file organisée', body: 'Tous les candidats pour tous les projets apparaissent dans la section candidats. Filtrez par projet, voyez les scores de fit, agissez directement.', tone: 'tone-orange' },
      { title: 'Gardez les conversations d’embauche dans la plateforme', body: 'Les messages entreprise sont en fil, liés au projet, visibles à toute votre équipe. Fini les chaînes de courriels à transférer.', tone: 'tone-blue' },
      { title: 'Exécution par étapes dès le jour un', body: 'Quand un étudiant est matché, le travail avance par étapes — pas par listes de tâches floues qui dérivent en scope creep.', tone: 'tone-green' },
      { title: 'Aucun surcoût de recrutement', body: 'Pas de tableaux d’emplois, pas de longues boucles d’entrevue, pas de complexité légale. Publiez un mandat défini, examinez les candidats, démarrez le travail.', tone: 'tone-orange' },
    ],
    journeyEyebrow: 'Parcours entreprise',
    journeyTitle: 'Du premier compte au projet actif, en trois étapes propres.',
    journeyDesc: 'L’espace entreprise est conçu pour que chaque tâche opérationnelle ait la bonne surface.',
    opEyebrow: 'Principes d’opération',
    opTitle: 'Ce que la plateforme attend des entreprises.',
    opDesc: 'Ces principes font que Legend se distingue d’un gig board générique, pour les entreprises comme pour les étudiants.',
    standardEyebrow: 'Standard de mandat',
    standardTitle: 'Ce que tout mandat solide inclut.',
    standardDesc: 'Les étudiants distinguent un vrai mandat d’une publication paresseuse. Un mandat solide attire de meilleurs candidats.',
    seeForm: 'Voir le formulaire de publication',
    workspaceEyebrow: 'Espace entreprise',
    workspaceTitle: 'Toutes les surfaces disponibles après votre connexion.',
    workspaceDesc: 'Ces pages sont conçues pour le flux entreprise. Chacune couvre une partie spécifique de la boucle d’embauche et de livraison.',
    companyPages: [
      { title: 'Tableau entreprise', href: '/company/dashboard', body: 'Inventaire de projets en direct, volume de candidats, santé de la shortlist et statut pipeline en une vue.', tone: 'tone-blue' },
      { title: 'Publier un projet', href: '/company/post-project', body: 'Rédigez un mandat avec scope, budget, compétences et attentes de livraison. Prévisualisez-le comme les candidats le verront.', tone: 'tone-green' },
      { title: 'Candidats', href: '/company/applicants', body: 'Tous les candidats sur vos projets actifs dans une seule file. Shortlistez, invitez ou refusez avec le contexte profil complet.', tone: 'tone-orange' },
      { title: 'Messages entreprise', href: '/company/messages', body: 'Conversations liées aux projets avec les candidats. Répondez vite, gardez le contexte, maintenez un dossier d’embauche clair.', tone: 'tone-blue' },
    ],
    trustEyebrow: 'Confiance côté entreprise',
    trustTitle: 'Pourquoi les candidats doivent vous faire confiance avant d’investir du temps à postuler.',
    trustDesc: 'La plateforme impose le même standard de confiance aux entreprises qu’aux étudiants.',
    ctaEyebrow: 'Prêt à embaucher ?',
    ctaTitle: 'Publiez votre premier projet défini aujourd’hui.',
    ctaBody: 'Créez un compte entreprise, remplissez le formulaire de mandat, et votre opportunité passe en direct sur le tableau étudiant. Pas de frais de tableau d’emploi. Pas de descriptions gig vagues. Juste du travail structuré qui attire les bons candidats.',
  },
}

function ForCompaniesPage() {
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
          <span className="mini-label">{t.valueLabel}</span>
          <strong>{t.valueStrong}</strong>
          <p>{t.valueBody}</p>
          <div className="hero-actions">
            <a className="button button-primary" href={routeHref('/companies/create-account')}>
              {t.createCompany}
            </a>
            <a className="button button-secondary" href={routeHref('/companies/sign-in')}>
              {t.companySignIn}
            </a>
          </div>
        </article>
      </section>

      <section className="section-block">
        <SectionHeading
          eyebrow={t.benefitsEyebrow}
          title={t.benefitsTitle}
          description={t.benefitsDesc}
        />

        <div className="feature-grid feature-grid-three">
          {t.benefits.map((benefit) => (
            <article key={benefit.title} className={`feature-card ${benefit.tone}`}>
              <h3>{benefit.title}</h3>
              <p>{benefit.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionHeading
          eyebrow={t.journeyEyebrow}
          title={t.journeyTitle}
          description={t.journeyDesc}
        />

        <div className="steps-grid">
          {companySteps.map((step, index) => {
            const tones = ['step-number-blue', 'step-number-green', 'step-number-orange']
            const titleStr = pick(step.title, lang)
            return (
              <article key={titleStr} className="step-card">
                <span className={`step-number ${tones[index % 3]}`}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3>{titleStr}</h3>
                <p>{pick(step.body, lang)}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section className="section-block portal-two-column">
        <article className="panel-card">
          <SectionHeading
            eyebrow={t.opEyebrow}
            title={t.opTitle}
            description={t.opDesc}
          />

          <div className="list-stack">
            {companyOperatingPrinciples.map((principle) => {
              const titleStr = pick(principle.title, lang)
              return (
                <article key={titleStr} className={`list-card ${principle.tone}`}>
                  <div>
                    <strong>{titleStr}</strong>
                    <p>{pick(principle.body, lang)}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </article>

        <article className="panel-card">
          <SectionHeading
            eyebrow={t.standardEyebrow}
            title={t.standardTitle}
            description={t.standardDesc}
          />

          <ul className="point-list">
            {companyPostingChecklist.map((item, idx) => (
              <li key={idx}>{pick(item, lang)}</li>
            ))}
          </ul>

          <div className="hero-actions" style={{ marginTop: '0.5rem' }}>
            <a className="button button-primary" href={routeHref('/company/post-project')}>
              {t.seeForm}
            </a>
          </div>
        </article>
      </section>

      <section className="section-block portal-two-column">
        <article className="panel-card">
          <SectionHeading
            eyebrow={t.workspaceEyebrow}
            title={t.workspaceTitle}
            description={t.workspaceDesc}
          />

          <div className="list-stack">
            {t.companyPages.map((page) => (
              <a key={page.title} className={`list-card ${page.tone}`} href={routeHref(page.href)}>
                <div>
                  <strong>{page.title}</strong>
                  <p>{page.body}</p>
                </div>
              </a>
            ))}
          </div>
        </article>

        <article className="panel-card">
          <SectionHeading
            eyebrow={t.trustEyebrow}
            title={t.trustTitle}
            description={t.trustDesc}
          />

          <div className="list-stack">
            {trustSignals.map((signal) => {
              const titleStr = pick(signal.title, lang)
              return (
                <article key={titleStr} className={`list-card ${signal.tone}`}>
                  <div>
                    <strong>{titleStr}</strong>
                    <p>{pick(signal.body, lang)}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </article>
      </section>

      <section className="section-block">
        <div className="cta-panel-full">
          <div>
            <p className="eyebrow">{t.ctaEyebrow}</p>
            <h2>{t.ctaTitle}</h2>
            <p>{t.ctaBody}</p>
          </div>
          <div className="cta-panel-actions">
            <a className="button button-primary" href={routeHref('/companies/create-account')}>
              {t.createCompany}
            </a>
            <a className="button button-secondary" href={routeHref('/company/post-project')}>
              {t.seeForm}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default ForCompaniesPage
