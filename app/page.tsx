"use client"
import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ModeToggle } from "@/components/theme-toggle";
import { XIcon } from "@/components/x-icon";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight,Sparkles, CircleDollarSign, Wallet, Globe, Shield, MessageSquare, Bot, Zap, User2, Users2 } from "lucide-react";
import { motion } from "framer-motion";
import { ParticleBackground } from "@/components/effects/particle-background"
import { MagneticButton } from "@/components/effects/magnetic-button"

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation variants
  const fadeInAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  useGSAP(() => {
    // Floating elements animation
    const elements = floatingElementsRef.current?.children;
    if (elements) {
      Array.from(elements).forEach((el, i) => {
        gsap.to(el as HTMLElement, {
          y: Math.random() * 30 - 15,
          x: Math.random() * 30 - 15,
          rotation: Math.random() * 20 - 10,
          duration: 2 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.2,
        });
      });
    }

    // Hero heading animation
    if (headingRef.current) {
      gsap.from(headingRef.current, {
        duration: 1,
        y: 100,
        opacity: 0,
        stagger: 0.2,
        ease: "power4.out",
      });
    }

    // Hero image parallax
    if (imageRef.current && heroRef.current) {
      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    // Sections reveal animation
    const sections = document.querySelectorAll('.gsap-reveal');
    sections.forEach((section) => {
      gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // Geometric shapes animations
    gsap.to('.geometric-shape', {
      rotate: 360,
      duration: "random(4, 8)",
      repeat: -1,
      ease: "none",
      stagger: {
        amount: 2,
        from: "random"
      }
    });

    // Create parallax effect for shapes
    gsap.to('.parallax-shape', {
      y: "random(-100, 100)",
      x: "random(-50, 50)",
      duration: "random(10, 20)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: {
        amount: 4,
        from: "random"
      }
    });

    // Pulse animation for accent elements
    gsap.to('.pulse-element', {
      scale: 1.2,
      opacity: 0.5,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: {
        amount: 1,
        from: "random"
      }
    });

  }, { scope: container });

  return (
    <div ref={container} className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-black font-[family-name:var(--font-roboto-mono)] overflow-hidden">
      <ParticleBackground />
      
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 dark:bg-black/80 backdrop-blur-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className={`text-2xl font-bold bg-gradient-to-r from-gray-600 to-gray-800 dark:from-gray-300 dark:via-gray-100 dark:to-gray-400 bg-clip-text text-transparent tracking-wider font-[family-name:var(--font-roboto-mono)]`}>
              shiami
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/chat">
                <Button variant="ghost" 
                  className={!scrolled ? "text-gray-800 dark:text-gray-200 border-gray-800 dark:border-gray-200" : ""}>
                  Try Demo
                </Button>
              </Link>
              <ModeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-20 px-4 relative">
        {/* Add futuristic grid lines */}
        <div className="absolute inset-0 grid grid-cols-6 gap-4 opacity-10">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-full border-r border-green-500/20" />
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative">
          {/* Subtle floating elements */}
          <motion.div 
            className="absolute -z-10 top-0 right-0 text-green-500/10"
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 10, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Sparkles className="w-32 h-32" />
          </motion.div>

          <div className="flex flex-col md:flex-row items-center justify-between">
            <div ref={headingRef} className="flex-1 text-center md:text-left mb-10 md:mb-0">

              <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
                <span className="bg-gradient-to-r from-green-600 to-green-800 dark:from-green-400 dark:to-green-600 bg-clip-text text-transparent">
                  DeFi on Sonic
                </span>
                <br />
                <span className="text-gray-700 dark:text-gray-300">
                  Made Simple
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
                Your AI-powered companion for DeFi. Execute swaps, track prices, and research protocols on Sonic - all through natural conversation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <MagneticButton>
                  <Link href="/chat">
                    <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                      Get Started <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </MagneticButton>
                <MagneticButton>
                  <a href="https://twitter.com/ShiamiHQ" target="_blank" rel="noopener noreferrer">
                    <Button size="lg" variant="outline">
                      Follow us <XIcon className="ml-2 h-5 w-5" />
                    </Button>
                  </a>
                </MagneticButton>
              </div>
            </div>

            <div ref={imageRef} className="flex-1 relative">
              <div className="relative w-full max-w-md mx-auto">
                <Image
                  src="/shiami.png"
                  alt="Shiami Interface"
                  width={500}
                  height={500}
                  className="relative rounded-lg transform hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 dark:bg-black/50 gsap-reveal">
        <motion.div className="max-w-7xl mx-auto px-4" {...fadeInAnimation}>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInAnimation}>
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-green-600 to-green-800 dark:from-green-400 dark:to-green-600 bg-clip-text text-transparent">
              Access Sonic&apos;s Top Protocols with $500M+ TVL on One Platform
              </h2>
              <div className="space-y-4">
                <FeatureItem
                  icon={<Wallet className="w-6 h-6" />}
                  title="Smart DeFi Transactions"
                  description="Execute swaps and interact with various Sonic DeFi protocols seamlessly through natural language commands."
                />
                <FeatureItem
                  icon={<Globe className="w-6 h-6" />}
                  title="Query through the Sonic Network"
                  description="Manage your holdings, track prices and transactions on the Sonic Network"
                />
                <FeatureItem
                  icon={<Shield className="w-6 h-6" />}
                  title="Secured and Easy"
                  description="Built-in safety checks and transaction verification for secure DeFi operations."
                />
              </div>
            </motion.div>
            <motion.div {...fadeInAnimation}>
              <Image
                src="/arch.png"
                alt="AI Features"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section className="py-32 gsap-reveal">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-green-600 to-green-800 dark:from-green-400 dark:to-green-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            How Shiami Works
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <MessageSquare className="w-8 h-8" />,
                title: "Chat Naturally",
                description: "Simply tell Shiami what you want to do in DeFi - no technical jargon needed."
              },
              {
                icon: <Bot className="w-8 h-8" />,
                title: "AI Processing",
                description: "Get instant responses with real-time market data and transaction details."
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Quick Execution",
                description: "Review and execute transactions with built-in safety checks."
              }
            ].map((step, index) => (
              <StepCard key={index} {...step} index={index + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Features Section */}
      <section className="py-32 bg-white/50 dark:bg-black/50 gsap-reveal">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-green-600 to-green-800 dark:from-green-400 dark:to-green-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Advanced Capabilities
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Wallet />,
                title: "Silo & Beets Integration",
                description: "Direct integration with Silo Finance and Beets on Sonic for profit maximization"
              },
              {
                icon: <User2 />,
                title: "Made for Everyone",
                description: "In case you are new to DeFi, Just add a component to the context and ask questions from Shiami"
              },
              {
                icon: <Users2 />,
                title: "Agent Workflows",
                description: "Create highly customizable agent workflows supervised by Shiami"
              },
              {
                icon: <Shield />,
                title: "Complete Transparency",
                description: "Never lose the custody of your funds even when you are automating your trades"
              }
            ].map((feature, index) => (
              <AdvancedFeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-32 gsap-reveal">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-green-600 to-green-800 dark:from-green-400 dark:to-green-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Perfect For
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Advanced DeFi Traders",
                description: "Execute trades, monitor positions, and create agentic workflows that manage your portfolio with ease.",
                features: ["Real-time market analysis", "Specialized Dashboards for Beets and Silo", "Position management"]
              },
              {
                title: "Beginners in DeFi",
                description: "Interact with DeFi protocols through simple conversations, no technical knowledge required.",
                features: ["Natural language interface", "Learn as you trade", "Risk assessment"]
              }
            ].map((useCase, index) => (
              <UseCaseCard key={index} {...useCase} />
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 gsap-reveal">
        <motion.div 
          className="max-w-4xl mx-auto text-center px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-gray-200">
            Ready to Transform Your DeFi Experience?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Join Shiami today and start trading, monitoring, and managing your DeFi portfolio on Sonic with ease.
          </p>
          <Link href="/chat">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
              Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white/30 dark:bg-black/30">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p>© 2025 Shiami. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index?: number;
}

// Update FeatureItem to include 3D hover effect
const FeatureItem = ({ icon, title, description }: CardProps) => (
  <motion.div 
    className="p-6 rounded-xl bg-white/80 dark:bg-black/80 hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ 
      scale: 1.02,
      rotateX: 5,
      rotateY: 5,
    }}
    transition={{ duration: 0.5 }}
  >
    {/* Add hover effect gradient */}
    <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
    
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0 p-3 bg-green-100 dark:bg-green-900/50 rounded-lg">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </div>
  </motion.div>
);

