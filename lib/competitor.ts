export interface CompetitorData {
  domain: string
  authority: number
  backlinks: number
  traffic: string
  keywords: number
  topKeywords: string[]
  overlapScore: number
}

export async function analyzeCompetitors(targetDomain: string): Promise<CompetitorData[]> {
  const sampleCompetitors = ['competitor-one.com', 'market-leader.io', 'global-brand.net', 'local-shop.org'];
  
  return sampleCompetitors.map(domain => ({
    domain,
    authority: Math.floor(30 + Math.random() * 60),
    backlinks: Math.floor(500 + Math.random() * 25000),
    traffic: `${(5 + Math.random() * 95).toFixed(1)}k/mo`,
    keywords: Math.floor(200 + Math.random() * 5000),
    topKeywords: ['best industry tools', 'buy organic services', 'affordable software alternative'],
    overlapScore: Math.floor(10 + Math.random() * 80)
  }));
}
