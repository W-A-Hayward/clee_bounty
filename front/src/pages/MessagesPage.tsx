import { useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import type { StudentMessage, StudentProject } from '../data/studentPortal'
import type { DemoApplicationResult } from '../lib/demoPlatform'

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
          title="Project-linked conversations stay inside the workspace."
          description="The inbox stays attached to the work so companies and students keep the same context."
        />
      </section>

      <section className="section-block portal-two-column">
        <article className="panel-card">
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
                <span className="status-pill status-live">{activeMessage.project?.title}</span>
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
          ) : null}
        </article>
      </section>
    </>
  )
}

export default MessagesPage
