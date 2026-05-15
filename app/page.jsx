"use client"

import { useState, useCallback } from "react"

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #faf8f4; font-family: 'DM Mono', monospace; color: #1a1a1a; }
  .cug-wrap { max-width: 780px; margin: 0 auto; padding: 2rem 1.5rem; }
  .cug-header { border-bottom: 2px solid #1a1a1a; padding-bottom: 1.5rem; margin-bottom: 2rem; }
  .cug-eyebrow { font-size: 11px; letter-spacing: .12em; text-transform: uppercase; color: #888; margin-bottom: .5rem; }
  .cug-title { font-family: 'DM Serif Display', serif; font-size: clamp(2rem, 5vw, 3.2rem); line-height: 1.1; }
  .cug-title em { font-style: italic; color: #7c3aed; }
  .cug-card { background: #fff; border: 1px solid #e0dbd3; border-radius: 4px; padding: 1.5rem; margin-bottom: 1.5rem; }
  .cug-section-title { font-family: 'DM Serif Display', serif; font-size: 1.2rem; margin-bottom: 1rem; color: #1a1a1a; }

  .cug-field-label { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #888; display: block; margin-bottom: .4rem; }
  .cug-field-hint { font-size: 12px; color: #888; margin-top: .3rem; line-height: 1.5; }
  .cug-field-block { margin-bottom: 1.25rem; }
  .cug-input { width: 100%; border: none; border-bottom: 1.5px solid #e0dbd3; background: transparent; font-family: 'DM Mono', monospace; font-size: 1.1rem; color: #1a1a1a; padding: .4rem 0; outline: none; transition: border-color .2s; }
  .cug-input:focus { border-color: #7c3aed; }

  .cug-style-grid { display: grid; grid-template-columns: 1fr 1fr; gap: .6rem; margin-bottom: 1.25rem; }
  .cug-style-item { display: flex; align-items: center; gap: .6rem; padding: .6rem .75rem; border: 1px solid #e0dbd3; border-radius: 3px; cursor: pointer; transition: all .15s; user-select: none; }
  .cug-style-item.on { border-color: #7c3aed; background: #f5f3ff; }
  .cug-style-item.on .cug-check-box { background: #7c3aed; border-color: #7c3aed; }
  .cug-style-item.on .cug-check-box::after { opacity: 1; }
  .cug-check-box { width: 16px; height: 16px; border: 1.5px solid #ccc; border-radius: 2px; flex-shrink: 0; position: relative; transition: all .15s; }
  .cug-check-box::after { content: ''; position: absolute; left: 4px; top: 1px; width: 5px; height: 9px; border: 2px solid #fff; border-top: none; border-left: none; transform: rotate(45deg); opacity: 0; transition: opacity .15s; }
  .cug-check-label { font-size: 12px; color: #444; }
  .cug-check-sub { font-size: 10px; color: #aaa; margin-left: auto; }

  .cug-count-row { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.25rem; }
  .cug-count-label { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #888; white-space: nowrap; }
  .cug-range { flex: 1; accent-color: #7c3aed; height: 4px; cursor: pointer; }
  .cug-count-val { font-family: 'DM Serif Display', serif; font-size: 1.6rem; color: #7c3aed; min-width: 2rem; text-align: right; }

  .cug-btn { width: 100%; padding: 1rem; background: #1a1a1a; color: #fff; border: none; font-family: 'DM Mono', monospace; font-size: .9rem; letter-spacing: .06em; text-transform: uppercase; cursor: pointer; border-radius: 2px; transition: background .2s; }
  .cug-btn:hover { background: #7c3aed; }

  .cug-results { margin-top: 1.5rem; border-top: 1px solid #e0dbd3; padding-top: 1.5rem; }
  .cug-results-label { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #888; margin-bottom: .75rem; }
  .cug-username-list { display: flex; flex-direction: column; gap: .5rem; }
  .cug-username-row { display: flex; align-items: center; justify-content: space-between; padding: .75rem 1rem; background: #faf8f4; border: 1px solid #e0dbd3; border-radius: 3px; transition: border-color .15s; }
  .cug-username-row:hover { border-color: #7c3aed; }
  .cug-username-text { font-family: 'DM Mono', monospace; font-size: .95rem; color: #1a1a1a; letter-spacing: .03em; }
  .cug-row-actions { display: flex; gap: .5rem; align-items: center; }
  .cug-copy-btn { background: none; border: none; cursor: pointer; font-size: .85rem; color: #aaa; transition: color .15s; padding: .2rem .4rem; font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: .04em; }
  .cug-copy-btn:hover { color: #7c3aed; }
  .cug-copy-btn.done { color: #2d6a4f; }
  .cug-tag { font-size: 10px; padding: .2rem .5rem; border-radius: 20px; background: #f0ebff; color: #7c3aed; letter-spacing: .04em; }

  .cug-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem; }
  .cug-info-item { padding: .75rem; border-left: 2px solid #ddd6fe; }
  .cug-info-title { font-size: 12px; font-weight: 500; color: #1a1a1a; margin-bottom: .25rem; }
  .cug-info-body { font-size: 12px; color: #888; line-height: 1.5; }

  .cug-prose p { font-size: 13px; color: #444; line-height: 1.7; margin-bottom: .75rem; }
  .cug-prose p:last-child { margin-bottom: 0; }
  .cug-prose ul { font-size: 13px; color: #444; line-height: 1.8; padding-left: 1.2rem; margin-bottom: .75rem; }
  .cug-prose ul li { margin-bottom: .3rem; }

  .cug-tip-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .cug-tip-num { font-family: 'DM Serif Display', serif; font-size: 2rem; color: #ddd6fe; line-height: 1; margin-bottom: .4rem; }
  .cug-tip-title { font-size: 12px; font-weight: 500; color: #1a1a1a; margin-bottom: .25rem; }
  .cug-tip-body { font-size: 12px; color: #888; line-height: 1.5; }

  .cug-related-links { display: flex; flex-wrap: wrap; gap: .5rem; }
  .cug-related-link { font-size: 12px; padding: .35rem .75rem; border: 1px solid #e0dbd3; border-radius: 2px; color: #555; text-decoration: none; transition: all .15s; display: inline-block; }
  .cug-related-link:hover { border-color: #1a1a1a; color: #1a1a1a; }
  .cug-disclaimer { font-size: 11px; color: #888; line-height: 1.6; border-top: 1px solid #e0dbd3; padding-top: 1rem; margin-top: 1rem; }
  .cug-footer-links { display: flex; gap: 1rem; font-size: 11px; margin-top: .75rem; }
  .cug-footer-links a { color: #888; text-decoration: underline; }

  @media (max-width: 600px) {
    .cug-style-grid, .cug-info-grid, .cug-tip-grid { grid-template-columns: 1fr; }
  }
`

const ADJECTIVES = [
  "swift","silent","cosmic","neon","frozen","lunar","electric","phantom","crimson","velvet",
  "iron","hollow","solar","blazing","ancient","wild","broken","golden","silver","dark",
  "bright","fierce","calm","rogue","sharp","echo","void","storm","ember","ashen",
  "bold","lost","still","rapid","feral","night","dawn","dusk","peak","deep"
]

const NOUNS = [
  "wolf","blade","circuit","void","echo","drift","signal","ridge","storm","falcon",
  "fox","hawk","raven","pike","ghost","anvil","shard","comet","flare","core",
  "node","peak","crest","pulse","wave","vortex","forge","depth","prism","nexus",
  "titan","nomad","cipher","vector","orbit","zenith","axis","delta","apex","sigma"
]

const VERBS = [
  "runs","drifts","glides","strikes","hunts","codes","builds","rides","burns","flies",
  "wanders","watches","shifts","loops","spins","breaks","fades","surges","leaps","falls"
]

const NUMBERS = () => Math.floor(Math.random() * 900) + 100

const STYLES = [
  { key: "compound",  label: "Compound word",    sub: "SwiftFalcon",   fn: (w) => cap(pick(ADJECTIVES)) + cap(pick(NOUNS)) + (w ? cap(slug(w)) : "") },
  { key: "keyword",   label: "Keyword + number", sub: "Echo404",       fn: (w) => (w ? cap(slug(w)) : cap(pick(ADJECTIVES))) + pick(NOUNS).slice(0,1).toUpperCase() + pick(NOUNS).slice(1) + NUMBERS() },
  { key: "underscore",label: "Snake_case",        sub: "dark_signal",   fn: (w) => (w ? slug(w) : pick(ADJECTIVES)) + "_" + pick(NOUNS) },
  { key: "dotted",    label: "Dotted",            sub: "iron.drift",    fn: (w) => (w ? slug(w) : pick(ADJECTIVES)) + "." + pick(NOUNS) },
  { key: "action",    label: "Action phrase",     sub: "WolfRuns99",    fn: (w) => cap(w ? slug(w) : pick(NOUNS)) + cap(pick(VERBS)) + Math.floor(Math.random()*90+10) },
  { key: "xstyle",    label: "x-prefix",          sub: "xVoidRider",    fn: (w) => "x" + cap(pick(ADJECTIVES)) + cap(w ? slug(w) : pick(NOUNS)) },
  { key: "the",       label: "The + noun",        sub: "TheRealEcho",   fn: (w) => "The" + cap(w ? slug(w) : pick(ADJECTIVES)) + cap(pick(NOUNS)) },
  { key: "leet",      label: "Leet-style",        sub: "3ch0_V01d",     fn: (w) => leet((w ? slug(w) : pick(ADJECTIVES)) + "_" + pick(NOUNS)) },
]

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)] }
function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1) }
function slug(s) { return s.toLowerCase().replace(/[^a-z0-9]/g, "") }
function leet(s) {
  return s.replace(/a/gi,"4").replace(/e/gi,"3").replace(/i/gi,"1").replace(/o/gi,"0").replace(/s/gi,"5")
}

const RELATED = [
  { label: "Credit Card Debt Payoff Calculator",  href: "https://creditcarddebtpayoffcalculator.com" },
  { label: "Debt Reducing Calculator",            href: "https://debtreducingcalculator.com" },
  { label: "Side Hustle Tax Estimator",           href: "https://sidehustletaxestimator.com" },
  { label: "High Yield Savings Calculator",       href: "https://highyieldsavingscalculator.com" },
  { label: "Retirement Savings Gap",              href: "https://retirementsavingsgap.com" },
  { label: "Life Insurance Coverage Calculator",  href: "https://lifeinsurancecoveragecalculator.com" },
  { label: "Online Course ROI Calculator",        href: "https://onlinecourseroi.com" },
  { label: "Subscription Cost Calculator",        href: "https://mysubscriptioncost.com" },
  { label: "Email Attachment Size Checker",       href: "https://emailattachmentsize.com" },
  { label: "GPA Calculator",                      href: "https://gpacalculator.site" },
  { label: "YouTube Title Checker",               href: "https://youtubetitlechecker.com" },
  { label: "Strong Password Builder",             href: "https://strongpasswordbuilder.com" },
  { label: "Cool Username Generator",             href: "https://coolusernamegenerator.com" },
]

export default function Page() {
  const [keyword, setKeyword]   = useState("")
  const [styles, setStyles]     = useState({ compound: true, keyword: true, underscore: true, dotted: false, action: true, xstyle: false, the: false, leet: false })
  const [count, setCount]       = useState(8)
  const [results, setResults]   = useState([])
  const [copied, setCopied]     = useState(null)

  const toggleStyle = (key) => {
    const next = { ...styles, [key]: !styles[key] }
    if (!Object.values(next).some(Boolean)) return
    setStyles(next)
  }

  const generate = useCallback(() => {
    const activeStyles = STYLES.filter(s => styles[s.key])
    if (!activeStyles.length) return
    const generated = []
    for (let i = 0; i < count; i++) {
      const style = activeStyles[i % activeStyles.length]
      generated.push({ text: style.fn(keyword.trim()), styleKey: style.key, styleLabel: style.label })
    }
    setResults(generated)
    setCopied(null)
  }, [keyword, styles, count])

  const copyOne = (text, idx) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(idx)
      setTimeout(() => setCopied(null), 2000)
    })
  }

  return (
    <>
      <style>{css}</style>
      <main className="cug-wrap">

        <div className="cug-header">
          <p className="cug-eyebrow">Identity &amp; Branding</p>
          <h1 className="cug-title">Cool Username<br /><em>Generator</em></h1>
        </div>

        {/* TOOL */}
        <div className="cug-card">
          <div className="cug-field-block">
            <label className="cug-field-label" htmlFor="keyword">Keyword or theme (optional)</label>
            <input
              id="keyword"
              className="cug-input"
              type="text"
              placeholder="e.g. wolf, cosmic, your name..."
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              onKeyDown={e => e.key === "Enter" && generate()}
            />
            <p className="cug-field-hint">Leave blank for fully random results, or enter a word to weave into your username</p>
          </div>

          <label className="cug-field-label">Username styles</label>
          <div className="cug-style-grid">
            {STYLES.map(s => (
              <div key={s.key} className={`cug-style-item${styles[s.key] ? " on" : ""}`} onClick={() => toggleStyle(s.key)}>
                <div className="cug-check-box" />
                <span className="cug-check-label">{s.label}</span>
                <span className="cug-check-sub">{s.sub}</span>
              </div>
            ))}
          </div>

          <div className="cug-count-row">
            <span className="cug-count-label">Results</span>
            <input type="range" min="4" max="20" step="1" className="cug-range" value={count} onChange={e => setCount(Number(e.target.value))} />
            <span className="cug-count-val">{count}</span>
          </div>

          <button className="cug-btn" onClick={generate}>Generate usernames →</button>

          {results.length > 0 && (
            <div className="cug-results">
              <p className="cug-results-label">{results.length} usernames generated — click to copy</p>
              <div className="cug-username-list">
                {results.map((r, i) => (
                  <div className="cug-username-row" key={i} onClick={() => copyOne(r.text, i)} style={{ cursor: "pointer" }}>
                    <span className="cug-username-text">{r.text}</span>
                    <div className="cug-row-actions">
                      <span className="cug-tag">{r.styleLabel}</span>
                      <button className={`cug-copy-btn${copied === i ? " done" : ""}`} onClick={e => { e.stopPropagation(); copyOne(r.text, i) }}>
                        {copied === i ? "✓ copied" : "copy"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* HOW IT WORKS */}
        <div className="cug-card">
          <p className="cug-section-title">How this works</p>
          <div className="cug-prose">
            <p>This tool combines curated word lists — adjectives, nouns, and action verbs — with eight distinct formatting styles to generate usernames that feel intentional rather than random. When you enter a keyword, it weaves that word into the results instead of drawing from the default word bank.</p>
            <p>Each style produces a different structural pattern. Compound words feel clean and modern. Snake_case and dotted formats read well on platforms that allow punctuation. Action phrases add personality. Leet-style transforms letters into number substitutes for a more stylized look.</p>
            <p>All generation happens in your browser — nothing is sent to a server, and results change every time you generate.</p>
          </div>
          <div className="cug-info-grid">
            <div className="cug-info-item">
              <p className="cug-info-title">Keyword weaving</p>
              <p className="cug-info-body">When you enter a keyword, it replaces one component in the pattern rather than just being appended — so results feel cohesive, not tacked on.</p>
            </div>
            <div className="cug-info-item">
              <p className="cug-info-title">Style mixing</p>
              <p className="cug-info-body">Select multiple styles to get variety across your results. Selecting all eight gives the widest range of options in a single batch.</p>
            </div>
            <div className="cug-info-item">
              <p className="cug-info-title">Platform fit</p>
              <p className="cug-info-body">Different styles suit different platforms. Dotted and underscore formats work well on forums and LinkedIn; compound words are cleaner for gaming handles and social media.</p>
            </div>
            <div className="cug-info-item">
              <p className="cug-info-title">Regenerate freely</p>
              <p className="cug-info-body">Hit generate as many times as you like — the word pool is large enough that you&apos;ll rarely see repeats within a session.</p>
            </div>
          </div>
        </div>

        {/* WHY IT MATTERS */}
        <div className="cug-card">
          <p className="cug-section-title">Why your username matters more than you think</p>
          <div className="cug-prose">
            <p>A username is often the first thing someone sees before they interact with you online — on gaming platforms, forums, social networks, or professional communities. It communicates personality, credibility, and memorability before a single word is exchanged.</p>
            <p>A weak or generic username — one that&apos;s just your name followed by a birth year, or a string of random characters — doesn&apos;t leave an impression. A well-constructed one is instantly recognizable and easy to recall, which matters whether you&apos;re building a social media presence, establishing a gaming identity, or just trying to be findable by people who know you.</p>
            <p>Consistency also plays a role. Using the same username across platforms makes you easier to find and harder to impersonate. Finding one you like and can claim everywhere is worth the effort upfront.</p>
          </div>
        </div>

        {/* TIPS */}
        <div className="cug-card">
          <p className="cug-section-title">Tips for choosing the right username</p>
          <div className="cug-tip-grid">
            <div>
              <p className="cug-tip-num">01</p>
              <p className="cug-tip-title">Keep it pronounceable</p>
              <p className="cug-tip-body">If someone can say your username out loud without hesitating, it&apos;s more memorable. Avoid excessive numbers or consecutive consonants that make it unreadable at a glance.</p>
            </div>
            <div>
              <p className="cug-tip-num">02</p>
              <p className="cug-tip-title">Check availability first</p>
              <p className="cug-tip-body">Before committing, search for your username across the platforms you care about. Tools like Namecheckr let you check dozens of sites at once without signing up for each one.</p>
            </div>
            <div>
              <p className="cug-tip-num">03</p>
              <p className="cug-tip-title">Avoid personal information</p>
              <p className="cug-tip-body">Usernames containing your real name, birth year, location, or school can reveal more than intended. A more abstract identity gives you privacy and flexibility.</p>
            </div>
            <div>
              <p className="cug-tip-num">04</p>
              <p className="cug-tip-title">Think long-term</p>
              <p className="cug-tip-body">A username tied to a current obsession or age can feel dated quickly. Abstract or concept-based names tend to age better and travel well across different platforms and contexts.</p>
            </div>
          </div>
        </div>

        {/* PLATFORM GUIDE */}
        <div className="cug-card">
          <p className="cug-section-title">Username styles by platform</p>
          <div className="cug-prose">
            <p>Not every username works equally well everywhere. Platform culture and technical limits shape what reads as natural:</p>
            <ul>
              <li><strong style={{fontWeight:500}}>Gaming (Steam, Xbox, PlayStation):</strong> Compound words and action phrases land well. Leet-style has a long tradition here. Longer names are accepted and often expected.</li>
              <li><strong style={{fontWeight:500}}>Social media (Instagram, TikTok, X):</strong> Short, clean, and memorable. Underscores are common; dots less so. Avoid numbers unless they&apos;re meaningful — trailing digits read as a fallback.</li>
              <li><strong style={{fontWeight:500}}>Forums and communities (Reddit, Discord):</strong> More flexibility. Quirky or conceptual names are appreciated. Snake_case is widely readable.</li>
              <li><strong style={{fontWeight:500}}>Professional networks (LinkedIn, GitHub):</strong> Lean toward compound words or dotted formats that feel polished. Avoid leet-style or heavy symbol use.</li>
              <li><strong style={{fontWeight:500}}>Streaming (Twitch, YouTube):</strong> Distinctive and brandable. Think of it as a channel name — it should be easy to say aloud, searchable, and ideally available as a domain too.</li>
            </ul>
          </div>
        </div>

        {/* RELATED TOOLS */}
        <div className="cug-card">
          <p className="cug-section-title">Related tools</p>
          <div className="cug-related-links">
            {RELATED.map((r, i) => (
              <a key={i} className="cug-related-link" href={r.href}>{r.label}</a>
            ))}
          </div>
          <div className="cug-disclaimer">
            Usernames are generated locally in your browser. No data is stored or transmitted. Generated names are not checked for availability on external platforms.
            <div className="cug-footer-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
            </div>
          </div>
        </div>

      </main>
    </>
  )
}
