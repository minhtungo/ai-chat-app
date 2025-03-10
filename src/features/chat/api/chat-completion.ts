import { chatApi } from '@/api/api-client';

export async function streamChatCompletion(
  message: string,
  onToken: (token: string) => void,
  onComplete?: () => void,
) {
  const response = await chatApi.post(
    '/chat/completions',
    { message },
    {
      responseType: 'stream',
      adapter: 'fetch',
    },
  );

  const reader = response.data.getReader();
  const decoder = new TextDecoder();

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });

      const lines = chunk.split('\n').filter((line) => line.trim() !== '');

      for (const line of lines) {
        if (line.includes('[DONE]')) {
          if (onComplete) onComplete();
          continue;
        }

        if (line.startsWith('data: ')) {
          try {
            const jsonStr = line.substring(6);
            const data = JSON.parse(jsonStr);

            if (data.content) {
              onToken(data.content);
            }
          } catch (e) {
            console.warn('Failed to parse JSON from stream:', line);
          }
        }
      }
    }

    if (onComplete) onComplete();
  } catch (error) {
    console.error('Error reading stream:', error);
    throw error;
  }
}
