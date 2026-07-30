# QuickPlumb Website 2.0

The marketing site for QuickPlumb Pro. Plain static HTML — no build step, no framework,
no dependencies. Deployed to Netlify from this repository.

The **licensing platform stays on WordPress**. This site links out to it for the trial
download, checkout, account pages and legacy licence transfer. That separation is the
whole point: marketing can change daily without touching anything that issues licences.

---

## Files

```
index.html            Homepage
css/site.css          The entire stylesheet
js/site.js            Mobile nav toggle + footer year. ~20 lines.
legal/terms.html      Terms of service
legal/privacy.html    Privacy policy
legal/refunds.html    Refund policy
legal/eula.html       EULA  — placeholder, see below
legal/notices.html    Copyright, trademark, code and payment notices
netlify.toml          Publish config, redirects, cache and security headers
robots.txt
assets/               Screenshots and images go here
```

---

## Deploying

1. Commit and push this to `MarkyMark62589/QuickPlumb_Website_2.0`.
2. In Netlify: **Add new project → Import an existing project → GitHub →
   QuickPlumb_Website_2.0**.
3. Leave the build command blank. Publish directory `.` — though `netlify.toml`
   already sets this, so you can accept whatever Netlify pre-fills.
4. Deploy.

Every push to `main` redeploys. Every pull request gets its own preview URL, so you can
look at a change before it goes live.

### Pointing the domain at it

`www.quickplumb.com` currently serves WordPress. Decide which host owns the apex before
you switch DNS — you cannot have both answering for the same hostname. Two options:

- **Subdomain split.** Netlify serves `www.quickplumb.com`; WordPress moves to
  `app.quickplumb.com` or `my.quickplumb.com`. Cleanest, but every existing link and
  bookmark to a WordPress page needs a redirect.
- **Path proxy.** Netlify serves the apex and proxies `/checkout/*`, `/start-trial/*`,
  `/my-account/*` etc. through to WordPress with `status = 200` rewrites in
  `netlify.toml`. Keeps one hostname; adds a hop and some latency on those paths.

Either way the Paddle checkout domain settings and the return URLs in your webhook
handler need to match whatever you choose.

---

## Design notes

The page is laid out as a **plan sheet**, because that is the artifact the product
produces and the one the audience reads all day.

- **Hero** — a DWV riser diagram that draws itself on load, the way QuickPlumb plots an
  isometric. Hand-authored SVG in `index.html`; no image file, no library, a few KB.
  Honours `prefers-reduced-motion` (renders complete, no animation).
- **Features** are set as a drawing **legend**: symbol box, name, note. The symbols are
  drawn in the same line vocabulary as the hero rather than generic stock icons.
- **Footer** is a real **title block** — project, release, platform, issuer, revision date.
- **Type**: Barlow Condensed for headings (uppercase, the way drawings are lettered),
  IBM Plex Sans for reading, IBM Plex Mono for annotations, specs and prices.
- **Colour**: cast iron, plan paper, CAD slate, plan-line blue, and copper. Copper is the
  only hot colour and it is spent in two places — the supply lines in the diagram, and
  the primary button.

---

## Before it goes live

Search the source for `class="tbd"` — those are marked in copper with a dotted underline
so they are hard to miss on the page itself.

**Must confirm**

- [ ] **Trial and the card.** The homepage says *"Full version for 30 days"* and does
      **not** claim "no credit card required", because the Terms say a trial converts to
      paid unless cancelled. If the trial actually takes no card, say so — it is a strong
      selling point. If it does take a card, the trial page should say so plainly.
- [ ] **Paddle price IDs.** `pri_01kdzj8s5k25tgbjv2a31kdp08` (Pro) and
      `pri_01kgwpyr3a2dj6m8g6v7j4t9h1` (Plus) came out of your current pricing table.
      Confirm they are the live IDs, not sandbox.
- [ ] **Perpetual licences.** The pricing table only had the three monthly options, but
      you have perpetual customers. Decide whether perpetual is still sold — if so it
      needs a fourth column or a line under the table.
- [ ] **Trademark.** `notices.html` uses ®. Switch to ™ unless QuickPlumb is actually
      registered.
- [ ] **EULA.** `legal/eula.html` is a structural placeholder. Paste in the same text the
      installer shows, so the shipped and published agreements match word for word.

**Should do**

- [ ] **Screenshots.** Three `4:3` placeholders in the *What it looks like* section. Plan
      view with fixtures on an imported floor plan, a DWV isometric with sizes shown, and
      a bill of materials. Save as WebP around 1200×900 into `assets/` and swap the
      `<div class="fig__vp">` placeholder for `<img>`.
- [ ] **Logo.** The wordmark is currently set in type. If you want the existing QuickPlumb
      mark, drop an SVG into `assets/` and replace `.brand__mk`.
- [ ] **Analytics.** Nothing is loaded. Netlify Analytics is server-side and needs no
      cookie banner, which keeps the privacy policy simple.
- [ ] **Self-host the fonts** if you want to hit the sub-second target on cold loads —
      it removes two DNS lookups and a round trip to Google.

**Worth a thought**

- The Contractor Magazine "Editors Choice" award is a real trust signal you are currently
  burying in a blog post. If you can find the issue date, it belongs on the homepage.
- Online documentation, searchable and mobile-friendly, is a natural next module — it
  slots in as `/docs/` on this same repo with no extra infrastructure.

---

## Editing

Open the file, change the text, commit. That is the whole workflow.

The stylesheet is one file with a token block at the top. Change `--copper` in `:root`
and every accent on the site moves with it.
