import { getStoredGmailConfig, saveStoredGmailConfig, GmailConfig } from "@/lib/store";

const GOOGLE_AUTH_ENDPOINT = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";
const GOOGLE_USERINFO_ENDPOINT = "https://www.googleapis.com/oauth2/v2/userinfo";
const GMAIL_SEND_ENDPOINT = "https://gmail.googleapis.com/gmail/v1/users/me/messages/send";

const SCOPES = [
  "https://www.googleapis.com/auth/gmail.send",
  "https://www.googleapis.com/auth/userinfo.email",
].join(" ");

export interface SendEmailOptions {
  to?: string;
  subject: string;
  htmlBody: string;
  textBody?: string;
  replyTo?: string;
}

/**
 * Generates the official Google OAuth 2.0 authorization URL
 */
export function getGoogleOAuthUrl(customRedirectUri?: string): { url: string; error?: string } {
  const config = getStoredGmailConfig();
  const clientId = config.oauth.clientId || process.env.GOOGLE_CLIENT_ID;

  if (!clientId) {
    return {
      url: "",
      error: "Google Client ID is not configured. Please enter your OAuth Client ID in Email Integration settings.",
    };
  }

  const redirectUri =
    customRedirectUri ||
    config.oauth.redirectUri ||
    process.env.GOOGLE_REDIRECT_URI ||
    "http://localhost:3000/api/admin/gmail/callback";

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: SCOPES,
    access_type: "offline",
    prompt: "consent",
    include_granted_scopes: "true",
  });

  return { url: `${GOOGLE_AUTH_ENDPOINT}?${params.toString()}` };
}

/**
 * Exchanges authorization code from Google OAuth redirect for tokens
 */
export async function exchangeCodeForTokens(code: string, redirectUri?: string): Promise<{ success: boolean; email?: string; error?: string }> {
  const config = getStoredGmailConfig();
  const clientId = config.oauth.clientId || process.env.GOOGLE_CLIENT_ID;
  const clientSecret = config.oauth.clientSecret || process.env.GOOGLE_CLIENT_SECRET;
  const uri =
    redirectUri ||
    config.oauth.redirectUri ||
    process.env.GOOGLE_REDIRECT_URI ||
    "http://localhost:3000/api/admin/gmail/callback";

  if (!clientId || !clientSecret) {
    return { success: false, error: "Missing Google OAuth Client ID or Client Secret" };
  }

  try {
    const tokenRes = await fetch(GOOGLE_TOKEN_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: uri,
        grant_type: "authorization_code",
      }).toString(),
    });

    const tokenData = await tokenRes.json();

    if (!tokenRes.ok || tokenData.error) {
      return {
        success: false,
        error: tokenData.error_description || tokenData.error || "Failed to exchange authorization code",
      };
    }

    const accessToken = tokenData.access_token;
    const refreshToken = tokenData.refresh_token || config.oauth.refreshToken;
    const expiresIn = tokenData.expires_in || 3600;
    const tokenExpiry = Date.now() + expiresIn * 1000;

    // Fetch user profile email
    let userEmail = "";
    try {
      const userRes = await fetch(GOOGLE_USERINFO_ENDPOINT, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (userRes.ok) {
        const userData = await userRes.json();
        userEmail = userData.email || "";
      }
    } catch (e) {
      console.warn("Could not retrieve user email from userinfo endpoint:", e);
    }

    // Save tokens securely in server store
    const updatedConfig: GmailConfig = {
      ...config,
      isConnected: true,
      connectedEmail: userEmail || "connected@gmail.com",
      authMethod: "oauth",
      oauth: {
        ...config.oauth,
        clientId,
        clientSecret,
        accessToken,
        refreshToken,
        tokenExpiry,
        redirectUri: uri,
      },
    };

    saveStoredGmailConfig(updatedConfig);

    return { success: true, email: userEmail };
  } catch (err: any) {
    return { success: false, error: err.message || "Network error during OAuth token exchange" };
  }
}

/**
 * Returns a valid, non-expired Google Access Token
 */
