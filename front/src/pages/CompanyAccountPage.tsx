import { useState } from 'react'
import { useLang } from '../i18n/LanguageContext'
import type { CompanyAuthPayload } from '../lib/demoSession'
import { routeHref } from '../lib/hashRouter'

type CompanyAccountPageProps = {
  onCreateAccount: (payload: CompanyAuthPayload) => Promise<void>
}

const copy = {
  en: {
    eyebrow: 'Join as a company',
    h1: 'Create your account and start posting scoped projects.',
    intro: 'Set up your company profile in a few minutes. Students will see this when they review your briefs.',
    fillIn: 'Fill in the form below',
    detailsEyebrow: 'Company details',
    detailsTitle: 'Your company profile',
    yourName: 'Your name',
    companyName: 'Company name',
    workEmail: 'Work email',
    industry: 'Industry',
    location: 'Location',
    website: 'Website',
    optional: '(optional)',
    teamSize: 'Team size',
    password: 'Password',
    description: 'Company description',
    error: 'Error',
    creating: 'Creating account…',
    createBtn: 'Create company account →',
    alreadyAccount: 'Already have an account?',
    signInHere: 'Sign in here',
    whatGet: 'What you get',
    fullWorkspace: 'A full company workspace',
    workspaceBody: 'Post scoped briefs, review applicants, manage your pipeline, and message candidates, all in one place.',
    howItWorks: 'How it works',
    fromAccount: 'From account to first hire',
    fallbackErr: 'Unable to create the company account.',
    steps: [
      { step: '01', label: 'Create your profile', desc: 'Company name, industry, location, and a short description.' },
      { step: '02', label: 'Post a project brief', desc: 'Scope, budget, timeline, and required skills, all in one form.' },
      { step: '03', label: 'Review applicants', desc: 'School-verified candidates with notes and portfolio links.' },
      { step: '04', label: 'Hire and deliver', desc: 'Message candidates, confirm the match, and track milestones.' },
    ],
    placeholders: {
      contactName: 'Leah Martin',
      companyName: 'Northline Systems',
      email: 'you@company.com',
      industry: 'e.g. B2B SaaS',
      location: 'e.g. Montreal / Remote',
      website: 'yourcompany.com',
      teamSize: 'e.g. 10–50 people',
      password: 'At least 8 characters',
      description: "What kind of projects do you post? What's your team like?",
    },
  },
  fr: {
    eyebrow: 'Rejoindre comme entreprise',
    h1: 'Créez votre compte et commencez à publier des projets bien définis.',
    intro: 'Configurez le profil de votre entreprise en quelques minutes. Les étudiants le verront quand ils examineront vos mandats.',
    fillIn: 'Remplissez le formulaire ci-dessous',
    detailsEyebrow: 'Détails entreprise',
    detailsTitle: 'Votre profil d’entreprise',
    yourName: 'Votre nom',
    companyName: 'Nom de l’entreprise',
    workEmail: 'Courriel professionnel',
    industry: 'Secteur',
    location: 'Lieu',
    website: 'Site web',
    optional: '(optionnel)',
    teamSize: 'Taille de l’équipe',
    password: 'Mot de passe',
    description: 'Description de l’entreprise',
    error: 'Erreur',
    creating: 'Création du compte…',
    createBtn: 'Créer le compte entreprise →',
    alreadyAccount: 'Vous avez déjà un compte ?',
    signInHere: 'Connectez-vous ici',
    whatGet: 'Ce que vous obtenez',
    fullWorkspace: 'Un espace entreprise complet',
    workspaceBody: 'Publiez des mandats bien définis, examinez les candidats, gérez votre pipeline et messagez — tout au même endroit.',
    howItWorks: 'Comment ça marche',
    fromAccount: 'Du compte à la première embauche',
    fallbackErr: 'Impossible de créer le compte entreprise.',
    steps: [
      { step: '01', label: 'Créez votre profil', desc: 'Nom, secteur, lieu et courte description.' },
      { step: '02', label: 'Publiez un mandat', desc: 'Scope, budget, échéance et compétences requises — tout dans un formulaire.' },
      { step: '03', label: 'Examinez les candidats', desc: 'Candidats vérifiés par l’école avec notes et liens portfolio.' },
      { step: '04', label: 'Embauchez et livrez', desc: 'Messagez les candidats, confirmez le match, suivez les étapes.' },
    ],
    placeholders: {
      contactName: 'Léa Martin',
      companyName: 'Northline Systems',
      email: 'vous@entreprise.com',
      industry: 'p. ex. SaaS B2B',
      location: 'p. ex. Montréal / À distance',
      website: 'votreentreprise.com',
      teamSize: 'p. ex. 10–50 personnes',
      password: 'Au moins 8 caractères',
      description: 'Quel type de projets publiez-vous ? À quoi ressemble votre équipe ?',
    },
  },
}

