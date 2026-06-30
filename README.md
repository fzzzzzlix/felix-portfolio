# Felix Phan, Portfolio 2026

Two-page static portfolio for Felix Phan: a homepage covering positioning, snapshot, four pillars of work, about, and contact; plus a deep-dive speculative case study for Quán Nhà Haha (chặng Huế).

Primary positioning: Phát triển nội dung và Biên kịch (Creative Development & Scriptwriting), with a focus on truyền hình thực tế, branded storytelling, and nội dung social-first.

## Stack

- Vanilla HTML5, CSS3, minimal vanilla JS
- No frameworks, no bundlers, no build step
- Google Fonts via CDN (Cormorant Garamond, Source Serif 4, Inter)
- Mobile-first, breakpoints at 640px, 1024px, 1440px

## Folder structure

```
felix-portfolio/
├── index.html
├── case-studies/
│   └── quan-nha-haha.html
├── assets/
│   ├── css/style.css
│   └── js/main.js
├── content/
│   ├── content-pack.md       (source of truth for index.html)
│   └── qnh-case-study.md     (source of truth for QNH page)
├── images/                   (live image folder, .jpg)
├── docs/                     (optional, currently empty; CV link goes to Google Drive)
└── README.md
```

## How to run locally

Open `index.html` directly in a browser, or run a tiny static server:

```
python -m http.server 8000
```

Then visit:

```
http://localhost:8000
```

The server option is preferred (consistent paths, no CORS surprises with images).

## How to edit content

Treat the two markdown files in `content/` as the source of truth.

1. Edit `content/content-pack.md` for hero, scan, why-felix, four pillars, about, and contact copy.
2. Edit `content/qnh-case-study.md` for the QNH case study.
3. Apply the change to the matching HTML section. The HTML structure mirrors the markdown sections one-to-one.

Do not change factual claims (clients, awards, metrics) without updating the source markdown first.

## Image naming notes

All images live in `/images/` and currently use `.jpg`. Detect actual extensions before linking; do not assume.

Mapping in use:

| Slot                                | File                       |
|-------------------------------------|----------------------------|
| Hero portrait                       | hero-portrait.jpg          |
| QNH cover                           | qnh-Treatment.jpg          |
| Mùa Hạ Của Chúng Tôi                | film-yenhoa.jpg            |
| PNJ Mùa Cưới                        | film-pnj.jpg               |
| Podcast Sustainable Energy          | podcast-energy.jpg         |
| BUV TVC storyboard                  | TVC-Storyboard.jpg (reuse) |
| Hapacol TVC storyboard              | TVC-Storyboard.jpg (reuse) |
| MAGGI / Cleaning Frenzy storyboard  | maggi.jpg                  |
| VinFast × Kim Joo Yung              | ForArt.jpg                 |
| Gặp Nhau Cuối Năm                   | gnkn-casestudy.jpg         |
| V-Pop Folk × Western                | Folk-Western-vpop.jpg      |
| MAGGI Competitive                   | maggi.jpg                  |
| Gender Equality Magazine            | magazine-gender.jpg        |
| Patriotic Rap                       | placeholder div            |
| ForArt on-set                       | ForArt.jpg                 |
| Little Me exhibition                | Little-Me.jpg              |
| RMIT Student Council Social         | rmit-social.jpg            |
| Mien Bac Event                      | mbe.jpg                    |
| EMPACTS                             | placeholder div            |

When a unique image does not exist, use the `.image-placeholder` div pattern. Do not create broken `<img>` links.

## CV

The "Tải CV" buttons currently link to:

```
https://drive.google.com/file/d/1JGmUbvukte4Ae7J4_CgYWzE-6chPNrVc/view
```

If/when a local PDF is added at `docs/felix-phan-cv-vi.pdf`, swap the href in both `index.html` (three CV links) and `case-studies/quan-nha-haha.html` to the local path. All CV links must open in a new tab with `target="_blank" rel="noopener noreferrer"`.

## Speculative case study disclaimer

The QNH case study is a portfolio sample. It is not an official product of Yeah1, VCB DigiBank, VTV, Mango+, or Quán Nhà Haha. The page header, intro, and footer make this explicit. Do not edit the disclaimer copy without keeping that clarity.

## Banned wording (do not introduce)

- "Confidential"
- "Yeah1 × VCB 2026"
- "Ghi hình: Tháng 6, 2026"
- "tâm huyết"
- "khoảnh khắc WOW"
- "Kính mong được Quý công ty xem xét"
- "câu chuyện chân thật"
- "để ngẫm, để bàn luận, để ghi nhớ"
- Em-dash character

Spelling: "Quán Nhà Haha" (not HaHa, not HAHA). First-person: "tôi" (not "em"). No emoji.

## Deployment

Static-only. Drop the folder on any static host:

- Netlify: drag-and-drop the folder, or connect git and set publish dir to `/`.
- Vercel: import as static project, no build command.
- GitHub Pages: push to `main`, enable Pages on root.
- Cloudflare Pages: connect repo, build command empty, output dir `/`.

No environment variables, no secrets, no API calls.

## QA checklist

Run through these before shipping:

**Structural**
- [ ] `index.html` opens; sticky nav works; mobile toggle opens and closes
- [ ] `case-studies/quan-nha-haha.html` opens; TOC pills scroll horizontally on mobile
- [ ] All in-page anchors scroll to the target
- [ ] All image links resolve (no 404 in DevTools network tab)
- [ ] "Xem full case study →" goes from homepage to QNH page
- [ ] "← Quay lại Portfolio" goes back

**Content**
- [ ] "Creative Development & Scriptwriting" appears as the primary role
- [ ] "Story Architect" does not appear as the main role (only as a secondary signature in About)
- [ ] No banned wording present (see list above)
- [ ] No em-dash character
- [ ] QNH page is labelled speculative, with the proper footer

**Responsive**
- [ ] 375px width: no horizontal scroll, cards stack, text readable
- [ ] 640, 1024, 1440px breakpoints look intentional

**Accessibility**
- [ ] Skip link works (Tab from address bar)
- [ ] One `<h1>` per page; heading hierarchy clean
- [ ] All `<img>` tags have alt text
- [ ] Focus indicators visible
- [ ] Contrast passes WCAG AA on body and UI text

**Print**
- [ ] Cmd/Ctrl+P on `index.html` produces a clean PDF preview
- [ ] Nav, buttons, and images hidden in print

**Performance**
- [ ] No external JS libraries
- [ ] No tracking, no embedded iframes
- [ ] Non-hero images use `loading="lazy"`
