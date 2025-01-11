interface BatchProcessOptions {
  batchSize: number;
  onProgress?: (completed: number, total: number) => void;
  onError?: (error: Error, item: any) => void;
}

export async function processBatch<T, R>(
  items: T[],
  processor: (item: T) => Promise<R>,
  options: BatchProcessOptions
): Promise<R[]> {
  const results: R[] = [];
  const { batchSize, onProgress, onError } = options;

  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchPromises = batch.map(async (item) => {
      try {
        const result = await processor(item);
        return result;
      } catch (error) {
        if (onError) {
          onError(error as Error, item);
        }
        throw error;
      }
    });

    const batchResults = await Promise.allSettled(batchPromises);
    batchResults.forEach((result) => {
      if (result.status === 'fulfilled') {
        results.push(result.value);
      }
    });

    if (onProgress) {
      onProgress(Math.min(i + batchSize, items.length), items.length);
    }
  }

  return results;
} 