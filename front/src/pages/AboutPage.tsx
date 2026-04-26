import SectionHeading from '../components/SectionHeading'
import { useLang } from '../i18n/LanguageContext'
import { routeHref } from '../lib/hashRouter'

const copy = {
  en: {
    eyebrow: 'About Legend',
    h1: 'A student-built platform made for CLÉE and the Montreal campus network.',
    intro:
      'Legend was created by CADUM students from Université de Montréal for CLÉE, the Comité de Liaison Étudiants/Entreprises de Polytechnique. It turns student-company connection into a clearer, more structured digital experience.',
    shortVersion: 'The short version',
    shortStrong: 'Built by CADUM. Made for CLÉE. Named after the key on every map.',
    shortBody:
      'On a map, the legend is the key — it explains what every pin means. Legend the platform is the same: it decodes opportunity for students and signal for companies. CADUM built the product. CLÉE brings the student-enterprise mission at Polytechnique. We sit between both.',
    browseProjects: 'Browse projects',
    cadumLink: 'CADUM',
    originEyebrow: 'Origin',
    originTitle: 'Created by CADUM students for a real campus use case.',
    originDesc:
      'The platform was built by students from CADUM, the Université de Montréal development club, and made to serve CLÉE, Polytechnique’s student-enterprise liaison committee.',
    missionPoints: [
      {
        title: 'Built by student developers',
        body: 'The platform was created by CADUM students at Université de Montréal, with the same hands-on product mindset the club brings to campus projects.',
        tone: 'tone-blue',
      },
      {
        title: 'Made for CLÉE',
        body: 'Legend was designed to support CLÉE, the Comité de Liaison Étudiants/Entreprises de Polytechnique, and its mission of connecting students with companies.',
        tone: 'tone-green',
      },
      {
        title: 'A bridge between campuses',
        body: 'The project connects UdeM builders with Polytechnique career infrastructure around one goal: clearer, better student-company collaboration.',
        tone: 'tone-orange',
      },
    ],
    whyNameEyebrow: 'Why this name',
    whyNameTitle: 'A map’s legend is its key. So is ours.',
    whyNameDesc: 'Three meanings collide in one word — and that is the entire pitch.',
    nameMeanings: [
      {
        title: 'The key on the map',
        body: 'Cartographers don’t say "key." They say legend. The legend on a map decodes every symbol — exactly what this platform does for the student-opportunity map.',
        tone: 'tone-blue',
      },
      {
        title: 'The person on the map',
        body: 'A legend is also someone who is "on the map" — someone whose work is recognized. Every project completed here is a step in becoming one.',
        tone: 'tone-green',
      },
      {
        title: 'The story you build',
        body: 'Every project carries its own legend — its brief, its lore, its why. Legend turns each contract into a chapter in your portfolio story.',
        tone: 'tone-orange',
      },
    ],
    contextEyebrow: 'Context',
    contextTitle: 'A project rooted in student organizations.',
    contextDesc:
      'Legend is shaped by the organizations behind it: student developers at UdeM, career connection work at Polytechnique, and a shared Montreal ecosystem.',
    platformFacts: [
      { value: 'UdeM', label: 'student-built', note: 'Created by students from CADUM at Université de Montréal.', tone: 'tone-blue' },
      { value: 'CLÉE', label: 'platform partner', note: 'Made to be used by the student-enterprise liaison committee at Polytechnique.', tone: 'tone-green' },
      { value: 'MTL', label: 'campus network', note: 'Designed around Montreal students, employers, and career opportunities.', tone: 'tone-orange' },
    ],
    principlesEyebrow: 'Our principles',
    principlesTitle: 'The values behind the build.',
    principlesDesc:
      'The product decisions are guided by the way student organizations work: practical, collaborative, and close to the people using the platform.',
    principles: [
      { title: 'Student-built, not outsourced', body: 'Legend reflects the work of student developers who understand how campus projects, clubs, and career opportunities actually move.' },
      { title: 'Built for a real committee', body: 'The platform is not a generic marketplace clone. It was made for CLÉE and its student-enterprise connection mission at Polytechnique.' },
      { title: 'Clearer opportunities', body: 'Students should understand the work before applying, and companies should be able to present opportunities with real structure.' },
      { title: 'Campus collaboration first', body: 'The project brings together student initiative, technical execution, and committee needs across Montreal institutions.' },
    ],
    teamEyebrow: 'CADUM contribution',
    teamTitle: 'A collective student build.',
    teamDesc:
      'Legend was developed by CADUM as a student-led club project for CLÉE, shaping the product, interface, and technical foundation as one collective build.',
    teamMembers: [
      { name: 'Product direction', role: 'CADUM', note: 'The club translated CLÉE’s student-company mission into a platform structure: public discovery, applications, dashboards, and delivery flow.' },
      { name: 'Interface and experience', role: 'CADUM', note: 'The design system, map metaphor, bilingual copy, and workspace rhythm were built to feel like campus infrastructure, not a generic job board.' },
      { name: 'Technical build', role: 'CADUM', note: 'The student team brought the application to life across the frontend, API, demo data, authentication flow, and project-management surfaces.' },
    ],
    futureEyebrow: 'What we are building toward',
    futureTitle: 'A stronger bridge between students and companies.',
    futureDesc:
      'Legend is meant to support the way CLÉE connects Polytechnique students and employers, while giving student developers a real product with long-term campus value.',
    forStudentsEyebrow: 'For students',
    forStudentsTitle: 'Browse real work, earn real portfolio credit.',
    forStudentsDesc: 'Every project on Legend comes with a brief you can read before you decide whether to apply. No mystery gigs.',
    createStudent: 'Create student account',
    learnMore: 'Learn more',
    forCompaniesEyebrow: 'For companies',
    forCompaniesTitle: 'Post structured work and hire with less overhead.',
    forCompaniesDesc: 'Companies that write good briefs get better applicants. The platform enforces the brief standard before anything goes live.',
    createCompany: 'Create company account',
  },
  fr: {
    eyebrow: 'À propos de Legend',
    h1: 'Une plateforme bâtie par des étudiants, pensée pour CLÉE et le réseau campus montréalais.',
    intro:
      'Legend a été créée par des étudiants de CADUM à l’Université de Montréal pour CLÉE, le Comité de Liaison Étudiants/Entreprises de Polytechnique. Elle transforme la connexion étudiants-entreprises en une expérience numérique plus claire et plus structurée.',
    shortVersion: 'En version courte',
    shortStrong: 'Bâti par CADUM. Pensé pour CLÉE. Nommé d’après la clé de chaque carte.',
    shortBody:
      'Sur une carte, la légende, c’est la clé — elle explique ce que chaque pin veut dire. Legend la plateforme fait la même chose : elle décode l’opportunité pour les étudiants et le signal pour les entreprises. CADUM a bâti le produit. CLÉE porte la mission étudiants-entreprises à Polytechnique. On est entre les deux.',
    browseProjects: 'Explorer les projets',
    cadumLink: 'CADUM',
    originEyebrow: 'Origine',
    originTitle: 'Créé par des étudiants CADUM pour un vrai cas d’usage campus.',
    originDesc:
      'La plateforme a été bâtie par des étudiants de CADUM, le club de développement de l’Université de Montréal, et conçue pour servir CLÉE, le comité de liaison étudiants-entreprises de Polytechnique.',
    missionPoints: [
      {
        title: 'Bâti par des développeurs étudiants',
        body: 'La plateforme a été créée par des étudiants CADUM à l’Université de Montréal, avec le même état d’esprit produit hands-on que le club apporte à ses projets campus.',
        tone: 'tone-blue',
      },
      {
        title: 'Pensé pour CLÉE',
        body: 'Legend a été conçue pour soutenir CLÉE, le Comité de Liaison Étudiants/Entreprises de Polytechnique, et sa mission de connecter étudiants et entreprises.',
        tone: 'tone-green',
      },
      {
        title: 'Un pont entre les campus',
        body: 'Le projet relie les builders de l’UdeM à l’infrastructure carrière de Polytechnique autour d’un seul objectif : une collaboration étudiants-entreprises plus claire et meilleure.',
        tone: 'tone-orange',
      },
    ],
    whyNameEyebrow: 'Pourquoi ce nom',
    whyNameTitle: 'La légende d’une carte, c’est sa clé. La nôtre aussi.',
    whyNameDesc: 'Trois sens se rencontrent dans un seul mot — et c’est ça, la pitch complète.',
    nameMeanings: [
      {
        title: 'La clé sur la carte',
        body: 'Les cartographes ne disent pas "clé". Ils disent légende. La légende d’une carte décode chaque symbole — exactement ce que cette plateforme fait pour la carte des opportunités étudiantes.',
        tone: 'tone-blue',
      },
      {
        title: 'La personne sur la carte',
        body: 'Une légende, c’est aussi quelqu’un "sur la carte" — quelqu’un dont le travail est reconnu. Chaque projet complété ici est un pas pour le devenir.',
        tone: 'tone-green',
      },
      {
        title: 'L’histoire que tu bâtis',
        body: 'Chaque projet porte sa propre légende — son mandat, son contexte, son pourquoi. Legend transforme chaque contrat en un chapitre de ton histoire portfolio.',
        tone: 'tone-orange',
      },
    ],
    contextEyebrow: 'Contexte',
    contextTitle: 'Un projet enraciné dans les organisations étudiantes.',
    contextDesc:
      'Legend est façonnée par les organisations derrière elle : développeurs étudiants à l’UdeM, travail de connexion carrière à Polytechnique, et un écosystème montréalais partagé.',
    platformFacts: [
      { value: 'UdeM', label: 'bâti par étudiants', note: 'Créé par des étudiants CADUM à l’Université de Montréal.', tone: 'tone-blue' },
      { value: 'CLÉE', label: 'partenaire plateforme', note: 'Conçu pour être utilisé par le comité de liaison étudiants-entreprises de Polytechnique.', tone: 'tone-green' },
      { value: 'MTL', label: 'réseau campus', note: 'Pensé autour des étudiants, employeurs et opportunités carrière de Montréal.', tone: 'tone-orange' },
    ],
    principlesEyebrow: 'Nos principes',
    principlesTitle: 'Les valeurs derrière la construction.',
    principlesDesc:
      'Les décisions produit sont guidées par la façon dont les organisations étudiantes travaillent : pratique, collaboratif, proche des gens qui utilisent la plateforme.',
    principles: [
      { title: 'Bâti par étudiants, pas sous-traité', body: 'Legend reflète le travail de développeurs étudiants qui comprennent comment les projets campus, les clubs et les opportunités carrière bougent vraiment.' },
      { title: 'Bâti pour un vrai comité', body: 'La plateforme n’est pas un clone générique de marketplace. Elle a été créée pour CLÉE et sa mission de connexion étudiants-entreprises à Polytechnique.' },
      { title: 'Des opportunités plus claires', body: 'Les étudiants devraient comprendre le travail avant de postuler, et les entreprises devraient pouvoir présenter leurs opportunités avec une vraie structure.' },
      { title: 'Collaboration campus d’abord', body: 'Le projet réunit initiative étudiante, exécution technique et besoins de comité à travers les institutions montréalaises.' },
    ],
    teamEyebrow: 'Contribution CADUM',
    teamTitle: 'Une construction étudiante collective.',
    teamDesc:
      'Legend a été développée par CADUM comme un projet de club étudiant pour CLÉE, en façonnant le produit, l’interface et la base technique comme une construction collective.',
    teamMembers: [
      { name: 'Direction produit', role: 'CADUM', note: 'Le club a transformé la mission étudiants-entreprises de CLÉE en structure de plateforme : découverte publique, candidatures, tableaux de bord et parcours de livraison.' },
      { name: 'Interface et expérience', role: 'CADUM', note: 'Le système visuel, la métaphore de la carte, le bilinguisme et le rythme des espaces de travail ont été pensés comme une infrastructure campus, pas comme un simple babillard.' },
      { name: 'Construction technique', role: 'CADUM', note: 'L’équipe étudiante a donné vie à l’application avec le frontend, l’API, les données de démonstration, le flux d’authentification et les surfaces de gestion de projet.' },
    ],
    futureEyebrow: 'Ce que l’on bâtit',
    futureTitle: 'Un pont plus fort entre étudiants et entreprises.',
    futureDesc:
      'Legend soutient la façon dont CLÉE connecte les étudiants et employeurs de Polytechnique, tout en donnant aux développeurs étudiants un vrai produit avec une valeur campus à long terme.',
    forStudentsEyebrow: 'Pour les étudiants',
    forStudentsTitle: 'Explore du vrai travail, gagne du vrai crédit portfolio.',
    forStudentsDesc: 'Chaque projet sur Legend vient avec un mandat que tu peux lire avant de décider de postuler. Aucun mandat mystère.',
    createStudent: 'Créer mon compte étudiant',
    learnMore: 'En savoir plus',
    forCompaniesEyebrow: 'Pour les entreprises',
    forCompaniesTitle: 'Publiez du travail structuré et embauchez avec moins de surcoût.',
    forCompaniesDesc: 'Les entreprises qui écrivent de bons mandats reçoivent de meilleurs candidats. La plateforme impose le standard de mandat avant toute mise en ligne.',
    createCompany: 'Créer un compte entreprise',
  },
}

