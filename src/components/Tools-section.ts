import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ToolCard {
  title: string;
  description: string;
  tags: string[];
  bgClass: string;
  tagClass: string;
}

@Component({
  selector: 'app-tools-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="font-main bg-white py-12 lg:py-20">
      
      <div class="max-w-[1584px] mx-auto px-6 lg:px-12 xl:px-16 2xl:px-20 mb-10">
        <h2 class="text-3xl lg:text-[42px] font-bold text-center text-slate-900 tracking-tight">
          Tools
        </h2>
      </div>

      <div class="bg-[#dfe3ec] py-12 lg:py-16 px-6 lg:px-12">
        <div class="max-w-[1584px] mx-auto">
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            
            @for (tool of tools; track tool.title) {
              <div class="bg-white rounded-2xl p-2.5 flex flex-col shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                
                <div class="rounded-[14px] p-6 flex-1 flex flex-col transition-colors" [ngClass]="tool.bgClass">
                  
                  <h3 class="text-[22px] font-semibold mb-3 text-slate-900 tracking-tight">
                    {{ tool.title }}
                  </h3>
                  
                  <p class="text-[13px] text-slate-700/80 mb-8 leading-relaxed font-medium">
                    {{ tool.description }}
                  </p>
                  
                  <div class="flex flex-wrap gap-2 mt-auto">
                    @for (tag of tool.tags; track tag) {
                      <span class="px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-wide" [ngClass]="tool.tagClass">
                        {{ tag }}
                      </span>
                    }
                  </div>
                </div>

                <div class="flex items-center justify-between px-4 py-4 pt-5 mt-1">
                  <span class="font-semibold text-[15px] text-slate-800 group-hover:text-blue-600 transition-colors">
                    Explore
                  </span>
                  
                  <button class="w-8 h-8 rounded-lg bg-[#f4f5f8] flex items-center justify-center text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>

              </div>
            }

          </div>

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
export class ToolsSectionComponent {
  
  tools: ToolCard[] = [
    {
      title: 'Calculators',
      description: 'Estimate your ROI, blocked account requirements, and cost of living accurately.',
      tags: ['Salary', 'ROI', 'Blocked Account'],
      bgClass: 'bg-[#e5f5fd]',
      tagClass: 'bg-[#c6e9fa] text-[#00609a]'
    },
    {
      title: 'Resume Builder',
      description: 'Creates impactful ATS-friendly European standard CVs and cover letters.',
      tags: ['ATS Friendly', 'Templates', 'Cover Letter'],
      bgClass: 'bg-[#fdecdb]',
      tagClass: 'bg-[#fad5b4] text-[#a45c1a]'
    },
    {
      title: 'AI Career Advisor',
      description: 'Builds functional and scalable study or work pathways based on your profile.',
      tags: ['Pathway Match', 'University', 'Eligibility'],
      bgClass: 'bg-[#efe6fd]',
      tagClass: 'bg-[#dbccf8] text-[#5b32a8]'
    },
    {
      title: 'Interview Prep',
      description: 'Delivers persuasive and creative interview responses with AI mock sessions.',
      tags: ['Mock Interviews', 'Questions', 'Tips'],
      bgClass: 'bg-[#e0f8ed]',
      tagClass: 'bg-[#bcecd6] text-[#1f8755]'
    }
  ];
}