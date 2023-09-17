import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ExperienceComponent } from './experience/experience.component';
import { FeedbacksComponent } from './feedbacks/feedbacks.component';
import { HeroComponent } from './hero/hero.component';
import { NavbarComponent } from './navbar/navbar.component';
import { StarsCanvasComponent } from './stars-canvas/stars-canvas.component';
import { TechComponent } from './tech/tech.component';
import { WorksComponent } from './works/works.component';

export const TABLE_COMPONENTS = [
  AboutComponent,
  ContactComponent,
  ExperienceComponent,
  FeedbacksComponent,
  HeroComponent,
  NavbarComponent,
  TechComponent,
  WorksComponent,
  StarsCanvasComponent,
] as const;
