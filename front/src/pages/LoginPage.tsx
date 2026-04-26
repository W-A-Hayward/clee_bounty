import { useState } from 'react'
import { useLang } from '../i18n/LanguageContext'
import type { MemberAuthPayload } from '../lib/demoSession'
import { routeHref } from '../lib/hashRouter'

type LoginPageProps = {
  onSignIn: (payload: MemberAuthPayload) => Promise<void>
  actionLabel?: string
}

const copy = {
  en: {
    eyebrow: 'Student sign in',
    h1: 'Welcome back. Your workspace is waiting.',
    intro: 'Sign in to access your dashboard, track applications, and continue conversations with companies.',
    enterCreds: 'Enter your credentials below',
    accessEyebrow: 'Student access',
    accessTitle: 'Sign in to your account',
    emailLabel: 'School or work email',
    emailPh: 'you@university.ca',
    passwordLabel: 'Password',
    passwordPh: 'Your password',
    signInError: 'Sign-in error',
    signingIn: 'Signing in…',
    fallbackLabel: 'Continue to dashboard',
    noAccount: 'No account yet?',
    createOne: 'Create one here',
    demoLabel: 'Demo credentials',
    demoBody: 'Use this to explore the full student workspace, dashboard, projects, applications, and messages.',
    otherEyebrow: 'Other options',
    notStudent: 'Not a student?',
    createStudent: 'Create student account',
    createStudentBody: 'Set up your school profile and start applying to projects.',
    companySignIn: 'Company sign in',
    companySignInBody: 'Return to the company dashboard and manage posted projects.',
    createCompany: 'Create company account',
    createCompanyBody: 'Post your first project brief and start receiving applications.',
    fallbackErr: 'Unable to sign in.',
  },
  fr: {
    eyebrow: 'Connexion étudiant',
    h1: 'Bon retour. Ton atelier t’attend.',
    intro: 'Connecte-toi pour accéder à ton tableau, suivre tes candidatures et continuer tes conversations avec les entreprises.',
    enterCreds: 'Entre tes identifiants ci-dessous',
    accessEyebrow: 'Accès étudiant',
    accessTitle: 'Connecte-toi à ton compte',
    emailLabel: 'Courriel scolaire ou pro',
    emailPh: 'toi@université.ca',
    passwordLabel: 'Mot de passe',
    passwordPh: 'Ton mot de passe',
    signInError: 'Erreur de connexion',
    signingIn: 'Connexion…',
    fallbackLabel: 'Continuer vers le tableau',
    noAccount: 'Pas encore de compte ?',
    createOne: 'Crée-en un ici',
    demoLabel: 'Identifiants démo',
    demoBody: 'Sers-toi de ça pour explorer l’atelier étudiant complet — tableau, projets, candidatures et messages.',
    otherEyebrow: 'Autres options',
    notStudent: 'Pas étudiant ?',
    createStudent: 'Créer un compte étudiant',
    createStudentBody: 'Configure ton profil scolaire et commence à postuler.',
    companySignIn: 'Connexion entreprise',
    companySignInBody: 'Retourne au tableau entreprise et gère les projets publiés.',
    createCompany: 'Créer un compte entreprise',
    createCompanyBody: 'Publie ton premier mandat et commence à recevoir des candidatures.',
    fallbackErr: 'Impossible de se connecter.',
  },
}

function LoginPage({ onSignIn, actionLabel }: LoginPageProps) {
  const lang = useLang()
  const t = copy[lang]
  const finalActionLabel = actionLabel ?? t.fallbackLabel
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  return (
    <>
      <section className="section-block" style={{ paddingBottom: 0 }}>
        <div style={{ maxWidth: '36rem' }}>
          <p className="eyebrow">{t.eyebrow}</p>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', lineHeight: 1.2, margin: '0.5rem 0 1rem' }}>
            {t.h1}
          </h1>
          <p className="page-intro" style={{ margin: 0 }}>{t.intro}</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '1.5rem 0 0', color: 'var(--brand-blue)', fontWeight: 700, fontSize: '0.9rem' }}>
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
          {t.enterCreds}
        </div>
      </section>

      <section className="section-block portal-two-column">
        <article className="panel-card" style={{ border: '2px solid var(--brand-blue)', boxShadow: '0 4px 24px rgba(31,95,175,0.08)' }}>
          <div className="section-heading" style={{ marginBottom: '1.25rem' }}>
            <div>
              <p className="eyebrow">{t.accessEyebrow}</p>
              <h2>{t.accessTitle}</h2>
            </div>
          </div>

          <form
            className="form-grid"
            onSubmit={async (event) => {
              event.preventDefault()
              setErrorMessage('')
              setIsSubmitting(true)
              try {
                await onSignIn({ email, name: '', password })
              } catch (error) {
                setErrorMessage(error instanceof Error ? error.message : t.fallbackErr)
              } finally {
                setIsSubmitting(false)
              }
            }}
          >
            <label className="field-shell">
              <span className="mini-label">{t.emailLabel}</span>
              <input
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.emailPh}
                required
                type="email"
                value={email}
              />
            </label>

            <label className="field-shell">
              <span className="mini-label">{t.passwordLabel}</span>
              <input
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t.passwordPh}
                required
                type="password"
                value={password}
              />
            </label>

            {errorMessage ? (
              <article className="info-card tone-red">
                <span className="mini-label">{t.signInError}</span>
                <strong>{errorMessage}</strong>
              </article>
            ) : null}

            <button className="button button-primary" disabled={isSubmitting} style={{ marginTop: '0.25rem' }} type="submit">
              {isSubmitting ? t.signingIn : `${finalActionLabel} →`}
            </button>

            <p style={{ margin: '0.25rem 0 0', fontSize: '0.82rem', color: 'var(--ink-soft)', textAlign: 'center' }}>
              {t.noAccount}{' '}
              <a href={routeHref('/students/create-account')} style={{ color: 'var(--brand-blue)', fontWeight: 700 }}>
                {t.createOne}
              </a>
            </p>
          </form>
        </article>

        <div className="story-stack">
          <article className="info-card tone-blue">
            <span className="mini-label">{t.demoLabel}</span>
            <strong>amira@concordia.ca</strong>
            <p>{lang === 'fr' ? 'Mot de passe' : 'Password'}: <strong>clee12345</strong></p>
            <p style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>{t.demoBody}</p>
          </article>

          <article className="panel-card">
            <div className="section-heading" style={{ marginBottom: '1rem' }}>
              <div>
                <p className="eyebrow">{t.otherEyebrow}</p>
                <h2>{t.notStudent}</h2>
              </div>
            </div>
            <div className="list-stack">
              <a className="list-card" href={routeHref('/students/create-account')}>
                <div>
                  <strong>{t.createStudent}</strong>
                  <p>{t.createStudentBody}</p>
                </div>
              </a>
              <a className="list-card" href={routeHref('/companies/sign-in')}>
                <div>
                  <strong>{t.companySignIn}</strong>
                  <p>{t.companySignInBody}</p>
                </div>
              </a>
              <a className="list-card" href={routeHref('/companies/create-account')}>
                <div>
                  <strong>{t.createCompany}</strong>
                  <p>{t.createCompanyBody}</p>
                </div>
              </a>
            </div>
          </article>
        </div>
      </section>
    </>
  )
}

export default LoginPage
