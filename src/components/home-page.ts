import { Component } from '@angular/core';
import { Nav } from './navbar';
import { HeroComponent } from './hero';
import { TrustedLogosComponent } from './logosection';
import { HomeShowcaseComponent } from './2cardssection'; 
import { AusbildungSectionComponent } from './ausbildung-section'; 
import { CountrySearchComponent } from './Country-search'; 
import { ToolsSectionComponent } from './Tools-section'; 
// import { IndustriesSectionComponent } from './By-industries';
import { StudyProgramsComponent } from './Whychooseourprogram'; 
import { StudyDestinationComponent } from './Choose your Study Destination'; 
import { GermanTrainingComponent } from './german-training'; 
import { SuccessStoriesComponent } from './Sucess-stories'; 
import { PartnerLogoSectionComponent } from './Partners';
import { UpcomingEventsComponent } from './UpcomingEvents'; 
import { ContactMapComponent } from './Contactmap'; 
import { FooterComponent } from './Footer';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    Nav,
    HeroComponent,
    HomeShowcaseComponent,
    AusbildungSectionComponent,
    CountrySearchComponent,
    TrustedLogosComponent,
    ToolsSectionComponent,
    // IndustriesSectionComponent,
    StudyProgramsComponent,
    StudyDestinationComponent,
    GermanTrainingComponent,
    SuccessStoriesComponent,
    PartnerLogoSectionComponent,
    UpcomingEventsComponent,
    ContactMapComponent,
    FooterComponent
  ],
  template: `
    <app-nav></app-nav>
    <app-hero></app-hero>

    <app-home-showcase></app-home-showcase> 
    <app-ausbildung-section></app-ausbildung-section>
    <app-country-search></app-country-search>
    <app-tools-section></app-tools-section>
    <app-trusted-logos></app-trusted-logos>
    <app-study-programs></app-study-programs>
    <app-study-destination></app-study-destination>
    <app-german-training></app-german-training>
    <app-success-stories></app-success-stories>
    <app-upcoming-events></app-upcoming-events>
    <app-partner-logo-section></app-partner-logo-section>
    <app-contact-map></app-contact-map>

    <app-footer></app-footer>
  `
})
export class HomePageComponent {}