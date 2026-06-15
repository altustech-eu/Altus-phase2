import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CompanyCard {
  companyName: string;
  logoUrl?: string;
  description: string;
  industry: string;
  linkText: string;
  linkUrl: string;
}

@Component({
  selector: 'app-industries-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="font-main bg-white py-16 lg:py-24">
      <div class="max-w-[1584px] mx-auto px-6 lg:px-12 xl:px-16 2xl:px-20">
        
        <h2 class="text-3xl lg:text-[40px] font-bold text-center text-slate-900 tracking-tight mb-10">
          By industries
        </h2>

        <div class="flex flex-wrap items-center justify-center gap-3 mb-14">
          @for (tab of tabs; track tab) {
            <button 
              (click)="activeTab.set(tab)"
              class="px-5 py-2 rounded-sm border text-[13px] transition-all duration-200"
              [class.border-slate-300]="activeTab() !== tab"
              [class.text-slate-600]="activeTab() !== tab"
              [class.hover:border-slate-400]="activeTab() !== tab"
              [class.border-blue-600]="activeTab() === tab"
              [class.text-blue-700]="activeTab() === tab"
              [class.bg-blue-50/50]="activeTab() === tab">
              {{ tab }}
            </button>
          }
        </div>

        <h3 class="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight mb-8">
          Jobs
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          @for (card of filteredCards(); track card.companyName + $index) {
            <div class="bg-[#f8f9fa] border border-slate-200/80 rounded-[4px] p-6 lg:p-8 flex flex-col h-[280px] hover:shadow-md transition-shadow group">
              
              <div class="h-8 mb-6 flex items-center">
                @if (card.logoUrl) {
                  <img [src]="card.logoUrl" [alt]="card.companyName" class="max-h-full max-w-full object-contain" />
                } @else {
                  <h4 class="text-xl font-bold tracking-tight text-slate-800 flex items-center gap-1.5">
                    <svg class="w-5 h-5 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L2 22h20L12 2z"/>
                    </svg>
                    {{ card.companyName }}
                  </h4>
                }
              </div>

              <p class="text-[14px] text-slate-700 leading-relaxed font-medium">
                {{ card.description }}
              </p>

              <div class="mt-auto pt-6">
                <a [href]="card.linkUrl" class="flex items-center justify-between text-[13px] text-blue-500 hover:text-blue-700 transition-colors font-medium">
                  {{ card.linkText }}
                  <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </a>
              </div>

            </div>
          }
        </div>

        <div class="flex justify-center mt-4">
          <button class="border border-blue-500 text-blue-500 hover:bg-blue-50 px-8 py-2.5 text-[13px] transition-colors rounded-sm">
            View all Companies
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
export class IndustriesSectionComponent {
  
  activeTab = signal<string>('All');

  tabs = [
    'All', 
    'IT services', 
    'Technology', 
    'Healthcare & Life sciences', 
    'Manufacturing & Production', 
    'Infrastructure , Transport', 
    'BFSI', 
    'BPM'
  ];

  allCards: CompanyCard[] = [
    {
      companyName: 'nationwide',
      description: 'A robust roadmap to a successful AI strategy',
      industry: 'BFSI',
      linkText: 'Read the story',
      linkUrl: '#'
    },
    {
      companyName: 'DHCS',
      description: 'Caring for the public sector people: A success story',
      industry: 'Healthcare & Life sciences',
      linkText: 'Read the story',
      linkUrl: '#'
    },
    {
      companyName: 'IBM',
      description: 'Productivity with AI and innovation',
      industry: 'IT services',
      linkText: 'Read the story',
      linkUrl: '#'
    },
    {
      companyName: 'IBM',
      description: 'Productivity with AI and innovation',
      industry: 'Technology',
      linkText: 'Read the story',
      linkUrl: '#'
    },
    {
      companyName: 'nationwide',
      description: 'A robust roadmap to a successful AI strategy',
      industry: 'BFSI',
      linkText: 'Read the story',
      linkUrl: '#'
    },
    {
      companyName: 'DHCS',
      description: 'Caring for the public sector people: A success story',
      industry: 'Healthcare & Life sciences',
      linkText: 'Read the story',
      linkUrl: '#'
    },
    {
      companyName: 'IBM',
      description: 'Productivity with AI and innovation',
      industry: 'IT services',
      linkText: 'Read the story',
      linkUrl: '#'
    },
    {
      companyName: 'IBM',
      description: 'Productivity with AI and innovation',
      industry: 'Technology',
      linkText: 'Read the story',
      linkUrl: '#'
    }
  ];

  filteredCards = computed(() => {
    const currentTab = this.activeTab();

    if (currentTab === 'All') {
      return this.allCards;
    }

    return this.allCards.filter(card => card.industry === currentTab);
  });
}