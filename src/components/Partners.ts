import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PartnerLogo {
  id: string;
  name: string;
  short: string;
  category: 'Employers' | 'Universities' | 'Institutions' | 'Agents';
}

interface PartnerTab {
  label: 'Employers' | 'Universities' | 'Institutions' | 'Agents';
}

@Component({
  selector: 'app-partner-logo-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="font-main bg-white py-14 lg:py-20">
      <div class="max-w-[1584px] mx-auto px-6 lg:px-12 xl:px-16 2xl:px-20">

        <!-- Section Heading -->
        <div class="mb-7">
          <h2 class="text-[28px] lg:text-[36px] font-semibold text-[#161616] tracking-[-0.04em]">
            Partners
          </h2>
        </div>

        <!-- Tabs -->
        <div class="grid grid-cols-2 lg:grid-cols-4 border border-[#e0e0e0] mb-10">
          @for (tab of tabs; track tab.label) {
            <button
              class="partner-tab"
              [class.active-tab]="activeTab === tab.label"
              (click)="setTab(tab.label)"
            >
              {{ tab.label }}
            </button>
          }
        </div>

        <!-- Main Partner Content -->
        <div class="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-14 items-start mb-8">

          <!-- Left Text -->
          <div class="pt-2">
            <h3 class="text-[28px] lg:text-[34px] font-medium text-[#161616] tracking-[-0.04em] mb-5">
              Partners
            </h3>

            <p class="max-w-[620px] text-[13.5px] lg:text-[14px] text-[#525252] leading-relaxed mb-8">
              A Design System is a comprehensive framework that standardizes the design and development of a platform. It provides a set of reusable components, guidelines, and principles to align the efforts of designers and developers in a centralized repository of visual, functional, and interactive elements, including style guides, component libraries, typography, color schemes, and interaction patterns.
            </p>

            <a href="#" class="inline-flex items-center gap-2 text-[13px] font-medium text-[#0f62fe] hover:text-[#0043ce] transition-colors">
              Learn AltusCareer programs, International
              <span class="text-[17px] leading-none">→</span>
            </a>
          </div>

          <!-- Right Logo Board -->
          <div class="relative bg-[#f4f4f4] min-h-[360px] p-7 lg:p-9 flex items-center justify-center">

            <!-- Left Control -->
            <button class="logo-nav logo-nav-left" aria-label="Previous partners">
              ‹
            </button>

            <!-- Logos Grid -->
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-7 w-full max-w-[520px]">
              @for (partner of filteredPartners(); track partner.id) {
                <div class="partner-logo-card">

                  <div class="partner-mark">
                    {{ partner.short }}
                  </div>

                  <div>
                    <p class="text-[11px] font-semibold text-[#161616] leading-tight">
                      {{ partner.name }}
                    </p>
                    <p class="text-[9.5px] text-[#6f6f6f] mt-0.5">
                      {{ partner.category }}
                    </p>
                  </div>

                </div>
              }
            </div>

            <!-- Right Control -->
            <button class="logo-nav logo-nav-right" aria-label="Next partners">
              ›
            </button>

          </div>

        </div>

        <!-- Bottom CTA Banner -->
        <div class="bg-[#e8daff] border border-[#d0bfff] min-h-[92px] grid grid-cols-1 lg:grid-cols-[300px_1fr_auto] items-center gap-5 px-5 lg:px-7 py-5">

          <!-- Image Strip -->
          <div class="hidden lg:block h-[64px] overflow-hidden bg-white border border-[#d8d8d8]">
            <img
              src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Partner discussion"
              class="w-full h-full object-cover"
            />
          </div>

          <!-- CTA Text -->
          <div>
            <h4 class="text-[18px] font-semibold text-[#161616] tracking-[-0.02em] mb-1">
              Investors Relations
            </h4>

            <p class="max-w-[620px] text-[12.5px] text-[#393939] leading-relaxed">
              Programs, international jobs, study abroad options, German training and guided career support based on your country.
            </p>
          </div>

          <!-- CTA Button -->
          <a
            href="#"
            class="h-[46px] min-w-[210px] px-6 border border-[#0f62fe] text-[#0f62fe] bg-transparent hover:bg-[#0f62fe] hover:text-white transition-colors flex items-center justify-between gap-8 text-[13px] font-medium"
          >
            Become a Partner
            <span class="text-[18px] leading-none">→</span>
          </a>

        </div>

      </div>
    </section>
  `,
  styles: [`
    .font-main {
      font-family: 'Poppins', Helvetica, Arial, sans-serif;
    }

    .partner-tab {
      min-height: 76px;
      background: #f4f4f4;
      border-right: 1px solid #e0e0e0;
      color: #161616;
      font-size: 16px;
      font-weight: 400;
      transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
    }

    .partner-tab:last-child {
      border-right: none;
    }

    .partner-tab:hover {
      background: #ffffff;
      color: #0f62fe;
    }

    .active-tab {
      background: #ffffff !important;
      color: #161616 !important;
      box-shadow: inset 0 -3px 0 #0f62fe;
      font-weight: 500;
    }

    .partner-logo-card {
      min-height: 48px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .partner-mark {
      width: 32px;
      height: 32px;
      border-radius: 999px;
      background: #edf5ff;
      border: 1px solid #bae6ff;
      color: #0f62fe;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: 700;
      flex-shrink: 0;
    }

    .logo-nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 28px;
      height: 28px;
      border-radius: 999px;
      background: #a7f3d0;
      color: #047857;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 21px;
      line-height: 1;
      transition: background 0.15s ease, color 0.15s ease;
    }

    .logo-nav:hover {
      background: #0f62fe;
      color: #ffffff;
    }

    .logo-nav-left {
      left: 14px;
    }

    .logo-nav-right {
      right: 14px;
    }

    @media (max-width: 1023px) {
      .partner-tab {
        min-height: 60px;
        font-size: 14px;
      }

      .logo-nav-left {
        left: 8px;
      }

      .logo-nav-right {
        right: 8px;
      }
    }
  `]
})
export class PartnerLogoSectionComponent {
  activeTab: PartnerTab['label'] = 'Employers';

  tabs: PartnerTab[] = [
    { label: 'Employers' },
    { label: 'Universities' },
    { label: 'Institutions' },
    { label: 'Agents' }
  ];

  partners: PartnerLogo[] = [
    {
      id: 'p1',
      name: 'Altus Career',
      short: 'AC',
      category: 'Employers'
    },
    {
      id: 'p2',
      name: 'EU Talent Group',
      short: 'ET',
      category: 'Employers'
    },
    {
      id: 'p3',
      name: 'The Future Law',
      short: 'FL',
      category: 'Employers'
    },
    {
      id: 'p4',
      name: 'UPES Global',
      short: 'UG',
      category: 'Universities'
    },
    {
      id: 'p5',
      name: 'German Academy',
      short: 'GA',
      category: 'Institutions'
    },
    {
      id: 'p6',
      name: 'University Connect',
      short: 'UC',
      category: 'Universities'
    },
    {
      id: 'p7',
      name: 'Career360 Group',
      short: 'C360',
      category: 'Employers'
    },
    {
      id: 'p8',
      name: 'International School',
      short: 'IS',
      category: 'Institutions'
    },
    {
      id: 'p9',
      name: 'UAE Future Jobs',
      short: 'UFJ',
      category: 'Agents'
    },
    {
      id: 'p10',
      name: 'Global Recruiters',
      short: 'GR',
      category: 'Agents'
    },
    {
      id: 'p11',
      name: 'Medica Careers',
      short: 'MC',
      category: 'Employers'
    },
    {
      id: 'p12',
      name: 'Peak Academy',
      short: 'PA',
      category: 'Institutions'
    }
  ];

  setTab(tab: PartnerTab['label']) {
    this.activeTab = tab;
  }

  filteredPartners() {
    const filtered = this.partners.filter(partner => partner.category === this.activeTab);

    if (filtered.length >= 6) {
      return filtered;
    }

    return this.partners.slice(0, 12);
  }
}