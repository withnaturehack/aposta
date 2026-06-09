export function fmt(n: number): string {
  if (n >= 1e7) return `Rs.${(n/1e7).toFixed(1)}Cr`
  if (n >= 1e5) return `Rs.${(n/1e5).toFixed(1)}L`
  if (n >= 1e3) return `Rs.${(n/1e3).toFixed(0)}K`
  return `Rs.${n}`
}
export function fmtFull(n: number): string {
  return 'Rs.' + n.toLocaleString('en-IN')
}
export function initials(name: string): string {
  return name.split(' ').slice(0,2).map(n=>n[0]).join('').toUpperCase()
}
export function clr(name: string): string {
  const c = ['#3b82f6','#22c55e','#8b5cf6','#ef4444','#f59e0b','#14b8a6','#f43f5e','#6366f1']
  return c[name.charCodeAt(0) % c.length]
}
export function dateStr(d: string | Date): string {
  return new Date(d).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' })
}
