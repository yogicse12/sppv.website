// Shared blog post data, used by both the blog index (list + featured card)
// and the individual post page. Keeping this in one place means the two
// pages can never drift out of sync on title/image/meta.
//
// `body` is a small array of typed blocks rather than a raw HTML string,
// so the post page can render each block with proper Tailwind classes
// instead of dumping markup through v-html.
export const BLOG_POSTS = [
  {
    slug: 'capital-gains-planning-questions',
    title: 'Capital Gains Planning: Questions to Ask Before You Sell',
    excerpt: 'A disposal decision is easier to get right when the tax implications are considered before the deal is done, not after.',
    category: 'Tax',
    date: 'Jul 2026',
    readTime: '6 min read',
    image: '/images/finance.jpg',
    body: [
      { type: 'p', text: "By the time an asset sale reaches a signature, most of the commercial decisions have already been made — price, timing, buyer. Tax is usually the thing considered last, if at all. That's the wrong order. A disposal decision is far easier to get right when the tax implications are weighed before the deal is structured, not discovered afterward." },
      { type: 'h2', text: 'Start with timing, not just price' },
      { type: 'p', text: "How long an asset has been held, and how the proceeds will be received, often matters as much as the sale price itself. Two sales at the same value can land very differently depending on when they happen, how they're structured, and what else is going on in the same financial year." },
      { type: 'h2', text: 'Questions worth asking early' },
      {
        type: 'ul',
        items: [
          'Is the asset held personally, or through an entity — and does that change the outcome?',
          'Are there losses elsewhere that could reasonably offset the gain?',
          'Does the timing of this sale interact with any other income event in the same year?',
          'Is there a more tax-efficient way for the proceeds to be received or reinvested?',
          'Have transaction and advisory costs been factored into the net position, not just the headline price?'
        ]
      },
      { type: 'p', text: "None of these questions require a firm answer months in advance. But they do require asking before terms are agreed, while there's still room to structure the deal differently. Once a sale agreement is signed, most of the flexibility is gone." }
    ]
  },
  {
    slug: 'understanding-input-tax-credit',
    title: 'Understanding Input Tax Credit: A Practical Overview',
    excerpt: 'A plain-language walkthrough of how input tax credit works and where businesses most often trip up.',
    category: 'Tax',
    date: 'Jun 2026',
    readTime: '5 min read',
    image: '/images/image-1.jpg',
    body: [
      { type: 'p', text: 'Input tax credit exists to prevent the same value from being taxed twice as it moves through a supply chain. In principle, it is straightforward: tax paid on legitimate business purchases can be set off against tax collected on sales. In practice, it is one of the areas where businesses most often lose money they were entitled to keep — not through any deliberate error, but through process gaps.' },
      { type: 'h2', text: 'Why credit gets lost' },
      {
        type: 'ul',
        items: [
          'Documentation that is incomplete, mismatched, or filed late',
          'Vendor-side non-compliance that blocks credit on an otherwise valid purchase',
          'Claims missed within the applicable time window',
          'Reconciliation happening only occasionally, so mismatches surface too late to fix'
        ]
      },
      { type: 'h2', text: 'Building a habit, not a fire drill' },
      { type: 'p', text: "The businesses that keep the most credit tend to reconcile regularly — monthly, not annually — so that gaps are caught while there is still time to chase down a missing document or query a vendor. Treating credit reconciliation as a year-end exercise almost always means some of it is unrecoverable by the time anyone looks." },
      { type: 'p', text: "None of this requires a large finance team. It requires a routine, and someone accountable for running it consistently." }
    ]
  },
  {
    slug: 'common-mistakes-corporate-tax-filings',
    title: 'Five Common Mistakes We See in Corporate Tax Filings',
    excerpt: "Most filing issues aren't about complexity — they're about process. Here's what tends to go wrong.",
    category: 'Tax',
    date: 'Jun 2026',
    readTime: '4 min read',
    image: '/images/services/corporate-tax.jpg',
    body: [
      { type: 'p', text: "Corporate tax filings rarely go wrong because the underlying rules are misunderstood. They go wrong because of process — the same handful of patterns, repeated across otherwise well-run businesses." },
      { type: 'h2', text: 'The patterns we see most' },
      {
        type: 'ul',
        items: [
          'Record-keeping that happens in bursts rather than consistently through the year',
          'Filing treated as a year-end event instead of the final step in an ongoing process',
          "Books and filings that aren't reconciled against each other before submission",
          'Intercompany transactions that lack clear supporting documentation',
          "Prior filings only getting a close look after a notice arrives, not before"
        ]
      },
      { type: 'h2', text: 'What good looks like' },
      { type: 'p', text: "The businesses with the fewest filing issues aren't necessarily the ones with the most resources. They're the ones where bookkeeping, reconciliation and filing preparation happen on a steady monthly rhythm, so nothing is being reconstructed from memory under a deadline." },
      { type: 'p', text: "If filing season currently feels like a scramble, that's usually a sign the process needs attention — not that the business is doing anything unusually wrong." }
    ]
  },
  {
    slug: 'when-to-consider-voluntary-audit',
    title: 'When Should a Growing Business Consider a Voluntary Audit?',
    excerpt: "Audits aren't just a compliance milestone. For growing businesses, they can be a useful check-in long before one is required.",
    category: 'Audit',
    date: 'May 2026',
    readTime: '5 min read',
    image: '/images/services/assessments-notices.jpg',
    body: [
      { type: 'p', text: 'Most businesses first encounter an audit because a threshold has been crossed and one is now required. But an audit is also a useful tool well before that point — an independent check on whether the numbers hold up, at a moment when acting on the findings is still easy.' },
      { type: 'h2', text: 'Signals worth paying attention to' },
      {
        type: 'ul',
        items: [
          'Raising external capital, where investors will expect assurance over the numbers',
          'Preparing to take on a significantly larger client, vendor, or lender relationship',
          'Bringing in new leadership who need a reliable financial baseline to start from',
          'Considering a sale, merger, or other major transaction',
          'Simply wanting an independent check after a period of rapid growth'
        ]
      },
      { type: 'h2', text: 'What it actually gives you' },
      { type: 'p', text: 'Beyond the formal opinion, a voluntary audit tends to surface process gaps — in controls, in documentation, in how consistently policies are actually followed — while the business still has time to fix them at its own pace, rather than under external pressure.' },
      { type: 'p', text: "It isn't the right move for every business at every stage. But if any of the signals above sound familiar, it's worth a conversation before the decision is made for you." }
    ]
  },
  {
    slug: 'monthly-reporting-cadence',
    title: 'Building a Simple Monthly Reporting Cadence',
    excerpt: "You don't need an elaborate reporting stack to stay on top of your numbers — you need a routine you'll actually keep.",
    category: 'Accounting',
    date: 'May 2026',
    readTime: '4 min read',
    image: '/images/image-2.jpg',
    body: [
      { type: 'p', text: "It's tempting to think good financial visibility requires an elaborate reporting stack — dashboards, forecasting models, a growing list of KPIs. In practice, most businesses get more value from a simple routine they actually keep than a sophisticated one that quietly lapses after two months." },
      { type: 'h2', text: 'Three things worth reviewing every month' },
      {
        type: 'ul',
        items: [
          'Cash position against plan — not just the balance, but whether it matches expectations',
          'Receivables aging, so slow-paying accounts are caught early rather than at quarter-end',
          'A short note on anything unusual — a one-off cost, a delayed invoice, a change in a customer pattern'
        ]
      },
      { type: 'h2', text: 'Keep it lightweight' },
      { type: 'p', text: 'The goal is a cadence that survives a busy month, not a process that only works when someone has a few spare hours to build it properly. Start small, keep it consistent, and add complexity only once the basics have become routine.' }
    ]
  },
  {
    slug: 'business-structuring-mistakes',
    title: 'What Founders Get Wrong About Business Structuring',
    excerpt: 'The right structure depends on where the business is headed, not just where it is today. A few things worth getting right early.',
    category: 'Advisory',
    date: 'Apr 2026',
    readTime: '6 min read',
    image: '/images/services/transaction-advisory.jpg',
    body: [
      { type: 'p', text: "Business structure decisions are usually made early, under time pressure, and rarely revisited afterward. That's understandable — but the right structure depends on where the business is headed, not just what makes sense for where it is today." },
      { type: 'h2', text: 'Common early missteps' },
      {
        type: 'ul',
        items: [
          "Structuring around today's tax position instead of the business's likely direction",
          'Mixing personal and business assets without a clear boundary between the two',
          'Adding co-founders or investors without revisiting the structure that predates them',
          'Leaving succession or exit planning until it becomes urgent rather than optional'
        ]
      },
      { type: 'h2', text: 'A better way to think about it' },
      { type: 'p', text: "Structure should be revisited at each meaningful inflection point — a new investor, a new market, a change in ownership — rather than treated as a decision made once at the start and left alone. What was right at incorporation is not always right three years and several changes later." },
      { type: 'p', text: "It's a conversation worth having proactively, ideally before a transaction or investor forces the question." }
    ]
  }
]

export function getBlogPostBySlug (slug) {
  return BLOG_POSTS.find((post) => post.slug === slug) || null
}
