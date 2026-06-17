import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface VideoStory {
  title: string;
  author: string;
  imageUrl: string;
}

@Component({
  selector: 'app-success-stories',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="font-main bg-white py-16 lg:py-24">
      <div class="max-w-[1584px] mx-auto px-6 lg:px-8 xl:px-16 2xl:px-20">

        <h2 class="text-3xl lg:text-[36px] font-medium text-center text-slate-900 tracking-tight mb-12">
          Success stories
        </h2>

        <!-- Top Image Gallery -->
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-3 mb-24">
          @for (imageUrl of stories; track imageUrl) {
            <div class="w-full aspect-[4/5] bg-[#f4f5f7] overflow-hidden relative group">
              <img
                [src]="imageUrl"
                alt="Nurse success story"
                class="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                (error)="imageError($event, imageUrl)"
              />
            </div>
          }
        </div>

        <!-- Reels Section Heading -->
        <div class="flex items-end justify-between mb-8">
          <div>
            <p class="text-[12px] font-bold uppercase tracking-[0.22em] text-blue-600 mb-2">
              Candidate Reels
            </p>

            <h3 class="text-[28px] lg:text-[38px] font-semibold text-slate-950 tracking-[-0.04em] leading-tight">
              Watch real pathway stories
            </h3>
          </div>

          <button
            type="button"
            class="hidden md:inline-flex items-center gap-3 text-[13px] font-semibold text-slate-700 border border-slate-300 px-5 py-3 hover:border-blue-600 hover:text-blue-600 transition-colors"
          >
            View all stories
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </button>
        </div>

        <!-- Bottom Reels Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 lg:gap-6">
          @for (video of videoStories; track video.title) {
            <div class="group cursor-pointer">

              <div class="relative w-full h-[520px] lg:h-[560px] overflow-hidden bg-slate-100 shadow-[0_18px_50px_rgba(15,23,42,0.14)] border border-slate-200/70">

                <img
                  [src]="video.imageUrl"
                  [alt]="video.title"
                  class="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  (error)="imageError($event, video.imageUrl)"
                />

                <!-- Dark Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent"></div>

                <!-- Reels Badge -->
                <div class="absolute top-4 left-4">
                  <span class="inline-flex items-center bg-white/90 backdrop-blur px-3 py-1 text-[11px] font-bold text-slate-900 shadow-sm">
                    Reel
                  </span>
                </div>

                <!-- Play Button -->
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="w-16 h-16 rounded-full border border-white/80 bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:scale-110 transition-all duration-300">
                    <svg class="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>

                <!-- Content Inside Reels Card -->
                <div class="absolute left-0 right-0 bottom-0 p-5">
                  <h3 class="font-semibold text-white text-[17px] leading-tight mb-2">
                    {{ video.title }}
                  </h3>

                  <p class="text-[13px] text-white/75 font-medium">
                    {{ video.author }}
                  </p>
                </div>

              </div>

            </div>
          }
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
export class SuccessStoriesComponent {

  stories: string[] = [
    '/assets/NURSES/NURSE1.webp',
    '/assets/NURSES/NURSE2.webp',
    '/assets/NURSES/NURSE3.webp',
    '/assets/NURSES/NURSE4.webp',
    '/assets/NURSES/NURSE5.webp',
    '/assets/NURSES/NURSE6.webp',
    '/assets/NURSES/NURSE7.webp',
    '/assets/NURSES/NURSE8.webp',
    '/assets/NURSES/NURSE9.webp',
    '/assets/NURSES/NURSE10.webp',
    '/assets/NURSES/NURSE11.webp',
    '/assets/NURSES/NURSE12.webp',
    '/assets/NURSES/NURSE13.webp',
    '/assets/NURSES/NURSE14.webp',
    '/assets/NURSES/NURSE15.webp',
    '/assets/NURSES/NURSE16.webp',
    '/assets/NURSES/NURSE17.webp',
    '/assets/NURSES/NURSE18.webp',
    '/assets/NURSES/NURSE19.webp',
    '/assets/NURSES/NURSE20.webp',
    '/assets/NURSES/NURSE21.webp',
    '/assets/NURSES/NURSE22.webp',
    '/assets/NURSES/NURSE23.webp',
    '/assets/NURSES/NURSE24.webp'
  ];

  videoStories: VideoStory[] = [
    {
      title: 'Nursing career success story',
      author: 'AltusCareer Candidate',
      imageUrl: '/assets/NURSES/NURSE1.webp'
    },
    {
      title: 'Germany healthcare pathway',
      author: 'AltusCareer Candidate',
      imageUrl: '/assets/NURSES/NURSE2.webp'
    },
    {
      title: 'International nursing journey',
      author: 'AltusCareer Candidate',
      imageUrl: '/assets/NURSES/NURSE3.webp'
    },
    {
      title: 'Ausbildung healthcare pathway',
      author: 'AltusCareer Candidate',
      imageUrl: '/assets/NURSES/NURSE4.webp'
    },
    {
      title: 'Career transformation story',
      author: 'AltusCareer Candidate',
      imageUrl: '/assets/NURSES/NURSE5.webp'
    }
  ];

  imageError(event: Event, imageUrl: string) {
    console.error('Image failed to load:', imageUrl);
  }
}