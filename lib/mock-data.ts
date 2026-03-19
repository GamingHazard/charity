interface Event { 
    _id: string;
    title: string;
    date: string;
    description: string;
    image: {
      url: string;
      public_id: string;
    };
    time: string;
    topic: string;
    location: {
      address: string;
    };

}
interface Post{
_id: string;
title: string;
    excerpt: string;
    image: {
      url: string;
      public_id: string;
    };
    content: string;
    author: string;

    date: string;
    status: 'published' | 'draft';
    likes: string[];
    views: string[];
    comments: {
      name: string;
      comment: string;
      commentedOn: string;
    }[];
    
}

export interface Campaign { 
  _id: string;
  title: string;
  tagline: string;
  description: string;
  image: { 
    url: string;
    public_id: string;
  };
  goal: number;
  raised: number;
  endDate: string;
  status: "ongoing" | "upcoming" | "completed" | string;
  donations: string[];
}


export const mockEvents: Event[] = [
  {
    "_id": "1",
    "title": "Community Health Outreach",
    "date": "2026-04-12",
    "description": "Free medical checkups, HIV testing, and health education for residents in underserved communities.",
    "image": {
      "url": "https://www.shutterstock.com/image-photo/outdoor-photo-healthcare-africa-260nw-2606488033.jpg",
      "public_id": "unsplash/medical-africa-clinic"
    },
    "time": "09:00 AM - 03:00 PM",
    "topic": "Healthcare",
    "location": {
      "address": "Kireka Community Grounds, Wakiso District"
    }
  },
  {
    "_id": "2",
    "title": "Back to School Drive",
    "date": "2026-05-03",
    "description": "Distribution of school supplies including books, uniforms, and bags to children in need.",
    "image": {
      "url": "https://s3.amazonaws.com/cdn.micato.com/wp-content/uploads/2018/09/07233051/one-for-one-girls-2-1.jpg",
      "public_id": "unsplash/african-children-school"
    },
    "time": "10:00 AM - 02:00 PM",
    "topic": "Education",
    "location": {
      "address": "St. Peter’s Primary School, Mukono"
    }
  },
  {
    "_id": "3",
    "title": "Youth Skills Training Workshop",
    "date": "2026-05-20",
    "description": "Empowering youth with practical skills in tailoring, baking, and basic computer literacy.",
    "image": {
      "url": "https://foodtank.com/wp-content/uploads/2018/07/CORAFYouth.jpg",
      "public_id": "unsplash/african-youth-training"
    },
    "time": "11:00 AM - 04:00 PM",
    "topic": "Youth Empowerment",
    "location": {
      "address": "Nakawa Vocational Center, Kampala"
    }
  },
  {
    "_id": "4",
    "title": "Food Distribution Campaign",
    "date": "2026-06-01",
    "description": "Providing essential food packages to vulnerable families facing food insecurity.",
    "image": {
      "url": "https://www.syf-relief.com/donates/donate_8/70_africa-food01.jpg",
      "public_id": "unsplash/food-donation-africa"
    },
    "time": "08:30 AM - 01:00 PM",
    "topic": "Hunger Relief",
    "location": {
      "address": "Nansana Town Council Grounds, Wakiso"
    }
  },
  {
    "_id": "5",
    "title": "Clean Water Initiative Launch",
    "date": "2026-06-15",
    "description": "Launching a borehole project to provide clean and safe drinking water to rural communities.",
    "image": {
      "url": "https://www.shutterstock.com/image-photo/two-black-hands-cupping-clean-260nw-2481638215.jpg",
      "public_id": "unsplash/clean-water-africa"
    },
    "time": "09:30 AM - 12:30 PM",
    "topic": "Water & Sanitation",
    "location": {
      "address": "Luweero Village Center, Luweero District"
    }
  },
  {
    "_id": "6",
    "title": "Fundraising Gala Night",
    "date": "2026-07-10",
    "description": "An evening of networking, entertainment, and fundraising to support ongoing charity programs.",
    "image": {
      "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3e09xhkTmSrLvGdFt8y39BiQrCeoJ-fs6jw&s",
      "public_id": "unsplash/gala-event-africa"
    },
    "time": "06:00 PM - 10:00 PM",
    "topic": "Fundraising",
    "location": {
      "address": "Serena Hotel, Kampala"
    }
  }
]

