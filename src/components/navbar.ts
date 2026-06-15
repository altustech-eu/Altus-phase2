import { Component } from '@angular/core';

type MenuKey = 'programs' | 'ausbildung' | 'jobs' | 'study-abroad' | 'tools' | 'pricing';
type SectionKey = string;

interface LinkGroup {
  heading: string;
  links: string[];
}

interface MegaSection {
  key: SectionKey;
  label: string;
  title: string;
  groups: LinkGroup[];
}

interface MegaMenu {
  title: string;
  subtitle: string;
  sections: MegaSection[];
}

interface LanguageOption {
  code: string;
  name: string;
  short: string;
}

@Component({
  selector: 'app-nav',
  standalone: true,
  template: `
    <header class="font-main bg-white sticky top-0 z-[9999] border-b border-[#e0e0e0]">

      <!-- Desktop Header -->
      <div class="hidden xl:flex h-[50px] items-center bg-white">

        <!-- Logo -->
        <div class="h-full w-[230px] flex items-center px-8 border-r border-[#e0e0e0]">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-[#0f62fe] text-white flex items-center justify-center text-sm font-bold">
              A
            </div>
            <div class="text-[16px] font-semibold tracking-tight text-[#161616]">
              Altus <span class="text-[#0f62fe]">Career</span>
            </div>
          </div>
        </div>

        <!-- Main Menu -->
        <nav class="h-full flex items-center text-[15px] text-[#393939]">

          @for (item of topMenus; track item.key) {
            <button
              class="desktop-nav-button"
              [class.active-nav]="openMenu === item.key"
              (mouseenter)="openTopMenu(item.key)"
              (click)="toggleMenu(item.key)"
            >
              {{ item.label }}
              <svg
                class="w-4 h-4 transition-transform"
                [class.rotate-180]="openMenu === item.key"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          }

          <button class="desktop-nav-button" (mouseenter)="closeMenu()">
            Events
          </button>

          <button class="desktop-nav-button" (mouseenter)="closeMenu()">
            About
          </button>

        </nav>

        <!-- Right Actions -->
        <div class="ml-auto h-full flex items-center text-[#393939]">

          <!-- Language Selector -->
          <div class="relative h-full">
            <button
              class="h-full px-4 flex items-center gap-2 hover:bg-[#f4f4f4] text-[#393939]"
              (click)="toggleLanguageDropdown()"
              aria-label="Language selector"
            >
              <svg
                class="w-[20px] h-[20px]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M2 12h20"></path>
                <path d="M12 2a15.3 15.3 0 0 1 0 20"></path>
                <path d="M12 2a15.3 15.3 0 0 0 0 20"></path>
              </svg>

              <span class="text-[13px] font-medium">
                {{ selectedLanguage.short }}
              </span>

              <svg
                class="w-3.5 h-3.5 transition-transform"
                [class.rotate-180]="isLanguageOpen"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            @if (isLanguageOpen) {
              <div class="absolute right-0 top-[50px] w-[220px] bg-white border border-[#e0e0e0] shadow-[0_8px_20px_rgba(0,0,0,0.12)] z-[10000]">
                @for (language of languages; track language.code) {
                  <button
                    class="language-option"
                    [class.active-language]="selectedLanguage.code === language.code"
                    (click)="selectLanguage(language)"
                  >
                    <span>{{ language.name }}</span>
                    <span class="text-[#6f6f6f]">{{ language.short }}</span>
                  </button>
                }
              </div>
            }
          </div>

          <button class="h-full w-[48px] flex items-center justify-center hover:bg-[#f4f4f4]" aria-label="Search">
            <svg class="w-[19px] h-[19px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">
              <circle cx="11" cy="11" r="7"></circle>
              <path d="M21 21l-4.3-4.3"></path>
            </svg>
          </button>
  

          <button class="h-full px-7 bg-[#0f62fe] text-white text-[14px] font-medium hover:bg-[#0043ce] transition-colors">
            Apply
          </button>

        </div>
      </div>

      <!-- Mobile Header -->
      <div class="xl:hidden h-[58px] flex items-center justify-between px-5 bg-white border-b border-[#e0e0e0]">

        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-[#0f62fe] text-white flex items-center justify-center text-sm font-bold">
            A
          </div>
          <div class="text-[15px] font-semibold text-[#161616]">
            Altus <span class="text-[#0f62fe]">Europass</span>
          </div>
        </div>

        <div class="flex items-center gap-4">

          <!-- Mobile Language Selector -->
          <button class="flex items-center gap-1 text-[#393939]" (click)="toggleLanguageDropdown()" aria-label="Language selector">
            <svg
              class="w-[20px] h-[20px]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M2 12h20"></path>
              <path d="M12 2a15.3 15.3 0 0 1 0 20"></path>
              <path d="M12 2a15.3 15.3 0 0 0 0 20"></path>
            </svg>
            <span class="text-[12px] font-medium">{{ selectedLanguage.short }}</span>
          </button>

          <button aria-label="Search">
            <svg class="w-[20px] h-[20px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">
              <circle cx="11" cy="11" r="7"></circle>
              <path d="M21 21l-4.3-4.3"></path>
            </svg>
          </button>

          <button class="text-2xl leading-none text-[#161616]" (click)="toggleMobileMenu()">
            @if (isMobileMenuOpen) { ✕ } @else { ☰ }
          </button>
        </div>

      </div>

      <!-- Mobile Language Dropdown -->
      @if (isLanguageOpen) {
        <div class="xl:hidden absolute top-[58px] right-4 w-[220px] bg-white border border-[#e0e0e0] shadow-[0_8px_20px_rgba(0,0,0,0.12)] z-[10000]">
          @for (language of languages; track language.code) {
            <button
              class="language-option"
              [class.active-language]="selectedLanguage.code === language.code"
              (click)="selectLanguage(language)"
            >
              <span>{{ language.name }}</span>
              <span class="text-[#6f6f6f]">{{ language.short }}</span>
            </button>
          }
        </div>
      }

      <!-- Mobile Menu -->
      @if (isMobileMenuOpen) {
        <div class="xl:hidden absolute top-[58px] left-0 right-0 bg-white shadow-2xl border-b border-[#e0e0e0] max-h-[86vh] overflow-y-auto z-[9999]">

          <nav class="flex flex-col text-[15px] text-[#161616]">

            @for (item of topMenus; track item.key) {
              <button class="mobile-nav-item" (click)="toggleMenu(item.key)">
                {{ item.label }}
                <span>⌄</span>
              </button>

              @if (openMenu === item.key) {
                <div class="mobile-submenu">

                  @for (section of megaMenus[item.key].sections; track section.key) {
                    <button class="mobile-section-title" (click)="setSection(section.key)">
                      {{ section.label }}
                    </button>

                    @if (activeSection === section.key) {
                      @for (group of section.groups; track group.heading) {
                        <div class="mobile-link-group">
                          <p>{{ group.heading }}</p>

                          @for (link of group.links; track $index) {
                            <a href="#">{{ link }}</a>
                          }
                        </div>
                      }
                    }
                  }

                </div>
              }
            }

            <button class="mobile-nav-item">Events</button>
            <button class="mobile-nav-item">About</button>

            <div class="p-5">
              <button class="w-full bg-[#0f62fe] text-white py-4 text-[15px] font-medium hover:bg-[#0043ce]">
                Apply Now
              </button>
            </div>

          </nav>

        </div>
      }

      <!-- Desktop Mega Menu -->
      @if (openMenu !== '' && !isMobileMenuOpen) {
        <div
          class="hidden xl:block absolute left-0 right-0 top-[50px] bg-white border-b border-[#e0e0e0] shadow-[0_8px_20px_rgba(0,0,0,0.12)] z-[9998]"
          (mouseleave)="closeMenu()"
        >

          <div class="max-w-[1360px] mx-auto px-6 lg:px-10 xl:px-12">
            <div class="grid grid-cols-[330px_1fr] min-h-[520px]">

              <!-- Left Main Heading Rail -->
              <aside class="border-r border-[#e0e0e0] bg-white flex flex-col justify-between">

                <div>
                  <div class="px-6 pt-6 pb-5 border-b border-[#e0e0e0]">
                    <p class="text-[12px] uppercase tracking-[0.22em] text-[#6f6f6f] font-semibold mb-2">
                      {{ megaMenus[openMenu].title }}
                    </p>

                    <h3 class="text-[22px] leading-tight text-[#161616] font-normal">
                      {{ megaMenus[openMenu].subtitle }}
                    </h3>
                  </div>

                  <div class="pt-3">
                    @for (section of megaMenus[openMenu].sections; track section.key) {
                      <button
                        class="mega-rail-item"
                        [class.active-rail]="activeSection === section.key"
                        (mouseenter)="setSection(section.key)"
                        (click)="setSection(section.key)"
                      >
                        {{ section.label }}
                        <span>→</span>
                      </button>
                    }
                  </div>
                </div>

                <button class="h-[56px] bg-[#0f62fe] text-white px-6 text-[15px] flex items-center justify-between hover:bg-[#0043ce] transition-colors">
                  Explore all products
                  <span class="text-xl leading-none">→</span>
                </button>

              </aside>

              <!-- Right Subheading Panel -->
              <main class="bg-white px-10 py-8 overflow-y-auto max-h-[calc(100vh-52px)]">

                @for (section of megaMenus[openMenu].sections; track section.key) {
                  @if (activeSection === section.key) {
                    <div class="mega-content">
                      <h2 class="mega-heading">
                        {{ section.title }} <span>→</span>
                      </h2>

                      <div class="mega-grid">
                        @for (group of section.groups; track group.heading) {
                          <div class="mega-link-group">
                            <h4 class="mega-group-title">
                              {{ group.heading }}
                            </h4>

                            <ul class="mega-link-list">
                              @for (link of group.links; track $index) {
                                <li>
                                  <a href="#">{{ link }}</a>
                                </li>
                              }
                            </ul>
                          </div>
                        }
                      </div>
                    </div>
                  }
                }

              </main>

            </div>
          </div>
        </div>
      }

    </header>
  `,
  styles: [`
    .font-main {
      font-family: 'Poppins', Helvetica, Arial, sans-serif;
    }

    .desktop-nav-button {
      height: 100%;
      padding: 0 20px;
      display: flex;
      align-items: center;
      gap: 8px;
      border: 1px solid transparent;
      transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
    }

    .desktop-nav-button:hover {
      background: #f4f4f4;
      color: #161616;
    }

    .active-nav {
      border-color: #0f62fe !important;
      color: #161616 !important;
      background: #ffffff !important;
    }

    .language-option {
      width: 100%;
      min-height: 42px;
      padding: 0 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      font-size: 14px;
      color: #393939;
      background: #ffffff;
      border-bottom: 1px solid #f4f4f4;
      transition: background 0.15s ease, color 0.15s ease;
    }

    .language-option:hover {
      background: #f4f4f4;
      color: #161616;
    }

    .active-language {
      background: #e0e0e0 !important;
      color: #161616 !important;
      font-weight: 600;
    }

    .mega-rail-item {
      width: 100%;
      min-height: 46px;
      padding: 12px 18px 12px 24px;
      text-align: left;
      font-size: 15px;
      color: #393939;
      background: #ffffff;
      transition: background 0.15s ease, color 0.15s ease;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }

    .mega-rail-item span {
      opacity: 0;
      transform: translateX(-4px);
      transition: all 0.15s ease;
    }

    .mega-rail-item:hover {
      background: #f4f4f4;
      color: #161616;
    }

    .mega-rail-item:hover span {
      opacity: 1;
      transform: translateX(0);
    }

    .active-rail {
      background: #e0e0e0 !important;
      color: #161616 !important;
      font-weight: 500;
    }

    .active-rail span {
      opacity: 1 !important;
      transform: translateX(0) !important;
    }

    .mega-heading {
      font-size: 30px;
      line-height: 1.2;
      font-weight: 400;
      color: #0f62fe;
      margin-bottom: 34px;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      letter-spacing: -0.02em;
    }

    .mega-heading span {
      font-size: 30px;
      line-height: 1;
    }

    .mega-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      column-gap: 46px;
      row-gap: 34px;
      max-width: 1050px;
    }

    .mega-link-group {
      min-width: 0;
    }

    .mega-group-title {
      color: #161616;
      font-size: 14px;
      line-height: 1.3;
      font-weight: 600;
      margin-bottom: 14px;
      padding-bottom: 10px;
      border-bottom: 1px solid #e0e0e0;
    }

    .mega-link-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .mega-link-list a {
      color: #525252;
      font-size: 14px;
      line-height: 1.3;
      text-decoration: none;
      transition: color 0.15s ease, transform 0.15s ease;
      display: inline-flex;
      width: fit-content;
    }

    .mega-link-list a:hover {
      color: #0f62fe;
      text-decoration: underline;
      text-underline-offset: 3px;
      transform: translateX(4px);
    }

    .mobile-nav-item {
      min-height: 52px;
      padding: 0 20px;
      border-bottom: 1px solid #e0e0e0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-align: left;
      background: #ffffff;
    }

    .mobile-nav-item:hover {
      background: #f4f4f4;
    }

    .mobile-submenu {
      background: #f4f4f4;
      padding: 12px 22px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      font-size: 14px;
      color: #525252;
      border-bottom: 1px solid #e0e0e0;
    }

    .mobile-section-title {
      text-align: left;
      color: #161616;
      font-weight: 600;
      padding: 8px 0;
    }

    .mobile-link-group {
      padding: 8px 0 10px 12px;
      border-left: 2px solid #0f62fe;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .mobile-link-group p {
      color: #161616;
      font-weight: 600;
      margin-bottom: 4px;
    }

    .mobile-link-group a {
      color: #525252;
    }

    .mobile-link-group a:hover {
      color: #0f62fe;
    }

    @media (max-width: 1280px) {
      .mega-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
    }
  `]
})
export class Nav {
  openMenu: MenuKey | '' = '';
  activeSection: SectionKey = '';
  isMobileMenuOpen = false;
  isLanguageOpen = false;

