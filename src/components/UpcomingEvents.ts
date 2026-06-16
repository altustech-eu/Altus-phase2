import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type ResourceTab = 'blogs' | 'insights' | 'events';

interface MagazineArticle {
  id: string;
  image: string;
  date: string;
  tag: string;
  title: string;
  readTime: string;
}

interface GalleryPerson {
  id: string;
  image: string;
  top: string;
  left: string;
  width: string;
  height: string;
  delay: string;
}

@Component({
  selector: 'app-upcoming-events',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="font-main bg-white overflow-hidden">

      <!-- Resources Section -->
      <div class="max-w-[1584px] mx-auto bg-white">

        <!-- Heading Bar -->
        <div class="px-6 lg:px-14 pt-10 pb-7 border-b border-[#e0e0e0]">
          <h2 class="text-[30px] lg:text-[34px] font-bold text-[#161616] tracking-[-0.03em]">
            Resources
          </h2>
        </div>

        <!-- Grey Content Area -->
        <div class="bg-[#f4f4f4] px-6 lg:px-14 pt-6 pb-12 relative">

          <!-- Top Row -->
          <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5 mb-7">

            <p class="text-[#161616] text-[16px] lg:text-[17px] font-normal">
              A dedicated space for our latest news, insights, and events
            </p>

            <div class="flex w-full lg:w-auto border border-[#0f62fe]">
              <button
                type="button"
                class="resource-tab"
                [class.active-tab]="activeTab === 'blogs'"
                (click)="setActiveTab('blogs')"
              >
                Blogs
              </button>

              <button
                type="button"
                class="resource-tab"
                [class.active-tab]="activeTab === 'insights'"
                (click)="setActiveTab('insights')"
              >
                Insights
              </button>

              <button
                type="button"
                class="resource-tab"
                [class.active-tab]="activeTab === 'events'"
                (click)="setActiveTab('events')"
              >
                Events
              </button>
            </div>

          </div>

          <!-- Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10">

            @for (article of activeArticles; track article.id) {
              <article class="bg-white overflow-hidden flex flex-col shadow-sm border border-[#e0e0e0] hover:shadow-md transition-shadow group cursor-pointer">

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

                    <span class="text-[9px] font-semibold text-[#0f62fe] bg-[#edf5ff] border border-[#d0e2ff] px-2 py-0.5">
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

                    <button class="flex items-center gap-1 text-[#0f62fe] font-semibold text-[10px] group-hover:text-[#0043ce] transition-colors">
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

      <!-- Testimonial / 2026 Gallery Section -->
      <div class="max-w-[1584px] mx-auto bg-[#f4f4f4] px-6 lg:px-14 pt-14 pb-20">

        <div class="relative w-full min-h-[540px] md:min-h-[590px] bg-white overflow-hidden border border-[#e0e0e0] shadow-[0_18px_50px_rgba(15,23,42,0.10)]">

          <!-- Background vertical guide lines -->
          <div class="absolute inset-0 opacity-[0.55] pointer-events-none">
            <div class="absolute top-0 bottom-0 left-[12%] border-l border-[#e0e0e0]"></div>
            <div class="absolute top-0 bottom-0 left-[23%] border-l border-[#e0e0e0]"></div>
            <div class="absolute top-0 bottom-0 left-[35%] border-l border-[#e0e0e0]"></div>
            <div class="absolute top-0 bottom-0 left-[48%] border-l border-[#e0e0e0]"></div>
            <div class="absolute top-0 bottom-0 left-[61%] border-l border-[#e0e0e0]"></div>
            <div class="absolute top-0 bottom-0 left-[74%] border-l border-[#e0e0e0]"></div>
            <div class="absolute top-0 bottom-0 left-[87%] border-l border-[#e0e0e0]"></div>
          </div>

          <!-- Hanging Gallery -->
          @for (person of galleryPeople; track person.id) {
            <div
              class="floating-card absolute z-20 hidden md:block"
              [style.top]="person.top"
              [style.left]="person.left"
              [style.width]="person.width"
              [style.height]="person.height"
              [style.animationDelay]="person.delay"
            >
              <div class="absolute -top-[70px] left-1/2 -translate-x-1/2 w-px h-[70px] bg-[#e0e0e0]"></div>

              <div class="w-full h-full bg-white border border-[#e0e0e0] shadow-[0_14px_35px_rgba(15,23,42,0.14)] p-1">
                <img
                  [src]="person.image"
                  alt="Professional testimonial"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
          }

          <!-- Central Content -->
          <div class="absolute inset-0 z-30 flex items-center justify-center px-6">
            <div class="text-center max-w-[620px] mt-20 md:mt-28">

              <div class="inline-flex items-center px-3 py-1 bg-[#f4f4f4] border border-[#e0e0e0] text-[10px] font-semibold text-[#393939] mb-5">
                Testimonials
              </div>

              <h2 class="text-[36px] md:text-[48px] lg:text-[56px] leading-[1.02] tracking-[-0.055em] font-extrabold text-[#161616]">
                Trusted by leaders
                <span class="block text-[#6f6f6f]">
                  from various industries
                </span>
              </h2>

              <p class="mt-5 text-[14px] md:text-[16px] leading-relaxed text-[#393939] max-w-[430px] mx-auto">
                Learn why professionals trust our solutions to complete their customer journeys.
              </p>

              <button class="mt-8 inline-flex items-center gap-2 h-[38px] px-5 bg-[#161616] text-white text-[12px] font-semibold hover:bg-[#0f62fe] transition-colors">
                Read Success Stories
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </button>

            </div>
          </div>

          <!-- Mobile fallback image strip -->
          <div class="md:hidden absolute top-6 left-0 right-0 z-20 px-5">
            <div class="grid grid-cols-4 gap-2">
              @for (person of mobileGalleryPeople; track person.id) {
                <div class="h-[82px] bg-white border border-[#e0e0e0] p-1 shadow-sm">
                  <img
                    [src]="person.image"
                    alt="Professional testimonial"
                    class="w-full h-full object-cover"
                  />
                </div>
              }
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
      background: #ffffff;
      color: #0f62fe;
      font-size: 11px;
      font-weight: 700;
      border-right: 1px solid #0f62fe;
      transition: background 0.2s ease, color 0.2s ease;
    }

    .resource-tab:last-child {
      border-right: 0;
    }

    .resource-tab:hover {
      background: #edf5ff;
      color: #0043ce;
    }

    .active-tab {
      background: #0f62fe !important;
      color: #ffffff !important;
    }

    .floating-card {
      animation: floatCard 4.5s ease-in-out infinite;
    }

    @keyframes floatCard {
      0%, 100% {
        transform: translateY(0);
      }

      50% {
        transform: translateY(-8px);
      }
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

  activeTab: ResourceTab = 'blogs';

  resourceData: Record<ResourceTab, MagazineArticle[]> = {
    blogs: [
      {
        id: 'blog-1',
        image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600',
        date: '19.09.2025',
        tag: 'Blog',
        title: 'HOW INTERNATIONAL CAREER PATHWAYS ARE CHANGING THE FUTURE OF GLOBAL MOBILITY',
        readTime: '4 Minutes'
      },
      {
        id: 'blog-2',
        image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600',
        date: '25.08.2025',
        tag: 'Blog',
        title: 'WHY STUDENTS SHOULD COMPARE STUDY, WORK, AND AUSBILDUNG BEFORE DECIDING',
        readTime: '3 Minutes'
      },
      {
        id: 'blog-3',
        image: 'https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=600',
        date: '09.04.2025',
        tag: 'Blog',
        title: 'BUILDING A RATIONAL CAREER DECISION JOURNEY FOR STUDENTS AND PARENTS',
        readTime: '5 Minutes'
      }
    ],

    insights: [
      {
        id: 'insight-1',
        image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
        date: '12.10.2025',
        tag: 'Insight',
        title: 'GERMANY TALENT DEMAND: HEALTHCARE, LOGISTICS, HOSPITALITY, AND TECH SECTOR OUTLOOK',
        readTime: '6 Minutes'
      },
      {
        id: 'insight-2',
        image: 'https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg?auto=compress&cs=tinysrgb&w=600',
        date: '03.10.2025',
        tag: 'Insight',
        title: 'HOW DATA-DRIVEN COUNSELLING IMPROVES STUDENT CONVERSION AND CAREER FIT',
        readTime: '5 Minutes'
      },
      {
        id: 'insight-3',
        image: 'https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg?auto=compress&cs=tinysrgb&w=600',
        date: '28.09.2025',
        tag: 'Insight',
        title: 'FROM LEAD SCORING TO NEXT BEST ACTION: THE NEW MODEL FOR EDUCATION ADVISORY',
        readTime: '7 Minutes'
      }
    ],

    events: [
      {
        id: 'event-1',
        image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=600',
        date: '15.11.2025',
        tag: 'Event',
        title: 'AUSBILDUNG IN GERMANY: LIVE CAREER PATHWAY WEBINAR FOR STUDENTS AND PARENTS',
        readTime: '60 Minutes'
      },
      {
        id: 'event-2',
        image: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=600',
        date: '21.11.2025',
        tag: 'Event',
        title: 'GERMAN LANGUAGE READINESS MASTERCLASS FOR A1, A2, AND B1 LEARNERS',
        readTime: '90 Minutes'
      },
      {
        id: 'event-3',
        image: 'https://images.pexels.com/photos/7648047/pexels-photo-7648047.jpeg?auto=compress&cs=tinysrgb&w=600',
        date: '04.12.2025',
        tag: 'Event',
        title: 'STUDY VS WORK VS AUSBILDUNG: CAREER DECISION WORKSHOP',
        readTime: '75 Minutes'
      }
    ]
  };

  galleryPeople: GalleryPerson[] = [
    {
      id: 'person-1',
      image: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=400',
      top: '95px',
      left: '4%',
      width: '86px',
      height: '110px',
      delay: '0s'
    },
    {
      id: 'person-2',
      image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400',
      top: '50px',
      left: '13%',
      width: '86px',
      height: '126px',
      delay: '0.2s'
    },
    {
      id: 'person-3',
      image: 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=400',
      top: '130px',
      left: '14%',
      width: '92px',
      height: '118px',
      delay: '0.45s'
    },
    {
      id: 'person-4',
      image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=400',
      top: '100px',
      left: '25%',
      width: '98px',
      height: '112px',
      delay: '0.15s'
    },
    {
      id: 'person-5',
      image: 'https://images.pexels.com/photos/5668772/pexels-photo-5668772.jpeg?auto=compress&cs=tinysrgb&w=400',
      top: '58px',
      left: '36%',
      width: '96px',
      height: '118px',
      delay: '0.5s'
    },
    {
      id: 'person-6',
      image: 'https://images.pexels.com/photos/7648317/pexels-photo-7648317.jpeg?auto=compress&cs=tinysrgb&w=400',
      top: '118px',
      left: '47%',
      width: '78px',
      height: '90px',
      delay: '0.25s'
    },
    {
      id: 'person-7',
      image: 'https://images.pexels.com/photos/3771836/pexels-photo-3771836.jpeg?auto=compress&cs=tinysrgb&w=400',
      top: '55px',
      left: '58%',
      width: '94px',
      height: '125px',
      delay: '0.4s'
    },
    {
      id: 'person-8',
      image: 'https://images.pexels.com/photos/3760093/pexels-photo-3760093.jpeg?auto=compress&cs=tinysrgb&w=400',
      top: '120px',
      left: '70%',
      width: '86px',
      height: '112px',
      delay: '0.1s'
    },
    {
      id: 'person-9',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
      top: '58px',
      left: '82%',
      width: '92px',
      height: '120px',
      delay: '0.35s'
    },
    {
      id: 'person-10',
      image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=400',
      top: '95px',
      left: '92%',
      width: '84px',
      height: '116px',
      delay: '0.6s'
    },
    {
      id: 'person-11',
      image: 'https://images.pexels.com/photos/7648042/pexels-photo-7648042.jpeg?auto=compress&cs=tinysrgb&w=400',
      top: '220px',
      left: '88%',
      width: '88px',
      height: '118px',
      delay: '0.3s'
    },
    {
      id: 'person-12',
      image: 'https://images.pexels.com/photos/7648272/pexels-photo-7648272.jpeg?auto=compress&cs=tinysrgb&w=400',
      top: '230px',
      left: '3%',
      width: '86px',
      height: '112px',
      delay: '0.55s'
    }
  ];

  get activeArticles(): MagazineArticle[] {
    return this.resourceData[this.activeTab];
  }

  get mobileGalleryPeople(): GalleryPerson[] {
    return this.galleryPeople.slice(0, 8);
  }

  setActiveTab(tab: ResourceTab): void {
    this.activeTab = tab;
  }
}