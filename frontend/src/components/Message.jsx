export default function Message({ children, kind = 'info', onClose }) {
  return (
    <div className={`message message-${kind}`} role={kind === 'error' ? 'alert' : 'status'}>
      <span>{children}</span>
      {onClose && <button className="message-close" type="button" onClick={onClose} aria-label="Cerrar mensaje">×</button>}
    </div>
  );
}
