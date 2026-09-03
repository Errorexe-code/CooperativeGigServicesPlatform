export interface VouchUser {
  id: string;
  name: string;
  initials: string;
  relation: string;
}

export interface Review {
  id: string;
  reviewerName: string;
  reviewerInitials: string;
  rating: number;
  comment: string;
  date: string;
  service: string;
}

export interface Worker {
  id: string;
  name: string;
  initials: string;
  skill: string;
  skillEmoji: string;
  vouches: number;
  distance: string;
  rating: number;
  ratingCount: number;
  imageUrl: string;
  available: boolean;
  availableNow: boolean;
  location: string;
  bio: string;
  completedJobs: number;
  joinedDate: string;
  radius: number;
  phone: string;
  earnings: {
    total: number;
    thisMonth: number;
    workerShare: number;
    platformFee: number;
    coopFund: number;
  };
  vouchedBy: VouchUser[];
  reviews: Review[];
}

export interface Service {
  id: string;
  name: string;
  emoji: string;
  bgColor: string;
  textColor: string;
}

export interface Booking {
  id: string;
  workerId: string;
  workerName: string;
  workerInitials: string;
  skill: string;
  date: string;
  time: string;
  address: string;
  status: 'booked' | 'matched' | 'in_progress' | 'completed' | 'cancelled';
  amount: number;
}

export interface EarningsTransaction {
  id: string;
  date: string;
  service: string;
  skillEmoji: string;
  customerName: string;
  bookingId: string;
  totalAmount: number;
  workerEarned: number;
  platformFee: number;
  coopFund: number;
  status: 'paid' | 'penalty';
  penaltyAmount?: number;
}

export const cancelConfig = {
  windowHours: 2,
  penaltyAmount: 150,
};

export const services: Service[] = [
  { id: 'electrician', name: 'Electrician', emoji: '⚡', bgColor: '#FEF9C3', textColor: '#854D0E' },
  { id: 'plumber', name: 'Plumber', emoji: '🔧', bgColor: '#DBEAFE', textColor: '#1D4ED8' },
  { id: 'cook', name: 'Cook', emoji: '🍳', bgColor: '#FEE2E2', textColor: '#B91C1C' },
  { id: 'tutor', name: 'Tutor', emoji: '📚', bgColor: '#F9E5DF', textColor: '#A84D35' },
  { id: 'carpenter', name: 'Carpenter', emoji: '🪚', bgColor: '#FFEDD5', textColor: '#C2410C' },
  { id: 'cleaner', name: 'Cleaner', emoji: '🧹', bgColor: '#CFFAFE', textColor: '#0E7490' },
];

