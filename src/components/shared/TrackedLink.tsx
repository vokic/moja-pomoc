import { track } from '@/lib/analytics';
import type { AnchorHTMLAttributes } from 'react';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  /** Optional explicit category - passed through to the analytics event. */
  source?: string;
};

/**
 * Wrap an <a> tag to fire `external_link_clicked` on click. The host
 * (e.g. `pio.rs`) is extracted automatically for non-mail/tel links.
 */
export function TrackedLink({ source, onClick, href, children, ...rest }: Props) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const props: Record<string, string> = {};
    if (source) props.source = source;
    if (href) {
      if (href.startsWith('mailto:')) {
        props.kind = 'email';
      } else if (href.startsWith('tel:')) {
        props.kind = 'phone';
      } else {
        try {
          const u = new URL(href, window.location.origin);
          if (u.origin !== window.location.origin) {
            props.kind = 'external';
            props.domain = u.host.replace(/^www\./, '');
          }
        } catch {
          /* invalid URL - skip domain */
        }
      }
    }
    track('external_link_clicked', props);
    onClick?.(e);
  };

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
