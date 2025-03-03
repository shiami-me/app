"use client";
import Image from "next/image";
import { Download } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface Props {
    ipfsUrl: string;
    width: number;
    height: number;
}

const RenderImage: React.FC<Props> = ({
    ipfsUrl,
    width,
    height,
}: Props) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [responsiveWidth, setResponsiveWidth] = useState(width);
    const [responsiveHeight, setResponsiveHeight] = useState(height);
    const [isMobile, setIsMobile] = useState(false);

    // Handle responsive sizing
    useEffect(() => {
        const updateDimensions = () => {
            const containerWidth = window.innerWidth - (window.innerWidth > 768 ? 120 : 48);
            
            // Check if we need to scale the image
            if (width > containerWidth) {
                // Calculate the aspect ratio to maintain proportions
                const aspectRatio = width / height;
                const newWidth = containerWidth;
                const newHeight = containerWidth / aspectRatio;
                
                setResponsiveWidth(newWidth);
                setResponsiveHeight(newHeight);
            } else {
                setResponsiveWidth(width);
                setResponsiveHeight(height);
            }
            
            setIsMobile(window.innerWidth < 768);
        };

        // Set initial dimensions
        updateDimensions();

        // Add event listener
        window.addEventListener('resize', updateDimensions);
        
        // Clean up
        return () => window.removeEventListener('resize', updateDimensions);
    }, [width, height]);

    const handleDownload = async () => {
        try {
            setIsDownloading(true);
            const response = await fetch(ipfsUrl);
            const blob = await response.blob();
            
            const blobUrl = window.URL.createObjectURL(blob);
            
            
            const link = document.createElement('a');
            
            const fileName = ipfsUrl.split('/').pop() || 'shiami-image.png';
            
            link.href = blobUrl;
            link.download = fileName;
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error('Error downloading image:', error);
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="space-y-4 w-full flex">
          <div
            className="relative w-full max-w-full"
            style={{ 
                width: `${responsiveWidth}px`, 
                height: `${responsiveHeight}px`,
                maxWidth: '100%'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setTimeout(() => setIsHovered(false), 3000)}
          >
            <Image
              src={ipfsUrl}
              alt={`Generated image`}
              fill
              className="object-contain rounded-lg"
              sizes={`(max-width: 768px) 100vw, ${responsiveWidth}px`}
              priority
            />
            
            {/* Download button overlay - always visible on mobile */}
            <Button
              variant="secondary"
              size="icon"
              className={`absolute top-2 right-2 bg-black/40 hover:bg-black/60 backdrop-blur-sm transition-opacity ${
                isHovered || isDownloading || isMobile ? 'opacity-100' : 'opacity-0'
              } rounded-full p-2 h-9 w-9`}
              onClick={handleDownload}
              disabled={isDownloading}
            >
              <Download className="h-5 w-5 text-white" />
            </Button>
          </div>
        </div>
    );
}

export default RenderImage;