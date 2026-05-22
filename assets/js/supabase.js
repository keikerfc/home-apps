// ============================================================
//  HomeApps — Conexión a Supabase (base de datos compartida)
// ============================================================

const SUPABASE_URL  = 'https://njxwyivfqdyrucdbhdih.supabase.co';
const SUPABASE_KEY  = 'sb_publishable_pjyXnqQq-_XSj2axv84jmg_7CR_FO-H';

const db = {

  // ── MÉTODO BASE ──────────────────────────────────────────
  async request(method, table, body = null, filters = '') {
    const url = `${SUPABASE_URL}/rest/v1/${table}${filters}`;
    const headers = {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': method === 'POST' ? 'return=representation' : 'return=minimal'
    };
    const res = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null
    });
    if (!res.ok) throw new Error(`Error ${res.status}: ${await res.text()}`);
    const text = await res.text();
    return text ? JSON.parse(text) : [];
  },

  // ── GASTOS ───────────────────────────────────────────────
  gastos: {
    async getAll()       { return db.request('GET', 'gastos', null, '?order=fecha.desc'); },
    async insert(item)   { return db.request('POST', 'gastos', item); },
    async delete(id)     { return db.request('DELETE', 'gastos', null, `?id=eq.${id}`); },
    async update(id, data){ return db.request('PATCH', 'gastos', data, `?id=eq.${id}`); }
  },

  // ── COMPRAS ──────────────────────────────────────────────
  compras: {
    async getAll()       { return db.request('GET', 'compras', null, '?order=created_at.desc'); },
    async insert(item)   { return db.request('POST', 'compras', item); },
    async delete(id)     { return db.request('DELETE', 'compras', null, `?id=eq.${id}`); },
    async update(id, data){ return db.request('PATCH', 'compras', data, `?id=eq.${id}`); }
  },

  // ── MANTENIMIENTO ────────────────────────────────────────
  mantenimiento: {
    async getAll()       { return db.request('GET', 'mantenimiento', null, '?order=created_at.desc'); },
    async insert(item)   { return db.request('POST', 'mantenimiento', item); },
    async delete(id)     { return db.request('DELETE', 'mantenimiento', null, `?id=eq.${id}`); },
    async update(id, data){ return db.request('PATCH', 'mantenimiento', data, `?id=eq.${id}`); }
  },

  // ── SERVICIOS ────────────────────────────────────────────
  servicios: {
    async getAll()       { return db.request('GET', 'servicios', null, '?order=fecha.desc'); },
    async insert(item)   { return db.request('POST', 'servicios', item); },
    async delete(id)     { return db.request('DELETE', 'servicios', null, `?id=eq.${id}`); },
    async update(id, data){ return db.request('PATCH', 'servicios', data, `?id=eq.${id}`); }
  },

  // ── AGENDA ───────────────────────────────────────────────
  agenda: {
    async getAll()       { return db.request('GET', 'agenda', null, '?order=fecha.asc'); },
    async insert(item)   { return db.request('POST', 'agenda', item); },
    async delete(id)     { return db.request('DELETE', 'agenda', null, `?id=eq.${id}`); },
    async update(id, data){ return db.request('PATCH', 'agenda', data, `?id=eq.${id}`); }
  },

  // ── INVENTARIO ───────────────────────────────────────────
  inventario: {
    async getAll()       { return db.request('GET', 'inventario', null, '?order=created_at.desc'); },
    async insert(item)   { return db.request('POST', 'inventario', item); },
    async delete(id)     { return db.request('DELETE', 'inventario', null, `?id=eq.${id}`); },
    async update(id, data){ return db.request('PATCH', 'inventario', data, `?id=eq.${id}`); }
  }

};
