import { useLanguage } from '../i18n/LanguageContext'

type LanguageToggleProps = {
  variant?: 'default' | 'compact'
}

function LanguageToggle({ variant = 'default' }: LanguageToggleProps) {
  const { lang, setLang } = useLanguage()
  const className = variant === 'compact' ? 'lang-toggle lang-toggle-compact' : 'lang-toggle'

  return (
    <div
      className={className}
      role="group"
      aria-label={lang === 'fr' ? 'Choix de la langue' : 'Language selection'}
    >
      <button
        aria-pressed={lang === 'en'}
        className={`lang-toggle-option${lang === 'en' ? ' is-active' : ''}`}
        onClick={() => setLang('en')}
        type="button"
      >
        EN
      </button>
      <span className="lang-toggle-sep" aria-hidden>·</span>
      <button
        aria-pressed={lang === 'fr'}
        className={`lang-toggle-option${lang === 'fr' ? ' is-active' : ''}`}
        onClick={() => setLang('fr')}
        type="button"
      >
        FR
      </button>
    </div>
  )
}

export default LanguageToggle