export const workers: Worker[] = [
  {
    id: '1',
    name: 'Ravi Kumar',
    initials: 'RK',
    skill: 'Electrician',
    skillEmoji: '⚡',
    vouches: 24,
    distance: '0.8 km',
    rating: 4.8,
    ratingCount: 142,
    imageUrl: 'https://randomuser.me/api/portraits/men/10.jpg',
    available: true,
    availableNow: true,
    location: 'Koramangala, Bangalore',
    phone: '+91 98765 43210',
    bio: 'Licensed electrician with 8 years of experience. Specializes in household wiring, MCB panel work, and inverter installation. Trusted by over 140 families in the area.',
    completedJobs: 142,
    joinedDate: 'March 2023',
    radius: 5,
    earnings: {
      total: 38500,
      thisMonth: 7200,
      workerShare: 31185,
      platformFee: 3850,
      coopFund: 3465,
    },
    vouchedBy: [
      { id: 'v1', name: 'Suresh Nair', initials: 'SN', relation: 'Neighbor' },
      { id: 'v2', name: 'Priya Sharma', initials: 'PS', relation: 'Former client' },
      { id: 'v3', name: 'Anjali Rao', initials: 'AR', relation: 'Community member' },
      { id: 'v4', name: 'Meena Devi', initials: 'MD', relation: 'Neighbor' },
    ],
    reviews: [
      { id: 'r1a', reviewerName: 'Anita Gupta', reviewerInitials: 'AG', rating: 5, comment: 'Fixed our MCB trip in 20 minutes. Very professional and tidy — left no mess behind.', date: '2 Sep 2024', service: 'MCB trip fix' },
      { id: 'r1b', reviewerName: 'Rajesh Menon', reviewerInitials: 'RM', rating: 5, comment: 'Installed 3 ceiling fans beautifully. Explained everything clearly before starting.', date: '28 Aug 2024', service: 'Fan installation' },
      { id: 'r1c', reviewerName: 'Deepa Krishnan', reviewerInitials: 'DK', rating: 4, comment: 'Good work, arrived on time. Wiring inspection was thorough. Would hire again.', date: '20 Aug 2024', service: 'Wiring inspection' },
    ],
  },
  {
    id: '2',
    name: 'Meena Devi',
    initials: 'MD',
    skill: 'Cook',
    skillEmoji: '🍳',
    vouches: 18,
    distance: '1.2 km',
    rating: 4.9,
    ratingCount: 89,
    imageUrl: 'https://randomuser.me/api/portraits/women/22.jpg',
    available: true,
    availableNow: true,
    location: 'Indiranagar, Bangalore',
    phone: '+91 87654 32109',
    bio: 'Experienced home cook specializing in South Indian, North Indian, and continental cuisine. Available for daily cooking, tiffin service, or special occasions.',
    completedJobs: 89,
    joinedDate: 'June 2023',
    radius: 3,
    earnings: {
      total: 24200,
      thisMonth: 4800,
      workerShare: 19602,
      platformFee: 2420,
      coopFund: 2178,
    },
    vouchedBy: [
      { id: 'v5', name: 'Ravi Kumar', initials: 'RK', relation: 'Neighbor' },
      { id: 'v6', name: 'Kavitha Menon', initials: 'KM', relation: 'Community member' },
      { id: 'v7', name: 'Priya Sharma', initials: 'PS', relation: 'Former client' },
    ],
    reviews: [
      { id: 'r2a', reviewerName: 'Sunita Rao', reviewerInitials: 'SR', rating: 5, comment: 'Cooked for a family gathering of 20 people. Food was absolutely incredible — everyone asked for her contact!', date: '1 Sep 2024', service: 'Event cooking' },
      { id: 'r2b', reviewerName: 'Vikram Singh', reviewerInitials: 'VS', rating: 5, comment: 'Daily cooking for a month, never disappointed once. Like having a professional chef at home.', date: '25 Aug 2024', service: 'Daily cooking' },
      { id: 'r2c', reviewerName: 'Kavitha Pillai', reviewerInitials: 'KP', rating: 5, comment: 'Amazing taste and very clean kitchen habits. Left the kitchen spotless after every session.', date: '10 Aug 2024', service: 'Tiffin service' },
    ],
  },
  {
    id: '3',
    name: 'Suresh Nair',
    initials: 'SN',
    skill: 'Plumber',
    skillEmoji: '🔧',
    vouches: 31,
    distance: '2.1 km',
    rating: 4.7,
    ratingCount: 203,
    imageUrl: 'https://randomuser.me/api/portraits/men/45.jpg',
    available: false,
    availableNow: false,
    location: 'HSR Layout, Bangalore',
    phone: '+91 76543 21098',
    bio: 'Expert plumber with 12 years of experience. Handles pipe fitting, bathroom renovations, water heater installation, and drainage work.',
    completedJobs: 203,
    joinedDate: 'January 2023',
    radius: 8,
    earnings: {
      total: 51800,
      thisMonth: 9600,
      workerShare: 41958,
      platformFee: 5180,
      coopFund: 4662,
    },
    vouchedBy: [
      { id: 'v8', name: 'Ravi Kumar', initials: 'RK', relation: 'Colleague' },
      { id: 'v9', name: 'Meena Devi', initials: 'MD', relation: 'Neighbor' },
      { id: 'v10', name: 'Priya Sharma', initials: 'PS', relation: 'Former client' },
      { id: 'v11', name: 'Anjali Rao', initials: 'AR', relation: 'Community member' },
      { id: 'v12', name: 'Kiran Rao', initials: 'KR', relation: 'Community member' },
    ],
    reviews: [
      { id: 'r3a', reviewerName: 'Rohan Mehta', reviewerInitials: 'RM', rating: 5, comment: 'Called him at 11 PM for a burst pipe — arrived within 40 minutes. Absolute lifesaver. Highly recommend.', date: '3 Sep 2024', service: 'Emergency pipe repair' },
      { id: 'r3b', reviewerName: 'Priya Krishnan', reviewerInitials: 'PK', rating: 4, comment: 'Good bathroom renovation work. Tiled neatly and sealed everything properly. Took an extra day but worth it.', date: '15 Aug 2024', service: 'Bathroom renovation' },
      { id: 'r3c', reviewerName: 'Ajay Sharma', reviewerInitials: 'AS', rating: 5, comment: 'Very knowledgeable about water heater installation. Explained the warranty process and maintenance tips clearly.', date: '5 Aug 2024', service: 'Water heater install' },
    ],
  },
  {
    id: '4',
    name: 'Priya Sharma',
    initials: 'PS',
    skill: 'Tutor',
    skillEmoji: '📚',
    vouches: 42,
    distance: '1.5 km',
    rating: 4.9,
    ratingCount: 314,
    imageUrl: 'https://randomuser.me/api/portraits/women/34.jpg',
    available: true,
    availableNow: false,
    location: 'Koramangala, Bangalore',
    phone: '+91 65432 10987',
    bio: 'MSc Mathematics graduate offering tutoring for classes 6–12 and competitive exam prep (JEE, NEET, Board exams). Patient, experienced, flexible schedule.',
    completedJobs: 314,
    joinedDate: 'October 2022',
    radius: 4,
    earnings: {
      total: 67200,
      thisMonth: 12400,
      workerShare: 54432,
      platformFee: 6720,
      coopFund: 6048,
    },
    vouchedBy: [
      { id: 'v13', name: 'Suresh Nair', initials: 'SN', relation: 'Neighbor' },
      { id: 'v14', name: 'Ravi Kumar', initials: 'RK', relation: 'Former client' },
      { id: 'v15', name: 'Kiran Rao', initials: 'KR', relation: 'Community member' },
      { id: 'v16', name: 'Anjali Rao', initials: 'AR', relation: 'Community member' },
      { id: 'v17', name: 'Meena Devi', initials: 'MD', relation: 'Neighbor' },
    ],
    reviews: [
      { id: 'r4a', reviewerName: 'Rahul Verma', reviewerInitials: 'RV', rating: 5, comment: "My son's math grades went from C to A in just 2 months. She is incredibly patient and makes concepts click.", date: '30 Aug 2024', service: 'Math tutoring' },
      { id: 'r4b', reviewerName: 'Sunita Gupta', reviewerInitials: 'SG', rating: 5, comment: 'Excellent JEE prep guidance. She identified exactly which chapters to focus on. My daughter cracked JEE Mains!', date: '18 Aug 2024', service: 'JEE preparation' },
      { id: 'r4c', reviewerName: 'Meena Rao', reviewerInitials: 'MR', rating: 5, comment: 'Best tutor in the area by far. My daughter adores her sessions and looks forward to every class.', date: '5 Aug 2024', service: 'Board exam prep' },
    ],
  },
  {
    id: '5',
    name: 'Kiran Rao',
    initials: 'KR',
    skill: 'Carpenter',
    skillEmoji: '🪚',
    vouches: 15,
    distance: '3.0 km',
    rating: 4.6,
    ratingCount: 76,
    imageUrl: 'https://randomuser.me/api/portraits/men/67.jpg',
    available: true,
    availableNow: true,
    location: 'BTM Layout, Bangalore',
    phone: '+91 54321 09876',
    bio: 'Skilled carpenter specializing in furniture making, modular kitchen fitting, wardrobe installation, and home repairs.',
    completedJobs: 76,
    joinedDate: 'May 2023',
    radius: 6,
    earnings: {
      total: 29400,
      thisMonth: 5600,
      workerShare: 23814,
      platformFee: 2940,
      coopFund: 2646,
    },
    vouchedBy: [
      { id: 'v18', name: 'Priya Sharma', initials: 'PS', relation: 'Former client' },
      { id: 'v19', name: 'Ravi Kumar', initials: 'RK', relation: 'Colleague' },
    ],
    reviews: [
      { id: 'r5a', reviewerName: 'Deepak Iyer', reviewerInitials: 'DI', rating: 5, comment: 'Built custom wall shelves that look absolutely stunning. Very skilled craftsmanship and attention to detail.', date: '4 Sep 2024', service: 'Custom shelving' },
      { id: 'r5b', reviewerName: 'Preeti Shah', reviewerInitials: 'PS', rating: 4, comment: 'Wardrobe installation was clean and finished on time. Gave good advice on wood types and finishes too.', date: '22 Aug 2024', service: 'Wardrobe installation' },
      { id: 'r5c', reviewerName: 'Arjun Kumar', reviewerInitials: 'AK', rating: 5, comment: 'Modular kitchen done to perfection. Every hinge, every drawer — perfect fit. Would hire again without hesitation.', date: '12 Aug 2024', service: 'Modular kitchen' },
    ],
  },
];

