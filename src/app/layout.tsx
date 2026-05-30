import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mitesh — Developer & DevOps Engineer',
  description:
    'Aspiring Full-Stack Developer and DevOps Engineer specializing in React, Next.js, TypeScript, Docker, Kubernetes, and cloud infrastructure. Seeking internship opportunities.',
  keywords: [
    'Developer',
    'DevOps',
    'Full-Stack',
    'React',
    'Next.js',
    'TypeScript',
    'Docker',
    'Kubernetes',
    'Cloud',
    'CI/CD',
    'Fresher',
    'Internship',
  ],
  authors: [{ name: 'Mitesh' }],
  openGraph: {
    title: 'Mitesh — Developer & DevOps Engineer',
    description:
      'Aspiring Full-Stack Developer and DevOps Engineer specializing in React, Next.js, TypeScript, Docker, Kubernetes, and cloud infrastructure.',
    type: 'website',
    locale: 'en_US',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