function CompanyAccountPage({ onCreateAccount }: CompanyAccountPageProps) {
  const lang = useLang()
  const t = copy[lang]
  const [contactName, setContactName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [workEmail, setWorkEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [industry, setIndustry] = useState('')
  const [location, setLocation] = useState('')
  const [teamSize, setTeamSize] = useState('')
  const [password, setPassword] = useState('')
  const [description, setDescription] = useState('')
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
          {t.fillIn}
        </div>
      </section>

      <section className="section-block portal-two-column">
        <article className="panel-card" style={{ border: '2px solid var(--brand-orange)', boxShadow: '0 4px 24px rgba(247,148,29,0.08)' }}>
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
                  name: contactName,
                  email: workEmail,
                  password,
                  companyName,
                  website: website || 'company.example',
                  industry: industry || 'Technology',
                  location: location || 'Remote',
                  teamSize: teamSize || '1–10 people',
                  description: description || 'A company posting scoped projects for students.',
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
                <span className="mini-label">{t.yourName}</span>
                <input onChange={(e) => setContactName(e.target.value)} placeholder={t.placeholders.contactName} required value={contactName} />
              </label>
              <label className="field-shell">
                <span className="mini-label">{t.companyName}</span>
                <input onChange={(e) => setCompanyName(e.target.value)} placeholder={t.placeholders.companyName} required value={companyName} />
              </label>
            </div>

            <label className="field-shell">
              <span className="mini-label">{t.workEmail}</span>
              <input onChange={(e) => setWorkEmail(e.target.value)} placeholder={t.placeholders.email} required type="email" value={workEmail} />
            </label>

            <div className="field-row">
              <label className="field-shell">
                <span className="mini-label">{t.industry}</span>
                <input onChange={(e) => setIndustry(e.target.value)} placeholder={t.placeholders.industry} value={industry} />
              </label>
              <label className="field-shell">
                <span className="mini-label">{t.location}</span>
                <input onChange={(e) => setLocation(e.target.value)} placeholder={t.placeholders.location} value={location} />
              </label>
            </div>

            <div className="field-row">
              <label className="field-shell">
                <span className="mini-label">{t.website} <span style={{ color: 'var(--ink-soft)', fontWeight: 400 }}>{t.optional}</span></span>
                <input onChange={(e) => setWebsite(e.target.value)} placeholder={t.placeholders.website} value={website} />
              </label>
              <label className="field-shell">
                <span className="mini-label">{t.teamSize} <span style={{ color: 'var(--ink-soft)', fontWeight: 400 }}>{t.optional}</span></span>
                <input onChange={(e) => setTeamSize(e.target.value)} placeholder={t.placeholders.teamSize} value={teamSize} />
              </label>
            </div>

            <label className="field-shell">
              <span className="mini-label">{t.password}</span>
              <input onChange={(e) => setPassword(e.target.value)} placeholder={t.placeholders.password} required type="password" value={password} />
            </label>

            <label className="field-shell">
              <span className="mini-label">{t.description} <span style={{ color: 'var(--ink-soft)', fontWeight: 400 }}>{t.optional}</span></span>
              <textarea onChange={(e) => setDescription(e.target.value)} placeholder={t.placeholders.description} rows={3} value={description} />
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
              <a href={routeHref('/companies/sign-in')} style={{ color: 'var(--brand-orange)', fontWeight: 700 }}>
                {t.signInHere}
              </a>
            </p>
          </form>
        </article>

        <div className="story-stack">
          <article className="info-card tone-orange">
            <span className="mini-label">{t.whatGet}</span>
            <strong>{t.fullWorkspace}</strong>
            <p>{t.workspaceBody}</p>
          </article>

          <article className="panel-card">
            <div className="section-heading" style={{ marginBottom: '1rem' }}>
              <div>
                <p className="eyebrow">{t.howItWorks}</p>
                <h2>{t.fromAccount}</h2>
              </div>
            </div>
            <div className="list-stack">
              {t.steps.map(({ step, label, desc }) => (
                <article key={step} className="list-card">
                  <span style={{ fontFamily: 'Fraunces, serif', fontSize: '1.4rem', fontWeight: 700, color: 'var(--brand-orange)', lineHeight: 1, minWidth: '2rem' }}>
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

export default CompanyAccountPage
