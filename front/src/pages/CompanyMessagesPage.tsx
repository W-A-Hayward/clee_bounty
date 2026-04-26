import { useEffect, useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import { useLang } from '../i18n/LanguageContext'
import type { ApiCompanyMessageThread } from '../lib/demoPlatform'
import type { CompanySession } from '../lib/demoSession'
import type { DemoCompanyProject } from '../lib/demoPlatform'

type CompanyMessagesPageProps = {
  session: CompanySession
  projects: DemoCompanyProject[]
  messages: ApiCompanyMessageThread[]
}

const copy = {
  en: {
    eyebrow: 'Company messages',
    title: 'Conversations with applicants, linked to each project.',
    desc: 'Keep candidate communication inside the platform so review decisions and project context stay connected.',
    noneYet: 'No messages yet',
    noneBody: 'Once students apply to your projects, conversation threads will appear here.',
    conversations: 'Conversations',
    replyAs: (name: string) => `Reply as ${name}`,
    placeholder: (name: string) => `Message ${name}…`,
    sendMessage: 'Send message',
    selectThread: 'Select a conversation to open the thread.',
    tipsEyebrow: 'Messaging tips',
    tipsTitle: 'Fast replies keep the best candidates engaged.',
    tipsDesc: 'The average shortlist decision happens within 48 hours of first message on the top-performing briefs.',
    tips: [
      'Respond within 24–48 hours to maintain candidate interest',
      'Be specific about next steps, vague replies cause drop-off',
      'Use this thread to share brief details, milestone notes, and feedback',
      'Keep all project communication inside the platform for clearer records',
    ],
    healthEyebrow: 'Message health',
    healthTitle: 'Unread and pending replies at a glance.',
    unread: 'unread messages',
    unreadBody: 'Applicants waiting on a reply from the company side.',
    activeThreads: 'active threads',
    activeBody: 'Conversations already in progress across your projects.',
  },
  fr: {
    eyebrow: 'Messages entreprise',
    title: 'Conversations avec les candidats, liées à chaque projet.',
    desc: 'Gardez la communication candidat dans la plateforme pour que décisions de revue et contexte projet restent connectés.',
    noneYet: 'Aucun message pour l’instant',
    noneBody: 'Une fois que des étudiants postulent à vos projets, les fils de conversation apparaîtront ici.',
    conversations: 'Conversations',
    replyAs: (name: string) => `Répondre comme ${name}`,
    placeholder: (name: string) => `Écrire à ${name}…`,
    sendMessage: 'Envoyer le message',
    selectThread: 'Sélectionnez une conversation pour ouvrir le fil.',
    tipsEyebrow: 'Conseils de messagerie',
    tipsTitle: 'Des réponses rapides gardent les meilleurs candidats engagés.',
    tipsDesc: 'La décision shortlist moyenne se prend dans les 48 heures du premier message sur les mandats les plus performants.',
    tips: [
      'Répondez en 24–48 heures pour maintenir l’intérêt du candidat',
      'Soyez précis sur les prochaines étapes — les réponses floues causent du décrochage',
      'Servez-vous de ce fil pour partager détails, notes d’étapes et feedback',
      'Gardez toute communication projet dans la plateforme pour des dossiers plus clairs',
    ],
    healthEyebrow: 'Santé des messages',
    healthTitle: 'Non lus et réponses en attente d’un coup d’œil.',
    unread: 'messages non lus',
    unreadBody: 'Candidats en attente d’une réponse du côté entreprise.',
    activeThreads: 'fils actifs',
    activeBody: 'Conversations déjà en cours sur vos projets.',
  },
}

function CompanyMessagesPage({ session, messages }: CompanyMessagesPageProps) {
  const lang = useLang()
  const t = copy[lang]
  const [activeMessageId, setActiveMessageId] = useState(messages[0]?.id ?? '')
  const [replyText, setReplyText] = useState('')
  const [threadMessages, setThreadMessages] = useState<Record<string, string[]>>({})

  useEffect(() => {
    setThreadMessages((prev) => {
      const next: Record<string, string[]> = { ...prev }
      for (const message of messages) {
        if (!next[message.id]) {
          next[message.id] = message.thread
        }
      }
      return next
    })

    if (messages.length > 0 && !messages.some((message) => message.id === activeMessageId)) {
      setActiveMessageId(messages[0].id)
    }
  }, [messages, activeMessageId])

  const activeMessage = messages.find((m) => m.id === activeMessageId) ?? messages[0]
  const currentThread = threadMessages[activeMessageId] ?? activeMessage?.thread ?? []

  const handleSend = () => {
    if (!replyText.trim() || !activeMessageId) return
    setThreadMessages((prev) => ({
      ...prev,
      [activeMessageId]: [...(prev[activeMessageId] ?? []), `${session.name}: ${replyText.trim()}`],
    }))
    setReplyText('')
  }

  if (messages.length === 0) {
    return (
      <>
        <section className="section-block portal-section-tight">
          <SectionHeading
            eyebrow={t.eyebrow}
            title={t.title}
            description={t.desc}
          />
        </section>
        <section className="section-block">
          <article className="panel-card">
            <p className="eyebrow">{t.noneYet}</p>
            <p>{t.noneBody}</p>
          </article>
        </section>
      </>
    )
  }

  return (
    <>
      <section className="section-block portal-section-tight">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={t.title}
          description={t.desc}
        />
      </section>

      <section className="section-block portal-two-column">
        <article className="panel-card">
          <div className="card-topline">
            <span className="mini-label">{t.conversations}</span>
            <span className="status-pill status-live">{messages.length}</span>
          </div>

          <div className="list-stack">
            {messages.map((message) => (
              <button
                key={message.id}
                className={`message-preview${message.id === activeMessage?.id ? ' is-active' : ''}`}
                onClick={() => setActiveMessageId(message.id)}
                type="button"
              >
                <div>
                  <strong>{message.studentName}</strong>
                  <p style={{ margin: '0.2rem 0 0.15rem', fontSize: '0.82rem', color: 'var(--ink-soft)', fontWeight: 700 }}>
                    {message.projectSlug.replace(/-/g, ' ').split(' ').slice(0, 5).join(' ')}…
                  </p>
                  <p>{message.preview}</p>
                </div>
                <div className="status-column">
                  <small>{message.lastActive}</small>
                  {message.unread > 0 ? (
                    <span className="message-count">{message.unread}</span>
                  ) : null}
                </div>
              </button>
            ))}
          </div>
        </article>

        <article className="panel-card">
          {activeMessage ? (
            <>
              <div className="card-topline">
                <span className="mini-label">{activeMessage.studentName}</span>
                <span className="status-pill status-live">
                  {activeMessage.projectSlug.replace(/-/g, ' ')}
                </span>
              </div>

              <div className="thread-stack">
                {currentThread.map((item, index) => (
                  <article
                    key={index}
                    className="thread-bubble"
                    style={
                      item.startsWith(`${session.name}:`)
                        ? { background: 'rgba(31, 95, 175, 0.08)', borderColor: 'rgba(31, 95, 175, 0.18)' }
                        : undefined
                    }
                  >
                    {item}
                  </article>
                ))}
              </div>

              <div className="form-grid" style={{ marginTop: '0.5rem' }}>
                <label className="field-shell">
                  <span className="mini-label">{t.replyAs(session.name)}</span>
                  <textarea
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder={t.placeholder(activeMessage.studentName)}
                    rows={3}
                    value={replyText}
                  />
                </label>
                <button
                  className="button button-primary"
                  disabled={!replyText.trim()}
                  onClick={handleSend}
                  type="button"
                >
                  {t.sendMessage}
                </button>
              </div>
            </>
          ) : (
            <p className="page-intro">{t.selectThread}</p>
          )}
        </article>
      </section>

      <section className="section-block portal-two-column">
        <article className="panel-card">
          <SectionHeading
            eyebrow={t.tipsEyebrow}
            title={t.tipsTitle}
            description={t.tipsDesc}
          />

          <div className="list-stack">
            {t.tips.map((tip) => (
              <article key={tip} className="list-card">
                <strong>{tip}</strong>
              </article>
            ))}
          </div>
        </article>

        <article className="panel-card">
          <SectionHeading
            eyebrow={t.healthEyebrow}
            title={t.healthTitle}
          />

          <div className="list-stack">
            <article className="metric-card tone-blue" style={{ border: '1px solid var(--line)', borderRadius: '1rem', padding: '1rem' }}>
              <strong>{messages.reduce((sum, m) => sum + m.unread, 0)}</strong>
              <div>
                <span>{t.unread}</span>
                <p>{t.unreadBody}</p>
              </div>
            </article>
            <article className="metric-card tone-green" style={{ border: '1px solid var(--line)', borderRadius: '1rem', padding: '1rem' }}>
              <strong>{messages.length}</strong>
              <div>
                <span>{t.activeThreads}</span>
                <p>{t.activeBody}</p>
              </div>
            </article>
          </div>
        </article>
      </section>
    </>
  )
}

export default CompanyMessagesPage
