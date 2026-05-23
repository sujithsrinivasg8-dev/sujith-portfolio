import ExpandedMask from './ExpandedMask'
import ReelCarousel from './ReelCarousel'

/**
 * Industry-standard project cards based on Sujith's actual experience.
 * Each maps to real work but framed as a portfolio case study.
 */

const PROJECTS = [
  {
    badge: 'FINTECH · PNC BANK · 2026',
    title: 'Real-time fraud detection at 15K TPS.',
    thumbBg: 'linear-gradient(135deg, #FF6B1A 0%, #2a0a00 100%)',
    summary:
      'AI-powered fraud detection engine analyzing millions of financial transactions daily using RAG-based LLM workflows and ML classification — cut detection latency 40%.',
    stack: ['Python', 'scikit-learn', 'RAG', 'LangChain', 'Kafka', 'AWS Lambda', 'Spring Boot'],
    metrics: [
      { v: '15K+', l: 'TPS sustained' },
      { v: '< 100ms', l: 'detection p95' },
      { v: '−40%', l: 'latency reduction' },
      { v: '99.9%', l: 'availability SLA' },
    ],
    problem:
      'PNC needed sub-second fraud decisioning across 15K+ live transactions/sec without false-positive spikes, on a stack that could justify each rejection to compliance.',
    approach: [
      'Designed event-driven Kafka pipeline ingesting transaction events from multiple core systems',
      'Layered ML classifier (scikit-learn) for fast anomaly scoring + RAG-based LLM layer for contextual reasoning on edge cases',
      'Built feature store on DynamoDB caching user behavior signals with sub-10ms reads',
      'Wired full observability: Prometheus metrics, Grafana dashboards, X-Ray traces, ELK for audit logs',
    ],
    impact: [
      'Reduced fraud detection latency by 40% (from ~250ms → ~150ms p95)',
      'Improved anomaly recall on edge cases by combining ML + LLM reasoning',
      'Maintained 99.9% availability under peak transaction surges',
      'Provided audit-grade explainability for every rejection',
    ],
  },
  {
    badge: 'FINTECH · MICROSERVICES',
    title: 'Event-driven transaction backbone.',
    thumbBg: 'linear-gradient(135deg, #7C5CFC 0%, #1a0033 100%)',
    summary:
      'Event-driven microservices architecture handling 10K+ events/sec across 15+ downstream services with fault tolerance and zero data loss.',
    stack: ['Java 17', 'Spring Boot', 'Apache Kafka', 'AWS Kinesis', 'EKS', 'Resilience4j'],
    metrics: [
      { v: '10K+', l: 'events/sec' },
      { v: '15+', l: 'downstream svcs' },
      { v: '+35%', l: 'throughput gain' },
      { v: '0', l: 'data-loss events' },
    ],
    problem:
      'Legacy synchronous integrations were buckling. Needed an event backbone that decoupled producers from consumers and survived partial failure.',
    approach: [
      'Architected Kafka topics with proper partitioning strategy keyed on customer ID',
      'Adopted outbox pattern + idempotency keys to guarantee exactly-once semantics',
      'Used AWS Kinesis for cross-region replication and DR',
      'Wrapped every downstream call in Resilience4j circuit breakers with exponential backoff',
      'Deployed on EKS with horizontal pod autoscaling triggered by Kafka consumer lag',
    ],
    impact: [
      'Sustained 10K+ events/sec across 15+ services with sub-100ms end-to-end latency',
      'Improved overall system throughput by 35%',
      'Eliminated cascading failures during downstream incidents',
      'Reduced MTTR by 30% via distributed tracing visibility',
    ],
  },
  {
    badge: 'E-COMMERCE · FLIPKART · 50M+ USERS',
    title: 'Big Billion Days at hyperscale.',
    thumbBg: 'linear-gradient(135deg, #00FFB2 0%, #002a1a 100%)',
    summary:
      'Product catalog & checkout services supporting 50M+ MAU and 20K+ req/sec during Big Billion Days — search response improved 35%, DB load cut 40%.',
    stack: ['Java', 'Spring Boot', 'Kafka', 'Redis', 'MySQL', 'MongoDB', 'Hystrix', 'AWS EC2'],
    metrics: [
      { v: '50M+', l: 'monthly users' },
      { v: '20K', l: 'peak req/sec' },
      { v: '10M+', l: 'products indexed' },
      { v: '−40%', l: 'DB load' },
    ],
    problem:
      'During sale events the catalog read-path was the system bottleneck — DB CPU pegged, search latency ballooned, checkout abandonment spiked.',
    approach: [
      'Built a Redis caching layer for product metadata with intelligent TTL and write-through invalidation',
      'Tuned MySQL indexes and rewrote N+1 queries that were killing search response',
      'Sharded MongoDB collections for catalog reads by category-locality',
      'Introduced Kafka-based async order/inventory sync pipeline (15K events/sec)',
      'Hystrix circuit breakers around every downstream call to prevent thundering herds',
    ],
    impact: [
      'Cut search response time by 35%',
      'Reduced database load by 40% during peak sale traffic',
      'Maintained zero downtime across two Big Billion Days events',
      'Saved infrastructure costs ~15% via right-sized caching strategy',
    ],
  },
  {
    badge: 'FULL-STACK · INSIGHT GLOBAL',
    title: 'Enterprise dashboard, real-time everything.',
    thumbBg: 'linear-gradient(135deg, #FF6B1A 0%, #7C5CFC 100%)',
    summary:
      'Real-time enterprise analytics dashboards with WebSocket streams, role-based access control, and 5K+ req/sec API throughput.',
    stack: ['React.js', 'Angular', 'TypeScript', 'Java', 'Spring Boot', 'PostgreSQL', 'WebSockets'],
    metrics: [
      { v: '5K+', l: 'req/sec' },
      { v: '−30%', l: 'response latency' },
      { v: '−25%', l: 'release cycle' },
      { v: '−20%', l: 'infra cost' },
    ],
    problem:
      'Business stakeholders needed live operational visibility without IT bottlenecks. Multiple existing dashboards were stale, fragmented, and slow.',
    approach: [
      'Designed Spring Boot microservices backend exposing both REST and WebSocket APIs',
      'Built React.js + Angular dashboards with virtualized data grids and live charts',
      'Implemented OAuth2 + JWT-based RBAC for multi-tenant access',
      'Containerized everything with Docker + Kubernetes, deployed via Jenkins CI/CD',
      'Tuned PostgreSQL with indexing + query plans for sub-100ms reads on million-row tables',
    ],
    impact: [
      'Reduced API response latency by 30%',
      'Cut release cycle time by 25% via streamlined CI/CD',
      'Reduced AWS infrastructure costs by 20%+',
      'Enabled real-time decision-making across multiple business teams',
    ],
  },
  {
    badge: 'PLATFORM · CLOUD-NATIVE',
    title: 'Infrastructure as Code platform.',
    thumbBg: 'linear-gradient(135deg, #7C5CFC 0%, #0A0A0A 100%)',
    summary:
      'IaC platform on AWS CDK + CloudFormation standardizing deployments across teams — setup time down 30%, zero-downtime releases.',
    stack: ['AWS CDK', 'CloudFormation', 'Docker', 'Kubernetes', 'EKS', 'Jenkins', 'GitHub Actions'],
    metrics: [
      { v: '−30%', l: 'env setup time' },
      { v: '−40%', l: 'deploy time' },
      { v: 'Zero', l: 'downtime releases' },
      { v: '15+', l: 'services migrated' },
    ],
    problem:
      'Each team rolled their own infra — config drift, slow onboarding, fragile deploys. Needed a golden path.',
    approach: [
      'Wrote AWS CDK constructs for the canonical service shape (VPC, ECS task, ALB, observability, secrets)',
      'CloudFormation StackSets for multi-account governance',
      'Blue/green deployment patterns wired into Jenkins pipelines',
      'Centralized secret rotation via AWS Secrets Manager',
    ],
    impact: [
      'Cut environment setup time from days to hours (30% reduction)',
      'Reduced deploy time 40% with parallelized pipelines',
      'Achieved zero-downtime releases as the default, not the exception',
      'Migrated 15+ services to the standard pattern',
    ],
  },
  {
    badge: 'OBSERVABILITY · PLATFORM',
    title: 'See everything, debug anything.',
    thumbBg: 'linear-gradient(135deg, #00FFB2 0%, #001a14 100%)',
    summary:
      'End-to-end observability stack: distributed tracing, metrics, logs, alerts — cut MTTR 30%, surfaced incidents before customers noticed.',
    stack: ['Prometheus', 'Grafana', 'ELK Stack', 'New Relic', 'AWS X-Ray', 'OpenTelemetry'],
    metrics: [
      { v: '−30%', l: 'MTTR' },
      { v: '99.9%', l: 'uptime SLA' },
      { v: '15+', l: 'services traced' },
      { v: '100%', l: 'request coverage' },
    ],
    problem:
      'Microservices fault diagnosis was archaeology — grep logs, guess. Needed proactive detection across the stack.',
    approach: [
      'Standardized OpenTelemetry instrumentation across all services',
      'Built shared Grafana dashboards for the four golden signals per service',
      'Centralized log aggregation via ELK with structured JSON logging conventions',
      'Anomaly-based PagerDuty alerts wired to Prometheus rules',
      'AWS X-Ray for cross-service trace correlation',
    ],
    impact: [
      'Reduced mean-time-to-resolution by 30%',
      'Detected and resolved incidents proactively, before customer impact',
      '100% request trace coverage across critical paths',
      'Lowered alert fatigue by tuning rules on real SLOs vs vanity metrics',
    ],
  },
]

