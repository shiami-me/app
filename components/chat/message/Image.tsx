import Image from "next/image";

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
    return (
        <div className="space-y-4">
          <div
            className="relative w-full max-w-full"
            style={{ width: `${width}px`, height: `${height}px` }}
          >
            <Image
              src={ipfsUrl}
              alt={`Generated image`}
              fill
              className="object-contain rounded-lg"
              sizes={`(max-width: ${width}px) 100vw, ${width}px`}
              priority
            />
          </div>
        </div>
    );
}

export default RenderImage