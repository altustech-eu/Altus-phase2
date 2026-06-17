import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CountryTab {
  id: string;
  country: string;
  flagUrl: string;
}

interface InstitutionCard {
  id: string;
  countryId: string;
  name: string;
  location: string;
  description: string;
  imageUrl: string;
  logoUrl: string;
  featured: boolean;
}

@Component({
  selector: 'app-study-destination',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="font-main bg-white py-14 lg:py-20">

      <div class="max-w-[1584px] mx-auto px-6 lg:px-12 xl:px-16 2xl:px-20">

        <!-- Heading -->
        <div class="mx-auto max-w-[920px] text-center mb-8 lg:mb-10">
          <p class="mb-4 text-[12px] font-semibold uppercase tracking-[0.28em] text-[#0f62fe]">
            Trusted Partners
          </p>

          <h2 class="text-[32px] md:text-[42px] lg:text-[48px] font-bold text-slate-900 tracking-[-0.04em] leading-[1.08]">
            Trusted by 1,500+ Universities, Colleges,
            <span class="block">and Schools Worldwide</span>
          </h2>
        </div>

        <!-- Country Tabs -->
        <div class="mx-auto mb-12 flex max-w-[1140px] flex-wrap items-center justify-center gap-3">
          @for (tab of countryTabs; track tab.id) {
            <button
              type="button"
              (click)="selectCountry(tab.id)"
              class="inline-flex h-[52px] items-center gap-3 border px-4 pr-5 transition-all duration-300"
              [class.bg-[#0f62fe]]="activeCountryId === tab.id"
              [class.border-[#0f62fe]]="activeCountryId === tab.id"
              [class.text-white]="activeCountryId === tab.id"
              [class.shadow-lg]="activeCountryId === tab.id"
              [class.shadow-blue-500/20]="activeCountryId === tab.id"
              [class.bg-white]="activeCountryId !== tab.id"
              [class.border-slate-200]="activeCountryId !== tab.id"
              [class.text-slate-800]="activeCountryId !== tab.id"
              [class.hover:border-[#0f62fe]]="activeCountryId !== tab.id"
            >
              <span class="flex h-9 w-9 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-white">
                <img
                  [src]="tab.flagUrl"
                  [alt]="tab.country + ' flag'"
                  class="h-full w-full object-cover"
                  loading="lazy"
                />
              </span>

              <span class="text-[16px] font-semibold whitespace-nowrap">
                {{ tab.country }}
              </span>
            </button>
          }
        </div>

        <!-- Institution Cards -->
        <div class="mx-auto grid max-w-[1140px] grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">

          @for (card of filteredInstitutions; track card.id) {
            <article class="group overflow-hidden border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0f62fe] hover:shadow-xl">

              <!-- Image -->
              <div class="relative h-[230px] overflow-hidden bg-slate-100">
                <img
                  [src]="card.imageUrl"
                  [alt]="card.name"
                  class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                @if (card.featured) {
                  <div class="absolute left-4 top-4 inline-flex h-9 items-center gap-2 bg-white/95 px-4 shadow-sm backdrop-blur">
                    <span class="h-2 w-2 rounded-full bg-[#0f62fe]"></span>
                    <span class="text-[12px] font-bold text-[#0f62fe]">
                      Featured
                    </span>
                  </div>
                }
              </div>

              <!-- Content -->
              <div class="p-5">
                <div class="mb-4 flex items-center gap-4">

                  <div class="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white shadow-sm">
                    <img
                      [src]="card.logoUrl"
                      [alt]="card.name + ' logo'"
                      class="h-full w-full object-contain p-1"
                      loading="lazy"
                    />
                  </div>

                  <div class="min-w-0">
                    <h3 class="truncate text-[20px] font-bold tracking-[-0.03em] text-slate-900">
                      {{ card.name }}
                    </h3>

                    <p class="mt-1 text-[13px] font-medium text-slate-500">
                      {{ card.location }}
                    </p>
                  </div>

                </div>

                <p class="line-clamp-5 text-[15px] leading-relaxed text-slate-600">
                  {{ card.description }}
                </p>
              </div>

            </article>
          }

        </div>

        <!-- CTA -->
        <div class="mt-10 flex justify-center">
          <button
            type="button"
            class="h-[52px] bg-[#0f62fe] px-8 text-[15px] font-bold text-white shadow-lg shadow-blue-500/20 transition hover:bg-[#0043ce]"
          >
            Explore More {{ activeCountryName }} Institutions
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

    .line-clamp-5 {
      display: -webkit-box;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `]
})
export class StudyDestinationComponent {

  activeCountryId = 'germany';

  countryTabs: CountryTab[] = [
    {
      id: 'australia',
      country: 'Australia',
      flagUrl: 'https://flagcdn.com/w80/au.png'
    },
    {
      id: 'canada',
      country: 'Canada',
      flagUrl: 'https://flagcdn.com/w80/ca.png'
    },
    {
      id: 'germany',
      country: 'Germany',
      flagUrl: 'https://flagcdn.com/w80/de.png'
    },
    {
      id: 'ireland',
      country: 'Ireland',
      flagUrl: 'https://flagcdn.com/w80/ie.png'
    },
    {
      id: 'usa',
      country: 'United States',
      flagUrl: 'https://flagcdn.com/w80/us.png'
    },
    {
      id: 'uk',
      country: 'United Kingdom',
      flagUrl: 'https://flagcdn.com/w80/gb.png'
    }
  ];

  institutions: InstitutionCard[] = [
    {
      id: 'de-1',
      countryId: 'germany',
      name: 'Hochschulen Fresenius',
      location: 'Berlin, Berlin, DE',
      description: 'Hochschule Fresenius began life as the Chemisches Laboratorium Fresenius in 1848 and has evolved into a privately owned German university with a long tradition of applied learning, industry orientation and academic excellence.',
      imageUrl: 'https://images.pexels.com/photos/159775/library-la-trobe-study-students-159775.jpeg?auto=compress&cs=tinysrgb&w=900',
      logoUrl: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=200',
      featured: true
    },
    {
      id: 'de-2',
      countryId: 'germany',
      name: 'Mediadesign Hochschule',
      location: 'Berlin, Berlin, DE',
      description: 'For over 35 years, Mediadesign Hochschule has been guiding students with expertise and experience into creative industries, design careers, media business, digital communication and future-focused professional pathways.',
      imageUrl: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=900',
      logoUrl: 'https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=200',
      featured: true
    },
    {
      id: 'de-3',
      countryId: 'germany',
      name: 'University of Europe for Applied Sciences',
      location: 'Iserlohn, Nordrhein-Westfalen, DE',
      description: 'The University of Europe for Applied Sciences is a vibrant and dynamic institution dedicated to providing top-quality education to students from all around the world with a strong career and industry orientation.',
      imageUrl: 'https://images.pexels.com/photos/8197543/pexels-photo-8197543.jpeg?auto=compress&cs=tinysrgb&w=900',
      logoUrl: 'https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg?auto=compress&cs=tinysrgb&w=200',
      featured: true
    },

    {
      id: 'au-1',
      countryId: 'australia',
      name: 'Australian Learning Institute',
      location: 'Sydney, New South Wales, AU',
      description: 'A practical education partner supporting international students with career-oriented programs, student support services, employability pathways and industry-connected learning models.',
      imageUrl: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=900',
      logoUrl: 'https://flagcdn.com/w80/au.png',
      featured: true
    },
    {
      id: 'au-2',
      countryId: 'australia',
      name: 'Southern Skills College',
      location: 'Melbourne, Victoria, AU',
      description: 'A vocational and higher education institution focused on hospitality, healthcare, business and technology programs for international learners.',
      imageUrl: 'https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&w=900',
      logoUrl: 'https://flagcdn.com/w80/au.png',
      featured: true
    },
    {
      id: 'au-3',
      countryId: 'australia',
      name: 'Pacific Career University',
      location: 'Brisbane, Queensland, AU',
      description: 'A student-focused institution offering applied learning, placement readiness, career guidance and practical academic programs for global students.',
      imageUrl: 'https://images.pexels.com/photos/256520/pexels-photo-256520.jpeg?auto=compress&cs=tinysrgb&w=900',
      logoUrl: 'https://flagcdn.com/w80/au.png',
      featured: true
    },

    {
      id: 'ca-1',
      countryId: 'canada',
      name: 'Canadian Applied College',
      location: 'Toronto, Ontario, CA',
      description: 'A Canada-focused academic partner supporting diploma, undergraduate and postgraduate learners with applied programs, co-op exposure and career readiness.',
      imageUrl: 'https://images.pexels.com/photos/356065/pexels-photo-356065.jpeg?auto=compress&cs=tinysrgb&w=900',
      logoUrl: 'https://flagcdn.com/w80/ca.png',
      featured: true
    },
    {
      id: 'ca-2',
      countryId: 'canada',
      name: 'Maple Global University',
      location: 'Vancouver, British Columbia, CA',
      description: 'A globally oriented institution offering student support, multicultural campus experience, employability-linked programs and international student services.',
      imageUrl: 'https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=900',
      logoUrl: 'https://flagcdn.com/w80/ca.png',
      featured: true
    },
    {
      id: 'ca-3',
      countryId: 'canada',
      name: 'Northbridge College',
      location: 'Ottawa, Ontario, CA',
      description: 'A practical learning destination for international students exploring business, IT, healthcare and skilled career-oriented education routes.',
      imageUrl: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=900',
      logoUrl: 'https://flagcdn.com/w80/ca.png',
      featured: true
    },

    {
      id: 'ie-1',
      countryId: 'ireland',
      name: 'Dublin Business College',
      location: 'Dublin, Leinster, IE',
      description: 'An Ireland-focused partner institution supporting business, technology, analytics and management pathways for global student mobility.',
      imageUrl: 'https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?auto=compress&cs=tinysrgb&w=900',
      logoUrl: 'https://flagcdn.com/w80/ie.png',
      featured: true
    },
    {
      id: 'ie-2',
      countryId: 'ireland',
      name: 'Emerald Tech Institute',
      location: 'Cork, Munster, IE',
      description: 'A modern technology and applied learning institution focused on digital skills, employability, international student support and career transition.',
      imageUrl: 'https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg?auto=compress&cs=tinysrgb&w=900',
      logoUrl: 'https://flagcdn.com/w80/ie.png',
      featured: true
    },
    {
      id: 'ie-3',
      countryId: 'ireland',
      name: 'Ireland International Academy',
      location: 'Galway, Connacht, IE',
      description: 'A student-centred academic partner offering global learning pathways, progression routes and employability-oriented academic support.',
      imageUrl: 'https://images.pexels.com/photos/320518/pexels-photo-320518.jpeg?auto=compress&cs=tinysrgb&w=900',
      logoUrl: 'https://flagcdn.com/w80/ie.png',
      featured: true
    },

    {
      id: 'us-1',
      countryId: 'usa',
      name: 'American Pathway College',
      location: 'Boston, Massachusetts, US',
      description: 'A US academic partner supporting undergraduate, postgraduate and pathway programs with strong student services and global campus exposure.',
      imageUrl: 'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=900',
      logoUrl: 'https://flagcdn.com/w80/us.png',
      featured: true
    },
    {
      id: 'us-2',
      countryId: 'usa',
      name: 'United Global University',
      location: 'New York, New York, US',
      description: 'A globally recognised learning environment focused on innovation, business, technology, research exposure and international student development.',
      imageUrl: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=900',
      logoUrl: 'https://flagcdn.com/w80/us.png',
      featured: true
    },
    {
      id: 'us-3',
      countryId: 'usa',
      name: 'Pacific State College',
      location: 'San Francisco, California, US',
      description: 'A career-aligned institution supporting international students with applied programs, industry exposure and strong global learning outcomes.',
      imageUrl: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=900',
      logoUrl: 'https://flagcdn.com/w80/us.png',
      featured: true
    },

    {
      id: 'uk-1',
      countryId: 'uk',
      name: 'London Career University',
      location: 'London, England, UK',
      description: 'A UK academic partner offering recognised programs, international student support, career preparation and strong academic progression routes.',
      imageUrl: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=900',
      logoUrl: 'https://flagcdn.com/w80/gb.png',
      featured: true
    },
    {
      id: 'uk-2',
      countryId: 'uk',
      name: 'Manchester Global College',
      location: 'Manchester, England, UK',
      description: 'A globally connected institution supporting international learners with business, healthcare, technology and creative academic pathways.',
      imageUrl: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=900',
      logoUrl: 'https://flagcdn.com/w80/gb.png',
      featured: true
    },
    {
      id: 'uk-3',
      countryId: 'uk',
      name: 'British Applied Sciences Institute',
      location: 'Birmingham, England, UK',
      description: 'An applied sciences focused institution supporting students with academic progression, workplace readiness and strong professional outcomes.',
      imageUrl: 'https://images.pexels.com/photos/159775/library-la-trobe-study-students-159775.jpeg?auto=compress&cs=tinysrgb&w=900',
      logoUrl: 'https://flagcdn.com/w80/gb.png',
      featured: true
    }
  ];

  get filteredInstitutions(): InstitutionCard[] {
    return this.institutions.filter(card => card.countryId === this.activeCountryId);
  }

  get activeCountryName(): string {
    return this.countryTabs.find(tab => tab.id === this.activeCountryId)?.country || 'Partner';
  }

  selectCountry(id: string): void {
    this.activeCountryId = id;
  }
}