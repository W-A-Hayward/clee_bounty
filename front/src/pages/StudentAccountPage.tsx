import { useState } from 'react'
import { useLang } from '../i18n/LanguageContext'
import type { MemberAuthPayload } from '../lib/demoSession'
import { routeHref } from '../lib/hashRouter'

type StudentAccountPageProps = {
  onCreateAccount: (payload: MemberAuthPayload) => Promise<void>
}

const copy = {
  en: {
    eyebrow: 'Join as a student',
    h1: 'Create your account and start applying to real projects.',
    intro: 'Takes about two minutes. Fill in the form below, companies will see your profile when you apply to a brief.',
    fillIn: 'Fill in the form below',
    detailsEyebrow: 'Your details',
    detailsTitle: 'Student profile basics',
    fullName: 'Full name',
    schoolEmail: 'School email',
    school: 'School',
    program: 'Program',
    availability: 'Availability',
    targetRate: 'Target rate',
    portfolio: 'Portfolio URL',
    optional: '(optional)',
    password: 'Password',
    error: 'Error',
    creating: 'Creating account…',
    createBtn: 'Create student account →',
    alreadyAccount: 'Already have an account?',
    signInHere: 'Sign in here',
    whatUnlock: 'What you unlock',
    fullWorkspace: 'A full student workspace',
    workspaceBody: 'Browse projects, apply with a note, track your pipeline, and message companies, all from one place.',
    howItWorks: 'How it works',
    fourSteps: 'Four steps to your first project',
    fallbackErr: 'Unable to create the student account.',
    steps: [
      { step: '01', label: 'Create your profile', desc: 'School, program, rate, and portfolio in two minutes.' },
      { step: '02', label: 'Browse open projects', desc: 'Scoped briefs with budget, timeline, and skill fit.' },
      { step: '03', label: 'Apply with a note', desc: 'Short note explaining your fit. No long cover letter.' },
      { step: '04', label: 'Get matched', desc: 'Companies review your profile and reach out directly.' },
    ],
    placeholders: {
      name: 'Amira Khan',
      email: 'toi@université.ca',
      school: 'Université Concordia',
      program: 'p. ex. Bacc. info, Produit + Design',
      availability: 'p. ex. 12h/semaine',
      rate: 'p. ex. 28$/h',
      portfolio: 'tonnom.design ou github.com/toi',
      password: 'Au moins 8 caractères',
    },
  },
  fr: {
    eyebrow: 'Rejoindre comme étudiant',
    h1: 'Crée ton compte et commence à postuler à de vrais projets.',
    intro: 'Ça prend environ deux minutes. Remplis le formulaire — les entreprises verront ton profil quand tu postules.',
    fillIn: 'Remplis le formulaire ci-dessous',
    detailsEyebrow: 'Tes infos',
    detailsTitle: 'Bases du profil étudiant',
    fullName: 'Nom complet',
    schoolEmail: 'Courriel scolaire',
    school: 'École',
    program: 'Programme',
    availability: 'Disponibilité',
    targetRate: 'Taux cible',
    portfolio: 'Lien portfolio',
    optional: '(optionnel)',
    password: 'Mot de passe',
    error: 'Erreur',
    creating: 'Création du compte…',
    createBtn: 'Créer mon compte étudiant →',
    alreadyAccount: 'Tu as déjà un compte ?',
    signInHere: 'Connecte-toi ici',
    whatUnlock: 'Ce que tu débloques',
    fullWorkspace: 'Un atelier étudiant complet',
    workspaceBody: 'Explore des projets, postule avec une note, suis ton pipeline et messages les entreprises — tout au même endroit.',
    howItWorks: 'Comment ça marche',
    fourSteps: 'Quatre étapes vers ton premier projet',
    fallbackErr: 'Impossible de créer le compte étudiant.',
    steps: [
      { step: '01', label: 'Crée ton profil', desc: 'École, programme, taux et portfolio en deux minutes.' },
      { step: '02', label: 'Explore les projets ouverts', desc: 'Mandats bien définis avec budget, échéance et fit de compétences.' },
      { step: '03', label: 'Postule avec une note', desc: 'Courte note expliquant ton fit. Pas de longue lettre de motivation.' },
      { step: '04', label: 'Sois matchée', desc: 'Les entreprises examinent ton profil et te contactent directement.' },
    ],
    placeholders: {
      name: 'Amira Khan',
      email: 'toi@université.ca',
      school: 'Université Concordia',
      program: 'p. ex. Bacc. info, Produit + Design',
      availability: 'p. ex. 12h/semaine',
      rate: 'p. ex. 28$/h',
      portfolio: 'tonnom.design ou github.com/toi',
      password: 'Au moins 8 caractères',
    },
  },
}

