/**
 * caseStudies.js — full case-study content for the three flagship AI projects.
 * Content is carried faithfully, section by section, from the source project
 * docs. Each study renders through CaseStudyPage's section renderer, so the
 * page reads like the doc — hero → why → architecture → stages → deep dives
 * → decisions → results → next.
 */

export const CASE_STUDIES = [
  // ────────────────────────────────────────────────────────────────────
  // 01 · AGENTIC SOC TRIAGE & INVESTIGATION AGENT
  // ────────────────────────────────────────────────────────────────────
  {
    slug: 'agentic-soc',
    number: '01',
    accent: '#FF6B1A',
    accentName: 'amber',
    gradient: 'linear-gradient(135deg, #FF6B1A 0%, #2a0a00 100%)',
    badge: 'AGENTIC AI · SECURITY OPERATIONS',
    title: 'Agentic SOC Triage & Investigation Agent',
    shortTitle: 'Agentic SOC Agent',
    oneLiner:
      'A multi-agent system that autonomously triages and investigates security alerts against Google SecOps/Chronicle, renders true/false-positive verdicts with confidence and reasoning, and keeps a human in the loop for every consequential decision.',
    stack: ['Google ADK', 'Gemini', 'MCP', 'A2A Protocol', 'Cloud Run', 'Python'],
    heroStats: [
      { v: '20–30 min', l: 'manual triage, automated away' },
      { v: '0.87', l: 'verdict confidence (repr. case)' },
      { v: '9', l: 'tool calls per investigation' },
      { v: '74s', l: 'wall-clock per case' },
    ],
    sections: [
      {
        kind: 'prose',
        label: 'Why this project exists',
        heading: 'Analyst attention is the most expensive resource in the SOC.',
        paragraphs: [
          'Security operations centers drown in alert volume. A Tier-1 analyst spends 20–30 minutes manually investigating a single alert — pulling SIEM context, enriching indicators against threat intelligence, reconstructing process trees, and finally writing a disposition. Most of those alerts turn out to be false positives, which means the most expensive resource in the SOC (analyst attention) is spent overwhelmingly on noise.',
          'This project explores the pattern Google Cloud calls the "agentic SOC": specialized LLM agents that perform the mechanical portions of triage and investigation autonomously, escalating to a human only with a fully assembled case file and a recommended verdict. The goal is not to remove the analyst — it is to move the analyst from doing investigations to reviewing them.',
        ],
      },
      {
        kind: 'diagram',
        label: 'System architecture',
        heading: 'A hierarchical coordinator, not a monolith.',
        caption:
          'The system follows a hierarchical coordinator/sub-agent pattern rather than a single monolithic agent. Decomposition keeps each agent’s prompt small and testable, limits the blast radius of a bad tool call, and lets each stage be evaluated independently.',
        diagram: {
          height: 660,
          nodes: [
            { id: 'intake', x: 70, y: 30, w: 250, title: 'Alert intake', sub: 'SecOps alert webhook / poll', type: 'io' },
            { id: 'coord', x: 400, y: 30, w: 250, title: 'Coordinator agent', sub: 'owns the investigation lifecycle', type: 'agent' },
            { id: 'enrich', x: 70, y: 200, w: 250, title: 'Enrichment agent', sub: 'observables → TI context', type: 'agent' },
            { id: 'invest', x: 400, y: 200, w: 250, title: 'Investigation agent', sub: 'templated SIEM queries', type: 'agent' },
            { id: 'dispo', x: 720, y: 200, w: 250, title: 'Disposition agent', sub: 'verdict + reasoning + ATT&CK', type: 'agent' },
            { id: 'secops', x: 70, y: 380, w: 250, title: 'Google SecOps / Chronicle', sub: 'SIEM search · UDM · entities', type: 'store' },
            { id: 'intel', x: 400, y: 380, w: 250, title: 'Threat intelligence', sub: 'IOC reputation · actor context', type: 'store' },
            { id: 'verdict', x: 720, y: 380, w: 250, title: 'Verdict: TP / FP', sub: 'confidence + reasoning + ATT&CK', type: 'io' },
            { id: 'hitl', x: 720, y: 540, w: 250, title: 'Human-in-the-loop gate', sub: 'approve · reject · override', type: 'gate' },
            { id: 'closed', x: 400, y: 540, w: 250, title: 'Case closed / escalated', sub: 'with full audit trail', type: 'io' },
          ],
          edges: [
            { from: 'intake', to: 'coord' },
            { from: 'coord', to: 'enrich' },
            { from: 'coord', to: 'invest' },
            { from: 'coord', to: 'dispo' },
            { from: 'enrich', to: 'secops', label: 'MCP' },
            { from: 'enrich', to: 'intel', label: 'MCP' },
            { from: 'invest', to: 'secops', label: 'MCP' },
            { from: 'dispo', to: 'verdict' },
            { from: 'verdict', to: 'hitl' },
            { from: 'hitl', to: 'closed', label: 'approved' },
            { from: 'hitl', to: 'coord', label: 'rejected', dashed: true },
          ],
        },
      },
      {
        kind: 'stages',
        label: 'The agents',
        heading: 'Four agents, each small enough to test.',
        items: [
          {
            title: 'Coordinator agent',
            text: 'Owns the investigation lifecycle. Receives the raw alert, decides which sub-agents to invoke and in what order, assembles their outputs into a case file, and enforces the stopping condition (budget of tool calls, wall-clock limit, or confident verdict). Built as an ADK LlmAgent with sub-agents registered as tools.',
          },
          {
            title: 'Enrichment agent',
            text: 'Extracts observables from the alert (IPs, domains, hashes, user principals, process names) and enriches each against threat intelligence through MCP tool calls. Output is a normalized enrichment record: reputation, first-seen/last-seen, associated campaigns, and a per-indicator risk annotation.',
          },
          {
            title: 'Investigation agent',
            text: 'Runs targeted SIEM queries through the SecOps MCP server to reconstruct context around the alert: what else the principal did in the surrounding window, sibling process activity, authentication anomalies, and lateral-movement indicators. Queries are generated from a constrained set of templates rather than free-form, which keeps them auditable and prevents runaway search.',
          },
          {
            title: 'Disposition agent',
            text: 'Consumes the assembled case file and produces the final structured verdict: true_positive | false_positive, a confidence score, a plain-language reasoning summary an analyst can skim in under a minute, mapped MITRE ATT&CK technique IDs, and a recommended next action. Output is schema-validated before it is accepted.',
          },
        ],
      },
      {
        kind: 'prose',
        label: 'Tool layer',
        heading: 'MCP against real security products.',
        paragraphs: [
          'Tool access runs through the open-source google/mcp-security servers rather than hand-rolled API clients. This mirrors how Google’s own agentic SOC reference architecture wires agents to products, and it means the agent’s tool surface is the same one exposed to any MCP-compatible client. Google SecOps (Chronicle) serves UDM search, alert retrieval, and entity lookups; Google Threat Intelligence serves IOC reputation and threat actor / campaign context.',
          'Tool responses are treated as untrusted input. Before any tool output re-enters an agent’s context, it passes through an injection-screening step — a security agent that can be prompt-injected by attacker-controlled log content is worse than no agent at all.',
        ],
      },
      {
        kind: 'terminal',
        label: 'The case file',
        heading: 'Every investigation terminates in one structured artifact.',
        filename: 'verdict.json',
        code: `{
  "alert_id": "de_a8f3...",
  "verdict": "false_positive",
  "confidence": 0.87,
  "attack_techniques": ["T1078", "T1110.003"],
  "reasoning": "Authentication burst originates from a known
    corporate NAT egress; the principal's activity window
    matches their historical baseline; no follow-on activity
    consistent with credential abuse was found in the
    ±30 minute window.",
  "evidence": [ "...structured refs to SIEM query results..." ],
  "recommended_action": "close_benign",
  "telemetry": { "tool_calls": 9, "tokens": 41230, "wall_clock_s": 74 }
}`,
        after:
          'The ATT&CK mapping is produced by the disposition agent constrained to a curated technique vocabulary, so downstream reporting can aggregate investigations by technique without free-text drift.',
      },
      {
        kind: 'prose',
        label: 'Human-in-the-loop',
        heading: 'No verdict acts on its own.',
        paragraphs: [
          'The HITL gate sits between the disposition agent and any state change: the reviewer sees the verdict, confidence, reasoning, and the underlying evidence, and either approves, rejects (which re-queues the investigation with reviewer feedback attached), or overrides. Approval latency and override rate are recorded — override rate is the single most honest metric of whether the system deserves more autonomy over time.',
        ],
      },
      {
        kind: 'prose',
        label: 'Evaluation',
        heading: 'Agentic systems fail quietly, so evaluation is built in.',
        paragraphs: [
          'The eval harness runs the full pipeline against a labeled alert set (benign and malicious scenarios with known ground-truth dispositions) and reports verdict accuracy, false-positive and false-negative rates, per-stage failure attribution (did enrichment miss an indicator, or did disposition reason badly over good evidence), and cost/latency percentiles. Every prompt or model change runs the suite before it ships. The design principle comes straight from how production teams operate agent fleets: measure decision quality, not just time saved.',
        ],
      },
      {
        kind: 'cards',
        label: 'Guardrails',
        heading: 'Four controls run on every investigation.',
        items: [
          {
            title: 'Injection screening',
            text: 'Scans tool responses for instruction-like content before they re-enter agent context; flagged content is quarantined and summarized out-of-band rather than passed through verbatim.',
          },
          {
            title: 'Output schema validation',
            text: 'Rejects any disposition that does not parse against the verdict schema — a malformed verdict is a failed investigation, never a "best effort" one.',
          },
          {
            title: 'Budget enforcement',
            text: 'Caps tool calls, tokens, and wall-clock per investigation, because an agent loop that cannot terminate is an availability incident.',
          },
          {
            title: 'Audit logging',
            text: 'Records every prompt, tool call, tool response, and intermediate conclusion, so any verdict can be reconstructed after the fact — the same property regulators expect of automated decisioning in banking, applied to security.',
          },
        ],
      },
      {
        kind: 'prose',
        label: 'Deployment',
        heading: 'Independent services, independent rollbacks.',
        paragraphs: [
          'The development loop follows the documented ADK path: iterate locally with adk web, containerize, deploy to Cloud Run. Agents communicate over the A2A protocol, which keeps the coordinator and sub-agents deployable as independent services — a sub-agent can be scaled, updated, or rolled back without touching the rest of the system. Telemetry (token consumption, per-stage latency, tool-call counts) is emitted per investigation, because token cost is a first-class production concern in agentic systems: a single deep investigation can consume tens of millions of tokens if left unbudgeted.',
        ],
      },
      {
        kind: 'decisions',
        label: 'Design decisions & tradeoffs',
        heading: 'What was chosen, and what it cost.',
        items: [
          {
            title: 'Multi-agent over single-agent',
            text: 'A single agent with all tools is simpler but unevaluable — when it fails you cannot tell which capability failed. Separate stages cost orchestration complexity and buy per-stage evals, smaller prompts, and independent iteration.',
          },
          {
            title: 'Template-constrained SIEM queries over free-form generation',
            text: 'Free-form query generation is more flexible and occasionally brilliant, but unauditable and capable of pathological scans. Templates cover the high-value investigation patterns and keep every query explainable.',
          },
          {
            title: 'Verdict-with-reasoning over verdict-only',
            text: 'The reasoning summary costs tokens but is the entire product: an unexplained verdict saves the analyst nothing, because they must redo the investigation to trust it.',
          },
          {
            title: 'HITL as default, autonomy as earned',
            text: 'The system is designed so autonomy can expand per alert-category as override rates prove out, rather than being granted globally on day one.',
          },
        ],
      },
      {
        kind: 'next',
        label: 'What I’d build next',
        items: [
          'Detection-engineering companion agent that proposes and synthetically validates new detection rules from investigation patterns',
          'Feedback-loop fine-tuning of the disposition stage on reviewer overrides',
          'Model Armor integration to replace the hand-rolled injection screening with the managed control',
          'Small-multiples evaluation across Gemini model tiers to quantify the cost/accuracy frontier per stage',
        ],
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // 02 · AI JOB APPLICATION PIPELINE
  // ────────────────────────────────────────────────────────────────────
  {
    slug: 'ai-job-pipeline',
    number: '02',
    accent: '#00FFB2',
    accentName: 'electric',
    gradient: 'linear-gradient(135deg, #00FFB2 0%, #002a1a 100%)',
    badge: 'LLM WORKFLOW · STRUCTURED OUTPUTS',
    title: 'AI Job Application Pipeline',
    shortTitle: 'AI Job Pipeline',
    oneLiner:
      'A multi-step agent workflow that scrapes role postings, retrieves and analyzes requirements, tailors application documents with an LLM under strict schema validation, and holds every application behind a human review gate — reducing per-application effort from hours to minutes.',
    stack: ['Python', 'Apify', 'Claude API', 'Structured Outputs', 'HITL Review'],
    heroStats: [
      { v: '1–2 h', l: 'manual effort per role, before' },
      { v: '< 10 min', l: 'review time per role, after' },
      { v: '100%', l: 'applications human-approved' },
      { v: '0', l: 'unsupported claims allowed' },
    ],
    sections: [
      {
        kind: 'prose',
        label: 'Why this project exists',
        heading: 'Applying well is a document-engineering problem.',
        paragraphs: [
          'Applying well to competitive engineering roles is a document-engineering problem: every strong application requires reading a posting closely, mapping its requirements onto real experience, and producing a tailored resume without fabricating anything. Done honestly, that is 1–2 hours per role. Done at volume, it is either a full-time job or it degrades into spray-and-pray.',
          'This pipeline automates the mechanical layers — discovery, requirement extraction, tailoring drafts, tracking — while deliberately refusing to automate the judgment layer. Nothing is ever submitted by the system. The human gate is not a compromise; it is the design center, and building it taught me more about production LLM system design than the automation did.',
        ],
      },
      {
        kind: 'diagram',
        label: 'System architecture',
        heading: 'Nine stages, one non-negotiable gate.',
        caption:
          'Discovery through tracking, with schema validation at every LLM boundary and a human review gate that nothing bypasses.',
        diagram: {
          height: 560,
          nodes: [
            { id: 'disc', x: 40, y: 30, w: 210, title: 'Job discovery', sub: 'Apify scrapers, scheduled', type: 'io' },
            { id: 'norm', x: 300, y: 30, w: 210, title: 'Normalization & dedup', sub: 'fuzzy title+company matching', type: 'agent' },
            { id: 'extract', x: 560, y: 30, w: 210, title: 'Requirement extraction', sub: 'Claude · structured output', type: 'agent' },
            { id: 'fit', x: 820, y: 30, w: 150, title: 'Fit scoring', sub: 'vs experience profile', type: 'agent' },
            { id: 'tailor', x: 820, y: 230, w: 150, title: 'Tailoring agent', sub: 'constrained edits only', type: 'agent' },
            { id: 'validate', x: 560, y: 230, w: 210, title: 'Schema & fact validation', sub: 'mechanical diff vs profile', type: 'agent' },
            { id: 'gate', x: 300, y: 230, w: 210, title: 'Human review gate', sub: 'approve · edit · reject', type: 'gate' },
            { id: 'package', x: 40, y: 230, w: 210, title: 'Application package', sub: 'submitted manually, always', type: 'io' },
            { id: 'track', x: 40, y: 430, w: 210, title: 'Tracking & outcome log', sub: 'instrumented funnel', type: 'store' },
          ],
          edges: [
            { from: 'disc', to: 'norm' },
            { from: 'norm', to: 'extract' },
            { from: 'extract', to: 'fit' },
            { from: 'fit', to: 'tailor' },
            { from: 'tailor', to: 'validate' },
            { from: 'validate', to: 'gate' },
            { from: 'gate', to: 'package', label: 'approve' },
            { from: 'gate', to: 'tailor', label: 'edit / reject', dashed: true },
            { from: 'package', to: 'track' },
          ],
        },
      },
      {
        kind: 'stages',
        label: 'The pipeline',
        heading: 'Stage by stage.',
        items: [
          {
            title: 'Discovery',
            text: 'Apify actors scrape postings from multiple boards on a schedule. Raw postings land in a normalization layer that dedupes cross-posted roles (same role, three boards, slightly different text) by fuzzy title+company matching before anything reaches the LLM — paying tokens to analyze the same job three times is the kind of waste that only shows up when you meter it.',
          },
          {
            title: 'Requirement extraction',
            text: 'Each posting is converted by Claude into a structured requirements record: must-have skills, nice-to-haves, seniority signals, domain keywords, and disqualifiers. The prompt requests JSON only; the parser strips code fences and validates against a schema, with one repair retry before the posting is flagged for manual handling. Extraction quality is the foundation of everything downstream, so this stage has its own small labeled test set of postings with hand-written expected extractions.',
          },
          {
            title: 'Fit scoring',
            text: 'Extracted requirements are scored against a canonical experience profile (a structured document of real skills, projects, and metrics — the single source of truth the tailoring stage is allowed to draw from). Low-fit roles are dropped before tailoring, which both saves cost and keeps the pipeline honest: the system cannot tailor toward requirements the profile cannot support.',
          },
          {
            title: 'Tailoring under constraint',
            text: 'The tailoring agent produces a role-specific resume variant through constrained edits: it may reorder, re-emphasize, and rephrase content from the experience profile, and it may not introduce skills, employers, metrics, or claims absent from the profile. The constraint is enforced two ways — in the prompt, and in a post-generation fact check that diffs every skill and metric in the output against the profile and rejects drafts containing unsupported claims. This was the hardest part of the system to get right and the most important: an LLM asked to "tailor" will helpfully invent, and the guard has to be mechanical, not vibes.',
          },
          {
            title: 'Human review gate',
            text: 'Every approved-fit application renders as a review package: the posting, the extraction, the fit rationale, the tailored draft with edits highlighted against the base resume. Nothing proceeds without explicit approval, and edits made during review flow back as feedback examples for the tailoring prompt. Submission itself stays fully manual by design.',
          },
          {
            title: 'Tracking',
            text: 'Approved applications are logged with role metadata, variant used, and eventual outcome, which turns the job search into an instrumented funnel — which variants and framings actually convert to screens becomes measurable instead of anecdotal.',
          },
        ],
      },
      {
        kind: 'prose',
        label: 'Structured output discipline',
        heading: 'Free-text is never an interface between stages.',
        paragraphs: [
          'Every LLM boundary in the pipeline is schema-typed. Free-text is allowed exactly once — inside the reasoning fields humans read — and never as an interface between stages. In practice this meant: JSON-only response contracts, defensive parsing (fence stripping, single repair retry, then quarantine), schema validation with explicit failure states, and treating a validation failure as a pipeline event to inspect rather than an exception to swallow. The reliability difference between "LLM returns prose we regex" and "LLM returns validated records" is the difference between a demo and a system.',
        ],
      },
      {
        kind: 'prose',
        label: 'Honesty as an architectural property',
        heading: 'Alignment has to be engineered, not intended.',
        paragraphs: [
          'The most transferable lesson: alignment between what a system claims and what it does has to be engineered, not intended. Three mechanisms carry it here — the canonical experience profile as the only permitted content source, the mechanical fact-diff on every draft, and the human gate as the final authority. The same three-layer shape (constrained source of truth, mechanical validation, human approval on consequential output) is exactly the pattern production agentic systems in regulated domains converge on.',
        ],
      },
      {
        kind: 'prose',
        label: 'Results',
        heading: 'Hours to minutes — with quality up, not down.',
        paragraphs: [
          'Per-application effort dropped from roughly 1–2 hours to under 10 minutes of review time, while application quality went up rather than down, because every draft is grounded in the same vetted profile instead of late-night ad-hoc editing. The instrumented funnel surfaced which resume framings converted to recruiter screens, feeding directly back into how the base profile is written.',
        ],
      },
      {
        kind: 'next',
        label: 'What I’d build next',
        items: [
          'Retrieval over past review edits so the tailoring agent learns preferences without retraining',
          'An evaluation harness scoring extraction and tailoring stages continuously',
          'A company-research enrichment stage that assembles interview-prep briefs for approved applications',
        ],
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // 03 · CASSETTEIQ — ANALYTICS PLATFORM WITH AN INTERNAL AI GATEWAY
  // ────────────────────────────────────────────────────────────────────
  {
    slug: 'cassetteiq',
    number: '03',
    accent: '#7C5CFC',
    accentName: 'violet',
    gradient: 'linear-gradient(135deg, #7C5CFC 0%, #1a0033 100%)',
    badge: 'AI PLATFORM · ANALYTICS',
    title: 'CassetteIQ — Analytics Platform with an Internal AI Gateway',
    shortTitle: 'CassetteIQ AI Gateway',
    oneLiner:
      'An internal analytics application for ERP inventory data — FastAPI backend, React frontend — built around a centralized AI gateway that handles model routing, request authentication, and usage logging for every LLM-powered feature, so intelligence is a platform capability rather than a per-feature integration.',
    stack: ['FastAPI', 'React (Vite)', 'T-SQL / ERP data', 'LLM Gateway "Wendy"'],
    heroStats: [
      { v: '1', l: 'gateway for every LLM call' },
      { v: 'N → 1', l: 'model swap: call sites → config' },
      { v: '2', l: 'model providers routed' },
      { v: '100%', l: 'requests logged & attributed' },
    ],
    sections: [
      {
        kind: 'prose',
        label: 'Why this project exists',
        heading: 'Rich data, nearly unusable for the people who need it.',
        paragraphs: [
          'Inventory and operations data in ERP systems (Acumatica, Radius) is rich and nearly unusable for the people who need it daily: answering "which cassette SKUs are trending toward stockout in the Midwest DCs" means either knowing SQL or filing a ticket and waiting. CassetteIQ closes that gap two ways — conventional analytics views for the known questions, and natural-language querying for the long tail.',
          'The more interesting engineering story is the second-order decision: rather than wiring LLM calls directly into each feature, all model access was centralized behind an internal gateway. That one decision is what turned a chat feature into an AI platform.',
        ],
      },
      {
        kind: 'diagram',
        label: 'System architecture',
        heading: 'One governed data surface, one model-access layer.',
        caption:
          'Dashboards and the NL-query path read from the same governed SQL views; every LLM request flows through the Wendy gateway.',
        diagram: {
          height: 620,
          nodes: [
            { id: 'fe', x: 375, y: 30, w: 250, title: 'React frontend', sub: 'dashboards + NL query', type: 'io' },
            { id: 'api', x: 375, y: 190, w: 250, title: 'FastAPI backend', sub: 'typed services', type: 'agent' },
            { id: 'an', x: 40, y: 190, w: 250, title: 'Analytics services', sub: 'inventory · trends · reports', type: 'agent' },
            { id: 'db', x: 40, y: 370, w: 250, title: 'ERP data', sub: 'T-SQL views · SSRS lineage', type: 'store' },
            { id: 'wendy', x: 710, y: 190, w: 250, title: 'Wendy — AI gateway', sub: 'routing · auth · logging', type: 'gate' },
            { id: 'm1', x: 575, y: 370, w: 190, title: 'Model provider A', sub: 'capability tier mapped', type: 'store' },
            { id: 'm2', x: 790, y: 370, w: 190, title: 'Model provider B', sub: 'swap in config, not code', type: 'store' },
            { id: 'log', x: 575, y: 500, w: 190, title: 'Usage & audit log', sub: 'cost ledger + audit trail', type: 'store' },
            { id: 'auth', x: 790, y: 500, w: 190, title: 'Auth & policy layer', sub: 'rate limits · token budgets', type: 'store' },
          ],
          edges: [
            { from: 'fe', to: 'api' },
            { from: 'api', to: 'an' },
            { from: 'an', to: 'db' },
            { from: 'api', to: 'wendy' },
            { from: 'wendy', to: 'm1' },
            { from: 'wendy', to: 'm2' },
            { from: 'wendy', to: 'log' },
            { from: 'wendy', to: 'auth' },
          ],
        },
      },
      {
        kind: 'stages',
        label: 'The platform',
        heading: 'Analytics core + natural-language querying.',
        items: [
          {
            title: 'Analytics core',
            text: 'The backend exposes inventory analytics as typed services over a curated set of SQL views — the same views that previously fed SSRS reports, restructured so that both classic dashboards and the NL-query path read from one governed data surface instead of two divergent ones. The frontend is a React/Vite application with dashboard modules for inventory position, movement trends, and exception reporting.',
          },
          {
            title: 'Natural-language querying',
            text: 'Users ask questions in plain language; the system translates them into SQL against the governed views — never against raw tables — executes, and returns results with a plain-language summary. Constraining generation to the view layer bounds what a generated query can touch, keeps business-logic definitions (what counts as "available inventory") in exactly one place, and makes every generated query reviewable against a small, known schema.',
          },
        ],
      },
      {
        kind: 'cards',
        label: 'The AI gateway ("Wendy")',
        heading: 'Four concerns owned once, so no feature has to.',
        intro:
          'Every LLM request in the system — NL query translation, result summarization, report narration — flows through one internal service.',
        items: [
          {
            title: 'Model routing',
            text: 'Features request a capability tier, not a vendor model. The gateway maps tiers to concrete models and providers, which means model upgrades, provider swaps, and cost rebalancing happen in one config, not across N call sites. During development this allowed switching the NL-query path between models to compare accuracy and cost with zero feature-code changes.',
          },
          {
            title: 'Request authentication & policy',
            text: 'Callers authenticate to the gateway; the gateway holds the provider credentials. Feature code never sees an API key, and per-caller policy (rate limits, allowed capability tiers, max token budgets) is enforced centrally.',
          },
          {
            title: 'Usage logging',
            text: 'Every request logs caller, feature, capability tier, model, token counts, latency, and outcome. This produced the two artifacts every AI platform eventually needs: a cost ledger answering "what is this feature actually costing us," and an audit trail answering "what did the model see and say" for any given interaction.',
          },
          {
            title: 'Failure discipline',
            text: 'Timeouts, retries with backoff, and provider-failure fallbacks live in the gateway once, instead of being reimplemented with varying quality in every feature.',
          },
        ],
        outro:
          'The pattern is deliberately the same one large platforms converge on — a centralized model-access layer with routing, policy, and telemetry — scaled to internal-tool size. Building it small taught the architecture; the concerns are identical at any scale, and it maps directly onto what larger organizations call a foundational AI platform for agent and feature development.',
      },
      {
        kind: 'decisions',
        label: 'Design decisions & tradeoffs',
        heading: 'What was chosen, and what it cost.',
        items: [
          {
            title: 'Gateway over direct integration',
            text: 'The gateway costs an extra hop and an extra service to run. It buys single-point credential custody, portfolio-wide cost visibility, provider portability, and one place to add guardrails — a trade that pays for itself the first time a model needs swapping or a bill needs explaining.',
          },
          {
            title: 'Views-only SQL generation over schema-wide generation',
            text: 'Whole-schema text-to-SQL demos better and fails worse. The governed-view constraint reduced generation errors substantially, made failures legible (the model can only misuse a small vocabulary), and kept semantics owned by the data layer rather than the prompt.',
          },
          {
            title: 'Summaries with the data, never instead of it',
            text: 'Every NL answer returns the actual result set alongside the narrative, because a summary a user cannot verify against rows trains them to either distrust the feature or — worse — over-trust it.',
          },
        ],
      },
      {
        kind: 'prose',
        label: 'Results',
        heading: 'From ticket-and-wait to self-serve.',
        paragraphs: [
          'The project shipped as an internal tool and was presented in a live project review. Operationally it collapsed the report-request loop for covered question types from ticket-and-wait to self-serve, and the gateway’s usage ledger made LLM feature cost a visible, managed number rather than a surprise. Architecturally it left behind a reusable pattern: any future AI feature in the platform starts with auth, routing, logging, and failure handling already solved.',
        ],
      },
      {
        kind: 'next',
        label: 'What I’d build next',
        items: [
          'Semantic-layer expansion so the NL path covers more question families',
          'Per-feature evaluation sets scoring query-generation accuracy against known-good SQL',
          'Response caching keyed on normalized questions to cut repeat-query cost',
          'Guardrail middleware in the gateway (input screening, output schema enforcement) so every current and future feature inherits protections centrally',
        ],
      },
    ],
  },
]

export const getCaseStudy = (slug) => CASE_STUDIES.find((c) => c.slug === slug)