export const mockBooking: Booking = {
  id: 'BK-2024-0847',
  workerId: '1',
  workerName: 'Ravi Kumar',
  workerInitials: 'RK',
  skill: 'Electrician',
  date: 'Thursday, 5 September 2024',
  time: '10:00 AM – 12:00 PM',
  address: '14, 3rd Cross, Koramangala 4th Block, Bangalore – 560034',
  status: 'in_progress',
  amount: 650,
};

export interface JobRequest {
  id: string;
  customerName: string;
  customerInitials: string;
  address: string;
  service: string;
  skillEmoji: string;
  distance: string;
  time: string;
  amount: number;
  urgent: boolean;
}

export interface CustomerBooking {
  id: string;
  workerName: string;
  workerInitials: string;
  workerId: string;
  skill: string;
  skillEmoji: string;
  date: string;
  status: 'booked' | 'matched' | 'in_progress' | 'completed' | 'cancelled';
  amount: number;
  rated?: boolean;
}

export const jobRequests: JobRequest[] = [
  {
    id: 'JR-001',
    customerName: 'Anita Gupta',
    customerInitials: 'AG',
    address: '12, 5th Cross, Koramangala 5th Block',
    service: 'MCB trip fix + wiring check',
    skillEmoji: '⚡',
    distance: '0.9 km',
    time: 'Today, 2:00 PM',
    amount: 800,
    urgent: false,
  },
  {
    id: 'JR-002',
    customerName: 'Vikram Singh',
    customerInitials: 'VS',
    address: '88, 7th Main, HSR Layout Sector 2',
    service: 'MCB panel replacement',
    skillEmoji: '⚡',
    distance: '2.3 km',
    time: 'Today, 4:30 PM',
    amount: 1200,
    urgent: true,
  },
  {
    id: 'JR-003',
    customerName: 'Deepa Nair',
    customerInitials: 'DN',
    address: '45, 2nd Cross, Indiranagar 12th Main',
    service: 'Ceiling fan installation (×3)',
    skillEmoji: '⚡',
    distance: '3.1 km',
    time: 'Tomorrow, 10:00 AM',
    amount: 600,
    urgent: false,
  },
];

