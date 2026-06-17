import { Component } from '@angular/core';

interface PartnerLogo {
  name: string;
  imgUrl: string;
  linkText?: string;
  linkUrl?: string;
}

@Component({
  selector: 'app-trusted-logos',
  standalone: true,
  template: `
    <section class="relative z-20 -mt-6 lg:-mt-10 bg-[#f5f6f8] border-b border-slate-200 py-8 lg:py-12 font-main">
      <div class="max-w-[1584px] mx-auto px-6 lg:px-12 xl:px-16 2xl:px-20 flex flex-col lg:flex-row items-center gap-8 lg:gap-16">

        <div class="w-full lg:w-auto flex-shrink-0 text-center lg:text-left">
          <h2 class="text-[22px] sm:text-2xl lg:text-[26px] font-medium text-slate-800 leading-[1.3] tracking-tight">
            Trusted By Leading <br class="hidden lg:block" />
            Universities & Employers
          </h2>
        </div>

        <div class="w-full flex-1 overflow-hidden">

          <div class="flex items-center justify-start lg:justify-between gap-12 lg:gap-10 overflow-x-auto pb-4 lg:pb-0 hide-scrollbar snap-x">

            @for (logo of logos; track logo.name + $index) {
              <div class="flex flex-col items-center justify-center gap-2 min-w-[150px] snap-center">

                <!-- Logo Only - No Background Block -->
                <div class="h-14 lg:h-16 flex items-center justify-center w-full">
                  <img
                    [src]="logo.imgUrl"
                    [alt]="logo.name"
                    class="max-h-full max-w-[140px] lg:max-w-[160px] object-contain opacity-100 hover:scale-105 transition-transform duration-300 cursor-pointer"
                  />
                </div>

                <div class="h-5 flex items-center justify-center">
                  @if (logo.linkText) {
                    <a
                      [href]="logo.linkUrl"
                      class="text-[11px] text-blue-600 hover:text-blue-800 font-medium whitespace-nowrap transition-colors"
                    >
                      {{ logo.linkText }}
                    </a>
                  }
                </div>

              </div>
            }

          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

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
export class TrustedLogosComponent {

  logos: PartnerLogo[] = [
    {
      name: 'University of Europe',
      imgUrl: 'https://images.pexels.com/photos/1337380/pexels-photo-1337380.jpeg?auto=compress&cs=tinysrgb&w=300',
      linkText: 'Watch our Recruitment Drive',
      linkUrl: '#'
    },
    {
      name: 'CHS Healthcare',
      imgUrl: 'https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      name: 'TIM IT Distribution',
      imgUrl: 'https://images.pexels.com/photos/258244/pexels-photo-258244.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      name: 'Tech Institute',
      imgUrl: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      name: 'Global Academy',
      imgUrl: 'https://images.pexels.com/photos/1337386/pexels-photo-1337386.jpeg?auto=compress&cs=tinysrgb&w=300',
      linkText: 'Watch our University Seminar',
      linkUrl: '#'
    }
  ];
}