import { ModeToggle } from "@/components/theme-toggle";
import { XIcon } from "@/components/x-icon";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-black font-[family-name:var(--font-audiowide)]">
      <div className="absolute top-6 left-6">
        <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-600 to-gray-800 dark:from-gray-300 dark:via-gray-100 dark:to-gray-400 bg-clip-text text-transparent tracking-wider font-[family-name:var(--font-geist-mono)]">
          shiami
        </div>
      </div>

      <div className="relative w-11/12 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center shadow-2xl p-6 md:p-12 rounded-3xl bg-white/90 dark:bg-black/60 backdrop-blur-sm min-h-[50vh] md:min-h-[60vh]">
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6 md:space-y-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-green-600 to-green-800 dark:from-green-400 dark:to-green-600 bg-clip-text text-transparent">
            Coming Soon
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-800 dark:text-gray-300">
            We&apos;re bringing something revolutionary to the world of DeFAI! Stay tuned.
          </p>
          <div className="flex items-center space-x-2">
            <a
              href="https://twitter.com/ShiamiHQ"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-600 hover:text-green-700 dark:hover:text-green-400 transition-colors duration-300"
            >
              <span className="text-lg sm:text-xl md:text-2xl flex flex-row">Follow us on <XIcon className="w-6 h-6 md:w-8 md:h-8 mx-2" /> to know more</span>
            </a>
          </div>
        </div>
        <Image
          src="/shiami.png"
          alt="Shiami"
          height={600}
          width={336}
          priority
          className="mt-8 md:mt-0 md:ml-16 w-48 md:w-64 lg:w-80 transform transition-transform duration-500 hover:scale-105"
        />
      </div>

      <div className="absolute bottom-6 right-6">
        <ModeToggle />
      </div>
    </div>
  );
}