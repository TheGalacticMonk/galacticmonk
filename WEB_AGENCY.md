# Web agency team

This repository includes a project-scoped Codex agency: an accountable lead in
`AGENTS.md` and eleven specialists in `.codex/agents/`. The lead selects the
smallest useful team, delegates bounded work, and synthesizes one coherent
client-facing result.

## Quick start

Ask naturally and name the disciplines you want involved. For example:

```text
Act as my web agency. Use strategy_research, ux_architect, brand_art_director,
and content_seo to turn this brief into a conversion-focused site concept.
Wait for their work, reconcile tradeoffs, and give me one recommended direction.
```

```text
Build the approved homepage. Have frontend_engineer implement it, then have
quality_experience and performance_seo_auditor independently review the result.
Fix verified issues and report the evidence.
```

```text
Prepare this site for launch. Delegate parallel read-only reviews to
security_privacy, quality_experience, performance_seo_auditor, and
devops_reliability. Return one prioritized go/no-go report.
```

Codex can also select roles from the brief because `AGENTS.md` contains the
agency routing rules. Explicitly request subagents or parallel agents when you
want delegation in the current run.

## Team roster

| Role | Owns | Typical output |
| --- | --- | --- |
| `strategy_research` | Business, audience, positioning, requirements | Decision-ready brief |
| `ux_architect` | Structure, journeys, flows, states | Sitemap and UX specification |
| `brand_art_director` | Visual thesis and system | Art direction and design rules |
| `content_seo` | Messaging, copy, content model, search intent | Page content and SEO brief |
| `frontend_engineer` | UI implementation and frontend behavior | Tested frontend code |
| `backend_integrations` | Data, APIs, auth, CMS, commerce, services | Tested server/integration code |
| `quality_experience` | Functional, responsive, accessibility QA | Reproducible findings |
| `performance_seo_auditor` | Speed, rendering, crawlability | Evidence-backed audit |
| `security_privacy` | Threats, sensitive data, consent | Prioritized risk review |
| `analytics_growth` | Events, funnels, experiments, learning | Measurement specification |
| `devops_reliability` | CI/CD, environments, monitoring, launch | Launch and rollback plan |

## Recommended engagements

- New marketing site: strategy, UX, art direction, content/SEO, frontend,
  quality, performance, analytics, and launch review.
- Web application: strategy, UX, frontend, backend, security, quality,
  performance, analytics, and reliability.
- Redesign: strategy and analytics audit first; then UX, art direction, content,
  implementation, and independent verification.
- Focused feature: frontend and/or backend implementation plus the one or two
  review roles relevant to its risk.
- Launch audit: quality, performance/SEO, security/privacy, analytics, and
  reliability working in parallel, followed by a single prioritized report.

The default concurrency limit is three subagents. This keeps reviews parallel
while reducing edit collisions. The lead should run overlapping code changes in
sequence and reserve parallel work for independent investigation or review.
