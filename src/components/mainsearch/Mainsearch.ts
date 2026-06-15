import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

type SearchType = 'jobs' | 'ausbildung' | 'study' | 'language' | 'all';

interface LeftNavigationItem {
  id: string;
  label: string;
}

interface ContentCard {
  title: string;
  subtitle?: string;
  description?: string;
  category?: string;
  image?: string;
  logo?: string;
  cta?: string;
  meta?: string;
}

interface ContentSection {
  id: string;
  title: string;
  type: 'logo' | 'image' | 'plain' | 'profile' | 'document' | 'video' | 'guide';
  cards: ContentCard[];
}

@Component({
  selector: 'app-main-search',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main class="min-h-screen bg-white font-main text-[#161616]">

      <!-- Grey Search Hero -->
      <section class="bg-[#e8e8e8] py-10">
        <div class="mx-auto max-w-[1440px] px-6">
          <div class="grid grid-cols-1 gap-3 md:grid-cols-[1.1fr_1fr_1fr_140px]">
            <input
              class="h-11 border border-[#d0d0d0] bg-white px-4 text-[13px] outline-none placeholder:text-[#8d8d8d]"
              placeholder="Search by keyword, program, job, university"
              [value]="keyword()"
              (input)="keyword.set($any($event.target).value)"
            />

            <input
              class="h-11 border border-[#d0d0d0] bg-white px-4 text-[13px] outline-none placeholder:text-[#8d8d8d]"
              placeholder="Country, city or destination"
              [value]="location()"
              (input)="location.set($any($event.target).value)"
            />

            <select
              class="h-11 border border-[#d0d0d0] bg-white px-4 text-[13px] outline-none"
              [value]="activeTab()"
              (change)="activeTab.set($any($event.target).value)"
            >
              <option value="all">All Categories</option>
              <option value="jobs">Jobs</option>
              <option value="ausbildung">Apprenticeship</option>
              <option value="study">Courses / Study</option>
              <option value="language">German Language</option>
            </select>

            <button class="h-11 bg-[#0f62fe] text-[13px] font-medium text-white hover:bg-[#0043ce]">
              Search
            </button>
          </div>
        </div>
      </section>

      <!-- Main Layout -->
      <section class="mx-auto grid max-w-[1440px] grid-cols-1 gap-8 px-6 py-8 lg:grid-cols-[260px_1fr]">

        <!-- Left Sidebar -->
        <aside class="hidden lg:block">
          <div class="sticky top-0 bg-white">
            <nav class="relative border-l-[3px] border-[#d9d9d9] py-1">
              @for (item of leftNavigation; track item.id) {
                <button
                  class="relative block w-full py-[10px] pl-5 pr-4 text-left text-[13px] font-normal leading-none transition-colors hover:text-[#0f62fe]"
                  [ngClass]="activeSection() === item.id ? 'text-[#161616]' : 'text-[#525252]'"
                  (click)="setActiveSection(item.id)"
                >
                  @if (activeSection() === item.id) {
                    <span class="absolute left-[-3px] top-0 h-full w-[3px] bg-[#0f62fe]"></span>
                  }

                  {{ item.label }}
                </button>
              }
            </nav>
          </div>
        </aside>

        <!-- Content Area -->
        <div class="min-w-0">

          <!-- Search Row -->
          <div class="mb-8 flex flex-col gap-4 border-b border-[#e0e0e0] pb-5 md:flex-row md:items-center md:justify-between">
            <div class="flex h-10 max-w-[420px] items-center border border-[#c6c6c6] bg-white px-3">
              <span class="mr-2 text-[#6f6f6f]">⌕</span>

              <input
                class="w-full text-[13px] outline-none placeholder:text-[#8d8d8d]"
                placeholder="Search"
                [value]="keyword()"
                (input)="keyword.set($any($event.target).value)"
              />
            </div>

            <div class="flex items-center gap-3 text-[12px] text-[#525252]">
              <span>{{ totalCards() }} results</span>

              <button class="text-[#0f62fe] hover:text-[#0043ce]" (click)="clearSearch()">
                Clear filters
              </button>
            </div>
          </div>

          <!-- Content Sections -->
          <div class="space-y-14">
            @for (section of filteredSections(); track section.id) {
              <section [id]="section.id" class="scroll-mt-8">

                <!-- Section Title -->
                <div class="mb-5 flex items-center justify-between">
                  <h2 class="text-[22px] font-semibold tracking-[-0.02em] text-[#161616]">
                    {{ section.title }}
                  </h2>

                  <a href="#" class="text-[12px] font-medium text-[#0f62fe] hover:text-[#0043ce]">
                    View all →
                  </a>
                </div>

                <div
                  class="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
                  [ngClass]="{
                    'gap-8': section.id === 'universities' || section.id === 'employers',
                    'gap-2': section.id === 'virtual-tour-open-day'
                  }"
                >

                  @for (card of section.cards; track card.title) {

                    <!-- IBM STYLE JOBS CARD -->
                    @if (section.id === 'jobs') {
                      <article class="group flex min-h-[162px] flex-col justify-between border border-[#d0d0d0] bg-[#f4f4f4] p-4 transition-colors hover:bg-[#e8e8e8]">

                        <div>
                          @if (card.logo) {
                            <div class="mb-5 flex h-9 items-center">
                              <div class="text-[30px] font-semibold leading-none tracking-[-0.05em] text-[#003a6d]">
                                {{ card.logo }}
                              </div>
                            </div>
                          } @else {
                            <div class="mb-5 h-9"></div>
                          }

                          <h3 class="max-w-[240px] text-[13px] font-normal leading-snug text-[#262626]">
                            {{ card.title }}
                          </h3>

                          @if (card.description) {
                            <p class="mt-2 max-w-[250px] text-[12px] leading-relaxed text-[#525252]">
                              {{ card.description }}
                            </p>
                          }
                        </div>

                        <div class="mt-8 flex items-center justify-between">
                          <a href="#" class="text-[11px] font-normal text-[#0f62fe] hover:text-[#0043ce]">
                            {{ card.cta || 'Read the story' }}
                          </a>

                          <span class="text-[18px] font-light text-[#0f62fe] transition-transform group-hover:translate-x-1">
                            →
                          </span>
                        </div>
                      </article>
                    }

                    <!-- IBM STYLE APPRENTICESHIP CARD -->
                    @else if (section.id === 'apprenticeship') {
                      <article class="group overflow-hidden border border-[#d0d0d0] bg-[#f4f4f4] transition-colors hover:bg-[#e8e8e8]">

                        <div class="h-[10px] border-t-[3px] border-[#78a9ff] bg-[#e8f0ff]"></div>

                        <div class="h-[135px] overflow-hidden bg-[#dde8ff]">
                          <img
                            [src]="card.image || fallbackImage"
                            [alt]="card.title"
                            class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                          />
                        </div>

                        <div class="flex min-h-[108px] flex-col justify-between p-4">
                          <div>
                            <h3 class="text-[13px] font-normal leading-snug text-[#262626]">
                              {{ card.title }}
                            </h3>

                            @if (card.description) {
                              <p class="mt-2 line-clamp-2 text-[12px] leading-relaxed text-[#525252]">
                                {{ card.description }}
                              </p>
                            }
                          </div>

                          <div class="mt-6 flex items-center justify-between">
                            <a href="#" class="text-[11px] font-normal text-[#0f62fe] hover:text-[#0043ce]">
                              {{ card.cta || 'Learn more' }}
                            </a>

                            <span class="text-[18px] font-light text-[#0f62fe] transition-transform group-hover:translate-x-1">
                              →
                            </span>
                          </div>
                        </div>
                      </article>
                    }

                    <!-- UNIVERSITY STYLE COURSES CARD -->
                    @else if (section.id === 'courses') {
                      <article class="group relative flex min-h-[175px] flex-col justify-between bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-transform duration-300 hover:-translate-y-1">

                        <div>
                          <h3 class="mb-10 max-w-[210px] text-[20px] font-normal leading-tight text-[#161616]">
                            {{ card.title }}
                          </h3>

                          <div class="flex items-center gap-3">
                            <div class="flex h-8 w-8 items-center justify-center rounded-full border border-[#d0e2ff] text-[13px] text-[#0f62fe]">
                              ⚕
                            </div>

                            <div>
                              <p class="text-[13px] leading-tight text-[#525252]">
                                Faculty of
                              </p>

                              <p class="text-[13px] font-semibold leading-tight text-[#161616]">
                                {{ card.category }}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div
                          class="absolute bottom-0 left-0 h-[3px] w-full"
                          [ngClass]="{
                            'bg-[#08bdba]': card.meta === 'teal',
                            'bg-[#ee5396]': card.meta === 'pink',
                            'bg-[#0f62fe]': card.meta === 'blue'
                          }"
                        ></div>
                      </article>
                    }

                    <!-- POSTER STYLE SUBJECT CARD -->
                    @else if (section.id === 'subjects') {
                      <article class="group overflow-hidden bg-white shadow-[0_8px_24px_rgba(0,0,0,0.10)] transition-transform duration-300 hover:-translate-y-1">

                        <div class="relative h-[150px] overflow-hidden bg-[#0f62fe]">
                          <img
                            [src]="card.image || fallbackImage"
                            [alt]="card.title"
                            class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                          />

                          <div class="absolute left-3 top-3 z-10 text-[12px] font-semibold tracking-tight text-white">
                            ALTUS
                          </div>

                          <div class="absolute inset-0 bg-gradient-to-r from-[#0f62fe]/50 via-[#0f62fe]/10 to-transparent"></div>
                        </div>

                        <div class="p-4">
                          <div class="mb-3 flex items-start gap-2">
                            <div class="mt-1 text-[#0f62fe]">♡</div>

                            <div>
                              <h3 class="text-[16px] font-semibold leading-tight text-[#161616]">
                                {{ card.title }}
                              </h3>

                              <p class="text-[16px] font-semibold leading-tight text-[#0f62fe]">
                                {{ card.subtitle || card.category }}
                              </p>
                            </div>
                          </div>

                          <p class="mb-4 line-clamp-2 text-[10px] leading-relaxed text-[#525252]">
                            {{ card.description }}
                          </p>

                          <div class="mb-4 grid grid-cols-3 gap-3 text-[9px] text-[#525252]">
                            <div>
                              <div class="mb-1 text-[13px] text-[#0f62fe]">⌂</div>
                              <p class="font-semibold text-[#161616]">Popular Programs</p>
                              <p>UG, PG & pathway options</p>
                            </div>

                            <div>
                              <div class="mb-1 text-[13px] text-[#0f62fe]">◎</div>
                              <p class="font-semibold text-[#161616]">Study Destination</p>
                              <p>Germany, Europe & global</p>
                            </div>

                            <div>
                              <div class="mb-1 text-[13px] text-[#0f62fe]">▣</div>
                              <p class="font-semibold text-[#161616]">Career Opportunity</p>
                              <p>Outcome mapped pathway</p>
                            </div>
                          </div>

                          <div class="mb-4 grid grid-cols-2 gap-2">
                            <a href="#" class="flex h-8 items-center justify-center bg-[#0f62fe] text-[10px] font-medium text-white hover:bg-[#0043ce]">
                              Explore Programs →
                            </a>

                            <a href="#" class="flex h-8 items-center justify-center border border-[#0f62fe] text-[10px] font-medium text-[#0f62fe] hover:bg-[#edf5ff]">
                              Talk to Counsellor
                            </a>
                          </div>

                          <div class="grid grid-cols-4 gap-2 border-t border-[#e0e0e0] pt-3 text-[8px] text-[#525252]">
                            <div>
                              <p class="font-semibold text-[#161616]">Globally Recognised</p>
                              <p>Degree</p>
                            </div>

                            <div>
                              <p class="font-semibold text-[#161616]">High Career</p>
                              <p>Growth</p>
                            </div>

                            <div>
                              <p class="font-semibold text-[#161616]">International</p>
                              <p>Exposure</p>
                            </div>

                            <div>
                              <p class="font-semibold text-[#161616]">Destination</p>
                              <p>Guidance</p>
                            </div>
                          </div>
                        </div>
                      </article>
                    }

                    <!-- CASE STUDY STYLE UNIVERSITIES CARD -->
                    @else if (section.id === 'universities') {
                      <article class="group flex min-h-[245px] flex-col justify-between bg-white p-5 transition-colors hover:bg-[#f4f4f4]">

                        <div>
                          <div class="mb-6 flex h-16 items-center">
                            <div class="text-[34px] font-semibold italic tracking-[-0.05em] text-[#2f4ea2]">
                              {{ card.logo || 'Pfizer' }}
                            </div>
                          </div>

                          <h3 class="mb-2 max-w-[240px] text-[12px] font-semibold leading-snug text-[#161616]">
                            {{ card.title }}
                          </h3>

                          <p class="max-w-[250px] text-[12px] leading-relaxed text-[#525252]">
                            {{ card.description }}
                          </p>
                        </div>

                        <div class="mt-8 flex items-center gap-3">
                          <a href="#" class="text-[11px] font-normal text-[#0f62fe] hover:text-[#0043ce]">
                            {{ card.cta || 'Read the case study' }}
                          </a>

                          <span class="text-[16px] font-light text-[#0f62fe] transition-transform group-hover:translate-x-1">
                            →
                          </span>
                        </div>
                      </article>
                    }

                    <!-- VIRTUAL TOUR PROPERTY STYLE CARD -->
                    @else if (section.id === 'virtual-tour-open-day') {
                      <article class="group overflow-hidden bg-[#e0e0e0] p-1 transition-transform duration-300 hover:-translate-y-1">

                        <div class="relative h-[110px] overflow-hidden rounded-[18px] bg-[#262626]">
                          <img
                            [src]="card.image || fallbackImage"
                            [alt]="card.title"
                            class="h-full w-full object-cover opacity-75 transition-transform duration-300 group-hover:scale-[1.04]"
                          />

                          <div class="absolute inset-0 bg-gradient-to-r from-[#1f2937]/80 via-[#1f2937]/35 to-transparent"></div>

                          <div class="absolute left-4 top-4 max-w-[190px]">
                            <h3 class="text-[11px] font-semibold leading-tight text-white">
                              {{ card.title }}
                            </h3>

                            <p class="mt-1 text-[9px] leading-tight text-white/80">
                              {{ card.description }}
                            </p>
                          </div>

                          <div class="absolute bottom-4 left-4">
                            <p class="mb-2 text-[13px] font-semibold text-white">
                              {{ card.meta || '$340/m' }}
                            </p>

                            <a href="#" class="inline-flex h-6 items-center rounded-full bg-white px-4 text-[9px] font-medium text-[#161616]">
                              {{ card.cta || 'Check Availability' }}
                            </a>
                          </div>
                        </div>
                      </article>
                    }

                    <!-- EMPLOYER STRATEGIC CASE STUDY CARD -->
                    @else if (section.id === 'employers') {
                      <article class="group flex min-h-[230px] flex-col justify-between bg-white p-5 transition-colors hover:bg-[#f4f4f4]">

                        <div>
                          <div class="mb-7 flex h-12 items-center">
                            <div
                              class="text-[26px] font-semibold leading-none tracking-[-0.04em]"
                              [ngClass]="{
                                'text-[#5e4b8b]': card.meta === 'riyadh',
                                'text-[#005eb8]': card.meta === 'neste',
                                'text-[#161616]': card.meta === 'gov'
                              }"
                            >
                              {{ card.logo || card.title }}
                            </div>
                          </div>

                          <p class="max-w-[255px] text-[12px] leading-relaxed text-[#393939]">
                            {{ card.description }}
                          </p>
                        </div>

                        <div class="mt-7 flex items-center gap-3">
                          <a href="#" class="text-[11px] font-normal text-[#0f62fe] hover:text-[#0043ce]">
                            {{ card.cta || 'Read the story' }}
                          </a>

                          <span class="text-[16px] font-light text-[#0f62fe] transition-transform group-hover:translate-x-1">
                            →
                          </span>
                        </div>
                      </article>
                    }

                    <!-- DEFAULT IMAGE CARD -->
                    @else if (section.type === 'image') {
                      <article class="group overflow-hidden border border-[#e0e0e0] bg-white">
                        <div class="h-[155px] bg-[#dde8ff]">
                          <img
                            [src]="card.image || fallbackImage"
                            [alt]="card.title"
                            class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                          />
                        </div>

                        <div class="p-4">
                          <p class="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6f6f6f]">
                            {{ card.category }}
                          </p>

                          <h3 class="mb-3 min-h-[44px] text-[16px] font-semibold leading-snug">
                            {{ card.title }}
                          </h3>

                          <p class="mb-4 line-clamp-2 text-[13px] leading-relaxed text-[#525252]">
                            {{ card.description }}
                          </p>

                          <a href="#" class="text-[13px] font-medium text-[#0f62fe]">
                            {{ card.cta || 'Learn more' }} →
                          </a>
                        </div>
                      </article>
                    }

                    <!-- DEFAULT LOGO CARD -->
                    @else if (section.type === 'logo') {
                      <article class="border border-[#e0e0e0] bg-white p-5">
                        <div class="mb-5 flex h-12 items-center">
                          <div class="text-[24px] font-bold text-[#0f62fe]">
                            {{ card.logo || card.title }}
                          </div>
                        </div>

                        <h3 class="mb-2 text-[15px] font-semibold">
                          {{ card.title }}
                        </h3>

                        <p class="mb-4 text-[13px] leading-relaxed text-[#525252]">
                          {{ card.description }}
                        </p>

                        <a href="#" class="text-[13px] font-medium text-[#0f62fe]">
                          {{ card.cta || 'View profile' }} →
                        </a>
                      </article>
                    }

                    <!-- PROFILE CARD -->
                    @else if (section.type === 'profile') {
                      <article class="border border-[#e0e0e0] bg-white p-5">
                        <div class="mb-4 flex items-center gap-4">
                          <img
                            [src]="card.image || profileImage"
                            [alt]="card.title"
                            class="h-16 w-16 rounded-full object-cover"
                          />

                          <div>
                            <h3 class="text-[15px] font-semibold">
                              {{ card.title }}
                            </h3>

                            <p class="text-[12px] text-[#6f6f6f]">
                              {{ card.subtitle }}
                            </p>
                          </div>
                        </div>

                        <p class="mb-4 text-[13px] leading-relaxed text-[#525252]">
                          {{ card.description }}
                        </p>

                        <button class="w-full border border-[#0f62fe] px-4 py-2 text-[13px] font-medium text-[#0f62fe] hover:bg-[#edf5ff]">
                          Chat / Follow
                        </button>
                      </article>
                    }

                    <!-- VIDEO CARD -->
                    @else if (section.type === 'video') {
                      <article class="overflow-hidden border border-[#e0e0e0] bg-white">
                        <div class="relative h-[155px] bg-[#262626]">
                          <img
                            [src]="card.image || videoImage"
                            [alt]="card.title"
                            class="h-full w-full object-cover opacity-80"
                          />

                          <div class="absolute inset-0 flex items-center justify-center">
                            <div class="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-[#0f62fe]">
                              ▶
                            </div>
                          </div>
                        </div>

                        <div class="p-4">
                          <h3 class="mb-2 text-[15px] font-semibold leading-snug">
                            {{ card.title }}
                          </h3>

                          <p class="text-[13px] text-[#525252]">
                            {{ card.description }}
                          </p>
                        </div>
                      </article>
                    }

                    <!-- GUIDE CARD -->
                    @else if (section.type === 'guide') {
                      <article class="overflow-hidden border border-[#e0e0e0] bg-white">
                        <div class="h-[190px] bg-[#f4f4f4]">
                          <img
                            [src]="card.image || fallbackImage"
                            [alt]="card.title"
                            class="h-full w-full object-cover"
                          />
                        </div>

                        <div class="p-4">
                          <p class="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6f6f6f]">
                            {{ card.category }}
                          </p>

                          <h3 class="mb-3 text-[16px] font-semibold leading-snug">
                            {{ card.title }}
                          </h3>

                          <p class="mb-4 text-[13px] leading-relaxed text-[#525252]">
                            {{ card.description }}
                          </p>

                          <a href="#" class="text-[13px] font-medium text-[#0f62fe]">
                            {{ card.cta || 'Open guide' }} →
                          </a>
                        </div>
                      </article>
                    }

                    <!-- PLAIN / DOCUMENT CARD -->
                    @else if (section.type === 'plain' || section.type === 'document') {
                      <article class="border border-[#e0e0e0] bg-white p-5">
                        <p class="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6f6f6f]">
                          {{ card.category || section.title }}
                        </p>

                        <h3 class="mb-3 text-[16px] font-semibold leading-snug">
                          {{ card.title }}
                        </h3>

                        <p class="mb-4 text-[13px] leading-relaxed text-[#525252]">
                          {{ card.description }}
                        </p>

                        <a href="#" class="text-[13px] font-medium text-[#0f62fe]">
                          {{ card.cta || 'Read more' }} →
                        </a>
                      </article>
                    }

                  }
                </div>

                <!-- Strategic Partnerships Row only for Employers -->
                @if (section.id === 'employers') {
                  <div class="mt-8">
                    <p class="mb-5 text-center text-[12px] font-semibold text-[#161616]">
                      Strategic partnerships
                    </p>

                    <div class="mx-auto grid max-w-[820px] grid-cols-2 gap-5 md:grid-cols-4">
                      <div class="flex h-12 items-center justify-center border border-[#e0e0e0] bg-white text-[22px] font-semibold text-[#232f3e]">
                        aws
                      </div>

                      <div class="flex h-12 items-center justify-center border border-[#e0e0e0] bg-white text-[18px] font-semibold text-[#00a1e0]">
                        salesforce
                      </div>

                      <div class="flex h-12 items-center justify-center border border-[#e0e0e0] bg-white text-[18px] font-semibold text-[#737373]">
                        Microsoft
                      </div>

                      <div class="flex h-12 items-center justify-center border border-[#e0e0e0] bg-white text-[18px] font-semibold text-[#f80000]">
                        ORACLE
                      </div>
                    </div>
                  </div>
                }

              </section>
            }
          </div>
        </div>
      </section>

      <footer class="mt-12 h-[220px] bg-[#0f62fe]"></footer>
    </main>
  `,
  styles: [`
    .font-main {
      font-family: 'Poppins', Helvetica, Arial, sans-serif;
    }

    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `]
})
export class MainSearchComponent {
  activeTab = signal<SearchType>('all');
  keyword = signal('');
  location = signal('');
  activeSection = signal('jobs');

  fallbackImage = 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=900';
  profileImage = 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600';
  videoImage = 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=900';

  leftNavigation: LeftNavigationItem[] = [
    { id: 'jobs', label: 'Jobs' },
    { id: 'apprenticeship', label: 'Apprenticeship' },
    { id: 'courses', label: 'Courses' },
    { id: 'subjects', label: 'Subjects' },
    { id: 'universities', label: 'Universities' },
    { id: 'virtual-tour-open-day', label: 'Virtual Tour - Open Day' },
    { id: 'employers', label: 'Employers' },
    { id: 'join-the-community', label: 'Join the Community' },
    { id: 'events', label: 'Events' },
    { id: 'faqs', label: "FAQ's" },
    { id: 'tools', label: 'Tools' },
    { id: 'germany-workplace-experience', label: 'Germany Workplace Experience' },
    { id: 'guides', label: 'Guides' },
    { id: 'location-guides', label: 'Location Guides' },
    { id: 'career-pathway-advice-hub', label: 'Career Pathway Advice Hub' },
    { id: 'industry-insights', label: 'Industry Insights' },
    { id: 'videos', label: 'Videos' },
    { id: 'blogs', label: 'Blogs' },
    { id: 'news-articles', label: 'News & Articles' },
    { id: 'documents', label: 'Documents' }
  ];

  pexelsImages = {
    nursing: 'https://images.pexels.com/photos/8460034/pexels-photo-8460034.jpeg?auto=compress&cs=tinysrgb&w=900',
    automotive: 'https://images.pexels.com/photos/4489734/pexels-photo-4489734.jpeg?auto=compress&cs=tinysrgb&w=900',
    hospitality: 'https://images.pexels.com/photos/5371577/pexels-photo-5371577.jpeg?auto=compress&cs=tinysrgb&w=900',

    medicine: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=900',
    business: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=900',
    engineering: 'https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&cs=tinysrgb&w=900',

    campus: 'https://images.pexels.com/photos/7683887/pexels-photo-7683887.jpeg?auto=compress&cs=tinysrgb&w=900',
    openDay: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=900',
    studentLife: 'https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?auto=compress&cs=tinysrgb&w=900',

    employerHealthcare: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=900',
    employerHospitality: 'https://images.pexels.com/photos/3184192/pexels-photo-3184192.jpeg?auto=compress&cs=tinysrgb&w=900',
    employerLogistics: 'https://images.pexels.com/photos/6169053/pexels-photo-6169053.jpeg?auto=compress&cs=tinysrgb&w=900',

    ambassador1: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
    ambassador2: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
    ambassador3: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=600',

    eventTech: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=900',
    eventAusbildung: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=900',
    eventStudy: 'https://images.pexels.com/photos/5427864/pexels-photo-5427864.jpeg?auto=compress&cs=tinysrgb&w=900',

    workplace: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=900',
    interview: 'https://images.pexels.com/photos/5439137/pexels-photo-5439137.jpeg?auto=compress&cs=tinysrgb&w=900',
    crossCulture: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=900',

    guide1: 'https://images.pexels.com/photos/4145197/pexels-photo-4145197.jpeg?auto=compress&cs=tinysrgb&w=900',
    guide2: 'https://images.pexels.com/photos/5905885/pexels-photo-5905885.jpeg?auto=compress&cs=tinysrgb&w=900',
    guide3: 'https://images.pexels.com/photos/5427868/pexels-photo-5427868.jpeg?auto=compress&cs=tinysrgb&w=900',

    location1: 'https://images.pexels.com/photos/109629/pexels-photo-109629.jpeg?auto=compress&cs=tinysrgb&w=900',
    location2: 'https://images.pexels.com/photos/34632/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=900',
    location3: 'https://images.pexels.com/photos/2570063/pexels-photo-2570063.jpeg?auto=compress&cs=tinysrgb&w=900',

    advisor1: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600',
    advisor2: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=600',
    advisor3: 'https://images.pexels.com/photos/3777564/pexels-photo-3777564.jpeg?auto=compress&cs=tinysrgb&w=600',

    video1: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=900',
    video2: 'https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg?auto=compress&cs=tinysrgb&w=900',
    video3: 'https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=900',

    blog1: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=900',
    blog2: 'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=900',
    blog3: 'https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=900',

    news1: 'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=900',
    news2: 'https://images.pexels.com/photos/2422290/pexels-photo-2422290.jpeg?auto=compress&cs=tinysrgb&w=900',
    news3: 'https://images.pexels.com/photos/3182826/pexels-photo-3182826.jpeg?auto=compress&cs=tinysrgb&w=900'
  };

  sections: ContentSection[] = [
    {
      id: 'jobs',
      title: 'Jobs',
      type: 'logo',
      cards: [
        {
          title: 'Healthcare Assistant Jobs',
          description: 'Healthcare roles with documentation, interview and relocation support.',
          cta: 'Read the story'
        },
        {
          title: 'IT & Software Jobs',
          logo: 'HCS',
          description: 'European IT career options for developers, analysts and support roles.',
          cta: 'Read the story'
        },
        {
          title: 'Hospitality Jobs',
          description: 'Hotel, restaurant and service-sector jobs across Europe and GCC.',
          cta: 'Read the story'
        }
      ]
    },
    {
      id: 'apprenticeship',
      title: 'Apprenticeship',
      type: 'image',
      cards: [
        {
          title: 'Nursing Ausbildung in Germany',
          category: 'Ausbildung',
          image: this.pexelsImages.nursing,
          description: 'A structured German vocational pathway for healthcare careers.',
          cta: 'Learn more'
        },
        {
          title: 'Automotive Mechatronics',
          category: 'Ausbildung',
          image: this.pexelsImages.automotive,
          description: 'Technical apprenticeship route for automotive and mechatronics roles.',
          cta: 'Explore pathway'
        },
        {
          title: 'Hotel & Hospitality',
          category: 'Ausbildung',
          image: this.pexelsImages.hospitality,
          description: 'Hospitality pathway with German language and interview preparation.',
          cta: 'Explore program'
        }
      ]
    },
    {
      id: 'courses',
      title: 'Courses',
      type: 'plain',
      cards: [
        {
          title: 'Odontology',
          category: 'Odontology',
          description: 'Dental medicine and oral healthcare study pathway.',
          cta: 'Explore course',
          meta: 'teal'
        },
        {
          title: 'PHARMACY',
          category: 'Pharmacy',
          description: 'Pharmaceutical science, healthcare and clinical career pathway.',
          cta: 'Compare course',
          meta: 'pink'
        },
        {
          title: 'VETERINARY MEDICINE',
          category: 'Veterinary medicine',
          description: 'Animal healthcare, veterinary science and global study route.',
          cta: 'View details',
          meta: 'blue'
        }
      ]
    },
    {
      id: 'subjects',
      title: 'Subjects',
      type: 'image',
      cards: [
        {
          title: 'Medicine &',
          subtitle: 'Healthcare',
          category: 'Healthcare',
          image: this.pexelsImages.medicine,
          description: 'Study globally recognised medical and healthcare programs and build a career that makes a difference.',
          cta: 'Explore programs'
        },
        {
          title: 'Business &',
          subtitle: 'Management',
          category: 'Business',
          image: this.pexelsImages.business,
          description: 'Explore business, management, finance, entrepreneurship and international career pathways.',
          cta: 'Explore programs'
        },
        {
          title: 'Engineering &',
          subtitle: 'Technology',
          category: 'Technology',
          image: this.pexelsImages.engineering,
          description: 'Compare engineering, IT, software, AI, data and technology-linked global study options.',
          cta: 'Explore programs'
        }
      ]
    },
    {
      id: 'universities',
      title: 'Universities',
      type: 'logo',
      cards: [
        {
          title: 'Creating a healthier tomorrow with Career360',
          logo: 'Pfizer',
          description: 'To ensure vital education pathways reach students as quickly as possible, partner universities need a stronger platform-led admission and counselling ecosystem.',
          cta: 'Read the case study'
        },
        {
          title: 'Modernising admissions with digital pathway systems',
          logo: 'Pfizer',
          description: 'University partners can streamline applications, student qualification checks and counsellor workflows without operational disruption.',
          cta: 'Read the case study'
        },
        {
          title: 'Accelerating student success research',
          logo: 'Pfizer',
          description: 'Career360 helps institutions understand student intent, program fit and long-term outcome alignment using structured pathway intelligence.',
          cta: 'Read the case study'
        }
      ]
    },
    {
      id: 'virtual-tour-open-day',
      title: 'Virtual Tour - Open Day',
      type: 'video',
      cards: [
        {
          title: 'Student Housing in Berlin, Germany',
          image: this.pexelsImages.campus,
          description: 'A structured preview of student life, housing and campus access.',
          meta: '€340/m',
          cta: 'Check Availability'
        },
        {
          title: 'Campus Open Day Experience',
          image: this.pexelsImages.openDay,
          description: 'Explore classrooms, labs, student support and international office.',
          meta: 'Virtual',
          cta: 'Join Open Day'
        },
        {
          title: 'Student Life Preview in Germany',
          image: this.pexelsImages.studentLife,
          description: 'Understand accommodation, transport, local lifestyle and city readiness.',
          meta: 'Guide',
          cta: 'View Tour'
        }
      ]
    },
    {
      id: 'employers',
      title: 'Employers',
      type: 'image',
      cards: [
        {
          title: 'Riyadh Air',
          logo: 'RIYADH AIR',
          category: 'Employer',
          image: this.pexelsImages.employerHealthcare,
          description: 'Employer partners can build global talent pipelines for healthcare, aviation, hospitality and technical workforce mobility.',
          cta: 'Read the AI transformation story',
          meta: 'riyadh'
        },
        {
          title: 'Neste',
          logo: 'NESTE',
          category: 'Employer',
          image: this.pexelsImages.employerHospitality,
          description: 'Career360 helps employers improve candidate readiness, documentation quality and structured international recruitment workflows.',
          cta: 'Read about the ERP transformation',
          meta: 'neste'
        },
        {
          title: 'Department for Energy Security',
          logo: 'Department for Energy Security & Net Zero',
          category: 'Employer',
          image: this.pexelsImages.employerLogistics,
          description: 'Government and enterprise partners can accelerate cleaner, skilled and compliant workforce deployment across priority sectors.',
          cta: 'Read the clean energy story',
          meta: 'gov'
        }
      ]
    },
    {
      id: 'join-the-community',
      title: 'Join The Community',
      type: 'profile',
      cards: [
        {
          title: 'Student Ambassador',
          subtitle: 'Germany Pathway',
          image: this.pexelsImages.ambassador1,
          description: 'Connect with mentors who can explain the real student journey.'
        },
        {
          title: 'Ausbildung Mentor',
          subtitle: 'Healthcare Route',
          image: this.pexelsImages.ambassador2,
          description: 'Speak with pathway mentors before making a decision.'
        },
        {
          title: 'Career Advisor',
          subtitle: 'Europe Jobs',
          image: this.pexelsImages.ambassador3,
          description: 'Get guided based on your qualification, language level and timeline.'
        }
      ]
    },
    {
      id: 'events',
      title: 'Events',
      type: 'image',
      cards: [
        {
          title: 'Technology Summit',
          category: 'Webinar',
          image: this.pexelsImages.eventTech,
          description: 'Career briefing for technology, IT jobs and study pathways.',
          cta: 'Register'
        },
        {
          title: 'Ausbildung Awareness Session',
          category: 'Event',
          image: this.pexelsImages.eventAusbildung,
          description: 'Learn facts, myths, language requirements and career outcomes.',
          cta: 'Book seat'
        },
        {
          title: 'Study Abroad Open Day',
          category: 'Open Day',
          image: this.pexelsImages.eventStudy,
          description: 'Compare universities, courses, fees and admission roadmap.',
          cta: 'Join event'
        }
      ]
    },
    {
      id: 'faqs',
      title: "FAQ's",
      type: 'plain',
      cards: [
        {
          title: 'Can Ausbildung lead to a strong career?',
          description: 'Understand career progression, salary, language and long-term growth.'
        },
        {
          title: 'Is German language mandatory?',
          description: 'Know when A1, A2, B1 and B2 become important for each pathway.'
        },
        {
          title: 'Which country is right for me?',
          description: 'Compare emotional choices with rational pathway planning.'
        }
      ]
    },
    {
      id: 'tools',
      title: 'Tools',
      type: 'document',
      cards: [
        {
          title: 'Career Pathway Calculator',
          description: 'Estimate timeline, cost, readiness and next action.',
          cta: 'Use tool'
        },
        {
          title: 'German Readiness Checker',
          description: 'Assess your language level and training requirement.',
          cta: 'Check now'
        },
        {
          title: 'Cost Comparison Tool',
          description: 'Compare program fee, living cost, visa cost and service value.',
          cta: 'Compare cost'
        }
      ]
    },
    {
      id: 'germany-workplace-experience',
      title: 'Germany Workplace Experience',
      type: 'image',
      cards: [
        {
          title: 'Workplace Culture Guide',
          category: 'Germany',
          image: this.pexelsImages.workplace,
          description: 'Learn behaviour, punctuality, communication and adaptation basics.',
          cta: 'Start learning'
        },
        {
          title: 'Interview Preparation',
          category: 'Career Prep',
          image: this.pexelsImages.interview,
          description: 'Prepare for employer interviews with structured guidance.',
          cta: 'Prepare now'
        },
        {
          title: 'Cross-Culture Training',
          category: 'Training',
          image: this.pexelsImages.crossCulture,
          description: 'Build workplace readiness before migration.',
          cta: 'View module'
        }
      ]
    },
    {
      id: 'guides',
      title: 'Guides',
      type: 'document',
      cards: [
        {
          title: 'Ausbildung Complete Guide',
          description: 'Step-by-step guide from eligibility to training contract.',
          cta: 'Read guide'
        },
        {
          title: 'German Language Guide',
          description: 'Understand A1, A2, B1, B2 and exam preparation requirements.',
          cta: 'Open guide'
        },
        {
          title: 'Visa Documentation Guide',
          description: 'Document checklist, timeline and preparation stages.',
          cta: 'View checklist'
        }
      ]
    },
    {
      id: 'location-guides',
      title: 'Location Guides',
      type: 'guide',
      cards: [
        {
          title: 'Berlin Career Guide',
          category: 'Germany',
          image: this.pexelsImages.location1,
          description: 'Understand career, living cost, transport and student life in Berlin.',
          cta: 'Explore Berlin'
        },
        {
          title: 'Munich Career Guide',
          category: 'Germany',
          image: this.pexelsImages.location2,
          description: 'Explore training, employment and lifestyle factors in Munich.',
          cta: 'Explore Munich'
        },
        {
          title: 'Hamburg Career Guide',
          category: 'Germany',
          image: this.pexelsImages.location3,
          description: 'Learn about industry, mobility and lifestyle opportunities in Hamburg.',
          cta: 'Explore Hamburg'
        }
      ]
    },
    {
      id: 'career-pathway-advice-hub',
      title: 'Career Pathway Advice Hub',
      type: 'profile',
      cards: [
        {
          title: 'Ausbildung Advisor',
          subtitle: 'Vocational Pathway',
          image: this.pexelsImages.advisor1,
          description: 'Get pathway advice based on qualification, German level and destination.'
        },
        {
          title: 'Study Abroad Advisor',
          subtitle: 'University Pathway',
          image: this.pexelsImages.advisor2,
          description: 'Compare university, program, fee and admission readiness.'
        },
        {
          title: 'Jobseeker Advisor',
          subtitle: 'Employment Pathway',
          image: this.pexelsImages.advisor3,
          description: 'Evaluate CV, skills, experience and global job readiness.'
        }
      ]
    },
    {
      id: 'industry-insights',
      title: 'Industry Insights',
      type: 'plain',
      cards: [
        {
          title: 'Healthcare Demand in Germany',
          category: 'Industry Insight',
          description: 'Understand demand signals, language requirements and long-term pathway value.',
          cta: 'Read insight'
        },
        {
          title: 'Hospitality Talent Mobility',
          category: 'Industry Insight',
          description: 'Review hospitality demand, training routes and employer expectations.',
          cta: 'Read insight'
        },
        {
          title: 'Technology Career Movement',
          category: 'Industry Insight',
          description: 'Track opportunities in software, data, cloud and digital roles.',
          cta: 'Read insight'
        }
      ]
    },
    {
      id: 'videos',
      title: 'Videos',
      type: 'video',
      cards: [
        {
          title: 'Germany Opportunity Roadmap',
          image: this.pexelsImages.video1,
          description: 'Understand Ausbildung, jobs and study route selection.'
        },
        {
          title: 'How To Avoid Wrong Decisions',
          image: this.pexelsImages.video2,
          description: 'Move from influencer myths to verified career planning.'
        },
        {
          title: 'German Language Strategy',
          image: this.pexelsImages.video3,
          description: 'A1 to B1 pathway for career mobility.'
        }
      ]
    },
    {
      id: 'blogs',
      title: 'Blogs',
      type: 'image',
      cards: [
        {
          title: 'Why Ausbildung Is Not a Low-Level Option',
          category: 'Career Insight',
          image: this.pexelsImages.blog1,
          description: 'A strategic explanation of vocational career progression.',
          cta: 'Read blog'
        },
        {
          title: 'Study Abroad vs Ausbildung',
          category: 'Comparison',
          image: this.pexelsImages.blog2,
          description: 'Choose based on affordability, eligibility and long-term outcome.',
          cta: 'Read blog'
        },
        {
          title: 'German Language Learning Plan',
          category: 'Language',
          image: this.pexelsImages.blog3,
          description: 'Build a practical roadmap from A1 to interview readiness.',
          cta: 'Read blog'
        }
      ]
    },
    {
      id: 'news-articles',
      title: 'News & Articles',
      type: 'image',
      cards: [
        {
          title: 'Germany Skilled Workforce Updates',
          category: 'News',
          image: this.pexelsImages.news1,
          description: 'Track policy, labour market and international mobility updates.',
          cta: 'Read article'
        },
        {
          title: 'European Education Trends',
          category: 'Article',
          image: this.pexelsImages.news2,
          description: 'Insights on university applications, admissions and student choices.',
          cta: 'Read article'
        },
        {
          title: 'Global Career Mobility Insights',
          category: 'Article',
          image: this.pexelsImages.news3,
          description: 'Understand how international career pathways are evolving.',
          cta: 'Read article'
        }
      ]
    },
    {
      id: 'documents',
      title: 'Documents',
      type: 'document',
      cards: [
        {
          title: 'Ausbildung Checklist',
          description: 'Documents, eligibility, language and step-by-step process.',
          cta: 'Download'
        },
        {
          title: 'Study Abroad Checklist',
          description: 'Program selection, SOP, admission and visa preparation.',
          cta: 'Download'
        },
        {
          title: 'Jobseeker Checklist',
          description: 'CV, recognition, employer interview and relocation readiness.',
          cta: 'Download'
        }
      ]
    }
  ];

  filteredSections = computed(() => {
    const keyword = this.keyword().trim().toLowerCase();
    const location = this.location().trim().toLowerCase();
    const active = this.activeTab();

    return this.sections
      .filter(section => {
        if (active === 'all') return true;

        const sectionName = section.title.toLowerCase();

        if (active === 'jobs') {
          return (
            sectionName.includes('jobs') ||
            sectionName.includes('employers') ||
            sectionName.includes('industry')
          );
        }

        if (active === 'ausbildung') {
          return (
            sectionName.includes('apprenticeship') ||
            sectionName.includes('germany workplace') ||
            sectionName.includes('career pathway') ||
            sectionName.includes('guides')
          );
        }

        if (active === 'study') {
          return (
            sectionName.includes('courses') ||
            sectionName.includes('subjects') ||
            sectionName.includes('universities') ||
            sectionName.includes('virtual tour') ||
            sectionName.includes('location')
          );
        }

        if (active === 'language') {
          return (
            sectionName.includes('german') ||
            sectionName.includes('tools') ||
            sectionName.includes('guides') ||
            sectionName.includes('videos')
          );
        }

        return true;
      })
      .map(section => ({
        ...section,
        cards: section.cards.filter(card => {
          const text = [
            section.title,
            card.title,
            card.subtitle,
            card.description,
            card.category,
            card.meta
          ].join(' ').toLowerCase();

          const matchesKeyword = !keyword || text.includes(keyword);
          const matchesLocation = !location || text.includes(location);

          return matchesKeyword && matchesLocation;
        })
      }))
      .filter(section => section.cards.length > 0);
  });

  totalCards = computed(() => {
    return this.filteredSections().reduce((total, section) => total + section.cards.length, 0);
  });

  setActiveSection(sectionId: string) {
    this.activeTab.set('all');
    this.activeSection.set(sectionId);

    setTimeout(() => {
      const element = document.getElementById(sectionId);

      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  }

  clearSearch() {
    this.keyword.set('');
    this.location.set('');
    this.activeTab.set('all');
    this.activeSection.set('jobs');
  }
}