export const todaySchedule = [
  {
    id: 'SCH-001',
    customerName: 'Meena Krishnan',
    address: '7, 1st Cross, Koramangala 3rd Block',
    service: 'Socket rewiring',
    time: '10:00 AM',
    status: 'completed' as const,
    amount: 450,
  },
  {
    id: 'SCH-002',
    customerName: 'Anita Gupta',
    address: '12, 5th Cross, Koramangala 5th Block',
    service: 'MCB trip fix + wiring check',
    time: '2:00 PM',
    status: 'upcoming' as const,
    amount: 800,
  },
];

export const customerBookings: CustomerBooking[] = [
  {
    id: 'BK-2024-0847',
    workerName: 'Ravi Kumar',
    workerInitials: 'RK',
    workerId: '1',
    skill: 'Electrician',
    skillEmoji: '⚡',
    date: 'Today, 5 Sep 2024',
    status: 'in_progress',
    amount: 650,
  },
  {
    id: 'BK-2024-0712',
    workerName: 'Meena Devi',
    workerInitials: 'MD',
    workerId: '2',
    skill: 'Cook',
    skillEmoji: '🍳',
    date: '2 Sep 2024',
    status: 'completed',
    amount: 400,
  },
  {
    id: 'BK-2024-0601',
    workerName: 'Priya Sharma',
    workerInitials: 'PS',
    workerId: '4',
    skill: 'Tutor',
    skillEmoji: '📚',
    date: '28 Aug 2024',
    status: 'completed',
    amount: 800,
  },
  {
    id: 'BK-2024-0540',
    workerName: 'Suresh Nair',
    workerInitials: 'SN',
    workerId: '3',
    skill: 'Plumber',
    skillEmoji: '🔧',
    date: '20 Aug 2024',
    status: 'completed',
    amount: 950,
  },
];

