/* =============================================
   HOME APPS — Utilidades compartidas (utils.js)
   Versión: 1.0
   ============================================= */

const HomeApps = {

  /* --- STORAGE --- */
  storage: {
    get(key) {
      try {
        const val = localStorage.getItem(key);
        return val ? JSON.parse(val) : null;
      } catch { return null; }
    },
    set(key, data) {
      try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
      } catch { return false; }
    },
    remove(key) {
      localStorage.removeItem(key);
    }
  },

  /* --- FECHAS --- */
  dates: {
    today() {
      return new Date().toISOString().split('T')[0];
    },
    format(dateStr, locale = 'es-AR') {
      if (!dateStr) return '—';
      const d = new Date(dateStr + 'T00:00:00');
      return d.toLocaleDateString(locale, { day: '2-digit', month: 'short', year: 'numeric' });
    },
    monthLabel(dateStr, locale = 'es-AR') {
      if (!dateStr) return '—';
      const d = new Date(dateStr + 'T00:00:00');
      return d.toLocaleDateString(locale, { month: 'long', year: 'numeric' });
    },
    currentMonth() {
      const d = new Date();
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    }
  },

  /* --- NÚMEROS --- */
  numbers: {
    currency(amount, currency = 'ARS', locale = 'es-AR') {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        maximumFractionDigits: 0
      }).format(amount);
    },
    pct(value, total) {
      if (!total) return 0;
      return Math.round((value / total) * 100);
    }
  },

  /* --- IDs --- */
  uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  },

  /* --- EXPORT / IMPORT JSON --- */
  export(data, filename = 'backup') {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}_${HomeApps.dates.today()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },

  import(callback) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = e => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = ev => {
        try {
          const data = JSON.parse(ev.target.result);
          callback(null, data);
        } catch {
          callback(new Error('Archivo JSON inválido'), null);
        }
      };
      reader.readAsText(file);
    };
    input.click();
  },

  /* --- TOAST NOTIFICATIONS --- */
  toast(message, type = 'success') {
    const existing = document.getElementById('ha-toast');
    if (existing) existing.remove();

    const colors = {
      success: '#2D6A4F',
      error: '#C0453A',
      info: '#2A5FA0'
    };

    const t = document.createElement('div');
    t.id = 'ha-toast';
    t.textContent = message;
    Object.assign(t.style, {
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      background: colors[type] || colors.success,
      color: 'white',
      padding: '10px 18px',
      borderRadius: '8px',
      fontSize: '14px',
      fontFamily: "'DM Sans', sans-serif",
      zIndex: '9999',
      opacity: '0',
      transition: 'opacity 0.2s',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
    });

    document.body.appendChild(t);
    requestAnimationFrame(() => t.style.opacity = '1');
    setTimeout(() => {
      t.style.opacity = '0';
      setTimeout(() => t.remove(), 200);
    }, 2800);
  }

};

window.HomeApps = HomeApps;
