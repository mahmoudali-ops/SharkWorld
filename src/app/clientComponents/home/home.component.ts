import { CattourService } from './../../core/services/cattour.service';
import {  ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, HostListener, Inject, inject, OnDestroy, OnInit, PLATFORM_ID, signal, ViewChild, WritableSignal } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { DestnatoinService } from '../../core/services/destnatoin.service';
import { IDestnation } from '../../core/interfaces/idestnation';
import { Subscription, takeUntil } from 'rxjs';
import { TourService } from '../../core/services/tour.service';
import { ITour } from '../../core/interfaces/itour';
import { HttpErrorResponse } from '@angular/common/http';
import { ICatTour } from '../../core/interfaces/icat-tour';
import { TermtextPipe } from '../../core/pipes/termtext.pipe';
import { CommonModule, isPlatformBrowser, NgClass } from '@angular/common';
import { ClientFooterComponent } from "../client-footer/client-footer.component";
import { ReloadableComponent } from '../reloadable/reloadable.component';
import { ReloadService } from '../../core/services/reload.service';
import { TranslatedPipe } from '../../core/pipes/translate.pipe';
import { Meta, Title } from '@angular/platform-browser';
import { register } from 'swiper/element/bundle';

register();


register();

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, TranslatedPipe, ClientFooterComponent,CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],   // ← ← المهم هنا

  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  extends ReloadableComponent {
  
 constructor(
    ReloadService:ReloadService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
      super(ReloadService);
    }

    
  isBrowser = isPlatformBrowser(this.platformId);

  private readonly destnationservice=inject(DestnatoinService);
  private readonly TourService=inject(TourService);
  private readonly CattourService=inject(CattourService)
  private readonly router=inject(Router);
  private readonly meta=inject(Meta);
  private readonly title=inject(Title);


  AllPopularToursList:WritableSignal<ITour[]>=signal([]);  
  TourSUbs:WritableSignal<Subscription|null>=signal(null);

  PopularDestanion:WritableSignal<IDestnation[]>=signal([]);
  destnationSUbs:WritableSignal<Subscription|null>=signal(null);

  AllPopularHurghadaCat:WritableSignal<ICatTour[]>=signal([]);  
  HurghdadaCatSbss:WritableSignal<Subscription|null>=signal(null);
  ngOnInit(): void {
    this.LoadData();
    this.onReload(() => this.LoadData());
    this.LoadDataSeo();
   
   }

   LoadDataSeo(){
    this.meta.removeTag("name='description'");
    this.meta.removeTag("name='keywords'");
  
    // 🔹 Title (Brand + Location + Service)
    this.title.setTitle(
      'Sharkworlds | Hurghada Tours, Excursions & Egypt Travel Adventures'
    );
  
    // 🔹 Meta Description (Conversion + SEO)
    this.meta.updateTag({
      name: 'description',
      content:
        'Sharkworlds is your ultimate travel partner in Hurghada, offering thrilling tours, excursions, snorkeling adventures, desert safaris, and private transfers across Egypt. Plan your unforgettable holiday today!'
    });
  
    // 🔹 Keywords (Strong but not spammy)
    this.meta.updateTag({
      name: 'keywords',
      content:
        'Hurghada tours, Egypt excursions, Red Sea activities, Hurghada travel agency, desert safari Hurghada, snorkeling trips Egypt, Egypt day tours, Sharkworlds'
    });
  
    // 🔹 Open Graph (Social + SEO Boost)
    this.meta.updateTag({ property: 'og:title', content: 'Sharkworlds | Hurghada Tours & Egypt Excursions' });
    this.meta.updateTag({ property: 'og:description', content: 'Book the best tours, excursions, and Red Sea adventures in Hurghada with Sharkworlds. Trusted local travel experts.' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
};

   LoadData() {
    this.destnationservice.getAllDestnation()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: res => this.PopularDestanion.set(res.data),
        error: err => console.log(err.message)
      });
  
    this.TourService.getAllTours()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: res => this.AllPopularToursList.set(res.data),
        error: err => console.log(err.message)
      });
  
    this.CattourService.getAllCAtegorytours()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: res => this.AllPopularHurghadaCat.set(res.data),
        error: err => console.log(err.message)
      });
  }
  ;
  get HurghadaTours() {
    return this.AllPopularToursList().filter(t => 
      t.destinationName?.toLowerCase() === 'hurghada'
    );
  }
  @ViewChild('swiper', { static: false }) swiperEl!: ElementRef;

  @ViewChild('heroVideo') heroVideo!: ElementRef<HTMLVideoElement>;
videoFallback = false;

ngAfterViewInit(): void {
  const swiperEl = document.querySelector('.heroSwiper') as any;

  Object.assign(swiperEl, {
    slidesPerView: 1,
    loop: true,
    speed: 1200,
    autoplay: {
      delay: 4500,
      disableOnInteraction: false
    },
    grabCursor: true,
    effect: 'creative',
    creativeEffect: {
      prev: {
        shadow: true,
        translate: [0, 0, -400]
      },
      next: {
        translate: ['100%', 0, 0]
      }
    }
  });

  swiperEl.initialize();
}




}