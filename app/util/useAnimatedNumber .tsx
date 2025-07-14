import { useState, useEffect, useRef } from "react";

const useAnimatedNumber = (value: number, duration: number = 800): number => {
  const [displayValue, setDisplayValue] = useState(value);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const startValueRef = useRef(value);

  useEffect(() => {
    if (startValueRef.current === value) return;

    const startValue = startValueRef.current;
    const endValue = value;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;

      const progress = Math.min(
        (timestamp - startTimeRef.current) / duration,
        1
      );

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      const currentValue = startValue + (endValue - startValue) * easeOutQuart;
      setDisplayValue(currentValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        startValueRef.current = value;
        startTimeRef.current = null;
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [value, duration]);

  return displayValue;
};

export default useAnimatedNumber;
