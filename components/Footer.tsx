export default function Footer() {
  return (
    <footer style={{ padding: '20px 28px', borderTop: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text3)', fontSize:13 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', gap:12, alignItems:'center' }}>
        <div>© {new Date().getFullYear()} APOTSA — Built with care.</div>
        <div style={{ display:'flex', gap:12 }}>
          <a href="/about" style={{ color:'var(--text3)', textDecoration:'none' }}>About</a>
          <a href="/contact" style={{ color:'var(--text3)', textDecoration:'none' }}>Contact</a>
          <a href="mailto:admin@apotsa.com" style={{ color:'var(--text3)', textDecoration:'none' }}>Support</a>
        </div>
      </div>
    </footer>
  )
}
