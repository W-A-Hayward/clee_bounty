import { useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import type { CompanySession } from '../lib/demoSession'
import type { DemoCompanyProject } from '../lib/demoPlatform'

type CompanyMessage = {
  id: string
  applicantName: string
  projectId: string
  projectTitle: string
  preview: string
  lastActive: string
  unread: number
  thread: string[]
}

const mockMessages: CompanyMessage[] = [
  {
    id: 'cm-1',
    applicantName: 'Amira Khan',
    projectId: 'co-1',
    projectTitle: 'Frontend redesign sprint for a fintech dashboard',
    preview: 'Yes, Thursday at 3pm works well for me. Looking forward to it.',
    lastActive: '2h ago',
    unread: 1,
    thread: [
      'Hi Amira, thanks for applying. Your UI case studies feel very relevant to what we are trying to do with this dashboard.',
      'Would you be open to a short 20-minute conversation with our product lead this week to talk through your approach?',
      'Yes, Thursday at 3pm works well for me. Looking forward to it.',
    ],
  },
  {
    id: 'cm-2',
    applicantName: 'Miles Chen',
    projectId: 'co-2',
    projectTitle: 'Growth analytics board for student ambassador campaigns',
    preview: 'Here is the sample dashboard I put together last semester. Let me know your thoughts.',
    lastActive: 'Yesterday',
    unread: 0,
    thread: [
      'Hi Miles, we reviewed your application. We really liked the reporting structure you described.',
      'Could you share one example of a dashboard or analytics readout you have put together before?',
      'Here is the sample dashboard I put together last semester. Let me know your thoughts.',
    ],
  },
  {
    id: 'cm-3',
    applicantName: 'Noor Haddad',
    projectId: 'co-3',
    projectTitle: 'Accessibility polish for a healthcare onboarding flow',
    preview: 'Just sent over the accessibility review log. Let me know if you need anything else before kickoff.',
    lastActive: '3 days ago',
    unread: 0,
    thread: [
      'Welcome to the project, Noor. We are excited to move into kickoff.',
      'The first milestone is the accessibility review log by Mar 16. Does that timeline still work for you?',
      'Yes, that works. I already have an initial pass ready to share.',
      'Just sent over the accessibility review log. Let me know if you need anything else before kickoff.',
    ],
  },
  {
    id: 'cm-4',
    applicantName: 'Priya Sharma',
    projectId: 'co-2',
    projectTitle: 'Growth analytics board for student ambassador campaigns',
    preview: 'I have worked with similar channel attribution setups. Happy to walk you through my approach.',
    lastActive: '2 days ago',
    unread: 2,
    thread: [
      'Hi Priya, we shortlisted you for the analytics board project. Nice work on the portfolio samples.',
      'We have one question: have you worked with multi-channel campaign attribution before?',
      'I have worked with similar channel attribution setups. Happy to walk you through my approach.',
    ],
  },
]

type CompanyMessagesPageProps = {
  session: CompanySession
  projects: DemoCompanyProject[]
}

function CompanyMessagesPage({ session, projects }: CompanyMessagesPageProps) {
  const [activeMessageId, setActiveMessageId] = useState(mockMessages[0]?.id ?? '')
  const activeMessage = mockMessages.find((m) => m.id === activeMessageId) ?? mockMessages[0]
  const [replyText, setReplyText] = useState('')
  const [threadMessages, setThreadMessages] = useState<Record<string, string[]>>(
    Object.fromEntries(mockMessages.map((m) => [m.id, m.thread])),
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
            <span className="status-pill status-live">{mockMessages.length}</span>
          </div>

          <div className="list-stack">
            {mockMessages.map((message) => (
              <button
                key={message.id}
                className={`message-preview${message.id === activeMessage?.id ? ' is-active' : ''}`}
                onClick={() => setActiveMessageId(message.id)}
                type="button"
              >
                <div>
                  <strong>{message.applicantName}</strong>
                  <p style={{ margin: '0.2rem 0 0.15rem', fontSize: '0.82rem', color: 'var(--ink-soft)', fontWeight: 700 }}>
                    {message.projectTitle.split(' ').slice(0, 5).join(' ')}…
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
                <span className="mini-label">{activeMessage.applicantName}</span>
                <span className="status-pill status-live">
                  {activeMessage.projectTitle.split(' ').slice(0, 4).join(' ')}…
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
                    placeholder={`Message ${activeMessage.applicantName}…`}
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
            <article className="metric-card tone-blue" style={{ border: '1px solid var(--line)', borderRadius: '1rem', padding: '1rem' }}>
              <strong>{mockMessages.reduce((sum, m) => sum + m.unread, 0)}</strong>
              <div>
                <span>unread messages</span>
                <p>Applicants waiting on a reply from the company side.</p>
              </div>
            </article>
            <article className="metric-card tone-green" style={{ border: '1px solid var(--line)', borderRadius: '1rem', padding: '1rem' }}>
              <strong>{mockMessages.length}</strong>
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
