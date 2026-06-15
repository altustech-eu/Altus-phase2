import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="relative bg-white font-main overflow-hidden pt-8 lg:pt-10 pb-8 lg:pb-10 min-h-[560px] lg:min-h-[660px] flex items-center">

      <!-- Background Shape -->
      <div class="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-40">
        <svg class="absolute top-0 left-[8%] w-[760px] text-slate-100" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M45.7,-76.3C58.9,-69.3,69.2,-55.3,77.5,-40.5C85.8,-25.7,92.1,-10.1,89.5,4.3C86.9,18.6,75.4,31.7,64.2,42.9C53,54.1,42.1,63.4,28.8,71.2C15.5,79, -0.2,85.3,-15.5,83.1C-30.8,80.9,-45.7,70.2,-57.4,57.4C-69.1,44.6,-77.6,29.7,-82.1,13.5C-86.6,-2.7,-87.1,-20.2,-79.8,-34C-72.5,-47.8,-57.4,-57.9,-42.8,-64.3C-28.2,-70.7,-14.1,-73.4,1.4,-75.2C16.9,-77,32.5,-83.3,45.7,-76.3Z" transform="translate(100 100) scale(1.12)" />
        </svg>
      </div>

      <!-- IBM Carbon Style Wide Container -->
      <div class="max-w-[1584px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10 w-full grid grid-cols-1 lg:grid-cols-16 gap-8 lg:gap-10 xl:gap-14 items-center">

        <!-- Left Content -->
        <div class="col-span-1 lg:col-span-9 xl:col-span-9 pt-4 lg:pt-0">

          <!-- Audience Switch -->
          <div class="inline-flex items-center p-1 border border-slate-200 rounded-[2rem] bg-white mb-6 shadow-sm">
            <button
              (click)="setMode('employer')"
              class="px-6 py-2 rounded-[2rem] text-[13.5px] font-medium transition-all duration-300"
              [class.bg-[#e8d5ce]]="mode === 'employer'"
              [class.text-slate-900]="mode === 'employer'"
              [class.text-slate-500]="mode !== 'employer'"
              [class.hover:bg-slate-50]="mode !== 'employer'">
              For Employer
            </button>

            <button
              (click)="setMode('employee')"
              class="px-6 py-2 rounded-[2rem] text-[13.5px] font-medium transition-all duration-300"
              [class.bg-[#e8d5ce]]="mode === 'employee'"
              [class.text-slate-900]="mode === 'employee'"
              [class.text-slate-500]="mode !== 'employee'"
              [class.hover:bg-slate-50]="mode !== 'employee'">
              For Employee
            </button>
          </div>

          <!-- Heading -->
          <h1 class="max-w-[820px] text-4xl sm:text-5xl lg:text-[46px] xl:text-[52px] font-semibold text-[#161616] leading-[1.08] tracking-[-0.045em] mb-5">
            Your Career Pathway Platform for <br class="hidden sm:block"/>
            <span class="text-[#0f62fe] relative inline-block pb-1">
              Germany, Europe, Gulf
              <span class="absolute bottom-1 left-0 w-full h-[4px] bg-[#0f62fe]"></span>
            </span>
          </h1>

          <!-- Description -->
          <p class="text-[#525252] text-[15px] sm:text-base leading-relaxed mb-7 max-w-[680px] font-normal">
            Explore Ausbildung programs, international jobs, study abroad options, German training and guided career support based on your country, qualification, language level, and target destination.
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-wrap items-center gap-4">
            <button class="bg-[#0f62fe] text-white px-8 py-3.5 rounded-none font-medium tracking-wide hover:bg-[#0043ce] transition-colors flex items-center gap-3 shadow-sm">
              {{ mode === 'employer' ? 'Post Job' : 'Find Jobs' }}
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>

            <button class="bg-white border border-[#c6c6c6] text-[#161616] px-8 py-3.5 rounded-none font-medium tracking-wide hover:bg-[#f4f4f4] transition-colors shadow-sm">
              {{ mode === 'employer' ? 'Access CV' : 'Upload CV' }}
            </button>
          </div>

        </div>

        <!-- Right Image -->
        <div class="col-span-1 lg:col-span-7 xl:col-span-7 relative flex justify-center lg:justify-end self-center mt-6 lg:mt-0">
          <div class="relative w-[92%] sm:w-[78%] lg:w-full max-w-[640px]">
            <img
              src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1000"
              alt="Professionals in Healthcare, IT, and Education"
              class="w-full h-[300px] lg:h-[430px] xl:h-[460px] object-cover rounded-none shadow-xl z-10 border border-[#e0e0e0]"
            />

            <div class="absolute -bottom-5 -left-5 hidden lg:block bg-white border border-[#e0e0e0] shadow-lg px-5 py-4 max-w-[260px]">
              <p class="text-[12px] uppercase tracking-[0.16em] text-[#6f6f6f] font-semibold mb-1">
                Guided Pathways
              </p>
              <p class="text-[15px] text-[#161616] leading-snug font-medium">
                Jobs, Ausbildung, Study Abroad and German Training
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  `
})
export class HeroComponent {
  mode: 'employer' | 'employee' = 'employer';

  setMode(selectedMode: 'employer' | 'employee') {
    this.mode = selectedMode;
  }
}