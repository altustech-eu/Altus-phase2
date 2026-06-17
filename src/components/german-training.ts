import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-german-training',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="font-main bg-[#fafafa] py-24 lg:py-32 xl:py-40">
      <div class="max-w-[1584px] mx-auto px-6 lg:px-12 xl:px-16 2xl:px-20">
        
        <div class="bg-white flex flex-col w-full shadow-sm border border-slate-200/60">
          
          <div class="flex flex-col lg:flex-row w-full border-b border-slate-200">
            
            <div class="w-full lg:w-1/2 relative min-h-[550px] bg-[#f4f6f9] border-r border-slate-200 overflow-hidden flex flex-col">
              
              <div class="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-400 to-transparent pointer-events-none"></div>

              <img 
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200" 
                alt="Global Talent" 
                class="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-95"
              />

              <div class="relative z-10 pt-14 px-8 lg:px-12 text-center lg:text-left">
                <h3 class="text-3xl lg:text-[34px] font-bold text-[#0f2444] mb-3 tracking-tight">
                  Your Pathway. Global Opportunities.
                </h3>

                <p class="text-[14px] text-slate-600 font-medium tracking-wide">
                  Connecting talent to careers in Germany, Europe & the Gulf.
                </p>

                <div class="flex justify-center lg:justify-start gap-10 mt-10 opacity-95">
                  
                  <div class="flex flex-col items-center gap-2.5 relative">
                    <span class="text-[10px] font-bold text-slate-800 uppercase tracking-widest">
                      Europe
                    </span>

                    <div class="w-9 h-9 rounded-full bg-[#003399] border-[2.5px] border-white shadow-lg flex items-center justify-center relative z-10">
                      <svg class="w-4 h-4 text-[#ffcc00]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7.4-6.3-4.8-6.3 4.8 2.3-7.4-6-4.6h7.6z"/>
                      </svg>
                    </div>

                    <div class="absolute top-10 left-1/2 w-[80px] border-t border-dashed border-slate-400 -z-0"></div>
                  </div>
                  
                  <div class="flex flex-col items-center gap-2.5 relative">
                    <span class="text-[10px] font-bold text-slate-800 uppercase tracking-widest">
                      Germany
                    </span>

                    <div class="w-9 h-9 rounded-full border-[2.5px] border-white shadow-lg overflow-hidden flex flex-col relative z-10">
                      <div class="h-1/3 bg-black"></div>
                      <div class="h-1/3 bg-[#dd0000]"></div>
                      <div class="h-1/3 bg-[#ffce00]"></div>
                    </div>

                    <div class="absolute top-10 left-1/2 w-[80px] border-t border-dashed border-slate-400 -z-0"></div>
                  </div>
                  
                  <div class="flex flex-col items-center gap-2.5 relative z-10">
                    <span class="text-[10px] font-bold text-slate-800 uppercase tracking-widest">
                      Gulf
                    </span>

                    <div class="w-9 h-9 rounded-full bg-[#007a3d] border-[2.5px] border-white shadow-lg flex items-center justify-center">
                      <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                      </svg>
                    </div>
                  </div>

                </div>
              </div>

              <div class="absolute bottom-0 right-0 w-[85%] md:w-[60%] bg-white p-7 md:p-9 border-t border-l border-slate-200 z-20">
                <h4 class="text-[12px] font-bold text-slate-400 mb-5 tracking-wide">
                  University of Euro
                </h4>

                <p class="text-[13.5px] text-slate-600 leading-relaxed font-medium mb-10">
                  Explore Ausbildung programs, international jobs, study abroad options, German training
                </p>

                <button class="text-slate-400 hover:text-slate-900 transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </button>
              </div>
            </div>

            <div class="w-full lg:w-1/2 grid grid-cols-1 md:grid-cols-2 bg-white">
              
              <div class="p-8 border-b md:border-r border-slate-200 flex flex-col justify-center min-h-[275px] group hover:bg-slate-50 transition-colors cursor-pointer">
                <h4 class="text-[12px] font-bold text-slate-400 mb-5 mt-auto tracking-wide">
                  University of Euro
                </h4>

                <p class="text-[13.5px] text-slate-600 leading-relaxed font-medium mb-12">
                  Explore Ausbildung programs, international jobs, study abroad options, German training
                </p>

                <button class="text-slate-400 group-hover:text-blue-600 transition-colors w-fit">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </button>
              </div>

              <div class="p-8 border-b border-slate-200 flex flex-col justify-center min-h-[275px] group hover:bg-slate-50 transition-colors cursor-pointer">
                <h4 class="text-[12px] font-bold text-slate-400 mb-5 mt-auto tracking-wide">
                  University of Euro
                </h4>

                <p class="text-[13.5px] text-slate-600 leading-relaxed font-medium mb-12">
                  Explore Ausbildung programs, international jobs, study abroad options, German training
                </p>

                <button class="text-slate-400 group-hover:text-blue-600 transition-colors w-fit">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </button>
              </div>

              <div class="p-8 border-b md:border-b-0 md:border-r border-slate-200 flex flex-col justify-center min-h-[275px] group hover:bg-slate-50 transition-colors cursor-pointer">
                <h4 class="text-[12px] font-bold text-slate-400 mb-5 mt-auto tracking-wide">
                  University of Euro
                </h4>

                <p class="text-[13.5px] text-slate-600 leading-relaxed font-medium mb-12">
                  Explore Ausbildung programs, international jobs, study abroad options, German training
                </p>

                <button class="text-slate-400 group-hover:text-blue-600 transition-colors w-fit">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </button>
              </div>

              <div class="p-8 flex flex-col justify-center min-h-[275px] group hover:bg-slate-50 transition-colors cursor-pointer">
                <h4 class="text-[12px] font-bold text-slate-400 mb-5 mt-auto tracking-wide">
                  University of Euro
                </h4>

                <p class="text-[13.5px] text-slate-600 leading-relaxed font-medium mb-12">
                  Explore Ausbildung programs, international jobs, study abroad options, German training
                </p>

                <button class="text-slate-400 group-hover:text-blue-600 transition-colors w-fit">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </button>
              </div>

            </div>
          </div>

          <!-- Bottom CTA Strip with Top Spacing -->
          <div class="w-full mt-10 lg:mt-14 bg-[#e8dff4] flex flex-col md:flex-row items-center justify-between overflow-hidden">
            
            <div class="flex items-center flex-1 w-full md:w-auto">
              <img 
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=300" 
                alt="Students Thumbnail" 
                class="w-40 h-24 md:w-60 md:h-[104px] object-cover hidden sm:block shrink-0"
              />

              <p class="text-[12px] font-medium text-slate-800 leading-[1.6] px-6 py-5 max-w-[450px]">
                programs, international jobs, study abroad options, German training and guided career support based on your country
              </p>
            </div>

            <div class="px-6 py-5 md:py-0 shrink-0 w-full md:w-auto flex justify-end">
              <button class="w-full md:w-auto flex items-center justify-between md:justify-center gap-6 px-8 py-3 border-[1.5px] border-[#5e4ce8] text-[#5e4ce8] text-[13px] font-semibold rounded-[3px] hover:bg-[#5e4ce8]/10 transition-colors">
                Become a Tutor

                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </button>
            </div>

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
export class GermanTrainingComponent { }