function AboutPage() {
  const lang = useLang()
  const t = copy[lang]
  return (
    <>
      <section className="page-header split-header">
        <div>
          <p className="eyebrow">{t.eyebrow}</p>
          <h1>{t.h1}</h1>
          <p className="page-intro">{t.intro}</p>
        </div>

        <article className="info-card tone-blue">
          <span className="mini-label">{t.shortVersion}</span>
          <strong>{t.shortStrong}</strong>
          <p>{t.shortBody}</p>
          <div className="hero-actions">
            <a className="button button-primary" href={routeHref('/projects')}>
              {t.browseProjects}
            </a>
            <a className="button button-secondary" href="https://cadum.aediroum.ca" target="_blank" rel="noreferrer">
              {t.cadumLink}
            </a>
          </div>
        </article>
      </section>

      <section className="section-block">
        <SectionHeading
          eyebrow={t.originEyebrow}
          title={t.originTitle}
          description={t.originDesc}
        />

        <div className="feature-grid feature-grid-three">
          {t.missionPoints.map((point) => (
            <article key={point.title} className={`feature-card ${point.tone}`}>
              <h3>{point.title}</h3>
              <p>{point.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionHeading
          eyebrow={t.whyNameEyebrow}
          title={t.whyNameTitle}
          description={t.whyNameDesc}
        />

        <div className="feature-grid feature-grid-three">
          {t.nameMeanings.map((point) => (
            <article key={point.title} className={`feature-card ${point.tone}`}>
              <h3>{point.title}</h3>
              <p>{point.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionHeading
          eyebrow={t.contextEyebrow}
          title={t.contextTitle}
          description={t.contextDesc}
        />

        <div className="metrics-grid">
          {t.platformFacts.map((fact) => (
            <article key={fact.label} className={`metric-card ${fact.tone}`}>
              <strong>{fact.value}</strong>
              <div>
                <span>{fact.label}</span>
                <p>{fact.note}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block portal-two-column">
        <article className="panel-card">
          <SectionHeading
            eyebrow={t.principlesEyebrow}
            title={t.principlesTitle}
            description={t.principlesDesc}
          />

          <div className="list-stack">
            {t.principles.map((principle) => (
              <article key={principle.title} className="list-card">
                <div>
                  <strong>{principle.title}</strong>
                  <p>{principle.body}</p>
                </div>
              </article>
            ))}
          </div>
        </article>

        <article className="panel-card">
          <SectionHeading
            eyebrow={t.teamEyebrow}
            title={t.teamTitle}
            description={t.teamDesc}
          />

          <div className="list-stack">
            {t.teamMembers.map((member) => (
              <article key={member.name} className="list-card">
                <div>
                  <strong>{member.name}</strong>
                  <p>
                    <span style={{ fontWeight: 700, color: 'var(--brand-blue)' }}>{member.role}</span>
                    {' · '}
                    {member.note}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </article>
      </section>

      <section className="section-block">
        <SectionHeading
          eyebrow={t.futureEyebrow}
          title={t.futureTitle}
          description={t.futureDesc}
        />

        <div className="feature-grid feature-grid-two">
          <article className="panel-card tone-blue">
            <SectionHeading
              eyebrow={t.forStudentsEyebrow}
              title={t.forStudentsTitle}
              description={t.forStudentsDesc}
            />
            <div className="hero-actions">
              <a className="button button-primary" href={routeHref('/students/create-account')}>
                {t.createStudent}
              </a>
              <a className="button button-secondary" href={routeHref('/students')}>
                {t.learnMore}
              </a>
            </div>
          </article>

          <article className="panel-card tone-orange">
            <SectionHeading
              eyebrow={t.forCompaniesEyebrow}
              title={t.forCompaniesTitle}
              description={t.forCompaniesDesc}
            />
            <div className="hero-actions">
              <a className="button button-primary" href={routeHref('/companies/create-account')}>
                {t.createCompany}
              </a>
              <a className="button button-secondary" href={routeHref('/companies')}>
                {t.learnMore}
              </a>
            </div>
          </article>
        </div>
      </section>
    </>
  )
}

export default AboutPage
