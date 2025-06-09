const API_KEY = process.env.MOONSHOT_API_KEY || 'sk-QBTbEbQtd8U7sQ0ULOdC3ZxS7vC9u5gthp6S9KHH7btKCrth';
const API_ENDPOINT = 'https://api.moonshot.cn/v1/chat/completions';

export async function sendMessage(message: string) {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        model: 'moonshot-v1-8k',
        messages: [
          {
            role: 'system',
            content: '你是一个友好的AI助手，擅长音乐相关的对话。'
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
        stream: false,
        top_p: 0.9,
        frequency_penalty: 0.6,
        presence_penalty: 0.6
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('API Error:', errorData);
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response format from API');
    }
    return data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
} 