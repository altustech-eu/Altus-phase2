import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ToolCard {
  key: 'calculator' | 'resume' | 'advisor' | 'interview';
  title: string;
  description: string;
  tags: string[];
  bgClass: string;
  tagClass: string;
}

interface CareerPathNode {
  title: string;
  subtitle: string;
  routeType: 'common' | 'somewhat' | 'less';
}

interface CareerPathwayMap {
  startRole: string;
  primaryRole: CareerPathNode;
  middleRoles: CareerPathNode[];
  seniorRoles: CareerPathNode[];
}

@Component({
  selector: 'app-tools-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="font-main bg-white py-12 lg:py-20">

      <div class="max-w-[1584px] mx-auto px-6 lg:px-12 xl:px-16 2xl:px-20 mb-10">
        <h2 class="text-3xl lg:text-[42px] font-bold text-center text-slate-900 tracking-tight">
          Tools
        </h2>

        <p class="mt-4 text-center text-[14px] lg:text-[16px] text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Use practical decision tools to calculate cost, build career documents, find pathways and prepare for interviews.
        </p>
      </div>

      <div class="bg-[#dfe3ec] py-12 lg:py-16 px-6 lg:px-12">
        <div class="max-w-[1584px] mx-auto">

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">

            @for (tool of tools; track tool.title) {
              <div
                class="bg-white rounded-2xl p-2.5 flex flex-col shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
                (click)="openTool(tool)"
              >

                <div class="rounded-[14px] p-6 flex-1 flex flex-col transition-colors" [ngClass]="tool.bgClass">

                  <h3 class="text-[22px] font-semibold mb-3 text-slate-900 tracking-tight">
                    {{ tool.title }}
                  </h3>

                  <p class="text-[13px] text-slate-700/80 mb-8 leading-relaxed font-medium">
                    {{ tool.description }}
                  </p>

                  <div class="flex flex-wrap gap-2 mt-auto">
                    @for (tag of tool.tags; track tag) {
                      <span class="px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-wide" [ngClass]="tool.tagClass">
                        {{ tag }}
                      </span>
                    }
                  </div>
                </div>

                <div class="flex items-center justify-between px-4 py-4 pt-5 mt-1">
                  <span class="font-semibold text-[15px] text-slate-800 group-hover:text-blue-600 transition-colors">
                    Open Tool
                  </span>

                  <button
                    type="button"
                    class="w-8 h-8 rounded-lg bg-[#f4f5f8] flex items-center justify-center text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>

              </div>
            }

          </div>

        </div>
      </div>

      <!-- TOOL POPUP -->
      @if (activeTool) {
        <div class="fixed inset-0 z-[999] flex items-center justify-center px-4 py-6">

          <!-- Overlay -->
          <div
            class="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            (click)="closeTool()"
          ></div>

          <!-- Modal -->
          <div class="relative z-10 w-full max-w-[1120px] max-h-[90vh] overflow-hidden rounded-2xl bg-white shadow-[0_24px_80px_rgba(15,23,42,0.35)]">

            <!-- Modal Header -->
            <div class="flex items-center justify-between gap-4 border-b border-slate-200 px-5 lg:px-7 py-4">
              <div>
                <p class="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600">
                  Interactive Tool
                </p>

                <h3 class="text-[22px] lg:text-[28px] font-bold text-slate-950 tracking-tight">
                  {{ activeTool.title }}
                </h3>
              </div>

              <button
                type="button"
                class="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors"
                (click)="closeTool()"
              >
                ✕
              </button>
            </div>

            <!-- Modal Body -->
            <div class="max-h-[calc(90vh-90px)] overflow-y-auto p-5 lg:p-7 bg-slate-50">

              <!-- CALCULATOR TOOL -->
              @if (activeTool.key === 'calculator') {
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">

                  <div class="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                    <h4 class="text-[18px] font-bold text-slate-900 mb-4">
                      Cost & ROI Calculator
                    </h4>

                    <div class="space-y-4">
                      <label class="tool-label">
                        Tuition / Training Cost
                        <input type="number" [(ngModel)]="calculator.tuition" class="tool-input" />
                      </label>

                      <label class="tool-label">
                        Living Cost Per Month
                        <input type="number" [(ngModel)]="calculator.monthlyLiving" class="tool-input" />
                      </label>

                      <label class="tool-label">
                        Duration in Months
                        <input type="number" [(ngModel)]="calculator.months" class="tool-input" />
                      </label>

                      <label class="tool-label">
                        Expected Monthly Salary After Placement
                        <input type="number" [(ngModel)]="calculator.monthlySalary" class="tool-input" />
                      </label>

                      <button type="button" class="primary-btn" (click)="calculateROI()">
                        Calculate
                      </button>
                    </div>
                  </div>

                  <div class="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                    <h4 class="text-[18px] font-bold text-slate-900 mb-4">
                      Result Summary
                    </h4>

                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
                      <div class="metric-card">
                        <p>Total Investment</p>
                        <h5>₹{{ calculatorResult.totalInvestment | number }}</h5>
                      </div>

                      <div class="metric-card">
                        <p>Annual Salary</p>
                        <h5>₹{{ calculatorResult.annualSalary | number }}</h5>
                      </div>

                      <div class="metric-card">
                        <p>Payback Period</p>
                        <h5>{{ calculatorResult.paybackMonths }} Months</h5>
                      </div>
                    </div>

                    <div class="bg-blue-50 border border-blue-100 rounded-xl p-4">
                      <p class="text-[13px] leading-relaxed text-slate-700">
                        {{ calculatorResult.message }}
                      </p>
                    </div>
                  </div>

                </div>
              }

              <!-- RESUME BUILDER TOOL -->
              @if (activeTool.key === 'resume') {
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">

                  <div class="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                    <h4 class="text-[18px] font-bold text-slate-900 mb-4">
                      Resume Builder
                    </h4>

                    <div class="space-y-4">
                      <label class="tool-label">
                        Full Name
                        <input type="text" [(ngModel)]="resume.name" class="tool-input" />
                      </label>

                      <label class="tool-label">
                        Target Role
                        <input type="text" [(ngModel)]="resume.role" class="tool-input" />
                      </label>

                      <label class="tool-label">
                        Education
                        <input type="text" [(ngModel)]="resume.education" class="tool-input" />
                      </label>

                      <label class="tool-label">
                        Key Skills
                        <textarea [(ngModel)]="resume.skills" class="tool-textarea"></textarea>
                      </label>

                      <label class="tool-label">
                        Experience / Projects
                        <textarea [(ngModel)]="resume.experience" class="tool-textarea"></textarea>
                      </label>

                      <button type="button" class="primary-btn" (click)="generateResume()">
                        Generate Resume
                      </button>
                    </div>
                  </div>

                  <div class="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                    <div class="flex items-center justify-between gap-4 mb-4">
                      <h4 class="text-[18px] font-bold text-slate-900">
                        Generated Resume Draft
                      </h4>

                      <button type="button" class="secondary-btn" (click)="copyText(resumeOutput)">
                        Copy
                      </button>
                    </div>

                    <pre class="output-box">{{ resumeOutput }}</pre>
                  </div>

                </div>
              }

              <!-- AI CAREER ADVISOR TOOL -->
              @if (activeTool.key === 'advisor') {
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">

                  <!-- Input Panel -->
                  <div class="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                    <h4 class="text-[18px] font-bold text-slate-900 mb-4">
                      AI Career Advisor
                    </h4>

                    <div class="space-y-4">
                      <label class="tool-label">
                        Current Qualification
                        <select [(ngModel)]="advisor.qualification" class="tool-input">
                          <option value="10th">10th Standard</option>
                          <option value="12th">12th Standard</option>
                          <option value="Diploma">Diploma</option>
                          <option value="UG">Undergraduate</option>
                          <option value="PG">Postgraduate</option>
                        </select>
                      </label>

                      <label class="tool-label">
                        Preferred Field
                        <select [(ngModel)]="advisor.field" class="tool-input">
                          <option value="Healthcare">Healthcare</option>
                          <option value="IT">IT</option>
                          <option value="Hospitality">Hospitality</option>
                          <option value="Engineering">Engineering</option>
                          <option value="Business">Business</option>
                        </select>
                      </label>

                      <label class="tool-label">
                        Preferred Destination
                        <select [(ngModel)]="advisor.destination" class="tool-input">
                          <option value="Germany">Germany</option>
                          <option value="Europe">Europe</option>
                          <option value="Gulf">Gulf</option>
                          <option value="Canada">Canada</option>
                          <option value="Australia">Australia</option>
                        </select>
                      </label>

                      <label class="tool-label">
                        German Language Level
                        <select [(ngModel)]="advisor.language" class="tool-input">
                          <option value="None">None</option>
                          <option value="A1">A1</option>
                          <option value="A2">A2</option>
                          <option value="B1">B1</option>
                          <option value="B2">B2</option>
                        </select>
                      </label>

                      <button type="button" class="primary-btn" (click)="generateCareerAdvice()">
                        Generate Pathway Map
                      </button>
                    </div>
                  </div>

                  <!-- Career Map Panel -->
                  <div class="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-5 shadow-sm overflow-hidden">
                    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
                      <div>
                        <h4 class="text-[18px] font-bold text-slate-900">
                          Recommended Career Pathway Map
                        </h4>

                        <p class="mt-1 text-[12px] text-slate-500">
                          Mapped from {{ advisor.qualification }} → {{ advisor.field }} → {{ advisor.destination }}
                        </p>
                      </div>

                      <button type="button" class="secondary-btn shrink-0" (click)="generateCareerAdvice()">
                        Refresh
                      </button>
                    </div>

                    <div class="career-map-scroll">
                      <div class="career-map-shell">

                        <!-- Start Node -->
                        <div class="career-start">
                          <div class="career-start-dot"></div>
                          <p>{{ advisorPathway.startRole }}</p>
                        </div>

                        <!-- Route Lines -->
                        <div class="career-line career-line-main"></div>
                        <div class="career-line career-line-mid"></div>
                        <div class="career-line career-line-bottom"></div>
                        <div class="career-line career-line-top"></div>
                        <div class="career-line career-line-senior-mid"></div>
                        <div class="career-line career-line-senior-bottom"></div>

                        <!-- Primary Node -->
                        <button
                          type="button"
                          class="career-node career-primary-node"
                          [ngClass]="[
                            advisorPathway.primaryRole.routeType === 'common' ? 'route-common' : '',
                            advisorPathway.primaryRole.routeType === 'somewhat' ? 'route-somewhat' : '',
                            advisorPathway.primaryRole.routeType === 'less' ? 'route-less' : ''
                          ]"
                        >
                          <span>{{ advisorPathway.primaryRole.title }}</span>
                          <small>{{ advisorPathway.primaryRole.subtitle }}</small>
                          <b>→</b>
                        </button>

                        <!-- Middle Nodes -->
                        @for (node of advisorPathway.middleRoles; track node.title) {
                          <button
                            type="button"
                            class="career-node"
                            [ngClass]="[
                              $index === 0 ? 'career-mid-top' : '',
                              $index === 1 ? 'career-mid-bottom' : '',
                              node.routeType === 'common' ? 'route-common' : '',
                              node.routeType === 'somewhat' ? 'route-somewhat' : '',
                              node.routeType === 'less' ? 'route-less' : ''
                            ]"
                          >
                            <span>{{ node.title }}</span>
                            <small>{{ node.subtitle }}</small>
                            <b>→</b>
                          </button>
                        }

                        <!-- Senior Nodes -->
                        @for (node of advisorPathway.seniorRoles; track node.title) {
                          <button
                            type="button"
                            class="career-node"
                            [ngClass]="[
                              $index === 0 ? 'career-senior-top' : '',
                              $index === 1 ? 'career-senior-mid' : '',
                              $index === 2 ? 'career-senior-bottom' : '',
                              node.routeType === 'common' ? 'route-common' : '',
                              node.routeType === 'somewhat' ? 'route-somewhat' : '',
                              node.routeType === 'less' ? 'route-less' : ''
                            ]"
                          >
                            <span>{{ node.title }}</span>
                            <small>{{ node.subtitle }}</small>
                          </button>
                        }

                      </div>
                    </div>

                    <!-- Legend -->
                    <div class="career-legend">
                      <div>
                        <span class="legend-box common"></span>
                        More common (&gt; 20%)
                      </div>

                      <div>
                        <span class="legend-box somewhat"></span>
                        Somewhat common (8 - 20%)
                      </div>

                      <div>
                        <span class="legend-line less"></span>
                        Less common (&lt; 8%)
                      </div>
                    </div>
                  </div>

                </div>
              }

              <!-- INTERVIEW PREP TOOL -->
              @if (activeTool.key === 'interview') {
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">

                  <div class="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                    <h4 class="text-[18px] font-bold text-slate-900 mb-4">
                      Interview Preparation
                    </h4>

                    <div class="space-y-4">
                      <label class="tool-label">
                        Role / Program
                        <input type="text" [(ngModel)]="interview.role" class="tool-input" />
                      </label>

                      <label class="tool-label">
                        Interview Type
                        <select [(ngModel)]="interview.type" class="tool-input">
                          <option value="Ausbildung">Ausbildung</option>
                          <option value="University Admission">University Admission</option>
                          <option value="Job Interview">Job Interview</option>
                          <option value="Visa Interview">Visa Interview</option>
                        </select>
                      </label>

                      <label class="tool-label">
                        Experience Level
                        <select [(ngModel)]="interview.level" class="tool-input">
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Experienced">Experienced</option>
                        </select>
                      </label>

                      <button type="button" class="primary-btn" (click)="generateInterviewPrep()">
                        Generate Questions
                      </button>
                    </div>
                  </div>

                  <div class="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                    <h4 class="text-[18px] font-bold text-slate-900 mb-4">
                      Mock Interview Questions
                    </h4>

                    <div class="space-y-3">
                      @for (question of interviewQuestions; track question) {
                        <div class="border border-slate-200 bg-slate-50 rounded-xl p-4">
                          <p class="text-[13px] font-semibold leading-relaxed text-slate-800">
                            {{ question }}
                          </p>
                        </div>
                      }
                    </div>
                  </div>

                </div>
              }

            </div>
          </div>
        </div>
      }
    </section>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

    .font-main {
      font-family: 'Poppins', Helvetica, Arial, sans-serif;
    }

    .tool-label {
      display: flex;
      flex-direction: column;
      gap: 7px;
      font-size: 12px;
      font-weight: 700;
      color: #334155;
    }

    .tool-input {
      width: 100%;
      height: 42px;
      border: 1px solid #cbd5e1;
      border-radius: 10px;
      padding: 0 12px;
      font-size: 13px;
      font-weight: 500;
      color: #0f172a;
      background: #ffffff;
      outline: none;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }

    .tool-input:focus {
      border-color: #0f62fe;
      box-shadow: 0 0 0 3px rgba(15, 98, 254, 0.12);
    }

    .tool-textarea {
      width: 100%;
      min-height: 90px;
      border: 1px solid #cbd5e1;
      border-radius: 10px;
      padding: 12px;
      font-size: 13px;
      font-weight: 500;
      color: #0f172a;
      background: #ffffff;
      outline: none;
      resize: vertical;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }

    .tool-textarea:focus {
      border-color: #0f62fe;
      box-shadow: 0 0 0 3px rgba(15, 98, 254, 0.12);
    }

    .primary-btn {
      width: 100%;
      height: 44px;
      border-radius: 10px;
      background: #0f62fe;
      color: #ffffff;
      font-size: 13px;
      font-weight: 700;
      transition: background 0.2s ease, transform 0.2s ease;
    }

    .primary-btn:hover {
      background: #0043ce;
      transform: translateY(-1px);
    }

    .secondary-btn {
      height: 34px;
      padding: 0 14px;
      border-radius: 8px;
      background: #eef4ff;
      color: #0f62fe;
      font-size: 12px;
      font-weight: 700;
      transition: background 0.2s ease;
    }

    .secondary-btn:hover {
      background: #dbeafe;
    }

    .metric-card {
      border: 1px solid #e2e8f0;
      background: #f8fafc;
      border-radius: 14px;
      padding: 14px;
    }

    .metric-card p {
      font-size: 11px;
      font-weight: 700;
      color: #64748b;
      margin-bottom: 6px;
    }

    .metric-card h5 {
      font-size: 18px;
      font-weight: 800;
      color: #0f172a;
    }

    .output-box {
      white-space: pre-wrap;
      min-height: 360px;
      max-height: 520px;
      overflow-y: auto;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      background: #f8fafc;
      padding: 18px;
      font-size: 13px;
      line-height: 1.7;
      color: #1e293b;
      font-family: 'Poppins', Helvetica, Arial, sans-serif;
    }

    .career-map-scroll {
      width: 100%;
      overflow-x: auto;
      overflow-y: hidden;
      padding-bottom: 8px;
    }

    .career-map-scroll::-webkit-scrollbar {
      height: 8px;
    }

    .career-map-scroll::-webkit-scrollbar-track {
      background: #f1f5f9;
    }

    .career-map-scroll::-webkit-scrollbar-thumb {
      background: #94a3b8;
      border-radius: 999px;
    }

    .career-map-shell {
      position: relative;
      width: 760px;
      min-width: 760px;
      height: 360px;
      background:
        radial-gradient(circle at 18% 40%, rgba(20, 184, 166, 0.08), transparent 22%),
        linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
      border: 1px solid #e2e8f0;
      overflow: hidden;
    }

    .career-start {
      position: absolute;
      left: 28px;
      top: 156px;
      width: 150px;
      display: flex;
      align-items: center;
      gap: 10px;
      z-index: 8;
    }

    .career-start-dot {
      width: 36px;
      height: 36px;
      border-radius: 999px;
      background: #ffffff;
      border: 9px solid #006b64;
      box-shadow: 0 8px 18px rgba(15, 23, 42, 0.12);
      flex-shrink: 0;
    }

    .career-start p {
      font-size: 12px;
      line-height: 1.15;
      font-weight: 800;
      color: #334155;
      max-width: 95px;
    }

    .career-line {
      position: absolute;
      height: 7px;
      border-radius: 999px;
      transform-origin: left center;
      z-index: 1;
    }

    .career-line-main {
      left: 65px;
      top: 172px;
      width: 182px;
      background: #006b64;
      transform: rotate(-43deg);
    }

    .career-line-mid {
      left: 65px;
      top: 174px;
      width: 190px;
      background: #00a99d;
      transform: rotate(0deg);
    }

    .career-line-bottom {
      left: 65px;
      top: 176px;
      width: 182px;
      background: #00a99d;
      transform: rotate(43deg);
    }

    .career-line-top {
      left: 390px;
      top: 166px;
      width: 138px;
      background: #006b64;
      transform: rotate(-42deg);
    }

    .career-line-senior-mid {
      left: 390px;
      top: 166px;
      width: 148px;
      background: #00a99d;
      transform: rotate(0deg);
    }

    .career-line-senior-bottom {
      left: 390px;
      top: 166px;
      width: 138px;
      background: #00a99d;
      transform: rotate(42deg);
    }

    .career-node {
      position: absolute;
      width: 178px;
      min-height: 64px;
      border: 1.5px solid #00a99d;
      border-radius: 999px;
      background: #ffffff;
      color: #0f62fe;
      box-shadow: 0 8px 22px rgba(15, 23, 42, 0.08);
      padding: 11px 34px 11px 18px;
      text-align: center;
      z-index: 6;
    }

    .career-node span {
      display: block;
      font-size: 12px;
      line-height: 1.12;
      font-weight: 800;
    }

    .career-node small {
      display: block;
      margin-top: 5px;
      font-size: 10px;
      line-height: 1.1;
      color: #64748b;
      font-weight: 600;
    }

    .career-node b {
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
      color: #475569;
      font-size: 17px;
    }

    .career-primary-node {
      left: 238px;
      top: 134px;
    }

    .career-mid-top {
      left: 238px;
      top: 68px;
    }

    .career-mid-bottom {
      left: 238px;
      top: 242px;
    }

    .career-senior-top {
      left: 560px;
      top: 38px;
    }

    .career-senior-mid {
      left: 560px;
      top: 134px;
    }

    .career-senior-bottom {
      left: 560px;
      top: 230px;
    }

    .route-common {
      border-color: #006b64;
    }

    .route-somewhat {
      border-color: #008a83;
    }

    .route-less {
      border-color: #00a99d;
    }

    .career-legend {
      margin-top: 14px;
      display: flex;
      flex-wrap: wrap;
      gap: 18px;
      border: 1px solid #e2e8f0;
      background: #ffffff;
      padding: 12px 14px;
      font-size: 11px;
      font-weight: 600;
      color: #475569;
    }

    .career-legend div {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .legend-box {
      width: 14px;
      height: 14px;
      display: inline-block;
    }

    .legend-box.common {
      background: #006b64;
    }

    .legend-box.somewhat {
      background: #008a83;
    }

    .legend-line.less {
      width: 18px;
      height: 4px;
      display: inline-block;
      background: #00a99d;
    }

    @media (max-width: 1024px) {
      .career-map-shell {
        width: 720px;
        min-width: 720px;
      }

      .career-senior-top,
      .career-senior-mid,
      .career-senior-bottom {
        left: 525px;
      }
    }

    @media (max-width: 640px) {
      .career-map-scroll {
        overflow-x: visible;
        padding-bottom: 0;
      }

      .career-map-shell {
        width: 100%;
        min-width: 0;
        height: auto;
        padding: 22px;
        overflow: visible;
      }

      .career-line {
        display: none;
      }

      .career-start,
      .career-node,
      .career-primary-node,
      .career-mid-top,
      .career-mid-bottom,
      .career-senior-top,
      .career-senior-mid,
      .career-senior-bottom {
        position: relative;
        left: auto;
        top: auto;
        width: 100%;
      }

      .career-start {
        margin-bottom: 14px;
      }

      .career-node {
        min-height: auto;
        margin-bottom: 12px;
        border-radius: 16px;
        padding: 14px 42px 14px 16px;
      }

      .career-start::after,
      .career-node::after {
        content: '';
        display: block;
        width: 4px;
        height: 18px;
        background: #00a99d;
        margin: 12px auto 0;
        border-radius: 999px;
      }

      .career-senior-bottom::after {
        display: none;
      }

      .career-legend {
        gap: 10px;
        font-size: 10px;
      }
    }
  `]
})
export class ToolsSectionComponent {

  activeTool: ToolCard | null = null;

  tools: ToolCard[] = [
    {
      key: 'calculator',
      title: 'Calculators',
      description: 'Estimate your ROI, blocked account requirements, and cost of living accurately.',
      tags: ['Salary', 'ROI', 'Blocked Account'],
      bgClass: 'bg-[#e5f5fd]',
      tagClass: 'bg-[#c6e9fa] text-[#00609a]'
    },
    {
      key: 'resume',
      title: 'Resume Builder',
      description: 'Creates impactful ATS-friendly European standard CVs and cover letters.',
      tags: ['ATS Friendly', 'Templates', 'Cover Letter'],
      bgClass: 'bg-[#fdecdb]',
      tagClass: 'bg-[#fad5b4] text-[#a45c1a]'
    },
    {
      key: 'advisor',
      title: 'AI Career Advisor',
      description: 'Builds functional and scalable study or work pathways based on your profile.',
      tags: ['Pathway Match', 'University', 'Eligibility'],
      bgClass: 'bg-[#efe6fd]',
      tagClass: 'bg-[#dbccf8] text-[#5b32a8]'
    },
    {
      key: 'interview',
      title: 'Interview Prep',
      description: 'Delivers persuasive and creative interview responses with AI mock sessions.',
      tags: ['Mock Interviews', 'Questions', 'Tips'],
      bgClass: 'bg-[#e0f8ed]',
      tagClass: 'bg-[#bcecd6] text-[#1f8755]'
    }
  ];

  calculator = {
    tuition: 100000,
    monthlyLiving: 75000,
    months: 12,
    monthlySalary: 180000
  };

  calculatorResult = {
    totalInvestment: 0,
    annualSalary: 0,
    paybackMonths: 0,
    message: 'Enter your cost and salary assumptions, then calculate your estimated ROI.'
  };

  resume = {
    name: '',
    role: '',
    education: '',
    skills: '',
    experience: ''
  };

  resumeOutput = 'Fill the form and click Generate Resume to create a structured draft.';

  advisor = {
    qualification: '12th',
    field: 'Healthcare',
    destination: 'Germany',
    language: 'None'
  };

  advisorPathway: CareerPathwayMap = {
    startRole: 'Student / Candidate',
    primaryRole: {
      title: 'Career Pathway',
      subtitle: 'Generate your pathway',
      routeType: 'common'
    },
    middleRoles: [
      {
        title: 'Study Route',
        subtitle: 'University / College',
        routeType: 'somewhat'
      },
      {
        title: 'Work Route',
        subtitle: 'Job / Training',
        routeType: 'less'
      }
    ],
    seniorRoles: [
      {
        title: 'Long-Term Career',
        subtitle: 'Global mobility outcome',
        routeType: 'common'
      },
      {
        title: 'Specialist Pathway',
        subtitle: 'Skill-based progression',
        routeType: 'somewhat'
      },
      {
        title: 'Leadership Route',
        subtitle: 'Management outcome',
        routeType: 'less'
      }
    ]
  };

  interview = {
    role: '',
    type: 'Ausbildung',
    level: 'Beginner'
  };

  interviewQuestions = [
    'Enter your role or program and click Generate Questions to create mock interview questions.'
  ];

  openTool(tool: ToolCard): void {
    this.activeTool = tool;

    if (tool.key === 'calculator') {
      this.calculateROI();
    }

    if (tool.key === 'advisor') {
      this.generateCareerAdvice();
    }
  }

  closeTool(): void {
    this.activeTool = null;
  }

  calculateROI(): void {
    const tuition = Number(this.calculator.tuition) || 0;
    const living = Number(this.calculator.monthlyLiving) || 0;
    const months = Number(this.calculator.months) || 1;
    const salary = Number(this.calculator.monthlySalary) || 0;

    const totalInvestment = tuition + living * months;
    const annualSalary = salary * 12;
    const paybackMonths = salary > 0 ? Math.ceil(totalInvestment / salary) : 0;

    this.calculatorResult = {
      totalInvestment,
      annualSalary,
      paybackMonths,
      message:
        paybackMonths > 0
          ? `Your estimated investment is ₹${totalInvestment.toLocaleString()}. Based on an expected monthly salary of ₹${salary.toLocaleString()}, the payback period is approximately ${paybackMonths} months.`
          : 'Enter a valid expected monthly salary to calculate the payback period.'
    };
  }

  generateResume(): void {
    const name = this.resume.name || 'Candidate Name';
    const role = this.resume.role || 'Target Role';
    const education = this.resume.education || 'Education details not provided';
    const skills = this.resume.skills || 'Skills not provided';
    const experience = this.resume.experience || 'Experience or project details not provided';

    this.resumeOutput =
`EUROPEAN STANDARD RESUME DRAFT

Name:
${name}

Target Role:
${role}

Professional Summary:
Motivated and career-focused candidate targeting ${role}. Demonstrates strong learning ability, structured communication, and readiness to work in an international environment.

Education:
${education}

Core Skills:
${skills}

Experience / Projects:
${experience}

Career Objective:
To build a long-term international career by applying technical knowledge, professional discipline, communication skills, and continuous learning orientation.

Suggested Improvements:
1. Add measurable achievements wherever possible.
2. Include language proficiency and certifications.
3. Keep the resume concise, preferably 1 to 2 pages.
4. Align keywords with the target job description.`;
  }

  generateCareerAdvice(): void {
    const q = this.advisor.qualification;
    const field = this.advisor.field;
    const destination = this.advisor.destination;
    const language = this.advisor.language;

    const baseStart =
      q === '10th'
        ? 'Early Career Explorer'
        : q === '12th'
          ? 'School Graduate'
          : q === 'Diploma'
            ? 'Diploma Candidate'
            : q === 'UG'
              ? 'Graduate Candidate'
              : 'Postgraduate Candidate';

    if (field === 'IT') {
      this.advisorPathway = {
        startRole: baseStart,
        primaryRole: {
          title: 'Software / IT Associate',
          subtitle: destination,
          routeType: 'common'
        },
        middleRoles: [
          {
            title: 'Junior Developer',
            subtitle: 'Entry-level tech role',
            routeType: 'somewhat'
          },
          {
            title: 'IT Support Specialist',
            subtitle: 'Infrastructure / support',
            routeType: 'less'
          }
        ],
        seniorRoles: [
          {
            title: 'Software Engineer',
            subtitle: 'Product / platform role',
            routeType: 'common'
          },
          {
            title: 'Cloud / DevOps Engineer',
            subtitle: 'Specialised tech path',
            routeType: 'somewhat'
          },
          {
            title: 'Technical Lead',
            subtitle: 'Leadership route',
            routeType: 'less'
          }
        ]
      };
      return;
    }

    if (field === 'Healthcare') {
      this.advisorPathway = {
        startRole: baseStart,
        primaryRole: {
          title: destination === 'Germany' ? 'Healthcare Ausbildung Candidate' : 'Healthcare Student',
          subtitle: language === 'None' ? 'Language readiness needed' : `${language} language readiness`,
          routeType: 'common'
        },
        middleRoles: [
          {
            title: 'Nursing Assistant',
            subtitle: 'Care support route',
            routeType: 'somewhat'
          },
          {
            title: 'Healthcare Trainee',
            subtitle: 'Training pathway',
            routeType: 'common'
          }
        ],
        seniorRoles: [
          {
            title: 'Registered Nurse',
            subtitle: 'Clinical career route',
            routeType: 'common'
          },
          {
            title: 'Hospital Department Lead',
            subtitle: 'Operational leadership',
            routeType: 'somewhat'
          },
          {
            title: 'Healthcare Manager',
            subtitle: 'Management pathway',
            routeType: 'less'
          }
        ]
      };
      return;
    }

    if (field === 'Hospitality') {
      this.advisorPathway = {
        startRole: baseStart,
        primaryRole: {
          title: 'Hospitality Trainee',
          subtitle: destination,
          routeType: 'common'
        },
        middleRoles: [
          {
            title: 'Hotel Operations Associate',
            subtitle: 'Front office / F&B',
            routeType: 'common'
          },
          {
            title: 'Culinary Trainee',
            subtitle: 'Kitchen pathway',
            routeType: 'somewhat'
          }
        ],
        seniorRoles: [
          {
            title: 'Hotel Supervisor',
            subtitle: 'Team handling role',
            routeType: 'common'
          },
          {
            title: 'F&B Manager',
            subtitle: 'Service leadership',
            routeType: 'somewhat'
          },
          {
            title: 'Hotel Operations Manager',
            subtitle: 'Strategic operations',
            routeType: 'less'
          }
        ]
      };
      return;
    }

    if (field === 'Engineering') {
      this.advisorPathway = {
        startRole: baseStart,
        primaryRole: {
          title: 'Engineering Pathway Candidate',
          subtitle: destination,
          routeType: 'common'
        },
        middleRoles: [
          {
            title: 'Technician / Trainee Engineer',
            subtitle: 'Applied route',
            routeType: 'somewhat'
          },
          {
            title: 'Engineering Student',
            subtitle: 'Academic route',
            routeType: 'common'
          }
        ],
        seniorRoles: [
          {
            title: 'Project Engineer',
            subtitle: 'Execution role',
            routeType: 'common'
          },
          {
            title: 'Design / Quality Engineer',
            subtitle: 'Specialist route',
            routeType: 'somewhat'
          },
          {
            title: 'Engineering Manager',
            subtitle: 'Leadership pathway',
            routeType: 'less'
          }
        ]
      };
      return;
    }

    this.advisorPathway = {
      startRole: baseStart,
      primaryRole: {
        title: 'Business Pathway Candidate',
        subtitle: destination,
        routeType: 'common'
      },
      middleRoles: [
        {
          title: 'Business Student',
          subtitle: 'Academic route',
          routeType: 'common'
        },
        {
          title: 'Sales / Operations Associate',
          subtitle: 'Work route',
          routeType: 'somewhat'
        }
      ],
      seniorRoles: [
        {
          title: 'Business Analyst',
          subtitle: 'Management support',
          routeType: 'common'
        },
        {
          title: 'Operations Manager',
          subtitle: 'Functional leadership',
          routeType: 'somewhat'
        },
        {
          title: 'Country / Program Manager',
          subtitle: 'Strategic leadership',
          routeType: 'less'
        }
      ]
    };
  }

  generateInterviewPrep(): void {
    const role = this.interview.role || 'your selected role';
    const type = this.interview.type;
    const level = this.interview.level;

    this.interviewQuestions = [
      `Tell me about yourself and why you are interested in ${role}.`,
      `Why did you choose this ${type} pathway instead of another option?`,
      `What do you understand about the responsibilities and expectations of ${role}?`,
      `What are your strengths, and how will they help you succeed in this pathway?`,
      `What challenges do you expect, and how will you manage them?`,
      `How does this opportunity connect with your long-term career goal?`,
      `Why should the institution or employer select you over other candidates?`,
      `As a ${level} candidate, what preparation have you already completed?`
    ];
  }

  copyText(text: string): void {
    navigator.clipboard?.writeText(text);
  }
}