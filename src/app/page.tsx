import { Hero } from '@/components/sections/Hero';
import { Skills } from '@/components/sections/Skills';
import { ExperienceLine } from '@/components/sections/ExperienceLine';
import { Milestones } from '@/components/sections/Milestones';
import { ProjectGrid } from '@/components/sections/ProjectGrid';
import { Contact } from '@/components/sections/Contact';
import { CodingProfiles } from '@/components/sections/CodingProfiles';

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <Hero />
      <ExperienceLine />
      <Skills />
      <CodingProfiles />
      <Milestones />
      <ProjectGrid />
      <Contact />
    </main>
  );
}
