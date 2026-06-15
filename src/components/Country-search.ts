import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Country {
  name: string;
  code: string;
}

interface PartnerCard {
  title: string;
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
    <section class="font-main bg-white py-12 lg:py-20">
      
      <div class="max-w-[1584px] mx-auto px-6 lg:px-12 xl:px-16 2xl:px-20 mb-10">
        <h2 class="text-3xl lg:text-[42px] font-bold text-center text-slate-900 tracking-tight">
          Country Search
        </h2>
      </div>

      <div class="max-w-[1584px] mx-auto px-6 lg:px-12 xl:px-16 2xl:px-20">
        <div class="flex flex-col lg:flex-row bg-[#f8f9fa] border border-slate-200 overflow-hidden shadow-sm min-h-[650px]">
          
          <aside class="w-full lg:w-[380px] bg-white border-r border-slate-200 flex flex-col shrink-0">
            
            <div class="p-8 pb-4">
              <h3 class="text-[22px] font-medium text-slate-900 mb-2">Explore Destinations</h3>
              <p class="text-[13px] text-slate-500 mb-6 leading-relaxed">
                Discover Ausbildung, jobs, and study programs across top international destinations.
              </p>

              <div class="relative mb-4">
                <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
                  </svg>
                </div>
                <input 
                  type="text" 
                  placeholder="Enter country or city" 
                  class="w-full bg-slate-100/80 border-none text-[13px] rounded-full py-3 pl-10 pr-4 text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                >
              </div>
            </div>

            <div class="flex-1 overflow-y-auto px-8 pb-8 hide-scrollbar">
              <ul class="divide-y divide-slate-100">
                @for (country of countries; track country.code) {
                  <li>
                    <button 
                      (click)="toggleCountry(country.code)"
                      class="w-full flex items-center justify-between py-4 group hover:bg-slate-50 transition-colors"
                    >
                      <div class="flex items-center gap-3">
                        <img 
                          [src]="'https://flagcdn.com/' + country.code.toLowerCase() + '.svg'" 
                          [alt]="country.name + ' flag'" 
                          class="w-6 h-auto drop-shadow-sm rounded-[2px] border border-slate-100 object-cover" 
                        />
                        <span class="text-[14px] font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">
                          {{ country.name }}
                        </span>
                      </div>
                      
                      <span class="text-slate-400 text-lg font-light group-hover:text-blue-600 transition-colors w-4 flex justify-center">
                        {{ expandedCountry === country.code ? '−' : '+' }}
                      </span>
                    </button>

                    <div 
                      class="overflow-hidden transition-all duration-300 ease-in-out"
                      [style.maxHeight]="expandedCountry === country.code ? '150px' : '0px'"
                      [style.opacity]="expandedCountry === country.code ? '1' : '0'">
                      <p class="text-[12.5px] text-slate-500 pb-4 pl-9">
                        Explore specific opportunities, universities, and visa requirements for {{ country.name }}.
                      </p>
                    </div>
                  </li>
                }
              </ul>
            </div>
          </aside>

          <main class="flex-1 relative bg-[#f4f5f7] flex flex-col overflow-hidden min-h-[500px] lg:min-h-auto">
            
            <div class="absolute inset-0 opacity-20 pointer-events-none" 
                 style="background-image: url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg'); background-size: cover; background-position: center; filter: grayscale(100%);">
            </div>

            <div class="relative z-10 px-8 flex gap-8 border-b border-slate-200/60 bg-white/40 backdrop-blur-md">
              @for (tab of continents; track tab) {
                <button 
                  (click)="setTab(tab)"
                  class="py-5 text-[15px] font-medium transition-colors relative"
                  [class.text-blue-600]="activeTab === tab"
                  [class.text-slate-600]="activeTab !== tab"
                  [class.hover:text-slate-900]="activeTab !== tab">
                  {{ tab }}
                  
                  @if (activeTab === tab) {
                    <span class="absolute bottom-0 left-0 w-full h-[3px] bg-blue-600 rounded-t-sm"></span>
                  }
                </button>
              }
            </div>

