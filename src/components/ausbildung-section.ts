import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ListCategory {
  id: string;
  title: string;
  description: string;
}

interface SectorCard {
  id: string;
  number: string;
  title: string;
  description: string;
  imageUrl: string;
  icon: string;
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

            <h2 class="text-[34px] lg:text-[44px] font-bold text-[#161616] mb-10 tracking-[-0.04em]">
              Ausbildung
            </h2>

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
                      [style.maxHeight]="activeCategoryId === category.id ? '220px' : '0px'"
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
                View all
                <svg class="w-4 h-4 text-[#0f62fe] transform group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>

          </div>

          <!-- Right Cards Grid: 2 Rows × 3 Columns -->
          <div class="lg:col-span-8">
            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">

              @for (card of sectorCards.slice(0, 6); track card.id) {
                <article class="ausbildung-card group">

                  <!-- Left Image -->
                  <div class="card-image-wrap">
                    <img
                      [src]="card.imageUrl"
                      [alt]="card.title"
                      class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  <!-- Right Content -->
                  <div class="card-content">

                    <!-- Dot Pattern -->
                    <div class="dot-pattern"></div>

                    <!-- Number -->
                    <div class="number-badge">
                      {{ card.number }}
                    </div>

                    <!-- Title -->
                    <h4 class="card-title">
                      {{ card.title }}
                    </h4>

                    <!-- Description -->
                    <p class="card-description">
                      {{ card.description }}
                    </p>

                    <!-- Icon -->
                    <div class="card-icon">
                      <span>{{ card.icon }}</span>
                    </div>

                    <!-- Soft Bottom Shape -->
                    <div class="bottom-curve"></div>

                  </div>

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
      min-height: 174px;
      background: #ffffff;
      border: 1px solid #e0e7f5;
      border-radius: 4px;
      overflow: hidden;
      display: grid;
      grid-template-columns: 56% 44%;
      box-shadow: 0 4px 14px rgba(15, 98, 254, 0.08);
      transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
    }

    .ausbildung-card:hover {
      transform: translateY(-3px);
      border-color: #78a9ff;
      box-shadow: 0 10px 28px rgba(15, 98, 254, 0.16);
    }

    .card-image-wrap {
      height: 100%;
      min-height: 174px;
      overflow: hidden;
      background: #e8eef9;
    }

    .card-content {
      position: relative;
      min-height: 174px;
      padding: 24px 16px 16px 16px;
      background: #ffffff;
      overflow: hidden;
    }

    .number-badge {
      position: relative;
      z-index: 3;
      width: 24px;
      height: 24px;
      border-radius: 3px;
      background: #003b8f;
      color: #ffffff;
      font-size: 11px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 12px;
    }

    .card-title {
      position: relative;
      z-index: 3;
      color: #003b8f;
      font-size: 14px;
      font-weight: 700;
      line-height: 1.12;
      margin-bottom: 10px;
    }

    .card-description {
      position: relative;
      z-index: 3;
      max-width: 115px;
      color: #161616;
      font-size: 8.5px;
      line-height: 1.35;
      font-weight: 400;
    }

    .card-icon {
      position: absolute;
      z-index: 4;
      left: 16px;
      bottom: 16px;
      width: 26px;
      height: 26px;
      border-radius: 999px;
      background: #003b8f;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 700;
      box-shadow: 0 5px 12px rgba(0, 59, 143, 0.22);
    }

    .bottom-curve {
      position: absolute;
      right: -42px;
      bottom: -54px;
      width: 142px;
      height: 142px;
      border-radius: 999px;
      background: #e8f0ff;
      z-index: 1;
    }

    .bottom-curve::after {
      content: '';
      position: absolute;
      left: 22px;
      top: 22px;
      width: 98px;
      height: 98px;
      border-radius: 999px;
      border: 16px solid #d8e6ff;
      opacity: 0.8;
    }

    .dot-pattern {
      position: absolute;
      top: 14px;
      right: 12px;
      width: 34px;
      height: 34px;
      opacity: 0.5;
      background-image: radial-gradient(#78a9ff 1px, transparent 1px);
      background-size: 6px 6px;
      z-index: 2;
    }

    @media (max-width: 640px) {
      .ausbildung-card {
        grid-template-columns: 52% 48%;
      }

      .card-content {
        padding: 20px 14px 14px;
      }

      .card-title {
        font-size: 13px;
      }
    }
  `]
})
export class AusbildungSectionComponent {

  activeCategoryId = 'tools-4';

  setActive(id: string) {
    this.activeCategoryId = id;
  }

  categories: ListCategory[] = [
    {
      id: 'tools-1',
      title: 'All Tools Lists',
      description: 'Explore various tools and resources available for your career journey.'
    },
    {
      id: 'tools-2',
      title: 'All Tools Lists',
      description: 'Find the right matching programs based on your qualifications.'
    },
    {
      id: 'tools-3',
      title: 'All Tools Lists',
      description: 'Discover training programs to enhance your language skills.'
    },
    {
      id: 'tools-4',
      title: 'All Tools Lists',
      description: 'Explore Ausbildung programs, international jobs, study abroad options, German training and guided career support based on your country'
    },
    {
      id: 'tools-5',
      title: 'All Tools Lists',
      description: 'Access visa preparation guides and settlement checklists.'
    }
  ];

  sectorCards: SectorCard[] = [
    {
      id: 'sector-1',
      number: '01',
      title: 'Healthcare / Nursing',
      description: 'Care for people. Build a meaningful career in healthcare and nursing.',
      imageUrl: 'https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg?auto=compress&cs=tinysrgb&w=900',
      icon: '♡'
    },
    {
      id: 'sector-2',
      number: '02',
      title: 'IT & Software',
      description: 'Code the future. Start your Ausbildung in IT and software development.',
      imageUrl: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=900',
      icon: '💻'
    },
    {
      id: 'sector-3',
      number: '03',
      title: 'Hotel & Hospitality',
      description: 'Work with guests. Build a global hospitality career pathway.',
      imageUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=900',
      icon: '⌂'
    },
    {
      id: 'sector-4',
      number: '04',
      title: 'Retail & Sales',
      description: 'Connect with people. Develop sales and service skills in retail.',
      imageUrl: 'https://images.pexels.com/photos/6169668/pexels-photo-6169668.jpeg?auto=compress&cs=tinysrgb&w=900',
      icon: '🛒'
    },
    {
      id: 'sector-5',
      number: '05',
      title: 'Culinary / Chef',
      description: 'Passion in the kitchen. Create, inspire and build your culinary career.',
      imageUrl: 'https://images.pexels.com/photos/4253312/pexels-photo-4253312.jpeg?auto=compress&cs=tinysrgb&w=900',
      icon: '♨'
    },
    {
      id: 'sector-6',
      number: '06',
      title: 'Logistics / Warehouse',
      description: 'Move the world. Learn supply chain, logistics and warehouse operations.',
      imageUrl: 'https://images.pexels.com/photos/6169056/pexels-photo-6169056.jpeg?auto=compress&cs=tinysrgb&w=900',
      icon: '↔'
    }
  ];
}