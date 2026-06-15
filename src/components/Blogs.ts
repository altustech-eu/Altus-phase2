import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface MainBlog {
  coverImage: string;
  authorImage: string;
  tags: string;
  title: string;
  authorName: string;
}

interface MiniBlog {
  image: string;
  title: string;
}

interface ResourceCard {
  image: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-blogs-insights',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="font-main bg-white py-16 lg:py-24">
      <div class="max-w-[1300px] mx-auto px-6 lg:px-8">
        
        <!-- ========================================== -->
        <!-- PART 1: BLOGS & INSIGHTS                   -->
        <!-- ========================================== -->
        
        <h2 class="text-2xl lg:text-[32px] font-medium text-slate-900 uppercase tracking-wide mb-10">
          Blogs & Insights
        </h2>

        <!-- Main Blog Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <!-- FIXED: Changed 'track blog.title' to 'track $index' -->
          @for (blog of mainBlogs; track $index) {
            <div class="border border-slate-200 rounded-[2px] overflow-hidden flex flex-col group cursor-pointer hover:shadow-md transition-shadow bg-white">
              
              <!-- Cover Image & Overlapping Avatar -->
              <div class="relative h-[180px] bg-slate-100">
                <img [src]="blog.coverImage" alt="Cover" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                
                <!-- Avatar -->
                <div class="absolute -bottom-6 left-6 w-12 h-12 border-4 border-white rounded-[2px] overflow-hidden z-10 shadow-sm bg-slate-200">
                  <img [src]="blog.authorImage" alt="Author" class="w-full h-full object-cover" />
                </div>
              </div>

              <!-- Card Content -->
              <div class="p-6 pt-10 flex flex-col flex-1">
                <span class="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-3">
                  {{ blog.tags }}
                </span>
                
                <h3 class="text-[15px] font-bold text-slate-800 leading-[1.4] mb-6 group-hover:text-blue-600 transition-colors">
                  {{ blog.title }}
                </h3>
                
                <p class="text-[11px] text-slate-500 mt-auto font-medium">
                  By <span class="text-slate-800 font-semibold">{{ blog.authorName }}</span>
                </p>
              </div>
              
            </div>
          }
        </div>

        <!-- Mini Blog Cards Row -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-24">
          <!-- FIXED: Changed 'track mini.title' to 'track $index' -->
          @for (mini of miniBlogs; track $index) {
            <div class="border border-slate-200 rounded-[2px] p-3 flex gap-4 bg-white group cursor-pointer hover:shadow-sm transition-shadow h-28">
              <!-- Thumbnail -->
              <div class="w-24 h-full shrink-0 overflow-hidden rounded-[2px] bg-slate-100">
                <img [src]="mini.image" alt="Thumbnail" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              
              <!-- Content & Arrow -->
              <div class="flex flex-col flex-1 py-1">
                <h4 class="text-[12.5px] font-medium text-slate-800 leading-tight">
                  {{ mini.title }}
                </h4>
                
                <div class="mt-auto self-end text-blue-500 group-hover:translate-x-1 transition-transform">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </div>
              </div>
            </div>
          }
        </div>

        <!-- ========================================== -->
        <!-- PART 2: RESOURCES                          -->
        <!-- ========================================== -->
        
        <div class="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start mt-16 pt-16 border-t border-slate-100">
          
          <!-- Resources Title Sidebar -->
          <div class="lg:w-1/4 shrink-0">
            <h2 class="text-3xl lg:text-[34px] font-medium text-slate-900 tracking-tight sticky top-24">
              Resources
            </h2>
          </div>

          <!-- Resources Grid -->
          <div class="lg:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- FIXED: Changed 'track resource.title' to 'track $index' -->
            @for (resource of resources; track $index) {
              <div class="flex flex-col group cursor-pointer">
                <!-- Image -->
                <div class="h-[180px] w-full overflow-hidden bg-slate-100 mb-5">
                  <img [src]="resource.image" alt="Resource" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                
                <!-- Content -->
                <h3 class="text-[15px] font-bold text-slate-900 mb-2.5">
                  {{ resource.title }}
                </h3>
                <p class="text-[12px] text-slate-600 leading-relaxed font-medium mb-5 h-[36px] overflow-hidden line-clamp-2">
                  {{ resource.description }}
                </p>
                
                <!-- Action Link -->
                <button class="text-blue-500 text-[11.5px] font-semibold flex items-center gap-1.5 mt-auto group-hover:text-blue-700 transition-colors w-fit">
                  Learn Ausbildung programs, international
                  <svg class="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </button>
              </div>
            }
          </div>
          
        </div>

      </div>
    </section>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    
    .font-main {
      font-family: 'Inter', Helvetica, Arial, sans-serif; 
    }
  `]
})
export class BlogsInsightsComponent {
  
  mainBlogs: MainBlog[] = [
    {
      coverImage: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600',
      authorImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      tags: 'ENGINEERING',
      title: 'Client-side vs. Server-side Development: Key Differences and Advantages Explained',
      authorName: 'Alan Hadyk'
    },
    {
      coverImage: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=600',
      authorImage: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150',
      tags: 'ENGINEERING > BACK-END',
      title: 'Terraform vs. CloudFormation: Choosing the Right IaC Tool',
      authorName: 'Emiliano Angieri'
    },
    {
      coverImage: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600',
      authorImage: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      tags: 'DESIGN > UI DESIGN',
      title: 'Gestalt Principles: Strategic Design Framework for UI/UX Leaders',
      authorName: 'Adel Benzahda'
    },
    {
      coverImage: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600',
      authorImage: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      tags: 'DESIGN > UI DESIGN',
      title: 'Gestalt Principles: Strategic Design Framework for UI/UX Leaders (Part 2)',
      authorName: 'Adel Benzahda'
    }
  ];

  miniBlogs: MiniBlog[] = [
    {
      image: 'https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg?auto=compress&cs=tinysrgb&w=300',
      title: 'Maximize the value of hybrid cloud in the generative AI era'
    },
    {
      image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=300',
      title: 'Accelerate growth with hybrid cloud and AI expertise'
    },
    {
      image: 'https://images.pexels.com/photos/259200/pexels-photo-259200.jpeg?auto=compress&cs=tinysrgb&w=300',
      title: 'Create an intuitive supply chain that shapes the future'
    },
    {
      image: 'https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=300',
      title: 'Manage risk with both offensive and defensive capabilities'
    }
  ];

  resources: ResourceCard[] = [
    {
      image: 'https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=600',
      title: 'AI & Data in Rail 2026',
      description: 'Explore Ausbildung programs, international jobs, study abroad options.'
    },
    {
      image: 'https://images.pexels.com/photos/278888/pexels-photo-278888.jpeg?auto=compress&cs=tinysrgb&w=600',
      title: 'AI & Data in Rail 2026 - Guide',
      description: 'Explore Ausbildung programs, international jobs, study abroad options.'
    },
    {
      image: 'https://images.pexels.com/photos/730564/pexels-photo-730564.jpeg?auto=compress&cs=tinysrgb&w=600',
      title: 'AI & Data in Rail 2026 - Workshop',
      description: 'Explore Ausbildung programs, international jobs, study abroad options.'
    }
  ];
}