export type PartnerLogo = {
  name: string;
  src: string;
  className?: string;
  href?: string;
};

// Canonical trust band order:
// Amazon · DigitalOcean · Google · Microsoft · NVIDIA · Techstars · Lux · Zoo Labs Foundation
export const partnerLogos: PartnerLogo[] = [
  {
    name: "Amazon",
    src: "/logos/partners/amazon.svg",
    className: "h-6",
    href: "https://aws.amazon.com",
  },
  {
    name: "DigitalOcean",
    src: "/logos/partners/digitalocean.svg",
    className: "h-6",
    href: "https://www.digitalocean.com",
  },
  {
    name: "Google",
    src: "/logos/partners/google.svg",
    className: "h-6",
    href: "https://cloud.google.com",
  },
  {
    name: "Microsoft",
    src: "/logos/partners/microsoft.svg",
    className: "h-6",
    href: "https://azure.microsoft.com",
  },
  {
    name: "NVIDIA",
    src: "/logos/partners/nvidia.svg",
    className: "h-6",
    href: "https://www.nvidia.com",
  },
  {
    name: "Techstars",
    src: "/logos/partners/techstars.svg",
    // h-10 keeps Techstars wordmark visually balanced against h-6 marks.
    // Spec calls for "same optical weight" — this is the optical normalization,
    // not the literal height match.
    className: "h-10",
    href: "https://www.techstars.com",
  },
  {
    name: "Lux",
    src: "/logos/partners/lux.svg",
    className: "h-6",
    href: "https://lux.fund",
  },
  {
    name: "Zoo Labs Foundation",
    src: "/logos/partners/zoo-labs-foundation.svg",
    // h-8 (~20% smaller than the original h-10) is the optical match per
    // 2026-05-19 sibling-agent adjustment.
    className: "h-8",
    href: "https://zoo.ngo",
  },
];
