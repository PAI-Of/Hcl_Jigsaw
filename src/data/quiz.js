/**
 * General knowledge check questions for cyber safety tests
 */
export const generalQuizzes = [
  {
    id: 'upi-pin',
    topic: 'UPI Security',
    question: 'A stranger on OLX wants to buy your bicycle and asks you to enter your UPI PIN to receive ₹3,000. What happens if you enter your PIN?',
    options: [
      'The payment will be credited to your account.',
      '₹3,000 will be debited from your bank account immediately.',
      'Your bank will put the money into an escrow hold.'
    ],
    correctAnswerIndex: 1,
    explanation: 'A UPI PIN is exclusively used for authorizing money OUT of your bank account. You NEVER need to enter your PIN to receive money.'
  },
  {
    id: 'digital-arrest',
    topic: 'Police Impersonation',
    question: 'You receive a video call from someone in a police uniform claiming you are under "digital arrest" and must stay on video until you transfer bail funds. What is the truth?',
    options: [
      'Digital arrest is a new provision under the Indian criminal code.',
      'There is no legal provision called "digital arrest" in India; real law enforcement never interrogates or bails over WhatsApp/Skype.',
      'You must comply until you present your passport.'
    ],
    correctAnswerIndex: 1,
    explanation: 'The Ministry of Home Affairs and police departments have repeatedly clarified that "digital arrest" does not exist in Indian law. It is pure extortion.'
  },
  {
    id: 'financial-helpline',
    topic: 'Reporting Cybercrime',
    question: 'What is the official national helpline number for reporting financial cyber fraud in India?',
    options: [
      '1930',
      '100',
      '1091'
    ],
    correctAnswerIndex: 0,
    explanation: '1930 is the dedicated national helpline for cyber financial fraud, operated by the Indian Cyber Crime Coordination Centre (I4C).'
  }
];
