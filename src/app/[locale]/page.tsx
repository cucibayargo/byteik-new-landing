"use client";

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const t = useTranslations('HomePage');
  const router = useRouter();

  return (
    <div className="min-h-screen overflow-hidden bg-white">
      <header className="z-100 bg-[#fef1d7] fixed top-0 w-full">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <span className="font-bold text-xl">Byteik</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="#home"
                className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
              >
                {t('menu.home')}
              </Link>
              <Link
                href="#whyus"
                className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
              >
                {t('menu.whyus')}
              </Link>
              <Link
                href="#solution"
                className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
              >
                {t('menu.solutions')}
              </Link>
              <Link
                href="#contact"
                className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
              >
                {t('menu.contact')}
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <button
                className="hidden md:flex bg-(--base-color) hover:bg-(--hover-base-color) transition-colors text-white font-bold px-6 py-2 rounded-lg cursor-pointer"
                onClick={() => {
                  router.push("#contact");
                }}
              >
                {t('menu.letstalk')}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="bg-gradient-to-b from-[#FFF0D7] to-[#ffffff]">
          <section id="home" className="relative overflow-hidden pb-12 md:pb-[12rem]">
            {/* Background image behind all content */}
            <div className="hidden md:block absolute top-0 lg:top-auto lg:bottom-0 right-20 w-[60vw] md:w-[400px] lg:w-[500px] aspect-square bg-[url('/images/hero-pattern.svg')] bg-no-repeat bg-contain pointer-events-none z-0" />
            {/* Foreground content */}
            <div className="relative z-10 container mx-auto px-4 flex flex-col md:flex-row justify-between gap-8 pt-[70px] md:pt-[120px]">

              {/* Left side (text content) */}
              <div className="w-full lg:w-1/2 flex flex-col items-center md:items-start">
                <h1 className="text-center md:text-left text-3xl md:text-4xl w-md">
                  {t('hero.title1')}
                </h1>
                <h1 className="text-center md:text-left text-3xl md:text-5xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#FFAA18] to-[#ECD047]">
                  {t('hero.title2')}
                </h1>
                <p className="text-center md:text-left text-sm mb-6 w-full md:w-[68%]">
                  {t('hero.summarize')}
                </p>
                <button
                  className="bg-(--base-color) hover:bg-(--hover-base-color) transition-colors text-white font-bold px-6 py-2 rounded-lg cursor-pointer"
                  onClick={() => {
                    router.push("#contact");
                  }}
                >
                  {t('hero.schedule')}
                </button>
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
        <section id="whyus">
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
              <img src="/images/workflow.svg" alt="how-byteik-works-image" />
            </div>
          </div>
        </section>

        <section id="portfolio">
          <div className='container mx-auto'>
            <div className='flex flex-col items-center w-full mt-16'>
              <h1 className='text-center font-bold text-xl'>{t('portofolio.title1')}</h1>
              <div className='w-16 h-2 bg-(--base-color) rounded-full'></div>
            </div>
            <div className="flex flex-wrap justify-center items-stretch items-center mt-12 gap-0 md:gap-16 w-full">
              <div className="w-full md:w-[40%] px-10 py-10 bg-[#EFFEF9] rounded-lg flex flex-col justify-between">
                <div>
                  <h2 className='text-md font-medium'>{t('portofolio.portotitle1')}</h2>
                  <p className='text-sm mt-1 text-gray-500'>PT. Lapan Ecogreen Globalindo</p>
                  <p className='mt-6 text-sm text-gray-600'>{t('portofolio.porto1')}</p>
                </div>
                <img className="mt-6" src="/images/image-portofolio1.svg" alt="Image Portofolio ERP from Byteik" />
              </div>
              <div className="w-full md:w-[40%] px-10 py-10 bg-[#EFEFFE] rounded-lg flex flex-col justify-between">
                <div>
                  <h2 className='text-md font-medium'>{t('portofolio.portotitle2')}</h2>
                  <p className='text-sm mt-1 text-gray-500'>Cucibayargo</p>
                  <p className='mt-6 text-sm text-gray-600'>{t('portofolio.porto2')}</p>
                </div>
                <img className="mt-6" src="/images/image-portofolio2.svg" alt="Image Portofolio Cashier Application from Byteik" />
              </div>
              <div className="w-full md:w-[40%] px-10 py-10 bg-[#EFF9FE] rounded-lg flex flex-col justify-between">
                <div>
                  <h2 className='text-md font-medium'>{t('portofolio.portotitle3')}</h2>
                  <p className='text-sm mt-1 text-gray-500'>The Ritz Media Berlin</p>
                  <p className='mt-6 text-sm text-gray-600'>{t('portofolio.porto3')}</p>
                </div>
                <img className="mt-6" src="/images/image-portofolio3.svg" alt="Image Portofolio Landing Page from Byteik" />
              </div>
              <div className="w-full md:w-[40%] px-10 py-10 bg-[#EFFEF7] rounded-lg flex flex-col justify-between">
                <div>
                  <h2 className='text-md font-medium'>{t('portofolio.portotitle4')}</h2>
                  <p className='text-sm mt-1 text-gray-500'>Hilink</p>
                  <p className='mt-6 text-sm text-gray-600'>{t('portofolio.porto4')}</p>
                </div>
                <img className="mt-6" src="/images/image-portofolio4.svg" alt="Image Portofolio Landing Page from Byteik" />
              </div>
            </div>
          </div>
        </section>


        <section id="portfolio">
          <div className='container mx-auto relative flex flex-col items-center justify-center'>
            <div className='flex flex-col items-center w-full mt-16'>
              <h1 className='text-center font-bold text-xl'>{t('service.title1')}</h1>
              <div className='w-16 h-2 bg-(--base-color) rounded-full'></div>
            </div>
            <div className='mt-12 w-full md:w-[80%] flex flex-col gap-4 bg-(--soft-base-color) p-10 rounded-lg'>
              <div>
                <h1 className='text-lg font-bold'>🧩 System Development</h1>
                <p className='mt-2 text-sm text-gray-600'>{t('service.service1')}</p>
              </div>
              <div>
                <h1 className='text-lg font-bold'>💡 Digital Transformation Solutions</h1>
                <p className='mt-2 text-sm text-gray-600'>{t('service.service2')}</p>
              </div>
              <div>
                <h1 className='text-lg font-bold'>📱 Web & Mobile App Development</h1>
                <p className='mt-2 text-sm text-gray-600'>{t('service.service3')}</p>
              </div>
              <div>
                <h1 className='text-lg font-bold'>🖥️ Landing Page Design & Development</h1>
                <p className='mt-2 text-sm text-gray-600'>{t('service.service4')}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="technologies">
          <div className='container mx-auto relative flex flex-col items-center justify-center'>
            <div className='flex flex-col items-center w-full mt-16'>
              <h1 className='text-center font-bold text-xl'>{t('stack.title1')}</h1>
              <div className='w-16 h-2 bg-(--base-color) rounded-full'></div>
            </div>
          </div>
        </section> 
      </main>
    </div>
  );
}