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
  count: number;
  sites: Site[];
}

@Component({
  selector: 'app-contact-map',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="font-main max-w-[1584px] mx-auto px-6 lg:px-8 xl:px-16 2xl:px-20 py-16">
      
      <div class="w-full h-[600px] md:h-[700px] flex border border-slate-200/60 shadow-sm overflow-hidden bg-[#9ad4e4] relative">
        
        <div class="relative flex-1 h-full overflow-hidden transition-all duration-500">
          
          <div class="absolute inset-0 opacity-40 mix-blend-overlay">
             <img 
               src="https://images.pexels.com/photos/2859169/pexels-photo-2859169.jpeg?auto=compress&cs=tinysrgb&w=1200" 
               alt="Map Texture" 
               class="w-full h-full object-cover"
             />
          </div>
          <div class="absolute inset-0 bg-[#9ad4e4] mix-blend-color z-0 pointer-events-none"></div>

          @if (!selectedCountry) {
            <div class="absolute inset-0 z-10">
              @for (marker of globalMarkers; track $index) {
                <div 
                  class="absolute w-8 h-8 bg-white rounded-full flex items-center justify-center text-[13px] font-bold text-slate-700 shadow-md border border-slate-100 cursor-pointer hover:scale-110 transition-transform"
                  [style.top]="marker.top" 
                  [style.left]="marker.left">
                  {{ marker.count }}
                </div>
              }
            </div>
          }

          @if (selectedCountry) {
            <div class="absolute inset-0 z-10 bg-white/20 backdrop-blur-[1px] transition-all duration-500">
              @for (site of selectedCountry.sites; track $index) {
                <div class="absolute flex flex-col items-center -translate-x-1/2 -translate-y-full cursor-pointer group"
                     [style.top]="site.top" 
                     [style.left]="site.left">
                  <div class="w-7 h-7 bg-[#0b3a70] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform z-10">
                    <div class="w-2.5 h-2.5 bg-white rounded-full"></div>
                  </div>
                  <div class="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-[#0b3a70] -mt-1"></div>
                  <div class="mt-1 bg-white/90 px-2 py-0.5 rounded text-[11px] font-bold text-[#0b3a70] shadow-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    {{ site.title.split(' in ')[1] || site.title }}
                  </div>
                </div>
              }
            </div>
          }

          <div class="absolute bottom-6 left-6 z-20 flex flex-col bg-white rounded-[2px] shadow-sm text-slate-600">
            <button class="w-8 h-8 flex items-center justify-center border-b border-slate-100 hover:bg-slate-50 text-lg">+</button>
            <button class="w-8 h-8 flex items-center justify-center hover:bg-slate-50 text-lg">-</button>
          </div>
        </div>

        <div class="w-[320px] md:w-[380px] h-full bg-[#f0f2f7] shrink-0 flex flex-col shadow-[-4px_0_15px_rgba(0,0,0,0.05)] z-20 relative transition-transform duration-300">
          
          @if (!selectedCountry) {
            <div class="flex-1 overflow-y-auto hide-scrollbar flex flex-col p-8 pt-10">
              <h2 class="text-[22px] font-medium text-[#23314c] mb-8">
                Alstom worldwide
              </h2>

              <ul class="flex flex-col">
                @for (country of countries; track country.name) {
                  <li 
                    class="flex items-center gap-3 py-4 border-b border-white cursor-pointer group"
                    (click)="selectCountry(country)">
                    <span class="text-[15px] text-[#23314c] font-medium group-hover:text-blue-600 transition-colors">
                      {{ country.name }}
                    </span>
                    <span class="w-[18px] h-[18px] rounded-full bg-[#e32526] text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                      {{ country.count }}
                    </span>
                  </li>
                }
              </ul>
            </div>
          }

          @if (selectedCountry) {
            <div class="flex-1 overflow-y-auto hide-scrollbar flex flex-col p-8 pt-10 animate-fade-in">
              
              <div class="flex items-center gap-3 mb-8 cursor-pointer text-[#23314c] hover:text-blue-600 transition-colors" (click)="goBack()">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                <h2 class="text-[22px] font-medium">
                  {{ selectedCountry.name }}
                </h2>
              </div>

              <div class="flex border-b border-slate-300 mb-6">
                <button class="px-4 py-3 text-[13px] font-medium text-slate-500 hover:text-slate-800 transition-colors">
                  Presentation
                </button>
                <button class="px-4 py-3 text-[13px] font-medium text-[#e32526] border-b-2 border-[#e32526]">
                  Sites ({{ selectedCountry.count }})
                </button>
              </div>

              <div class="flex flex-col gap-6">
                @for (site of selectedCountry.sites; track site.title) {
                  <div class="flex flex-col pb-6 border-b border-white last:border-0">
                    <h4 class="text-[14px] font-bold text-[#23314c] mb-1 leading-tight">
                      {{ site.title }}
                    </h4>
                    <h5 class="text-[12.5px] font-bold text-[#4a5b78] mb-1.5 leading-tight">
                      {{ site.subtitle }}
                    </h5>
                    <p class="text-[12px] text-[#6b7b96] leading-relaxed pr-4">
                      {{ site.description }}
                    </p>
                  </div>
                }
              </div>

            </div>
          }

        </div>

      </div>
    </section>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
    
    .font-main {
      font-family: 'Roboto', Helvetica, Arial, sans-serif;
    }

    .hide-scrollbar::-webkit-scrollbar {
      width: 6px;
    }

    .hide-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }

    .hide-scrollbar::-webkit-scrollbar-thumb {
      background-color: #d1d5db;
      border-radius: 10px;
    }

    .animate-fade-in {
      animation: fadeIn 0.3s ease-out forwards;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateX(10px); }
      to { opacity: 1; transform: translateX(0); }
    }
  `]
})
export class ContactMapComponent {
  
  selectedCountry: Country | null = null;

  globalMarkers = [
    { top: '35%', left: '25%', count: 10 },
    { top: '45%', left: '20%', count: 8 },
    { top: '42%', left: '32%', count: 1 },
    { top: '48%', left: '30%', count: 2 },
    { top: '58%', left: '32%', count: 8 },
    { top: '55%', left: '35%', count: 3 },
    { top: '52%', left: '38%', count: 5 },
    { top: '30%', left: '52%', count: 18 },
    { top: '25%', left: '48%', count: 3 },
    { top: '38%', left: '45%', count: 2 },
    { top: '32%', left: '58%', count: 4 },
    { top: '35%', left: '65%', count: 1 },
    { top: '40%', left: '68%', count: 11 },
    { top: '48%', left: '62%', count: 1 },
    { top: '55%', left: '55%', count: 6 },
    { top: '42%', left: '72%', count: 1 },
    { top: '45%', left: '74%', count: 1 },
    { top: '50%', left: '72%', count: 1 },
    { top: '35%', left: '80%', count: 17 },
    { top: '40%', left: '82%', count: 2 },
    { top: '58%', left: '85%', count: 19 }
  ];

  countries: Country[] = [
    { name: 'Korea', count: 1, sites: [] },
    { name: 'Latvia', count: 1, sites: [] },
    { name: 'Malaysia', count: 1, sites: [] },
    { name: 'Mexico', count: 6, sites: [] },
    { name: 'Myanmar', count: 1, sites: [] },
    { name: 'Netherlands', count: 5, sites: [] },
    { name: 'Norway', count: 3, sites: [] },
    { name: 'Panama', count: 6, sites: [] },
    { 
      name: 'Ukraine', 
      count: 2, 
      sites: [
        {
          title: 'Legal entity in Kharkiv',
          subtitle: 'Sales Office and Engineering Office',
          description: 'Local Signalling, Sales and Region Engineering Center',
          top: '48%',
          left: '65%'
        },
        {
          title: 'Representative office in Kyiv',
          subtitle: 'Country HQ and Sales Office',
          description: 'Sales Office, Country HQ Ukraine',
          top: '35%', 
          left: '25%'
        }
      ] 
    }
  ];

  selectCountry(country: Country) {
    if (country.sites.length === 0) {
      this.selectedCountry = { ...country, sites: this.countries.find(c => c.name === 'Ukraine')?.sites || [] };
    } else {
      this.selectedCountry = country;
    }
  }

  goBack() {
    this.selectedCountry = null;
  }
}