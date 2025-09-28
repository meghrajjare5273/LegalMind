import { NextResponse } from "next/server";

interface CacheMetrics {
  key: string;
  hits: number;
  misses: number;
  errors: number;
  lastAccessed: Date;
  averageResponseTime: number;
}

class CacheMonitor {
  private static instance: CacheMonitor;
  private metrics = new Map<string, CacheMetrics>();

  static getInstance(): CacheMonitor {
    if (!CacheMonitor.instance) {
      CacheMonitor.instance = new CacheMonitor();
    }
    return CacheMonitor.instance;
  }

  recordHit(cacheKey: string, responseTime: number): void {
    const metric = this.getOrCreateMetric(cacheKey);
    metric.hits++;
    metric.lastAccessed = new Date();
    metric.averageResponseTime = this.updateAverage(
      metric.averageResponseTime,
      responseTime,
      metric.hits + metric.misses
    );
  }

  recordMiss(cacheKey: string, responseTime: number): void {
    const metric = this.getOrCreateMetric(cacheKey);
    metric.misses++;
    metric.lastAccessed = new Date();
    metric.averageResponseTime = this.updateAverage(
      metric.averageResponseTime,
      responseTime,
      metric.hits + metric.misses
    );
  }

  recordError(cacheKey: string): void {
    const metric = this.getOrCreateMetric(cacheKey);
    metric.errors++;
    metric.lastAccessed = new Date();
  }

  getMetrics(): CacheMetrics[] {
    return Array.from(this.metrics.values())
      .map((metric) => ({
        ...metric,
        hitRate: metric.hits / (metric.hits + metric.misses) || 0,
      }))
      .sort((a, b) => b.hits + b.misses - (a.hits + a.misses));
  }

  clearMetrics(): void {
    this.metrics.clear();
  }

  private getOrCreateMetric(cacheKey: string): CacheMetrics {
    if (!this.metrics.has(cacheKey)) {
      this.metrics.set(cacheKey, {
        key: cacheKey,
        hits: 0,
        misses: 0,
        errors: 0,
        lastAccessed: new Date(),
        averageResponseTime: 0,
      });
    }
    return this.metrics.get(cacheKey)!;
  }

  private updateAverage(
    current: number,
    newValue: number,
    count: number
  ): number {
    return (current * (count - 1) + newValue) / count;
  }
}

export const cacheMonitor = CacheMonitor.getInstance();

// Cache debugging API endpoint
export async function GET(): Promise<NextResponse> {
  const metrics = cacheMonitor.getMetrics();
  return NextResponse.json({
    metrics,
    summary: {
      totalCaches: metrics.length,
      totalHits: metrics.reduce((sum, m) => sum + m.hits, 0),
      totalMisses: metrics.reduce((sum, m) => sum + m.misses, 0),
      averageHitRate:
        metrics.reduce(
          (sum, m) => sum + (m.hits / (m.hits + m.misses) || 0),
          0
        ) / metrics.length,
    },
  });
}
