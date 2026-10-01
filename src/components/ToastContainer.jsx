import React from 'react';
import { useToast } from '../context/ToastContext';

export function ToastContainer() {
  const { toasts } = useToast();

  if (!toasts.length) return null;

  return (
    <div className="toast-container" id="toast-container">
      {toasts.map(toast => (
        <div key={toast.id} className={`toast ${toast.type}`}>
          <i className={`fa-solid ${toast.type === 'success' ? 'fa-circle-check' : 'fa-circle-info'}`}></i>
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
