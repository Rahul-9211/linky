import axios from 'axios';

class AIService {
  private API_KEY: string;
  private API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateText';

  constructor(apiKey: string) {
    this.API_KEY = apiKey;
  }

  async suggestName(url: string): Promise<string> {
    try {
      const response = await axios.post(
        `${this.API_URL}?key=${this.API_KEY}`,
        {
          contents: [{
            parts: [{
              text: `Suggest a short, descriptive name for this website: ${url}`
            }]
          }]
        }
      );
      return response.data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('AI suggestion failed:', error);
      return '';
    }
  }
}

export default AIService; 