const StepCard = ({ icon, title, description, index }: CardProps & { index: number }) => (
  <motion.div 
    className="relative p-8 rounded-xl bg-white/80 dark:bg-black/80 hover:shadow-xl transition-all duration-300"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.2 }}
  >
    <div className="absolute -top-4 -left-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
      {index}
    </div>
    <div className="mb-4 text-green-500">{icon}</div>
    <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </motion.div>
);

const AdvancedFeatureCard = ({ icon, title, description }: CardProps) => (
  <motion.div 
    className="p-6 rounded-xl bg-white/60 dark:bg-black/60 hover:shadow-xl transition-all duration-300"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
  >
    <div className="mb-4 text-green-500">{icon}</div>
    <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">{title}</h3>
    <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
  </motion.div>
);

interface UseCaseCardProps {
  title: string;
  description: string;
  features: string[];
}

const UseCaseCard = ({ title, description, features }: UseCaseCardProps) => (
  <motion.div 
    className="p-8 rounded-xl bg-white/60 dark:bg-black/60 hover:shadow-xl transition-all duration-300"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
  >
    <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400 mb-6">{description}</p>
    <ul className="space-y-2">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center text-gray-600 dark:text-gray-400">
          <CircleDollarSign className="w-4 h-4 mr-2 text-green-500" />
          {feature}
        </li>
      ))}
    </ul>
  </motion.div>
);