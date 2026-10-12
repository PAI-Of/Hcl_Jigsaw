/**
 * Detailed educational content for each scam category in Safety Academy.
 * Adheres strictly to the 10-step educational framework.
 */
export const scamTopics = {
  'phishing': {
    slug: 'phishing',
    title: 'Phishing & Lookalike Links',
    category: 'Communication Fraud',
    readTime: '5 min read',
    overview: 'Attackers create deceptive websites and messages that mimic banks, courier services, or utility companies to steal passwords and personal data.',
    whatIsIt: 'Phishing is a social engineering technique where criminals impersonate reputable entities (banks, tech companies, couriers) via emails, SMS (smishing), messaging apps, or QR codes (quishing). Their objective is to trick you into entering credentials, sensitive payment cards, or downloading malicious tools.',
    howItWorks: [
      'The criminal crafts a spoofed message designed to trigger panic, curiosity, or greed (e.g., "Account blocked in 2 hours").',
      'The message includes a hyperlink that looks very similar to an authentic URL (e.g., using "sbii-bannk.example" or typosquatting like "paytm-kyc.net").',
      'Clicking the link opens a counterfeit portal resembling the real organization’s login screen.',
      'When you type your user ID, password, or card numbers, the data is instantly captured on the scammer’s remote server.',
      'The scammer quickly uses your credentials to drain funds or take over accounts before you notice.'
    ],
    fictionalExample: {
      channel: 'SMS Alert',
      sender: 'VD-SBIINB (Spoofed Sender ID)',
      messageText: 'URGENT: Your State Bank account has been restricted due to unverified PAN. Tap http://sbi-pan-update.example/login to verify within 24 hours to prevent permanent deactivation.',
      breakdown: 'Notice the lookalike domain (sbi-pan-update.example instead of onlinesbi.sbi), the false deadline (24 hours), and the threat of permanent deactivation.'
    },
    warningSigns: [
      'Subtle spelling variations in domain names (e.g., using "-support", extra letters, or weird top-level domains like .xyz or .top).',
      'High-pressure emotional triggers threatening account closure, legal action, or electricity disconnection.',
      'Generic greetings such as "Dear Customer" instead of your actual registered name.',
      'Unsolicited links received via SMS, WhatsApp, or email asking you to log in.',
      'Mismatched sender address or unverified international phone prefixes (+92, +234, etc.) on domestic services.'
    ],
    howToPrevent: [
      'Always inspect the full domain address before entering passwords. Legitimate Indian banks use secure domains such as onlinesbi.sbi or hdfcbank.com.',
      'Bookmark your essential bank, utility, and tax portals directly in your browser rather than clicking links in messages.',
      'Enable Multi-Factor Authentication (MFA) using authenticator apps rather than plain SMS whenever available.',
      'Never open attachments with extensions like .html, .exe, or .scr from unknown senders.'
    ],
    whatToDoIfEncountered: [
      'Do not click any link or reply to the message.',
      'Take a screenshot of the message including the sender address/number for documentation.',
      'Mark the message as spam and block the sender in your messaging app.',
      'Report the phishing link on the Indian Cyber Crime Reporting Portal (cybercrime.gov.in).'
    ],
    whatToDoIfAffected: [
      'Immediately change your online banking and email passwords from a different, clean device.',
      'Call your bank\'s customer care immediately to freeze your debit/credit card and internet banking credentials.',
      'If any unauthorized debit took place, immediately dial helpline 1930 to trigger the emergency freeze workflow.',
      'File a complaint on cybercrime.gov.in with all message headers, URLs, and transaction details.'
    ],
    whatNotToDo: [
      'Do not test whether the link is real by entering fake or real passwords on suspicious forms.',
      'Do not reply with angry messages, as this confirms to the scammer that your phone number is active.',
      'Do not forward the message to friends or family groups without clear warning labels.'
    ],
    knowledgeCheck: {
      question: 'You receive an SMS saying your bank account will be closed unless you update documents at "http://hdfc-kyc-verify.example". What is the safest course of action?',
      options: [
        'Click the link immediately to check if your account is really blocked.',
        'Ignore the link and verify your account status directly via the official bank app or branch.',
        'Enter fake account details on the website to see if it rejects them.'
      ],
      correctAnswerIndex: 1,
      explanation: 'Banks never send third-party domains to verify confidential documents. Always verify directly through the bank\'s official mobile application, official website, or nearest branch.'
    },
    samplePromptForDetector: 'URGENT: Your State Bank account has been restricted due to unverified PAN. Tap http://sbi-pan-update.example/login to verify within 24 hours to prevent permanent deactivation.'
  },

  'upi-scams': {
    slug: 'upi-scams',
    title: 'UPI & Payment Requests',
    category: 'Financial Fraud',
    readTime: '6 min read',
    overview: 'Scammers exploit misunderstandings of UPI mechanics using fake collect requests, QR code tricks, and remote access apps.',
    whatIsIt: 'UPI (Unified Payments Interface) scams manipulate users into authorizing outgoing payments under the false pretense of receiving money, claiming lottery prizes, or getting refunds. The most critical truth of UPI is: YOU NEVER NEED TO ENTER YOUR UPI PIN TO RECEIVE MONEY.',
    howItWorks: [
      'The scammer poses as a buyer on a marketplace (OLX, Quikr) or as a customer support executive.',
      'They claim they want to send you money or a refund.',
      'Instead of an incoming transfer, they send a "Collect Request" or a QR code labeled "Scan to receive payment".',
      'The victim scans the code or opens the UPI notification and enters their 4-digit or 6-digit UPI PIN.',
      'The moment the PIN is entered, the money is instantly debited from the victim\'s account and sent to the scammer.'
    ],
    fictionalExample: {
      channel: 'WhatsApp / Marketplace Call',
      sender: 'Army Officer (Posing as Buyer)',
      messageText: 'Sir, I am posting payment of ₹15,000 for your used sofa. I have sent a UPI barcode. Please scan this QR code and type your UPI PIN to approve receipt into your bank.',
      breakdown: 'Entering a UPI PIN authorizes a withdrawal. You never enter a PIN to receive a payment. Posing as an army officer or government official is a classic trust trick.'
    },
    warningSigns: [
      'Anyone asking you to scan a QR code to "receive" funds or "verify" an incoming refund.',
      'Receiving a UPI "Collect Request" notification on PhonePe, Google Pay, or Paytm from an unfamiliar VPA.',
      'Requests to install remote support apps (AnyDesk, TeamViewer QuickSupport, RustDesk) to "resolve a payment error".',
      'Scammers requesting a test payment of ₹1 or ₹5 promising to refund ₹10,000 immediately afterwards.'
    ],
    howToPrevent: [
      'Remember the golden rule: Entering your UPI PIN ALWAYS debits money from your account. Receiving money requires no PIN.',
      'Never scan QR codes sent over WhatsApp or email to receive cash.',
      'Decline any unsolicited collect request on your UPI application immediately.',
      'Never install screen-sharing software at the request of an unknown caller.'
    ],
    whatToDoIfEncountered: [
      'Reject the collect request immediately inside your UPI app.',
      'Block the caller and report the VPA (Virtual Payment Address) in your payment application as fraud.',
      'Never approve any prompt requiring your PIN.'
    ],
    whatToDoIfAffected: [
      'Call the National Cybercrime Financial Fraud Helpline: 1930 immediately (the "Golden Hour" maximizes freeze chances).',
      'Log into cybercrime.gov.in and submit the transaction ID (UTR number), sender/receiver VPA, and bank statements.',
      'Notify your bank\'s fraud department immediately to block UPI services on your account temporarily.'
    ],
    whatNotToDo: [
      'Do not search for customer care phone numbers on Google Search; scammers place fake helpline ads at the top of results.',
      'Do not share your UPI PIN, ATM PIN, or OTP with anyone, even if they claim to work for NPCI or your bank.',
      'Do not allow screen sharing or grant accessibility permissions.'
    ],
    knowledgeCheck: {
      question: 'A buyer on an online marketplace sends you a QR code and tells you to scan it and enter your UPI PIN to receive ₹4,500. What happens if you enter the PIN?',
      options: [
        'The ₹4,500 will be safely deposited into your account.',
        'Your bank will verify your identity and hold the money.',
        '₹4,500 will be instantly deducted from your bank account and transferred to the scammer.'
      ],
      correctAnswerIndex: 2,
      explanation: 'A UPI PIN is an authorization to pay money OUT of your account. You NEVER need to enter a UPI PIN to receive money.'
    },
    samplePromptForDetector: 'Sir, I am sending you ₹12,000 for your old refrigerator. Please scan this QR code on PhonePe and enter your UPI PIN to accept the funds.'
  },

  'otp-fraud': {
    slug: 'otp-fraud',
    title: 'OTP Theft & Account Takeover',
    category: 'Authentication Fraud',
    readTime: '5 min read',
    overview: 'Tactics scammers use to coax one-time passwords out of victims to hijack email, banking, and social accounts.',
    whatIsIt: 'One-Time Passwords (OTPs) are dynamic security keys sent via SMS or email to verify critical actions like password resets, fund transfers, and SIM swaps. OTP fraud occurs when cybercriminals deceive you into revealing this confidential code.',
    howItWorks: [
      'The attacker obtains your username, card number, or phone number from a previous breach.',
      'They initiate a sensitive operation (e.g., initiating a card payment or resetting your Google account password).',
      'The service sends an authentic OTP to your phone.',
      'Simultaneously, the scammer calls you claiming to be a bank security executive verifying a "suspicious charge" or an electricity official preventing "power cut".',
      'They urge you to read out the code: "To cancel the transaction, share the 6-digit cancellation code you just received."',
      'You share the code; the scammer uses it to complete the unauthorized transfer.'
    ],
    fictionalExample: {
      channel: 'Phone Call + SMS',
      sender: 'Caller claiming to be Bank Fraud Analyst',
      messageText: 'Your card ending 4012 was charged ₹48,000 in Mumbai. To decline this charge and block the fraudster, please read the 6-digit verification code sent to your mobile.',
      breakdown: 'Notice the inversion tactic: they claim sharing the code will CANCEL the charge, when in reality sharing the code AUTHORIZES the charge.'
    },
    warningSigns: [
      'Any caller or message asking you to share an OTP, even if they claim to be from bank security, police, or courier support.',
      'The SMS containing the OTP clearly states: "Do not share this code with anyone, including bank staff."',
      'Calls arriving immediately after an unexpected OTP lands on your phone.',
      'Sudden loss of cellular network reception accompanied by unexpected password reset emails (indicator of SIM-swap attack).'
    ],
    howToPrevent: [
      'Adopt a strict zero-sharing rule: Never disclose an OTP to anyone under any circumstances.',
      'Carefully read the text of the OTP message: check the merchant name and amount mentioned in the SMS.',
      'Use hardware security keys or authenticator apps (TOTP) instead of SMS OTP wherever available.',
      'Protect your SIM card with a SIM PIN to prevent unauthorized physical cloning.'
    ],
    whatToDoIfEncountered: [
      'Hang up the call immediately. Do not speak further with the caller.',
      'Check the SMS details to identify what service the OTP was generated for.',
      'Change your password for the target service immediately.'
    ],
    whatToDoIfAffected: [
      'Instantly call your bank to freeze all cards, net banking, and UPI linked to your mobile number.',
      'Call 1930 to report financial theft to the National Cybercrime Reporting Portal.',
      'If your phone signal abruptly disappears for over an hour, contact your mobile operator immediately from another phone to check for unauthorized SIM swaps.'
    ],
    whatNotToDo: [
      'Never assume caller ID apps (like Truecaller) prove identity—caller IDs can easily be spoofed.',
      'Never read out OTPs even if the caller recites your address or partial card details.',
      'Do not forward SMS messages containing verification tokens.'
    ],
    knowledgeCheck: {
      question: 'A caller claiming to be an executive from your bank\'s anti-fraud department asks for the OTP you just received to "cancel an unauthorized transaction". What should you do?',
      options: [
        'Read out the OTP quickly so the fraudulent transaction is stopped.',
        'Refuse to share the OTP, hang up, and call the official bank helpline on the back of your card.',
        'Share only the last 3 digits of the OTP to be safe.'
      ],
      correctAnswerIndex: 1,
      explanation: 'Bank employees never ask for your OTP. Sharing an OTP allows the scammer to complete the transaction, not cancel it.'
    },
    samplePromptForDetector: 'Bank Security Alert: We detected an unauthorized charge of ₹32,000 on your card. Call 9812345678 or share the 6-digit cancellation OTP sent to your phone to reverse the transaction.'
  },

  'job-scams': {
    slug: 'job-scams',
    title: 'Work-From-Home & Job Offers',
    category: 'Employment Fraud',
    readTime: '5 min read',
    overview: 'Fraudulent employment listings, upfront registration charges, Telegram task scams, and fake appointment letters.',
    whatIsIt: 'Employment scams exploit job seekers by advertising lucrative, flexible work-from-home positions requiring little experience, only to demand upfront registration fees, security deposits, or participation in fake investment tasks.',
    howItWorks: [
      'Scammers send unsolicited messages via WhatsApp or Telegram offering daily earnings of ₹3,000–₹8,000 for simple tasks like "liking YouTube videos" or "reviewing hotels".',
      'The victim is paid a small genuine amount (e.g., ₹200–₹500) to build initial credibility and trust.',
      'The victim is added to a VIP Telegram group with bots celebrating massive fake earnings.',
      'The victim is instructed to deposit their own money into "prepaid tasks" to access supposed higher commissions.',
      'When the victim attempts to withdraw funds, they are hit with demands for "tax fees", "audit fees", and eventually blocked.'
    ],
    fictionalExample: {
      channel: 'WhatsApp Message',
      sender: '+44 7912 345678 (International recruiter impersonator)',
      messageText: 'Hello! I am Priya from Global HR Recruitment. We have part-time remote openings reviewing hotels and liking videos. Earn ₹4,500 daily. Just 30 mins work per day. Reply YES to start.',
      breakdown: 'Unsolicited international number, vague job description, outsized pay for trivial effort, and recruiting over personal messaging apps.'
    },
    warningSigns: [
      'Unsolicited job offers sent via WhatsApp, SMS, or Telegram.',
      'Demand for upfront "registration fees", "interview charges", "laptop courier insurance", or "training fees".',
      'Salaries that are wildly disproportionate to the required skill and time investment.',
      'Communication conducted solely via Telegram or personal Gmail/Yahoo addresses rather than verified corporate domains.'
    ],
    howToPrevent: [
      'Remember that genuine employers NEVER ask candidates to pay money for interviews, offer letters, or equipment deposits.',
      'Verify job postings on the official corporate careers page (e.g., companyname.com/careers).',
      'Research the recruiting entity on LinkedIn and check official email domains (e.g., @tcs.com, not @tcs-recruitment-hr.gmail.com).'
    ],
    whatToDoIfEncountered: [
      'Block the sender and report the WhatsApp/Telegram account as spam.',
      'Do not share personal identity documents (Aadhaar, PAN, passport copies) with unverified contacts.'
    ],
    whatToDoIfAffected: [
      'Stop sending any additional money regardless of what "withdrawal fee" or "penalty" the scammers threaten.',
      'Gather chat logs, payment receipts, and bank transaction IDs.',
      'File a complaint immediately at cybercrime.gov.in and call helpline 1930.'
    ],
    whatNotToDo: [
      'Do not pay "clearance fees" hoping to recover previously deposited money—it is a sunk-cost trap.',
      'Do not send pictures of your Aadhaar card or bank passbook to strangers over chat apps.',
      'Do not participate in "prepaid crypto rating" tasks.'
    ],
    knowledgeCheck: {
      question: 'A company contacts you offering a data entry role at ₹50,000 per month, but asks you to pay a refundable security deposit of ₹1,200 for software setup. What should you do?',
      options: [
        'Pay the ₹1,200 since it is refundable after the first paycheck.',
        'Decline the offer because legitimate companies never charge job applicants upfront fees.',
        'Ask to pay half now and half later.'
      ],
      correctAnswerIndex: 1,
      explanation: 'Legitimate employers never demand upfront fees or security deposits from candidates. Any job requiring payment to start is a scam.'
    },
    samplePromptForDetector: 'Dear Candidate, Congratulations! You have been selected for an online data entry work-from-home job earning ₹35,000/week. Pay a registration fee of ₹999 to receive your offer letter and welcome kit.'
  },

  'scholarship-scams': {
    slug: 'scholarship-scams',
    title: 'Scholarship & Exam Scams',
    category: 'Education Fraud',
    readTime: '4 min read',
    overview: 'Bogus merit grants, fake government education schemes, and fraudulent scholarship portals targeting students.',
    whatIsIt: 'Scholarship scams target students and parents with claims of winning unearned financial grants, merit awards, or admission seats, conditioned on paying "processing fees" or submitting identity papers.',
    howItWorks: [
      'A message announces that the student was selected for a prestigious scholarship (e.g., "National Merit Grant" or "SBI Youth Scholar").',
      'The message includes a lookalike link directing to a fake portal with counterfeit logos of the Ministry of Education or public banks.',
      'To claim the award, the user is instructed to pay an administrative fee or enter bank account credentials.',
      'The award never materializes, the processing fee is stolen, and submitted identity records may be used for identity theft.'
    ],
    fictionalExample: {
      channel: 'SMS / Email',
      sender: 'GOVT-SCHOLARSHIP (Spoofed)',
      messageText: 'PM Youth Digital Scheme 2026: You have been approved for a free laptop and ₹50,000 grant. Complete verification by paying ₹499 delivery fee at http://pm-laptop-grant.example before 6 PM.',
      breakdown: 'Claims free laptops and unearned government funds, imposes an artificial evening deadline, and asks for an upfront fee.'
    },
    warningSigns: [
      'Winning a scholarship you never applied for.',
      'Requirement to pay an "application processing charge", "stamp duty", or "verification fee" to receive free funds.',
      'Use of non-government web addresses (authentic Indian government portals use the .gov.in or .nic.in domain).',
      'Requests for confidential banking login passwords or UPI PINs to "deposit" the award.'
    ],
    howToPrevent: [
      'Check official government scholarships exclusively on the National Scholarship Portal (scholarships.gov.in).',
      'Verify private scholarships directly on the foundation\'s or university\'s authenticated official website.',
      'Never pay a fee to claim financial aid or grants.'
    ],
    whatToDoIfEncountered: [
      'Verify the scheme name against authentic government press releases (pib.gov.in).',
      'Notify your school or college administration so other students are alerted.',
      'Report the fraudulent website on cybercrime.gov.in.'
    ],
    whatToDoIfAffected: [
      'If banking details were compromised, immediately notify your bank and freeze cards.',
      'If identity documents (Aadhaar, mark sheets) were uploaded, monitor for fraudulent accounts opened in your name.'
    ],
    whatNotToDo: [
      'Do not click shortened links (bit.ly, tinyurl) claiming to lead to government educational schemes.',
      'Do not transfer money via UPI to individuals claiming to be scholarship officers.'
    ],
    knowledgeCheck: {
      question: 'Which domain extension indicates an authentic official website of an Indian government department or national scholarship?',
      options: [
        '.gov.in or .nic.in',
        '.org.in or .education.com',
        '.gov-india.org'
      ],
      correctAnswerIndex: 0,
      explanation: 'Only authentic central and state government bodies in India have access to the .gov.in and .nic.in domains.'
    },
    samplePromptForDetector: 'Congratulations! You have won a ₹1,00,000 scholarship from SBI Foundation. Pay a one-time registration fee of ₹499 to claim your award: http://sbii-scholarship-claim.example'
  },

  'impersonation': {
    slug: 'impersonation',
    title: 'Authority & Police Impersonation',
    category: 'Social Engineering',
    readTime: '6 min read',
    overview: 'Intimidation tactics using fake police, CBI, TRAI, and "digital arrest" video calls to extort money.',
    whatIsIt: 'Authority impersonation scams involve fraudsters posing as law enforcement (CBI, Cyber Crime Police, Mumbai Police, ED) or regulatory authorities (TRAI, FedEx, RBI). They falsely accuse victims of illegal activities and coerce them into transferring funds to "clear their name".',
    howItWorks: [
      'The victim receives an automated call claiming a parcel in their name was seized by customs containing narcotics or forged passports.',
      'The call is "transferred" to a fake police officer or CBI investigator in a mock police studio on Skype or WhatsApp video.',
      'The fake officer displays forged arrest warrants, supreme court seals, and threatens public disgrace.',
      'They place the victim under a fake "digital arrest"—forbidding them from leaving the room or disconnecting the call.',
      'The victim is coerced into liquidating savings and transferring money into a "government secret verification account", promising it will be returned after inspection.'
    ],
    fictionalExample: {
      channel: 'Video Call + Forged Warrant',
      sender: 'Officer Sandeep Rao (Posing as CBI Director)',
      messageText: 'A high-value parcel seized at Mumbai customs contains illegal contraband and bank cards in your name. FIR #402 has been registered. You are under digital arrest. Transfer ₹2,50,000 to the RBI clearance account for financial audit immediately.',
      breakdown: 'There is no concept of "digital arrest" in Indian law. Genuine police do not hold court over video calls or ask you to transfer funds to clear criminal allegations.'
    },
    warningSigns: [
      'Calls claiming your mobile number will be disconnected by TRAI in 2 hours due to illegal activity.',
      'Claims that you are under "digital arrest" or ordered not to disconnect a video call.',
      'Officials demanding money transfer to a "secure RBI account" or "police audit account".',
      'Display of fake police uniforms, office badges, and official-looking letterheads on messaging apps.'
    ],
    howToPrevent: [
      'Remember: THERE IS NO SUCH THING AS "DIGITAL ARREST" IN INDIAN JURISPRUDENCE.',
      'Police officers and CBI investigators do not interrogate suspects over WhatsApp/Skype video calls.',
      'Government agencies never ask citizens to transfer money to prove their innocence.'
    ],
    whatToDoIfEncountered: [
      'Disconnect the call immediately. You are under no legal obligation to stay on an unsolicited video call.',
      'Do not panic. Call your local police station or dial 112 to report the impersonation attempt.',
      'Report the incident and phone numbers to helpline 1930 and the Chakshu portal (sancharsaathi.gov.in).'
    ],
    whatToDoIfAffected: [
      'Call 1930 immediately to register a financial fraud case; every minute matters for police to coordinate inter-bank freezes.',
      'Visit your nearest cyber police station with call recordings, transaction numbers, and phone numbers.'
    ],
    whatNotToDo: [
      'Do not transfer money to any account, regardless of how intimidating the caller sounds.',
      'Do not isolate yourself from family or friends under the caller’s instructions of secrecy.'
    ],
    knowledgeCheck: {
      question: 'A caller wearing a police uniform on a WhatsApp video call tells you that you are under "digital arrest" and must transfer money to an RBI verification account. What should you do?',
      options: [
        'Transfer the money to clear your name and request a receipt.',
        'Disconnect immediately, recognize that "digital arrest" does not exist in law, and report it to local police / 1930.',
        'Keep the call connected until you can speak with your lawyer.'
      ],
      correctAnswerIndex: 1,
      explanation: 'Indian law has no provision for "digital arrest". Real police agencies never conduct investigations over WhatsApp video calls or demand money transfers.'
    },
    samplePromptForDetector: 'This is the Central Bureau of Investigation. An illegal narcotics parcel in your name was seized at customs. You are placed under digital arrest. Transfer your savings to account 918239102 for forensic verification or face immediate physical arrest.'
  },

  'online-shopping': {
    slug: 'online-shopping',
    title: 'Online Shopping & Marketplaces',
    category: 'E-Commerce Fraud',
    readTime: '5 min read',
    overview: 'Fake web stores, 80% discount lures, marketplace advance payments, and fraudulent courier tracking links.',
    whatIsIt: 'Online shopping scams trick consumers into paying for items that do not exist, buying counterfeit goods, or handing over payment card details to cloned e-commerce websites.',
    howItWorks: [
      'Fraudsters create polished web storefronts offering brand-name shoes, electronics, or clothes at discounts like 80–90% off.',
      'They promote these shops using sponsored ads on Instagram, Facebook, and search engines.',
      'Checkout requires credit card or upfront UPI payment; cash-on-delivery is mysteriously disabled.',
      'After payment, the customer receives no confirmation or a fake tracking number, and the website vanishes within days.'
    ],
    fictionalExample: {
      channel: 'Social Media Ad / Website',
      sender: 'MegaDealsIndia.online',
      messageText: 'FLASH SALE: Apple iPhone 15 Pro Max at just ₹18,999! Only 12 units left in stock. Free shipping for prepaid orders via UPI. Order now at http://mega-deals-india.online/buy',
      breakdown: 'Unrealistic 80%+ discount on premium electronics, high artificial urgency (12 units left), and no option for cash on delivery.'
    },
    warningSigns: [
      'Prices that seem too good to be true (e.g., luxury items sold for a fraction of retail).',
      'The website domain was registered only days ago (check using whois domain lookup tools).',
      'No physical contact address, only an anonymous Gmail address or WhatsApp number.',
      'Absence of Cash on Delivery (COD) or return/refund policies.'
    ],
    howToPrevent: [
      'Shop on well-known, established e-commerce platforms with trusted return mechanisms.',
      'Check customer reviews and domain age before buying from unknown social media stores.',
      'Prefer Cash on Delivery (COD) or credit cards with strong chargeback protections for new merchants.'
    ],
    whatToDoIfEncountered: [
      'Do not make payments to personal UPI IDs for commercial shopping.',
      'Report misleading advertisements on the advertising platform and to the National Consumer Helpline (consumerhelpline.gov.in).'
    ],
    whatToDoIfAffected: [
      'Contact your credit card issuer or bank to file a dispute / chargeback for unfulfilled goods.',
      'If payment was made via UPI to a fraudulent entity, lodge a grievance on 1930 and cybercrime.gov.in.'
    ],
    whatNotToDo: [
      'Do not pay advance courier fees for goods sold on peer-to-peer marketplaces before seeing the item in person.',
      'Do not click delivery rescheduling links received via random SMS.'
    ],
    knowledgeCheck: {
      question: 'You see an Instagram advertisement for a brand-new high-end smartphone priced at ₹12,000 (regular price ₹80,000) requiring upfront UPI payment. What is the most likely reality?',
      options: [
        'It is an authentic clearance sale directly from the manufacturer.',
        'It is a fraudulent storefront designed to steal your payment without delivering any product.',
        'It is a promotional gift subsidy by the government.'
      ],
      correctAnswerIndex: 1,
      explanation: 'Prices drastically lower than market rate are the most common sign of counterfeit or nonexistent products. Legitimate retailers do not sell flagship phones at 85% discounts.'
    },
    samplePromptForDetector: 'FLASH SALE: Apple iPhone 15 Pro Max at just ₹18,999! Only 5 units left in stock. Free shipping for prepaid orders via UPI. Order now at http://mega-deals-india.online/buy'
  },

  'romance-scams': {
    slug: 'romance-scams',
    title: 'Social Engineering & Romance Traps',
    category: 'Social Engineering',
    readTime: '4 min read',
    overview: 'Manipulative trust-building schemes, fake overseas lovers, customs clearance fee traps, and emotional extortion.',
    whatIsIt: 'Romance scams occur when cybercriminals create attractive, fictitious profiles on matrimonial portals, dating apps, or social media to cultivate emotional bonds and subsequently extract money under false pretexts.',
    howItWorks: [
      'The scammer creates a profile posing as an overseas NRI doctor, airline pilot, or wealthy professional.',
      'They quickly profess love and devotion, building intense emotional intimacy over weeks.',
      'They announce they are sending expensive gifts (gold, luxury watches, electronics) or coming to India to get married.',
      'The victim receives a call from a fake "Customs Official at Delhi Airport" demanding duty fees, anti-terrorist clearance fees, or foreign currency charges.',
      'The scammer begs the victim to pay the customs fee, promising reimbursement immediately upon arrival.'
    ],
    fictionalExample: {
      channel: 'Matrimonial / Instagram DM',
      sender: 'Dr. Michael (Posing as UK Surgeon)',
      messageText: 'My darling, I have sent a surprise parcel with luxury jewelry and £50,000 cash for our new life together. The airport customs officer called saying you must pay ₹45,000 clearance tax to release it today.',
      breakdown: 'Notice the romantic hook, the impossible claims (cash in international post), and the third-party customs impersonator demanding clearance fees.'
    },
    warningSigns: [
      'Someone you met online expressing intense love and dedication unusually quickly without meeting in person.',
      'Refusal to do live video calls due to claims of "poor military connection" or "hospital regulations".',
      'Requests to pay customs clearance charges, emergency hospital fees, or travel ticket costs.',
      'Urging you to shift conversations away from verified dating or matrimonial apps to private messaging.'
    ],
    howToPrevent: [
      'Conduct reverse image searches on profile pictures to spot stolen modeling or stock photos.',
      'Never send money, gifts, or financial assistance to someone you have never met face-to-face.',
      'Remember that Indian customs never calls recipients to deposit duties into personal savings accounts.'
    ],
    whatToDoIfEncountered: [
      'Stop communicating immediately and block the profile.',
      'Report the profile to the dating or matrimonial platform safety team.'
    ],
    whatToDoIfAffected: [
      'Save all communication logs, photos, bank account numbers, and transaction IDs.',
      'File an online complaint on cybercrime.gov.in and report to helpline 1930.'
    ],
    whatNotToDo: [
      'Do not send intimate photos or personal financial records, which scammers will use for blackmail.',
      'Do not feel embarrassed to seek help from trusted family or authorities—scammers are professional manipulators.'
    ],
    knowledgeCheck: {
      question: 'An online acquaintance you have never met in person claims to have sent you a gift box containing jewelry and cash, but says you must pay ₹35,000 to "Delhi Customs" to release it. What should you do?',
      options: [
        'Pay the ₹35,000 customs charge because customs duties are legitimate taxes.',
        'Refuse to pay, recognize this as a classic customs fee scam, and cut off contact immediately.',
        'Ask the acquaintance to pay half the fee first.'
      ],
      correctAnswerIndex: 1,
      explanation: 'Indian Customs does not demand tax payments into individual bank accounts via phone calls. This is a notorious cross-border romance fraud.'
    },
    samplePromptForDetector: 'My dearest, I mailed a surprise package for you from London containing gold ornaments and £25,000 cash. Customs officers in Mumbai have held the parcel. Please pay ₹42,000 clearance duty to account 8192019 to release it immediately.'
  },

  'malware': {
    slug: 'malware',
    title: 'Malicious Apps & APK Files',
    category: 'Technical Threats',
    readTime: '5 min read',
    overview: 'Infected Android APKs circulated via messaging groups, rogue loan apps, and dangerous accessibility permissions.',
    whatIsIt: 'Malware scams deceive users into installing rogue applications (often distributed as APK files outside official app stores) that intercept SMS messages, record screen activities, steal banking credentials, or harass contacts.',
    howItWorks: [
      'A message circulating on WhatsApp claims to offer free recharge, marriage invitations ("Wedding_Card.apk"), or electricity bill updates.',
      'The user taps the file and is prompted to enable "Install from Unknown Sources".',
      'Once installed, the app requests extensive permissions: Accessibility Services, SMS reading, Contact list, and Overlay permissions.',
      'The malware reads incoming OTPs in the background and forwards them to command-and-control servers, enabling silent account draining.'
    ],
    fictionalExample: {
      channel: 'WhatsApp Message with Attachment',
      sender: 'Forwarded Contact',
      messageText: 'Please download our wedding invitation card to view event dates and location: Wedding_Invitation_2026.apk (File size: 8.4 MB)',
      breakdown: 'A real wedding invitation is an image or PDF document, never an executable Android package (.apk) file.'
    },
    warningSigns: [
      'Files ending with .apk sent via WhatsApp, Telegram, or downloaded from untrusted websites.',
      'Apps demanding permission to read SMS messages, make phone calls, or access Android Accessibility services without logical need.',
      'Sudden rapid battery drain, device overheating, or unexpected popups on your home screen.',
      'Apps missing from your application drawer after installation.'
    ],
    howToPrevent: [
      'Never install applications from outside the official Google Play Store or Apple App Store.',
      'Keep Google Play Protect turned on and regularly scan your device.',
      'Never grant Accessibility permissions to unfamiliar or non-system applications.',
      'Be skeptical of invitations, government schemes, or utility updates distributed as APK files.'
    ],
    whatToDoIfEncountered: [
      'Delete the APK file immediately without opening or installing it.',
      'Warn the sender that their phone may be compromised and forwarding malicious files automatically.'
    ],
    whatToDoIfAffected: [
      'Put your device into Airplane Mode immediately to disconnect network access.',
      'Boot your phone into Safe Mode and uninstall the rogue application from Settings > Apps.',
      'Change all critical passwords (Google account, net banking, UPI) from a separate secure device.',
      'If the malware resists uninstallation, perform a complete factory reset of your device.'
    ],
    whatNotToDo: [
      'Do not click "Allow" on permission prompts requesting SMS or accessibility access.',
      'Do not forward APK files to group chats.'
    ],
    knowledgeCheck: {
      question: 'A friend sends you a WhatsApp file named "Electricity_Bill_Update.apk" and asks you to install it to prevent power disconnection. What should you do?',
      options: [
        'Install the APK to check your power bill status.',
        'Delete the file without opening it, as genuine utility updates never come as downloadable APK files.',
        'Open the APK but deny only the camera permission.'
      ],
      correctAnswerIndex: 1,
      explanation: 'Utility bills are provided via official websites, consumer portals, or PDF receipts. APK files sent via WhatsApp are malicious software designed to intercept your messages and banking data.'
    },
    samplePromptForDetector: 'Important Notice from Power Discom: Your electricity meter will be disconnected tonight at 9:30 PM due to unpaid balance. Download and update your connection immediately: http://discom-power-update.example/Electricity_Update.apk'
  },

  'report-cybercrime': {
    slug: 'report-cybercrime',
    title: 'How to Report Cybercrime in India',
    category: 'Action Guide',
    readTime: '7 min read',
    overview: 'Practical, step-by-step guidance on reporting cyber fraud via the 1930 helpline and the National Cyber Crime Reporting Portal.',
    whatIsIt: 'The Government of India provides specialized institutional mechanisms for citizens to report cyber fraud, freeze stolen funds, and initiate legal proceedings under the Information Technology Act. Knowing the exact sequence of actions can mean the difference between recovering your funds or losing them permanently.',
    howItWorks: [
      'Step 1: Immediate Financial Response via Helpline 1930. When financial fraud occurs, call 1930 immediately. The Citizen Financial Cyber Fraud Reporting and Management System (CFCFRMS) coordinates between the police and banks to trace and freeze transaction chains.',
      'Step 2: Golden Hour Window. The first 1–2 hours after an unauthorized transaction are crucial. During this window, funds typically sit in primary or secondary mule accounts before being converted to cash or crypto.',
      'Step 3: Portal Registration on cybercrime.gov.in. File an official complaint on the National Cyber Crime Reporting Portal. You will receive an Acknowledgement Number for formal police follow-up.',
      'Step 4: Formal Bank Notification. Submit a written dispute and copy of the cybercrime complaint to your bank’s Nodal Grievance Officer to invoke RBI guidelines on limited customer liability.'
    ],
    fictionalExample: {
      channel: 'Official Government Framework',
      sender: 'Ministry of Home Affairs (MHA) / I4C',
      messageText: 'National Cybercrime Helpline: 1930 | Official Reporting Portal: https://cybercrime.gov.in/ | Operated by Indian Cyber Crime Coordination Centre (I4C)',
      breakdown: 'This is the verified, authentic grievance mechanism for victims of cyber offenses across all Indian states and Union Territories.'
    },
    warningSigns: [
      'Websites pretending to be the official reporting portal but charging fees for "case filing". (cybercrime.gov.in is 100% free).',
      'Private agencies on social media claiming they "hack back" stolen money for an advance recovery charge. (These are secondary recovery scams).',
      'Delayed reporting: waiting days before contacting your bank or police drastically reduces the chance of freezing funds.'
    ],
    howToPrevent: [
      'Save the number 1930 in your mobile contacts as "National Cyber Helpline".',
      'Know your bank\'s 24x7 toll-free fraud reporting number and emergency card-blocking SMS format.',
      'Keep your bank account transaction alerts enabled via SMS and email.'
    ],
    whatToDoIfEncountered: [
      'Document all evidence: Take screenshots of messages, transaction receipts, bank debit SMS, call history, and VPA addresses.',
      'Dial 1930 immediately and provide the UTR (transaction reference) number, your bank account details, and the recipient account/VPA.'
    ],
    whatToDoIfAffected: [
      '1. Dial 1930 within the Golden Hour.',
      '2. File a formal complaint at https://cybercrime.gov.in/ under "Financial Fraud" or "Other Cyber Crime".',
      '3. Notify your bank in writing within 3 working days to protect your rights under the Reserve Bank of India (RBI) zero-liability framework for unauthorized electronic transactions.',
      '4. Keep your Complaint Acknowledgement Number safe for tracking and judicial follow-up.'
    ],
    whatNotToDo: [
      'Do not hire "recovery hackers" on Instagram, Telegram, or Twitter—no third party has legal authority or ability to recover funds.',
      'Do not delete messages, call logs, or links—they represent vital forensic evidence for police investigation.',
      'Do not delay calling 1930 to wait until morning or after the weekend.'
    ],
    knowledgeCheck: {
      question: 'You notice an unauthorized debit of ₹25,000 from your bank account via UPI. What is the most critical first step to freeze the money?',
      options: [
        'Post about the loss on social media to get public attention.',
        'Immediately call the national financial cyber fraud helpline 1930 and notify your bank to freeze transactions.',
        'Search online for a private recovery hacker.'
      ],
      correctAnswerIndex: 1,
      explanation: 'Calling 1930 immediately enables the National Cybercrime Reporting mechanism to alert beneficiary banks and freeze the money in the mule account before the criminal withdraws it.'
    },
    samplePromptForDetector: 'Notice: If you lost money in a scam, contact our private cyber recovery team at recovery-agent@consultant.example. We guarantee 100% money return within 24 hours for a small fee of ₹1,500.'
  }
};
