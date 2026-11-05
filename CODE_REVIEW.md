# PrimeCodeStudio Website — Implementation Analysis

**Reviewed:** `main` @ `7673a03` ("Bug fixed #2") · Next.js 16.2.10 · React 19.2.4 · TypeScript 5 · GSAP 3.15
**Scope:** 5,705 lines across 31 TS/TSX/CSS files
**Method:** static reading + `tsc`, `eslint`, `next build`, live dev server over all routes, API fuzzing, jsdom mount tests, contrast math

---

## Verdict

The **design and component work is genuinely good** — the marketing pages are well-structured, copy is clear, and the visual system is coherent. The problems are concentrated in **the polish layer and the production-readiness layer**: a preloader that un-hides the page in SSR, a form that can be coerced into sending HTML injection payloads, zero SEO infrastructure, and an accessibility story that breaks for reduced-motion users.

| Area | Grade | One-line summary |
|---|---|---|
| Visual design / layout | **A−** | Coherent, modern, well-executed; minor palette drift |
| Component structure | **B** | Sensible split, but copy-pasted nav & dead code |
| Type safety | **A** | `tsc --noEmit` exits 0 |
| Lint health | **D** | 8 errors, 6 warnings — `npm run lint` exits 1 |
| Runtime correctness | **C+** | Several real bugs (SSR opacity, scroll lock, dead link) |
| Security | **C** | Solid baseline, but unescaped HTML into email + no rate limiting |
| Accessibility | **C−** | Good bones, but contrast failures and reduced-motion gaps |
| SEO / metadata | **D** | No OG tags, no robots.txt, no sitemap, home has no title suffix |
| Performance | **B−** | Fine for a marketing site; avoidable JS and payload |
| Testing / CI | **F** | No tests, no CI, no error boundaries |

---

## 🔴 Blockers — fix before launch

### 1. The homepage is invisible in SSR HTML (and no-JS)

`src/app/page.tsx` initialises `splitStarted = false` and passes it to `Homepage`, which renders:

```tsx
// Homepage.tsx:133
style={{ opacity: show || isSkip ? 1 : 0, pointerEvents: show || isSkip ? 1 : 0 }}
```

Server-rendered output, confirmed against the running dev server:

```html
<div class="Homepage-module__LOhZMq__homepage" style="opacity:0;pointer-events:none">
```

So the **entire page below the preloader ships invisible**, and only becomes visible after client hydration finds `localStorage` and flips state. Consequences:

- **No-JS visitors see a blank page.** Your preloader is a scroll-lock + animation; without JS it never completes.
- **Bots that don't execute JS** index an empty page — the `<h1>` is in the DOM but CSS-hidden.
- **Flash of nothing** on every reload for first-time visitors, until hydration completes.

The `localStorage` read needs to happen before first paint, not in a `useEffect`. Options: read it in an inline pre-hydration `<script>` that sets a `data-` attribute, use `next/dynamic` with `ssr: false` for the preloader only, or add `<noscript>` CSS that forces `opacity: 1`.

### 2. Contact form: HTML injection into the notification email

`route.ts` interpolates user input directly into the email body:

```ts
html: `<td>${name}</td>`   // subject, email, message all likewise
```

and defines — but **never calls** — an escaper at line 320:

```ts
function escapeHtml(str: string) { ... }   // ← zero call sites
```

Verified: a payload of `<img src=x onerror="alert(1)">` passes validation and appears **verbatim** in the generated MIME body.

This is not a browser XSS (email clients strip script), but it is HTML injection into a message you send from your domain to your own inbox: tracking-pixel injection, spoofed content impersonating you, malicious links rendered as your brand. `escapeHtml` exists and is correct — it is simply never wired up.

```ts
// fix
const safe = (v: unknown) => escapeHtml(String(v ?? ""));
html: `... <td>${safe(name)}</td> ...`
```

Header injection (CRLF into `subject`) was tested and does **not** succeed — nodemailer RFC 2047-encodes the subject. Good.

### 3. The contact form has no rate limiting or abuse control beyond a honeypot

The honeypot is a good start, but a POST with `{name, email, message}` from any script will trigger a real SMTP send from your account. Nothing throttles it: no IP limit, no captcha, no `Retry-After`, no origin check. A trivial loop will burn your SMTP provider quota or get the account flagged for spam.

Minimum viable: in-memory/Upstash counter keyed on IP (e.g. 5/hour), plus a `Cache-Control: no-store` and a request-size cap.

### 4. The "Phone" link is dead

`ContactPage.tsx:31`:

