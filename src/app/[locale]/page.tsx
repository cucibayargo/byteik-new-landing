export const runtime = "edge";
  
import { getTranslations } from 'next-intl/server';
  import HomePage from './component/home';
  import type { Metadata } from 'next';

  export default function Page() {
    return <HomePage />
  }

  type Props = {
    params: Promise<{ locale: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  }
   

  export async function generateMetadata({ params }: Props): Promise<Metadata> {
    // read route params
    const { locale } = await params
    
    const t = await getTranslations('HomePage');
    const localizedCanonical = `https://byteik.com/${locale}`;

    return {
      title: t('seo.title'),
      description: t('seo.description'),
      alternates: {
        canonical: localizedCanonical,
        languages: {
          en: 'https://byteik.com/en',
          id: 'https://byteik.com/id',
          'x-default': 'https://byteik.com',
        },
      },
      openGraph: {
        type: 'website',
        url: localizedCanonical,
        title: t('seo.title'),
        description: t('seo.description'),
        images: [
          {
            url: 'https://byteik.com/images/og.png',
            width: 1200,
            height: 630,
            alt: 'Byteik OG Image',
          },
        ],
        locale: locale === 'en' ? 'en_US' : 'id_ID',
        siteName: 'Byteik',
      },
      twitter: {
        card: 'summary_large_image',
        title: t('seo.title'),
        description: t('seo.description'),
        images: ['https://byteik.com/images/og.png'],
      },
      icons: {
        icon: '/favicon.ico',
      },
      metadataBase: new URL('https://byteik.com'),
    };
  }
