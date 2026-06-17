import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

interface StudyProgram {
  id: string;
  title: string;
  faculty: string;
  icon: string;
  accentColor: string;
}

@Component({
  selector: 'app-study-programs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="font-main bg-white py-10 lg:py-14 overflow-hidden">

      <!-- Heading -->
      <div class="max-w-[1584px] mx-auto px-6 lg:px-10 xl:px-12 2xl:px-16 mb-10">
        <h2 class="text-[34px] lg:text-[38px] font-bold text-[#000000] tracking-[-0.035em] leading-tight">
          Courses
        </h2>
      </div>

      <!-- Carousel Area -->
      <div class="max-w-[1584px] mx-auto px-6 lg:px-10 xl:px-12 2xl:px-16 relative">

        <div class="relative">

          <!-- Cards Track -->
          <div
            #carouselTrack
            class="flex gap-10 overflow-x-auto hide-scrollbar snap-x snap-mandatory scroll-smooth px-14"
            (scroll)="onCarouselScroll()"
          >

            @for (program of programs; track program.id; let i = $index) {
              <article
                class="course-card snap-start"
                [class.active-card]="activeIndex === i"
                (click)="selectProgram(i)"
              >

                <!-- Course Title -->
                <div>
                  <h3 class="course-title">
                    {{ program.title }}
                  </h3>
                </div>

                <!-- Faculty Block -->
                <div class="faculty-block">

                  <!-- Faculty Seal / Icon -->
                  <div class="faculty-seal">
                    <span class="faculty-seal-inner">
                      {{ program.icon }}
                    </span>
                  </div>

                  <div>
                    <p class="faculty-label">
                      Faculty of
                    </p>

                    <p class="faculty-name">
                      {{ program.faculty }}
                    </p>
                  </div>
                </div>

                <!-- Bottom Accent Line -->
                <div
                  class="bottom-accent"
                  [style.background]="program.accentColor"
                ></div>

              </article>
            }

          </div>

          <!-- Desktop Left Arrow -->
          <button
            type="button"
            class="desktop-prev-arrow"
            [class.disabled-arrow]="isPrevDisabled"
            [disabled]="isPrevDisabled"
            (click)="prevSlide()"
            aria-label="Previous course"
          >
            <svg
              class="w-[18px] h-[18px]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.9"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M15 18l-6-6 6-6"></path>
            </svg>
          </button>

          <!-- Desktop Right Arrow -->
          <button
            type="button"
            class="desktop-next-arrow"
            [class.disabled-arrow]="isNextDisabled"
            [disabled]="isNextDisabled"
            (click)="nextSlide()"
            aria-label="Next course"
          >
            <svg
              class="w-[18px] h-[18px]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.9"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M9 18l6-6-6-6"></path>
            </svg>
          </button>

          <!-- Mobile Controls -->
          <div class="md:hidden flex items-center justify-center gap-4 mt-8">
            <button
              type="button"
              class="mobile-carousel-arrow"
              [class.disabled-arrow]="isPrevDisabled"
              [disabled]="isPrevDisabled"
              (click)="prevSlide()"
              aria-label="Previous course"
            >
              ←
            </button>

            <div class="text-[14px] text-[#525252] font-medium">
              {{ currentCounter }} / {{ totalCounter }}
            </div>

            <button
              type="button"
              class="mobile-carousel-arrow"
              [class.disabled-arrow]="isNextDisabled"
              [disabled]="isNextDisabled"
              (click)="nextSlide()"
              aria-label="Next course"
            >
              →
            </button>
          </div>

        </div>

      </div>

    </section>
  `,
  styles: [`
    .font-main {
      font-family: 'Poppins', Helvetica, Arial, sans-serif;
    }

    .course-card {
      position: relative;
      width: 345px;
      min-width: 345px;
      height: 338px;
      background: #ffffff;
      border: 1px solid #f3f3f3;
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
      padding: 72px 22px 26px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: none;
    }

    .active-card {
      transform: none;
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
      border-color: #f3f3f3;
    }

    .course-title {
      font-size: 34px;
      font-weight: 400;
      color: #000000;
      line-height: 1.08;
      letter-spacing: -0.045em;
      text-transform: none;
      max-width: 280px;
    }

    .faculty-block {
      display: flex;
      align-items: center;
      gap: 22px;
      margin-top: auto;
      padding-bottom: 8px;
    }

    .faculty-seal {
      width: 54px;
      height: 54px;
      border-radius: 999px;
      border: 2px dashed #8ab6e8;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #2f80c8;
      background: #ffffff;
      flex-shrink: 0;
    }

    .faculty-seal-inner {
      width: 31px;
      height: 31px;
      border-radius: 999px;
      border: 1px solid #8ab6e8;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-weight: 700;
      color: #2f80c8;
      line-height: 1;
    }

    .faculty-label {
      font-size: 24px;
      font-weight: 400;
      color: #000000;
      line-height: 1.08;
      letter-spacing: -0.025em;
      margin: 0 0 4px;
    }

    .faculty-name {
      font-size: 24px;
      font-weight: 700;
      color: #000000;
      line-height: 1.18;
      letter-spacing: -0.025em;
      margin: 0;
      max-width: 220px;
    }

    .bottom-accent {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 4px;
    }

    .desktop-prev-arrow,
    .desktop-next-arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 44px;
      height: 44px;
      border-radius: 999px;
      border: 1px solid #d1d5db;
      background: #ffffff;
      color: #111827;
      display: none;
      align-items: center;
      justify-content: center;
      box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
      cursor: pointer;
      transition:
        background 0.18s ease,
        color 0.18s ease,
        border-color 0.18s ease,
        box-shadow 0.18s ease,
        transform 0.18s ease;
      z-index: 20;
    }

    .desktop-prev-arrow {
      left: -4px;
    }

    .desktop-next-arrow {
      right: -4px;
    }

    .desktop-prev-arrow:hover,
    .desktop-next-arrow:hover {
      background: #0f62fe;
      color: #ffffff;
      border-color: #0f62fe;
      box-shadow: 0 14px 32px rgba(15, 98, 254, 0.28);
    }

    .desktop-prev-arrow:active,
    .desktop-next-arrow:active {
      transform: translateY(-50%) scale(0.94);
      box-shadow: 0 8px 18px rgba(15, 98, 254, 0.22);
    }

    .desktop-prev-arrow:focus-visible,
    .desktop-next-arrow:focus-visible {
      outline: 3px solid rgba(15, 98, 254, 0.28);
      outline-offset: 3px;
    }

    .mobile-carousel-arrow {
      width: 42px;
      height: 42px;
      border-radius: 999px;
      border: 1px solid #d1d5db;
      background: #ffffff;
      color: #111827;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.10);
      cursor: pointer;
      transition:
        background 0.18s ease,
        color 0.18s ease,
        border-color 0.18s ease,
        box-shadow 0.18s ease,
        transform 0.18s ease;
    }

    .mobile-carousel-arrow:hover {
      background: #0f62fe;
      color: #ffffff;
      border-color: #0f62fe;
      box-shadow: 0 12px 26px rgba(15, 98, 254, 0.25);
    }

    .mobile-carousel-arrow:active {
      transform: scale(0.94);
    }

    .mobile-carousel-arrow:focus-visible {
      outline: 3px solid rgba(15, 98, 254, 0.28);
      outline-offset: 3px;
    }

    .disabled-arrow {
      opacity: 0.35;
      cursor: not-allowed;
      pointer-events: none;
      box-shadow: none;
    }

    .hide-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }

    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }

    @media (min-width: 768px) {
      .desktop-prev-arrow,
      .desktop-next-arrow {
        display: flex;
      }
    }

    @media (max-width: 767px) {
      .course-card {
        width: 292px;
        min-width: 292px;
        height: 300px;
        padding: 56px 20px 24px;
      }

      .course-title {
        font-size: 29px;
      }

      .faculty-label,
      .faculty-name {
        font-size: 20px;
      }

      .faculty-block {
        gap: 16px;
      }

      .faculty-seal {
        width: 46px;
        height: 46px;
      }

      .faculty-seal-inner {
        width: 27px;
        height: 27px;
        font-size: 11px;
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
      accentColor: '#20d5c4'
    },
    {
      id: 'p2',
      title: 'PHARMACY',
      faculty: 'Pharmacy',
      icon: 'P',
      accentColor: '#c74e79'
    },
    {
      id: 'p3',
      title: 'VETERINARY MEDICINE',
      faculty: 'Veterinary medicine',
      icon: 'V',
      accentColor: '#5c93d5'
    },
    {
      id: 'p4',
      title: 'Medicine',
      faculty: 'Medicine',
      icon: 'M',
      accentColor: '#20d5c4'
    },
    {
      id: 'p5',
      title: 'Nursing',
      faculty: 'Healthcare',
      icon: 'N',
      accentColor: '#c74e79'
    },
    {
      id: 'p6',
      title: 'Biomedical Science',
      faculty: 'Science',
      icon: 'B',
      accentColor: '#5c93d5'
    },
    {
      id: 'p7',
      title: 'Public Health',
      faculty: 'Health Sciences',
      icon: 'H',
      accentColor: '#20d5c4'
    },
    {
      id: 'p8',
      title: 'Physiotherapy',
      faculty: 'Rehabilitation',
      icon: 'R',
      accentColor: '#c74e79'
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