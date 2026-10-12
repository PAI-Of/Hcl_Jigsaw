/**
 * Fictional example messages for testing the scam detector.
 * Labeled clearly as fictional examples; safe URLs and training content only.
 */
export const exampleMessages = [
  {
    id: 'scholarship',
    title: 'Fake Scholarship Award',
    category: 'Education Scam',
    text: 'Congratulations! You have won a ₹1,00,000 scholarship from SBI. Claim now: http://sbii-bannk.example',
    hint: 'Contains urgency, unearned financial prize, and lookalike bank domain.'
  },
  {
    id: 'parcel',
    title: 'Fake Parcel Delivery',
    category: 'Delivery Fraud',
    text: 'Your parcel is on hold. Pay ₹25 immediately to avoid cancellation and return: http://delivery-check.example',
    hint: 'Uses minimal fee trick to steal credit card details or bank credentials.'
  },
  {
    id: 'kyc',
    title: 'Suspicious Bank KYC Notice',
    category: 'Banking / KYC Fraud',
    text: 'Dear customer, your bank account will be blocked today. Update your KYC immediately using this link: http://kyc-update-alert.example',
    hint: 'Artificial panic, urgent account suspension threat, and unverified link.'
  },
  {
    id: 'job',
    title: 'Work-From-Home Job Offer',
    category: 'Employment Scam',
    text: 'Congratulations! You have been selected for an online data entry work-from-home job earning ₹35,000/week. Pay a registration fee of ₹999 to receive your offer letter.',
    hint: 'Unsolicited offer, upfront payment request, and unrealistically high pay.'
  },
  {
    id: 'legitimate',
    title: 'Informational Utility Bill',
    category: 'Legitimate Notice',
    text: 'Your electricity bill of ₹1,420 for consumer no. 482910 has been generated. Due date is 25th of this month. Pay via your regular electricity board portal or utility app.',
    hint: 'Neutral informational tone, mentions standard portals, no urgent threats or shady links.'
  }
];