```tsx
href: "mob:+91 7304414905",   // ← not a valid scheme
```

`mob:` is not a URI scheme. Clicking does nothing on every device. Should be `tel:+917304414905`. This is your primary conversion path on mobile — worth fixing today.

---

## 🟠 Bugs

### 5. Scroll is not locked during the preloader (effect-order race)

Three components independently write `document.body.style.overflow`:

| File | Writes |
|---|---|
| `Preloader.tsx` | `"hidden"` on mount |
| `Homepage.tsx` | `mobileOpen ? "hidden" : ""` **on mount** |
| `Nav.tsx` | `open ? "hidden" : ""` **on mount** |

Child effects run before parent effects, and `Homepage`'s effect unconditionally writes `""` when `mobileOpen` is `false` — clobbering the preloader's lock.

Reproduced with a jsdom mount of the exact effect pair:

```
body.style.overflow while preloader is visible => ""
UNLOCKED  <-- BUG: scroll not locked during preloader
```

So the "scroll lock" you wrote is a no-op on first load; the page can be scrolled behind the fixed preloader. Fix: one `useBodyScrollLock(locked)` hook with a counter, and never write `""` unless you own the lock.

### 6. My own scroll-lock cleanup also fights `Nav`

`Nav.tsx` runs `document.body.style.overflow = open ? "hidden" : ""` on mount too. Because `Homepage` has its **own** duplicate nav with its own mobile menu, opening the homepage menu while `Nav` is mounted elsewhere can deadlock scroll. This is downstream of bug #7.

### 7. Two complete, divergent navigation implementations

`Homepage.tsx` (lines 141–228) hand-rolls a full nav + mobile panel. `shared/Nav.tsx` is a second, independent full implementation. They differ in breakpoints, z-index (50 vs 100), link markup (`<span>Home</span>` vs `<Link href="/">`), and scroll-lock logic.

The shared `Nav` already does everything the inline one does. **Deleting ~90 lines of inline nav and using `<Nav />`** removes bugs #5/#6 and halves the maintenance surface. The only reason to keep the inline version is the GSAP entrance on `navRef` — which works fine on the shared component too.

### 8. `Homepage.tsx` uses raw `<a>` where it ships `next/link`

Four "Learn More" links (lines 352, 365, 378, 391):

```tsx
<a href="/services" className={styles.learnMore}>
```

Every one triggers a **full page reload** instead of client-side navigation, losing hydration state and re-running the GSAP entrance. `Link` is already imported in the same file.

### 9. `/projects` has two `<h1>` elements

The filter section renders the hero `<h1>` and then a `ComingSoon` block with a second `<h1>Coming Soon</h1>`. Breaks document outline and confuses screen readers. Also, `ProjectsPage.tsx` is `"use client"` purely to hold a `useState` filter that is **never used** — the filtered grid is fully commented out (lines 98–116). That ships the whole project dataset and React interactivity for nothing.

### 10. Duplicated ref-guard block in `Preloader.tsx`

Lines 57–61 and 64–69 are byte-identical. Harmless, but it's a tell that this file has been patched rather than edited.

### 11. Reduced-motion users lose all feedback on the preloader

`Preloader.tsx` checks `prefers-reduced-motion` and correctly skips GSAP — but the text is rendered through `TextPlugin`, which types characters into an initially **empty** `<span>`. In the reduced-motion branch you do set `textContent`, so this is handled — **however** `Homepage`'s GSAP entrance still runs, and `Homepage.module.css` + `Nav.module.css` have `@media (prefers-reduced-motion: reduce)` blocks while `Homepage.tsx`'s JS-driven floaters (`gsap.to(..., repeat: -1)`) do not. The DOM animation is guarded; the JS animation isn't.

### 12. Invisible mobile menu links stay keyboard-focusable

`.mobilePanel` collapses via `max-height: 0; overflow: hidden` — **no `visibility: hidden`, no `inert`, no `aria-hidden`**. Keyboard users on desktop can Tab into the hidden mobile menu's links (they exist in both `Nav` and `Homepage`). Add `visibility: hidden` + `inert` when closed, or conditionally render.

---

## 🟡 Performance

