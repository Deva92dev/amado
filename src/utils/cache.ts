import { unstable_cache } from "next/cache";

interface CacheOptions {
  revalidate?: number;
  tags?: string[];
  keyPrefix?: string; // Custom cache key prefix
  includeParams?: boolean;
}

export function createCache<TArgs extends any[], TReturn>(
  fn: (...args: TArgs) => Promise<TReturn>,
  options: CacheOptions = {}
): (...args: TArgs) => Promise<TReturn> {
  const {
    revalidate = 300,
    tags = [],
    keyPrefix = fn.name || "cached",
    includeParams = true,
  } = options;

  // if (
  //   process.env.NODE_ENV === "development" &&
  //   !fn.name &&
  //   !options.keyPrefix
  // ) {
  //   console.warn(
  //     // "⚠️ createCache: Function has no name and no keyPrefix provided. Consider adding a keyPrefix for better debugging."
  //     ""
  //   );
  // }

  return unstable_cache(fn, includeParams ? [] : [keyPrefix], {
    revalidate,
    tags: [keyPrefix, ...tags],
  });
}

// Quick cache presets for common use cases
export const CachePresets = {
  daily: (tags: string[] = []) => ({
    revalidate: 86400,
    tags: ["static", ...tags],
  }),

  weekly: (tags: string[] = []) => ({
    revalidate: 60 * 60 * 24 * 7,
    tags: ["weekly", ...tags],
  }),

  static: (tags: string[] = []) => ({
    revalidate: 3600,
    tags: ["static", ...tags],
  }),

  dynamic: (tags: string[] = []) => ({
    revalidate: 300,
    tags: ["dynamic", ...tags],
  }),

  user: (tags: string[] = []) => ({
    revalidate: 60,
    tags: ["user", ...tags],
  }),

  expensive: (tags: string[] = []) => ({
    revalidate: 1800,
    tags: ["expensive", ...tags],
  }),

  realtime: (tags: string[] = []) => ({
    revalidate: 30,
    tags: ["realtime", ...tags],
  }),

  none: () => ({
    revalidate: 0,
    tags: ["no-cache"],
  }),
};

// Cache invalidation helpers
export const CacheUtils = {
  async revalidateByTag(tag: string) {
    try {
      const { revalidateTag } = await import("next/cache");
      revalidateTag(tag);
    } catch (error) {
      console.error(`Failed to revalidate tag "${tag}":`, error);
    }
  },

  async revalidateByTags(tags: string[]) {
    try {
      const { revalidateTag } = await import("next/cache");
      tags.forEach((tag) => revalidateTag(tag));
    } catch (error) {
      console.error(`Failed to revalidate tags "${tags.join(", ")}":`, error);
    }
  },

  async revalidateStatic() {
    await this.revalidateByTag("static");
  },

  async revalidateDynamic() {
    await this.revalidateByTag("dynamic");
  },

  async revalidateUser() {
    await this.revalidateByTag("user");
  },

  async revalidateAll() {
    await Promise.all([
      this.revalidateStatic(),
      this.revalidateDynamic(),
      this.revalidateUser(),
    ]);
  },
};

// Environment-aware cache helper
export function createEnvCache<TArgs extends any[], TReturn>(
  fn: (...args: TArgs) => Promise<TReturn>,
  prodOptions: CacheOptions = {},
  devOptions: CacheOptions = {}
): (...args: TArgs) => Promise<TReturn> {
  const isDev = process.env.NODE_ENV === "development";
  const isTest = process.env.NODE_ENV === "test";

  if (isTest) {
    return fn;
  }

  const options = isDev ? { revalidate: 10, ...devOptions } : prodOptions;
  return createCache(fn, options);
}

export type CachedFunction<T extends (...args: any[]) => Promise<any>> = T;
export type CachePreset = ReturnType<typeof CachePresets.static>;