function ExpandedDetail({ p }) {
  return (
    <div className="text-cream">
      {/* Summary */}
      <p className="font-display text-2xl text-cream/90 leading-snug mb-8">{p.summary}</p>

      {/* Stack chips */}
      <div className="flex flex-wrap gap-2 mb-10">
        {p.stack.map((t) => (
          <span key={t} className="chip">{t}</span>
        ))}
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 p-6 rounded-xl border border-amber/20 bg-amber/5">
        {p.metrics.map((m, i) => (
          <div key={i}>
            <div className="font-display text-3xl text-amber">{m.v}</div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-cream/50 mt-1">
              {m.l}
            </div>
          </div>
        ))}
      </div>

      {/* Problem */}
      <div className="mb-8">
        <div className="font-mono text-xs uppercase tracking-widest text-amber mb-3">
          ◆ Problem
        </div>
        <p className="text-base text-cream/80 leading-relaxed">{p.problem}</p>
      </div>

      {/* Approach */}
      <div className="mb-8">
        <div className="font-mono text-xs uppercase tracking-widest text-electric mb-3">
          ◆ Approach
        </div>
        <ul className="space-y-2">
          {p.approach.map((a, i) => (
            <li key={i} className="flex gap-3 text-cream/80 text-sm leading-relaxed">
              <span className="text-electric mt-1">▸</span>
              <span>{a}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Impact */}
      <div>
        <div className="font-mono text-xs uppercase tracking-widest text-violet mb-3">
          ◆ Impact
        </div>
        <ul className="space-y-2">
          {p.impact.map((a, i) => (
            <li key={i} className="flex gap-3 text-cream/80 text-sm leading-relaxed">
              <span className="text-violet mt-1">●</span>
              <span>{a}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function ProjectThumb({ p }) {
  // Visual thumbnail for the masked card. SVG-based, since not pulling external images.
  return (
    <div
      className="w-full h-full relative flex items-center justify-center overflow-hidden"
      style={{ background: p.thumbBg }}
    >
      {/* Decorative bg pattern */}
      <svg
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full opacity-30"
      >
        <defs>
          <pattern id={`dots-${p.badge.slice(0,5)}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.3)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#dots-${p.badge.slice(0,5)})`} />
        {/* Curve */}
        <path
          d="M 0 350 Q 100 280 200 320 T 400 290 L 400 500 L 0 500 Z"
          fill="rgba(0,0,0,0.4)"
        />
        <path
          d="M 0 380 Q 120 320 220 360 T 400 340"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="1.5"
          fill="none"
        />
        {/* Decorative metric blob */}
        <text x="200" y="200" textAnchor="middle" fill="rgba(255,255,255,0.15)" fontSize="120" fontFamily="Instrument Serif">
          {p.metrics[0].v}
        </text>
      </svg>

      {/* Metrics overlay */}
      <div className="absolute bottom-24 left-6 right-6 flex gap-2 flex-wrap">
        {p.metrics.slice(0, 2).map((m, i) => (
          <div key={i} className="px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 font-mono text-[10px] text-white">
            <span className="text-white font-bold">{m.v}</span>
            <span className="text-white/60 ml-1">{m.l}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-32 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto mb-20">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-px bg-amber" />
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber">
            05 — Selected Work
          </span>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-end">
          <h2 className="font-display text-5xl md:text-7xl text-cream leading-tight">
            Systems shipped to <em className="text-amber">production.</em>
          </h2>
          <p className="text-cream/60 max-w-md leading-relaxed">
            Click any tile to expand the full case study —
            problem, architecture, impact, metrics. Six real
            engagements across fintech, e-commerce, and platform work.
          </p>
        </div>
      </div>

      {/* Project Reel Carousel */}
      <div className="max-w-7xl mx-auto mb-12 overflow-hidden">
        <ReelCarousel
          speed={0.6}
          gap={16}
          cardWidth={260}
          cardHeight={160}
          items={PROJECTS.map((p) => ({
            title: p.title,
            tag: p.badge,
            subtitle: p.stack ? p.stack.slice(0, 3).join(' · ') : '',
            bg: p.thumbBg,
          }))}
        />
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((p, idx) => (
          <ExpandedMask
            key={p.title}
            index={idx}
            badge={p.badge}
            title={p.title}
            thumbBg={p.thumbBg}
            thumbnail={<ProjectThumb p={p} />}
            expandedContent={<ExpandedDetail p={p} />}
          />
        ))}
      </div>
    </section>
  )
}
