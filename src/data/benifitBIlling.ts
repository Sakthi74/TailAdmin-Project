interface Benefit {
  label: string;
  included: boolean;
}

export const benefits: Benefit[] = [
  { label: "25,500 orders per month", included: true },
  { label: "Unlimited integrations", included: true },
  { label: "Exclusive AutoFile discount", included: true },
  { label: "10 GB Storage", included: true },
  { label: "Custom Templates", included: false },
  { label: "Advanced Marketing tool", included: false },
];
