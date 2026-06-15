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
        
        <!-- ========================================== -->
        <!-- PART 1: SUCCESS STORIES IMAGE GRID         -->
        <!-- ========================================== -->
        
        <h2 class="text-3xl lg:text-[36px] font-medium text-center text-slate-900 tracking-tight mb-12">
          Success stories
        </h2>

        <!-- Image Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-3 mb-24">
          @for (imageUrl of stories; track $index) {
            <div class="w-full aspect-[4/5] bg-[#f4f5f7] rounded-md overflow-hidden relative group">
              <img 
                [src]="imageUrl" 
                alt="Success Story Student" 
                class="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          }
        </div>

        <!-- ========================================== -->
        <!-- PART 2: VIDEO TESTIMONIALS / SHOWCASE      -->
        <!-- ========================================== -->
        
        <!-- Video Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          @for (video of videoStories; track video.title) {
            <div class="flex flex-col group cursor-pointer">
              
              <!-- Video Thumbnail Wrapper -->
              <div class="relative w-full aspect-[3/4] rounded-xl overflow-hidden mb-4 bg-slate-100 shadow-sm border border-slate-200/50">
                <img 
                  [src]="video.imageUrl" 
                  [alt]="video.title" 
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                
                <!-- Play Button Overlay -->
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="w-11 h-11 rounded-full border-[1.5px] border-white/90 bg-black/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-black/40 group-hover:scale-110 transition-all duration-300">
                    <svg class="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              <!-- Text Content -->
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
  
  stories: string[] = Array(26).fill('').map((_, i) => {
    const pexelsImages = [
      'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=300',
      'https://images.pexels.com/photos/6129681/pexels-photo-6129681.jpeg?auto=compress&cs=tinysrgb&w=300',
      'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=300',
      'https://images.pexels.com/photos/7453018/pexels-photo-7453018.jpeg?auto=compress&cs=tinysrgb&w=300',
      'https://images.pexels.com/photos/4225880/pexels-photo-4225880.jpeg?auto=compress&cs=tinysrgb&w=300',
      'https://images.pexels.com/photos/8376277/pexels-photo-8376277.jpeg?auto=compress&cs=tinysrgb&w=300'
    ];
    return pexelsImages[i % pexelsImages.length];
  });

  videoStories: VideoStory[] = [
    {
      title: 'Responsive AI tool',
      author: 'Barbiana Liu',
      imageUrl: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      title: 'Dynamic site design with CMS',
      author: 'Brad Hussey',
      imageUrl: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      title: '3 Dope design elements',
      author: 'Marshall Fox',
      imageUrl: 'https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      title: '3 Cool no-code interactions',
      author: 'Barbiana Liu',
      imageUrl: 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      title: 'Collaboration tools for teams',
      author: 'Brad Hussey',
      imageUrl: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];
}