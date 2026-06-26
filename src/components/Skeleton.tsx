export function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden">
      <div className="h-48 bg-gray-200" />
      <div className="space-y-3 p-5">
        <div className="h-5 w-3/4 rounded bg-gray-200" />
        <div className="grid grid-cols-2 gap-2">
          <div className="h-4 w-20 rounded bg-gray-200" />
          <div className="h-4 w-24 rounded bg-gray-200" />
          <div className="h-4 w-16 rounded bg-gray-200" />
          <div className="h-4 w-28 rounded bg-gray-200" />
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-4 w-24 rounded bg-gray-200" />
        </div>
        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <div className="h-7 w-28 rounded bg-gray-200" />
          <div className="h-4 w-12 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonCarDetail() {
  return (
    <div className="animate-pulse">
      <div className="grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="aspect-[4/3] rounded-xl bg-gray-200" />
          <div className="mt-4 grid grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-[4/3] rounded-lg bg-gray-200" />
            ))}
          </div>
        </div>
        <div className="lg:col-span-2 space-y-4">
          <div className="h-8 w-3/4 rounded bg-gray-200" />
          <div className="h-4 w-1/3 rounded bg-gray-200" />
          <div className="h-10 w-1/2 rounded bg-gray-200" />
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-14 rounded-lg bg-gray-200" />
            ))}
          </div>
          <div className="space-y-2">
            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="h-4 w-5/6 rounded bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="animate-pulse space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 rounded bg-gray-200"
          style={{ width: `${100 - i * 15}%` }}
        />
      ))}
    </div>
  );
}

export function SkeletonStatCard() {
  return (
    <div className="animate-pulse rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-xl bg-gray-200" />
        <div className="space-y-2">
          <div className="h-7 w-16 rounded bg-gray-200" />
          <div className="h-4 w-24 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