export type NotifType =
  | 'reminder'
  | 'booking_confirmed'
  | 'worker_matched'
  | 'in_progress'
  | 'completed'
  | 'vouch'
  | 'promo';

export interface CustomerNotif {
  id: string;
  type: NotifType;
  title: string;
  body: string;
  time: string;
  read: boolean;
  actionLabel?: string;
  actionPath?: string;
}

export const customerNotifs: CustomerNotif[] = [
  {
    id: 'n1',
    type: 'in_progress',
    title: 'Ravi Kumar is on the way',
    body: 'Your electrician is heading to your location. ETA: 12 minutes.',
    time: 'Just now',
    read: false,
    actionLabel: 'Track service',
    actionPath: '/service-status',
  },
  {
    id: 'n2',
    type: 'reminder',
    title: 'Booking reminder ⏰',
    body: 'Ravi Kumar (Electrician) is scheduled for today at 10:00 AM. Make sure someone is home.',
    time: '1 hr ago',
    read: false,
    actionLabel: 'View booking',
    actionPath: '/service-status',
  },
  {
    id: 'n3',
    type: 'worker_matched',
    title: 'Worker matched!',
    body: 'Ravi Kumar accepted your booking for electrical work. Booking ID: BK-2024-0847.',
    time: '3 hrs ago',
    read: true,
    actionLabel: 'View profile',
    actionPath: '/worker/1',
  },
  {
    id: 'n4',
    type: 'completed',
    title: 'Service completed 🎉',
    body: 'Meena Devi completed your cooking session. Please rate your experience.',
    time: 'Yesterday',
    read: true,
    actionLabel: 'Rate & review',
    actionPath: '/bookings',
  },
  {
    id: 'n5',
    type: 'vouch',
    title: 'Your vouch helped!',
    body: 'Priya Sharma got a new booking thanks to your community vouch. The cooperative thanks you.',
    time: 'Yesterday',
    read: true,
  },
  {
    id: 'n6',
    type: 'reminder',
    title: 'Upcoming session reminder',
    body: 'Priya Sharma (Tutor) is scheduled for tomorrow at 10:00 AM at your address.',
    time: '3 days ago',
    read: true,
    actionLabel: 'View booking',
    actionPath: '/bookings',
  },
  {
    id: 'n7',
    type: 'booking_confirmed',
    title: 'Booking confirmed',
    body: 'Your booking for plumbing with Suresh Nair on 20 Aug has been confirmed. BK-2024-0540.',
    time: '2 weeks ago',
    read: true,
  },
  {
    id: 'n8',
    type: 'promo',
    title: 'Cooperative update 🌱',
    body: 'Your coop fund contributions helped train 12 new workers this month. Thank you for being part of Sahayog!',
    time: '3 weeks ago',
    read: true,
  },
];

export interface ScheduledJob {
  id: string;
  customerName: string;
  customerInitials: string;
  address: string;
  service: string;
  skillEmoji: string;
  date: string;
  dateLabel: string;
  time: string;
  amount: number;
  status: 'upcoming' | 'in_progress' | 'completed' | 'cancelled';
}

