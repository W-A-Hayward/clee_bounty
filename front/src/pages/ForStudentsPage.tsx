import SectionHeading from '../components/SectionHeading'
import { memberJourney, trustSignals } from '../data/siteContent'
import { pick, useLang } from '../i18n/LanguageContext'
import type { DemoSession } from '../lib/demoSession'
import { routeHref } from '../lib/hashRouter'

type ForStudentsPageProps = {
  session?: DemoSession
}

const copy = {
  en: {
    eyebrow: 'For students',
    h1: 'Freelance work with structure, not chaos.',
    intro: 'Browse scoped projects from verified companies. Apply with a clear brief in hand. Deliver through a workspace that tracks everything, so your portfolio proof is built in by the time you finish.',
    flowLabel: 'Student flow',
    flowStrong: 'Browse → Apply → Deliver → Portfolio credit',
    flowBody: 'No forced sign-up just to see what is on the board. Browse first, sign in when you find something worth applying to, and manage everything from one dashboard after that.',
    openDashboard: 'Open your dashboard',
    createStudent: 'Create student account',
    browseProjects: 'Browse projects',
    benefitsEyebrow: 'Why students use it',
    benefitsTitle: 'What the platform actually gives you.',
    benefitsDesc: 'These are the concrete advantages over the typical freelance or gig experience students deal with elsewhere.',
    benefits: [
      { title: 'See the full brief before you apply', body: 'Budget, timeline, work mode, deliverables, and company context are visible from the project card, no surprise scope changes after you commit.', tone: 'tone-blue' },
      { title: 'Build a portfolio with real outcomes', body: 'Every project has defined deliverables and milestones, so your work is documented and presentable by the time you finish.', tone: 'tone-green' },
      { title: 'One workspace for the whole pipeline', body: 'Applications, messages, milestone updates, and notifications all live in your dashboard, nothing gets lost in email.', tone: 'tone-orange' },
      { title: 'School-verified identity builds trust', body: 'Your school identity makes your profile credible before a company even reads your application note. No extra steps required.', tone: 'tone-blue' },
      { title: 'Set your rate and availability', body: 'Control how much you earn and how much time you commit. Only projects that fit your schedule surface as strong matches.', tone: 'tone-green' },
      { title: 'Apply to multiple projects in parallel', body: 'Track all your applications in one queue. See what moved, what needs a reply, and what is still waiting for company action.', tone: 'tone-orange' },
    ],
    journeyEyebrow: 'The student journey',
    journeyTitle: 'A clear path from first browse to first delivery.',
    journeyDesc: 'Each stage has a dedicated workspace surface so nothing falls through the cracks between application and payment.',
    workspaceEyebrow: 'Your workspace',
    workspaceTitle: 'Every surface you unlock after signing in.',
    workspaceDesc: 'These pages are live and connected. Each one is built around a specific part of the student workflow.',
    workspacePages: [
      { title: 'Browse projects', href: '/projects', body: 'Full briefs with budget, timeline, work mode, and skills, all visible before you sign in.', tone: 'tone-blue' },
      { title: 'Your dashboard', href: '/dashboard', body: 'Recommended projects, active applications, milestone queue, and unread messages in one place.', tone: 'tone-green' },
      { title: 'Applications queue', href: '/applications', body: 'Track every submission, see status changes, and understand what companies want next.', tone: 'tone-orange' },
      { title: 'Messages', href: '/messages', body: 'Keep company conversations inside the platform, linked to the project they belong to.', tone: 'tone-blue' },
      { title: 'Your profile', href: '/profile', body: 'Manage your portfolio link, skills, rate, and availability, the signal companies read first.', tone: 'tone-green' },
    ],
    trustEyebrow: 'Why trust matters',
    trustTitle: 'You deserve to know a project is real before you invest time applying.',
    trustDesc: 'By the time you read a brief, the company behind it has already committed to the platform’s standard.',
    ctaEyebrow: 'Ready to find real work?',
    ctaTitle: 'Your first freelance project is already on the board.',
    ctaBody: 'Create a student account, set up your profile with your skills and availability, and start browsing briefs. Apply when the fit is real, not just when you are bored scrolling a gig board.',
    createAccount: 'Create account',
    browseFirst: 'Browse projects first',
  },
  fr: {
    eyebrow: 'Pour les étudiants',
    h1: 'Du travail freelance avec structure, pas du chaos.',
    intro: 'Explore des projets bien définis d’entreprises vérifiées. Postule avec un mandat clair en main. Livre à travers un atelier qui suit tout — ta preuve portfolio est construite avant même que tu finisses.',
    flowLabel: 'Flux étudiant',
    flowStrong: 'Explore → Postule → Livre → Crédit portfolio',
    flowBody: 'Pas besoin de créer un compte pour voir ce qui est sur le tableau. Explore d’abord, connecte-toi quand tu trouves quelque chose qui vaut une candidature, puis gère tout depuis un seul tableau.',
    openDashboard: 'Ouvrir ton tableau',
    createStudent: 'Créer mon compte étudiant',
    browseProjects: 'Explorer les projets',
    benefitsEyebrow: 'Pourquoi les étudiants l’utilisent',
    benefitsTitle: 'Ce que la plateforme te donne vraiment.',
    benefitsDesc: 'Ce sont les avantages concrets sur l’expérience freelance ou gig typique que les étudiants vivent ailleurs.',
    benefits: [
      { title: 'Vois le mandat complet avant de postuler', body: 'Budget, échéance, mode de travail, livrables et contexte entreprise visibles depuis la carte du projet — aucun changement de scope surprise après que tu t’engages.', tone: 'tone-blue' },
      { title: 'Construis un portfolio avec de vrais résultats', body: 'Chaque projet a des livrables et étapes définis — ton travail est documenté et présentable au moment où tu termines.', tone: 'tone-green' },
      { title: 'Un atelier pour tout le pipeline', body: 'Candidatures, messages, mises à jour d’étapes et notifications vivent dans ton tableau — rien ne se perd dans les courriels.', tone: 'tone-orange' },
      { title: 'Identité scolaire vérifiée = confiance', body: 'Ton identité scolaire rend ton profil crédible avant même qu’une entreprise lise ta note. Aucune étape supplémentaire.', tone: 'tone-blue' },
      { title: 'Choisis ton taux et ta disponibilité', body: 'Contrôle combien tu gagnes et combien de temps tu engages. Seuls les projets qui collent à ton horaire apparaissent comme matchs forts.', tone: 'tone-green' },
      { title: 'Postule à plusieurs projets en parallèle', body: 'Suis toutes tes candidatures dans une seule file. Vois ce qui a bougé, ce qui demande une réponse, et ce qui attend encore une action.', tone: 'tone-orange' },
    ],
    journeyEyebrow: 'Le parcours étudiant',
    journeyTitle: 'Un chemin clair de la première exploration à la première livraison.',
    journeyDesc: 'Chaque étape a une surface atelier dédiée — rien ne tombe entre les craques entre la candidature et le paiement.',
    workspaceEyebrow: 'Ton atelier',
    workspaceTitle: 'Toutes les surfaces que tu débloques après ta connexion.',
    workspaceDesc: 'Ces pages sont en direct et connectées. Chacune est bâtie autour d’une partie spécifique du flux étudiant.',
    workspacePages: [
      { title: 'Explorer les projets', href: '/projects', body: 'Mandats complets avec budget, échéance, mode de travail et compétences — tout visible avant la connexion.', tone: 'tone-blue' },
      { title: 'Ton tableau de bord', href: '/dashboard', body: 'Projets recommandés, candidatures actives, file d’étapes et messages non lus au même endroit.', tone: 'tone-green' },
      { title: 'File de candidatures', href: '/applications', body: 'Suis chaque soumission, vois les changements de statut, comprends ce que les entreprises veulent ensuite.', tone: 'tone-orange' },
      { title: 'Messages', href: '/messages', body: 'Garde les conversations entreprises dans la plateforme, liées au projet auquel elles appartiennent.', tone: 'tone-blue' },
      { title: 'Ton profil', href: '/profile', body: 'Gère ton lien portfolio, tes compétences, ton taux et ta disponibilité — le signal que les entreprises lisent en premier.', tone: 'tone-green' },
    ],
    trustEyebrow: 'Pourquoi la confiance compte',
    trustTitle: 'Tu mérites de savoir qu’un projet est réel avant d’investir du temps à postuler.',
    trustDesc: 'Au moment où tu lis un mandat, l’entreprise derrière s’est déjà engagée au standard de la plateforme.',
    ctaEyebrow: 'Prêt à trouver du vrai travail ?',
    ctaTitle: 'Ton premier projet freelance est déjà sur le tableau.',
    ctaBody: 'Crée un compte étudiant, configure ton profil avec tes compétences et ta disponibilité, puis explore les mandats. Postule quand le fit est réel — pas juste parce que tu scrolles un gig board.',
    createAccount: 'Créer le compte',
    browseFirst: 'Explorer les projets d’abord',
  },
}

