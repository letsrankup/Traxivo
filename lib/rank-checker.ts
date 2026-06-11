export interface RankData {
  keyword: string
  position: number
  previousPosition: number
  change: number
  volume: number
  difficulty: 'Low' | 'Medium' | 'High'
  updatedAt: string
}

export async function checkKeywordRankings(domain: string, keywords: string[]): Promise<RankData[]> {
  const difficulties: ('Low' | 'Medium' | 'High')[] = ['Low', 'Medium', 'High'];
  
  return keywords.map(keyword => {
    const previous = Math.floor(1 + Math.random() * 45);
    const current = Math.max(1, previous + Math.floor(Math.random() * 7) - 4);
    
    return {
      keyword,
      position: current,
      previousPosition: previous,
      change: previous - current,
      volume: [140, 320, 880, 1200, 5400, 18000][Math.floor(Math.random() * 6)],
      difficulty: difficulties[Math.floor(Math.random() * 3)],
      updatedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    };
  });
                                          }

