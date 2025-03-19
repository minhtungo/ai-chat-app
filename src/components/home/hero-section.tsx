import heroBackground from '@/assets/images/hero-background.svg';
import heroImage from '@/assets/images/hero-image.png';
import { BorderTrail } from '@/components/ui/border-trail';
import { buttonVariants } from '@/components/ui/button';
import { appConfig } from '@/config/app-config';
import { appRoutes } from '@/config/routes';
import { Link } from '@tanstack/react-router';

export function HeroSection() {
  return (
    <section className='relative overflow-hidden py-32'>
      <div className='absolute inset-x-0 top-0 flex h-full w-full items-center justify-center select-none dark:opacity-40'>
        <img
          src={heroBackground}
          className='[mask-image:radial-gradient(ellipse_at_center,white,transparent)]'
        />
      </div>
      <div className='relative z-10 container'>
        <div className='z-10 mx-auto flex max-w-4xl flex-col items-center gap-6 text-center'>
          <div>
            <h1 className='mb-4 text-3xl font-medium text-pretty lg:text-6xl'>
              Your AI-Powered Online Tutor
            </h1>
            <p className='text-muted-foreground mx-auto max-w-xl text-lg text-pretty'>
              {appConfig.appName} delivers real-time feedback on handwriting,
              whether on paper or iPad. Using voice or chat, {appConfig.appName}
              guides students instantly or on demand, making learning more
              interactive and personalized.
            </p>
          </div>
          <div className='flex w-full flex-col items-center justify-center gap-6 lg:flex-row'>
            <Link
              to={appRoutes.auth.signIn.path}
              className={buttonVariants({ size: 'lg' })}
            >
              Get Started
            </Link>
          </div>
        </div>
        <div className='relative mx-auto mt-16 max-h-[700px] w-full max-w-7xl rounded-md'>
          <img
            src={heroImage}
            alt='hero-image'
            className='border-border rounded-md border object-cover shadow-md'
          />
          <BorderTrail
            style={{
              boxShadow:
                '0px 0px 60px 30px rgb(255 255 255 / 50%), 0 0 100px 60px rgb(0 0 0 / 50%), 0 0 140px 90px rgb(0 0 0 / 50%)',
            }}
            size={100}
          />
        </div>
      </div>
    </section>
  );
}
