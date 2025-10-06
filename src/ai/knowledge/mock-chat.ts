
export type MockChat = {
  user_prompt: string;
  chatbot: string;
};

export const mockChatData: MockChat[] = [
  // Use Case 1
  {
    user_prompt: 'Hi',
    chatbot:
      'Hello! How can I assist you with Krungthai-AXA insurance products today? If you have any questions about our health, life, or savings insurance plans, feel free to ask.',
  },
  {
    user_prompt: 'Why should I buy LifeReady?',
    chatbot:
      'LifeReady is an excellent choice if you are looking for comprehensive, lifelong protection with flexible payment options. Here are the key reasons to consider this plan:\n' +
      'Lifelong Coverage: Protection up to age 99, ensuring peace of mind for you and your loved ones.\n' +
      'Flexible Premium Payment: Choose from several payment periods (6, 12, 18 years, or up to age 99) to suit your financial situation.\n' +
      'Affordable Entry: Minimum sum assured starts at just 150,000 Baht, with premium discounts for higher coverage.\n' +
      'Customizable Protection: Add riders for extra coverage tailored to your needs.\n' +
      'Tax Benefits: Eligible for tax deductions up to 100,000 Baht per year (as per Revenue Department criteria).\n' +
      'Would you like a premium quote or more details about the available riders?',
  },
  {
    user_prompt: 'Can I buy riders for this product?',
    chatbot:
      'Yes, you can purchase riders (additional coverage options) for the iLink product. However, please note:\n' +
      'Riders (UDR: Unit Deducing Riders) can only be attached at the time of the initial application for a new policy.\n' +
      'You cannot add riders to your policy at a later date.\n' +
      'Would you like more details about the available riders or assistance in choosing the right ones for your needs?',
  },
  {
    user_prompt: "I'm in Bangkok, which hospital can I use my insurance claims?",
    chatbot:
      'You can use your Krungthai-AXA insurance claims at many hospitals and clinics in Bangkok. Here are some options:\n' +
      'Major Hospitals in the Network\n' +
      'Bangkok Hospital Medical Center\n' +
      'Bumrungrad International Hospital\n' +
      'BNH Hospital\n' +
      'Samitivej Hospital Sukhumvit\n' +
      'Vichaiyut Hospital & Medical Center\n' +
      'Siriraj Hospital\n' +
      'Praram 9 Hospital\n' +
      'Phyathai 1, 2, 3 Hospitals\n' +
      'Paolo Hospital Phaholyothin\n' +
      'Vejthani Hospital\n' +
      'Saint Louis Hospital\n' +
      'Ramkhamhaeng Hospital\n' +
      'Yanhee International Hospital\n' +
      'Popular Clinics\n' +
      'Bangkok Smile Dental Clinic (multiple branches)\n' +
      'Kluaynamthai Clinic (Phahonyothin, Ploenchit)\n' +
      'Central Medic Clinic (Din Daeng, Prakanong, Ratchada, St. Louis)\n' +
      'RSU Medical Center Clinic\n' +
      'You can also use your insurance at many other listed hospitals and clinics in Bangkok. Would you like a full list or recommendations based on your location or medical needs?',
  },
  // Use Case 2
  {
    user_prompt: 'Hi what is ishield',
    chatbot:
      'iShield is a whole life insurance product from Krungthai-AXA that provides critical illness coverage. Here are the key features:\n' +
      'Comprehensive Protection: Covers you against serious illnesses, helping to secure your happiness and your family\'s financial stability.\n' +
      'Flexible Premium Payment: Choose to pay premiums over 5, 10, 15, or 20 years.\n' +
      'Coverage Period: Protection lasts up to age 85.\n' +
      'Sum Assured: Minimum 100,000 Baht, maximum 5,000,000 Baht.\n' +
      'Premium Stability: Premiums remain the same throughout the payment period and do not increase with age.\n' +
      'Tax Benefits: Premiums can be used for personal income tax deductions (up to 100,000 Baht/year).\n' +
      'Eligibility: Available for applicants from 1 month old up to 56 years (depending on the chosen payment period).\n' +
      'Would you like to know about the premium rates, coverage details, or how to apply?',
  },
  {
    user_prompt: 'How do I apply?',
    chatbot:
      'You can apply for benefits according to your Krungthai-AXA policy using several convenient methods:\n' +
      '1. Written Notification (Benefit Request Form - DCA)\n' +
      'Obtain the Benefit Request Form (DCA) from the head office, branch, agency, or download from the website.\n' +
      'Prepare these documents:\n' +
      'Completed Benefit Request Form (DCA)\n' +
      'Copy of your national ID card (or passport for foreigners)\n' +
      'Copy of your bank account statement (if receiving via bank account; joint/merchant accounts not eligible)\n' +
      'Submit documents by mail, through your policy administrator, or in person at any branch or One Stop Service Center.\n' +
      '2. Automatic Debit Authorization\n' +
      'Fill out the bank account debit authorization form (available at offices or online).\n' +
      'Attach:\n' +
      'Letter of consent for automatic premium deduction (DA Form)\n' +
      'First page of your bank account statement\n' +
      'Copy of your ID card or passport\n' +
      'Submit as above.\n' +
      '3. Enroll via Mobile Banking\n' +
      'Register for automatic debit through your bank’s mobile app.\n' +
      'Enter your policy number (Ref1) and ID number (Ref2).\n' +
      'Take a screenshot of the successful transaction as proof.\n' +
      'If you have a policy number, no need to submit documents unless the insured is not the premium payer.\n' +
      'Submission Methods\n' +
      'Mail to: Payment and Benefit Service Department, Krung Thai-Axa Life Insurance Public Co., Ltd., G Tower Grand Rama 9, Bangkok 10310\n' +
      'Through your policy administrator\n' +
      'In person at head office or branch offices (Mon–Fri, 8:30 AM–5:00 PM)\n' +
      'Note: If the insured is not the premium payer, or if you do not have a policy number, additional documents to prove the relationship are required.\n' +
      'Would you like help downloading the forms or finding the nearest branch?',
  },
  {
    user_prompt: "sound interesting, I'm in",
    chatbot:
      'That\'s great to hear! Here’s how you can take the next step:\n' +
      'Ready to Secure Your Future?\n' +
      'Contact a Krungthai-AXA advisor for a personalized consultation.\n' +
      'Get a premium quote tailored to your age, needs, and desired coverage.\n' +
      'Explore additional benefits and riders to enhance your protection.\n' +
      'Would you like help calculating your premium or connecting with an advisor? Let me know your age and preferred product, and I can assist you right away!',
  },
];
