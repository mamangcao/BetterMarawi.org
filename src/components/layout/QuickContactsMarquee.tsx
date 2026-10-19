'use client';

import React, { useRef, useState, useEffect } from 'react';
import { HotlineItem } from '@/types';
import { HotlineChip } from './HotlineChip';

interface QuickContactsMarqueeProps {
  hotlines: HotlineItem[];
}

export function QuickContactsMarquee({ hotlines }: QuickContactsMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [duration, setDuration] = useState(35);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const checkOverflow = () => {
      // Find the first track or measure direct scrollWidth vs clientWidth
      const primaryTrack = container.querySelector('[data-track="primary"]');
      if (primaryTrack) {
        const contentWidth = (primaryTrack as HTMLElement).scrollWidth;
        const availableWidth = container.clientWidth;
        const overflows = contentWidth > availableWidth;
        setIsOverflowing(overflows);

        if (overflows) {
          // Standardize reading speed across varying widths: ~30-35px/s
          const computedDuration = Math.max(20, Math.round(contentWidth / 28));
          setDuration(computedDuration);
        }
      }
    };

    checkOverflow();

    const resizeObserver = new ResizeObserver(() => {
      checkOverflow();
    });

    resizeObserver.observe(container);
    window.addEventListener('resize', checkOverflow);
    window.addEventListener('orientationchange', checkOverflow);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        checkOverflow();
      });
    }

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', checkOverflow);
      window.removeEventListener('orientationchange', checkOverflow);
    };
  }, [hotlines]);

  return (
    <div
      ref={containerRef}
      className={`flex-1 min-w-0 overflow-x-auto ${
        isOverflowing
          ? 'no-scrollbar mask-edges-fade'
          : 'no-scrollbar'
      } py-0.5 relative motion-reduce:thin-scrollbar`}
      style={{ ['--marquee-duration' as string]: `${duration}s` }}
    >
      {isOverflowing ? (
        <div
          ref={trackRef}
          className="flex items-center gap-2.5 w-max animate-marquee pause-marquee pr-2.5"
        >
          {/* Primary Set */}
          <div data-track="primary" className="flex items-center gap-2.5">
            {hotlines.map((hotline) => (
              <HotlineChip key={`primary-${hotline.id}`} item={hotline} />
            ))}
          </div>

          {/* Duplicate Set for Seamless Continuous Loop */}
          <div className="flex items-center gap-2.5" aria-hidden="true">
            {hotlines.map((hotline) => (
              <HotlineChip
                key={`duplicate-${hotline.id}`}
                item={hotline}
                isDuplicate={true}
              />
            ))}
          </div>
        </div>
      ) : (
        <div data-track="primary" className="flex items-center gap-2.5 w-max">
          {hotlines.map((hotline) => (
            <HotlineChip key={hotline.id} item={hotline} />
          ))}
        </div>
      )}
    </div>
  );
}

