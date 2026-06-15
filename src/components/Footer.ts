import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="font-main w-full flex flex-col">
      
      <div class="bg-[#eef1f6] w-full py-8 lg:py-10">
        <div class="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <h2 class="text-2xl lg:text-[28px] font-medium text-[#23314c] tracking-tight text-center md:text-left">
            Your journey with Altus Career continues here
          </h2>

          <div class="relative w-full md:w-[280px]">
            <select class="w-full appearance-none bg-white border border-slate-200 text-slate-700 py-3.5 px-5 rounded-full text-[14px] font-medium shadow-sm outline-none cursor-pointer hover:border-slate-300 transition-colors">
              <option value="" disabled selected>I am</option>
              <option value="student">A Student</option>
              <option value="professional">A Professional</option>
              <option value="partner">A Partner</option>
            </select>
            <div class="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>

        </div>
      </div>

      <div class="bg-white w-full py-12 lg:py-16">
        <div class="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row justify-between gap-12">
          
          <div class="flex flex-col md:flex-row gap-12 lg:gap-24">
            
            <ul class="flex flex-col gap-4">
              <li><a href="#" class="text-[14px] font-bold text-[#23314c] hover:text-blue-600 transition-colors">Company</a></li>
              <li><a href="#" class="text-[14px] font-bold text-[#23314c] hover:text-blue-600 transition-colors">Solutions</a></li>
              <li><a href="#" class="text-[14px] font-bold text-[#23314c] hover:text-blue-600 transition-colors">Finance</a></li>
              <li><a href="#" class="text-[14px] font-bold text-[#23314c] hover:text-blue-600 transition-colors">Newsroom</a></li>
              <li><a href="#" class="text-[14px] font-bold text-[#23314c] hover:text-blue-600 transition-colors">Careers</a></li>
            </ul>

            <ul class="flex flex-col gap-4">
              <li>
                <a href="#" class="text-[13px] text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1.5 group">
                  Job search 
                  <svg class="w-3 h-3 text-slate-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                </a>
              </li>
              <li>
                <a href="#" class="text-[13px] text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1.5 group">
                  Altus Foundation 
                  <svg class="w-3 h-3 text-slate-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                </a>
              </li>
              <li>
                <a href="#" class="text-[13px] text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1.5 group">
                  Customer portal 
                  <svg class="w-3 h-3 text-slate-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                </a>
              </li>
              <li>
                <a href="#" class="text-[13px] text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1.5 group">
                  StationOne 
                  <svg class="w-3 h-3 text-slate-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                </a>
              </li>
              <li>
                <a href="#" class="text-[13px] text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1.5 group">
                  Alert procedure 
                  <svg class="w-3 h-3 text-slate-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                </a>
              </li>
            </ul>

            <div>
              <button class="flex items-center gap-2 text-[13px] text-slate-700 font-medium hover:text-[#23314c] transition-colors border border-transparent hover:border-slate-200 px-3 py-1.5 rounded-sm">
                English
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
            </div>

          </div>

          <div class="flex flex-col items-start lg:items-end gap-8">
            
            <div class="flex items-center">
              <h1 class="text-3xl font-black tracking-tight text-[#0f2444] uppercase flex items-center gap-1">
                Altus
                <span class="text-[#e32526]">Career</span>
              </h1>
            </div>

            <div class="flex items-center gap-5">
              <a href="#" class="text-[#23314c] hover:text-blue-600 transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="#" class="text-[#23314c] hover:text-blue-600 transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" class="text-[#23314c] hover:text-blue-600 transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </a>
              <a href="#" class="text-[#23314c] hover:text-blue-600 transition-colors">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
              </a>
            </div>

          </div>
        </div>
      </div>

      <div class="bg-[#eef1f6] w-full py-6">
        <div class="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6 relative">
          
        

          <div class="flex flex-wrap items-center gap-4 md:gap-8 lg:ml-16 w-full justify-center md:justify-start text-[11px] text-[#4a5b78] font-medium">
            <span class="text-[#23314c]">Accessibility: partially compliant</span>
            <a href="#" class="hover:text-blue-600 transition-colors">Site map</a>
            <a href="#" class="hover:text-blue-600 transition-colors">Cookie Policy</a>
            <a href="#" class="hover:text-blue-600 transition-colors">Legal Notice</a>
          </div>

          <div class="text-[11px] text-[#4a5b78] font-medium shrink-0">
            © ALTUS CAREER 2026
          </div>

        </div>
      </div>

    </footer>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');
    
    .font-main {
      font-family: 'Roboto', Helvetica, Arial, sans-serif;
    }
  `]
})
export class FooterComponent {}