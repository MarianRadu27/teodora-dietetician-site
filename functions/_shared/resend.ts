type ResendEmail = {
  from: string;
  html: string;
  replyTo?: string;
  subject: string;
  text: string;
  to: string;
};

type ResendErrorResponse = {
  message?: string;
};

export async function sendResendEmail(
  apiKey: string,
  email: ResendEmail,
  idempotencyKey: string,
) {
  const response = await fetch("https://api.resend.com/emails", {
    body: JSON.stringify({
      from: email.from,
      html: email.html,
      reply_to: email.replyTo,
      subject: email.subject,
      text: email.text,
      to: [email.to],
    }),
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey,
    },
    method: "POST",
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    const result = (await response.json().catch(() => null)) as
      | ResendErrorResponse
      | null;

    throw new Error(
      result?.message ?? `Resend returned status ${response.status}.`,
    );
  }
}
