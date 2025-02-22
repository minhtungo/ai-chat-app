import { HeroSection } from '@/components/home/hero-section';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_public/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <HeroSection />;
}
