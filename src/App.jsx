import React from 'react';
import { ArrowDown, Instagram, ShoppingBag, Sparkles } from 'lucide-react';

const instagramUrl = 'https://www.instagram.com/bake.therapie.ca/';

const cookies = [
  {
    id: 'brown-butter',
    name: 'Brown Butter Chocolate Chunk',
    kicker: 'The comfort classic',
    summary:
      'Deep brown-butter dough, glossy dark chocolate pools, and a salted finish that keeps the bite rich without going heavy.',
    notes: ['brown butter', 'dark chocolate', 'sea salt'],
    image: '/images/brown-butter-chocolate.png',
    alt: 'A thick brown butter chocolate chunk cookie with glossy chocolate pools.',
    accent: '#8b4f35',
    wash: '#f3d8c8',
  },
  {
    id: 'pistachio-rose',
    name: 'Pistachio Rose',
    kicker: 'Floral and nutty',
    summary:
      'A soft bakery-style cookie layered with crushed pistachio and delicate rose notes for a pretty, giftable bite.',
    notes: ['pistachio', 'rose petals', 'soft crumb'],
    image: '/images/pistachio-rose.png',
    alt: 'A pistachio rose cookie topped with crushed pistachios and rose petals.',
    accent: '#597a42',
    wash: '#e7efd8',
  },
  {
    id: 'matcha-white',
    name: 'Matcha White Chocolate',
    kicker: 'Earthy meets creamy',
    summary:
      'Vivid matcha dough folded with white chocolate for a balanced cookie that is mellow, creamy, and just a little fancy.',
    notes: ['matcha', 'white chocolate', 'chewy center'],
    image: '/images/matcha-white-chocolate.png',
    alt: 'A green matcha cookie with white chocolate chunks.',
    accent: '#2f6f5d',
    wash: '#d8eee8',
  },
  {
    id: 'red-velvet',
    name: 'Red Velvet Cream Cheese',
    kicker: 'A dramatic sweet spot',
    summary:
      'Cocoa-kissed red velvet with a creamy center, made for people who want their cookie drop to feel like dessert-dessert.',
    notes: ['red velvet', 'cream cheese', 'cocoa crumb'],
    image: '/images/red-velvet-cream-cheese.png',
    alt: 'A red velvet cookie with a cream cheese center.',
    accent: '#9a1f2b',
    wash: '#f1d9dc',
  },
  {
    id: 'cookies-cream',
    name: 'Cookies and Cream',
    kicker: 'Crunchy, creamy, nostalgic',
    summary:
      'Vanilla dough packed with chocolate cookie crumble and cream pieces, built for the first cookie to disappear from the box.',
    notes: ['vanilla dough', 'cookie crumble', 'cream pieces'],
    image: '/images/cookies-and-cream.png',
    alt: 'A cookies and cream cookie with dark cookie crumble and cream pieces.',
    accent: '#252525',
    wash: '#e5e1dc',
  },
];

function App() {
  return (
    <>
      <header className="site-header" aria-label="Bake Therapy site header">
        <a className="brand" href="#top" aria-label="Bake Therapy home">
          <span className="brand-mark" aria-hidden="true">
            BT
          </span>
          <span className="brand-name">Bake Therapy</span>
        </a>

        <nav className="top-nav" aria-label="Cookie navigation">
          {cookies.slice(0, 3).map((cookie) => (
            <a key={cookie.id} href={`#${cookie.id}`}>
              {cookie.name.split(' ')[0]}
            </a>
          ))}
        </nav>

        <a
          className="social-link"
          href={instagramUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Open Bake Therapy on Instagram"
        >
          <Instagram size={18} strokeWidth={2.4} aria-hidden="true" />
          <span>@bake.therapie.ca</span>
        </a>
      </header>

      <aside className="section-dots" aria-label="Jump to cookie section">
        {cookies.map((cookie, index) => (
          <a
            key={cookie.id}
            href={`#${cookie.id}`}
            aria-label={`Jump to ${cookie.name}`}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
          </a>
        ))}
      </aside>

      <main className="scroll-stage">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-media" aria-hidden="true">
            <img
              src="/images/hero-cookie-flight.png"
              alt=""
              loading="eager"
            />
          </div>
          <div className="hero-content">
            <p className="eyebrow">
              <Sparkles size={18} strokeWidth={2.4} aria-hidden="true" />
              Small-batch cookie therapy
            </p>
            <h1 id="hero-title">Bake Therapy</h1>
            <p className="hero-copy">
              A scrollable cookie showcase for handcrafted drops, cozy cravings,
              and boxes that look as good as they taste.
            </p>
            <div className="hero-actions" aria-label="Primary actions">
              <a className="button button-primary" href="#brown-butter">
                <ArrowDown size={19} strokeWidth={2.4} aria-hidden="true" />
                View cookies
              </a>
              <a
                className="button button-secondary"
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
              >
                <Instagram size={19} strokeWidth={2.4} aria-hidden="true" />
                Instagram
              </a>
            </div>
          </div>
          <a className="hero-peek" href="#brown-butter">
            <span>First up</span>
            Brown Butter Chocolate Chunk
          </a>
        </section>

        {cookies.map((cookie, index) => (
          <CookieSection key={cookie.id} cookie={cookie} index={index} />
        ))}

        <section className="closing" aria-labelledby="closing-title">
          <p className="eyebrow">
            <Sparkles size={18} strokeWidth={2.4} aria-hidden="true" />
            Cookie drops by Bake Therapy
          </p>
          <h2 id="closing-title">Ready for the next box?</h2>
          <p>
            Follow the latest cookie drops, flavors, and pickup details on
            Instagram.
          </p>
          <a
            className="button button-primary"
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
          >
            <Instagram size={19} strokeWidth={2.4} aria-hidden="true" />
            Visit @bake.therapie.ca
          </a>
        </section>
      </main>
    </>
  );
}

function CookieSection({ cookie, index }) {
  return (
    <section
      className={`cookie-section ${index % 2 === 1 ? 'is-reversed' : ''}`}
      id={cookie.id}
      style={{
        '--accent': cookie.accent,
        '--wash': cookie.wash,
      }}
      aria-labelledby={`${cookie.id}-title`}
    >
      <div className="section-number" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </div>

      <div className="cookie-visual">
        <img src={cookie.image} alt={cookie.alt} loading="lazy" />
      </div>

      <div className="cookie-story">
        <p className="cookie-kicker">{cookie.kicker}</p>
        <h2 id={`${cookie.id}-title`}>{cookie.name}</h2>
        <p>{cookie.summary}</p>
        <ul className="note-list" aria-label={`${cookie.name} notes`}>
          {cookie.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
        <a
          className="order-link"
          href={instagramUrl}
          target="_blank"
          rel="noreferrer"
        >
          <ShoppingBag size={19} strokeWidth={2.4} aria-hidden="true" />
          DM to reserve
        </a>
      </div>
    </section>
  );
}

export default App;