function ForStudentsPage({ session = null }: ForStudentsPageProps) {
  const lang = useLang()
  const t = copy[lang]
  const primaryRoute = session?.role === 'member' ? '/dashboard' : '/students/create-account'
  const primaryLabel = session?.role === 'member' ? t.openDashboard : t.createStudent

  return (
    <>
      <section className="page-header split-header">
        <div>
          <p className="eyebrow">{t.eyebrow}</p>
          <h1>{t.h1}</h1>
          <p className="page-intro">{t.intro}</p>
        </div>

        <article className="info-card tone-green">
          <span className="mini-label">{t.flowLabel}</span>
          <strong>{t.flowStrong}</strong>
          <p>{t.flowBody}</p>
          <div className="hero-actions">
            <a className="button button-primary" href={routeHref(primaryRoute)}>
              {primaryLabel}
            </a>
            <a className="button button-secondary" href={routeHref('/projects')}>
              {t.browseProjects}
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

        <div className="feature-grid feature-grid-three">
          {memberJourney.map((step) => {
            const titleStr = pick(step.title, lang)
            return (
              <article key={titleStr} className={`feature-card ${step.tone}`}>
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
            eyebrow={t.workspaceEyebrow}
            title={t.workspaceTitle}
            description={t.workspaceDesc}
          />

          <div className="list-stack">
            {t.workspacePages.map((page) => (
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
            <a className="button button-primary" href={routeHref('/students/create-account')}>
              {t.createAccount}
            </a>
            <a className="button button-secondary" href={routeHref('/projects')}>
              {t.browseFirst}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default ForStudentsPage
