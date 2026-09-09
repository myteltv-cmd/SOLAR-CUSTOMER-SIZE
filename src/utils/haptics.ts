/**
 * Haptic feedback utility for mobile devices
 * Safely invokes navigator.vibrate if supported on modern touch devices (Android, etc.)
 */
export const triggerHaptic = (type: 'light' | 'medium' | 'selection' | 'success' | 'error' = 'light') => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return;

  try {
    if ('vibrate' in navigator && typeof navigator.vibrate === 'function') {
      switch (type) {
        case 'selection':
          navigator.vibrate(8); // Ultra-light tactile tick for selections / presets
          break;
        case 'light':
          navigator.vibrate(14); // Light tap for button clicks
          break;
        case 'medium':
          navigator.vibrate(25); // Definite press for primary actions
          break;
        case 'success':
          navigator.vibrate([15, 40, 25]); // Dual-pulse celebration
          break;
        case 'error':
          navigator.vibrate([30, 40, 30]); // Staccato error buzz
          break;
      }
    }
  } catch {
    // Gracefully handle devices where vibrate is restricted or unsupported
  }
};
