import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface MagazineArticle {
  id: string;
  image: string;
  date: string;
  tag: string;
  title: string;
  readTime: string;
}

@Component({
  selector: 'app-upcoming-events',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="font-main bg-white overflow-hidden">

      <!-- Resources Section - Updated Design -->
      <div class="max-w-[1584px] mx-auto bg-white">

        <!-- Heading Bar -->
        <div class="px-6 lg:px-14 pt-10 pb-7 border-b border-[#e5e5e5]">
          <h2 class="text-[30px] lg:text-[34px] font-bold text-[#161616] tracking-[-0.03em]">
            Resources
          </h2>
        </div>

        <!-- Grey Content Area -->
        <div class="bg-[#f2f2f0] px-6 lg:px-14 pt-6 pb-12 relative">

          <!-- Top Row -->
          <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5 mb-7">

            <p class="text-[#161616] text-[16px] lg:text-[17px] font-normal">
              A dedicated space for our latest news
            </p>

            <div class="flex w-full lg:w-auto">
              <button class="resource-tab active-tab">
                Blogs
              </button>
              <button class="resource-tab">
                Insights
              </button>
              <button class="resource-tab">
                Insights
              </button>
            </div>

          </div>

          <!-- Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10">

            @for (article of articles; track article.id) {
              <article class="bg-white rounded-[8px] overflow-hidden flex flex-col shadow-sm border border-[#e8e8e8] hover:shadow-md transition-shadow group cursor-pointer">

                <!-- Image -->
                <div class="h-[175px] overflow-hidden">
                  <img
                    [src]="article.image"
                    [alt]="article.title"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <!-- Content -->
                <div class="px-4 pt-3 pb-4 flex flex-col flex-1">

                  <div class="flex justify-between items-center mb-2">
                    <span class="text-[10px] text-[#525252] font-medium">
                      {{ article.date }}
                    </span>

                    <span class="text-[9px] font-semibold text-[#525252] bg-[#f4f4f4] border border-[#e0e0e0] px-2 py-0.5 rounded-full">
                      {{ article.tag }}
                    </span>
                  </div>

                  <h3 class="text-[11px] lg:text-[12px] font-extrabold text-[#161616] uppercase leading-[1.35] mb-4 min-h-[48px]">
                    {{ article.title }}
                  </h3>

                  <div class="flex-1"></div>

                  <div class="flex justify-between items-center mt-auto">

                    <div class="flex items-center text-[#393939] gap-1.5">
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>

                      <span class="text-[10px] font-semibold">
                        {{ article.readTime }}
                      </span>
                    </div>

                    <button class="flex items-center gap-1 text-[#6ab344] font-semibold text-[10px] group-hover:text-[#4f9130] transition-colors">
                      Read more
                      <svg class="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </button>

                  </div>
                </div>

              </article>
            }

          </div>

        </div>
      </div>

      <!-- Bottom Section - Unchanged -->
      <div class="max-w-[1584px] mx-auto px-6 lg:px-8 xl:px-16 2xl:px-20 pt-16 pb-20 bg-[#f4f5f4]">
        <div class="relative w-full h-[200px] md:h-[300px] flex items-center overflow-hidden">

          <div class="absolute left-0 z-20">
            <h1 class="text-[80px] md:text-[140px] font-black text-black leading-none tracking-tighter">
              2026
            </h1>
          </div>

          <div class="absolute left-0 md:left-[20%] right-0 h-full flex">
            <div class="w-1/4 h-full relative">
              <div class="absolute inset-0 bg-[#f4f5f4]/80 z-10"></div>
              <img src="https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=400" class="w-full h-full object-cover" alt="Collage 1">
            </div>

            <div class="w-1/4 h-full border-l-[4px] border-[#f4f5f4] relative z-10 shadow-xl">
              <img src="https://images.pexels.com/photos/2598638/pexels-photo-2598638.jpeg?auto=compress&cs=tinysrgb&w=400" class="w-full h-full object-cover" alt="Collage 2">
            </div>

            <div class="w-1/4 h-full border-l-[4px] border-[#f4f5f4]">
              <img src="https://images.pexels.com/photos/3861458/pexels-photo-3861458.jpeg?auto=compress&cs=tinysrgb&w=400" class="w-full h-full object-cover" alt="Collage 3">
            </div>

            <div class="w-1/4 h-full border-l-[4px] border-[#f4f5f4]">
              <img src="https://images.pexels.com/photos/3760072/pexels-photo-3760072.jpeg?auto=compress&cs=tinysrgb&w=400" class="w-full h-full object-cover" alt="Collage 4">
            </div>
          </div>
        </div>
      </div>

    </section>
  `,
  styles: [`
    .font-main {
      font-family: 'Roboto', Helvetica, Arial, sans-serif;
    }

    .resource-tab {
      min-width: 120px;
      height: 34px;
      padding: 0 24px;
      background: #0f62fe;
      color: #ffffff;
      font-size: 11px;
      font-weight: 600;
      border-right: 1px solid rgba(255, 255, 255, 0.65);
      transition: background 0.2s ease;
    }

    .resource-tab:last-child {
      border-right: 0;
    }

    .resource-tab:hover {
      background: #0043ce;
    }

    .active-tab {
      background: #0f62fe;
    }

    @media (max-width: 768px) {
      .resource-tab {
        flex: 1;
        min-width: auto;
        padding: 0 12px;
      }
    }
  `]
})
export class UpcomingEventsComponent {

  articles: MagazineArticle[] = [
    {
      id: '1',
      image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600',
      date: '19.09.2025',
      tag: 'News',
      title: 'LEITWIND AT HUSUM WIND FOR THE FIRST TIME - AWARDED NEW GRID CONNECTION CERTIFICATION',
      readTime: '2 Minutes'
    },
    {
      id: '2',
      image: 'https://images.pexels.com/photos/848683/pexels-photo-848683.jpeg?auto=compress&cs=tinysrgb&w=600',
      date: '25.08.2025',
      tag: 'News',
      title: 'WIND POWER IN SKI RESORTS, THE SUSTAINABLE ANSWER OF THE HTI GROUP',
      readTime: '2 Minutes'
    },
    {
      id: '3',
      image: 'https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=600',
      date: '09.04.2025',
      tag: 'News',
      title: 'HTI GROUP, REVENUE OF 1.4 BILLION EUROS FOR 2024. INVESTMENTS AND EMPLOYEES GROW.',
      readTime: '5 Minutes'
    }
  ];
}