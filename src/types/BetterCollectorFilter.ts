export type BetterCollectorFilter<I extends [...items: any[]] = [...items: any[]]> = (...items: I extends [...items: infer P] ? P : never) => boolean;