import { useState } from 'react'
import { useLang } from '../i18n/LanguageContext'
import type { CompanyAuthPayload } from '../lib/demoSession'
import { routeHref } from '../lib/hashRouter'

type CompanyLoginPageProps = {
  onSignIn: (payload: CompanyAuthPayload) => Promise<void>
  actionLabel?: string
}

const copy = {
  en: {
    eyebrow: 'Company sign in',
    h1: 'Back to your workspace. Projects and applicants are waiting.',
    intro: 'Sign in to manage live briefs, review candidates, and reply to applicants, all from one place.',
    enterCreds: 'Enter your credentials below',
    accessEyebrow: 'Company access',
    accessTitle: 'Sign in to your account',
    emailLabel: 'Work email',
    emailPh: 'you@company.com',
    passwordLabel: 'Password',
    passwordPh: 'Your password',
    signInError: 'Sign-in error',
    signingIn: 'Signing in…',
    fallbackLabel: 'Continue to company dashboard',
    noAccount: 'No account yet?',
    createOne: 'Create one here',
    demoLabel: 'Demo credentials',
    demoBody: 'Use this to explore the full company workspace, dashboard, projects, applicants, and messages.',
    otherEyebrow: 'Other options',
    notCompany: 'Not a company?',
    createCompany: 'Create company account',
    createCompanyBody: 'Set up your profile and post your first project brief.',
    studentSignIn: 'Student sign in',
    studentSignInBody: 'Browse projects and manage your applications.',
    createStudent: 'Create student account',
    createStudentBody: 'Set up your school profile and start applying to projects.',
    fallbackErr: 'Unable to sign in.',
  },
  fr: {
    eyebrow: 'Connexion entreprise',
    h1: 'Retour à votre espace. Projets et candidats vous attendent.',
    intro: 'Connectez-vous pour gérer les mandats actifs, examiner les candidats et répondre — tout au même endroit.',
    enterCreds: 'Entrez vos identifiants ci-dessous',
    accessEyebrow: 'Accès entreprise',
    accessTitle: 'Connectez-vous à votre compte',
    emailLabel: 'Courriel professionnel',
    emailPh: 'vous@entreprise.com',
    passwordLabel: 'Mot de passe',
    passwordPh: 'Votre mot de passe',
    signInError: 'Erreur de connexion',
    signingIn: 'Connexion…',
    fallbackLabel: 'Continuer vers l’espace entreprise',
    noAccount: 'Pas encore de compte ?',
    createOne: 'Créez-en un ici',
    demoLabel: 'Identifiants démo',
    demoBody: 'Servez-vous de ça pour explorer l’espace entreprise complet — tableau, projets, candidats et messages.',
    otherEyebrow: 'Autres options',
    notCompany: 'Pas une entreprise ?',
    createCompany: 'Créer un compte entreprise',
    createCompanyBody: 'Configurez votre profil et publiez votre premier mandat.',
    studentSignIn: 'Connexion étudiant',
    studentSignInBody: 'Explore les projets et gère tes candidatures.',
    createStudent: 'Créer un compte étudiant',
    createStudentBody: 'Configure ton profil scolaire et commence à postuler.',
    fallbackErr: 'Impossible de se connecter.',
  },
}

function CompanyLoginPage({ onSignIn, actionLabel }: CompanyLoginPageProps) {
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '1.5rem 0 0', color: 'var(--brand-orange)', fontWeight: 700, fontSize: '0.9rem' }}>
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
          {t.enterCreds}
        </div>
      </section>

      <section className="section-block portal-two-column">
        <article className="panel-card" style={{ border: '2px solid var(--brand-orange)', boxShadow: '0 4px 24px rgba(247,148,29,0.08)' }}>
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
                await onSignIn({ email, name: '', companyName: '', password })
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
              <a href={routeHref('/companies/create-account')} style={{ color: 'var(--brand-orange)', fontWeight: 700 }}>
                {t.createOne}
              </a>
            </p>
          </form>
        </article>

        <div className="story-stack">
          <article className="info-card tone-orange">
            <span className="mini-label">{t.demoLabel}</span>
            <strong>team@northline.io</strong>
            <p>{lang === 'fr' ? 'Mot de passe' : 'Password'}: <strong>clee12345</strong></p>
            <p style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>{t.demoBody}</p>
          </article>

          <article className="panel-card">
            <div className="section-heading" style={{ marginBottom: '1rem' }}>
              <div>
                <p className="eyebrow">{t.otherEyebrow}</p>
                <h2>{t.notCompany}</h2>
              </div>
            </div>
            <div className="list-stack">
              <a className="list-card" href={routeHref('/companies/create-account')}>
                <div>
                  <strong>{t.createCompany}</strong>
                  <p>{t.createCompanyBody}</p>
                </div>
              </a>
              <a className="list-card" href={routeHref('/students/sign-in')}>
                <div>
                  <strong>{t.studentSignIn}</strong>
                  <p>{t.studentSignInBody}</p>
                </div>
              </a>
              <a className="list-card" href={routeHref('/students/create-account')}>
                <div>
                  <strong>{t.createStudent}</strong>
                  <p>{t.createStudentBody}</p>
                </div>
              </a>
            </div>
          </article>
        </div>
      </section>
    </>
  )
}

export default CompanyLoginPage
