import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Site {
  title: string;
  subtitle: string;
  description: string;
  top: string;
  left: string;
}

interface Country {
  name: string;
  code: string;
  flagUrl: string;
  count: number;
  top: string;
  left: string;
  sites: Site[];
}

@Component({
  selector: 'app-contact-map',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="font-main max-w-[1584px] mx-auto px-6 lg:px-8 xl:px-16 2xl:px-20 py-8">

      <div class="mb-5">
        <p class="text-xs uppercase tracking-[0.22em] text-[#0f62fe] font-bold mb-2">
          Global Network
        </p>

        <h2 class="text-3xl md:text-4xl font-semibold text-[#161616]">
          AltusCareer Worldwide Presence
        </h2>

        <p class="max-w-3xl mt-3 text-[#525252] text-sm md:text-base leading-relaxed">
          Explore countries, operating hubs, representative offices, sales centres,
          training locations, and partner touchpoints across the global delivery network.
        </p>
      </div>

      <div class="w-full h-[460px] md:h-[500px] lg:h-[540px] flex flex-col lg:flex-row border border-[#e0e0e0] shadow-[0_12px_36px_rgba(15,23,42,0.08)] overflow-hidden bg-white">

        <!-- MAP AREA -->
        <div class="relative flex-1 h-full overflow-hidden map-enterprise-bg">

          <!-- Real World Map Background -->
          <div class="absolute inset-0 pointer-events-none">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg"
              alt="World map background"
              class="real-map-image"
            />
          </div>

          <!-- Blue Enterprise Overlay -->
          <div class="absolute inset-0 map-blue-overlay pointer-events-none"></div>

          <!-- Grid Overlay -->
          <div
            class="absolute inset-0 opacity-[0.10] pointer-events-none"
            style="background-image: linear-gradient(to right, #0f62fe 1px, transparent 1px), linear-gradient(to bottom, #0f62fe 1px, transparent 1px); background-size: 48px 48px;"
          ></div>

          <!-- Country Markers -->
          @for (country of countries; track country.name) {
            <button
              type="button"
              class="absolute z-20 -translate-x-1/2 -translate-y-1/2 group"
              [style.top]="country.top"
              [style.left]="country.left"
              (click)="selectCountry(country)"
              [attr.aria-label]="'Select ' + country.name"
            >
              <div
                class="map-marker"
                [ngClass]="selectedCountry?.name === country.name ? 'map-marker-active' : ''"
              >
                <span class="flag-circle">
                  <img
                    [src]="country.flagUrl"
                    [alt]="country.name + ' flag'"
                    class="w-full h-full object-cover"
                  />
                </span>

                <span class="marker-count">
                  {{ country.count }}
                </span>
              </div>

              <div class="absolute left-1/2 -translate-x-1/2 top-[48px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div class="bg-white text-[#161616] text-[11px] font-bold px-2.5 py-1.5 shadow-md whitespace-nowrap border border-[#e0e0e0] flex items-center gap-1.5">
                  <span class="inline-flex w-5 h-3 border border-[#e0e0e0] overflow-hidden shrink-0">
                    <img
                      [src]="country.flagUrl"
                      [alt]="country.name + ' flag'"
                      class="w-full h-full object-cover"
                    />
                  </span>

                  <span>
                    {{ country.name }}
                  </span>
                </div>
              </div>
            </button>
          }

          <!-- Selected Country Site Pins -->
          @if (selectedCountry) {
            <div class="absolute inset-0 z-10 bg-white/10 backdrop-blur-[1px] animate-fade-in">

              @for (site of selectedCountry.sites; track site.title) {
                <div
                  class="absolute flex flex-col items-center -translate-x-1/2 -translate-y-full cursor-pointer group"
                  [style.top]="site.top"
                  [style.left]="site.left"
                >
                  <div class="relative">
                    <div class="absolute inset-0 rounded-full bg-[#0f62fe]/25 animate-ping"></div>

                    <div class="relative w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-xl border-2 border-white group-hover:scale-110 transition-transform z-10 overflow-hidden">
                      <img
                        [src]="selectedCountry.flagUrl"
                        [alt]="selectedCountry.name + ' flag'"
                        class="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div class="mt-2 bg-white px-3 py-2 text-left shadow-xl min-w-[180px] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all border border-[#e0e0e0]">
                    <p class="text-[12px] font-bold text-[#0f62fe] leading-tight">
                      {{ site.title }}
                    </p>

                    <p class="text-[11px] text-[#525252] mt-1 leading-snug">
                      {{ site.subtitle }}
                    </p>
                  </div>
                </div>
              }

              @if (selectedCountry.sites.length === 0) {
                <div class="absolute inset-0 flex items-center justify-center px-6">
                  <div class="max-w-sm text-center bg-white/95 backdrop-blur-md shadow-xl border border-[#e0e0e0] p-6">
                    <div class="selected-empty-flag mx-auto mb-4">
                      <img
                        [src]="selectedCountry.flagUrl"
                        [alt]="selectedCountry.name + ' flag'"
                        class="w-full h-full object-cover"
                      />
                    </div>

                    <h3 class="text-xl font-bold text-[#161616]">
                      {{ selectedCountry.name }}
                    </h3>

                    <p class="text-sm text-[#525252] mt-2 leading-relaxed">
                      Country-level presence is listed. Detailed site-level records can be added
                      in the operating master data.
                    </p>
                  </div>
                </div>
              }
            </div>
          }

          <!-- Map Controls -->
          <div class="absolute bottom-4 left-4 z-30 flex items-center gap-2">
            <button
              type="button"
              class="w-8 h-8 bg-white text-[#0f62fe] shadow-md font-bold hover:bg-[#0f62fe] hover:text-white transition-colors border border-[#e0e0e0]"
            >
              +
            </button>

            <button
              type="button"
              class="w-8 h-8 bg-white text-[#0f62fe] shadow-md font-bold hover:bg-[#0f62fe] hover:text-white transition-colors border border-[#e0e0e0]"
            >
              -
            </button>
          </div>

          <!-- Legend -->
          <div class="absolute bottom-4 right-4 z-30 hidden md:flex items-center gap-2 bg-white/95 backdrop-blur-md px-3 py-2 shadow-md border border-[#e0e0e0]">
            <span class="w-5 h-5 rounded-full bg-white border border-[#0f62fe] flex items-center justify-center overflow-hidden">
              <img
                src="https://flagcdn.com/w80/de.png"
                alt="Flag icon"
                class="w-full h-full object-cover"
              />
            </span>

            <span class="text-xs font-semibold text-[#525252]">
              Country / Site Touchpoint
            </span>
          </div>
        </div>

        <!-- SIDE PANEL -->
        <aside class="w-full lg:w-[340px] h-full bg-[#f4f4f4] shrink-0 flex flex-col border-l border-[#e0e0e0]">

          <!-- Country List View -->
          @if (!selectedCountry) {
            <div class="p-4 flex-1 overflow-y-auto no-scrollbar">

              <div class="flex items-center justify-between mb-4">
                <div>
                  <h3 class="text-[20px] font-semibold text-[#161616]">
                    Countries
                  </h3>

                  <p class="text-xs text-[#6f6f6f] mt-1">
                    Select a country to view sites
                  </p>
                </div>

                <div class="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-[#0f62fe] font-bold border border-[#e0e0e0]">
                  {{ totalSites }}
                </div>
              </div>

              <div class="grid grid-cols-1 gap-2">
                @for (country of countries; track country.name) {
                  <button
                    type="button"
                    class="group w-full flex items-center justify-between gap-3 bg-white hover:bg-[#0f62fe] border border-[#e0e0e0] px-3 py-2 text-left shadow-sm transition-all duration-300"
                    (click)="selectCountry(country)"
                  >
                    <div class="flex items-center gap-3 min-w-0">
                      <span class="country-list-flag">
                        <img
                          [src]="country.flagUrl"
                          [alt]="country.name + ' flag'"
                          class="w-full h-full object-cover"
                        />
                      </span>

                      <div class="min-w-0">
                        <p class="text-[14px] font-bold text-[#161616] group-hover:text-white truncate">
                          {{ country.name }}
                        </p>

                        <p class="text-[11px] text-[#6f6f6f] group-hover:text-blue-100 truncate">
                          {{ country.count }} touchpoint{{ country.count > 1 ? 's' : '' }}
                        </p>
                      </div>
                    </div>

                    <span class="w-7 h-7 rounded-full bg-[#0f62fe] text-white text-[11px] font-bold flex items-center justify-center shadow-sm group-hover:bg-white group-hover:text-[#0f62fe] shrink-0">
                      {{ country.count }}
                    </span>
                  </button>
                }
              </div>
            </div>
          }

          <!-- Selected Country Detail View -->
          @if (selectedCountry) {
            <div class="p-4 flex-1 overflow-y-auto no-scrollbar animate-fade-in">

              <button
                type="button"
                class="inline-flex items-center gap-2 text-[#161616] hover:text-[#0f62fe] transition-colors mb-4"
                (click)="goBack()"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  ></path>
                </svg>

                <span class="text-xs font-bold">
                  Back to countries
                </span>
              </button>

              <div class="bg-white p-4 shadow-sm border border-[#e0e0e0] mb-4">
                <div class="flex items-center gap-4">
                  <div class="selected-country-flag">
                    <img
                      [src]="selectedCountry.flagUrl"
                      [alt]="selectedCountry.name + ' flag'"
                      class="w-full h-full object-cover"
                    />
                  </div>

                  <div class="flex-1 min-w-0">
                    <p class="text-[10px] uppercase tracking-[0.18em] text-[#0f62fe] font-bold mb-1">
                      Selected Market
                    </p>

                    <h3 class="text-2xl font-semibold text-[#161616] truncate">
                      {{ selectedCountry.name }}
                    </h3>

                    <p class="text-xs text-[#6f6f6f] mt-1">
                      {{ selectedCountry.count }} registered touchpoint{{ selectedCountry.count > 1 ? 's' : '' }}
                    </p>
                  </div>
                </div>
              </div>

              <div class="flex bg-white p-1 mb-4 shadow-sm border border-[#e0e0e0]">
                <button
                  type="button"
                  class="flex-1 px-3 py-2 text-[12px] font-bold text-[#6f6f6f] hover:text-[#161616] transition-colors"
                >
                  Overview
                </button>

                <button
                  type="button"
                  class="flex-1 px-3 py-2 text-[12px] font-bold bg-[#0f62fe] text-white shadow-sm"
                >
                  Sites ({{ selectedCountry.count }})
                </button>
              </div>

              @if (selectedCountry.sites.length > 0) {
                <div class="flex flex-col gap-2">
                  @for (site of selectedCountry.sites; track site.title) {
                    <article class="bg-white p-3 shadow-sm border border-[#e0e0e0] hover:shadow-md transition-shadow">
                      <div class="flex items-start gap-3">
                        <div class="site-list-flag">
                          <img
                            [src]="selectedCountry.flagUrl"
                            [alt]="selectedCountry.name + ' flag'"
                            class="w-full h-full object-cover"
                          />
                        </div>

                        <div>
                          <h4 class="text-[13px] font-bold text-[#161616] leading-tight">
                            {{ site.title }}
                          </h4>

                          <h5 class="text-[12px] font-bold text-[#525252] mt-1 leading-tight">
                            {{ site.subtitle }}
                          </h5>

                          <p class="text-[11.5px] text-[#6f6f6f] leading-relaxed mt-2">
                            {{ site.description }}
                          </p>
                        </div>
                      </div>
                    </article>
                  }
                </div>
              }

              @if (selectedCountry.sites.length === 0) {
                <div class="bg-white p-4 shadow-sm border border-[#e0e0e0]">
                  <h4 class="text-base font-bold text-[#161616]">
                    Site data not yet configured
                  </h4>

                  <p class="text-xs text-[#525252] mt-2 leading-relaxed">
                    This country is active at country level. Add branch, sales office,
                    training centre, partner office, or representative office records to
                    make the map operationally complete.
                  </p>
                </div>
              }

            </div>
          }

        </aside>

      </div>
    </section>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

    .font-main {
      font-family: 'Roboto', Helvetica, Arial, sans-serif;
    }

    .map-enterprise-bg {
      background:
        linear-gradient(135deg, #edf5ff 0%, #d0e2ff 42%, #a6c8ff 100%);
    }

    .real-map-image {
      width: 112%;
      height: 112%;
      object-fit: contain;
      object-position: center;
      opacity: 0.52;
      filter:
        sepia(1)
        saturate(5)
        hue-rotate(175deg)
        brightness(0.92)
        contrast(1.12);
      transform: translate(-3%, -4%);
    }

    .map-blue-overlay {
      background:
        linear-gradient(
          135deg,
          rgba(15, 98, 254, 0.16),
          rgba(255, 255, 255, 0.15)
        ),
        radial-gradient(
          circle at 20% 18%,
          rgba(255, 255, 255, 0.62),
          transparent 34%
        ),
        radial-gradient(
          circle at 78% 30%,
          rgba(255, 255, 255, 0.26),
          transparent 30%
        ),
        radial-gradient(
          circle at 52% 70%,
          rgba(15, 98, 254, 0.13),
          transparent 38%
        );
    }

    .map-marker {
      position: relative;
      width: 44px;
      height: 44px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.96);
      border: 2px solid #ffffff;
      box-shadow:
        0 10px 24px rgba(15, 23, 42, 0.16),
        0 0 0 6px rgba(15, 98, 254, 0.10);
      display: flex;
      align-items: center;
      justify-content: center;
      transition:
        transform 0.25s ease,
        box-shadow 0.25s ease,
        border-color 0.25s ease,
        background 0.25s ease;
    }

    .map-marker:hover,
    .map-marker-active {
      transform: scale(1.12);
      background: #0f62fe;
      border-color: #ffffff;
      box-shadow:
        0 16px 34px rgba(15, 98, 254, 0.34),
        0 0 0 8px rgba(15, 98, 254, 0.16);
    }

    .flag-circle {
      width: 32px;
      height: 32px;
      border-radius: 999px;
      background: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      border: 1px solid rgba(224, 224, 224, 0.95);
    }

    .marker-count {
      position: absolute;
      right: -7px;
      top: -7px;
      min-width: 19px;
      height: 19px;
      padding: 0 5px;
      border-radius: 999px;
      background: #161616;
      color: #ffffff;
      border: 2px solid #ffffff;
      font-size: 10px;
      font-weight: 700;
      line-height: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 6px 14px rgba(15, 23, 42, 0.22);
    }

    .country-list-flag {
      width: 44px;
      height: 44px;
      border-radius: 999px;
      background: #ffffff;
      border: 1px solid #e0e0e0;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      flex-shrink: 0;
      box-shadow: 0 4px 10px rgba(15, 23, 42, 0.08);
    }

    .selected-country-flag {
      width: 88px;
      height: 56px;
      background: #ffffff;
      border: 1px solid #e0e0e0;
      overflow: hidden;
      flex-shrink: 0;
      box-shadow: 0 6px 16px rgba(15, 23, 42, 0.10);
    }

    .selected-empty-flag {
      width: 88px;
      height: 56px;
      background: #ffffff;
      border: 1px solid #e0e0e0;
      overflow: hidden;
      box-shadow: 0 6px 16px rgba(15, 23, 42, 0.10);
    }

    .site-list-flag {
      width: 34px;
      height: 34px;
      border-radius: 999px;
      background: #ffffff;
      border: 1px solid #e0e0e0;
      overflow: hidden;
      flex-shrink: 0;
      box-shadow: 0 4px 10px rgba(15, 23, 42, 0.08);
    }

    .no-scrollbar {
      scrollbar-width: none;
      -ms-overflow-style: none;
    }

    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }

    .animate-fade-in {
      animation: fadeIn 0.24s ease-out forwards;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateX(10px);
      }

      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
  `]
})
export class ContactMapComponent {

  selectedCountry: Country | null = null;

  countries: Country[] = [
    {
      name: 'Canada',
      code: 'CA',
      flagUrl: 'https://flagcdn.com/w160/ca.png',
      count: 4,
      top: '31%',
      left: '22%',
      sites: [
        {
          title: 'Representative office in Toronto',
          subtitle: 'Country Advisory Office',
          description: 'Candidate advisory, healthcare pathway coordination, and institutional relationship support.',
          top: '35%',
          left: '25%'
        },
        {
          title: 'Partner desk in Vancouver',
          subtitle: 'Regional Candidate Support Desk',
          description: 'Regional student and skilled-worker counselling support.',
          top: '34%',
          left: '17%'
        }
      ]
    },
    {
      name: 'Korea',
      code: 'KR',
      flagUrl: 'https://flagcdn.com/w160/kr.png',
      count: 1,
      top: '40%',
      left: '78%',
      sites: [
        {
          title: 'Representative office in Seoul',
          subtitle: 'Regional Partner Office',
          description: 'Country-level representation for partner development and candidate engagement.',
          top: '42%',
          left: '76%'
        }
      ]
    },
    {
      name: 'Latvia',
      code: 'LV',
      flagUrl: 'https://flagcdn.com/w160/lv.png',
      count: 1,
      top: '28%',
      left: '53%',
      sites: [
        {
          title: 'Representative office in Riga',
          subtitle: 'European Coordination Desk',
          description: 'Support office for European relationship management and partner coordination.',
          top: '31%',
          left: '52%'
        }
      ]
    },
    {
      name: 'Malaysia',
      code: 'MY',
      flagUrl: 'https://flagcdn.com/w160/my.png',
      count: 1,
      top: '58%',
      left: '72%',
      sites: [
        {
          title: 'Partner office in Kuala Lumpur',
          subtitle: 'Student Advisory and Partner Support',
          description: 'Local candidate support, institutional outreach, and enquiry handling.',
          top: '59%',
          left: '72%'
        }
      ]
    },
    {
      name: 'Mexico',
      code: 'MX',
      flagUrl: 'https://flagcdn.com/w160/mx.png',
      count: 6,
      top: '48%',
      left: '20%',
      sites: [
        {
          title: 'Country office in Mexico City',
          subtitle: 'Sales and Candidate Advisory Office',
          description: 'Primary country-level office for admissions, counselling, and partner activation.',
          top: '50%',
          left: '23%'
        },
        {
          title: 'Regional office in Monterrey',
          subtitle: 'North Region Support Desk',
          description: 'Regional employer, institution, and candidate coordination.',
          top: '43%',
          left: '21%'
        },
        {
          title: 'Partner office in Guadalajara',
          subtitle: 'Candidate Engagement Desk',
          description: 'Local lead nurturing, counselling support, and regional outreach.',
          top: '52%',
          left: '19%'
        }
      ]
    },
    {
      name: 'Myanmar',
      code: 'MM',
      flagUrl: 'https://flagcdn.com/w160/mm.png',
      count: 1,
      top: '53%',
      left: '68%',
      sites: [
        {
          title: 'Partner office in Yangon',
          subtitle: 'Candidate Sourcing Desk',
          description: 'Local support for student and workforce sourcing initiatives.',
          top: '54%',
          left: '68%'
        }
      ]
    },
    {
      name: 'Netherlands',
      code: 'NL',
      flagUrl: 'https://flagcdn.com/w160/nl.png',
      count: 5,
      top: '33%',
      left: '48%',
      sites: [
        {
          title: 'Representative office in Amsterdam',
          subtitle: 'European Business Development Desk',
          description: 'European business development, university coordination, and strategic partnerships.',
          top: '34%',
          left: '48%'
        },
        {
          title: 'Partner desk in Rotterdam',
          subtitle: 'Mobility and Employer Coordination',
          description: 'Employer-side coordination and mobility support functions.',
          top: '37%',
          left: '47%'
        }
      ]
    },
    {
      name: 'Norway',
      code: 'NO',
      flagUrl: 'https://flagcdn.com/w160/no.png',
      count: 3,
      top: '22%',
      left: '50%',
      sites: [
        {
          title: 'Representative office in Oslo',
          subtitle: 'Nordic Region Desk',
          description: 'Nordic market relationship management and institutional partnership support.',
          top: '24%',
          left: '50%'
        },
        {
          title: 'Partner desk in Bergen',
          subtitle: 'Regional Partnership Desk',
          description: 'Institutional outreach and regional employer coordination.',
          top: '25%',
          left: '47%'
        }
      ]
    },
    {
      name: 'Panama',
      code: 'PA',
      flagUrl: 'https://flagcdn.com/w160/pa.png',
      count: 6,
      top: '56%',
      left: '28%',
      sites: [
        {
          title: 'Partner office in Panama City',
          subtitle: 'Regional Coordination Office',
          description: 'Central America coordination for candidate sourcing and institutional relations.',
          top: '57%',
          left: '29%'
        },
        {
          title: 'Advisory desk in Colón',
          subtitle: 'Candidate Support Desk',
          description: 'Candidate support, document guidance, and enquiry management.',
          top: '55%',
          left: '30%'
        }
      ]
    },
    {
      name: 'Ukraine',
      code: 'UA',
      flagUrl: 'https://flagcdn.com/w160/ua.png',
      count: 2,
      top: '35%',
      left: '56%',
      sites: [
        {
          title: 'Legal entity in Kharkiv',
          subtitle: 'Sales Office and Engineering Office',
          description: 'Local signalling, sales, and regional engineering centre.',
          top: '38%',
          left: '60%'
        },
        {
          title: 'Representative office in Kyiv',
          subtitle: 'Country HQ and Sales Office',
          description: 'Sales office and country headquarters for Ukraine.',
          top: '34%',
          left: '56%'
        }
      ]
    }
  ];

  get totalSites(): number {
    return this.countries.reduce((total, country) => total + country.count, 0);
  }

  selectCountry(country: Country): void {
    this.selectedCountry = country;
  }

  goBack(): void {
    this.selectedCountry = null;
  }
}