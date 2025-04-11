"use client";

import { Progress } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const PageProgressLoader = () => {
  const [progressValue, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let timer1, timer2, timer3;

    setIsVisible(true);
    setProgress(20);

    timer1 = setTimeout(() => setProgress(60), 200);
    timer2 = setTimeout(() => setProgress(90), 300);
    timer3 = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setIsVisible(false), 400);
    }, 500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [pathname]);

  return (
    <>
      {isVisible && (
        <Progress.Root
          defaultValue={0}
          value={progressValue}
          size="xs"
          w="100%"
          position="fixed"
          top="0"
          left="0"
          zIndex="50"
        >
          <Progress.Track>
            <Progress.Range />
          </Progress.Track>
        </Progress.Root>
      )}
    </>
  );
};

export default PageProgressLoader;
