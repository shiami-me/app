import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface PointsIconProps {
  point: any;
  type?: "collateral" | "debt";
  showTooltip?: boolean;
  size?: "sm" | "md" | "lg";
}

export const formatPointsText = (point: any) => {
  const getLabel = () => {
    if (point._tag === "sonic") return "Sonic";
    if (point._tag === "rings") return "Rings";
    if (point._tag === "silo") return "Silo";
    return point._tag.charAt(0).toUpperCase() + point._tag.slice(1);
  };

  if (point.basePoints) {
    return `${point.basePoints} ${getLabel()} point${point.basePoints > 1 ? 's' : ''} per $ / day`;
  } else {
    return `${point.multiplier}x ${getLabel()} points`;
  }
};

export const TokenIcon = ({ tag, size = "md" }: { tag: string, size?: "sm" | "md" | "lg" }) => {
  const getSizeProps = () => {
    switch (size) {
      case "sm": return { width: 12, height: 12, fontSize: 6 };
      case "md": return { width: 16, height: 16, fontSize: 8 };
      case "lg": return { width: 24, height: 24, fontSize: 10 };
    }
  };

  const { width, height, fontSize } = getSizeProps();

  switch (tag) {
    case "sonic":
      return (
        <svg
          className="text-material-text-a"
          width={width}
          height={height}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
        >
          <g clipPath="url(#sonic-points-icon-clip-0)">
            <mask
              id="sonic-points-icon-mask-0"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="24"
              height="24"
              style={{ maskType: "luminance" }}
            >
              <path d="M24 0H0V24H24V0Z" fill="white"></path>
            </mask>
            <g mask="url(#sonic-points-icon-mask-0)">
              <path
                d="M24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12Z"
                fill="#141416"
              ></path>
              <path
                d="M13.8368 14.1834C10.4347 15.204 7.62042 16.6926 5.85879 18.4368L5.78101 18.5142C6.24946 18.957 6.76312 19.353 7.31838 19.6896L7.43775 19.5438C7.91884 18.957 8.43432 18.39 8.97147 17.8554C10.4129 16.4208 12.0625 15.1788 13.8386 14.1816L13.8368 14.1834Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M2.99927 12.6714C3.13491 14.4912 3.81136 16.1598 4.87304 17.517L4.92188 17.4684C6.0125 16.3938 7.43231 15.4164 9.14507 14.565C10.6463 13.818 12.3699 13.1772 14.2274 12.6714H2.99927Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M9.92282 5.1924C12.9668 8.2218 16.7975 10.2252 20.9991 10.9848C20.4926 6.4938 16.6655 3 12.0155 3C10.7873 3 9.6172 3.2448 8.54822 3.6858C8.98232 4.2078 9.44537 4.7154 9.92282 5.1924Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M5.85879 5.56322C7.62042 7.30922 10.4347 8.79602 13.8368 9.81842C12.0607 8.81942 10.4111 7.57921 8.96967 6.14462C8.43432 5.61182 7.91884 5.04482 7.43594 4.45622L7.31657 4.31042C6.76131 4.64702 6.24765 5.04302 5.78101 5.48582L5.85879 5.56322Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M9.92282 18.8076C9.44357 19.2846 8.98052 19.7922 8.54822 20.3142C9.6154 20.7552 10.7873 21 12.0155 21C16.6655 21 20.4926 17.5062 21.0009 13.0134C16.7993 13.773 12.9686 15.7764 9.92462 18.8058L9.92282 18.8076Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M9.14507 9.43503C7.43231 8.58363 6.0125 7.60623 4.92188 6.53163L4.87304 6.48303C3.81136 7.84023 3.13491 9.50883 2.99927 11.3286H14.2256C12.3681 10.8228 10.6463 10.182 9.14327 9.43323L9.14507 9.43503Z"
                fill="#F5F5F5"
              ></path>
            </g>
          </g>
          <defs>
            <clipPath id="sonic-points-icon-clip-0">
              <rect width="24" height="24" fill="white"></rect>
            </clipPath>
          </defs>
        </svg>
      );
    case "rings":
      return (
        <svg
          className="text-material-text-a"
          width={width}
          height={height}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="none"
        >
          <g clipPath="url(#rings-points-icon-clip-0)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.4458 13.8504C16.6735 10.8406 16.85 5.78405 13.8401 2.55633C10.8303 -0.67135 5.77377 -0.84794 2.54605 2.16194C2.52894 2.1779 2.5119 2.19393 2.49494 2.21001C5.47592 -0.531027 10.1152 -0.356626 12.8816 2.6099C15.6599 5.5893 15.4969 10.2569 12.5175 13.0353C9.53813 15.8136 4.87053 15.6506 2.09219 12.6712C0.00934217 10.4376 -0.420451 7.25523 0.750191 4.63136C-0.582614 7.49545 -0.135233 11.0036 2.15167 13.4561C5.16152 16.6838 10.2181 16.8603 13.4458 13.8504Z"
              fill="url(#rings-points-icon-paint-0)"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.8587 10.5687C14.7259 7.33468 13.6179 3.1993 10.3838 1.33214C7.14979 -0.535032 3.01441 0.573041 1.14724 3.80706C-0.719922 7.04111 0.388148 11.1764 3.62217 13.0436C6.85622 14.9108 10.9916 13.8028 12.8587 10.5687ZM11.794 9.95399C13.4915 7.01396 12.4841 3.25455 9.54411 1.55714C6.60408 -0.140301 2.84468 0.867032 1.14724 3.80706C-0.550181 6.74709 0.457142 10.5065 3.39717 12.2039C6.33721 13.9014 10.0966 12.894 11.794 9.95399Z"
              fill="url(#rings-points-icon-paint-1)"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.7361 9.33104C12.2638 6.68502 11.3572 3.30156 8.71113 1.77388C6.06512 0.246195 2.68168 1.15279 1.15396 3.79882C-0.373716 6.4448 0.532882 9.82831 3.17891 11.356C5.82495 12.8836 9.2084 11.977 10.7361 9.33104ZM9.67141 8.71636C11.0294 6.36431 10.2235 3.35681 7.87147 1.99888C5.51947 0.640928 2.51192 1.44679 1.15396 3.79882C-0.203963 6.15084 0.601899 9.15835 2.95394 10.5163C5.30595 11.8742 8.31345 11.0684 9.67141 8.71636Z"
              fill="url(#rings-points-icon-paint-2)"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.90584 7.35151C8.79858 5.43703 7.97028 3.16139 6.0558 2.26866C4.1504 1.38013 1.88713 2.19645 0.985694 4.09169C1.99873 1.95716 4.54646 1.03731 6.69122 2.03741C8.84493 3.04172 9.77673 5.60182 8.77243 7.75559C7.76813 9.90935 5.20804 10.8412 3.05428 9.83686C0.909545 8.83675 -0.0234605 6.2938 0.960491 4.14573C0.0881185 6.05451 0.917583 8.31294 2.82301 9.20149C4.73746 10.0942 7.01309 9.26593 7.90584 7.35151Z"
              fill="url(#rings-points-icon-paint-3)"
            ></path>
          </g>
          <defs>
            <linearGradient
              id="rings-points-icon-paint-0"
              x1="0.272403"
              y1="32.8142"
              x2="16.5906"
              y2="32.633"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#7A8FD9"></stop>
              <stop offset="1" stopColor="#AC62E4"></stop>
            </linearGradient>
            <linearGradient
              id="rings-points-icon-paint-1"
              x1="0.466633"
              y1="28.1827"
              x2="14.2766"
              y2="28.0294"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#7A8FD9"></stop>
              <stop offset="1" stopColor="#AC62E4"></stop>
            </linearGradient>
            <linearGradient
              id="rings-points-icon-paint-2"
              x1="0.597104"
              y1="23.7425"
              x2="11.8962"
              y2="23.617"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#7A8FD9"></stop>
              <stop offset="1" stopColor="#AC62E4"></stop>
            </linearGradient>
            <linearGradient
              id="rings-points-icon-paint-3"
              x1="0.712932"
              y1="19.2984"
              x2="9.5017"
              y2="19.2009"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#7A8FD9"></stop>
              <stop offset="1" stopColor="#AC62E4"></stop>
            </linearGradient>
            <clipPath id="rings-points-icon-clip-0">
              <rect width="16" height="16" fill="white"></rect>
            </clipPath>
          </defs>
        </svg>
      );
    case "silo":
      return (
        <svg
          className="text-material-text-a"
          width={width}
          height={height}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path
              id="Vector"
              d="M8.00004 14L1.33337 6L3.33337 2H12.6667L14.6667 6L8.00004 14ZM6.41671 5.33333H9.58337L8.58337 3.33333H7.41671L6.41671 5.33333ZM7.33337 11.1167V6.66667H3.63337L7.33337 11.1167ZM8.66671 11.1167L12.3667 6.66667H8.66671V11.1167ZM11.0667 5.33333H12.8334L11.8334 3.33333H10.0667L11.0667 5.33333ZM3.16671 5.33333H4.93337L5.93337 3.33333H4.16671L3.16671 5.33333Z"
              fill="currentColor"
            ></path>
          </g>
        </svg>
      );
    default:
      return (
        <svg
          width={width}
          height={height}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="8"
            cy="8"
            r="7"
            fill="#6B7280"
            stroke="white"
            strokeWidth="1"
          />
          <text
            x="8"
            y="11"
            textAnchor="middle"
            fill="white"
            fontSize={fontSize}
            fontWeight="bold"
          >
            {tag.charAt(0).toUpperCase()}
          </text>
        </svg>
      );
  }
};

export const PointsIcon: React.FC<PointsIconProps> = ({
  point,
  type = "collateral",
  showTooltip = true,
  size = "md"
}) => {
  const IconComponent = <TokenIcon tag={point._tag} size={size} />;

  if (!showTooltip) {
    return IconComponent;
  }

  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <div className="cursor-help transition-transform hover:scale-110">
            {IconComponent}
          </div>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="bg-card p-2 shadow-md rounded-md border border-gray-200 dark:border-gray-700"
        >
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
              {type === "collateral" ? "Collateral" : "Debt"} Points
            </span>
            <div className="font-medium text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2 mt-1">
              <div style={{ width: '12px', height: '12px' }}>
                <TokenIcon tag={point._tag} size="sm" />
              </div>
              {formatPointsText(point)}
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default PointsIcon;