            <div class="relative z-10 flex-1 flex items-center p-8 overflow-x-auto hide-scrollbar">
              <div class="flex gap-5">
                
                @for (card of partnerCards; track card.title + $index) {
                  <div class="w-[240px] shrink-0 bg-white/90 backdrop-blur-sm border border-slate-200/80 rounded-sm p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                    
                    <div class="h-12 w-32 flex items-center justify-center mb-4">
                      <img [src]="card.logoUrl" alt="Logo" class="max-h-full max-w-full object-contain"
                           onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                      <span class="hidden text-[18px] font-bold text-red-600">UE <span class="text-slate-800 font-normal text-xs">University<br>of Euro</span></span>
                    </div>

                    <h4 class="font-bold text-[14px] text-slate-800 mb-1.5">{{ card.title }}</h4>
                    
                    <div class="flex items-center gap-2 text-[11px] font-medium text-slate-600 mb-4">
                      <span>{{ card.rating }} rating</span>
                      <span class="w-1 h-1 rounded-full bg-slate-300"></span>
                      <span>{{ card.reviews }} Review</span>
                    </div>

                    <p class="text-[12px] text-slate-500 mb-6 leading-relaxed px-2">
                      {{ card.description }}
                    </p>

                    <button class="w-full mt-auto text-blue-500 border border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-colors text-[12px] font-medium py-2 rounded-sm">
                      View all
                    </button>
                  </div>
                }

              </div>
            </div>

            <div class="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
              <button class="w-8 h-8 bg-white border border-slate-200 rounded-sm shadow-sm flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                  <path d="M12 5v14M5 12h14"/>
                </svg>
              </button>
              <button class="w-8 h-8 bg-white border border-slate-200 rounded-sm shadow-sm flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                  <path d="M5 12h14"/>
                </svg>
              </button>
            </div>

            <div class="absolute bottom-6 right-8 z-20">
              <a href="#" class="text-[13px] font-medium text-slate-700 hover:text-blue-600 flex items-center gap-1.5 transition-colors group">
                View all 
                <svg class="w-4 h-4 text-blue-500 transform group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
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
  
  expandedCountry = '';
  
  countries: Country[] = [
    { name: 'Austria', code: 'AT' },
    { name: 'Belgium', code: 'BE' },
    { name: 'Denmark', code: 'DK' },
    { name: 'France', code: 'FR' },
    { name: 'Germany', code: 'DE' },
    { name: 'Italy', code: 'IT' },
    { name: 'Netherlands', code: 'NL' },
    { name: 'Sweden', code: 'SE' },
    { name: 'United Kingdom', code: 'GB' },
  ];

  toggleCountry(code: string) {
    this.expandedCountry = this.expandedCountry === code ? '' : code;
  }

  activeTab = 'Europe';

  continents = ['Asia', 'Africa', 'Europe', 'South America'];

  setTab(tab: string) {
    this.activeTab = tab;
  }

  partnerCards: PartnerCard[] = [
    {
      title: 'University of Euro',
      rating: '3.3k',
      reviews: '7k+',
      description: 'Explore Ausbildung programs',
      logoUrl: 'assets/logo-ue.png' 
    },
    {
      title: 'University of Euro',
      rating: '3.3k',
      reviews: '7k+',
      description: 'Explore Ausbildung programs',
      logoUrl: 'assets/logo-ue.png'
    },
    {
      title: 'DTDC Logistics',
      rating: '4.1k',
      reviews: '12k+',
      description: 'Explore Logistics programs',
      logoUrl: 'assets/logo-dtdc.png' 
    },
    {
      title: 'University of Euro',
      rating: '3.3k',
      reviews: '7k+',
      description: 'Explore Ausbildung programs',
      logoUrl: 'assets/logo-ue.png'
    }
  ];
}