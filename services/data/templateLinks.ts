export const generateTemplateLinks = () => {
  const categories = [
    'Development',
    'Social Media',
    'News',
    'Entertainment',
    'Education',
    'Productivity',
    'Shopping',
    'Technology',
  ];

  const domains = [
    'github.com',
    'stackoverflow.com',
    'medium.com',
    'dev.to',
    'youtube.com',
    'twitter.com',
    'linkedin.com',
    'reddit.com',
    'amazon.com',
    'google.com',
  ];

  const templates = [];
  const startTime = Date.now();

  for (let i = 0; i < 100; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const domain = domains[Math.floor(Math.random() * domains.length)];
    const number = i + 1;

    templates.push({
      id: `template-${number}`,
      name: `${category} Link ${number}`,
      url: `https://${domain}/example-${number}`,
      createdAt: startTime - (100 - i) * 60000, // Spread creation times over last 100 minutes
      category,
    });
  }

  return templates;
}; 