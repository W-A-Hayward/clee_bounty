import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'

type ActivityEvent = {
  id: string
  kind: 'apply' | 'shortlist' | 'match' | 'launch' | 'message' | 'milestone'
  actor: string
  target: string
  timeAgo: string
}

type ActivityTickerProps = {
  events?: ActivityEvent[]
}

const fallbackEvents: ActivityEvent[] = [
  { id: 'a', kind: 'apply', actor: 'Amira K.', target: 'Northline · Design system sprint', timeAgo: 'just now' },
  { id: 'b', kind: 'launch', actor: 'Harbor Foods', target: 'Growth analytics board', timeAgo: '3m ago' },
  { id: 'c', kind: 'shortlist', actor: 'Riffline', target: 'Diego R. · Frontend audit', timeAgo: '7m ago' },
  { id: 'd', kind: 'match', actor: 'Mira Solutions', target: 'Sasha L. · UX writing pass', timeAgo: '12m ago' },
  { id: 'e', kind: 'message', actor: 'Chen W.', target: 'Northline reply thread', timeAgo: '18m ago' },
  { id: 'f', kind: 'milestone', actor: 'Aiyana D.', target: 'Brief redesign · M2 approved', timeAgo: '24m ago' },
  { id: 'g', kind: 'apply', actor: 'Thelo M.', target: 'Loom · Onboarding rewrite', timeAgo: '32m ago' },
  { id: 'h', kind: 'launch', actor: 'Pulse Studio', target: 'Mobile app QA sprint', timeAgo: '41m ago' },
]

const kindMeta: Record<ActivityEvent['kind'], { label: string; tone: string; verb: string }> = {
  apply: { label: 'APPLY', tone: 'sky', verb: 'applied to' },
  shortlist: { label: 'SHORTLIST', tone: 'lime', verb: 'shortlisted' },
  match: { label: 'MATCH', tone: 'lime', verb: 'matched with' },
  launch: { label: 'LAUNCH', tone: 'amber', verb: 'launched' },
  message: { label: 'MSG', tone: 'sky', verb: 'replied on' },
  milestone: { label: 'MILE', tone: 'lime', verb: 'cleared' },
}

function ActivityTicker({ events }: ActivityTickerProps) {
  const data = useMemo(() => events ?? fallbackEvents, [events])
  const [cursor, setCursor] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setCursor((prev) => (prev + 1) % data.length)
    }, 2600)
    return () => window.clearInterval(id)
  }, [data.length])

  const visible = useMemo(() => {
    const items: ActivityEvent[] = []
    for (let i = 0; i < 4; i += 1) {
      items.push(data[(cursor + i) % data.length])
    }
    return items
  }, [cursor, data])

  return (
    <div className="activity-ticker" aria-label="Live marketplace activity">
      <div className="activity-ticker-head">
        <span className="ticker-pulse" aria-hidden />
        <span>LIVE · Marketplace activity</span>
      </div>
      <ul className="activity-list">
        <AnimatePresence initial={false}>
          {visible.map((event, idx) => {
            const meta = kindMeta[event.kind]
            return (
              <motion.li
                key={`${event.id}-${cursor}-${idx}`}
                animate={{ opacity: 1 - idx * 0.16, y: 0 }}
                className="activity-row"
                exit={{ opacity: 0, y: -10 }}
                initial={{ opacity: 0, y: 14 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className={`activity-kind activity-kind-${meta.tone}`}>{meta.label}</span>
                <span className="activity-body">
                  <strong>{event.actor}</strong>{' '}
                  <span className="activity-verb">{meta.verb}</span>{' '}
                  <span className="activity-target">{event.target}</span>
                </span>
                <span className="activity-time">{event.timeAgo}</span>
              </motion.li>
            )
          })}
        </AnimatePresence>
      </ul>
    </div>
  )
}

export default ActivityTicker
