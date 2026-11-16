// src/types/index.ts

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  icon: string;
  isPopular?: boolean;
  whatsappMessage: string;
}

export interface TestimonialItem {
  id: string;
  author: string;
  location: string;
  workDone: string;
  date: string;
  rating: number;
  comment: string;
  avatarText: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ZoneItem {
  name: string;
  neighborhoods: string[];
  badge: string;
}
