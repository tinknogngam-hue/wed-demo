import '../app/globals.css';
import AppHeader from '../nav/AppHeader';
import QuickActionMenu from '../components/QuickActionMenu';
import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';

const PAGE_HOTKEYS = [
  { key: 'h', href: '/dashboard'   },
  { key: 'r', href: '/register'    },
  { key: 't', href: '/triage'      },
  { key: 'q', href: '/queue'        },
  { key: 'd', href: '/queue-doctor' },
  { key: 'a', href: '/appointment' },
  { key: 'm', href: '/emr'         },
  { key: 'x', href: '/treatment'   },
  { key: 'c', href: '/discharge'   },
  { key: 'u', href: '/followup'    },
  { key: 'i', href: '/ipd'         },
  { key: 'p', href: '/pharmacy'    },
  { key: 'l', href: '/lab'         },
  { key: 'g', href: '/imaging'     },
  { key: 'b', href: '/billing'     },
  { key: 'n', href: '/inventory'   },
  { key: 'o', href: '/report'      },
  { key: 's', href: '/patients'    },
  { key: 'k', href: '/clients'     },
  { key: 'y', href: '/hr'          },
  { key: 'z', href: '/finance'     },
];

const AUTH_PAGES = ['/login', '/signup', '/forgot-password'];

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const isAuthPage = AUTH_PAGES.includes(router.pathname);

  const handleKeyDown = useCallback((e) => {
    if (isAuthPage) return;
    const tag = document.activeElement?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || document.activeElement?.isContentEditable) return;

    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      setMenuOpen(open => !open);
      return;
    }

    if (e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
      const match = PAGE_HOTKEYS.find(h => h.key === e.key.toLowerCase());
      if (match) {
        e.preventDefault();
        router.push(match.href);
      }
    }
  }, [isAuthPage, router]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (isAuthPage) {
    return <Component {...pageProps} />;
  }

  return (
    <>
      <QuickActionMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className="flex flex-col h-screen min-w-[1360px] bg-[#f6f9fb]">
        <AppHeader onOpenQuickAction={() => setMenuOpen(true)} />
        <main className="flex-1 overflow-hidden flex flex-col relative z-0">
          <Component {...pageProps} />
        </main>
      </div>
    </>
  );
}
