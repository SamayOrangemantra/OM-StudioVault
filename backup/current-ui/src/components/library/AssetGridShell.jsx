/** The responsive grid wrapper shared by the asset grid and its skeleton. */
export function AssetGridShell({ children }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
      {children}
    </div>
  )
}
