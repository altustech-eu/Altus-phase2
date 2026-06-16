import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

type Screen = 'intro' | 'form' | 'result';

interface StepItem {
  id: number;
  label: string;
}

interface PersonaOption {
  key: string;
  title: string;
  subtitle: string;
  badge: string;
}

interface GoalOption {
  title: string;
  subtitle: string;
}

interface PersonaContext {
  eyebrow: string;
  title: string;
  description: string;
  profileTitle: string;
  profileDescription: string;
  recommendation: string;
  desk: string;
  leadTag: string;
}

@Component({
  selector: 'app-pathway-process',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <main class="min-h-screen bg-[#f4f7fb] font-main text-[#0f172a]">

      <!-- Top Back Bar -->
      <div class="sticky top-0 z-50 border-b border-[#dbe4f0] bg-white/95 backdrop-blur">
        <div class="mx-auto flex h-[48px] max-w-[960px] items-center justify-between px-5">
          <button
            type="button"
            class="inline-flex items-center gap-2 text-[12px] font-bold text-[#475569] hover:text-[#0f62fe]"
            (click)="goHome()"
          >
            <span class="text-[16px]">←</span>
            Back to Home
          </button>

          <span class="hidden text-[11px] font-bold uppercase tracking-[0.14em] text-[#94a3b8] sm:block">
            Career Pathway Assessment
          </span>
        </div>
      </div>

      <!-- Intro Screen -->
      @if (screen === 'intro') {
        <section class="flex min-h-[calc(100vh-48px)] items-center justify-center px-5 py-8">
          <div class="w-full max-w-[680px] text-center">

            <div class="mx-auto mb-6 inline-flex items-center gap-2 rounded-full bg-[#eaf2ff] px-5 py-2.5 text-[12px] font-bold text-[#0f62fe]">
              <span class="h-2 w-2 rounded-full bg-[#0f62fe]"></span>
              Guided Career Pathway Assessment
            </div>

            <h1 class="mx-auto mb-4 max-w-[620px] font-display text-[40px] font-bold leading-[1.04] tracking-[-0.045em] text-[#0b1220]">
              Build the Right Career Pathway with
              <span class="text-[#0f62fe]"> AltusCareer</span>
            </h1>

            <p class="mx-auto mb-8 max-w-[500px] text-[14px] leading-7 text-[#64748b]">
              Choose your current situation and complete a short guided profile. We will recommend the right pathway, counselling desk, and next action.
            </p>

            <div class="mx-auto mb-8 grid max-w-[560px] grid-cols-1 gap-4 sm:grid-cols-2">
              @for (quick of quickPathways; track quick.key) {
                <button
                  type="button"
                  class="group flex min-h-[58px] items-center gap-3 rounded-[12px] border border-[#dbe4f0] bg-white px-5 text-left shadow-sm transition hover:border-[#0f62fe] hover:shadow-md"
                  (click)="quickStart(quick.key)"
                >
                  <span class="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#eaf2ff] text-[11px] font-extrabold text-[#0f62fe]">
                    {{ quick.badge }}
                  </span>

                  <span>
                    <span class="block text-[13px] font-extrabold text-[#0f172a]">
                      {{ quick.title }}
                    </span>
                    <span class="mt-0.5 block text-[11px] text-[#64748b]">
                      {{ quick.subtitle }}
                    </span>
                  </span>
                </button>
              }
            </div>

            <button
              type="button"
              class="mx-auto flex h-[46px] items-center justify-center gap-3 rounded-[10px] bg-[#0f62fe] px-10 text-[13px] font-bold text-white shadow-sm hover:bg-[#0043ce]"
              (click)="startAssessment()"
            >
              Start Application
              <span>→</span>
            </button>

            <p class="mt-5 text-[11px] text-[#94a3b8]">
              Takes about 3–5 minutes · Free · No obligation
            </p>
          </div>
        </section>
      }

      <!-- Form Screen -->
      @if (screen === 'form') {
        <section class="min-h-[calc(100vh-48px)]">

          <!-- Progress Header -->
          <div class="sticky top-[48px] z-40 border-b border-[#dbe4f0] bg-white/95 backdrop-blur">
            <div class="mx-auto max-w-[880px] px-5 py-3">

              <div class="mb-3 flex items-center justify-between">
                <div>
                  <p class="text-[11px] font-bold uppercase tracking-[0.14em] text-[#64748b]">
                    {{ getPersonaContext().eyebrow }}
                  </p>
                  <p class="mt-1 text-[13px] font-semibold text-[#0f172a]">
                    Step {{ currentStep }} of 5 · {{ currentStep * 20 }}% complete
                  </p>
                </div>

                <button
                  type="button"
                  class="text-[12px] font-bold text-[#64748b] hover:text-[#0f62fe]"
                  (click)="restart()"
                >
                  Restart
                </button>
              </div>

              <div class="h-[5px] overflow-hidden rounded-full bg-[#dbe4f0]">
                <div
                  class="h-full rounded-full bg-[#0f62fe] transition-all duration-300"
                  [style.width.%]="currentStep * 20"
                ></div>
              </div>

              <div class="mt-3 grid grid-cols-5 gap-2 text-center text-[11px] font-bold">
                @for (step of steps; track step.id) {
                  <button
                    type="button"
                    class="rounded-[8px] py-1.5 transition"
                    [ngClass]="{
                      'bg-[#eaf2ff] text-[#0f62fe]': currentStep === step.id,
                      'text-[#475569]': currentStep > step.id,
                      'text-[#94a3b8]': currentStep < step.id
                    }"
                    (click)="goToStep(step.id)"
                  >
                    {{ step.label }}
                  </button>
                }
              </div>
            </div>
          </div>

          <!-- Main Content -->
          <div class="mx-auto max-w-[880px] px-5 py-6">

            <!-- Page Heading -->
            <div class="mb-5">
              <p class="mb-2 text-[12px] font-bold uppercase tracking-[0.14em] text-[#0f62fe]">
                {{ getStepEyebrow() }}
              </p>

              <h1 class="font-display text-[31px] font-bold leading-tight tracking-[-0.04em] text-[#0b1220]">
                {{ getStepTitle() }}
              </h1>

              <p class="mt-2 max-w-[640px] text-[14px] leading-6 text-[#64748b]">
                {{ getStepDescription() }}
              </p>
            </div>

            @if (submitError) {
              <div class="mb-4 rounded-[12px] border border-red-200 bg-red-50 px-4 py-3 text-[12px] font-bold text-red-700">
                {{ submitError }}
              </div>
            }

            <!-- Step Card -->
            <div class="rounded-[16px] border border-[#dbe4f0] bg-white p-5 shadow-sm md:p-6">

              <!-- Step 1 -->
              @if (currentStep === 1) {
                <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                  @for (option of personaOptions; track option.key) {
                    <button
                      type="button"
                      class="relative flex min-h-[86px] items-center gap-5 rounded-[14px] border border-[#dbe4f0] bg-white p-5 text-left transition hover:border-[#0f62fe] hover:shadow-md"
                      [ngClass]="selectedPersona === option.key ? 'border-[#0f62fe] bg-[#f8fbff] ring-2 ring-[#0f62fe]/15' : ''"
                      (click)="selectPersona(option.key)"
                    >
                      @if (selectedPersona === option.key) {
                        <span class="absolute right-4 top-4 h-2 w-2 rounded-full bg-[#0f62fe]"></span>
                      }

                      <span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] bg-[#eaf2ff] text-[12px] font-extrabold text-[#0f62fe]">
                        {{ option.badge }}
                      </span>

                      <span>
                        <span class="block text-[14px] font-extrabold text-[#111827]">
                          {{ option.title }}
                        </span>
                        <span class="mt-1.5 block text-[12px] leading-5 text-[#64748b]">
                          {{ option.subtitle }}
                        </span>
                      </span>
                    </button>
                  }
                </div>
              }

              <!-- Step 2 -->
              @if (currentStep === 2) {
                <div class="grid grid-cols-1 gap-5 md:grid-cols-2">

                  <label class="field-label">
                    Full Name *
                    <input class="form-input" placeholder="Your full name" [(ngModel)]="form.fullName" />
                  </label>

                  <label class="field-label">
                    WhatsApp / Mobile *
                    <input class="form-input" placeholder="+91 XXXXXXXXXX" [(ngModel)]="form.mobile" />
                  </label>

                  <label class="field-label md:col-span-2">
                    Email Address *
                    <input class="form-input" placeholder="your@email.com" [(ngModel)]="form.email" />
                  </label>

                  <label class="field-label">
                    Country of Residence *
                    <select class="form-input" [(ngModel)]="form.country">
                      <option value="">Select country</option>
                      <option>India</option>
                      <option>Kuwait</option>
                      <option>UAE</option>
                      <option>Oman</option>
                      <option>Qatar</option>
                      <option>Saudi Arabia</option>
                    </select>
                  </label>

                  <label class="field-label">
                    Nationality *
                    <select class="form-input" [(ngModel)]="form.nationality">
                      <option value="">Select nationality</option>
                      <option>Indian</option>
                      <option>Pakistani</option>
                      <option>Bangladeshi</option>
                      <option>Sri Lankan</option>
                      <option>Nepali</option>
                    </select>
                  </label>

                  <label class="field-label">
                    State / Region
                    <input class="form-input" placeholder="e.g. Tamil Nadu" [(ngModel)]="form.state" />
                  </label>

                  <label class="field-label">
                    City *
                    <input class="form-input" placeholder="e.g. Chennai" [(ngModel)]="form.city" />
                  </label>

                  <label class="field-label">
                    Preferred Language
                    <select class="form-input" [(ngModel)]="form.language">
                      <option value="">Select language</option>
                      <option>English</option>
                      <option>Tamil</option>
                      <option>Hindi</option>
                      <option>Malayalam</option>
                      <option>Arabic</option>
                    </select>
                  </label>

                  <label class="field-label">
                    Age Group
                    <select class="form-input" [(ngModel)]="form.ageGroup">
                      <option value="">Select age group</option>
                      <option>15–18</option>
                      <option>18–21</option>
                      <option>22–25</option>
                      <option>26–30</option>
                      <option>30+</option>
                    </select>
                  </label>

                  <div class="md:col-span-2 mt-1 rounded-[12px] bg-[#f8fafc] p-4">
                    <label class="flex items-start gap-3 text-[12px] leading-6 text-[#64748b]">
                      <input type="checkbox" class="mt-1" [(ngModel)]="form.consent" />
                      <span>
                        I consent to AltusCareer contacting me via WhatsApp, call, and email for career guidance.
                        I agree to the privacy policy and data processing terms.
                      </span>
                    </label>
                  </div>

                </div>
              }

              <!-- Step 3 -->
              @if (currentStep === 3) {
                <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                  @for (goal of getGoalOptions(); track goal.title) {
                    <button
                      type="button"
                      class="rounded-[14px] border border-[#dbe4f0] bg-white p-5 text-left transition hover:border-[#0f62fe] hover:shadow-md"
                      [ngClass]="form.goal === goal.title ? 'border-[#0f62fe] bg-[#f8fbff] ring-2 ring-[#0f62fe]/10' : ''"
                      (click)="form.goal = goal.title"
                    >
                      <span class="block text-[14px] font-extrabold text-[#111827]">
                        {{ goal.title }}
                      </span>
                      <span class="mt-2 block text-[12px] leading-5 text-[#64748b]">
                        {{ goal.subtitle }}
                      </span>
                    </button>
                  }
                </div>
              }

              <!-- Step 4 -->
              @if (currentStep === 4) {
                <div class="space-y-6">

                  <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <label class="field-label">
                      Highest Qualification *
                      <select class="form-input" [(ngModel)]="form.qualification">
                        <option value="">Select</option>
                        <option>10th Standard</option>
                        <option>12th Standard</option>
                        <option>Diploma</option>
                        <option>UG Degree</option>
                        <option>PG Degree</option>
                      </select>
                    </label>

                    <label class="field-label">
                      Stream / Subject *
                      <select class="form-input" [(ngModel)]="form.stream">
                        <option value="">Select</option>
                        <option>Healthcare</option>
                        <option>IT</option>
                        <option>Engineering</option>
                        <option>Business</option>
                        <option>Hospitality</option>
                        <option>School Student</option>
                      </select>
                    </label>

                    <label class="field-label">
                      Year of Completion
                      <select class="form-input" [(ngModel)]="form.yearCompleted">
                        <option value="">Select year</option>
                        <option>2026</option>
                        <option>2025</option>
                        <option>2024</option>
                        <option>2023</option>
                        <option>Before 2023</option>
                      </select>
                    </label>

                    <label class="field-label">
                      Percentage / CGPA
                      <input class="form-input" placeholder="e.g. 72% or 7.5 CGPA" [(ngModel)]="form.score" />
                    </label>
                  </div>

                  <div>
                    <p class="section-label">Current Status *</p>
                    <div class="chip-grid">
                      @for (status of currentStatuses; track status) {
                        <button
                          type="button"
                          class="chip"
                          [ngClass]="form.currentStatus === status ? 'chip-active' : ''"
                          (click)="form.currentStatus = status"
                        >
                          {{ status }}
                        </button>
                      }
                    </div>
                  </div>

                  <div>
                    <p class="section-label">German Language Level *</p>

                    <div class="grid grid-cols-2 gap-3 md:grid-cols-3">
                      @for (level of germanLevels; track level.title) {
                        <button
                          type="button"
                          class="rounded-[12px] border border-[#dbe4f0] bg-white p-4 text-left transition hover:border-[#0f62fe]"
                          [ngClass]="form.germanLevel === level.title ? 'border-[#0f62fe] bg-[#f8fbff] ring-2 ring-[#0f62fe]/10' : ''"
                          (click)="form.germanLevel = level.title"
                        >
                          <span class="block text-[13px] font-extrabold text-[#111827]">
                            {{ level.title }}
                          </span>
                          <span class="mt-1 block text-[11px] font-medium text-[#64748b]">
                            {{ level.subtitle || 'Not started' }}
                          </span>
                        </button>
                      }
                    </div>
                  </div>

                  <div>
                    <p class="section-label">Passport Status *</p>

                    <div class="chip-grid">
                      @for (passport of passportStatuses; track passport) {
                        <button
                          type="button"
                          class="chip"
                          [ngClass]="form.passportStatus === passport ? 'chip-active' : ''"
                          (click)="form.passportStatus = passport"
                        >
                          {{ passport }}
                        </button>
                      }
                    </div>
                  </div>

                </div>
              }

              <!-- Step 5 -->
              @if (currentStep === 5) {
                <div class="space-y-6">

                  <div class="rounded-[14px] border border-[#dbe4f0] bg-[#f8fbff] p-5">
                    <p class="text-[12px] font-bold uppercase tracking-[0.12em] text-[#64748b]">
                      Personalised profile section
                    </p>
                    <h2 class="mt-2 font-display text-[24px] font-bold tracking-[-0.035em] text-[#0b1220]">
                      {{ getPersonaContext().profileTitle }}
                    </h2>
                    <p class="mt-2 text-[13px] leading-6 text-[#64748b]">
                      {{ getPersonaContext().profileDescription }}
                    </p>
                  </div>

                  <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <label class="field-label">
                      {{ getDynamicFieldOneLabel() }} *
                      <select class="form-input" [(ngModel)]="form.dynamicOne">
                        <option value="">Select</option>
                        @for (option of getDynamicFieldOneOptions(); track option) {
                          <option>{{ option }}</option>
                        }
                      </select>
                    </label>

                    <label class="field-label">
                      {{ getDynamicFieldTwoLabel() }} *
                      <select class="form-input" [(ngModel)]="form.dynamicTwo">
                        <option value="">Select</option>
                        @for (option of getDynamicFieldTwoOptions(); track option) {
                          <option>{{ option }}</option>
                        }
                      </select>
                    </label>
                  </div>

                  <div>
                    <p class="section-label">{{ getDynamicChipOneLabel() }} *</p>

                    <div class="chip-grid">
                      @for (item of getDynamicChipOneOptions(); track item) {
                        <button
                          type="button"
                          class="chip"
                          [ngClass]="form.dynamicChipOne === item ? 'chip-active' : ''"
                          (click)="form.dynamicChipOne = item"
                        >
                          {{ item }}
                        </button>
                      }
                    </div>
                  </div>

                  <div>
                    <p class="section-label">{{ getDynamicChipTwoLabel() }} *</p>

                    <div class="chip-grid">
                      @for (item of getDynamicChipTwoOptions(); track item) {
                        <button
                          type="button"
                          class="chip"
                          [ngClass]="form.dynamicChipTwo === item ? 'chip-active' : ''"
                          (click)="form.dynamicChipTwo = item"
                        >
                          {{ item }}
                        </button>
                      }
                    </div>
                  </div>

                  <div>
                    <p class="section-label">How soon do you want to start? *</p>

                    <div class="chip-grid">
                      @for (timeline of startTimelines; track timeline) {
                        <button
                          type="button"
                          class="chip"
                          [ngClass]="form.startTimeline === timeline ? 'chip-active' : ''"
                          (click)="form.startTimeline = timeline"
                        >
                          {{ timeline }}
                        </button>
                      }
                    </div>
                  </div>
                </div>
              }

            </div>

            <!-- Footer Buttons -->
            <div class="mt-5">
              <div class="flex items-center gap-4">
                <button
                  type="button"
                  class="h-[42px] rounded-[10px] border border-[#dbe4f0] bg-white px-5 text-[13px] font-bold text-[#111827] hover:bg-[#f8fafc]"
                  (click)="back()"
                  [disabled]="isSubmitting"
                >
                  ← Back
                </button>

                <button
                  type="button"
                  class="h-[42px] flex-1 rounded-[10px] px-6 text-[13px] font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-60"
                  [disabled]="isSubmitting"
                  [ngClass]="currentStep === 5 ? 'bg-[#0f62fe] hover:bg-[#0043ce]' : 'bg-[#5f8df7] hover:bg-[#0f62fe]'"
                  (click)="next()"
                >
                  {{ isSubmitting ? 'Submitting Lead...' : currentStep === 5 ? 'Submit & See My Pathway' : 'Continue' }}
                  <span class="ml-2">→</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      }

      <!-- Result Screen -->
      @if (screen === 'result') {
        <section class="mx-auto min-h-[calc(100vh-48px)] max-w-[1080px] px-5 py-8">

          <div class="mb-7 text-center">
            <div class="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#eaf2ff] text-[20px] font-extrabold text-[#0f62fe]">
              OK
            </div>

            <p class="mb-3 text-[12px] font-bold uppercase tracking-[0.14em] text-[#0f62fe]">
              Application profile created
            </p>

            <h1 class="font-display text-[34px] font-bold tracking-[-0.04em] text-[#0b1220]">
              Your Profile Has Been Created
            </h1>

            <p class="mt-3 text-[12px] font-semibold text-[#64748b]">
              Lead ID:
              <span class="text-[#0f172a]">
                {{ submittedLeadId || ('ALT-' + getLeadPrefix()) }}
              </span>
            </p>
          </div>

          <div class="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">

            <!-- Left Main Result -->
            <div class="space-y-5">

              <div class="rounded-[16px] border border-[#b8d3ff] bg-[#f8fbff] p-6">
                <div class="mb-3 flex items-center justify-between">
                  <p class="text-[11px] font-bold uppercase tracking-wide text-[#64748b]">
                    Recommended Pathway
                  </p>
                  <span class="rounded-full bg-[#eaf2ff] px-3 py-1 text-[10px] font-bold text-[#0f62fe]">
                    {{ getPersonaContext().leadTag }}
                  </span>
                </div>

                <h2 class="font-display text-[24px] font-bold text-[#0f172a]">
                  {{ getPersonaContext().recommendation }}
                </h2>

                <p class="mt-3 text-[13px] leading-6 text-[#64748b]">
                  Your selected profile and responses suggest this pathway as the next best action. Our counselling desk can validate your eligibility, readiness, budget, documents, and timeline.
                </p>
              </div>

              <div class="rounded-[16px] border border-[#dbe4f0] bg-white p-6 shadow-sm">
                <div class="mb-5 flex items-end justify-between">
                  <h3 class="text-[15px] font-bold text-[#0f172a]">Your Profile Score</h3>
                  <p class="text-[38px] font-extrabold leading-none text-[#0f62fe]">
                    {{ getProfileScore() }}<span class="text-[14px] font-bold text-[#64748b]">/100</span>
                  </p>
                </div>

                <div class="mb-6 h-[7px] overflow-hidden rounded-full bg-[#e5e7eb]">
                  <div
                    class="h-full rounded-full bg-[#0f62fe]"
                    [style.width.%]="getProfileScore()"
                  ></div>
                </div>

                <div class="grid grid-cols-3 gap-4 text-center text-[11px] text-[#64748b]">
                  <div><strong class="block text-[#0f172a]">20/20</strong>Base</div>
                  <div><strong class="block text-[#0f172a]">{{ form.goal ? '15/15' : '0/15' }}</strong>Intent</div>
                  <div><strong class="block text-[#0f172a]">{{ form.qualification ? '15/15' : '0/15' }}</strong>Eligibility</div>
                  <div><strong class="block text-[#0f172a]">{{ form.germanLevel !== 'No German' && form.germanLevel ? '10/10' : '0/10' }}</strong>Language</div>
                  <div><strong class="block text-[#0f172a]">{{ form.passportStatus === 'Passport Available' ? '10/10' : '0/10' }}</strong>Documents</div>
                  <div><strong class="block text-[#0f172a]">{{ form.startTimeline ? '5/5' : '0/5' }}</strong>Timeline</div>
                </div>
              </div>

              <div>
                <h3 class="mb-4 text-[15px] font-bold text-[#0f172a]">Recommended Next Steps</h3>

                <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
                  @for (action of getNextActions(); track action) {
                    <button
                      type="button"
                      class="h-[44px] rounded-[10px] border border-[#dbe4f0] bg-white px-5 text-left text-[12px] font-bold text-[#0f172a] hover:border-[#0f62fe] hover:bg-[#f8fbff]"
                      (click)="handleFinalAction(action)"
                    >
                      {{ action }}
                    </button>
                  }
                </div>
              </div>

            </div>

            <!-- Right Side Functional Cards -->
            <aside class="space-y-4">

              <div class="rounded-[16px] border border-[#dbe4f0] bg-white p-5 shadow-sm">
                <p class="mb-2 text-[11px] font-bold uppercase tracking-wide text-[#64748b]">
                  Assigned Desk
                </p>
                <h3 class="text-[16px] font-bold text-[#0f172a]">
                  {{ getPersonaContext().desk }}
                </h3>
                <p class="mt-2 text-[12px] leading-5 text-[#64748b]">
                  This profile will be routed to the correct counselling team based on the selected pathway.
                </p>
              </div>

              <div class="rounded-[16px] border border-[#dbe4f0] bg-white p-5 shadow-sm">
                <p class="mb-3 text-[11px] font-bold uppercase tracking-wide text-[#64748b]">
                  Counselling Priority
                </p>

                <div class="rounded-[12px] bg-[#eaf2ff] px-4 py-3">
                  <p class="text-[13px] font-extrabold text-[#0f62fe]">
                    {{ getCounsellingPriority() }}
                  </p>
                  <p class="mt-1 text-[11px] leading-5 text-[#64748b]">
                    {{ getPriorityDescription() }}
                  </p>
                </div>
              </div>

              <div class="rounded-[16px] border border-[#dbe4f0] bg-white p-5 shadow-sm">
                <p class="mb-3 text-[11px] font-bold uppercase tracking-wide text-[#64748b]">
                  Process Checklist
                </p>

                <ul class="space-y-3 text-[12px] font-semibold text-[#334155]">
                  @for (item of getProcessChecklist(); track item.label) {
                    <li class="flex items-center justify-between gap-4">
                      <span>{{ item.label }}</span>
                      <span
                        class="rounded-full px-2 py-1 text-[10px] font-bold"
                        [ngClass]="item.status === 'Completed'
                          ? 'bg-[#dcfce7] text-[#15803d]'
                          : item.status === 'Next'
                            ? 'bg-[#eaf2ff] text-[#0f62fe]'
                            : 'bg-[#f1f5f9] text-[#64748b]'"
                      >
                        {{ item.status }}
                      </span>
                    </li>
                  }
                </ul>
              </div>

              <div class="rounded-[16px] border border-[#dbe4f0] bg-white p-5 shadow-sm">
                <p class="mb-3 text-[11px] font-bold uppercase tracking-wide text-[#64748b]">
                  Suggested Timeline
                </p>

                <div class="space-y-3">
                  @for (step of getSuggestedTimeline(); track step.title) {
                    <div
                      class="border-l-2 pl-3"
                      [ngClass]="step.active ? 'border-[#0f62fe]' : 'border-[#dbe4f0]'"
                    >
                      <p class="text-[12px] font-bold text-[#0f172a]">{{ step.title }}</p>
                      <p class="text-[11px] text-[#64748b]">{{ step.description }}</p>
                    </div>
                  }
                </div>
              </div>

            </aside>
          </div>

          <div class="mt-8 text-center">
            <button
              type="button"
              class="text-[12px] font-semibold text-[#64748b] underline hover:text-[#0f62fe]"
              (click)="restart()"
            >
              Return to Start
            </button>
          </div>
        </section>
      }
    </main>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700;800&family=IBM+Plex+Serif:wght@600;700&display=swap');

    .font-main {
      font-family: 'IBM Plex Sans', Arial, Helvetica, sans-serif;
    }

    .font-display {
      font-family: 'IBM Plex Serif', Georgia, 'Times New Roman', serif;
    }

    .field-label {
      display: block;
      font-size: 12px;
      font-weight: 700;
      color: #334155;
    }

    .section-label {
      margin-bottom: 12px;
      font-size: 12px;
      font-weight: 700;
      color: #334155;
    }

    .form-input {
      margin-top: 9px;
      height: 44px;
      width: 100%;
      border-radius: 8px;
      border: 1px solid #dbe4f0;
      background: #ffffff;
      padding: 0 14px;
      font-size: 13px;
      font-weight: 500;
      color: #0f172a;
      outline: none;
    }

    .form-input::placeholder {
      color: #94a3b8;
    }

    .form-input:focus {
      border-color: #0f62fe;
      box-shadow: 0 0 0 3px rgba(15, 98, 254, 0.10);
    }

    .chip-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    .chip {
      min-height: 34px;
      border-radius: 8px;
      border: 1px solid #dbe4f0;
      background: #ffffff;
      padding: 0 16px;
      font-size: 12px;
      font-weight: 700;
      color: #334155;
      transition: all 0.2s ease;
    }

    .chip:hover {
      border-color: #0f62fe;
    }

    .chip-active {
      border-color: #0f62fe;
      background: #0f62fe;
      color: #ffffff;
    }
  `]
})
export class PathwayProcessComponent {
  private router = inject(Router);

  private readonly leadCaptureUrl = 'https://script.google.com/macros/s/AKfycbxQfccjsfl67jyqNPN03AToE38pjem2QwFJV4sLOYElU4-KB5Zc9JH6e0734oUmSvzeug/exec';

  screen: Screen = 'intro';
  currentStep = 1;
  selectedPersona = '';

  isSubmitting = false;
  submitError = '';
  submittedLeadId = '';

  form = this.emptyForm();

  quickPathways = [
    { key: 'ausbildung', title: 'Ausbildung in Germany', subtitle: 'Training + work pathway', badge: 'AU' },
    { key: 'student', title: 'Study Abroad', subtitle: 'University admission', badge: 'ST' },
    { key: 'jobseeker', title: 'Jobs in Europe/Gulf', subtitle: 'Career placement', badge: 'JB' },
    { key: 'german', title: 'German Language', subtitle: 'A1 to B2 training', badge: 'DE' }
  ];

  steps: StepItem[] = [
    { id: 1, label: 'Persona' },
    { id: 2, label: 'Details' },
    { id: 3, label: 'Intent' },
    { id: 4, label: 'Eligibility' },
    { id: 5, label: 'Profile' }
  ];

  personaOptions: PersonaOption[] = [
    { key: 'student', title: 'I am a Student', subtitle: 'Study abroad, university admission, course selection', badge: 'ST' },
    { key: 'jobseeker', title: 'I am a Job Seeker', subtitle: 'Jobs in Germany, Europe, Gulf or skill upgrade', badge: 'JB' },
    { key: 'ausbildung', title: 'I am looking for Ausbildung', subtitle: 'Vocational training and work pathway in Germany', badge: 'AU' },
    { key: 'german', title: 'I want to Learn German', subtitle: 'A1 to B2 language training and exam preparation', badge: 'DE' },
    { key: 'parent', title: 'I am a Parent / Guardian', subtitle: 'Guidance for my child’s education or career pathway', badge: 'PR' },
    { key: 'agent', title: 'I am an Agent / Partner', subtitle: 'Partnership, student sourcing or referral onboarding', badge: 'AG' },
    { key: 'employer', title: 'I am an Employer', subtitle: 'Hiring candidates from abroad or building talent pipeline', badge: 'EM' },
    { key: 'unsure', title: 'I am not sure', subtitle: 'Career discovery and pathway counselling', badge: 'CD' }
  ];

  currentStatuses: string[] = [
    'Currently Studying',
    'Working',
    'Unemployed / Looking',
    'In Training',
    'Waiting for Results'
  ];

  germanLevels = [
    { title: 'No German', subtitle: '' },
    { title: 'A1', subtitle: 'Beginner' },
    { title: 'A2', subtitle: 'Elementary' },
    { title: 'B1', subtitle: 'Intermediate' },
    { title: 'B2', subtitle: 'Upper Intermediate' }
  ];

  passportStatuses: string[] = [
    'Passport Available',
    'Applied / In Process',
    'Not Applied Yet'
  ];

  startTimelines: string[] = [
    'Immediately',
    '1-3 months',
    '3-6 months',
    '6-12 months'
  ];

  goHome() {
    this.router.navigate(['/']);
  }

  startAssessment() {
    this.screen = 'form';
    this.currentStep = 1;
  }

  quickStart(persona: string) {
    this.selectedPersona = persona;
    this.resetPersonaDependentFields();
    this.screen = 'form';
    this.currentStep = 2;
  }

  selectPersona(persona: string) {
    this.selectedPersona = persona;
    this.resetPersonaDependentFields();
  }

  goToStep(step: number) {
    if (step < this.currentStep || this.validateCurrentStep()) {
      this.currentStep = step;
    }
  }

  next() {
    this.submitError = '';

    if (!this.validateCurrentStep()) {
      return;
    }

    if (this.currentStep < 5) {
      this.currentStep++;
      return;
    }

    this.submitLead();
  }

  back() {
    if (this.currentStep > 1) {
      this.currentStep--;
      return;
    }

    this.screen = 'intro';
  }

  restart() {
    this.screen = 'intro';
    this.currentStep = 1;
    this.selectedPersona = '';
    this.submittedLeadId = '';
    this.submitError = '';
    this.form = this.emptyForm();
  }

  resetPersonaDependentFields() {
    this.form.goal = '';
    this.form.dynamicOne = '';
    this.form.dynamicTwo = '';
    this.form.dynamicChipOne = '';
    this.form.dynamicChipTwo = '';
    this.form.startTimeline = '';
  }

  emptyForm() {
    return {
      fullName: '',
      mobile: '',
      email: '',
      country: '',
      nationality: '',
      state: '',
      city: '',
      language: '',
      ageGroup: '',
      consent: false,
      goal: '',
      qualification: '',
      stream: '',
      yearCompleted: '',
      score: '',
      currentStatus: '',
      germanLevel: '',
      passportStatus: '',
      dynamicOne: '',
      dynamicTwo: '',
      dynamicChipOne: '',
      dynamicChipTwo: '',
      startTimeline: ''
    };
  }

  validateCurrentStep(): boolean {
    if (this.currentStep === 1 && !this.selectedPersona) {
      alert('Please select your profile type.');
      return false;
    }

    if (this.currentStep === 2) {
      if (!this.form.fullName || !this.form.mobile || !this.form.email) {
        alert('Please fill Full Name, Mobile, and Email.');
        return false;
      }

      if (!this.form.country || !this.form.nationality || !this.form.city) {
        alert('Please complete Country, Nationality, and City.');
        return false;
      }

      if (!this.isValidEmail(this.form.email)) {
        alert('Please enter a valid email address.');
        return false;
      }

      if (!this.isValidMobile(this.form.mobile)) {
        alert('Please enter a valid WhatsApp / mobile number.');
        return false;
      }

      if (!this.form.consent) {
        alert('Please provide consent to continue.');
        return false;
      }
    }

    if (this.currentStep === 3 && !this.form.goal) {
      alert('Please select your main goal.');
      return false;
    }

    if (this.currentStep === 4) {
      if (!this.form.qualification || !this.form.stream || !this.form.currentStatus) {
        alert('Please complete Qualification, Stream, and Current Status.');
        return false;
      }

      if (!this.form.germanLevel || !this.form.passportStatus) {
        alert('Please select German Level and Passport Status.');
        return false;
      }
    }

    if (this.currentStep === 5) {
      if (!this.form.dynamicOne || !this.form.dynamicTwo) {
        alert('Please complete the personalised preference fields.');
        return false;
      }

      if (!this.form.dynamicChipOne || !this.form.dynamicChipTwo || !this.form.startTimeline) {
        alert('Please complete all profile preference selections.');
        return false;
      }
    }

    return true;
  }

  isValidEmail(email: string): boolean {
    const cleanEmail = (email || '').trim().toLowerCase();
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail);
  }

  isValidMobile(mobile: string): boolean {
    const cleanMobile = (mobile || '').trim();
    return /^[+0-9\s-]{8,18}$/.test(cleanMobile);
  }

  generateLeadId(): string {
    const prefix = this.getLeadPrefix();
    const now = new Date();

    const datePart = [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, '0'),
      String(now.getDate()).padStart(2, '0')
    ].join('');

    const timePart = [
      String(now.getHours()).padStart(2, '0'),
      String(now.getMinutes()).padStart(2, '0'),
      String(now.getSeconds()).padStart(2, '0')
    ].join('');

    return `ALT-${prefix}-${datePart}-${timePart}`;
  }

  buildLeadPayload() {
    const context = this.getPersonaContext();
    const leadId = this.generateLeadId();

    return {
      leadId,
      persona: this.selectedPersona || 'unsure',
      leadTag: context.leadTag,
      priority: this.getCounsellingPriority(),
      profileScore: this.getProfileScore(),

      fullName: this.form.fullName,
      mobile: this.form.mobile,
      email: this.form.email,
      country: this.form.country,
      nationality: this.form.nationality,
      state: this.form.state,
      city: this.form.city,
      language: this.form.language,
      ageGroup: this.form.ageGroup,

      goal: this.form.goal,
      qualification: this.form.qualification,
      stream: this.form.stream,
      yearCompleted: this.form.yearCompleted,
      score: this.form.score,
      currentStatus: this.form.currentStatus,
      germanLevel: this.form.germanLevel,
      passportStatus: this.form.passportStatus,

      dynamicOne: this.form.dynamicOne,
      dynamicTwo: this.form.dynamicTwo,
      dynamicChipOne: this.form.dynamicChipOne,
      dynamicChipTwo: this.form.dynamicChipTwo,
      startTimeline: this.form.startTimeline,

      assignedDesk: context.desk,
      recommendation: context.recommendation,
      consent: this.form.consent,
      source: 'AltusCareer Career Pathway Assessment'
    };
  }

  submitLead() {
    if (this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    this.submitError = '';

    const payload = this.buildLeadPayload();
    this.submittedLeadId = payload.leadId;
    const payloadText = JSON.stringify(payload);

    fetch(this.leadCaptureUrl, {
      method: 'POST',
      mode: 'no-cors',
      keepalive: true,
      headers: {
        'Content-Type': 'text/plain;charset=UTF-8'
      },
      body: payloadText
    }).catch((error) => {
      console.error('Background lead submission failed:', error);
    });

    setTimeout(() => {
      this.isSubmitting = false;
      this.router.navigate(['/']);
    }, 800);
  }

  getProfileScore(): number {
    let score = 20;

    if (this.selectedPersona) score += 10;
    if (this.form.goal) score += 15;
    if (this.form.qualification && this.form.stream) score += 15;
    if (this.form.germanLevel && this.form.germanLevel !== 'No German') score += 10;
    if (this.form.passportStatus === 'Passport Available') score += 10;
    if (this.form.dynamicOne && this.form.dynamicTwo) score += 10;
    if (this.form.dynamicChipOne && this.form.dynamicChipTwo) score += 5;
    if (this.form.startTimeline === 'Immediately' || this.form.startTimeline === '1-3 months') score += 5;

    return Math.min(score, 100);
  }

  getCounsellingPriority(): string {
    const score = this.getProfileScore();

    if (score >= 80) return 'High Priority Lead';
    if (score >= 60) return 'Warm Lead';
    if (score >= 40) return 'Nurture Lead';

    return 'Discovery Lead';
  }

  getPriorityDescription(): string {
    const priority = this.getCounsellingPriority();

    if (priority === 'High Priority Lead') {
      return 'Candidate appears ready for immediate counselling and process validation.';
    }

    if (priority === 'Warm Lead') {
      return 'Candidate has clear intent and should be followed up by the counsellor desk.';
    }

    if (priority === 'Nurture Lead') {
      return 'Candidate needs more information, comparison, and guided decision support.';
    }

    return 'Candidate needs initial discovery counselling before choosing a pathway.';
  }

  getProcessChecklist(): { label: string; status: string }[] {
    return [
      { label: 'Profile created', status: 'Completed' },
      { label: 'Intent captured', status: this.form.goal ? 'Completed' : 'Pending' },
      { label: 'Eligibility review', status: this.form.qualification && this.form.stream ? 'Next' : 'Pending' },
      { label: 'Document upload', status: this.form.passportStatus === 'Passport Available' ? 'Next' : 'Pending' },
      { label: 'Counselling call', status: 'Next' }
    ];
  }

  getSuggestedTimeline(): { title: string; description: string; active: boolean }[] {
    if (this.selectedPersona === 'ausbildung') {
      return [
        { title: 'Today', description: 'Book Ausbildung counselling call', active: true },
        { title: 'This Week', description: 'Check eligibility and German language level', active: false },
        { title: 'Next 30 Days', description: 'Start A1/A2 German preparation or interview readiness', active: false }
      ];
    }

    if (this.selectedPersona === 'jobseeker') {
      return [
        { title: 'Today', description: 'Upload CV and book job counselling', active: true },
        { title: 'This Week', description: 'Review target country, role and salary fit', active: false },
        { title: 'Next 30 Days', description: 'Prepare documents and employer interview plan', active: false }
      ];
    }

    if (this.selectedPersona === 'german') {
      return [
        { title: 'Today', description: 'Take German level assessment', active: true },
        { title: 'This Week', description: 'Attend demo class and choose batch', active: false },
        { title: 'Next 30 Days', description: 'Start structured A1-B2 learning pathway', active: false }
      ];
    }

    return [
      { title: 'Today', description: 'Book counselling call', active: true },
      { title: 'This Week', description: 'Compare pathway and eligibility options', active: false },
      { title: 'Next Step', description: 'Start application, training or documentation plan', active: false }
    ];
  }

  handleFinalAction(action: string) {
    const cleanedAction = action.toLowerCase();

    const routes: Record<string, string> = {
      'book student counselling': '/book-counselling/study-abroad',
      'download germany guide': '/downloads/germany-study-guide',
      'compare universities': '/compare/universities',

      'upload cv': '/candidate/upload-cv',
      'book job counselling': '/book-counselling/jobs',
      'check salary range': '/tools/salary-calculator',

      'book ausbildung counselling': '/book-counselling/ausbildung',
      'start german demo class': '/german/demo-class',
      'check eligibility': '/tools/ausbildung-eligibility',
      'download ausbildung guide': '/downloads/ausbildung-guide',

      'book german demo class': '/german/demo-class',
      'take level test': '/german/level-test',
      'view a1-b2 batches': '/german/batches',
      'talk to trainer': '/german/talk-to-trainer',

      'book parent counselling': '/book-counselling/parent',
      'download parent guide': '/downloads/parent-guide',
      'compare pathways': '/compare/pathways',

      'apply as partner': '/partners/apply',
      'download partner deck': '/downloads/partner-deck',
      'schedule partner call': '/partners/schedule-call',
      'view commission model': '/partners/commission-model',

      'submit hiring requirement': '/employers/hiring-requirement',
      'schedule employer call': '/employers/schedule-call',
      'view recruitment process': '/employers/recruitment-process',
      'request candidate pipeline': '/employers/candidate-pipeline',

      'book discovery call': '/book-counselling/discovery',
      'take career assessment': '/tools/career-assessment'
    };

    if (cleanedAction.includes('whatsapp')) {
      const message = encodeURIComponent(
        `Hi AltusCareer, I completed the Career Pathway Assessment. My Lead ID is ${this.submittedLeadId}. Please guide me.`
      );

      window.open(`https://wa.me/917075764500?text=${message}`, '_blank');
      return;
    }

    const matchedRoute = routes[cleanedAction];

    if (matchedRoute) {
      this.router.navigate([matchedRoute], {
        queryParams: {
          leadId: this.submittedLeadId,
          persona: this.selectedPersona,
          priority: this.getCounsellingPriority()
        }
      });
      return;
    }

    alert('This workflow will be connected to the next process page.');
  }

  getStepEyebrow(): string {
    const labels: Record<number, string> = {
      1: 'Profile routing',
      2: 'Contact details',
      3: 'Career intent',
      4: 'Eligibility check',
      5: 'Personalised preference'
    };

    return labels[this.currentStep];
  }

  getStepTitle(): string {
    if (this.currentStep === 1) return 'Which best describes you today?';
    if (this.currentStep === 2) return 'Your Basic Details';
    if (this.currentStep === 3) return 'What is your main goal?';
    if (this.currentStep === 4) return 'Qualification & Background';
    return this.getPersonaContext().profileTitle;
  }

  getStepDescription(): string {
    if (this.currentStep === 1) return 'Select your current role so we can personalise the next questions and route you to the right counselling desk.';
    if (this.currentStep === 2) return 'Provide essential contact information so our counselling team can create and follow up your profile.';
    if (this.currentStep === 3) return 'Your objective helps us understand whether you need admission, jobs, Ausbildung, language training, or discovery guidance.';
    if (this.currentStep === 4) return 'These details help us assess your pathway eligibility, readiness, documentation, and counselling priority.';
    return this.getPersonaContext().profileDescription;
  }

  getPersonaContext(): PersonaContext {
    const map: Record<string, PersonaContext> = {
      student: {
        eyebrow: 'Student pathway',
        title: 'Study Abroad Profile',
        description: 'University, course, country, budget and admission readiness.',
        profileTitle: 'Study Preference',
        profileDescription: 'Tell us your target country, study subject, budget and decision-making situation.',
        recommendation: 'Study Abroad Counselling Pathway',
        desk: 'Study Abroad Desk',
        leadTag: 'Student Lead'
      },
      jobseeker: {
        eyebrow: 'Job seeker pathway',
        title: 'International Job Profile',
        description: 'Career placement, country preference, sector, experience and relocation readiness.',
        profileTitle: 'Job Preference',
        profileDescription: 'Tell us your target job market, sector, salary expectation and relocation timeline.',
        recommendation: 'Jobs in Europe / Gulf Career Pathway',
        desk: 'International Jobs Desk',
        leadTag: 'Job Lead'
      },
      ausbildung: {
        eyebrow: 'Ausbildung pathway',
        title: 'Ausbildung Germany Profile',
        description: 'Vocational training readiness, German level, sector fit and employer preparation.',
        profileTitle: 'Ausbildung Readiness',
        profileDescription: 'Tell us your preferred Ausbildung sector, German readiness, budget and start timeline.',
        recommendation: 'Ausbildung in Germany + German Training Pathway',
        desk: 'Ausbildung + German Language Desk',
        leadTag: 'Ausbildung Lead'
      },
      german: {
        eyebrow: 'German academy pathway',
        title: 'German Language Training Profile',
        description: 'A1 to B2 training, exam preparation, speaking practice and learning mode.',
        profileTitle: 'German Training Preference',
        profileDescription: 'Tell us your current German level, preferred training mode and exam goal.',
        recommendation: 'German Language Academy Pathway',
        desk: 'German Language Academy Desk',
        leadTag: 'Language Lead'
      },
      parent: {
        eyebrow: 'Parent counselling pathway',
        title: 'Parent / Guardian Counselling Profile',
        description: 'Child profile, education stage, budget, safety concerns and decision support.',
        profileTitle: 'Child Profile & Parent Preference',
        profileDescription: 'Tell us about the student, preferred pathway, budget and parent decision concerns.',
        recommendation: 'Parent Counselling + Career Pathway Mapping',
        desk: 'Parent Counselling Desk',
        leadTag: 'Parent Lead'
      },
      agent: {
        eyebrow: 'Partner pathway',
        title: 'Agent / Partner Onboarding Profile',
        description: 'Partnership type, sourcing capacity, geography and program interest.',
        profileTitle: 'Partnership Preference',
        profileDescription: 'Tell us your market, sourcing capacity, preferred programs and partnership model.',
        recommendation: 'Agent / Partner Onboarding Pathway',
        desk: 'Partnership Desk',
        leadTag: 'Partner Lead'
      },
      employer: {
        eyebrow: 'Employer pathway',
        title: 'Employer Hiring Profile',
        description: 'Hiring country, job category, candidate volume and recruitment timeline.',
        profileTitle: 'Hiring Requirement',
        profileDescription: 'Tell us your hiring sector, candidate volume, country and urgency.',
        recommendation: 'International Recruitment Support Pathway',
        desk: 'Employer Recruitment Desk',
        leadTag: 'Employer Lead'
      },
      unsure: {
        eyebrow: 'Discovery pathway',
        title: 'Career Discovery Profile',
        description: 'Explore suitable options through eligibility, interest, budget and timeline mapping.',
        profileTitle: 'Career Discovery Preference',
        profileDescription: 'Tell us what you are confused about, your preferred destination and available timeline.',
        recommendation: 'Career Discovery + Counselling Pathway',
        desk: 'Career Discovery Desk',
        leadTag: 'Discovery Lead'
      }
    };

    return map[this.selectedPersona] || map['unsure'];
  }

  getGoalOptions(): GoalOption[] {
    const common = [
      { title: 'I need expert counselling', subtitle: 'I want a counsellor to explain my best-fit options.' },
      { title: 'I want to compare pathways', subtitle: 'I need clarity before choosing study, job, Ausbildung or language.' }
    ];

    const map: Record<string, GoalOption[]> = {
      student: [
        { title: 'Study in Germany', subtitle: 'Public/private university, bachelor, master or foundation route.' },
        { title: 'Study Medicine Abroad', subtitle: 'Medicine, nursing, healthcare or allied health pathway.' },
        { title: 'Find scholarship options', subtitle: 'Understand affordability, tuition and funding options.' },
        { title: 'Compare Study vs Ausbildung', subtitle: 'Check whether university or vocational pathway is better.' },
        ...common
      ],
      jobseeker: [
        { title: 'Job in Germany', subtitle: 'Skilled worker pathway, CV, employer and visa readiness.' },
        { title: 'Job in Europe', subtitle: 'Explore career options across European countries.' },
        { title: 'Job in Gulf', subtitle: 'UAE, Kuwait, Oman, Qatar or Saudi Arabia opportunities.' },
        { title: 'Upgrade my skills', subtitle: 'Improve profile, CV, language and interview readiness.' },
        ...common
      ],
      ausbildung: [
        { title: 'Start Ausbildung in Germany', subtitle: 'Vocational training, German language and employer matching.' },
        { title: 'Check my Ausbildung eligibility', subtitle: 'Qualification, age, German level and document readiness.' },
        { title: 'Choose Ausbildung sector', subtitle: 'Healthcare, hospitality, IT, technical, retail or logistics.' },
        { title: 'Understand Ausbildung cost & timeline', subtitle: 'Training, documents, visa, interviews and travel planning.' },
        ...common
      ],
      german: [
        { title: 'Start A1 German', subtitle: 'Beginner German learning with structured training.' },
        { title: 'Prepare for Goethe / Telc exam', subtitle: 'Exam preparation, mock tests and speaking practice.' },
        { title: 'Improve spoken German', subtitle: 'Conversation practice for interview and workplace readiness.' },
        { title: 'German for Ausbildung / Jobs', subtitle: 'Language pathway linked to migration and career outcome.' },
        ...common
      ],
      parent: [
        { title: 'Plan my child’s career pathway', subtitle: 'Understand safe and suitable options after school or college.' },
        { title: 'Compare study abroad and Ausbildung', subtitle: 'Evaluate affordability, career outcome and long-term growth.' },
        { title: 'Understand cost and safety', subtitle: 'Get clarity on budget, support, country and settlement.' },
        { title: 'Speak with a counsellor', subtitle: 'Book a parent counselling session with a pathway advisor.' },
        ...common
      ],
      agent: [
        { title: 'Become an AltusCareer partner', subtitle: 'Refer students, jobseekers or language learners.' },
        { title: 'Partner for Ausbildung leads', subtitle: 'Source candidates for Germany vocational pathway.' },
        { title: 'Partner for study abroad', subtitle: 'Work on admissions and student recruitment.' },
        { title: 'Understand commission model', subtitle: 'Learn partner model, process, documentation and payout.' },
        ...common
      ],
      employer: [
        { title: 'Hire international candidates', subtitle: 'Recruit skilled candidates from India, GCC or other markets.' },
        { title: 'Build Ausbildung pipeline', subtitle: 'Develop long-term trainee pipeline for Germany.' },
        { title: 'Hire for Europe / Gulf jobs', subtitle: 'Source candidates for operational and skilled roles.' },
        { title: 'Discuss recruitment process', subtitle: 'Understand sourcing, screening, documents and timelines.' },
        ...common
      ],
      unsure: [
        { title: 'Discover my best pathway', subtitle: 'Let counsellors map suitable options based on profile.' },
        { title: 'Compare all options', subtitle: 'Study abroad, Ausbildung, jobs and German language routes.' },
        { title: 'Check eligibility first', subtitle: 'Understand what is realistically possible for my background.' },
        { title: 'Talk to a counsellor', subtitle: 'Get human guidance before deciding.' },
        ...common
      ]
    };

    return map[this.selectedPersona] || map['unsure'];
  }

  getDynamicFieldOneLabel(): string {
    const map: Record<string, string> = {
      student: 'Target Study Country',
      jobseeker: 'Target Job Country',
      ausbildung: 'Preferred Ausbildung Sector',
      german: 'Target German Level',
      parent: 'Child Current Education Level',
      agent: 'Primary Market / Location',
      employer: 'Hiring Country',
      unsure: 'Preferred Destination'
    };

    return map[this.selectedPersona] || map['unsure'];
  }

  getDynamicFieldOneOptions(): string[] {
    const map: Record<string, string[]> = {
      student: ['Germany', 'Europe', 'Canada', 'USA', 'UK'],
      jobseeker: ['Germany', 'Europe', 'UAE', 'Kuwait', 'Oman', 'Qatar', 'Saudi Arabia'],
      ausbildung: ['Healthcare', 'Hospitality', 'IT', 'Retail', 'Logistics', 'Technical / Mechatronics'],
      german: ['A1', 'A2', 'B1', 'B2', 'Spoken German'],
      parent: ['10th Standard', '12th Standard', 'Diploma', 'UG Student', 'Graduate'],
      agent: ['India', 'Kuwait', 'UAE', 'Oman', 'Qatar', 'Saudi Arabia'],
      employer: ['Germany', 'Europe', 'UAE', 'Kuwait', 'Oman', 'Qatar'],
      unsure: ['Germany', 'Europe', 'Gulf', 'Canada', 'Not decided']
    };

    return map[this.selectedPersona] || map['unsure'];
  }

  getDynamicFieldTwoLabel(): string {
    const map: Record<string, string> = {
      student: 'Preferred Field of Study',
      jobseeker: 'Job Sector',
      ausbildung: 'Current German Readiness',
      german: 'Preferred Training Mode',
      parent: 'Preferred Pathway for Child',
      agent: 'Preferred Partnership Program',
      employer: 'Hiring Sector',
      unsure: 'Area of Interest'
    };

    return map[this.selectedPersona] || map['unsure'];
  }

  getDynamicFieldTwoOptions(): string[] {
    const map: Record<string, string[]> = {
      student: ['Medicine', 'Business', 'Engineering', 'IT', 'Healthcare', 'Social Sciences'],
      jobseeker: ['Healthcare', 'IT', 'Hospitality', 'Logistics', 'Retail', 'Engineering'],
      ausbildung: ['No German', 'A1 Started', 'A1 Completed', 'A2 Completed', 'B1 Ready'],
      german: ['Online', 'Classroom', 'Hybrid', 'Native Speaker Batch', 'Exam Prep Batch'],
      parent: ['Study Abroad', 'Ausbildung Germany', 'Medicine Abroad', 'German Language', 'Career Discovery'],
      agent: ['Ausbildung', 'Study Abroad', 'German Language', 'Jobs', 'All Programs'],
      employer: ['Healthcare', 'Hospitality', 'Logistics', 'Retail', 'Technical', 'IT'],
      unsure: ['Study Abroad', 'Jobs', 'Ausbildung', 'German Language', 'Not sure']
    };

    return map[this.selectedPersona] || map['unsure'];
  }

  getDynamicChipOneLabel(): string {
    const map: Record<string, string> = {
      student: 'Approximate Study Budget',
      jobseeker: 'Experience Level',
      ausbildung: 'Budget Readiness',
      german: 'Daily Study Time',
      parent: 'Decision Maker',
      agent: 'Candidate Sourcing Capacity',
      employer: 'Hiring Volume',
      unsure: 'Decision Confidence'
    };

    return map[this.selectedPersona] || map['unsure'];
  }

  getDynamicChipOneOptions(): string[] {
    const map: Record<string, string[]> = {
      student: ['Below ₹2L', '₹2-5L', '₹5-10L', '₹10-20L', '₹20L+'],
      jobseeker: ['Fresher', '1-3 years', '3-5 years', '5+ years', '10+ years'],
      ausbildung: ['Need EMI', 'Partial Ready', 'Ready for Training', 'Need Counselling'],
      german: ['30 min/day', '1 hour/day', '2 hours/day', 'Weekend only'],
      parent: ['Student', 'Parents', 'Guardian', 'Sponsor', 'Joint Decision'],
      agent: ['1-10/month', '10-25/month', '25-50/month', '50+/month'],
      employer: ['1-5 candidates', '5-20 candidates', '20-50 candidates', '50+ candidates'],
      unsure: ['Very confused', 'Need comparison', 'Almost decided', 'Need parent discussion']
    };

    return map[this.selectedPersona] || map['unsure'];
  }

  getDynamicChipTwoLabel(): string {
    const map: Record<string, string> = {
      student: 'Decision Maker',
      jobseeker: 'CV / Document Readiness',
      ausbildung: 'Interview Readiness',
      german: 'Exam Goal',
      parent: 'Parent Concern',
      agent: 'Partnership Type',
      employer: 'Recruitment Urgency',
      unsure: 'Support Needed'
    };

    return map[this.selectedPersona] || map['unsure'];
  }

  getDynamicChipTwoOptions(): string[] {
    const map: Record<string, string[]> = {
      student: ['Self', 'Parents', 'Guardian', 'Sponsor'],
      jobseeker: ['CV Ready', 'Need CV Support', 'Documents Ready', 'Need Full Support'],
      ausbildung: ['Not Ready', 'Need Training', 'Somewhat Ready', 'Ready'],
      german: ['No Exam', 'Goethe', 'Telc', 'ÖSD', 'Internal Assessment'],
      parent: ['Safety', 'Cost', 'Career Outcome', 'Language Fear', 'Country Choice'],
      agent: ['Referral', 'Sub-Agent', 'Master Agent', 'Institution Partner'],
      employer: ['Immediate', '1-3 months', '3-6 months', 'Pipeline Planning'],
      unsure: ['Counselling', 'Eligibility Check', 'Cost Clarity', 'Timeline Planning']
    };

    return map[this.selectedPersona] || map['unsure'];
  }

  getLeadPrefix(): string {
    const map: Record<string, string> = {
      student: 'STUD',
      jobseeker: 'JOB',
      ausbildung: 'AUSB',
      german: 'GER',
      parent: 'PAR',
      agent: 'AGT',
      employer: 'EMP',
      unsure: 'DISC'
    };

    return map[this.selectedPersona] || 'DISC';
  }

  getNextActions(): string[] {
    const map: Record<string, string[]> = {
      student: ['Book Student Counselling', 'Download Germany Guide', 'Compare Universities', 'Talk on WhatsApp'],
      jobseeker: ['Upload CV', 'Book Job Counselling', 'Check Salary Range', 'Talk on WhatsApp'],
      ausbildung: ['Book Ausbildung Counselling', 'Start German Demo Class', 'Check Eligibility', 'Download Ausbildung Guide'],
      german: ['Book German Demo Class', 'Take Level Test', 'View A1-B2 Batches', 'Talk to Trainer'],
      parent: ['Book Parent Counselling', 'Download Parent Guide', 'Compare Pathways', 'Talk on WhatsApp'],
      agent: ['Apply as Partner', 'Download Partner Deck', 'Schedule Partner Call', 'View Commission Model'],
      employer: ['Submit Hiring Requirement', 'Schedule Employer Call', 'View Recruitment Process', 'Request Candidate Pipeline'],
      unsure: ['Book Discovery Call', 'Take Career Assessment', 'Compare Pathways', 'Talk on WhatsApp']
    };

    return map[this.selectedPersona] || map['unsure'];
  }
}