export const mockBlogs: Post[] = [
  {
    "_id": "1",
    "title": "The Impact of Community Health Programs in Rural Uganda",
    "excerpt": "Exploring how grassroots health initiatives are transforming lives in underserved areas.",
    "image": {
      "url": "https://assets.weforum.org/article/image/large_3_m_K7GFWj4l2b_eibFXDCdnD_IedOoPnnQZigC81Xs.jpg",
      "public_id": "unsplash/healthcare-africa"
    },
    "content": "Community health programs have become one of the most effective ways to bridge the healthcare gap in rural Uganda. In many villages, access to hospitals and trained medical professionals remains limited due to distance, cost, and infrastructure challenges. As a result, preventable diseases often go untreated, leading to unnecessary suffering and loss of life. Community-based health initiatives are changing this narrative by bringing services closer to the people.\n\nOne of the key components of these programs is the use of community health workers. These are trained individuals from within the community who provide basic medical care, health education, and referrals to larger health facilities when necessary. Because they are trusted members of the community, they are able to effectively communicate important health messages and encourage positive behavioral changes. This includes promoting hygiene, encouraging vaccinations, and educating families about nutrition and disease prevention.\n\nMobile clinics are another powerful tool used in these programs. By traveling to remote areas on scheduled days, healthcare providers can offer services such as HIV testing, maternal care, and treatment for common illnesses. This approach significantly reduces the barriers that rural populations face when trying to access care. It also ensures that early diagnosis and treatment can take place, which is critical in improving health outcomes.\n\nPartnerships play a major role in the success of community health programs. Local leaders, government agencies, and nonprofit organizations often collaborate to ensure that resources are used efficiently and that programs are sustainable. These partnerships also help in scaling successful initiatives to reach more communities over time.\n\nDespite the progress made, challenges still exist. Limited funding, shortages of medical supplies, and logistical difficulties can hinder the effectiveness of these programs. However, continued investment and community involvement can help overcome these barriers.\n\nUltimately, community health programs are not just about providing medical care—they are about empowering communities to take charge of their own health. By focusing on prevention, education, and accessibility, these initiatives are creating lasting change and improving the quality of life for thousands of people across Uganda.",
    "author": "Sarah Namusoke",
    "date": "2026-02-10",
    "status": "published",
    "likes": ["user1", "user2", "user3"],
    "views": ["ip1", "ip2", "ip3", "ip4"],
    "comments": [
      {
        "name": "John",
        "comment": "This is truly impactful work!",
        "commentedOn": "2026-02-11"
      }
    ]
  },
  {
    "_id": "2",
    "title": "Why Education Sponsorship Changes Everything",
    "excerpt": "A look into how supporting one child’s education can uplift entire communities.",
    "image": {
      "url": "https://images.unsplash.com/photo-1473649085228-583485e6e4d7?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YWZyaWNhbiUyMHN0dWRlbnRzfGVufDB8fDB8fHww",
      "public_id": "unsplash/education-africa"
    },
    "content": "Education sponsorship programs have long been recognized as one of the most powerful tools for breaking the cycle of poverty. In many parts of Uganda, children face significant barriers to accessing education, including financial constraints, lack of school supplies, and long distances to schools. Sponsorship programs address these challenges by providing the necessary support for children to stay in school and succeed academically.\n\nWhen a child receives an education, the benefits extend far beyond the individual. Educated individuals are more likely to secure stable employment, contribute to the local economy, and make informed decisions about their health and wellbeing. This creates a ripple effect that positively impacts families and entire communities. For example, an educated parent is more likely to prioritize education for their own children, creating a cycle of opportunity that can span generations.\n\nSponsorship programs typically cover tuition fees, uniforms, books, and sometimes even meals. This comprehensive support ensures that children can focus on their studies without the burden of financial stress. In addition, many programs offer mentorship and counseling, helping students develop confidence and life skills that are essential for success.\n\nCommunity involvement is also a critical aspect of these programs. Local leaders, teachers, and parents often play an active role in monitoring the progress of sponsored children and ensuring that resources are used effectively. This sense of ownership helps to strengthen the program and ensures its sustainability.\n\nHowever, challenges remain. Limited funding means that not every child in need can be supported. Additionally, some communities still face cultural barriers that discourage education, particularly for girls. Addressing these challenges requires ongoing advocacy, awareness campaigns, and increased investment in education.\n\nIn conclusion, education sponsorship is more than just financial assistance—it is an investment in the future. By empowering children with knowledge and skills, these programs are helping to build stronger, more resilient communities and paving the way for long-term development.",
    "author": "David Okello",
    "date": "2026-01-28",
    "status": "published",
    "likes": ["user4", "user5"],
    "views": ["ip5", "ip6"],
    "comments": [
      {
        "name": "Amina",
        "comment": "Education is the key to everything.",
        "commentedOn": "2026-01-29"
      }
    ]
  },
  {
    "_id": "3",
    "title": "Clean Water: A Basic Need Still Out of Reach",
    "excerpt": "Millions still lack access to safe drinking water—here’s what’s being done.",
    "image": {
      "url": "https://content.unops.org/photos/News-and-Stories/News/_image1920x900/GettyImages-517346047.jpg",
      "public_id": "unsplash/clean-water"
    },
    "content": "Access to clean and safe drinking water is a fundamental human right, yet millions of people in Uganda and across Africa still struggle to obtain it. In many rural communities, families rely on unsafe water sources such as rivers, ponds, and unprotected wells. This exposes them to waterborne diseases such as cholera, dysentery, and typhoid, which can have devastating consequences.\n\nCharitable organizations and development partners have been working tirelessly to address this challenge through various initiatives. One of the most common approaches is the construction of boreholes and protected wells. These provide a reliable source of clean water that is accessible to the entire community. In addition, water purification systems and rainwater harvesting technologies are being introduced to further improve access.\n\nEducation plays a crucial role in ensuring the success of these initiatives. Communities are trained on proper hygiene practices, water storage, and maintenance of water facilities. This helps to prevent contamination and ensures that the benefits of clean water are sustained over time.\n\nWomen and children are often the most affected by water scarcity, as they are typically responsible for collecting water. In some cases, they have to walk several kilometers each day to reach the nearest water source. By bringing clean water closer to home, these initiatives not only improve health outcomes but also free up time for education and economic activities.\n\nDespite the progress made, challenges such as maintenance costs, population growth, and climate change continue to threaten water security. Addressing these issues requires a coordinated effort involving governments, NGOs, and local communities.\n\nUltimately, ensuring access to clean water is not just about infrastructure—it is about dignity, health, and opportunity. By investing in sustainable solutions, we can create a future where no one has to struggle for such a basic necessity.",
    "author": "Grace Atim",
    "date": "2026-03-01",
    "status": "published",
    "likes": ["user6"],
    "views": ["ip7", "ip8", "ip9"],
    "comments": []
  }
]

