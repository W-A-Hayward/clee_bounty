import { useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import type { StudentMessage, StudentProject } from '../data/studentPortal'
import type { DemoApplicationResult } from '../lib/demoPlatform'
import { routeHref } from '../lib/hashRouter'

type MessagesPageProps = {
  messages: Array<StudentMessage & { project?: StudentProject }>
  onReply?: (messageId: string, text: string) => Promise<DemoApplicationResult>
}

function MessagesPage({ messages, onReply }: MessagesPageProps) {
  const [activeMessageId, setActiveMessageId] = useState(messages[0]?.id ?? '')
  const activeMessage = messages.find((message) => message.id === activeMessageId) ?? messages[0]
  const [replyText, setReplyText] = useState('')
  const [localThreads, setLocalThreads] = useState<Record<string, string[]>>(
    Object.fromEntries(messages.map((m) => [m.id, m.thread])),
  )
  const [sending, setSending] = useState(false)

  const currentThread = localThreads[activeMessageId] ?? activeMessage?.thread ?? []

  const handleSend = async () => {
    if (!replyText.trim() || !activeMessageId) return
    const text = replyText.trim()
    setReplyText('')
    setSending(true)
    setLocalThreads((prev) => ({
      ...prev,
      [activeMessageId]: [...(prev[activeMessageId] ?? []), `You: ${text}`],
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
          eyebrow="Messages"
          title="All your project conversations in one inbox."
          description="Replies stay linked to the project brief so context never gets lost across email threads."
        />
      </section>

      {messages.length === 0 ? (
        <section className="section-block">
          <article className="panel-card" style={{ textAlign: 'center', padding: '2.5rem 2rem' }}>
            <p className="eyebrow">No messages yet</p>
            <h2 style={{ margin: '0.5rem 0 0.75rem' }}>Apply to a project to start a conversation.</h2>
            <p style={{ color: 'var(--ink-soft)', maxWidth: '28rem', margin: '0 auto 1.5rem' }}>
              When a company responds to your application, the conversation will appear here — linked to the project brief.
            </p>
            <a className="button button-primary" href={routeHref('/projects')}>
              Browse open projects →
            </a>
          </article>
        </section>
      ) : (
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
                    <strong>{message.company}</strong>
                    <p>{message.preview}</p>
                  </div>
                  <div className="status-column">
                    <small>{message.lastActive}</small>
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
                  {activeMessage.project?.title ? (
                    <span className="status-pill status-live">{activeMessage.project.title}</span>
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
                      <span className="mini-label">Reply</span>
                      <textarea
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder={`Message ${activeMessage.company}…`}
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
                      {sending ? 'Sending…' : 'Send reply'}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p className="page-intro">Select a conversation to open the thread.</p>
            )}
          </article>
        </section>
      )}
    </>
  )
}

export default MessagesPage
