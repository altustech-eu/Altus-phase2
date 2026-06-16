import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

interface StudyProgram {
  id: string;
  title: string;
  faculty: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-study-programs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="font-main bg-white py-12 lg:py-16 overflow-hidden">

      <!-- Heading -->
      <div class="max-w-[1584px] mx-auto px-6 lg:px-12 xl:px-16 2xl:px-20 mb-8">
        <h2 class="text-[30px] lg:text-[42px] font-semibold text-center text-[#161616] tracking-[-0.04em] leading-tight">
          Choose Your Study Programs
        </h2>
      </div>

      <!-- Carousel Area -->
      <div class="max-w-[1584px] mx-auto px-6 lg:px-12 xl:px-16 2xl:px-20 relative">

        <div class="relative min-h-[300px]">

          <!-- Dark Left Panel -->
          <div class="absolute left-0 top-0 bottom-0 w-[260px] lg:w-[320px] bg-[#6f6f6f] hidden md:flex flex-col items-center justify-center z-0">

            <!-- Arrows -->
            <div class="flex flex-col gap-3 mb-8">

              <!-- Next -->
              <button
                class="carousel-arrow"
                [class.disabled-arrow]="isNextDisabled"
                [disabled]="isNextDisabled"
                (click)="nextSlide()"
                aria-label="Next study program"
              >
                <svg class="w-[16px] h-[16px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">
                  <path d="M5 12h14"></path>
                  <path d="M13 6l6 6-6 6"></path>
                </svg>
              </button>

              <!-- Previous -->
              <button
                class="carousel-arrow"
                [class.disabled-arrow]="isPrevDisabled"
                [disabled]="isPrevDisabled"
                (click)="prevSlide()"
                aria-label="Previous study program"
              >
                <svg class="w-[16px] h-[16px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">
                  <path d="M19 12H5"></path>
                  <path d="M11 6l-6 6 6 6"></path>
                </svg>
              </button>
            </div>

            <!-- Counter -->
            <div class="text-white text-[22px] font-medium tracking-wide">
              {{ currentCounter }}
            </div>

            <div class="text-white/70 text-[12px] mt-2 tracking-wide">
              / {{ totalCounter }}
            </div>

          </div>

          <!-- Cards Track -->
          <div class="relative z-10 md:ml-[190px] lg:ml-[240px] pt-12 pb-10">

            <div
              #carouselTrack
              class="flex gap-5 overflow-x-auto hide-scrollbar snap-x snap-mandatory scroll-smooth"
              (scroll)="onCarouselScroll()"
            >

              @for (program of programs; track program.id; let i = $index) {
                <article
                  class="program-card snap-start"
                  [class.active-card]="activeIndex === i"
                  (click)="selectProgram(i)"
                >

                  <!-- Title -->
                  <div class="min-h-[58px] flex items-start">
                    <h3 class="text-[13px] font-medium text-[#161616] leading-snug uppercase">
                      {{ program.title }}
                    </h3>
                  </div>

                  <!-- Faculty -->
                  <div class="flex items-center gap-2 mt-4">
                    <div
                      class="w-[24px] h-[24px] rounded-full flex items-center justify-center"
                      [style.background]="program.color"
                    >
                      <span class="text-white text-[11px] font-semibold">
                        {{ program.icon }}
                      </span>
                    </div>

                    <div>
                      <p class="text-[10px] text-[#6f6f6f] leading-none mb-1">
                        Faculty of
                      </p>
                      <p class="text-[11px] font-semibold text-[#161616] leading-none">
                        {{ program.faculty }}
                      </p>
                    </div>
                  </div>

                  <!-- Bottom Accent -->
                  <div
                    class="absolute left-0 right-0 bottom-0 h-[3px]"
                    [style.background]="activeIndex === i ? '#0f62fe' : '#78a9ff'"
                  ></div>

                </article>
              }

            </div>

            <!-- Mobile Arrows -->
            <div class="md:hidden flex items-center justify-center gap-4 mt-6">
              <button
                class="mobile-carousel-arrow"
                [class.disabled-arrow]="isPrevDisabled"
                [disabled]="isPrevDisabled"
                (click)="prevSlide()"
                aria-label="Previous study program"
              >
                ←
              </button>

              <div class="text-[14px] text-[#525252] font-medium">
                {{ currentCounter }} / {{ totalCounter }}
              </div>

              <button
                class="mobile-carousel-arrow"
                [class.disabled-arrow]="isNextDisabled"
                [disabled]="isNextDisabled"
                (click)="nextSlide()"
                aria-label="Next study program"
              >
                →
              </button>
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

