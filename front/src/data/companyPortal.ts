export type { Bilingual, T18n } from '../i18n/LanguageContext'
import type { Bilingual, T18n } from '../i18n/LanguageContext'

export type CompanyProject = {
  id: string
  title: T18n<string>
  status: 'draft' | 'open' | 'in_review' | 'matched' | 'in_progress'
  statusLabel: T18n<string>
  applicants: number
  shortlisted: number
  budget: string
  workMode: T18n<string>
  projectType: T18n<string>
  experienceLevel: T18n<string>
  deadlineLabel: T18n<string>
  owner: string
  summary: T18n<string>
  requiredSkills: string[]
  nextStep: T18n<string>
  tone: 'tone-blue' | 'tone-green' | 'tone-orange' | 'tone-red'
}

export const companyProfile = {
  companyName: 'Northline Systems',
  website: 'northline.io',
  industry: { en: 'B2B SaaS', fr: 'SaaS B2B' } as Bilingual<string>,
  location: { en: 'Montreal / Remote team', fr: 'Montréal / Équipe à distance' } as Bilingual<string>,
  teamSize: { en: '42 people', fr: '42 personnes' } as Bilingual<string>,
  verificationStatus: { en: 'Verified company', fr: 'Entreprise vérifiée' } as Bilingual<string>,
  responseTime: { en: 'Average first reply within 36 hours', fr: 'Première réponse moyenne sous 36 heures' } as Bilingual<string>,
  description: {
    en: 'Northline hires students for short, scoped product and operations projects that can plug into an existing roadmap without creating internship overhead.',
    fr: 'Northline embauche des étudiants pour des projets courts et bien définis (produit, opérations) qui s’intègrent à une feuille de route existante sans le surcoût d’un stage.',
  } as Bilingual<string>,
}

const STATUS_LABELS: Record<CompanyProject['status'], Bilingual<string>> = {
  draft: { en: 'Draft', fr: 'Brouillon' },
  open: { en: 'Open', fr: 'Ouvert' },
  in_review: { en: 'In review', fr: 'En revue' },
  matched: { en: 'Matched', fr: 'Matché' },
  in_progress: { en: 'In progress', fr: 'En cours' },
}

export function statusLabel(status: CompanyProject['status']): Bilingual<string> {
  return STATUS_LABELS[status]
}

export const companyProjects: CompanyProject[] = [
  {
    id: 'co-1',
    title: { en: 'Frontend redesign sprint for a fintech dashboard', fr: 'Sprint de refonte frontend pour un tableau fintech' },
    status: 'open',
    statusLabel: STATUS_LABELS.open,
    applicants: 32,
    shortlisted: 8,
    budget: '$3.2k - $4.8k',
    workMode: { en: 'Remote', fr: 'À distance' },
    projectType: { en: 'Freelance sprint', fr: 'Sprint freelance' },
    experienceLevel: { en: 'Intermediate', fr: 'Intermédiaire' },
    deadlineLabel: { en: 'Deadline Mar 21', fr: 'Échéance 21 mars' },
    owner: 'Leah Martin',
    summary: { en: 'Refresh density, patterns, and component consistency before a spring release.', fr: 'Rafraîchir la densité, les patterns et la cohérence des composants avant une sortie au printemps.' },
    requiredSkills: ['React', 'Product UI', 'Accessibility'],
    nextStep: { en: 'First-pass applicant review due tomorrow', fr: 'Première passe de revue des candidats due demain' },
    tone: 'tone-blue',
  },
  {
    id: 'co-2',
    title: { en: 'Growth analytics board for student ambassador campaigns', fr: 'Tableau d’analytique pour campagnes d’ambassadeurs étudiants' },
    status: 'in_review',
    statusLabel: STATUS_LABELS.in_review,
    applicants: 24,
    shortlisted: 5,
    budget: '$1.6k - $2.4k',
    workMode: { en: 'Hybrid', fr: 'Hybride' },
    projectType: { en: 'Analytics engagement', fr: 'Mandat analytique' },
    experienceLevel: { en: 'Intermediate', fr: 'Intermédiaire' },
    deadlineLabel: { en: 'Deadline Mar 18', fr: 'Échéance 18 mars' },
    owner: 'Miles Chen',
    summary: { en: 'Turn campaign data into a clean, repeatable readout for the growth team.', fr: 'Transformer les données de campagne en un rapport propre et répétable pour l’équipe croissance.' },
    requiredSkills: ['SQL', 'Analytics', 'Presentation'],
    nextStep: { en: 'Waiting on final shortlist decision', fr: 'En attente de la décision finale de shortlist' },
    tone: 'tone-green',
  },
  {
    id: 'co-3',
    title: { en: 'Accessibility polish for a healthcare onboarding flow', fr: 'Polissage accessibilité pour un flux d’onboarding santé' },
    status: 'matched',
    statusLabel: STATUS_LABELS.matched,
    applicants: 19,
    shortlisted: 3,
    budget: '$3.4k - $4.8k',
    workMode: { en: 'Remote', fr: 'À distance' },
    projectType: { en: 'Frontend audit + patch sprint', fr: 'Audit frontend + sprint correctifs' },
    experienceLevel: { en: 'Advanced', fr: 'Avancé' },
    deadlineLabel: { en: 'Matched Mar 7', fr: 'Matché le 7 mars' },
    owner: 'Noor Haddad',
    summary: { en: 'Close accessibility gaps before a broader onboarding rollout begins.', fr: 'Combler les écarts d’accessibilité avant le déploiement plus large de l’onboarding.' },
    requiredSkills: ['Accessibility', 'QA', 'React'],
    nextStep: { en: 'Kickoff notes and milestone draft need approval', fr: 'Notes de kickoff et brouillon d’étapes à approuver' },
    tone: 'tone-orange',
  },
]