function StudentAccountPage({ onCreateAccount }: StudentAccountPageProps) {
  const lang = useLang()
  const t = copy[lang]
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [school, setSchool] = useState('')
  const [program, setProgram] = useState('')
  const [portfolioUrl, setPortfolioUrl] = useState('')
  const [availability, setAvailability] = useState('')
  const [rate, setRate] = useState('')
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '1.5rem 0 0', color: 'var(--brand-green)', fontWeight: 700, fontSize: '0.9rem' }}>
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
          {t.fillIn}
        </div>
      </section>

      <section className="section-block portal-two-column">
        <article className="panel-card" style={{ border: '2px solid var(--brand-green)', boxShadow: '0 4px 24px rgba(140,198,63,0.10)' }}>
          <div className="section-heading" style={{ marginBottom: '1.25rem' }}>
            <div>
              <p className="eyebrow">{t.detailsEyebrow}</p>
              <h2>{t.detailsTitle}</h2>
            </div>
          </div>

          <form
            className="form-grid"
            onSubmit={async (event) => {
              event.preventDefault()
              setErrorMessage('')
              setIsSubmitting(true)
              try {
                await onCreateAccount({
                  name,
                  email,
                  password,
                  school,
                  program,
                  portfolioUrl: portfolioUrl || 'portfolio.example',
                  availability: availability || '10h/week',
                  rate: rate || '$25/hr',
                })
              } catch (error) {
                setErrorMessage(error instanceof Error ? error.message : t.fallbackErr)
              } finally {
                setIsSubmitting(false)
              }
            }}
          >
            <div className="field-row">
              <label className="field-shell">
                <span className="mini-label">{t.fullName}</span>
                <input onChange={(e) => setName(e.target.value)} placeholder={t.placeholders.name} required value={name} />
              </label>
              <label className="field-shell">
                <span className="mini-label">{t.schoolEmail}</span>
                <input onChange={(e) => setEmail(e.target.value)} placeholder={t.placeholders.email} required type="email" value={email} />
              </label>
            </div>

            <div className="field-row">
              <label className="field-shell">
                <span className="mini-label">{t.school}</span>
                <input onChange={(e) => setSchool(e.target.value)} placeholder={t.placeholders.school} required value={school} />
              </label>
              <label className="field-shell">
                <span className="mini-label">{t.program}</span>
                <input onChange={(e) => setProgram(e.target.value)} placeholder={t.placeholders.program} required value={program} />
              </label>
            </div>

            <div className="field-row">
              <label className="field-shell">
                <span className="mini-label">{t.availability}</span>
                <input onChange={(e) => setAvailability(e.target.value)} placeholder={t.placeholders.availability} value={availability} />
              </label>
              <label className="field-shell">
                <span className="mini-label">{t.targetRate}</span>
                <input onChange={(e) => setRate(e.target.value)} placeholder={t.placeholders.rate} value={rate} />
              </label>
            </div>

            <label className="field-shell">
              <span className="mini-label">
                {t.portfolio}{' '}
                <span style={{ color: 'var(--ink-soft)', fontWeight: 400 }}>{t.optional}</span>
              </span>
              <input onChange={(e) => setPortfolioUrl(e.target.value)} placeholder={t.placeholders.portfolio} value={portfolioUrl} />
            </label>

            <label className="field-shell">
              <span className="mini-label">{t.password}</span>
              <input onChange={(e) => setPassword(e.target.value)} placeholder={t.placeholders.password} required type="password" value={password} />
            </label>

            {errorMessage ? (
              <article className="info-card tone-red">
                <span className="mini-label">{t.error}</span>
                <strong>{errorMessage}</strong>
              </article>
            ) : null}

            <button className="button button-primary" disabled={isSubmitting} style={{ marginTop: '0.25rem' }} type="submit">
              {isSubmitting ? t.creating : t.createBtn}
            </button>

            <p style={{ margin: '0.25rem 0 0', fontSize: '0.82rem', color: 'var(--ink-soft)', textAlign: 'center' }}>
              {t.alreadyAccount}{' '}
              <a href={routeHref('/students/sign-in')} style={{ color: 'var(--brand-blue)', fontWeight: 700 }}>
                {t.signInHere}
              </a>
            </p>
          </form>
        </article>

        <div className="story-stack">
          <article className="info-card tone-green">
            <span className="mini-label">{t.whatUnlock}</span>
            <strong>{t.fullWorkspace}</strong>
            <p>{t.workspaceBody}</p>
          </article>

          <article className="panel-card">
            <div className="section-heading" style={{ marginBottom: '1rem' }}>
              <div>
                <p className="eyebrow">{t.howItWorks}</p>
                <h2>{t.fourSteps}</h2>
              </div>
            </div>
            <div className="list-stack">
              {t.steps.map(({ step, label, desc }) => (
                <article key={step} className="list-card">
                  <span style={{ fontFamily: 'Fraunces, serif', fontSize: '1.4rem', fontWeight: 700, color: 'var(--brand-green)', lineHeight: 1, minWidth: '2rem' }}>
                    {step}
                  </span>
                  <div>
                    <strong>{label}</strong>
                    <p>{desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </article>
        </div>
      </section>
    </>
  )
}

export default StudentAccountPage