    .carousel-arrow {
      width: 30px;
      height: 30px;
      border-radius: 999px;
      background: #ffffff;
      color: #525252;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.15s ease, color 0.15s ease, transform 0.15s ease, opacity 0.15s ease;
    }

    .carousel-arrow:hover {
      background: #0f62fe;
      color: #ffffff;
      transform: translateX(2px);
    }

    .mobile-carousel-arrow {
      width: 38px;
      height: 38px;
      border-radius: 999px;
      background: #f4f4f4;
      color: #161616;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      transition: background 0.15s ease, color 0.15s ease, opacity 0.15s ease;
    }

    .mobile-carousel-arrow:hover {
      background: #0f62fe;
      color: #ffffff;
    }

    .disabled-arrow {
      opacity: 0.35;
      cursor: not-allowed;
      pointer-events: none;
    }

    .program-card {
      position: relative;
      width: 165px;
      min-width: 165px;
      height: 150px;
      background: #ffffff;
      border: 1px solid #e0e0e0;
      box-shadow: 0 3px 12px rgba(0, 0, 0, 0.08);
      padding: 28px 16px 18px;
      transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
      cursor: pointer;
    }

    .program-card:hover {
      transform: translateY(-4px);
      border-color: #78a9ff;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    }

    .active-card {
      border-color: #0f62fe;
      box-shadow: 0 10px 28px rgba(15, 98, 254, 0.18);
      transform: translateY(-4px);
    }

    .hide-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }

    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }

    @media (min-width: 1024px) {
      .program-card {
        width: 180px;
        min-width: 180px;
        height: 160px;
      }
    }
  `]
})
export class StudyProgramsComponent {
  @ViewChild('carouselTrack') carouselTrack!: ElementRef<HTMLDivElement>;

  activeIndex = 0;

  programs: StudyProgram[] = [
    {
      id: 'p1',
      title: 'Odontology',
      faculty: 'Odontology',
      icon: 'O',
      color: '#0f62fe'
    },
    {
      id: 'p2',
      title: 'Pharmacy',
      faculty: 'Pharmacy',
      icon: 'P',
      color: '#4589ff'
    },
    {
      id: 'p3',
      title: 'Veterinary Medicine',
      faculty: 'Veterinary Medicine',
      icon: 'V',
      color: '#0f62fe'
    },
    {
      id: 'p4',
      title: 'Odontology',
      faculty: 'Odontology',
      icon: 'O',
      color: '#0f62fe'
    },
    {
      id: 'p5',
      title: 'Pharmacy',
      faculty: 'Pharmacy',
      icon: 'P',
      color: '#4589ff'
    },
    {
      id: 'p6',
      title: 'Medicine',
      faculty: 'Medicine',
      icon: 'M',
      color: '#0f62fe'
    },
    {
      id: 'p7',
      title: 'Nursing',
      faculty: 'Healthcare',
      icon: 'N',
      color: '#4589ff'
    },
    {
      id: 'p8',
      title: 'Biomedical Science',
      faculty: 'Science',
      icon: 'B',
      color: '#0f62fe'
    }
  ];

  get currentCounter(): string {
    return String(this.activeIndex + 1).padStart(2, '0');
  }

  get totalCounter(): string {
    return String(this.programs.length).padStart(2, '0');
  }

  get isPrevDisabled(): boolean {
    return this.activeIndex === 0;
  }

  get isNextDisabled(): boolean {
    return this.activeIndex === this.programs.length - 1;
  }

  nextSlide(): void {
    if (this.isNextDisabled) return;

    this.activeIndex += 1;
    this.scrollToActiveCard();
  }

  prevSlide(): void {
    if (this.isPrevDisabled) return;

    this.activeIndex -= 1;
    this.scrollToActiveCard();
  }

  selectProgram(index: number): void {
    this.activeIndex = index;
    this.scrollToActiveCard();
  }

  onCarouselScroll(): void {
    const track = this.carouselTrack?.nativeElement;

    if (!track) return;

    const cards = Array.from(track.children) as HTMLElement[];

    if (!cards.length) return;

    const trackLeft = track.getBoundingClientRect().left;

    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const cardLeft = card.getBoundingClientRect().left;
      const distance = Math.abs(cardLeft - trackLeft);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    this.activeIndex = closestIndex;
  }

  private scrollToActiveCard(): void {
    const track = this.carouselTrack?.nativeElement;

    if (!track) return;

    const cards = Array.from(track.children) as HTMLElement[];
    const activeCard = cards[this.activeIndex];

    if (!activeCard) return;

    activeCard.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start'
    });
  }
}