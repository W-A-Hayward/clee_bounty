import { useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import type { StudentMessage, StudentProject } from '../data/studentPortal'

type MessagesPageProps = {
  messages: Array<StudentMessage & { project?: StudentProject }>
}

function MessagesPage({ messages }: MessagesPageProps) {
  const [activeMessageId, setActiveMessageId] = useState(messages[0]?.id ?? '')
  const activeMessage = messages.find((message) => message.id === activeMessageId) ?? messages[0]

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
                {activeMessage.thread.map((item) => (
                  <article key={item} className="thread-bubble">
                    {item}
                  </article>
                ))}
              </div>
            </>
          ) : null}
        </article>
      </section>
    </>
  )
}

export default MessagesPage
