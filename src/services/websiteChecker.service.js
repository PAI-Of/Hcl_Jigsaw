/**
 * Service for communicating with the website genuineness verification API
 */

/**
 * Normalizes and ensures completeness of the website assessment result
 * @param {object} rawResult 
 * @returns {object}
 */
export function normalizeWebsiteResult(rawResult) {
  if (!rawResult || typeof rawResult !== 'object') {
    throw new Error('Received an invalid verification result from the server.');
  }

  const assessment = rawResult.assessment || {};
  const validVerdicts = ['likely_legitimate', 'suspicious', 'likely_scam', 'inconclusive'];
  let verdict = (assessment.verdict || '').toLowerCase().replace(/\s+/g, '_');
  if (!validVerdicts.includes(verdict)) {
    if (verdict.includes('scam') || verdict.includes('phish')) verdict = 'likely_scam';
    else if (verdict.includes('legit') || verdict.includes('safe')) verdict = 'likely_legitimate';
    else if (verdict.includes('susp')) verdict = 'suspicious';
    else verdict = 'inconclusive';
  }

  let riskScore = Number(assessment.riskScore);
  if (isNaN(riskScore)) riskScore = 50;
  riskScore = Math.max(0, Math.min(100, Math.round(riskScore)));

  let confidence = Number(assessment.confidence);
  if (isNaN(confidence)) confidence = 75;
  confidence = Math.max(0, Math.min(100, Math.round(confidence)));

  const summary = typeof assessment.summary === 'string' && assessment.summary.trim()
    ? assessment.summary.trim()
    : 'Website inspection completed.';

  const evidence = Array.isArray(assessment.evidence)
    ? assessment.evidence.filter(e => e && e.detail).map(e => ({
        type: e.type || 'indicator',
        detail: String(e.detail)
      }))
    : [];

  const recommendedActions = Array.isArray(assessment.recommendedActions)
    ? assessment.recommendedActions.filter(a => typeof a === 'string' && a.trim().length > 0)
    : ['Do not submit personal passwords, banking credentials, or UPI details on unverified pages.'];

  const verificationSteps = Array.isArray(assessment.verificationSteps)
    ? assessment.verificationSteps.filter(s => typeof s === 'string' && s.trim().length > 0)
    : ['Check the official domain via an independent search engine or verified corporate directory.'];

  return {
    source: rawResult.source || 'ai_engine',
    url: rawResult.url || '',
    domain: rawResult.domain || '',
    hasHttps: Boolean(rawResult.hasHttps),
    scrapedData: {
      pageTitle: rawResult.scrapedData?.pageTitle || '',
      cleanTexts: Array.isArray(rawResult.scrapedData?.cleanTexts) ? rawResult.scrapedData.cleanTexts : [],
      totalChars: rawResult.scrapedData?.totalChars || 0
    },
    duckDuckGoOverview: {
      reputation: rawResult.duckDuckGoOverview?.reputation || 'unknown',
      summary: rawResult.duckDuckGoOverview?.summary || 'No overview available.',
      hasNegativeSignals: Boolean(rawResult.duckDuckGoOverview?.hasNegativeSignals),
      negativeSignals: Array.isArray(rawResult.duckDuckGoOverview?.negativeSignals) ? rawResult.duckDuckGoOverview.negativeSignals : [],
      snippets: Array.isArray(rawResult.duckDuckGoOverview?.snippets) ? rawResult.duckDuckGoOverview.snippets : []
    },
    assessment: {
      verdict,
      riskScore,
      confidence,
      summary,
      httpsStatus: {
        isSecure: Boolean(assessment.httpsStatus?.isSecure ?? rawResult.hasHttps),
        details: assessment.httpsStatus?.details || (rawResult.hasHttps ? 'HTTPS encryption active.' : 'Plain HTTP connection without encryption.')
      },
      duckDuckGoOverview: {
        reputation: assessment.duckDuckGoOverview?.reputation || rawResult.duckDuckGoOverview?.reputation || 'unknown',
        summary: assessment.duckDuckGoOverview?.summary || rawResult.duckDuckGoOverview?.summary || 'DuckDuckGo reputation check completed.'
      },
      scrapedContentFindings: {
        summary: assessment.scrapedContentFindings?.summary || 'Visible content checked for fraud indicators.',
        suspiciousPhrases: Array.isArray(assessment.scrapedContentFindings?.suspiciousPhrases) ? assessment.scrapedContentFindings.suspiciousPhrases : [],
        safePhrases: Array.isArray(assessment.scrapedContentFindings?.safePhrases) ? assessment.scrapedContentFindings.safePhrases : []
      },
      evidence,
      recommendedActions,
      verificationSteps
    }
  };
}

/**
 * Initiates website genuineness verification via the backend API
 * @param {string} websiteUrl 
 * @param {AbortSignal} [signal] 
 * @returns {Promise<object>}
 */
export async function checkWebsiteGenuineness(websiteUrl, signal = null) {
  if (!websiteUrl || !websiteUrl.trim()) {
    throw new Error('Please enter a website URL or domain name to verify.');
  }

  const response = await fetch('/api/check-website', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ url: websiteUrl.trim() }),
    signal
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const msg = errorData?.error || `Server returned error HTTP ${response.status}: ${response.statusText}`;
    throw new Error(msg);
  }

  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error || 'Website verification failed.');
  }

  return normalizeWebsiteResult(data);
}
