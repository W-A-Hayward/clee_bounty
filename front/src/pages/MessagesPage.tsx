import { useEffect, useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import type { StudentMessage, StudentProject } from '../data/studentPortal'
import { pick, useLang } from '../i18n/LanguageContext'
import type { DemoApplicationResult } from '../lib/demoPlatform'
import { routeHref } from '../lib/hashRouter'

type MessagesPageProps = {
  messages: Array<StudentMessage & { project?: StudentProject }>
  onReply?: (messageId: string, text: string) => Promise<DemoApplicationResult>
}

const copy = {
  en: {
    eyebrow: 'Messages',
    title: 'All your project conversations in one inbox.',
    desc: 'Replies stay linked to the project brief so context never gets lost across email threads.',
    noneYet: 'No messages yet',
    applyToStart: 'Apply to a project to start a conversation.',
    noneBody: 'When a company responds to your application, the conversation will appear here, linked to the project brief.',
    browseOpen: 'Browse open projects →',
    conversations: 'Conversations',
    reply: 'Reply',
    sending: 'Sending…',
    sendReply: 'Send reply',
    selectThread: 'Select a conversation to open the thread.',
    youPrefix: 'You',
    placeholder: (company: string) => `Message ${company}…`,
  },
  fr: {
    eyebrow: 'Messages',
    title: 'Toutes tes conversations de projets dans une seule boîte.',
    desc: 'Les réponses restent liées au mandat — le contexte ne se perd jamais dans des fils de courriels.',
    noneYet: 'Aucun message pour l’instant',
    applyToStart: 'Postule à un projet pour démarrer une conversation.',
    noneBody: 'Quand une entreprise répond à ta candidature, la conversation apparaît ici, liée au mandat.',
    browseOpen: 'Voir les projets ouverts →',
    conversations: 'Conversations',
    reply: 'Réponse',
    sending: 'Envoi…',
    sendReply: 'Envoyer',
    selectThread: 'Sélectionne une conversation pour ouvrir le fil.',
    youPrefix: 'Toi',
    placeholder: (company: string) => `Écrire à ${company}…`,
  },
}

function MessagesPage({ messages, onReply }: MessagesPageProps) {
  const lang = useLang()
  const t = copy[lang]
  const [activeMessageId, setActiveMessageId] = useState(messages[0]?.id ?? '')
  const [replyText, setReplyText] = useState('')
  const [localThreads, setLocalThreads] = useState<Record<string, string[]>>({})
  const [sending, setSending] = useState(false)

  useEffect(() => {
    setLocalThreads((prev) => {
      const next: Record<string, string[]> = { ...prev }
      for (const message of messages) {
        if (!next[message.id]) {
          next[message.id] = message.thread.map((entry) => pick(entry, lang))
        }
      }
      return next
    })

    if (messages.length > 0 && !messages.some((message) => message.id === activeMessageId)) {
      setActiveMessageId(messages[0].id)
    }
  }, [messages, activeMessageId, lang])

  const activeMessage = messages.find((message) => message.id === activeMessageId) ?? messages[0]
  const currentThread = localThreads[activeMessageId] ?? activeMessage?.thread.map((entry) => pick(entry, lang)) ?? []

  const handleSend = async () => {
    if (!replyText.trim() || !activeMessageId) return
    const text = replyText.trim()
    setReplyText('')
    setSending(true)
    setLocalThreads((prev) => ({
      ...prev,
      [activeMessageId]: [...(prev[activeMessageId] ?? []), `${t.youPrefix}: ${text}`],
    }))
    if (onReply) {
      await onReply(activeMessageId, text)
    }
    setSending(false)
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

      {messages.length === 0 ? (
        <section className="section-block">
          <article className="panel-card" style={{ textAlign: 'center', padding: '2.5rem 2rem' }}>
            <p className="eyebrow">{t.noneYet}</p>
            <h2 style={{ margin: '0.5rem 0 0.75rem' }}>{t.applyToStart}</h2>
            <p style={{ color: 'var(--ink-soft)', maxWidth: '28rem', margin: '0 auto 1.5rem' }}>{t.noneBody}</p>
            <a className="button button-primary" href={routeHref('/projects')}>
              {t.browseOpen}
            </a>
          </article>
        </section>
      ) : (
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
                    <strong>{message.company}</strong>
                    <p>{pick(message.preview, lang)}</p>
                  </div>
                  <div className="status-column">
                    <small>{pick(message.lastActive, lang)}</small>
                    {message.unread > 0 ? <span className="message-count">{message.unread}</span> : null}
                  </div>
                </button>
              ))}
            </div>
          </article>

          <article className="panel-card">
            {activeMessage ? (
              <>
                <div className="card-topline">
                  <span className="mini-label">{activeMessage.company}</span>
                  {activeMessage.project ? (
                    <span className="status-pill status-live">{pick(activeMessage.project.title, lang)}</span>
                  ) : null}
                </div>

                <div className="thread-stack">
                  {currentThread.map((item, index) => (
                    <article key={index} className="thread-bubble">
                      {item}
                    </article>
                  ))}
                </div>

                {onReply && (
                  <div className="form-grid" style={{ marginTop: '0.5rem' }}>
                    <label className="field-shell">
                      <span className="mini-label">{t.reply}</span>
                      <textarea
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder={t.placeholder(activeMessage.company)}
                        rows={3}
                        value={replyText}
                      />
                    </label>
                    <button
                      className="button button-primary"
                      disabled={!replyText.trim() || sending}
                      onClick={() => void handleSend()}
                      type="button"
                    >
                      {sending ? t.sending : t.sendReply}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p className="page-intro">{t.selectThread}</p>
            )}
          </article>
        </section>
      )}
    </>
  )
}

export default MessagesPage
