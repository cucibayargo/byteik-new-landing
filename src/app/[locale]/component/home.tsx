"use client";

import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
export default function HomePage() {
  const t = useTranslations('HomePage');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolledOrHash, setIsScrolledOrHash] = useState(false);
  const [currentHash, setCurrentHash] = useState('');
  const currentHashRef = useRef(currentHash);

  useEffect(() => {
    currentHashRef.current = currentHash;
  }, [currentHash]);

  useEffect(() => {
    const checkState = () => {
      const scrolled = window.scrollY > 10;
      if (!scrolled) {
        setIsScrolledOrHash(false);
      } else {
        setIsScrolledOrHash(true);
      }

      const sectionIds = ['#whyus', '#services', '#portfolio', '#home', '#technologies'];
      const scrollMidpoint = window.scrollY + window.innerHeight / 2;
      let matchedHash: string | null = null;

      for (const id of sectionIds) {
        const el = document.querySelector(id);
        if (!el) continue;

        const element = el as HTMLElement;
        const top = element.offsetTop;
        const bottom = top + element.offsetHeight;

        if (scrollMidpoint >= top && scrollMidpoint <= bottom) {
          matchedHash = id;
          break;
        }
      }

      if (matchedHash && matchedHash !== currentHashRef.current) {
        history.replaceState(null, '', matchedHash);
        setCurrentHash(matchedHash);
        currentHashRef.current = matchedHash; // update ref immediately
      }
    };

    checkState();
    window.addEventListener('scroll', checkState);
    window.addEventListener('hashchange', checkState);

    return () => {
      window.removeEventListener('scroll', checkState);
      window.removeEventListener('hashchange', checkState);
    };
  }, []);

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const isFormValid = form.name.trim() && form.email.trim() && form.message.trim();
  const [alert, setAlert] = useState({ message: '', type: '' });
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setAlert({ message: t('cta.form.requiredMsg'), type: 'error' });
      return;
    }

    if (!validateEmail(form.email.trim())) {
      setAlert({ message: t('cta.form.emailInvalid'), type: 'error' });
      return;
    }

    setLoading(true);
    setAlert({ message: '', type: '' }); // clear previous alert

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setAlert({ message: t('cta.form.success'), type: 'success' });
        setForm({ name: '', email: '', message: '' });
      } else {
        setAlert({ message: t('cta.form.error'), type: 'error' });
      }
    } catch (err) {
      console.log(err);
      setAlert({ message: t('cta.form.error'), type: 'error' });
    } finally {
      setLoading(false);
    }
  };


  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const locales = ['en', 'id'];

  const handleChangeLanguage = (locale: string) => {
    if (!pathname) return;
    const [basePath, hash] = pathname.split('#');

    const segments = basePath.split('/');
    segments[1] = locale;

    const newPath = segments.join('/') + (hash ? `#${hash}` : '');

    router.replace(newPath);
  };
  return (
    <div className="min-h-screen overflow-hidden bg-white">
      <header
        className={`z-100 fixed top-0 w-full transition-colors duration-100 ${isScrolledOrHash ? 'bg-white shadow-md' : 'bg-transparent'
          }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="relative flex items-center justify-center md:justify-between">
            {/* Centered logo */}
            <Link href="/" className="absolute left-1/2 transform -translate-x-1/2 md:static md:transform-none">
              <Image
                src="/images/logo.svg"
                alt="Company Logo Byteik"
                width={160}
                height={41}
                style={{ height: '41px', width: 'auto' }}
              />
            </Link>

            {/* Mobile menu icon (shown only on mobile) */}
            <div className="ml-auto md:hidden">
              <button onClick={() => setMobileMenuOpen(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                </svg>
              </button>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className={`text-sm font-medium transition-colors ${currentHash === '' || currentHash === '#home' ? 'text-(--base-color) font-bold' : 'text-gray-600 hover:text-black'
                  }`}
              >
                {t('menu.home')}
              </Link>
              <Link
                href="#whyus"
                className={`text-sm font-medium transition-colors ${currentHash === '#whyus' ? 'text-(--base-color) font-bold' : 'text-gray-600 hover:text-black'
                  }`}
              >
                {t('menu.whyus')}
              </Link>
              <Link
                href="#portfolio"
                className={`text-sm font-medium transition-colors ${currentHash === '#portfolio' ? 'text-(--base-color) font-bold' : 'text-gray-600 hover:text-black'
                  }`}
              >
                {t('menu.portfolio')}
              </Link>
              <Link
                href="#services"
                className={`text-sm font-medium transition-colors ${currentHash === '#services' ? 'text-(--base-color) font-bold' : 'text-gray-600 hover:text-black'
                  }`}
              >
                {t('menu.solutions')}
              </Link>
              <Link
                href="#technologies"
                className={`text-sm font-medium transition-colors ${currentHash === '#technologies' ? 'text-(--base-color) font-bold' : 'text-gray-600 hover:text-black'
                  }`}
              >
                {t('menu.stack')}
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center gap-2 bg-white border rounded-full px-3 py-1 shadow-sm hover:shadow-md transition cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 w-5 h-5 text-gray-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 0 0-8.862 12.872M12.75 3.031a9 9 0 0 1 6.69 14.036m0 0-.177-.529A2.25 2.25 0 0 0 17.128 15H16.5l-.324-.324a1.453 1.453 0 0 0-2.328.377l-.036.073a1.586 1.586 0 0 1-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 0 1-5.276 3.67m0 0a9 9 0 0 1-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
                </svg>

                {locales.map((locale) => (
                  <button
                    key={locale}
                    onClick={() => handleChangeLanguage(locale)}
                    className={`px-2 py-1 text-sm rounded-full transition cursor-pointer ${currentLocale === locale
                      ? 'bg-(--base-color) text-white font-semibold'
                      : 'text-gray-600 hover:bg-gray-200'
                      }`}
                  >
                    {locale.toUpperCase()}
                  </button>
                ))}
              </div>
              <a
                className="hidden md:flex bg-(--base-color) hover:bg-(--hover-base-color) transition-colors text-white font-bold px-6 py-2 rounded-lg cursor-pointer"
                href='https://calendly.com/info-byteik/schedule-a-consultation'
                target='_blank'
              >
                {t('menu.letstalk')}
              </a>
            </div>
          </div>
        </div>
      </header>


      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-120 bg-[#17316dcc]/90 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-end">
              <button
                className='text-white font-bold'
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col items-center justify-center h-[80vh] space-y-8">
              <Link
                href="#home"
                className={`text-lg font-medium ${currentHash === '' || currentHash === '#home' ? 'text-(--base-color) font-bold' : 'text-white'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('menu.home')}
              </Link>
              <Link
                href="#whyus"
                className={`text-lg font-medium ${currentHash === '' || currentHash === '#whyus' ? 'text-(--base-color) font-bold' : 'text-white'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('menu.whyus')}
              </Link>
              <Link
                href="#portfolio"
                className={`text-lg font-medium ${currentHash === '' || currentHash === '#portfolio' ? 'text-(--base-color) font-bold' : 'text-white'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('menu.portfolio')}
              </Link>
              <Link
                href="#services"
                className={`text-lg font-medium ${currentHash === '' || currentHash === '#services' ? 'text-(--base-color) font-bold' : 'text-white'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('menu.solutions')}
              </Link>
              <Link
                href="#technologies"
                className={`text-lg font-medium ${currentHash === '' || currentHash === '#technologies' ? 'text-(--base-color) font-bold' : 'text-white'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('menu.stack')}
              </Link>
              <div className="flex items-center gap-2 bg-white border rounded-full px-3 py-1 shadow-sm hover:shadow-md transition cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 w-5 h-5 text-gray-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 0 0-8.862 12.872M12.75 3.031a9 9 0 0 1 6.69 14.036m0 0-.177-.529A2.25 2.25 0 0 0 17.128 15H16.5l-.324-.324a1.453 1.453 0 0 0-2.328.377l-.036.073a1.586 1.586 0 0 1-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 0 1-5.276 3.67m0 0a9 9 0 0 1-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
                </svg>

                {locales.map((locale) => (
                  <button
                    key={locale}
                    onClick={() => handleChangeLanguage(locale)}
                    className={`px-2 py-1 text-sm rounded-full transition cursor-pointer ${currentLocale === locale
                      ? 'bg-(--base-color) text-white font-semibold'
                      : 'text-gray-600 hover:bg-gray-200'
                      }`}
                  >
                    {locale.toUpperCase()}
                  </button>
                ))}
              </div>
            </nav>
          </div>
        </div>
      )}

      <main>
        <div className="bg-gradient-to-b from-[#FFF0D7] to-[#ffffff]">
          <section id="home" className="relative overflow-hidden pb-12 md:pb-[12rem]">
            {/* Background image behind all content */}
            <div className="hidden md:block absolute top-0 lg:top-auto lg:bottom-0 right-20 w-[60vw] md:w-[400px] lg:w-[500px] aspect-square bg-[url('/images/hero-pattern.svg')] bg-no-repeat bg-contain pointer-events-none z-0" />
            {/* Foreground content */}
            <div className="relative z-10 container mx-auto px-4 flex flex-col md:flex-row justify-between gap-8 pt-[70px] md:pt-[120px]">

              {/* Left side (text content) */}
              <div className="w-full lg:w-1/2 flex flex-col items-center md:items-start">
                <h1 className="text-center md:text-left text-2xl md:text-4xl w-sm md:w-md">
                  {t('hero.title1')}
                </h1>
                <h1 className="w-full lg:w-[80%] text-center md:text-left text-3xl md:text-5xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#FFAA18] to-[#ECD047]">
                  {t('hero.title2')}
                </h1>
                <p className="text-center md:text-left text-sm mb-6 w-full md:w-[68%]">
                  {t('hero.summarize')}
                </p>
                <a
                  className="bg-(--base-color) hover:bg-(--hover-base-color) transition-colors text-white font-bold px-6 py-2 rounded-lg cursor-pointer"
                  href='https://calendly.com/info-byteik/schedule-a-consultation'
                  target='_blank'
                >
                  {t('hero.schedule')}
                </a>
              </div>

              {/* Right side (video) */}
              <div className="w-full lg:w-1/2 ">
                <video
                  src="/video/bird-bug.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full sm:w-full md:w-[75%] max-w-[640px] rounded shadow-lg shadow-[#ffca6d]"
                >
                  <track kind="captions" />
                </video>
              </div>
            </div>
          </section>
        </div>
        <section id="whyus" className="scroll-mt-25">
          <div className='relative z-10 container mx-auto px-4 flex flex-col md:flex-row justify-between gap-8'>
            <div className="w-full md:w-1/2">
              <h1 className='text-center md:text-left text-xl font-bold w-full lg:w-[55%]'>
                {t('whyus.title1')}
              </h1>
              <div className='mt-6'>
                <h2 className='font-bold'>✅ {t('whyus.subtitle1')}</h2>
                <p className='mt-4 text-sm w-full md:w-[68%]'>
                  {t('whyus.summarize1')}
                </p>
                <h2 className='font-bold mt-12'>✅ {t('whyus.subtitle2')}</h2>
                <p className='mt-4 text-sm w-full md:w-[68%]'>
                  {t('whyus.summarize2')}
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <Image src="/images/workflow.svg" alt="how byteik works image" width={0} height={0} style={{ width: 'auto', height: 'auto' }} />
            </div>
          </div>
        </section>

        <section id="portfolio" className="scroll-mt-25">
          <div className='container mx-auto'>
            <div className='flex flex-col items-center w-full mt-16'>
              <h1 className='text-center font-bold text-xl'>{t('portofolio.title1')}</h1>
              <div className='w-16 h-2 bg-(--base-color) rounded-full'></div>
            </div>
            <div className="flex flex-wrap justify-center items-stretch items-center mt-12 gap-0 md:gap-16 w-full">
              <div className="w-full md:w-[40%] px-10 py-10 bg-[#EFFEF9] rounded-none md:rounded-lg flex flex-col justify-between gap-6">
                <div>
                  <h2 className='text-md font-medium'>{t('portofolio.portotitle1')}</h2>
                  <p className='text-sm mt-1 text-gray-500'>PT. Lapan Ecogreen Globalindo</p>
                  <p className='mt-6 text-sm text-gray-600'>{t('portofolio.porto1')}</p>
                </div>
                <Image src="/images/image-portofolio1.svg" alt="Image Portofolio ERP from Byteik" width={0} height={0} style={{ width: 'auto', height: 'auto' }} />
              </div>
              <div className="w-full md:w-[40%] px-10 py-10 bg-[#EFEFFE] rounded-none md:rounded-lg flex flex-col justify-between gap-6">
                <div>
                  <h2 className='text-md font-medium'>{t('portofolio.portotitle2')}</h2>
                  <p className='text-sm mt-1 text-gray-500'>Cucibayargo</p>
                  <p className='mt-6 text-sm text-gray-600'>{t('portofolio.porto2')}</p>
                </div>
                <Image src="/images/image-portofolio2.svg" alt="Image Portofolio Cashier Application from Byteik" width={0} height={0} style={{ width: 'auto', height: 'auto' }} />
              </div>
              <div className="w-full md:w-[40%] px-10 py-10 bg-[#EFF9FE] rounded-none md:rounded-lg flex flex-col justify-between gap-6">
                <div>
                  <h2 className='text-md font-medium'>{t('portofolio.portotitle3')}</h2>
                  <p className='text-sm mt-1 text-gray-500'>The Ritz Media Berlin</p>
                  <p className='mt-6 text-sm text-gray-600'>{t('portofolio.porto3')}</p>
                </div>
                <Image src="/images/image-portofolio3.svg" alt="Image Portofolio Landing Page from Byteik" width={0} height={0} style={{ width: 'auto', height: 'auto' }} />
              </div>
              <div className="w-full md:w-[40%] px-10 py-10 bg-[#EFFEF7] rounded-none md:rounded-lg flex flex-col justify-between gap-6">
                <div>
                  <h2 className='text-md font-medium'>{t('portofolio.portotitle4')}</h2>
                  <p className='text-sm mt-1 text-gray-500'>Hilink</p>
                  <p className='mt-6 text-sm text-gray-600'>{t('portofolio.porto4')}</p>
                </div>
                <Image src="/images/image-portofolio4.svg" alt="Image Portofolio Landing Page from Byteik" width={0} height={0} style={{ width: 'auto', height: 'auto' }} />
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="scroll-mt-25">
          <div className='container mx-auto relative flex flex-col items-center justify-center'>
            <div className='flex flex-col items-center w-full mt-16'>
              <h1 className='text-center font-bold text-xl'>{t('service.title1')}</h1>
              <div className='w-16 h-2 bg-(--base-color) rounded-full'></div>
            </div>
            <div className='mt-12 w-full md:w-[65%] flex flex-col gap-4 bg-(--soft-base-color) p-10 rounded-none md:rounded-lg'>
              <div>
                <h1 className='text-lg font-bold'>🧩 {t('service.serviceTitle1')}</h1>
                <p className='mt-2 text-sm text-gray-600'>{t('service.service1')}</p>
              </div>
              <div>
                <h1 className='text-lg font-bold'>💡 {t('service.serviceTitle2')}</h1>
                <p className='mt-2 text-sm text-gray-600'>{t('service.service2')}</p>
              </div>
              <div>
                <h1 className='text-lg font-bold'>📱 {t('service.serviceTitle3')}</h1>
                <p className='mt-2 text-sm text-gray-600'>{t('service.service3')}</p>
              </div>
              <div>
                <h1 className='text-lg font-bold'>🖥️ {t('service.serviceTitle4')}</h1>
                <p className='mt-2 text-sm text-gray-600'>{t('service.service4')}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="technologies" className="scroll-mt-25">
          <div className='container mx-auto relative flex flex-col items-center justify-center'>
            <div className='flex flex-col items-center w-full mt-16'>
              <h1 className='text-center font-bold text-xl'>{t('stack.title1')}</h1>
              <div className='w-16 h-2 bg-(--base-color) rounded-full'></div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-20 w-full md:max-w-[1000px] mx-auto mt-6">
            <div className="flex-shrink-0">
              <Image src="/images/react.svg" alt="React Js Logo Byteik" width={0} height={82} style={{ width: 'auto', height: '82px' }} />
            </div>
            <div className="flex-shrink-0">
              <Image src="/images/angular.svg" alt="Angular Js Logo Byteik" width={0} height={82} style={{ width: 'auto', height: '82px' }} />
            </div>
            <div className="flex-shrink-0">
              <Image src="/images/go.svg" alt="Golang Logo Byteik" width={0} height={82} style={{ width: 'auto', height: '82px' }} />
            </div>
            <div className="flex-shrink-0">
              <Image src="/images/node.svg" alt="Node Js Logo Byteik" width={0} height={82} style={{ width: 'auto', height: '82px' }} />
            </div>
            <div className="flex-shrink-0">
              <Image src="/images/flutter.svg" alt="Flutter Logo Byteik" width={0} height={82} style={{ width: 'auto', height: '82px' }} />
            </div>
            <div className="flex-shrink-0">
              <Image src="/images/aws.svg" alt="AWS Logo Byteik" width={0} height={82} style={{ width: 'auto', height: '82px' }} />
            </div>
            <div className="flex-shrink-0">
              <Image src="/images/gcp.svg" alt="GCP Logo Byteik" width={0} height={82} style={{ width: 'auto', height: '82px' }} />
            </div>
            <div className="flex-shrink-0">
              <Image src="/images/pgsql.svg" alt="PostgreSQL Logo Byteik" width={0} height={82} style={{ width: 'auto', height: '82px' }} />
            </div>
            <div className="flex-shrink-0">
              <Image src="/images/docker.svg" alt="Docker Logo Byteik" width={0} height={82} style={{ width: 'auto', height: '82px' }} />
            </div>
          </div>
          <h2 className='text-center font-bold text-lg mt-6'>
            {t('stack.title2')}🚀
          </h2>
        </section>

        <section id="cta">
          <div className='mx-auto relative flex flex-col items-center justify-center mt-12 bg-[#FFF0E1] py-12 px-10'>
            <h1 className='text-center font-bold text-xl'>{t('cta.title1')}</h1>
            <h1 className='text-center text-lg text-gray-600 mt-2'>{t('cta.summarize1')}</h1>
            <a
              className="mt-6 bg-(--base-color) hover:bg-(--hover-base-color) transition-colors text-white font-bold px-6 py-2 rounded-lg cursor-pointer"
              href='https://calendly.com/info-byteik/schedule-a-consultation'
              target='_blank'
            >
              {t('cta.schedule')}
            </a>
          </div>
        </section>

        <section id="contact-form" className="scroll-mt-25">
          <div className='container mx-auto relative flex flex-col items-center justify-center mt-12 px-10'>
            <h1 className='text-center font-bold text-xl'>{t('cta.form.title1')}</h1>
            <p className='text-sm text-gray-600 mt-2 mb-5'>{t('cta.form.summarize1')}</p>
            {/* Alert message */}
            {alert.message && (
              <div
                className={`mb-4 w-full max-w-lg text-center px-4 py-3 rounded ${alert.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
                role="alert"
              >
                {alert.message}
              </div>
            )}
            <div className='flex flex-col items-start w-auto'>
              <div className="mb-4 w-full md:w-lg">
                <div className="flex flex-col gap-1">
                  <label htmlFor="name" className="text-md">
                    {t('cta.form.field1')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="px-2 py-2 w-full text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 transition duration-100"
                    placeholder={t('cta.form.field1')}
                    autoComplete='off'
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
              </div>
              <div className="mb-4 w-full md:w-lg">
                <div className="flex flex-col gap-1">
                  <label htmlFor="email" className="text-md">
                    {t('cta.form.field2')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="px-2 py-2 w-full text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 transition duration-100"
                    placeholder="example@yourcompany.com"
                    autoComplete='off'
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="mb-4 w-full md:w-lg">
                <div className="flex flex-col gap-1">
                  <label htmlFor="messages" className="text-md">
                    {t('cta.form.field3')}
                  </label>
                  <textarea
                    id="messages"
                    className="px-2 py-2 w-full text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 transition duration-100 resize-none min-h-[100px]"
                    placeholder={t('cta.form.field3placeholder')}
                    autoComplete="off"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>
              </div>
              <p className='text-sm text-gray-500'>{t('cta.form.policy')} <a href="https://www.termsfeed.com/live/1c56bf5c-9073-4c40-94cc-e76500708b5b" target='_blank' className='text-blue-500 font-medium'>{t('cta.form.policyButton')}</a></p>
              <button
                className="mt-6 w-full py-2 bg-(--base-color) hover:bg-(--hover-base-color) transition-colors text-white font-bold rounded-lg cursor-pointer"
                onClick={handleSubmit}
                disabled={loading || !isFormValid}
              >
                {loading ? t('cta.form.sending') : t('cta.form.button')}
              </button>
            </div>
          </div>
        </section>

        <section id="footer" className='bg-[#FFF0E1]'>
          <div className='mx-auto container mt-12 px-10 md:px-0 py-10'>
            <div className='flex flex-col md:flex-row'>
              <div className='w-full md:w-1/2'>
                <Image
                  src="/images/logo.svg"
                  alt="Company Logo Byteik"
                  width={160}
                  height={41}
                  style={{ height: '41px', width: 'auto' }}
                />
                <p className='text-sm w-full md:w-[308px] mt-4'>{t('footer.summarize')}</p>
              </div>
              <div className='w-full md:w-1/2 flex gap-6 flex-col md:flex-row mt-10 md:mt-0'>
                <div className='w-full md:w-[35%]'>
                  <h1>{t('footer.service')}</h1>
                  <div className="flex flex-col gap-1 mt-4">
                    <a href="#services" className='text-sm text-gray-500'>{t('service.serviceTitle1')}</a>
                    <a href="#services" className='text-sm text-gray-500'>{t('service.serviceTitle2')}</a>
                    <a href="#services" className='text-sm text-gray-500'>{t('service.serviceTitle3')}</a>
                    <a href="#services" className='text-sm text-gray-500'>{t('service.serviceTitle4')}</a>
                  </div>
                </div>
                <div className='w-full md:w-[35%]'>
                  <h1>{t('footer.about')}</h1>
                  <div className="flex flex-col gap-1 mt-4">
                    <a href="#whyus" className='text-sm text-gray-500'>{t('footer.whyus')}</a>
                    <a href="#technologies" className='text-sm text-gray-500'>{t('footer.stack')}</a>
                  </div>
                </div>
                <div className='w-full md:w-[35%]'>
                  <h1>{t('footer.contact')}</h1>
                  <div className="flex flex-col gap-1 mt-4">
                    <div className='flex items-center gap-2'>
                      <Image
                        src="/images/ig.svg"
                        alt="Company Instagram Byteik"
                        width={15}
                        height={15}
                        style={{ height: '15px', width: 'auto' }}
                      />
                      <a href="https://www.instagram.com/byteik" className='text-sm text-gray-500'>@byteik</a>
                    </div>
                    {/* <div className='flex items-center gap-2'>
                      <Image
                        src="/images/linkedin.svg"
                        alt="Company Linkedin Byteik"
                        width={15}
                        height={15}
                        style={{ height: '15px', width: 'auto' }}
                      />
                      <a href="https://www.instagram.com/" className='text-sm text-gray-500'>Byteik Indonesia</a>
                    </div> */}
                    <div className='flex items-center gap-2'>
                      <Image
                        src="/images/email.svg"
                        alt="Company Email Byteik"
                        width={15}
                        height={15}
                        style={{ height: '15px', width: 'auto' }}
                      />
                      <a href="mailto:info.byteik@gmail.com" className="text-sm text-gray-500">info.byteik@gmail.com</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

