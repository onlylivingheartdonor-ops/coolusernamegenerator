export const metadata = {
  title: "Cool Username Generator | Impress Your Friends in Games and Keep Usernames Easy to Remember",
  description: "Generate cool, creative usernames instantly. Create unique usernames for social media, gaming, and more.",
  
  alternates: {
    canonical: "https://www.coolusernamegenerator.com",           // ← MUST CHANGE
  },

  openGraph: {
    title: "Cool Username Generator | Impress Your Friends in Games and Keep Usernames Easy to Remember",
    description: "Generate cool, creative usernames instantly. Create unique usernames for social media, gaming, and more.",
    url: "https://www.coolusernamegenerator.com",                 // ← MUST CHANGE
    siteName: "Moneywise Calculators",             // ← Change
    images: [
      {
        url: "https://www.coolusernamegenerator.com/og-image.png", // ← MUST CHANGE
        width: 1200,
        height: 630,
        alt: "Cool Username Generator",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Cool Username Generator | Impress Your Friends in Games and Keep Usernames Easy to Remember",
    description: "Generate cool, creative usernames instantly. Create unique usernames for social media, gaming, and more.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },

  authors: [{name: "David Graham" }],
  creator: "MoneyWise Calculators",
  publisher: "MoneyWise Calculators",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3475627763908800"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