| Finding | Impact |
|---|---|
| `Homepage` renders its **own footer**, and `Footer` is also rendered by `Nav`-based pages — fine, but `Homepage` also renders its own nav (see #7) | ~90 duplicated JSX lines hydrated |
| `ProjectsPage` is `"use client"` with an unused `useState` and commented-out render | Full React island for static content |
| `ContactPage` is `"use client"` by necessity (form) — correct | — |
| GSAP is imported eagerly in `Preloader` **and** `Homepage` | ~70 KB parsed on the critical path before first paint |
| `logo_without_bg.PNG` is a **109 KB PNG** used at 36×36 | `next/image` re-encodes to WebP, so shipping is fine, but the source asset should be an SVG (~2 KB) — and the `.PNG` uppercase extension is non-standard |
| `logo.png.jpg` (27 KB) is unused | Delete |
| `public/{file,globe,next,vercel,window}.svg` are create-next-app scaffolding | Delete — 5 dead files |
| `src/app/page.module.css` (146 lines) is **never imported** | Delete |
| `split-type` in `package.json` | **Never imported anywhere.** Remove |
| `react-icons` (~20 MB unpacked) used for exactly 3 icons | `lucide-react` is already installed and is used for everything else; `lucide-react` has `Instagram`, `MessageCircle`, `Mail` |
| `lucide-react@1.23.0` | Suspicious version — lucide-react is at 0.4xx/0.5xx. Verify this isn't a typosquat or a stale fork |
| `src/app/favicon.ico` is **byte-identical to `logo_without_bg.PNG`** (md5 `bea609a6…`) | The browser tab icon is a PNG masquerading as `.ico`; some browsers ignore it. Generate a real multi-size favicon. |
| No `@next/bundle-analyzer`, no font `display: swap` | `Inter`/`JetBrains_Mono` default to swap — acceptable |

`npm audit --omit=dev`: **7 vulnerabilities (1 critical, 5 high)** via `next@16.2.10` → `postcss`, `sharp`, `source-map-js`. Upgrading to `next@16.4.4` clears them.

---

## 🟡 Accessibility

### Contrast — measured against `--background: #fafbfc`

| Token | Hex | Ratio | Verdict |
|---|---|---|---|
| `--text-primary` | `#0b0d12` | 18.76:1 | ✅ |
| `--text-secondary` | `#5b6472` | 5.77:1 | ✅ |
| `--primary` | `#3452ff` | 5.34:1 | ✅ |
| **`--text-tertiary`** | `#9aa2b1` | **2.48:1** | ❌ fails AA (needs 4.5) |
| **`--accent`** | `#06b6d4` | **2.34:1** | ❌ fails AA |

`--text-tertiary` is used as a literal text colour in **7 places**; `--accent` in 1. Both fail at every size below 24 px bold. Darken `--text-tertiary` to ~`#6b7383` (4.6:1) and stop using `--accent` for text.

### Other gaps

- **No skip link.** Sticky nav + 5 links on every page, no "skip to content".
- **Gradient text uses `color: transparent`** without a `@supports` fallback (5 files). Works in all current browsers, but if `background-clip: text` ever fails the text is **invisible**. Add `@supports not (background-clip: text)` fallback.
- **`aria-hidden="true"` on the preloader container** that also has `role="presentation"` — fine, but screen readers announce nothing while the page is scroll-locked, so SR users sit on a blank page for ~2.5 s. Skip the preloader for SR users.
- **Mobile menu buttons** correctly use `aria-expanded`, good.
- **Focus states** exist globally (`:focus-visible`) — good.
- **No `prefers-reduced-motion` guard on the GSAP floaters** (JS-driven, infinite `repeat: -1`).

---

## 🟡 SEO / metadata

| Item | Status |
|---|---|
| `/` metadata | ❌ **none** — inherits bare `"PrimeCodeStudio"` |
| `/about` metadata | ❌ **none** — confirmed `<title>PrimeCodeStudio</title>` in the running server |
| `/services`, `/projects`, `/contact`, legal | ✅ has title + description |
| `metadataBase` | ❌ absent |
| `openGraph` / `twitter` cards | ❌ **absent on every page** |
| `alternates.canonical` | ❌ absent |
| `robots.txt` | ❌ **404** |
| `sitemap.xml` | ❌ **404** |
| `manifest.webmanifest` | ❌ absent |
| Structured data (JSON-LD `Organization` / `LocalBusiness`) | ❌ absent |
| Title template (`%s \| PrimeCodeStudio`) | ❌ each page hardcodes its own suffix; `/` has none |
| `lang="en"` | ✅ |

For an agency site whose entire funnel is "someone Googles us", shipping with no OG tags, no sitemap, and **no title on the two most important pages** is the highest-ROI fix in this document after the security items.

---

## 🟢 Code quality & consistency

**Duplicate design-token systems.** `globals.css` defines `--card-bg / --card-border / --text-primary / --primary…`, while `Homepage.module.css` re-declares `:root` with a parallel set (`--surface / --border / --ink / --indigo / --muted / --canvas / --sky…`). The homepage therefore uses **different names for identical values**, and the two systems share zero tokens. Any global theme change silently updates every page except the homepage.

**Palette drift.** Five near-identical blues are in use: `#2563eb` (10×), `#1f38d6` (5×), `#3452ff` (4×), `#3b82f6` (3×), `#06b6d4` (4×). `Homepage.module.css` alone contains 15 unique hex literals. Consolidate onto `--primary` / `--primary-hover` / `--accent`.

**Nine responsive breakpoints** with no system: `375, 480, 640, 768, 860, 900, 992, 1000, 1080`. Pick three (e.g. 480 / 768 / 1024) and enforce them.

**Import style inconsistency.** `Homepage.tsx` uses relative imports (`./Homepage.module.css`), everywhere else uses `@/` aliases. Trailing semicolons are present in some files, absent in `AboutPage.tsx` / `Team.tsx`.

**Dead code inventory** (safe to delete, ~2,000 lines of noise removed):
- `src/app/page.module.css` (146 lines, unimported)
- `public/{file,globe,next,vercel,window}.svg`, `public/logo.png.jpg`
- `split-type`, `react-icons` dependencies
- Unused imports: `Layers` (Homepage), `Layers` (ServicesPage), `FaGlobe` (Footer), `ArrowUpRight` (ProjectsPage)
- Unused vars: `filtered` (ProjectsPage)
- `escapeHtml` (until you wire it up)
- The commented-out project grid in `ProjectsPage.tsx` (19 lines)
- The duplicate ref guard in `Preloader.tsx`

**No engineering guardrails:** no CI workflow (`.github` absent), no `test` script, no `not-found.tsx`, no `error.tsx`, no `loading.tsx`, no `.env.example`. For a contact form that depends on five env vars (`SMTP_HOST/PORT/USER/PASS/CONTACT_TO_EMAIL`), the absence of an `.env.example` guarantees the next deploy silently returns `500 "Email service is not configured yet"` — which is exactly what happened when I POSTed a valid payload.

**`npm run lint` exits 1** — 8 errors, 6 warnings. Errors are `react/no-unescaped-entities` (7) and `react-hooks/set-state-in-effect` (2). Both categories are trivial to clear.

**Malformed JSON returns 500, not 400.** `await request.json()` throws, falling into the generic catch. Client gets "Something went wrong" instead of "bad request"; logs fill with noise from scanners.

---

## Recommended order of work

**Ship-safe in one pass (≈half a day):**
1. Escape all interpolated fields in `route.ts` with the existing `escapeHtml`.
2. Fix `mob:` → `tel:+917304414905`.
3. Add `metadata` to `/` and `/about`; add `metadataBase` + title template in `layout.tsx`.
4. Delete inline nav from `Homepage.tsx`, render `<Nav />`.
5. Build the SSR-visible fix for the opacity-0 homepage.
6. Add rate limiting to `/api/contact`.

**Next pass (≈a day):**
7. `useBodyScrollLock` hook with counter; use everywhere.
8. `robots.ts`, `sitemap.ts`, `opengraph-image`, JSON-LD `Organization`.
9. Darken `--text-tertiary`, remove `--accent` as text colour.
10. Unify the two token systems onto `globals.css`.
11. Clear lint errors; add `.github/workflows/ci.yml` running `tsc && eslint && next build`.
12. Delete the dead-code inventory above.

**Backlog:**
13. Replace `react-icons` with `lucide-react` equivalents; drop `split-type`.
14. Add `not-found.tsx`, `error.tsx`, `loading.tsx`, `.env.example`.
15. Add `prefers-reduced-motion` guard to GSAP floaters; add skip link.
16. Upgrade `next` to ≥16.4.4 to clear the audit findings.
17. Consolidate the 9 breakpoints to 3.

---

## What's genuinely good

Worth saying explicitly, because the bug list above is long: the **information architecture is right**, the **copy is specific and non-generic** (rare for an agency site), the **hero dashboard mockup is a nice touch**, the **form has proper loading/success/error states with accessible markup**, **honeypot spam defence is implemented correctly**, **the honeypot field is positioned off-screen rather than `display:none`** (the right call), **`prefers-reduced-motion` is wired in three CSS modules**, and **`dangerouslySetInnerHTML` appears nowhere**. TypeScript strict mode passes clean. The foundation is solid — this is a polish-and-harden phase, not a rewrite.
