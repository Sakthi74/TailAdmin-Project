interface Deal {
  id: string;
  customer: string;
  email: string;
  initials: string;
  avatarColor: string;
  product: string;
  value: string;
  closeDate: string;
  status: "Complete" | "Pending" | "Cancel";
}

export const deals: Deal[] = [
  {
    id: "DE124321",
    customer: "John Doe",
    email: "johndoe@gmail.com",
    initials: "JD",
    avatarColor: "bg-orange-100 text-orange-600",
    product: "Software License",
    value: "$18,50.34",
    closeDate: "2024-06-15",
    status: "Complete",
  },
  {
    id: "DE124322",
    customer: "Jane Smith",
    email: "janesmith@gmail.com",
    initials: "JS",
    avatarColor: "bg-amber-100 text-amber-600",
    product: "Cloud Hosting",
    value: "$12,99.00",
    closeDate: "2024-06-18",
    status: "Pending",
  },
  {
    id: "DE124323",
    customer: "Michael Brown",
    email: "michaelbrown@gmail.com",
    initials: "MB",
    avatarColor: "bg-orange-100 text-orange-600",
    product: "Web Domain",
    value: "$9,50.00",
    closeDate: "2024-06-20",
    status: "Cancel",
  },
  {
    id: "DE124324",
    customer: "Alice Johnson",
    email: "alicejohnson@gmail.com",
    initials: "AJ",
    avatarColor: "bg-purple-100 text-purple-600",
    product: "SSL Certificate",
    value: "$2,30.45",
    closeDate: "2024-06-25",
    status: "Pending",
  },
  {
    id: "DE124325",
    customer: "Robert Lee",
    email: "robertlee@gmail.com",
    initials: "RL",
    avatarColor: "bg-green-100 text-green-600",
    product: "Premium Support",
    value: "$15,20.00",
    closeDate: "2024-06-30",
    status: "Complete",
  },
];
