export interface Lead {
  id: string
  companyName: string
  website: string
  email: string
  phone: string
  industry: string
  source: string
  status: 'new' | 'contacted' | 'qualified' | 'rejected'
}

export async function scrapeTargetLeads(industry: string, location: string): Promise<Lead[]> {
  const dummyCompanies = ['Alpha Digital', 'Apex Web Tech', 'Nexus Logistics', 'Vortex Systems', 'Horizon Agency'];
  
  return dummyCompanies.map((company, index) => {
    const domain = `${company.toLowerCase().replace(/\s+/g, '')}.com`;
    return {
      id: `lead_${Date.now()}_${index}`,
      companyName: `${company} - ${location}`,
      website: `https://www.${domain}`,
      email: `contact@${domain}`,
      phone: `+92-300-${Math.floor(1000000 + Math.random() * 9000000)}`,
      industry: industry,
      source: 'Google Maps Engine Automation',
      status: 'new'
    };
  });
}