export async function getValidAccessToken(): Promise<{ token: string | null; error?: string }> {
  const config = getStoredGmailConfig();

  if (!config.isConnected || !config.oauth.refreshToken) {
    return { token: null, error: "Gmail is not connected. Please authorize via Google OAuth." };
  }

  // Check if current access token is valid (with 60-second buffer)
  if (config.oauth.accessToken && config.oauth.tokenExpiry && config.oauth.tokenExpiry > Date.now() + 60000) {
    return { token: config.oauth.accessToken };
  }

  // Need to refresh
  const clientId = config.oauth.clientId || process.env.GOOGLE_CLIENT_ID;
  const clientSecret = config.oauth.clientSecret || process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return { token: null, error: "OAuth Client ID or Client Secret missing for token refresh." };
  }

  try {
    const res = await fetch(GOOGLE_TOKEN_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: config.oauth.refreshToken,
        grant_type: "refresh_token",
      }).toString(),
    });

    const data = await res.json();

    if (!res.ok || data.error) {
      // Mark as disconnected if refresh token was revoked
      if (data.error === "invalid_grant") {
        config.isConnected = false;
        saveStoredGmailConfig(config);
      }
      return {
        token: null,
        error: `Google authorization expired or revoked (${data.error_description || data.error}). Please reconnect Gmail.`,
      };
    }

    const newAccessToken = data.access_token;
    const tokenExpiry = Date.now() + (data.expires_in || 3600) * 1000;

    config.oauth.accessToken = newAccessToken;
    config.oauth.tokenExpiry = tokenExpiry;
    saveStoredGmailConfig(config);

    return { token: newAccessToken };
  } catch (err: any) {
    return { token: null, error: err.message || "Failed to refresh Google access token" };
  }
}

/**
 * Disconnects Gmail integration and clears tokens
 */
export function disconnectGmail(): void {
  const config = getStoredGmailConfig();
  const updated: GmailConfig = {
    ...config,
    isConnected: false,
    connectedEmail: null,
    oauth: {
      ...config.oauth,
      accessToken: null,
      refreshToken: null,
      tokenExpiry: null,
    },
  };
  saveStoredGmailConfig(updated);
}

/**
 * Creates RFC 2822 compliant email string
 */
function createRFC2822Message(options: {
  from: string;
  to: string;
  subject: string;
  htmlBody: string;
  textBody?: string;
  replyTo?: string;
}): string {
  const boundary = `====_Electra_Boundary_${Date.now()}_====`;
  const cleanSubject = options.subject.replace(/[\r\n]/g, " ");
  const base64Subject = Buffer.from(cleanSubject, "utf-8").toString("base64");

  const lines = [
    `From: ${options.from}`,
    `To: ${options.to}`,
    `Subject: =?UTF-8?B?${base64Subject}?=`,
  ];

  if (options.replyTo) {
    lines.push(`Reply-To: ${options.replyTo}`);
  }

  lines.push("MIME-Version: 1.0");
  lines.push(`Content-Type: multipart/alternative; boundary="${boundary}"`);
  lines.push("");

  // Plain text part
  const textContent = options.textBody || options.htmlBody.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  lines.push(`--${boundary}`);
  lines.push("Content-Type: text/plain; charset=UTF-8");
  lines.push("Content-Transfer-Encoding: base64");
  lines.push("");
  lines.push(Buffer.from(textContent, "utf-8").toString("base64"));
  lines.push("");

  // HTML part
  lines.push(`--${boundary}`);
  lines.push("Content-Type: text/html; charset=UTF-8");
  lines.push("Content-Transfer-Encoding: base64");
  lines.push("");
  lines.push(Buffer.from(options.htmlBody, "utf-8").toString("base64"));
  lines.push("");

  lines.push(`--${boundary}--`);

  return lines.join("\r\n");
}

/**
 * Base64 URL Safe encoding required by Gmail API
 */
function base64UrlEncode(str: string): string {
  return Buffer.from(str)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

/**
 * Main Email Dispatcher: Delivers email directly through connected Gmail account
 */
export async function sendEmail(options: SendEmailOptions): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const config = getStoredGmailConfig();
  const recipient = options.to || config.recipientEmail || "sales@electrasolar.in";

  if (!config.isConnected) {
    return {
      success: false,
      error: "Gmail integration is not connected. An administrator must authorize Gmail via Google OAuth 2.0 in the Admin Panel.",
    };
  }

  const { token, error: tokenError } = await getValidAccessToken();
  if (!token || tokenError) {
    return {
      success: false,
      error: tokenError || "Unable to retrieve valid Google access token.",
    };
  }

  const senderEmail = config.connectedEmail || "me";
  const fromHeader = `"${config.senderName || "Electra Solar"}" <${senderEmail}>`;

  const rfc2822 = createRFC2822Message({
    from: fromHeader,
    to: recipient,
    subject: options.subject,
    htmlBody: options.htmlBody,
    textBody: options.textBody,
    replyTo: options.replyTo,
  });

  const raw = base64UrlEncode(rfc2822);

  try {
    const res = await fetch(GMAIL_SEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ raw }),
    });

    const data = await res.json();

    if (!res.ok || data.error) {
      const errMsg = data.error?.message || data.error?.errors?.[0]?.message || "Gmail API rejected email send request";
      return { success: false, error: errMsg };
    }

    return { success: true, messageId: data.id };
  } catch (err: any) {
    return { success: false, error: err.message || "Network error while connecting to Gmail API" };
  }
}