  selectedLanguage: LanguageOption = {
    code: 'en',
    name: 'English',
    short: 'EN'
  };

  languages: LanguageOption[] = [
    { code: 'en', name: 'English', short: 'EN' },
    { code: 'de', name: 'German', short: 'DE' },
    { code: 'hi', name: 'Hindi', short: 'HI' },
    { code: 'ta', name: 'Tamil', short: 'TA' },
    { code: 'ml', name: 'Malayalam', short: 'ML' },
    { code: 'ar', name: 'Arabic', short: 'AR' },
    { code: 'fr', name: 'French', short: 'FR' }
  ];

  topMenus: { key: MenuKey; label: string }[] = [
    { key: 'programs', label: 'Programs' },
    { key: 'ausbildung', label: 'Ausbildung' },
    { key: 'jobs', label: 'Jobs' },
    { key: 'study-abroad', label: 'Study Abroad' },
    { key: 'tools', label: 'Tools' },
    { key: 'pricing', label: 'Pricing' }
  ];

  megaMenus: Record<MenuKey, MegaMenu> = {
    programs: {
      title: 'Programs',
      subtitle: 'Opportunity Discovery Engine',
      sections: [
        {
          key: 'programs-overview',
          label: 'Programs Overview',
          title: 'Programs Overview',
          groups: [
            {
              heading: 'Opportunity Discovery Engine',
              links: [
                'Explore All Programs',
                'Compare Programs',
                'Career Pathway Finder',
                'AI Career Advisor',
                'Program Eligibility Checker',
                'Salary & ROI Explorer',
                'Timeline Explorer'
              ]
            }
          ]
        },
        {
          key: 'work-programs',
          label: 'Work Programs',
          title: 'Work Programs',
          groups: [
            {
              heading: 'Work Programs',
              links: ['Work in Germany', 'Work in Europe', 'GCC Jobs']
            },
            {
              heading: 'By Job Type',
              links: [
                'Skilled Jobs',
                'Blue Card Jobs',
                'IT Jobs',
                'Healthcare Jobs',
                'Engineering Jobs',
                'Logistics Jobs',
                'Hospitality Jobs',
                'Warehouse Jobs',
                'Drivers Jobs',
                'Manufacturing Jobs'
              ]
            },
            {
              heading: 'Europe',
              links: ['Estonia', 'Netherlands', 'Poland', 'Lithuania', 'Latvia', 'Romania', 'Hungary']
            },
            {
              heading: 'GCC',
              links: ['UAE', 'Kuwait', 'Oman', 'Qatar', 'Saudi Arabia', 'Bahrain']
            },
            {
              heading: 'Employment Type',
              links: ['Full Time', 'Contract', 'Remote', 'Freelance', 'Internship', 'Apprenticeship', 'Seasonal Jobs']
            }
          ]
        },
        {
          key: 'ausbildung-programs',
          label: 'Ausbildung Programs',
          title: 'Ausbildung Programs',
          groups: [
            {
              heading: 'Ausbildung in Germany',
              links: [
                'Explore Ausbildung Programs',
                'Ausbildung by Salary',
                'Ausbildung by State',
                'Ausbildung with Accommodation',
                'Ausbildung with Sponsorship',
                'Ausbildung with Language Training'
              ]
            },
            {
              heading: 'Ausbildung by Industry',
              links: [
                'Nursing',
                'Retail',
                'Hotel Management',
                'Culinary',
                'Automotive',
                'Mechatronics',
                'Electrical',
                'Plumbing',
                'Logistics',
                'IT Specialist',
                'Healthcare Assistant',
                'Elderly Care',
                'Physiotherapy Assistant'
              ]
            },
            {
              heading: 'Ausbildung by Qualification',
              links: ['10th Grade', '12th Grade', 'Diploma', 'Degree Holders', 'Career Switchers']
            },
            {
              heading: 'Ausbildung Support',
              links: [
                'Employer Matching',
                'Interview Preparation',
                'Visa Guidance',
                'Recognition Support',
                'Relocation Support',
                'Blocked Account Support'
              ]
            }
          ]
        },
        {
          key: 'study-programs',
          label: 'Study Programs',
          title: 'Study Programs',
          groups: [
            {
              heading: 'Study Abroad',
              links: [
                'Study in Germany',
                'Study in Europe',
                'Study in Canada',
                'Study in UK',
                'Study in Australia',
                'Study in UAE',
                'Study in USA',
                'Study in Ireland',
                'Study in Malta',
                'Study in Georgia',
                'Study in Azerbaijan'
              ]
            },
            {
              heading: 'By Education Level',
              links: [
                'Foundation Programs',
                'Diploma',
                'Bachelor’s',
                'Master’s',
                'MBA',
                'PhD',
                'Dual Study Programs',
                'Pathway Programs',
                'Transfer Programs',
                'Twinning Programs'
              ]
            },
            {
              heading: 'By Institution Type',
              links: [
                'Public Universities',
                'Private Universities',
                'Applied Sciences Universities',
                'Technical Universities',
                'Community Colleges',
                'Research Universities'
              ]
            },
            {
              heading: 'By Stream',
              links: [
                'Engineering',
                'IT & Computer Science',
                'Artificial Intelligence',
                'Data Science',
                'Cybersecurity',
                'Healthcare',
                'Nursing',
                'Business Management',
                'Hospitality',
                'Logistics',
                'Automotive',
                'Finance',
                'Biotechnology',
                'Renewable Energy'
              ]
            }
          ]
        },
        {
          key: 'training-programs',
          label: 'Training Programs',
          title: 'Training Programs',
          groups: [
            {
              heading: 'German Language Training',
              links: [
                'A1 German',
                'A2 German',
                'B1 German',
                'B2 German',
                'C1 German',
                'Medical German',
                'Spoken German',
                'Business German',
                'Goethe Exam',
                'TELC Exam',
                'ÖSD Exam'
              ]
            },
            {
              heading: 'Specialized Training',
              links: ['Interview Preparation', 'Cross Cultural Training', 'Adaptation Training', 'Workplace Readiness', 'Soft Skills']
            },
            {
              heading: 'Career Training',
              links: ['CV Building', 'LinkedIn Optimization', 'SOP Writing', 'Motivation Letter', 'Portfolio Development']
            }
          ]
        }
      ]
    },

    ausbildung: {
      title: 'Ausbildung',
      subtitle: 'Vocational Career Pathways',
      sections: [
        {
          key: 'ausbildung-overview',
          label: 'Ausbildung Overview',
          title: 'Ausbildung Overview',
          groups: [
            {
              heading: 'Ausbildung in Germany',
              links: ['Explore Ausbildung Programs', 'Ausbildung by Salary', 'Ausbildung by State']
            },
            {
              heading: 'Ausbildung Support',
              links: ['Ausbildung with Accommodation', 'Ausbildung with Sponsorship', 'Ausbildung with Language Training']
            }
          ]
        },
        {
          key: 'ausbildung-industry',
          label: 'Ausbildung by Industry',
          title: 'Ausbildung by Industry',
          groups: [
            {
              heading: 'Healthcare',
              links: ['Nursing', 'Healthcare Assistant', 'Elderly Care', 'Physiotherapy Assistant']
            },
            {
              heading: 'Technical',
              links: ['Automotive', 'Mechatronics', 'Electrical', 'Plumbing', 'IT Specialist']
            },
            {
              heading: 'Service & Operations',
              links: ['Retail', 'Hotel Management', 'Culinary', 'Logistics']
            }
          ]
        },
        {
          key: 'ausbildung-qualification',
          label: 'Ausbildung by Qualification',
          title: 'Ausbildung by Qualification',
          groups: [
            {
              heading: 'Qualification Routes',
              links: ['10th Grade', '12th Grade', 'Diploma', 'Degree Holders', 'Career Switchers']
            }
          ]
        },
        {
          key: 'ausbildung-support',
          label: 'Ausbildung Support',
          title: 'Ausbildung Support',
          groups: [
            {
              heading: 'Candidate Support',
              links: [
                'Employer Matching',
                'Interview Preparation',
                'Visa Guidance',
                'Recognition Support',
                'Relocation Support',
                'Blocked Account Support'
              ]
            }
          ]
        }
      ]
    },

    jobs: {
      title: 'Jobs',
      subtitle: 'International Work Pathways',
      sections: [
        {
          key: 'work-programs',
          label: 'Work Programs',
          title: 'Work Programs',
          groups: [
            {
              heading: 'Work Destinations',
              links: ['Work in Germany', 'Work in Europe', 'GCC Jobs']
            },
            {
              heading: 'By Job Type',
              links: [
                'Skilled Jobs',
                'Blue Card Jobs',
                'IT Jobs',
                'Healthcare Jobs',
                'Engineering Jobs',
                'Logistics Jobs',
                'Hospitality Jobs',
                'Warehouse Jobs',
                'Drivers Jobs',
                'Manufacturing Jobs'
              ]
            },
            {
              heading: 'Employment Type',
              links: ['Full Time', 'Contract', 'Remote', 'Freelance', 'Internship', 'Apprenticeship', 'Seasonal Jobs']
            }
          ]
        }
      ]
    },

    'study-abroad': {
      title: 'Study Abroad',
      subtitle: 'Global Education Pathways',
      sections: [
        {
          key: 'study-programs',
          label: 'Study Programs',
          title: 'Study Programs',
          groups: [
            {
              heading: 'Study Abroad',
              links: [
                'Study in Germany',
                'Study in Europe',
                'Study in Canada',
                'Study in UK',
                'Study in Australia',
                'Study in UAE',
                'Study in USA',
                'Study in Ireland',
                'Study in Malta',
                'Study in Georgia',
                'Study in Azerbaijan'
              ]
            },
            {
              heading: 'By Education Level',
              links: [
                'Foundation Programs',
                'Diploma',
                'Bachelor’s',
                'Master’s',
                'MBA',
                'PhD',
                'Dual Study Programs',
                'Pathway Programs',
                'Transfer Programs',
                'Twinning Programs'
              ]
            },
            {
              heading: 'By Institution Type',
              links: [
                'Public Universities',
                'Private Universities',
                'Applied Sciences Universities',
                'Technical Universities',
                'Community Colleges',
                'Research Universities'
              ]
            },
            {
              heading: 'By Stream',
              links: [
                'Engineering',
                'IT & Computer Science',
                'Artificial Intelligence',
                'Data Science',
                'Cybersecurity',
                'Healthcare',
                'Nursing',
                'Business Management',
                'Hospitality',
                'Logistics',
                'Automotive',
                'Finance',
                'Biotechnology',
                'Renewable Energy'
              ]
            }
          ]
        }
      ]
    },

    tools: {
      title: 'Tools',
      subtitle: 'Career Intelligence Layer',
      sections: [
        {
          key: 'career-tools',
          label: 'Career Tools',
          title: 'Career Tools',
          groups: [
            {
              heading: 'Discovery Tools',
              links: ['Career Pathway Finder', 'AI Career Advisor', 'Program Eligibility Checker']
            },
            {
              heading: 'Financial Tools',
              links: ['Salary & ROI Explorer', 'Timeline Explorer', 'Cost of Living Calculator']
            }
          ]
        }
      ]
    },

    pricing: {
      title: 'Pricing',
      subtitle: 'Investment & Packages',
      sections: [
        {
          key: 'pricing-overview',
          label: 'Pricing Overview',
          title: 'Pricing Overview',
          groups: [
            {
              heading: 'Service Tiers',
              links: ['Basic Package', 'Premium Support', 'Success Plus']
            },
            {
              heading: 'Payment Options',
              links: ['Flexible Payment Options', 'Service Comparison', 'Configure Package']
            }
          ]
        }
      ]
    }
  };

