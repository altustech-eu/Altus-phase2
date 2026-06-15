import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-study-destination',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="font-main bg-white py-16 lg:py-24">
      <div class="max-w-[1584px] mx-auto px-6 lg:px-12 xl:px-16 2xl:px-20">
        
        <!-- Section Title -->
        <h2 class="text-3xl lg:text-[38px] font-medium text-center text-slate-900 tracking-tight mb-16 lg:mb-20">
          Choose your Study Destination
        </h2>

        <!-- Main Layout Container -->
        <div class="relative w-full max-w-[1050px] mx-auto flex items-center h-[320px] md:h-[480px]">
          
          <!-- Light Blue Background Block -->
          <div class="absolute left-0 top-0 bottom-0 w-[40%] md:w-[35%] bg-[#92d6ee] z-0"></div>

          <!-- Left Side: Controls Area -->
          <div class="relative z-10 w-[30%] md:w-[25%] flex flex-col items-center justify-center gap-4 md:gap-5">
            
            <!-- Right Arrow Button -->
            <button class="w-10 h-10 md:w-11 md:h-11 rounded-full bg-[#262626] text-white flex items-center justify-center hover:bg-black transition-colors group shadow-md">
              <svg class="w-4 h-4 md:w-5 md:h-5 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>

            <!-- Left Arrow Button -->
            <button class="w-10 h-10 md:w-11 md:h-11 rounded-full bg-[#262626] text-white flex items-center justify-center hover:bg-black transition-colors group shadow-md">
              <svg class="w-4 h-4 md:w-5 md:h-5 transform group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5M12 19l-7-7 7-7"></path>
              </svg>
            </button>

            <!-- Slide Indicator -->
            <span class="text-[#73a8b9] font-medium text-lg mt-3 md:mt-5 tracking-wide">01</span>
          </div>

          <!-- Right Side: Overlapping Image Area -->
          <div class="relative z-10 w-[70%] md:w-[75%] h-[75%] md:h-[75%]">
            <img 
              src="https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&cs=tinysrgb&w=1200" 
              alt="Global Study Destination" 
              class="w-full h-full object-cover"
            />
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
export class StudyDestinationComponent { }