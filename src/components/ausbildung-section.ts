import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ListCategory {
  id: string;
  title: string;
  description: string;
}

interface SectorCard {
  id: string;
  title: string;
  imageUrl: string;
}

@Component({
  selector: 'app-ausbildung-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="font-main bg-[#fafafa] py-16 lg:py-24">
      <div class="max-w-[1584px] mx-auto px-6 lg:px-12 xl:px-16 2xl:px-20">

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

          <!-- Left Accordion Content -->
          <div class="lg:col-span-4 flex flex-col">

            <p class="text-[12px] font-bold uppercase tracking-[0.22em] text-[#0f62fe] mb-4">
              Ausbildung Germany
            </p>

            <h2 class="text-[34px] lg:text-[44px] font-bold text-[#161616] mb-6 tracking-[-0.04em] leading-tight">
              Build your career through paid vocational training in Germany
            </h2>

            <p class="text-[15px] text-[#525252] leading-relaxed mb-8">
              Explore sector-wise Ausbildung pathways, eligibility, German language readiness, employer expectations, training contract preparation and long-term career outcomes.
            </p>

            <div class="flex flex-col mb-6">
              @for (category of categories; track category.id) {
                <div
                  (click)="setActive(category.id)"
                  class="group cursor-pointer transition-all duration-300"
                  [class.py-4]="activeCategoryId !== category.id"
                  [class.py-5]="activeCategoryId === category.id"
                  [class.border-b]="activeCategoryId !== category.id"
                  [class.border-[#b8cdfc]]="activeCategoryId !== category.id"
                >

                  <div
                    class="transition-all duration-300"
                    [class.border-l-4]="activeCategoryId === category.id"
                    [class.border-[#0f62fe]]="activeCategoryId === category.id"
                    [class.pl-5]="activeCategoryId === category.id"
                  >

                    <h3
                      class="text-[17px] transition-colors"
                      [class.font-bold]="activeCategoryId === category.id"
                      [class.text-[#161616]]="activeCategoryId === category.id"
                      [class.font-semibold]="activeCategoryId !== category.id"
                      [class.text-[#161616]]="activeCategoryId !== category.id"
                      [class.group-hover:text-[#0f62fe]]="activeCategoryId !== category.id"
                    >
                      {{ category.title }}
                    </h3>

                    <div
                      class="overflow-hidden transition-all duration-300 ease-in-out"
                      [style.maxHeight]="activeCategoryId === category.id ? '260px' : '0px'"
                      [style.opacity]="activeCategoryId === category.id ? '1' : '0'"
                    >
                      <p class="text-[15px] text-[#393939] mt-5 leading-relaxed border-b border-[#b8cdfc] pb-6">
                        {{ category.description }}
                      </p>
                    </div>
                  </div>
                </div>
              }
            </div>

            <div class="mt-auto flex justify-end lg:justify-between items-center border-b border-[#b8cdfc] pb-2">
              <span class="hidden lg:inline-block"></span>

              <a href="#" class="text-[13px] font-medium text-[#161616] hover:text-[#0f62fe] flex items-center gap-1.5 transition-colors group">
                View all Ausbildung sectors
                <svg class="w-4 h-4 text-[#0f62fe] transform group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>

          </div>

          <!-- Right Image Cards Grid -->
          <div class="lg:col-span-8">
            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">

              @for (card of sectorCards.slice(0, 6); track card.id) {
                <article class="ausbildung-card group">

                  <img
                    [src]="card.imageUrl"
                    [alt]="card.title"
                    class="w-full h-full object-contain object-center transition-transform duration-700 group-hover:scale-[1.02]"
                    loading="lazy"
                  />

                </article>
              }

            </div>
          </div>

        </div>
      </div>
    </section>
  `,
  styles: [`
    .font-main {
      font-family: 'Poppins', Helvetica, Arial, sans-serif;
    }

    .ausbildung-card {
      position: relative;
      height: 360px;
      background: #ffffff;
      border: 1px solid #e0e7f5;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 14px rgba(15, 98, 254, 0.08);
      transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .ausbildung-card:hover {
      transform: translateY(-3px);
      border-color: #78a9ff;
      box-shadow: 0 10px 28px rgba(15, 98, 254, 0.16);
    }

    @media (max-width: 640px) {
      .ausbildung-card {
        height: 340px;
      }
    }
  `]
})
export class AusbildungSectionComponent {

  activeCategoryId = 'ausbildung-4';

  setActive(id: string) {
    this.activeCategoryId = id;
  }

  categories: ListCategory[] = [
    {
      id: 'ausbildung-1',
      title: 'What is Ausbildung?',
      description: 'Ausbildung is Germany’s structured vocational training pathway where candidates learn through classroom training and employer-based practical work. It is suitable for students and young professionals who want an employment-linked career route instead of a purely academic university pathway.'
    },
    {
      id: 'ausbildung-2',
      title: 'Eligibility & German Readiness',
      description: 'Check your qualification, age, academic background, German language level, passport status, documentation readiness and sector fit before choosing the right Ausbildung program.'
    },
    {
      id: 'ausbildung-3',
      title: 'Sector Selection',
      description: 'Choose the right sector based on your aptitude, language comfort, work environment preference, long-term career goals, salary expectations and employer demand in Germany.'
    },
    {
      id: 'ausbildung-4',
      title: 'Training to Placement Journey',
      description: 'The journey includes counselling, German language training, profile preparation, employer interview readiness, document processing, training contract support, visa guidance and pre-departure preparation.'
    },
    {
      id: 'ausbildung-5',
      title: 'Cost, Timeline & Career Outcome',
      description: 'Understand the complete timeline from German language preparation to employer interview, visa processing, travel, onboarding in Germany, training stipend, career progression and long-term settlement possibilities.'
    }
  ];

  sectorCards: SectorCard[] = [
    {
      id: 'sector-1',
      title: 'Healthcare / Nursing',
      imageUrl: '/assets/Aus8.webp'
    },
    {
      id: 'sector-2',
      title: 'IT & Software',
      imageUrl: '/assets/Aus8.webp'
    },
    {
      id: 'sector-3',
      title: 'Hotel & Hospitality',
      imageUrl: '/assets/Aus8.webp'
    },
    {
      id: 'sector-4',
      title: 'Retail & Sales',
      imageUrl: '/assets/Aus8.webp'
    },
    {
      id: 'sector-5',
      title: 'Culinary / Chef',
      imageUrl: '/assets/Aus8.webp'
    },
    {
      id: 'sector-6',
      title: 'Logistics / Warehouse',
      imageUrl: '/assets/Aus8.webp'
    }
  ];
}