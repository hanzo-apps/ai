import React from "react";
import { ExternalLink, Mail, Phone, Users, Shield, LucideIcon } from "lucide-react";
import { Button } from "@hanzo/ui";
import { BrandColor, partners } from "@/lib/constants/brand";
import { Box } from '@hanzo/ui'

interface PartnerCardProps {
  name: string;
  description: string;
  url: string;
  icon: LucideIcon;
  color?: BrandColor;
  primaryAction?: {
    label: string;
    href: string;
    external?: boolean;
  };
  secondaryAction?: {
    label: string;
    href: string;
    type?: "email" | "phone" | "link";
  };
}

const PartnerCard: React.FC<PartnerCardProps> = ({
  name,
  description,
  url,
  icon: Icon,
  color = "primary",
  primaryAction,
  secondaryAction,
}) => {
  const isPrimary = color === "primary";

  const cardClass = isPrimary
    ? "bg-gradient-to-br from-white/30 to-white/10 rounded-xl border border-border hover:border-white/40"
    : "bg-gradient-to-br from-white/20 to-white/10 rounded-xl border border-border hover:border-white/40";

  const iconClass = isPrimary ? "text-foreground" : "text-foreground/70";

  // Both actions read the same on every card: the primary is the filled button
  // (foreground colour comes WITH the fill, or the label vanishes into it), the
  // secondary is the outline. `color` tints the card and its icon, never the
  // contrast of a label against its own background.
  const getSecondaryIcon = () => {
    switch (secondaryAction?.type) {
      case "email":
        return <Mail size={14} />;
      case "phone":
        return <Phone size={14} />;
      default:
        return null;
    }
  };

  return (
    <div className={`p-6 ${cardClass} transition-colors h-full`}>
      <Box className="p-3 rounded-lg bg-primary/20 self-start inline-block mb-4">
        <Icon className={`h-6 w-6 ${iconClass}`} strokeWidth={1.5} />
      </Box>
      <h3 className="text-2xl font-bold text-foreground mb-3">{name}</h3>
      <p className="text-foreground/80 mb-5">{description}</p>
      <Box className="flex flex-wrap gap-3">
        {primaryAction && (
          <Button asChild>
            <a
              href={primaryAction.href || "#"}
              target={primaryAction.external ? "_blank" : undefined}
              rel={primaryAction.external ? "noopener noreferrer" : undefined}
            >
              <span>{primaryAction.label}</span>
              {primaryAction.external && <ExternalLink size={14} />}
            </a>
          </Button>
        )}
        {secondaryAction && (
          <Button asChild variant="outline">
            <a href={secondaryAction.href || "#"}>
              <span>{secondaryAction.label}</span>
              {getSecondaryIcon()}
            </a>
          </Button>
        )}
      </Box>
    </div>
  );
};

export default PartnerCard;

// Convenience component for the common Hanzo Agency + Sensei Group pair
interface PartnersSectionProps {
  className?: string;
}

export const PartnersSection: React.FC<PartnersSectionProps> = ({ className = "" }) => {
  return (
    <div className={`bg-gradient-to-br from-neutral-900/70 to-background/90 p-10 rounded-2xl border border-neutral-800 ${className}`}>
      <Box className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <PartnerCard
          name={partners.hanzoAgency.name}
          description={partners.hanzoAgency.description}
          url={partners.hanzoAgency.url}
          icon={Users}
          color="primary"
          primaryAction={{
            label: "Visit Hanzo Agency",
            href: "https://hanzo.agency",
            external: true,
          }}
          secondaryAction={{
            label: "Contact us",
            href: "/contact",
            type: "email",
          }}
        />
        <PartnerCard
          name="Sensei Group"
          description="A collective of fractional CXOs and industry experts who take a seat on your team for the length of a project."
          url="https://sensei.group"
          icon={Shield}
          color="secondary"
          primaryAction={{
            label: "Visit Sensei Group",
            href: "https://sensei.group",
            external: true,
          }}
          secondaryAction={{
            label: "Schedule a call",
            href: "tel:+19137774443",
            type: "phone",
          }}
        />
      </Box>
    </div>
  );
};