export const workerSchedule: ScheduledJob[] = [
  {
    id: 'SCH-001',
    customerName: 'Meena Krishnan',
    customerInitials: 'MK',
    address: '7, 1st Cross, Koramangala 3rd Block, Bangalore',
    service: 'Socket rewiring',
    skillEmoji: '⚡',
    date: 'Today',
    dateLabel: 'Today · 5 Sep',
    time: '10:00 AM',
    amount: 450,
    status: 'completed',
  },
  {
    id: 'SCH-002',
    customerName: 'Anita Gupta',
    customerInitials: 'AG',
    address: '12, 5th Cross, Koramangala 5th Block, Bangalore',
    service: 'MCB trip fix + wiring check',
    skillEmoji: '⚡',
    date: 'Today',
    dateLabel: 'Today · 5 Sep',
    time: '2:00 PM',
    amount: 800,
    status: 'upcoming',
  },
  {
    id: 'SCH-003',
    customerName: 'Vikram Singh',
    customerInitials: 'VS',
    address: '88, 7th Main, HSR Layout Sector 2, Bangalore',
    service: 'MCB panel replacement',
    skillEmoji: '⚡',
    date: 'Today',
    dateLabel: 'Today · 5 Sep',
    time: '4:30 PM',
    amount: 1200,
    status: 'upcoming',
  },
  {
    id: 'SCH-004',
    customerName: 'Deepa Nair',
    customerInitials: 'DN',
    address: '45, 2nd Cross, Indiranagar 12th Main, Bangalore',
    service: 'Ceiling fan installation (×3)',
    skillEmoji: '⚡',
    date: 'Tomorrow',
    dateLabel: 'Tomorrow · 6 Sep',
    time: '10:00 AM',
    amount: 600,
    status: 'upcoming',
  },
  {
    id: 'SCH-005',
    customerName: 'Rajesh Menon',
    customerInitials: 'RM',
    address: '23, 4th Main, JP Nagar 6th Phase, Bangalore',
    service: 'Inverter battery replacement',
    skillEmoji: '⚡',
    date: 'Tomorrow',
    dateLabel: 'Tomorrow · 6 Sep',
    time: '3:00 PM',
    amount: 1800,
    status: 'upcoming',
  },
  {
    id: 'SCH-006',
    customerName: 'Sunita Rao',
    customerInitials: 'SR',
    address: '10, 8th Cross, BTM Layout 2nd Stage, Bangalore',
    service: 'Outdoor light fitting',
    skillEmoji: '⚡',
    date: 'Fri 7 Sep',
    dateLabel: 'Fri · 7 Sep',
    time: '11:00 AM',
    amount: 550,
    status: 'upcoming',
  },
  {
    id: 'SCH-007',
    customerName: 'Kavitha Reddy',
    customerInitials: 'KR',
    address: '56, 3rd Block, Jayanagar, Bangalore',
    service: 'Full home wiring inspection',
    skillEmoji: '⚡',
    date: 'Sat 8 Sep',
    dateLabel: 'Sat · 8 Sep',
    time: '9:00 AM',
    amount: 2200,
    status: 'upcoming',
  },
];

export const earningsSplitConfig = {
  workerPercent: 81,
  platformPercent: 10,
  coopPercent: 9,
  workerLabel: 'Your earnings',
  platformLabel: 'Platform fee',
  coopLabel: 'Coop fund',
};

export const earningsHistory: EarningsTransaction[] = [
  {
    id: 'TXN-001',
    date: '5 Sep',
    service: 'Socket rewiring',
    skillEmoji: '⚡',
    customerName: 'Meena Krishnan',
    bookingId: 'SCH-001',
    totalAmount: 450,
    workerEarned: 364,
    platformFee: 45,
    coopFund: 41,
    status: 'paid',
  },
  {
    id: 'TXN-002',
    date: '3 Sep',
    service: 'MCB panel check',
    skillEmoji: '⚡',
    customerName: 'Rajiv Pillai',
    bookingId: 'BK-2024-0831',
    totalAmount: 700,
    workerEarned: 567,
    platformFee: 70,
    coopFund: 63,
    status: 'paid',
  },
  {
    id: 'TXN-003',
    date: '1 Sep',
    service: 'Fan installation',
    skillEmoji: '⚡',
    customerName: 'Sunita Hegde',
    bookingId: 'BK-2024-0819',
    totalAmount: 350,
    workerEarned: 284,
    platformFee: 35,
    coopFund: 31,
    status: 'paid',
  },
  {
    id: 'TXN-004',
    date: '28 Aug',
    service: 'Wiring inspection',
    skillEmoji: '⚡',
    customerName: 'Deepak Rao',
    bookingId: 'BK-2024-0791',
    totalAmount: 900,
    workerEarned: 729,
    platformFee: 90,
    coopFund: 81,
    status: 'paid',
  },
  {
    id: 'TXN-005',
    date: '24 Aug',
    service: 'Inverter install',
    skillEmoji: '⚡',
    customerName: 'Preethi Nair',
    bookingId: 'BK-2024-0768',
    totalAmount: 1500,
    workerEarned: 1215,
    platformFee: 150,
    coopFund: 135,
    status: 'paid',
  },
  {
    id: 'TXN-006',
    date: '20 Aug',
    service: 'Late cancellation',
    skillEmoji: '⚡',
    customerName: 'Arjun Sharma',
    bookingId: 'BK-2024-0740',
    totalAmount: 0,
    workerEarned: -150,
    platformFee: 0,
    coopFund: 0,
    status: 'penalty',
    penaltyAmount: 150,
  },
];
