import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Country {
  name: string;
  code: string;
  continent: string;
  flagUrl: string;
  headline: string;
  description: string;
  mapX: number;
  mapY: number;
  opportunities: string[];
  stats: {
    label: string;
    value: string;
  }[];
}

interface PartnerCard {
  title: string;
  category: string;
  rating: string;
  reviews: string;
  description: string;
  logoUrl: string;
}

@Component({
  selector: 'app-country-search',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="font-main relative overflow-hidden bg-white py-8 lg:py-12">

      <!-- Soft Background -->
      <div class="pointer-events-none absolute inset-0">
        <div class="absolute -top-24 -left-24 h-[320px] w-[320px] rounded-full bg-blue-100/70 blur-3xl"></div>
        <div class="absolute right-0 top-36 h-[280px] w-[280px] rounded-full bg-cyan-100/70 blur-3xl"></div>
        <div class="absolute bottom-0 left-1/3 h-[240px] w-[240px] rounded-full bg-indigo-100/40 blur-3xl"></div>
      </div>

      <!-- Heading -->
      <div class="relative z-10 max-w-[1584px] mx-auto px-6 lg:px-12 xl:px-16 2xl:px-20 mb-7">
        <div class="mx-auto max-w-[860px] text-center">
          <p class="mb-3 text-[12px] font-bold uppercase tracking-[0.22em] text-[#0f62fe]">
            Destination Intelligence
          </p>

          <h2 class="text-3xl lg:text-[42px] font-bold text-center text-slate-950 tracking-[-0.045em] leading-tight">
            Country Search
          </h2>

          <p class="mt-4 text-[14px] lg:text-[16px] leading-relaxed text-slate-600">
            Select a country to explore Ausbildung, study abroad, international jobs, language preparation,
            employer demand, visa readiness and pathway opportunities.
          </p>
        </div>
      </div>

      <!-- Main Layout -->
      <div class="relative z-10 max-w-[1584px] mx-auto px-6 lg:px-12 xl:px-16 2xl:px-20">
        <div class="grid grid-cols-1 overflow-hidden border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.10)] lg:grid-cols-12">

          <!-- Left Panel -->
          <aside class="lg:col-span-3 bg-white border-r border-slate-200 flex flex-col">

            <div class="p-5 border-b border-slate-100">
              <h3 class="text-[20px] font-semibold tracking-[-0.03em] text-slate-950 mb-2">
                Explore Destinations
              </h3>

              <p class="text-[12px] text-slate-500 mb-4 leading-relaxed">
                Filter countries by region and select a destination to view pathway intelligence.
              </p>

              <!-- Search -->
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>

                <input
                  type="text"
                  placeholder="Search country"
                  class="w-full bg-slate-50 border border-slate-200 text-[13px] py-2.5 pl-10 pr-4 text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  (input)="setSearch($event)"
                />
              </div>
            </div>

            <!-- Region Tabs -->
            <div class="grid grid-cols-2 border-b border-slate-100">
              @for (tab of continents; track tab) {
                <button
                  type="button"
                  (click)="setTab(tab)"
                  class="h-[40px] text-[11px] font-bold transition-colors border-r border-b border-slate-100"
                  [class.bg-[#0f62fe]]="activeTab === tab"
                  [class.text-white]="activeTab === tab"
                  [class.text-slate-600]="activeTab !== tab"
                  [class.hover:bg-slate-50]="activeTab !== tab"
                >
                  {{ tab }}
                </button>
              }
            </div>

            <!-- Country List -->
            <div class="flex-1 overflow-y-auto p-4 hide-scrollbar">
              <div class="space-y-2.5">

                @for (country of filteredCountries; track country.code) {
                  <button
                    type="button"
                    (click)="selectCountry(country.code)"
                    class="w-full border p-3 text-left transition-all duration-300"
                    [class.border-[#0f62fe]]="activeCountry.code === country.code"
                    [class.bg-blue-50]="activeCountry.code === country.code"
                    [class.shadow-sm]="activeCountry.code === country.code"
                    [class.border-slate-200]="activeCountry.code !== country.code"
                    [class.bg-white]="activeCountry.code !== country.code"
                    [class.hover:border-[#0f62fe]]="activeCountry.code !== country.code"
                  >
                    <div class="flex items-start justify-between gap-3">
                      <div class="flex items-center gap-3">
                        <span class="flex h-7 w-10 shrink-0 overflow-hidden border border-slate-200 bg-white">
                          <img
                            [src]="country.flagUrl"
                            [alt]="country.name + ' flag'"
                            class="h-full w-full object-cover"
                            loading="lazy"
                          />
                        </span>

                        <div>
                          <p class="text-[13px] font-bold text-slate-900">
                            {{ country.name }}
                          </p>
                          <p class="mt-0.5 text-[10.5px] font-medium text-slate-500">
                            {{ country.continent }}
                          </p>
                        </div>
                      </div>

                      <span
                        class="mt-1 flex h-5 w-5 shrink-0 items-center justify-center border text-[12px] font-bold"
                        [class.border-[#0f62fe]]="activeCountry.code === country.code"
                        [class.text-[#0f62fe]]="activeCountry.code === country.code"
                        [class.border-slate-200]="activeCountry.code !== country.code"
                        [class.text-slate-400]="activeCountry.code !== country.code"
                      >
                        →
                      </span>
                    </div>

                    @if (activeCountry.code === country.code) {
                      <p class="mt-2 text-[11.5px] leading-relaxed text-slate-600">
                        {{ country.headline }}
                      </p>
                    }
                  </button>
                }

                @if (filteredCountries.length === 0) {
                  <div class="border border-dashed border-slate-300 bg-slate-50 p-4 text-center">
                    <p class="text-[13px] font-semibold text-slate-700">
                      No destination found
                    </p>
                    <p class="mt-1 text-[12px] text-slate-500">
                      Try another country or region.
                    </p>
                  </div>
                }

              </div>
            </div>
          </aside>

          <!-- Main Map Intelligence Area -->
          <main class="relative lg:col-span-9 min-h-[560px] overflow-hidden bg-slate-50">

            <!-- Map Background -->
            <div class="absolute inset-0">
              <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#dbeafe_0,#f8fafc_42%,#eef6ff_100%)]"></div>

              <div
                class="absolute inset-0 opacity-[0.18]"
                style="background-image: url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg'); background-size: 105%; background-position: center; background-repeat: no-repeat; filter: grayscale(100%);"
              ></div>

              <div class="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-blue-50/60"></div>
            </div>

            <!-- Map Header -->
            <div class="relative z-10 flex flex-col gap-4 border-b border-white/80 bg-white/55 p-5 backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between">

              <div>
                <p class="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0f62fe]">
                  Active Destination
                </p>

                <div class="mt-2 flex items-center gap-3">
                  <span class="flex h-7 w-11 overflow-hidden border border-slate-200 bg-white shadow-sm">
                    <img
                      [src]="activeCountry.flagUrl"
                      [alt]="activeCountry.name + ' flag'"
                      class="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </span>

                  <h3 class="text-[24px] font-bold tracking-[-0.04em] text-slate-950">
                    {{ activeCountry.name }}
                  </h3>
                </div>
              </div>

              <div class="grid grid-cols-3 gap-2">
                @for (stat of activeCountry.stats; track stat.label) {
                  <div class="min-w-[96px] border border-white/80 bg-white/80 px-3 py-2.5 shadow-sm backdrop-blur">
                    <p class="text-[15px] font-bold text-slate-950">
                      {{ stat.value }}
                    </p>
                    <p class="mt-1 text-[10px] font-medium text-slate-500">
                      {{ stat.label }}
                    </p>
                  </div>
                }
              </div>
            </div>

            <!-- Map Pins -->
            <div class="relative z-10 h-[260px] lg:h-[300px]">

              @for (country of countries; track country.code) {
                <button
                  type="button"
                  (click)="selectCountry(country.code)"
                  class="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
                  [style.left.%]="country.mapX"
                  [style.top.%]="country.mapY"
                  [class.z-30]="activeCountry.code === country.code"
                  [class.z-20]="activeCountry.code !== country.code"
                  [class.opacity-100]="country.continent === activeTab || country.code === activeCountry.code"
                  [class.opacity-30]="country.continent !== activeTab && country.code !== activeCountry.code"
                >
                  <span
                    class="relative flex h-9 w-9 items-center justify-center border-2 bg-white shadow-lg transition-all duration-300"
                    [class.border-[#0f62fe]]="activeCountry.code === country.code"
                    [class.scale-125]="activeCountry.code === country.code"
                    [class.border-white]="activeCountry.code !== country.code"
                    [class.hover:scale-110]="activeCountry.code !== country.code"
                  >
                    <img
                      [src]="country.flagUrl"
                      [alt]="country.name + ' flag'"
                      class="h-5 w-7 object-cover"
                      loading="lazy"
                    />

                    @if (activeCountry.code === country.code) {
                      <span class="absolute -inset-2 border border-[#0f62fe]/40 animate-ping"></span>
                    }
                  </span>

                  @if (activeCountry.code === country.code) {
                    <span class="absolute left-1/2 top-[44px] -translate-x-1/2 whitespace-nowrap bg-[#0f62fe] px-3 py-1.5 text-[11px] font-bold text-white shadow-lg">
                      {{ country.name }}
                    </span>
                  }
                </button>
              }

            </div>

            <!-- Active Country Detail and Opportunity Cards -->
            <div class="relative z-10 grid grid-cols-1 gap-4 p-5 lg:grid-cols-12">

              <!-- Country Intelligence Card -->
              <div class="border border-white/80 bg-white/85 p-5 shadow-sm backdrop-blur lg:col-span-4">
                <p class="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#0f62fe]">
                  Country Intelligence
                </p>

                <h4 class="text-[20px] font-bold tracking-[-0.035em] text-slate-950">
                  {{ activeCountry.headline }}
                </h4>

                <p class="mt-3 text-[12px] leading-relaxed text-slate-600">
                  {{ activeCountry.description }}
                </p>

                <div class="mt-4 space-y-2">
                  @for (item of activeCountry.opportunities; track item) {
                    <div class="flex items-start gap-3 border border-slate-100 bg-slate-50 p-2.5">
                      <span class="mt-1.5 h-2 w-2 shrink-0 bg-[#0f62fe]"></span>
                      <p class="text-[11.5px] font-medium leading-relaxed text-slate-700">
                        {{ item }}
                      </p>
                    </div>
                  }
                </div>
              </div>

              <!-- Partner / Pathway Cards -->
              <div class="lg:col-span-8">
                <div class="mb-3 flex items-center justify-between">
                  <h4 class="text-[17px] font-bold tracking-[-0.03em] text-slate-950">
                    Recommended Pathways
                  </h4>

                  <a href="#" class="text-[12px] font-bold text-[#0f62fe] hover:text-[#0043ce]">
                    View all →
                  </a>
                </div>

                <div class="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                  @for (card of partnerCards; track card.title + $index) {
                    <div class="flex min-h-[180px] flex-col border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:border-[#0f62fe] hover:shadow-md">

                      <div class="mb-4 flex h-10 w-10 items-center justify-center border border-slate-200 bg-slate-50">
                        <img
                          [src]="card.logoUrl"
                          alt="Logo"
                          class="max-h-full max-w-full object-contain"
                          loading="lazy"
                          onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                        />
                        <span class="hidden h-full w-full items-center justify-center text-[12px] font-bold text-[#0f62fe]">
                          C360
                        </span>
                      </div>

                      <p class="mb-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#0f62fe]">
                        {{ card.category }}
                      </p>

                      <h4 class="mb-2 text-[14px] font-bold leading-tight text-slate-900">
                        {{ card.title }}
                      </h4>

                      <div class="mb-3 flex items-center gap-2 text-[10.5px] font-medium text-slate-600">
                        <span>{{ card.rating }} rating</span>
                        <span class="h-1 w-1 rounded-full bg-slate-300"></span>
                        <span>{{ card.reviews }} Reviews</span>
                      </div>

                      <p class="mb-4 text-[11.5px] leading-relaxed text-slate-500">
                        {{ card.description }}
                      </p>

                      <button class="mt-auto w-full border border-blue-200 py-2 text-[11.5px] font-bold text-[#0f62fe] transition-colors hover:border-[#0f62fe] hover:bg-blue-50">
                        Explore pathway
                      </button>
                    </div>
                  }
                </div>
              </div>

            </div>

            <!-- Zoom Controls -->
            <div class="absolute right-5 top-[82px] z-30 flex flex-col gap-2">
              <button
                type="button"
                class="flex h-8 w-8 items-center justify-center border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
              >
                +
              </button>

              <button
                type="button"
                class="flex h-8 w-8 items-center justify-center border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
              >
                −
              </button>
            </div>

          </main>

        </div>
      </div>
    </section>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

    .font-main {
      font-family: 'Poppins', Helvetica, Arial, sans-serif;
    }

    .hide-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }

    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
  `]
})
export class CountrySearchComponent {

  activeTab = 'Europe';
  searchTerm = '';
  activeCountryCode = 'DE';

  continents = ['Europe', 'Asia', 'Middle East', 'North America'];

  countries: Country[] = [
    {
      name: 'Germany',
      code: 'DE',
      continent: 'Europe',
      flagUrl: 'https://flagcdn.com/w80/de.png',
      headline: 'Ausbildung, public universities and strong career pathways',
      description: 'Germany is ideal for Ausbildung, engineering, healthcare, IT, public universities and structured long-term career mobility.',
      mapX: 49,
      mapY: 38,
      opportunities: [
        'Ausbildung sectors: healthcare, hospitality, logistics, retail and IT.',
        'Strong public university and applied sciences ecosystem.',
        'German language readiness is a key success factor.'
      ],
      stats: [
        { label: 'Ausbildung', value: 'High' },
        { label: 'Study ROI', value: 'High' },
        { label: 'Language', value: 'A2-B1' }
      ]
    },
    {
      name: 'United Kingdom',
      code: 'GB',
      continent: 'Europe',
      flagUrl: 'https://flagcdn.com/w80/gb.png',
      headline: 'Globally recognised degrees and shorter study routes',
      description: 'The UK is suitable for students seeking university brand value, global exposure, shorter academic timelines and strong alumni networks.',
      mapX: 42,
      mapY: 36,
      opportunities: [
        'Strong for business, law, finance, healthcare and creative fields.',
        'Shorter master program duration in many institutions.',
        'Good destination for brand-sensitive student profiles.'
      ],
      stats: [
        { label: 'Study Route', value: 'PG' },
        { label: 'Duration', value: 'Short' },
        { label: 'Brand', value: 'High' }
      ]
    },
    {
      name: 'France',
      code: 'FR',
      continent: 'Europe',
      flagUrl: 'https://flagcdn.com/w80/fr.png',
      headline: 'Business, hospitality, fashion and European mobility',
      description: 'France is a strong destination for students exploring management, hospitality, luxury, design, culinary and European academic exposure.',
      mapX: 45,
      mapY: 43,
      opportunities: [
        'Relevant for business, hospitality, culinary and design fields.',
        'Good European exposure with international campuses.',
        'French language can strengthen long-term employability.'
      ],
      stats: [
        { label: 'Fields', value: 'Business' },
        { label: 'Mobility', value: 'EU' },
        { label: 'Value', value: 'Good' }
      ]
    },
    {
      name: 'Italy',
      code: 'IT',
      continent: 'Europe',
      flagUrl: 'https://flagcdn.com/w80/it.png',
      headline: 'Affordable education, design, medicine and hospitality routes',
      description: 'Italy is useful for students comparing affordability, medicine, architecture, design, culinary and European lifestyle.',
      mapX: 51,
      mapY: 49,
      opportunities: [
        'Good for medicine, design, architecture and hospitality.',
        'Attractive tuition-cost balance compared to some destinations.',
        'European exposure with culturally rich academic environment.'
      ],
      stats: [
        { label: 'Cost', value: 'Good' },
        { label: 'Fields', value: 'Wide' },
        { label: 'Lifestyle', value: 'High' }
      ]
    },
    {
      name: 'Canada',
      code: 'CA',
      continent: 'North America',
      flagUrl: 'https://flagcdn.com/w80/ca.png',
      headline: 'Study, co-op education and migration-linked pathways',
      description: 'Canada supports students looking for diploma, UG, PG, co-op education and structured long-term settlement planning.',
      mapX: 21,
      mapY: 31,
      opportunities: [
        'Good fit for diploma, UG, PG and co-op based programs.',
        'Student-friendly destination with multicultural ecosystem.',
        'Popular among candidates planning long-term migration.'
      ],
      stats: [
        { label: 'Co-op', value: 'Yes' },
        { label: 'Migration', value: 'Strong' },
        { label: 'Fit', value: 'High' }
      ]
    },
    {
      name: 'Australia',
      code: 'AU',
      continent: 'Asia',
      flagUrl: 'https://flagcdn.com/w80/au.png',
      headline: 'Industry-linked programs and strong student lifestyle',
      description: 'Australia is useful for practical education, employability-linked programs, campus life and international exposure.',
      mapX: 78,
      mapY: 76,
      opportunities: [
        'Strong options in healthcare, IT, business and hospitality.',
        'Good campus lifestyle and student support infrastructure.',
        'Popular for students seeking employability-focused education.'
      ],
      stats: [
        { label: 'Lifestyle', value: 'High' },
        { label: 'Programs', value: 'Wide' },
        { label: 'Work', value: 'Yes' }
      ]
    },
    {
      name: 'UAE',
      code: 'AE',
      continent: 'Middle East',
      flagUrl: 'https://flagcdn.com/w80/ae.png',
      headline: 'Regional career hub for jobs, business and education',
      description: 'UAE is a practical destination for Gulf jobs, business programs, professional upskilling and regional employer access.',
      mapX: 62,
      mapY: 57,
      opportunities: [
        'Strong for business, hospitality, logistics and service sectors.',
        'Useful for Gulf job pathways and professional networking.',
        'Regional hub for employers and career mobility.'
      ],
      stats: [
        { label: 'Jobs', value: 'High' },
        { label: 'Business', value: 'Strong' },
        { label: 'Hub', value: 'GCC' }
      ]
    },
    {
      name: 'India',
      code: 'IN',
      continent: 'Asia',
      flagUrl: 'https://flagcdn.com/w80/in.png',
      headline: 'Source market for training, counselling and documentation',
      description: 'India is a major source market for Ausbildung counselling, German training, study abroad preparation and candidate documentation.',
      mapX: 67,
      mapY: 58,
      opportunities: [
        'German language training and career counselling hub.',
        'Candidate sourcing for Ausbildung, jobs and study abroad.',
        'Documentation and readiness preparation before migration.'
      ],
      stats: [
        { label: 'Source', value: 'High' },
        { label: 'Training', value: 'A1-B1' },
        { label: 'Market', value: 'Large' }
      ]
    }
  ];

  partnerCards: PartnerCard[] = [
    {
      title: 'Ausbildung Germany Pathway',
      category: 'Vocational Route',
      rating: '4.8',
      reviews: '2k+',
      description: 'Healthcare, hospitality, retail, logistics and IT Ausbildung guidance.',
      logoUrl: 'assets/logo-ue.png'
    },
    {
      title: 'Study Abroad Counselling',
      category: 'University Route',
      rating: '4.7',
      reviews: '3k+',
      description: 'University shortlisting, SOP support, documentation and visa readiness.',
      logoUrl: 'assets/logo-ue.png'
    },
    {
      title: 'International Jobs Pipeline',
      category: 'Career Route',
      rating: '4.6',
      reviews: '1.5k+',
      description: 'CV building, employer matching, interview readiness and relocation support.',
      logoUrl: 'assets/logo-dtdc.png'
    }
  ];

  get filteredCountries(): Country[] {
    const term = this.searchTerm.trim().toLowerCase();

    return this.countries.filter(country => {
      const matchesTab = country.continent === this.activeTab;
      const matchesSearch =
        !term ||
        country.name.toLowerCase().includes(term) ||
        country.continent.toLowerCase().includes(term);

      return matchesTab && matchesSearch;
    });
  }

  get activeCountry(): Country {
    return this.countries.find(country => country.code === this.activeCountryCode) || this.countries[0];
  }

  setTab(tab: string): void {
    this.activeTab = tab;

    const firstCountry = this.countries.find(country => country.continent === tab);

    if (firstCountry) {
      this.activeCountryCode = firstCountry.code;
    }
  }

  selectCountry(code: string): void {
    this.activeCountryCode = code;

    const selectedCountry = this.countries.find(country => country.code === code);

    if (selectedCountry) {
      this.activeTab = selectedCountry.continent;
    }
  }

  setSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
  }
}