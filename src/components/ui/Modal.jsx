import { useEffect, useRef } from 'react';
import { cx } from '../../lib/cx';
import { XIcon } from './icons';
import './Modal.css';

/**
 * Accessible modal built on the native <dialog>: the browser handles focus trapping,
 * Esc, the inert background and returning focus to the trigger.
 * Every close path goes through the dialog's own "close" event, which calls onClose.
 */
export function Modal({ open, onClose, labelledBy, size = 'md', className, children }) {
  const dialogRef = useRef(null);
  const pressStartedOnBackdrop = useRef(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const close = () => dialogRef.current?.close();

  return (
    <dialog
      ref={dialogRef}
      className={cx('modal', `modal--${size}`, className)}
      aria-labelledby={labelledBy}
      onClose={onClose}
      onPointerDown={(event) => {
        pressStartedOnBackdrop.current = event.target === event.currentTarget;
      }}
      onClick={(event) => {
        if (pressStartedOnBackdrop.current && event.target === event.currentTarget) close();
      }}
    >
      {open && (
        <div className="modal__panel">
          <button type="button" className="modal__close" onClick={close} aria-label="Close">
            <XIcon aria-hidden="true" />
          </button>
          {children}
        </div>
      )}
    </dialog>
  );
}
