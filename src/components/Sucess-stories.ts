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

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-3 mb-24">
          @for (imageUrl of stories; track imageUrl) {
            <div class="w-full aspect-[4/5] bg-[#f4f5f7] rounded-md overflow-hidden relative group">
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

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          @for (video of videoStories; track video.title) {
            <div class="flex flex-col group cursor-pointer">

              <div class="relative w-full aspect-[3/4] rounded-xl overflow-hidden mb-4 bg-slate-100 shadow-sm border border-slate-200/50">
                <img
                  [src]="video.imageUrl"
                  [alt]="video.title"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  (error)="imageError($event, video.imageUrl)"
                />

                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="w-11 h-11 rounded-full border-[1.5px] border-white/90 bg-black/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-black/40 group-hover:scale-110 transition-all duration-300">
                    <svg class="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>

              <h3 class="font-semibold text-slate-900 text-[14px] leading-tight mb-1.5 group-hover:text-blue-600 transition-colors">
                {{ video.title }}
              </h3>

              <p class="text-[12.5px] text-slate-500 font-medium">
                {{ video.author }}
              </p>

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