/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PageId = 'landing' | 'roi-calculator' | 'waitlist';

export interface WaitlistCompany {
  id: string;
  companyName: string;
  clientName: string;
  email: string;
  addedAt: string;
  isRecent?: boolean;
}

export interface WaitlistRecord {
  email: string;
  companyName: string;
  arrRange: string;
  role: string;
  ticketId: string;
  signupDate: string;
}

export interface ChurnCustomer {
  id: string;
  companyName: string;
  riskScore: number; // 0 to 100
  arrImpact: number; // yearly USD value
  healthTrend: 'up' | 'stable' | 'down';
  signals: string[];
  owner: string;
}

export interface RevenueProjectionPoint {
  monthName: string; // e.g. "Jun", "Jul"
  historical?: number; // actual reported MRR
  projected?: number; // projected MRR
  confidenceLower?: number;
  confidenceUpper?: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