export const mockCampaigns = [
  {
    "id": "cmp_001",
    "title": "Clean Water for Rural Families",
    "tagline": "Bringing safe and reliable water sources closer to home.",
    "description": "This campaign focuses on constructing and rehabilitating boreholes in underserved rural communities where families currently walk long distances to fetch unsafe water. The funds will support drilling, water testing, pump installation, and community maintenance training to ensure long-term access to clean water.",
    "image": {
      "url": "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1200&q=80",
      "public_id": "charity/campaigns/clean-water-rural-families"
    },
    "goal": 25000,
    "raised": 14350,
    "endDate": "2026-06-30",
    "status": "ongoing",
    "donations": ["dn_1001", "dn_1002", "dn_1003", "dn_1004", "dn_1005"]
  },
  {
    "id": "cmp_002",
    "title": "Back to School for Every Child",
    "tagline": "Supplying books, uniforms, and hope for vulnerable learners.",
    "description": "This education campaign is designed to provide school supplies, uniforms, tuition support, and learning materials for children from low-income households. It aims to reduce absenteeism, improve academic confidence, and keep children in school throughout the academic year.",
    "image": {
      "url": "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
      "public_id": "charity/campaigns/back-to-school-every-child"
    },
    "goal": 18000,
    "raised": 9200,
    "endDate": "2026-05-20",
    "status": "ongoing",
    "donations": ["dn_1006", "dn_1007", "dn_1008"]
  },
  {
    "id": "cmp_003",
    "title": "Emergency Food Relief Drive",
    "tagline": "Delivering urgent food support to families in crisis.",
    "description": "The Emergency Food Relief Drive raises funds to provide food packages to households affected by displacement, unemployment, and natural disasters. Each package includes staple foods, nutritional supplements, and basic hygiene items to support families through difficult periods.",
    "image": {
      "url": "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
      "public_id": "charity/campaigns/emergency-food-relief-drive"
    },
    "goal": 30000,
    "raised": 30120,
    "endDate": "2026-02-28",
    "status": "passed",
    "donations": ["dn_1009", "dn_1010", "dn_1011", "dn_1012", "dn_1013", "dn_1014"]
  },
  {
    "id": "cmp_004",
    "title": "Healthcare Outreach for Mothers",
    "tagline": "Improving maternal care through mobile health services.",
    "description": "This campaign supports mobile healthcare outreaches in remote communities, giving expectant and new mothers access to prenatal checkups, postnatal care, health education, and basic medicines. The project also helps local clinics with essential medical supplies and referral support.",
    "image": {
      "url": "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80",
      "public_id": "charity/campaigns/healthcare-outreach-mothers"
    },
    "goal": 22000,
    "raised": 11780,
    "endDate": "2026-07-15",
    "status": "ongoing",
    "donations": ["dn_1015", "dn_1016", "dn_1017", "dn_1018"]
  },
  {
    "id": "cmp_005",
    "title": "Youth Skills and Empowerment Program",
    "tagline": "Helping young people build skills for sustainable livelihoods.",
    "description": "The Youth Skills and Empowerment Program equips unemployed and out-of-school youth with practical vocational training in tailoring, carpentry, digital literacy, and entrepreneurship. Donations will cover training materials, equipment, mentorship sessions, and startup support for selected graduates.",
    "image": {
      "url": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
      "public_id": "charity/campaigns/youth-skills-empowerment"
    },
    "goal": 27000,
    "raised": 6400,
    "endDate": "2026-08-10",
    "status": "upcoming",
    "donations": []
  },
  {
    "id": "cmp_006",
    "title": "Safe Shelter for Street Children",
    "tagline": "Creating a secure place for healing, care, and growth.",
    "description": "This campaign raises funds to expand temporary shelter services for street-connected children. Support will go toward bedding, meals, psychosocial care, protection services, and pathways to family reunification or long-term safe accommodation. The project aims to provide stability and dignity to children in extremely vulnerable situations.",
    "image": {
      "url": "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
      "public_id": "charity/campaigns/safe-shelter-street-children"
    },
    "goal": 35000,
    "raised": 18460,
    "endDate": "2026-09-05",
    "status": "ongoing",
    "donations": ["dn_1019", "dn_1020", "dn_1021"]
  },
  {
    "id": "cmp_007",
    "title": "Tree Planting for a Greener Tomorrow",
    "tagline": "Restoring communities through environmental action.",
    "description": "This environmental campaign mobilizes volunteers, schools, and local leaders to plant indigenous trees in degraded areas and around public institutions. Donations will fund seedlings, transport, tools, community sensitization, and follow-up maintenance to improve long-term survival rates.",
    "image": {
      "url": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80",
      "public_id": "charity/campaigns/tree-planting-greener-tomorrow"
    },
    "goal": 15000,
    "raised": 7200,
    "endDate": "2026-10-12",
    "status": "upcoming",
    "donations": ["dn_1022"]
  }
]