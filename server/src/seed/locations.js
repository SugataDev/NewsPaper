export const bangladeshLocations = [
  // 8 Divisions
  { type: 'division', nameBn: 'ঢাকা', slug: 'dhaka', parent: null },
  { type: 'division', nameBn: 'চট্টগ্রাম', slug: 'chattogram', parent: null },
  { type: 'division', nameBn: 'রাজশাহী', slug: 'rajshahi', parent: null },
  { type: 'division', nameBn: 'খুলনা', slug: 'khulna', parent: null },
  { type: 'division', nameBn: 'বরিশাল', slug: 'barishal', parent: null },
  { type: 'division', nameBn: 'সিলেট', slug: 'sylhet', parent: null },
  { type: 'division', nameBn: 'রংপুর', slug: 'rangpur', parent: null },
  { type: 'division', nameBn: 'ময়মনসিংহ', slug: 'mymensingh', parent: null },

  // Districts for Dhaka
  { type: 'district', nameBn: 'ঢাকা', slug: 'dhaka-dist', parent: 'dhaka' },
  { type: 'district', nameBn: 'গাজীপুর', slug: 'gazipur', parent: 'dhaka' },
  { type: 'district', nameBn: 'নারায়ণগঞ্জ', slug: 'narayanganj', parent: 'dhaka' },
  { type: 'district', nameBn: 'টাঙ্গাইল', slug: 'tangail', parent: 'dhaka' },
  { type: 'district', nameBn: 'কিশোরগঞ্জ', slug: 'kishoreganj', parent: 'dhaka' },
  { type: 'district', nameBn: 'মানিকগঞ্জ', slug: 'manikganj', parent: 'dhaka' },
  { type: 'district', nameBn: 'মুন্সীগঞ্জ', slug: 'munshiganj', parent: 'dhaka' },
  { type: 'district', nameBn: 'নরসিংদী', slug: 'narsingdi', parent: 'dhaka' },
  { type: 'district', nameBn: 'ফরিদপুর', slug: 'faridpur', parent: 'dhaka' },
  { type: 'district', nameBn: 'গোপালগঞ্জ', slug: 'gopalganj', parent: 'dhaka' },
  { type: 'district', nameBn: 'মাদারীপুর', slug: 'madaripur', parent: 'dhaka' },
  { type: 'district', nameBn: 'রাজবাড়ী', slug: 'rajbari', parent: 'dhaka' },
  { type: 'district', nameBn: 'শরীয়তপুর', slug: 'shariatpur', parent: 'dhaka' },

  // Districts for Chattogram
  { type: 'district', nameBn: 'চট্টগ্রাম', slug: 'chattogram-dist', parent: 'chattogram' },
  { type: 'district', nameBn: 'কক্সবাজার', slug: 'coxsbazar', parent: 'chattogram' },
  { type: 'district', nameBn: 'কুমিল্লা', slug: 'cumilla', parent: 'chattogram' },
  { type: 'district', nameBn: 'ফেনী', slug: 'feni', parent: 'chattogram' },
  { type: 'district', nameBn: 'ব্রাহ্মণবাড়িয়া', slug: 'brahmanbaria', parent: 'chattogram' },
  { type: 'district', nameBn: 'রাঙ্গামাটি', slug: 'rangamati', parent: 'chattogram' },
  { type: 'district', nameBn: 'বান্দরবান', slug: 'bandarban', parent: 'chattogram' },
  { type: 'district', nameBn: 'খাগড়াছড়ি', slug: 'khagrachhari', parent: 'chattogram' },
  { type: 'district', nameBn: 'নোয়াখালী', slug: 'noakhali', parent: 'chattogram' },
  { type: 'district', nameBn: 'লক্ষ্মীপুর', slug: 'lakshmipur', parent: 'chattogram' },
  { type: 'district', nameBn: 'চাঁদপুর', slug: 'chandpur', parent: 'chattogram' },

  // Districts for Rajshahi
  { type: 'district', nameBn: 'রাজশাহী', slug: 'rajshahi-dist', parent: 'rajshahi' },
  { type: 'district', nameBn: 'বগুড়া', slug: 'bogura', parent: 'rajshahi' },
  { type: 'district', nameBn: 'পাবনা', slug: 'pabna', parent: 'rajshahi' },
  { type: 'district', nameBn: 'সিরাজগঞ্জ', slug: 'sirajganj', parent: 'rajshahi' },
  { type: 'district', nameBn: 'নাটোর', slug: 'natore', parent: 'rajshahi' },
  { type: 'district', nameBn: 'নওগাঁ', slug: 'naogaon', parent: 'rajshahi' },
  { type: 'district', nameBn: 'চাঁপাইনবাবগঞ্জ', slug: 'chapai-nawabganj', parent: 'rajshahi' },
  { type: 'district', nameBn: 'জয়পুরহাট', slug: 'joypurhat', parent: 'rajshahi' },

  // Districts for Khulna
  { type: 'district', nameBn: 'খুলনা', slug: 'khulna-dist', parent: 'khulna' },
  { type: 'district', nameBn: 'যশোর', slug: 'jashore', parent: 'khulna' },
  { type: 'district', nameBn: 'কুষ্টিয়া', slug: 'kushtia', parent: 'khulna' },
  { type: 'district', nameBn: 'ঝিনাইদহ', slug: 'jhenaidah', parent: 'khulna' },
  { type: 'district', nameBn: 'সাতক্ষীরা', slug: 'satkhira', parent: 'khulna' },
  { type: 'district', nameBn: 'বাগেরহাট', slug: 'bagerhat', parent: 'khulna' },
  { type: 'district', nameBn: 'চুয়াডাঙ্গা', slug: 'chuadanga', parent: 'khulna' },
  { type: 'district', nameBn: 'মেহেরপুর', slug: 'meherpur', parent: 'khulna' },
  { type: 'district', nameBn: 'মাগুরা', slug: 'magura', parent: 'khulna' },
  { type: 'district', nameBn: 'নড়াইল', slug: 'narail', parent: 'khulna' },

  // Districts for Barishal
  { type: 'district', nameBn: 'বরিশাল', slug: 'barishal-dist', parent: 'barishal' },
  { type: 'district', nameBn: 'পটুয়াখালী', slug: 'patuakhali', parent: 'barishal' },
  { type: 'district', nameBn: 'ভোলা', slug: 'bhola', parent: 'barishal' },
  { type: 'district', nameBn: 'পিরোজপুর', slug: 'pirojpur', parent: 'barishal' },
  { type: 'district', nameBn: 'বরগুনা', slug: 'barguna', parent: 'barishal' },
  { type: 'district', nameBn: 'ঝালকাঠি', slug: 'jhalakathi', parent: 'barishal' },

  // Districts for Sylhet
  { type: 'district', nameBn: 'সিলেট', slug: 'sylhet-dist', parent: 'sylhet' },
  { type: 'district', nameBn: 'মৌলভীবাজার', slug: 'moulvibazar', parent: 'sylhet' },
  { type: 'district', nameBn: 'হবিগঞ্জ', slug: 'habiganj', parent: 'sylhet' },
  { type: 'district', nameBn: 'সুনামগঞ্জ', slug: 'sunamganj', parent: 'sylhet' },

  // Districts for Rangpur
  { type: 'district', nameBn: 'রংপুর', slug: 'rangpur-dist', parent: 'rangpur' },
  { type: 'district', nameBn: 'দিনাজপুর', slug: 'dinajpur', parent: 'rangpur' },
  { type: 'district', nameBn: 'কুড়িগ্রাম', slug: 'kurigram', parent: 'rangpur' },
  { type: 'district', nameBn: 'গাইবান্ধা', slug: 'gaibandha', parent: 'rangpur' },
  { type: 'district', nameBn: 'নীলফামারী', slug: 'nilphamari', parent: 'rangpur' },
  { type: 'district', nameBn: 'পঞ্চগড়', slug: 'panchagarh', parent: 'rangpur' },
  { type: 'district', nameBn: 'ঠাকুরগাঁও', slug: 'thakurgaon', parent: 'rangpur' },
  { type: 'district', nameBn: 'লালমনিরহাট', slug: 'lalmonirhat', parent: 'rangpur' },

  // Districts for Mymensingh
  { type: 'district', nameBn: 'ময়মনসিংহ', slug: 'mymensingh-dist', parent: 'mymensingh' },
  { type: 'district', nameBn: 'জামালপুর', slug: 'jamalpur', parent: 'mymensingh' },
  { type: 'district', nameBn: 'নেত্রকোণা', slug: 'netrokona', parent: 'mymensingh' },
  { type: 'district', nameBn: 'শেরপুর', slug: 'sherpur', parent: 'mymensingh' },

  // Representative Upazilas
  { type: 'upazila', nameBn: 'ধানমন্ডি', slug: 'dhanmondi', parent: 'dhaka-dist' },
  { type: 'upazila', nameBn: 'মিরপুর', slug: 'mirpur', parent: 'dhaka-dist' },
  { type: 'upazila', nameBn: 'উত্তরা', slug: 'uttara', parent: 'dhaka-dist' },
  { type: 'upazila', nameBn: 'সাভার', slug: 'savar', parent: 'dhaka-dist' },
  { type: 'upazila', nameBn: 'সদর', slug: 'gazipur-sadar', parent: 'gazipur' },
  { type: 'upazila', nameBn: 'টঙ্গী', slug: 'tongi', parent: 'gazipur' },
  { type: 'upazila', nameBn: 'পাঁচলাইশ', slug: 'panchlaish', parent: 'chattogram-dist' },
  { type: 'upazila', nameBn: 'পতেঙ্গা', slug: 'patenga', parent: 'chattogram-dist' },
  { type: 'upazila', nameBn: 'সদর', slug: 'coxsbazar-sadar', parent: 'coxsbazar' },
  { type: 'upazila', nameBn: 'বোয়ালিয়া', slug: 'boalia', parent: 'rajshahi-dist' },
  { type: 'upazila', nameBn: 'সদর', slug: 'bogura-sadar', parent: 'bogura' },
  { type: 'upazila', nameBn: 'খালিশপুর', slug: 'khalishpur', parent: 'khulna-dist' },
  { type: 'upazila', nameBn: 'সদর', slug: 'barishal-sadar', parent: 'barishal-dist' },
  { type: 'upazila', nameBn: 'কোতোয়ালী', slug: 'kotwali-sylhet', parent: 'sylhet-dist' },
  { type: 'upazila', nameBn: 'সদর', slug: 'rangpur-sadar', parent: 'rangpur-dist' },
  { type: 'upazila', nameBn: 'সদর', slug: 'mymensingh-sadar', parent: 'mymensingh-dist' },
];
