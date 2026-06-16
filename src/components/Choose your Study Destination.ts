import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface StudyDestination {
  id: string;
  country: string;
  flagUrl: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  highlights: string[];
  stats: {
    label: string;
    value: string;
  }[];
  gradient: string;
}

@Component({
  selector: 'app-study-destination',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="font-main relative overflow-hidden bg-white py-16 lg:py-24">

      <!-- Soft Background Gradient -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute -top-32 -left-24 h-[420px] w-[420px] rounded-full bg-blue-100/70 blur-3xl"></div>
        <div class="absolute top-40 right-0 h-[380px] w-[380px] rounded-full bg-cyan-100/70 blur-3xl"></div>
        <div class="absolute bottom-0 left-1/3 h-[320px] w-[320px] rounded-full bg-indigo-100/50 blur-3xl"></div>
      </div>

      <div class="relative z-10 max-w-[1584px] mx-auto px-6 lg:px-12 xl:px-16 2xl:px-20">

        <!-- Section Heading -->
        <div class="mx-auto mb-12 max-w-[860px] text-center lg:mb-16">
          <p class="mb-4 text-[12px] font-bold uppercase tracking-[0.22em] text-[#0f62fe]">
            Global Study Pathways
          </p>

          <h2 class="text-[34px] lg:text-[48px] font-semibold text-slate-950 tracking-[-0.045em] leading-tight">
            Choose your Study Destination
          </h2>

          <p class="mt-5 text-[15px] lg:text-[17px] leading-relaxed text-slate-600">
            Explore destination-specific study pathways, visa readiness, university options, living cost,
            post-study work opportunities and long-term career outcomes.
          </p>
        </div>

        <!-- Equal Size Country Selector Cards -->
        <div class="mx-auto mb-10 grid max-w-[1050px] grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          @for (destination of destinations; track destination.id) {
            <button
              type="button"
              (click)="selectDestination(destination.id)"
              class="h-[58px] w-full border px-4 text-left transition-all duration-300"
              [class.border-[#0f62fe]]="activeDestination.id === destination.id"
              [class.bg-[#0f62fe]]="activeDestination.id === destination.id"
              [class.text-white]="activeDestination.id === destination.id"
              [class.shadow-lg]="activeDestination.id === destination.id"
              [class.shadow-blue-500/20]="activeDestination.id === destination.id"
              [class.border-slate-200]="activeDestination.id !== destination.id"
              [class.bg-white]="activeDestination.id !== destination.id"
              [class.text-slate-700]="activeDestination.id !== destination.id"
              [class.hover:border-[#0f62fe]]="activeDestination.id !== destination.id"
            >
              <div class="flex h-full items-center gap-3">
                <span class="flex h-7 w-10 shrink-0 overflow-hidden border border-slate-200 bg-white">
                  <img
                    [src]="destination.flagUrl"
                    [alt]="destination.country + ' flag'"
                    class="h-full w-full object-cover"
                    loading="lazy"
                  />
                </span>

                <span class="block truncate text-[13px] font-bold">
                  {{ destination.country }}
                </span>
              </div>
            </button>
          }
        </div>

        <!-- Main Interactive Destination Card -->
        <div class="mx-auto grid max-w-[1180px] grid-cols-1 overflow-hidden border border-slate-200 bg-white/85 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl lg:grid-cols-12">

          <!-- Image Area -->
          <div class="relative min-h-[420px] overflow-hidden lg:col-span-7 lg:h-[610px]">

            <img
              [src]="activeDestination.imageUrl"
              [alt]="activeDestination.title"
              class="h-full w-full object-cover transition-all duration-700"
              loading="lazy"
            />

            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent"></div>

            <!-- Floating Destination Badge -->
            <div class="absolute left-6 top-6 border border-white/30 bg-white/20 px-4 py-2 text-white shadow-lg backdrop-blur-md">
              <div class="flex items-center gap-2 text-[13px] font-semibold">
                <span class="flex h-6 w-9 overflow-hidden border border-white/30">
                  <img
                    [src]="activeDestination.flagUrl"
                    [alt]="activeDestination.country + ' flag'"
                    class="h-full w-full object-cover"
                    loading="lazy"
                  />
                </span>
                {{ activeDestination.country }}
              </div>
            </div>

            <!-- Bottom Caption -->
            <div class="absolute bottom-6 left-6 right-6">
              <p class="mb-3 text-[12px] font-bold uppercase tracking-[0.18em] text-blue-100">
                Destination Snapshot
              </p>

              <h3 class="max-w-[620px] text-[30px] font-semibold leading-tight tracking-[-0.035em] text-white lg:text-[42px]">
                {{ activeDestination.title }}
              </h3>

              <p class="mt-3 max-w-[560px] text-[14px] leading-relaxed text-white/85">
                {{ activeDestination.subtitle }}
              </p>
            </div>
          </div>

          <!-- Content Area -->
          <div class="relative lg:col-span-5 lg:h-[610px]">

            <div
              class="absolute inset-0 opacity-90"
              [ngClass]="activeDestination.gradient"
            ></div>

            <div class="relative z-10 flex h-full flex-col p-7 lg:p-9">

              <div class="mb-7">
                <p class="mb-3 text-[12px] font-bold uppercase tracking-[0.18em] text-[#0f62fe]">
                  Study Destination
                </p>

                <h3 class="text-[30px] font-semibold tracking-[-0.04em] text-slate-950 lg:text-[38px]">
                  {{ activeDestination.country }}
                </h3>

                <p class="mt-4 text-[15px] leading-relaxed text-slate-600">
                  {{ activeDestination.description }}
                </p>
              </div>

              <!-- Equal Size Stats -->
              <div class="mb-7 grid grid-cols-3 gap-3">
                @for (stat of activeDestination.stats; track stat.label) {
                  <div class="flex h-[92px] flex-col justify-center border border-white/70 bg-white/75 p-4 shadow-sm backdrop-blur">
                    <p class="text-[19px] font-bold text-slate-950">
                      {{ stat.value }}
                    </p>
                    <p class="mt-1 text-[11px] font-medium leading-snug text-slate-500">
                      {{ stat.label }}
                    </p>
                  </div>
                }
              </div>

              <!-- Equal Size Highlights -->
              <div class="mb-8 grid gap-3">
                @for (highlight of activeDestination.highlights; track highlight) {
                  <div class="flex min-h-[68px] items-start gap-3 border border-white/70 bg-white/70 p-3 shadow-sm backdrop-blur">
                    <span class="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#0f62fe]"></span>
                    <p class="text-[13px] font-medium leading-relaxed text-slate-700">
                      {{ highlight }}
                    </p>
                  </div>
                }
              </div>

              <!-- CTA Buttons -->
              <div class="mt-auto grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  class="inline-flex h-[46px] items-center justify-center bg-[#0f62fe] px-6 text-[13px] font-bold text-white shadow-lg shadow-blue-500/20 transition hover:bg-[#0043ce]"
                >
                  Explore Programs
                  <span class="ml-2">→</span>
                </button>

                <button
                  type="button"
                  class="inline-flex h-[46px] items-center justify-center border border-slate-300 bg-white px-6 text-[13px] font-bold text-slate-900 transition hover:border-[#0f62fe] hover:text-[#0f62fe]"
                >
                  Check Eligibility
                </button>
              </div>

            </div>
          </div>
        </div>

        <!-- Mini Navigation -->
        <div class="mx-auto mt-8 flex max-w-[1180px] items-center justify-between">
          <button
            type="button"
            (click)="previousDestination()"
            class="inline-flex h-11 w-11 items-center justify-center border border-slate-200 bg-white text-slate-800 shadow-sm transition hover:border-[#0f62fe] hover:text-[#0f62fe]"
          >
            ←
          </button>

          <div class="flex items-center gap-2">
            @for (destination of destinations; track destination.id) {
              <button
                type="button"
                (click)="selectDestination(destination.id)"
                class="h-2.5 transition-all duration-300"
                [class.w-8]="activeDestination.id === destination.id"
                [class.bg-[#0f62fe]]="activeDestination.id === destination.id"
                [class.w-2.5]="activeDestination.id !== destination.id"
                [class.bg-slate-300]="activeDestination.id !== destination.id"
              ></button>
            }
          </div>

          <button
            type="button"
            (click)="nextDestination()"
            class="inline-flex h-11 w-11 items-center justify-center border border-slate-200 bg-white text-slate-800 shadow-sm transition hover:border-[#0f62fe] hover:text-[#0f62fe]"
          >
            →
          </button>
        </div>

      </div>
    </section>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

    .font-main {
      font-family: 'Poppins', Helvetica, Arial, sans-serif;
    }
  `]
})
export class StudyDestinationComponent {
  activeDestinationId = 'germany';

  destinations: StudyDestination[] = [
    {
      id: 'germany',
      country: 'Germany',
      flagUrl: 'https://flagcdn.com/w80/de.png',
      title: 'Study and build your career in Germany',
      subtitle: 'Public universities, Ausbildung pathways, applied sciences and strong post-study work opportunities.',
      description: 'Germany is a high-value destination for students looking for quality education, affordable tuition, applied learning, industry exposure and structured career pathways.',
      imageUrl: 'https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg?auto=compress&cs=tinysrgb&w=1400',
      highlights: [
        'Strong public university and applied sciences ecosystem.',
        'Excellent destination for engineering, IT, healthcare and business programs.',
        'Post-study career options with long-term settlement potential.'
      ],
      stats: [
        { label: 'Popular Route', value: 'UG/PG' },
        { label: 'Work Option', value: 'Yes' },
        { label: 'Career ROI', value: 'High' }
      ],
      gradient: 'bg-gradient-to-br from-blue-50 via-white to-cyan-50'
    },
    {
      id: 'uk',
      country: 'United Kingdom',
      flagUrl: 'https://flagcdn.com/w80/gb.png',
      title: 'Study in the UK with global academic exposure',
      subtitle: 'Internationally recognised universities, shorter program duration and global alumni networks.',
      description: 'The UK is ideal for students seeking globally recognised degrees, strong academic reputation, multicultural campuses and faster completion timelines.',
      imageUrl: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=1400',
      highlights: [
        'Strong university brand value and global recognition.',
        'Shorter bachelor and master program duration in many cases.',
        'Excellent for business, law, healthcare, finance and creative fields.'
      ],
      stats: [
        { label: 'Popular Route', value: 'PG' },
        { label: 'Duration', value: 'Short' },
        { label: 'Brand Value', value: 'High' }
      ],
      gradient: 'bg-gradient-to-br from-indigo-50 via-white to-sky-50'
    },
    {
      id: 'canada',
      country: 'Canada',
      flagUrl: 'https://flagcdn.com/w80/ca.png',
      title: 'Study in Canada with work and migration pathways',
      subtitle: 'Student-friendly environment, co-op programs, career mobility and long-term settlement routes.',
      description: 'Canada is a preferred option for students looking for international education, employability, part-time work options and structured post-study pathways.',
      imageUrl: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1400',
      highlights: [
        'Strong student support and multicultural learning environment.',
        'Good fit for diploma, UG, PG and co-op based programs.',
        'Popular among students planning long-term migration outcomes.'
      ],
      stats: [
        { label: 'Student Fit', value: 'High' },
        { label: 'Co-op Route', value: 'Yes' },
        { label: 'Migration', value: 'Strong' }
      ],
      gradient: 'bg-gradient-to-br from-red-50 via-white to-blue-50'
    },
    {
      id: 'australia',
      country: 'Australia',
      flagUrl: 'https://flagcdn.com/w80/au.png',
      title: 'Study in Australia with industry-linked programs',
      subtitle: 'Career-oriented education, flexible programs and strong student lifestyle.',
      description: 'Australia is suitable for students looking for practical education, strong campus experience, employability-linked courses and international exposure.',
      imageUrl: 'https://images.pexels.com/photos/1878293/pexels-photo-1878293.jpeg?auto=compress&cs=tinysrgb&w=1400',
      highlights: [
        'Strong options in healthcare, IT, business, hospitality and engineering.',
        'Good campus lifestyle and student support infrastructure.',
        'Popular for students seeking employability-focused education.'
      ],
      stats: [
        { label: 'Lifestyle', value: 'High' },
        { label: 'Programs', value: 'Wide' },
        { label: 'Work Route', value: 'Yes' }
      ],
      gradient: 'bg-gradient-to-br from-yellow-50 via-white to-sky-50'
    },
    {
      id: 'europe',
      country: 'Europe',
      flagUrl: 'https://flagcdn.com/w80/eu.png',
      title: 'Explore Europe for affordable global education',
      subtitle: 'Multiple countries, diverse programs, affordable options and multilingual career markets.',
      description: 'European destinations offer strong value for students comparing cost, quality, career mobility, visa routes and access to international markets.',
      imageUrl: 'https://images.pexels.com/photos/532826/pexels-photo-532826.jpeg?auto=compress&cs=tinysrgb&w=1400',
      highlights: [
        'Affordable study options across multiple European countries.',
        'Strong pathways in medicine, engineering, business and technology.',
        'Good choice for students comparing cost versus global exposure.'
      ],
      stats: [
        { label: 'Cost Value', value: 'Good' },
        { label: 'Options', value: 'Many' },
        { label: 'Mobility', value: 'EU' }
      ],
      gradient: 'bg-gradient-to-br from-cyan-50 via-white to-blue-50'
    }
  ];

  get activeDestination(): StudyDestination {
    return this.destinations.find(destination => destination.id === this.activeDestinationId) || this.destinations[0];
  }

  selectDestination(id: string) {
    this.activeDestinationId = id;
  }

  nextDestination() {
    const currentIndex = this.destinations.findIndex(destination => destination.id === this.activeDestinationId);
    const nextIndex = (currentIndex + 1) % this.destinations.length;
    this.activeDestinationId = this.destinations[nextIndex].id;
  }

  previousDestination() {
    const currentIndex = this.destinations.findIndex(destination => destination.id === this.activeDestinationId);
    const previousIndex = currentIndex === 0 ? this.destinations.length - 1 : currentIndex - 1;
    this.activeDestinationId = this.destinations[previousIndex].id;
  }
}