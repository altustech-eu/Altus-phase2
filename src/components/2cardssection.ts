import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface SocialPostCard {
  username: string;
  verified: boolean;
  imageUrl: string;
  flagUrl: string;
  countryName: string;
  theme: 'yellow' | 'grey';
}

interface ServiceCard {
  title: string;
  description: string;
  features: string[];
  iconBg: string;
  iconColor: string;
  svgIcon: SafeHtml;
}

@Component({
  selector: 'app-home-showcase',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="font-main bg-white pt-10 pb-24">

      <!-- Top Country / Ambassador Card Carousel -->
      <div class="max-w-[1584px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 mb-20">

        <div class="relative">

          <!-- Left Arrow -->
          <button
            type="button"
            class="carousel-nav carousel-nav-left"
            (click)="prevSocialSlide()"
            aria-label="Previous ambassador card"
          >
            <svg
              class="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M15 18l-6-6 6-6"></path>
            </svg>
          </button>

          <!-- Cards Track -->
          <div
            #socialCarouselTrack
            class="flex overflow-x-auto gap-5 lg:gap-6 xl:gap-7 pb-6 hide-scrollbar snap-x snap-mandatory scroll-smooth px-12"
          >

            @for (post of socialPosts; track $index) {
              <article class="w-[240px] lg:w-[260px] xl:w-[280px] shrink-0 snap-start">

                <div class="relative bg-white border border-[#d9d9d9] rounded-[14px] overflow-hidden shadow-sm hover:shadow-md transition-shadow">

                  <!-- Upper Main Image Frame -->
                  <div class="px-4 pt-4">
                    <div class="relative h-[220px] xl:h-[235px] overflow-hidden rounded-[6px] border border-[#e0e0e0] bg-[#f4f4f4]">
                      <img
                        [src]="post.imageUrl"
                        [alt]="post.username"
                        class="w-full h-full object-cover object-top"
                        loading="lazy"
                        (error)="imageError($event, post.imageUrl)"
                      />

                      <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                    </div>
                  </div>

                  <!-- Country Flag Circle Overlap -->
                  <div class="relative px-5 pt-4">
                    <div class="absolute -top-8 left-5 w-[58px] h-[58px] rounded-full bg-white border-[4px] border-white shadow-md overflow-hidden flex items-center justify-center">
                      <img
                        [src]="post.flagUrl"
                        [alt]="post.countryName + ' flag'"
                        class="w-full h-full rounded-full object-cover"
                        loading="lazy"
                        (error)="imageError($event, post.flagUrl)"
                      />
                    </div>

                    <!-- Country Label -->
                    <div class="flex justify-end mb-4">
                      <span class="inline-flex items-center px-3 py-1 rounded-[4px] bg-[#f4f4f4] border border-[#e0e0e0] text-[11px] font-semibold text-[#525252]">
                        {{ post.countryName }}
                      </span>
                    </div>

                    <!-- Name Only -->
                    <div class="pt-1 min-h-[42px]">
                      <div class="flex items-center gap-1.5 mb-1">
                        <h3 class="text-[15px] font-semibold text-[#161616] leading-tight">
                          {{ post.username }}
                        </h3>

                        @if (post.verified) {
                          <svg class="w-3.5 h-3.5 text-[#0f62fe] fill-current" viewBox="0 0 24 24">
                            <path d="M12 2l2.2 2.8 3.5-.5 1.1 3.4 3.2 1.6-1.6 3.2 1.6 3.2-3.2 1.6-1.1 3.4-3.5-.5L12 22l-2.2-2.8-3.5.5-1.1-3.4L2 14.7l1.6-3.2L2 8.3l3.2-1.6 1.1-3.4 3.5.5L12 2z"/>
                            <path d="M10.4 15.7L6.9 12.2l1.2-1.2 2.3 2.3 5.5-5.5 1.2 1.2-6.7 6.7z" fill="white"/>
                          </svg>
                        }
                      </div>
                    </div>

                    <!-- Bottom Buttons -->
                    <div class="grid grid-cols-2 gap-3 pt-4 pb-5">
                      <button
                        type="button"
                        class="h-[38px] border border-[#0f62fe] bg-[#0f62fe] text-white text-[13px] font-semibold rounded-[4px] hover:bg-[#0043ce] transition-colors"
                      >
                        Follow
                      </button>

                      <button
                        type="button"
                        class="h-[38px] border border-[#c6c6c6] bg-white text-[#161616] text-[13px] font-semibold rounded-[4px] hover:bg-[#f4f4f4] transition-colors"
                      >
                        Chat
                      </button>
                    </div>
                  </div>

                </div>

              </article>
            }

          </div>

          <!-- Right Arrow -->
          <button
            type="button"
            class="carousel-nav carousel-nav-right"
            (click)="nextSocialSlide()"
            aria-label="Next ambassador card"
          >
            <svg
              class="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M9 18l6-6-6-6"></path>
            </svg>
          </button>

        </div>
      </div>

      <!-- Service Section Heading -->
      <div class="max-w-[960px] mx-auto px-4 text-center mb-14">
        <h2 class="text-[36px] lg:text-[52px] font-semibold text-[#161616] tracking-[-0.045em] leading-tight mb-5">
          Choose Your Career Pathway
        </h2>

        <p class="text-[16px] lg:text-[20px] text-[#525252] leading-relaxed max-w-3xl mx-auto">
          Explore tailored programs, service modules, quality tiers, and flexible payment options designed around your education, career goals, and migration readiness.
        </p>
      </div>

      <!-- Service Cards Section -->
      <div class="max-w-[1584px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 xl:gap-8">

          @for (card of serviceCards; track card.title) {
            <div
              role="button"
              tabindex="0"
              (click)="openPathwayProcess(card.title)"
              (keydown.enter)="openPathwayProcess(card.title)"
              (keydown.space)="openPathwayProcess(card.title)"
              class="cursor-pointer bg-white p-7 lg:p-8 border border-[#e0e0e0] flex flex-col h-full transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:border-[#0f62fe]"
            >

              <div class="w-12 h-12 flex items-center justify-center mb-6" [ngClass]="card.iconBg">
                <span [innerHTML]="card.svgIcon" [ngClass]="card.iconColor" class="flex items-center justify-center"></span>
              </div>

              <h3 class="font-semibold text-[#161616] text-[19px] mb-3">
                {{ card.title }}
              </h3>

              <p class="text-[14px] text-[#525252] mb-8 leading-relaxed font-normal">
                {{ card.description }}
              </p>

              <div class="mt-auto">
                <ul class="space-y-3 mb-8">
                  @for (feature of card.features; track $index) {
                    <li class="flex items-start gap-2.5 text-[13px] text-[#525252] font-normal">
                      <span class="w-1.5 h-1.5 rounded-full bg-[#0f62fe] shrink-0 mt-1.5"></span>
                      {{ feature }}
                    </li>
                  }
                </ul>

                <button
                  type="button"
                  class="text-[14px] font-medium text-[#0f62fe] flex items-center gap-1.5 group w-fit"
                  (click)="openPathwayProcess(card.title); $event.stopPropagation()"
                >
                  Configure
                  <svg
                    class="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2.5"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>

            </div>
          }

        </div>
      </div>

    </section>
  `,
  styles: [`
    .font-main {
      font-family: 'Poppins', Helvetica, Arial, sans-serif;
    }

    .carousel-nav {
      position: absolute;
      top: 44%;
      transform: translateY(-50%);
      width: 44px;
      height: 44px;
      border-radius: 999px;
      border: 1px solid #d1d5db;
      background: #ffffff;
      color: #111827;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
      cursor: pointer;
      z-index: 30;
      transition:
        background 0.18s ease,
        color 0.18s ease,
        border-color 0.18s ease,
        box-shadow 0.18s ease,
        transform 0.18s ease;
    }

    .carousel-nav:hover {
      background: #0f62fe;
      color: #ffffff;
      border-color: #0f62fe;
      box-shadow: 0 14px 32px rgba(15, 98, 254, 0.28);
    }

    .carousel-nav:active {
      transform: translateY(-50%) scale(0.94);
      box-shadow: 0 8px 18px rgba(15, 98, 254, 0.22);
    }

    .carousel-nav:focus-visible {
      outline: 3px solid rgba(15, 98, 254, 0.28);
      outline-offset: 3px;
    }

    .carousel-nav-left {
      left: -6px;
    }

    .carousel-nav-right {
      right: -6px;
    }

    .hide-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }

    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }

    @media (max-width: 640px) {
      .carousel-nav {
        width: 38px;
        height: 38px;
        top: 42%;
      }

      .carousel-nav-left {
        left: -2px;
      }

      .carousel-nav-right {
        right: -2px;
      }
    }
  `]
})
export class HomeShowcaseComponent {

  @ViewChild('socialCarouselTrack') socialCarouselTrack!: ElementRef<HTMLDivElement>;

  private sanitizer = inject(DomSanitizer);
  private router = inject(Router);

  openPathwayProcess(cardTitle?: string) {
    this.router.navigate(['/pathway-process'], {
      queryParams: {
        pathway: cardTitle || ''
      }
    });
  }

  prevSocialSlide(): void {
    const track = this.socialCarouselTrack?.nativeElement;

    if (!track) return;

    const scrollAmount = this.getSocialScrollAmount(track);

    track.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  }

  nextSocialSlide(): void {
    const track = this.socialCarouselTrack?.nativeElement;

    if (!track) return;

    const scrollAmount = this.getSocialScrollAmount(track);

    track.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  }

  private getSocialScrollAmount(track: HTMLDivElement): number {
    const firstCard = track.querySelector('article') as HTMLElement | null;

    if (!firstCard) {
      return 300;
    }

    const cardWidth = firstCard.offsetWidth;
    const gap = 28;

    return cardWidth + gap;
  }

  imageError(event: Event, imageUrl: string) {
    console.error('Image failed to load:', imageUrl);
  }

  socialPosts: SocialPostCard[] = [
    {
      username: 'Canada Career Guide',
      verified: true,
      theme: 'yellow',
      countryName: 'Canada',
      flagUrl: 'https://flagcdn.com/w160/ca.png',
      imageUrl: '/assets/NURSES/NURSE1.webp'
    },
    {
      username: 'Germany Ausbildung Advisor',
      verified: true,
      theme: 'grey',
      countryName: 'Germany',
      flagUrl: 'https://flagcdn.com/w160/de.png',
      imageUrl: '/assets/NURSES/NURSE2.webp'
    },
    {
      username: 'UK Study Mentor',
      verified: true,
      theme: 'yellow',
      countryName: 'United Kingdom',
      flagUrl: 'https://flagcdn.com/w160/gb.png',
      imageUrl: '/assets/NURSES/NURSE3.webp'
    },
    {
      username: 'Australia Pathway Coach',
      verified: true,
      theme: 'yellow',
      countryName: 'Australia',
      flagUrl: 'https://flagcdn.com/w160/au.png',
      imageUrl: '/assets/NURSES/NURSE4.webp'
    },
    {
      username: 'New Zealand Career Advisor',
      verified: true,
      theme: 'grey',
      countryName: 'New Zealand',
      flagUrl: 'https://flagcdn.com/w160/nz.png',
      imageUrl: '/assets/NURSES/NURSE5.webp'
    },
    {
      username: 'Ireland Study Consultant',
      verified: true,
      theme: 'yellow',
      countryName: 'Ireland',
      flagUrl: 'https://flagcdn.com/w160/ie.png',
      imageUrl: '/assets/NURSES/NURSE6.webp'
    },
    {
      username: 'USA Healthcare Advisor',
      verified: true,
      theme: 'grey',
      countryName: 'United States',
      flagUrl: 'https://flagcdn.com/w160/us.png',
      imageUrl: '/assets/NURSES/NURSE7.webp'
    },
    {
      username: 'France Study Guide',
      verified: true,
      theme: 'yellow',
      countryName: 'France',
      flagUrl: 'https://flagcdn.com/w160/fr.png',
      imageUrl: '/assets/NURSES/NURSE8.webp'
    },
    {
      username: 'Italy Career Mentor',
      verified: true,
      theme: 'grey',
      countryName: 'Italy',
      flagUrl: 'https://flagcdn.com/w160/it.png',
      imageUrl: '/assets/NURSES/NURSE9.webp'
    },
    {
      username: 'Spain Study Advisor',
      verified: true,
      theme: 'yellow',
      countryName: 'Spain',
      flagUrl: 'https://flagcdn.com/w160/es.png',
      imageUrl: '/assets/NURSES/NURSE10.webp'
    },
    {
      username: 'Netherlands Career Guide',
      verified: true,
      theme: 'grey',
      countryName: 'Netherlands',
      flagUrl: 'https://flagcdn.com/w160/nl.png',
      imageUrl: '/assets/NURSES/NURSE11.webp'
    },
    {
      username: 'Sweden Study Consultant',
      verified: true,
      theme: 'yellow',
      countryName: 'Sweden',
      flagUrl: 'https://flagcdn.com/w160/se.png',
      imageUrl: '/assets/NURSES/NURSE12.webp'
    },
    {
      username: 'Finland Education Advisor',
      verified: true,
      theme: 'grey',
      countryName: 'Finland',
      flagUrl: 'https://flagcdn.com/w160/fi.png',
      imageUrl: '/assets/NURSES/NURSE13.webp'
    },
    {
      username: 'Denmark Career Coach',
      verified: true,
      theme: 'yellow',
      countryName: 'Denmark',
      flagUrl: 'https://flagcdn.com/w160/dk.png',
      imageUrl: '/assets/NURSES/NURSE14.webp'
    },
    {
      username: 'Norway Study Mentor',
      verified: true,
      theme: 'grey',
      countryName: 'Norway',
      flagUrl: 'https://flagcdn.com/w160/no.png',
      imageUrl: '/assets/NURSES/NURSE15.webp'
    },
    {
      username: 'Switzerland Career Advisor',
      verified: true,
      theme: 'yellow',
      countryName: 'Switzerland',
      flagUrl: 'https://flagcdn.com/w160/ch.png',
      imageUrl: '/assets/NURSES/NURSE16.webp'
    },
    {
      username: 'Austria Study Guide',
      verified: true,
      theme: 'grey',
      countryName: 'Austria',
      flagUrl: 'https://flagcdn.com/w160/at.png',
      imageUrl: '/assets/NURSES/NURSE17.webp'
    },
    {
      username: 'Belgium Career Mentor',
      verified: true,
      theme: 'yellow',
      countryName: 'Belgium',
      flagUrl: 'https://flagcdn.com/w160/be.png',
      imageUrl: '/assets/NURSES/NURSE18.webp'
    },
    {
      username: 'Georgia Pathway Advisor',
      verified: true,
      theme: 'grey',
      countryName: 'Georgia',
      flagUrl: 'https://flagcdn.com/w160/ge.png',
      imageUrl: '/assets/NURSES/NURSE19.webp'
    }
  ];

  serviceCards: ServiceCard[] = [
    {
      title: 'Ausbildung Germany',
      description: 'Vocational training with employer matching, language preparation, and mobility support',
      features: ['A1-B2 German Training', 'Employer Matching', 'Visa & Settlement'],
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-500',
      svgIcon: this.sanitizer.bypassSecurityTrustHtml(
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>'
      )
    },
    {
      title: 'Jobs in Europe',
      description: 'Career placement with profile building, recruiter outreach, and relocation support',
      features: ['ATS CV Building', 'Recruiter Network', 'Salary Negotiation'],
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-500',
      svgIcon: this.sanitizer.bypassSecurityTrustHtml(
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>'
      )
    },
    {
      title: 'Study Abroad',
      description: 'University admission advisory with documentation, visa, and scholarship support',
      features: ['University Shortlisting', 'SOP/LOR Writing', 'Scholarship Finder'],
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-500',
      svgIcon: this.sanitizer.bypassSecurityTrustHtml(
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>'
      )
    },
    {
      title: 'German Language',
      description: 'A1-B2 training with certified trainers, speaking labs, and exam preparation',
      features: ['Native Speakers', 'Speaking Lab', 'Exam Preparation'],
      iconBg: 'bg-orange-50',
      iconColor: 'text-orange-500',
      svgIcon: this.sanitizer.bypassSecurityTrustHtml(
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>'
      )
    }
  ];
}