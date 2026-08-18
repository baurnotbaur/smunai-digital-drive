// public_key is safe to expose client-side by design (see lead-service/public/embed.js) —
// it only grants permission to submit leads for this site, rate-limited server-side.
const DEFAULT_SERVICE_URL = "https://smunai-lead-service.vercel.app";
const DEFAULT_SITE_KEY = "iwteRIh9b9Eiu-Z4GIcBiYEinUzw4xgW";

const SERVICE_URL = import.meta.env["VITE_LEAD_SERVICE_URL"] || DEFAULT_SERVICE_URL;
const SITE_KEY = import.meta.env["VITE_LEAD_SITE_KEY"] || DEFAULT_SITE_KEY;

export type LeadPayload = {
  name: string;
  phone: string;
  /** Организация: по ней CRM склеивает заявки одного клиента в карточку компании. */
  org?: string;
  comment?: string;
  /** Согласие на рекламные рассылки — без него клиент не попадёт в рассылки. */
  consent?: boolean;
  form_id: string;
};

export async function submitLead(payload: LeadPayload): Promise<void> {
  const res = await fetch(`${SERVICE_URL}/api/v1/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      key: SITE_KEY,
      page_url: window.location.href,
      referrer: document.referrer,
    }),
  });

  const data: { ok: boolean; message?: string } = await res.json().catch(() => ({ ok: false }));
  if (!res.ok || !data.ok) {
    throw new Error(data.message || "Не удалось отправить заявку");
  }
}