export const companyNotifications: Bilingual<string>[] = [
  { en: '8 new applicants landed on the fintech redesign sprint.', fr: '8 nouveaux candidats sur le sprint de refonte fintech.' },
  { en: 'One shortlisted candidate accepted an intro call.', fr: 'Un candidat shortlisté a accepté un appel de présentation.' },
  { en: 'Company verification completed and public badge is now visible.', fr: 'Vérification d’entreprise complétée — le badge public est maintenant visible.' },
]

export const applicantSnapshots = [
  {
    name: 'Amira Khan',
    fit: { en: '94% fit', fr: '94% match' } as Bilingual<string>,
    note: { en: 'Strong frontend portfolio and school-verified identity.', fr: 'Portfolio frontend solide et identité scolaire vérifiée.' } as Bilingual<string>,
  },
  {
    name: 'Miles Chen',
    fit: { en: '89% fit', fr: '89% match' } as Bilingual<string>,
    note: { en: 'Great analytics storytelling and strong availability.', fr: 'Excellente narration analytique et bonne disponibilité.' } as Bilingual<string>,
  },
  {
    name: 'Noor Haddad',
    fit: { en: '86% fit', fr: '86% match' } as Bilingual<string>,
    note: { en: 'Accessibility-focused project samples and QA depth.', fr: 'Échantillons de projets axés accessibilité et profondeur QA.' } as Bilingual<string>,
  },
]

export const companyPipelineStages = [
  {
    label: { en: 'New applicants', fr: 'Nouveaux candidats' } as Bilingual<string>,
    value: '18',
    note: { en: 'Need first review before the next deadline closes.', fr: 'À examiner avant la fermeture de la prochaine échéance.' } as Bilingual<string>,
    tone: 'tone-blue' as const,
  },
  {
    label: { en: 'Shortlist calls', fr: 'Appels shortlist' } as Bilingual<string>,
    value: '6',
    note: { en: 'Candidates ready for intro chat or async follow-up.', fr: 'Candidats prêts pour un appel de présentation ou un suivi async.' } as Bilingual<string>,
    tone: 'tone-green' as const,
  },
  {
    label: { en: 'Milestones active', fr: 'Étapes actives' } as Bilingual<string>,
    value: '4',
    note: { en: 'Matched work already moving across deliverables.', fr: 'Mandats matchés déjà en mouvement sur les livrables.' } as Bilingual<string>,
    tone: 'tone-orange' as const,
  },
]

export const companyTeam = [
  {
    name: 'Leah Martin',
    role: { en: 'Company admin', fr: 'Admin entreprise' } as Bilingual<string>,
    note: { en: 'Owns profile, publishing standards, and final hiring decisions.', fr: 'Responsable du profil, des standards de publication et des décisions finales d’embauche.' } as Bilingual<string>,
  },
  {
    name: 'Miles Chen',
    role: { en: 'Growth lead', fr: 'Lead croissance' } as Bilingual<string>,
    note: { en: 'Reviews analytics and campaign-focused applicants.', fr: 'Évalue les candidats axés analytique et campagnes.' } as Bilingual<string>,
  },
  {
    name: 'Noor Haddad',
    role: { en: 'Product designer', fr: 'Designer produit' } as Bilingual<string>,
    note: { en: 'Helps scope design systems and accessibility briefs.', fr: 'Aide à cadrer les mandats design systems et accessibilité.' } as Bilingual<string>,
  },
]

export const companyPublishingChecklist: Bilingual<string>[] = [
  { en: 'Define the real outcome, not just a vague task list', fr: 'Définissez le vrai résultat, pas une liste de tâches floue' },
  { en: 'Include budget, work mode, duration, and decision timing', fr: 'Incluez budget, mode de travail, durée et calendrier de décision' },
  { en: 'State which skills are required versus nice to have', fr: 'Précisez les compétences requises versus souhaitées' },
  { en: 'Explain review cadence and how milestones will be approved', fr: 'Expliquez la cadence de revue et comment les étapes seront approuvées' },
]