  openTopMenu(menu: MenuKey) {
    if (!this.isMobileMenuOpen) {
      this.isLanguageOpen = false;
      this.openMenu = menu;
      this.activeSection = this.megaMenus[menu].sections[0].key;
    }
  }

  toggleMenu(menu: MenuKey) {
    this.isLanguageOpen = false;

    if (this.openMenu === menu) {
      this.openMenu = '';
      this.activeSection = '';
      return;
    }

    this.openMenu = menu;
    this.activeSection = this.megaMenus[menu].sections[0].key;
  }

  setSection(section: SectionKey) {
    this.activeSection = section;
  }

  closeMenu() {
    if (!this.isMobileMenuOpen) {
      this.openMenu = '';
      this.activeSection = '';
    }
  }

  toggleMobileMenu() {
    this.isLanguageOpen = false;
    this.isMobileMenuOpen = !this.isMobileMenuOpen;

    if (!this.isMobileMenuOpen) {
      this.openMenu = '';
      this.activeSection = '';
    }
  }

  toggleLanguageDropdown() {
    this.isLanguageOpen = !this.isLanguageOpen;

    if (this.isLanguageOpen) {
      this.openMenu = '';
      this.activeSection = '';
      this.isMobileMenuOpen = false;
    }
  }

  selectLanguage(language: LanguageOption) {
    this.selectedLanguage = language;
    this.isLanguageOpen = false;
  }
}