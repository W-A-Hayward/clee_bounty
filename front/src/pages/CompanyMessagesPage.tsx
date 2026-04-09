import { useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import type { ApiCompanyMessageThread } from '../lib/demoPlatform'
import type { CompanySession } from '../lib/demoSession'
import type { DemoCompanyProject } from '../lib/demoPlatform'

type CompanyMessagesPageProps = {
  session: CompanySession
  projects: DemoCompanyProject[]
  messages: ApiCompanyMessageThread[]
}

function CompanyMessagesPage({ session, messages }: CompanyMessagesPageProps) {
  const [activeMessageId, setActiveMessageId] = useState(messages[0]?.id ?? '')
  const activeMessage = messages.find((m) => m.id === activeMessageId) ?? messages[0]
  const [replyText, setReplyText] = useState('')
  const [threadMessages, setThreadMessages] = useState<Record<string, string[]>>(
    Object.fromEntries(messages.map((m) => [m.id, m.thread])),
  )

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
            eyebrow="Company messages"
            title="Conversations with applicants, linked to each project."
            description="Keep candidate communication inside the platform so review decisions and project context stay connected."
          />
        </section>
        <section className="section-block">
          <article className="panel-card" style={{ textAlign: 'center', padding: '2.5rem 2rem' }}>
            <p className="eyebrow">No messages yet</p>
            <h2 style={{ margin: '0.5rem 0 0.75rem' }}>Conversations will appear once students apply.</h2>
            <p style={{ color: 'var(--ink-soft)', maxWidth: '30rem', margin: '0 auto 1.5rem' }}>
              When students submit applications to your live briefs, a message thread opens here so you can reply, share context, and advance the hiring process.
            </p>
            <a className="button button-primary" href="#/company/post-project">
              Post a project
            </a>
          </article>
        </section>
      </>
    )
  }

  return (
    <>
      <section className="section-block portal-section-tight">
        <SectionHeading
          eyebrow="Company messages"
          title="Conversations with applicants, linked to each project."
          description="Keep candidate communication inside the platform so review decisions and project context stay connected."
        />
      </section>

      <section className="section-block portal-two-column">
        <article className="panel-card">
          <div className="card-topline">
            <span className="mini-label">Conversations</span>
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
                  <span className="mini-label">Reply as {session.name}</span>
                  <textarea
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder={`Message ${activeMessage.studentName}…`}
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
                  Send message
                </button>
              </div>
            </>
          ) : (
            <p className="page-intro">Select a conversation to open the thread.</p>
          )}
        </article>
      </section>

      <section className="section-block portal-two-column">
        <article className="panel-card">
          <SectionHeading
            eyebrow="Messaging tips"
            title="Fast replies keep the best candidates engaged."
            description="The average shortlist decision happens within 48 hours of first message on the top-performing briefs."
          />

          <div className="list-stack">
            {[
              'Respond within 24–48 hours to maintain candidate interest',
              'Be specific about next steps — vague replies cause drop-off',
              'Use this thread to share brief details, milestone notes, and feedback',
              'Keep all project communication inside the platform for clearer records',
            ].map((tip) => (
              <article key={tip} className="list-card">
                <strong>{tip}</strong>
              </article>
            ))}
          </div>
        </article>

        <article className="panel-card">
          <SectionHeading
            eyebrow="Message health"
            title="Unread and pending replies at a glance."
          />

          <div className="list-stack">
            <article className="metric-card tone-blue">
              <strong>{messages.reduce((sum, m) => sum + m.unread, 0)}</strong>
              <div>
                <span>unread messages</span>
                <p>Applicants waiting on a reply from the company side.</p>
              </div>
            </article>
            <article className="metric-card tone-green">
              <strong>{messages.length}</strong>
              <div>
                <span>active threads</span>
                <p>Conversations already in progress across your projects.</p>
              </div>
            </article>
          </div>
        </article>
      </section>
    </>
  )
}

export default CompanyMessagesPage
