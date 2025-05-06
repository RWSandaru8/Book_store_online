"use client"
import React, { useEffect, useState } from "react"
import { motion } from "framer-motion" 

export default function TechBackgroundAnimation() {
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile device on component mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Set up event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile specific generation with fewer items and smaller sizes
  const generateMobileItems = (count:number, sizeRange:[number, number]) => {
    return Array(count).fill(0).map((_, i) => ({
      id: i,
      startX: Math.random() * 100,
      startY: Math.random() * 100,
      size: Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0],
      duration: Math.random() * 2 + 6, // Slightly slower for less distraction
      delay: Math.random() * 3,
      isCircle: Math.random() > 0.5,
      colorType: Math.floor(Math.random() * 3) // 0: white, 1: blue, 2: green
    }));
  };

  // Desktop generation remains the same
  const generateDesktopItems = (count:number, sizeRange:[number, number]) => {
    return Array(count).fill(0).map((_, i) => ({
      id: i,
      startX: Math.random() * 100,
      startY: Math.random() * 100,
      size: Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0],
      duration: Math.random() * 2 + 5,
      delay: Math.random() * 2,
      isCircle: Math.random() > 0.5,
      colorType: Math.floor(Math.random() * 3)
    }));
  };

  // Mobile: fewer items, smaller sizes
  const mobileItems = {
    large: generateMobileItems(3, [40, 80]),
    medium: generateMobileItems(4, [20, 40]),
    small: generateMobileItems(3, [10, 20])
  };

  // Desktop: original configuration
  const desktopItems = {
    large: generateDesktopItems(8, [60, 120]),
    medium: generateDesktopItems(10, [30, 60]),
    small: generateDesktopItems(5, [15, 30])
  };

  // Select appropriate items based on viewport
  const items = isMobile ? mobileItems : desktopItems;

  // Mobile colors with even lower opacity
  const mobileWhiteShades = [
    'rgba(255, 255, 255, 0.04)',
    'rgba(245, 245, 245, 0.05)',
    'rgba(240, 240, 240, 0.06)'
  ];
  
  const mobileBlueShades = [
    'rgba(100, 149, 237, 0.04)',
    'rgba(65, 105, 225, 0.05)',
    'rgba(30, 144, 255, 0.06)'
  ];
  
  const mobileGreenShades = [
    'rgba(144, 238, 144, 0.04)',
    'rgba(60, 179, 113, 0.05)',
    'rgba(46, 139, 87, 0.06)'
  ];

  // Desktop colors (original)
  const desktopWhiteShades = [
    'rgba(255, 255, 255, 0.08)',
    'rgba(245, 245, 245, 0.1)',
    'rgba(240, 240, 240, 0.12)'
  ];
  
  const desktopBlueShades = [
    'rgba(100, 149, 237, 0.08)',
    'rgba(65, 105, 225, 0.1)',
    'rgba(30, 144, 255, 0.12)'
  ];
  
  const desktopGreenShades = [
    'rgba(144, 238, 144, 0.08)',
    'rgba(60, 179, 113, 0.1)',
    'rgba(46, 139, 87, 0.12)'
  ];

  // Select appropriate color scheme
  const whiteShades = isMobile ? mobileWhiteShades : desktopWhiteShades;
  const blueShades = isMobile ? mobileBlueShades : desktopBlueShades;
  const greenShades = isMobile ? mobileGreenShades : desktopGreenShades;

  // Helper function to get color based on type and intensity
  const getColor = (type:number, intensity:number) => {
    const intensityIndex = Math.min(Math.floor(intensity * 3), 2);
    switch(type) {
      case 0: return whiteShades[intensityIndex];
      case 1: return blueShades[intensityIndex];
      case 2: return greenShades[intensityIndex];
      default: return whiteShades[intensityIndex];
    }
  };

  // Simplified animations for mobile
  const mobileAnimation = {
    large: {
      animate: { 
        x: [`0%`, `${Math.random() > 0.5 ? 15 : -15}%`, `0%`],
        y: [`0%`, `${Math.random() > 0.5 ? 15 : -15}%`, `0%`],
        scale: [1, 1.03, 1]
      },
      transition: (duration: number, delay: number) => ({ 
        duration: duration, 
        delay: delay, 
        repeat: Infinity, 
        ease: "easeInOut" 
      })
    },
    medium: {
      animate: { 
        x: [`0%`, `${Math.random() > 0.5 ? 20 : -20}%`, `0%`],
        y: [`0%`, `${Math.random() > 0.5 ? 20 : -20}%`, `0%`]
      },
      transition: (duration: number, delay: number) => ({ 
        duration: duration, 
        delay: delay, 
        repeat: Infinity, 
        ease: "linear" 
      })
    },
    small: {
      animate: { 
        x: [`0%`, `${Math.random() > 0.5 ? 25 : -25}%`, `0%`],
        y: [`0%`, `${Math.random() > 0.5 ? 25 : -25}%`, `0%`]
      },
      transition: (duration: number, delay: number) => ({ 
        duration: duration, 
        delay: delay, 
        repeat: Infinity, 
        ease: "easeInOut" 
      })
    }
  };

  // Desktop animations (original)
  const desktopAnimation = {
    large: {
      animate: (item: any) => ({ 
        x: [`0%`, `${Math.random() > 0.5 ? 25 : -25}%`, `0%`],
        y: [`0%`, `${Math.random() > 0.5 ? 25 : -25}%`, `0%`],
        rotate: item.isCircle ? [0, 0] : [0, 15, 0, -15, 0],
        scale: [1, 1.05, 0.95, 1]
      }),
      transition: (duration: number, delay: number) => ({ 
        duration: duration, 
        delay: delay, 
        repeat: Infinity, 
        ease: "easeInOut" 
      })
    },
    medium: {
      animate: (item: any) => ({ 
        x: [`0%`, `${Math.random() > 0.5 ? 35 : -35}%`, `0%`],
        y: [`0%`, `${Math.random() > 0.5 ? 35 : -35}%`, `0%`],
        rotate: item.isCircle ? [0, 0] : [0, 45, 0, -45, 0]
      }),
      transition: (duration: number, delay: number) => ({ 
        duration: duration - 1, 
        delay: delay, 
        repeat: Infinity, 
        ease: "linear" 
      })
    },
    small: {
      animate: (item: any) => ({ 
        x: [`0%`, `${Math.random() > 0.5 ? 45 : -45}%`, `0%`],
        y: [`0%`, `${Math.random() > 0.5 ? 45 : -45}%`, `0%`],
        scale: [1, item.isCircle ? 1.2 : 0.9, 1]
      }),
      transition: (duration: number, delay: number) => ({ 
        duration: duration - 1.5, 
        delay: delay, 
        repeat: Infinity, 
        ease: "easeInOut" 
      })
    }
  };

  // Select appropriate animation scheme
  const animations = isMobile ? mobileAnimation : desktopAnimation;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large background items */}
      {items.large.map(item => (
        <motion.div
          key={`large-${item.id}`}
          className={`absolute ${item.isCircle ? 'rounded-full' : 'rounded-md'}`}
          style={{ 
            width: `${item.size}px`,
            height: `${item.size}px`,
            top: `${item.startY}%`,
            left: `${item.startX}%`,
            backgroundColor: getColor(item.colorType, 0.7)
          }}
          animate={isMobile ? mobileAnimation.large.animate : desktopAnimation.large.animate(item)}
          transition={isMobile 
            ? mobileAnimation.large.transition(item.duration, item.delay)
            : desktopAnimation.large.transition(item.duration, item.delay)
          }
        />
      ))}

      {/* Medium items */}
      {items.medium.map(item => (
        <motion.div
          key={`medium-${item.id}`}
          className={`absolute ${item.isCircle ? 'rounded-full' : 'rounded-md'}`}
          style={{ 
            width: `${item.size}px`,
            height: `${item.size}px`,
            top: `${item.startY}%`,
            left: `${item.startX}%`,
            backgroundColor: getColor(item.colorType, 0.8)
          }}
          animate={isMobile ? mobileAnimation.medium.animate : desktopAnimation.medium.animate(item)}
          transition={isMobile 
            ? mobileAnimation.medium.transition(item.duration, item.delay)
            : desktopAnimation.medium.transition(item.duration, item.delay)
          }
        />
      ))}

      {/* Small items */}
      {items.small.map(item => (
        <motion.div
          key={`small-${item.id}`}
          className={`absolute ${item.isCircle ? 'rounded-full' : ''}`}
          style={{ 
            width: `${item.size}px`,
            height: `${item.size}px`,
            top: `${item.startY}%`,
            left: `${item.startX}%`,
            backgroundColor: getColor(item.colorType, 0.9)
          }}
          animate={isMobile ? mobileAnimation.small.animate : desktopAnimation.small.animate(item)}
          transition={isMobile 
            ? mobileAnimation.small.transition(item.duration, item.delay)
            : desktopAnimation.small.transition(item.duration, item.delay)
          }
        />
      ))}

      {/* Additional floating elements - simplified or removed for mobile */}
      {!isMobile && (
        <>
          <motion.div
            className="absolute rounded-full"
            style={{ width: "80px", height: "80px", backgroundColor: blueShades[1] }}
            initial={{ top: "10%", left: "-5%" }}
            animate={{ left: ["-5%", "105%"], top: ["10%", "60%", "30%", "70%", "10%"] }}
            transition={{ left: { duration: 15, repeat: Infinity, ease: "linear" }, top: { duration: 15, repeat: Infinity, ease: "easeInOut" } }}
          />

          <motion.div
            className="absolute rounded-md"
            style={{ width: "100px", height: "100px", backgroundColor: greenShades[1] }}
            initial={{ top: "70%", left: "105%" }}
            animate={{ left: ["105%", "-5%"], top: ["70%", "20%", "50%", "30%", "70%"] }}
            transition={{ left: { duration: 18, repeat: Infinity, ease: "linear" }, top: { duration: 18, repeat: Infinity, ease: "easeInOut" } }}
          />
        </>
      )}

      {/* Very subtle grid background with white color - even more subtle for mobile */}
      <div
        className="absolute inset-0"
        style={{ 
          backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, ${isMobile ? '0.05' : '0.08'}) 1px, transparent 1px)`,
          backgroundSize: isMobile ? "30px 30px" : "40px 40px",
          opacity: isMobile ? 0.2 : 0.3
        }}
      />
    </div>
  )
}