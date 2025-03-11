import { chatApi } from '@/api/api-client';

export async function streamChatCompletion(
  message: string,
  onToken: (token: string) => void,
  onComplete?: () => void,
) {
  const response = await chatApi.post(
    '/chat/completions',
    { message, history: [] },
    {
      responseType: 'stream',
      adapter: 'fetch',
    },
  );

  const reader = response.data.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      buffer += chunk;

      // Process complete SSE events from the buffer
      const eventEndIndex = buffer.lastIndexOf('\n\n');
      if (eventEndIndex > -1) {
        const events = buffer.substring(0, eventEndIndex).split('\n\n');
        buffer = buffer.substring(eventEndIndex + 2);

        for (const event of events) {
          // Parse the event type and data
          const eventType = event.match(/^event: (.+)$/m)?.[1];
          const data = event.match(/^data: (.+)$/m)?.[1];

          if (!eventType || !data) continue;

          // Handle different event types
          if (eventType === 'content') {
            try {
              const parsedData = JSON.parse(data);
              if (parsedData.content) {
                onToken(parsedData.content);
              }
            } catch (e) {
              console.warn('Failed to parse JSON from stream:', data);
            }
          } else if (eventType === 'done') {
            if (onComplete) onComplete();
          } else if (eventType === 'error') {
            try {
              const errorData = JSON.parse(data);
              console.error('Stream error:', errorData.message);
            } catch (e) {
              console.error('Stream error (parsing failed):', data);
            }
          }
        }
      }
    }
  } catch (error) {
    console.error('Error reading stream:', error);
    throw error;
  }
}
