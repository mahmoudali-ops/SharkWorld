import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { IDetailedTour } from '../../core/interfaces/itour';
import { Subscription, switchMap, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TourService } from '../../core/services/tour.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EmailService } from '../../core/services/email.service';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { NgClass } from "@angular/common";
import { ToastrService } from 'ngx-toastr';
import { SafeUrlPipe } from '../../core/pipes/safe-url.pipe';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { ReloadableComponent } from '../reloadable/reloadable.component';
import { TranslatedPipe } from '../../core/pipes/translate.pipe';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-tour-detail',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass,SafeUrlPipe,TranslatedPipe],
  templateUrl: './tour-detail.component.html',
    schemas: [CUSTOM_ELEMENTS_SCHEMA],   // ← ← المهم هنا
  
  styleUrl: './tour-detail.component.css'
})
export class TOurDetailComponent  extends ReloadableComponent  {


  DetailedTour: WritableSignal<IDetailedTour | null> = signal(null);
  // TourSubs: WritableSignal<Subscription | null> = signal(null);
  currentCarouselIndex = signal(0);

  private readonly TourService = inject(TourService);
  private readonly emailService = inject(EmailService);
  private readonly activeRoute = inject(ActivatedRoute);
  private readonly titleService = inject(Title);
  private readonly fb = inject(FormBuilder);
  private readonly toasterService = inject(ToastrService);
  private readonly metaService = inject(Meta);


  BookingForm: FormGroup = this.fb.group({
    FullName: ['', [Validators.required, Validators.minLength(3)]],
    EmailAddress: ['', [Validators.required, Validators.email]],
    Message: ['', Validators.required],
    BookingDate: ['', Validators.required],
    AdultsNumber: [1, Validators.required],
    ChildernNumber: [0, Validators.required],
    HotelName: [''],
    RoomNumber: [1],
    FK_TourId: [''],
    FullTourName: ['']
  });

  ngOnInit(): void {
    this.loadData();
    this.onReload(() => this.loadData());
  }

  private loadData(): void {
    this.activeRoute.paramMap
      .pipe(
        switchMap(params => {
          const slug = params.get('slug') ?? '';
  
          // Fallback title (لو لسه الداتا مجتش)
          const formattedTitle = slug.replace(/-/g, ' ');
          this.titleService.setTitle(`${formattedTitle} | Sharkworlds | Hurghada Tours, Excursions & Egypt Travel Adventures`);
  
          return this.TourService.getDetaildedTOur(slug);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (res: IDetailedTour) => {
          this.DetailedTour.set(res);
  
          /* ===============================
             🔥 Dynamic SEO Starts Here
          =============================== */
  
          // 🔹 Title
          this.titleService.setTitle(
            `${res.titles} | ${res.destinationName} Tours | Sharkworlds | Hurghada Tours, Excursions & Egypt Travel Adventures`
          );
  
          // 🔹 Clear old meta (important for SPA)
          this.metaService.removeTag("name='description'");
          this.metaService.removeTag("name='keywords'");
  
          // 🔹 Meta Description
          this.metaService.updateTag({
            name: 'description',
            content:
              res.metaDescription ||
              `Book ${res.titles} with Sharkworlds | Hurghada Tours, Excursions & Egypt Travel Adventures. Enjoy unforgettable tours and excursions in ${res.destinationName}, Egypt.`
          });
  
          // 🔹 Meta Keywords
          this.metaService.updateTag({
            name: 'keywords',
            content:
              res.metaKeyWords ||
              `${res.titles}, ${res.destinationName} tours, Egypt excursions, Sharkworlds | Hurghada Tours, Excursions & Egypt Travel Adventures`
          });
  
          // 🔹 Open Graph (SEO + Social)
          this.metaService.updateTag({
            property: 'og:title',
            content: `${res.titles} | Sharkworlds | Hurghada Tours, Excursions & Egypt Travel Adventures`
          });
  
          this.metaService.updateTag({
            property: 'og:description',
            content: res.metaDescription
          });
  
          this.metaService.updateTag({
            property: 'og:image',
            content: res.imageCover
          });
  
          this.metaService.updateTag({
            property: 'og:type',
            content: 'article'
          });
  
          this.metaService.updateTag({
            property: 'og:url',
            content: `https://toppickstravels.com/tours/${res.slug}`
          });
  
          /* ===============================
             🔥 End Dynamic SEO
          =============================== */
        },
        error: (err: any) => console.error(err)
      });
  }
  
//      ngOnDestroy(): void {
//       if(this.TourSubs()){
//         this.TourSubs()?.unsubscribe();
//       }
// }
  // دالة للمساعدة في تقسيم النص للـ highlights
  splitHighlightText(text: string): { title: string, description: string } {
    const parts = text.split(' - ');
    return {
      title: parts[0] || '',
      description: parts[1] || ''
    };
  }

  // دالة للمساعدة في تقسيم النص للـ included/not included items
  splitItemText(text: string): { title: string, description: string } {
    const parts = text.split(' - ');
    return {
      title: parts[0] || '',
      description: parts[1] || ''
    };
  }
  // دوال الـ Carousel
  nextCarouselImage() {
    const tour = this.DetailedTour();
    if (tour && tour.tourImgs.length > 0) {
      this.currentCarouselIndex.set(
        (this.currentCarouselIndex() + 1) % tour.tourImgs.length
      );
    }
  }

  prevCarouselImage() {
    const tour = this.DetailedTour();
    if (tour && tour.tourImgs.length > 0) {
      this.currentCarouselIndex.set(
        (this.currentCarouselIndex() - 1 + tour.tourImgs.length) % tour.tourImgs.length
      );
    }
  }

  goToCarouselImage(index: number) {
    this.currentCarouselIndex.set(index);
  }

  // دوال الفورم
  onSubmitBooking(formData: any) {
    console.log('Booking submitted:', formData);
    // هنا سيتم إرسال البيانات للـ API
    alert('Thank you for your booking! We will contact you soon.');
  }



  FormSubmited():void{

    this.BookingForm.patchValue({
      FK_TourId:this.DetailedTour()?.id,
      FullTourName:this.DetailedTour()?.titles
    });


    if(this.BookingForm.valid){
      console.log(this.BookingForm.value);
      this.emailService.sendEmail(this.BookingForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          this.toasterService.success('Your booking request has been sent successfully.', 'Booking Sent');
          this.BookingForm.reset();
        },
        error:(err:HttpErrorResponse)=>{
          console.log(err.message);
          this.toasterService.error('There was an error sending your booking request. Please try again later.', 'Booking Error');
        }
      });
    }else{
      this.toasterService.error('Please fill all required fields correctly.', 'Form Error');
    }
  }
  getLettersWithTransformation(title: string): any[] {
    if (!title) return [];
    const letters = title.split('');
    const n = letters.length;
    const totalAngle = 60; // in degrees, you can adjust
    const radius = 100; // in pixels, adjust as needed
    const startAngle = -totalAngle / 2;
    const angleStep = n > 1 ? totalAngle / (n - 1) : 0;
    return letters.map((letter, index) => {
      const angle = startAngle + index * angleStep;
      return {
        letter: letter,
        transform: `rotate(${angle}deg) translateY(${-radius}px) rotate(${-angle}deg)`
      };
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const swiperEl = document.querySelector('.tourSwiper') as any;

      if (swiperEl?.swiper) {
        swiperEl.swiper.update();
        swiperEl.swiper.slideToLoop(0, 0);
        swiperEl.swiper.autoplay.start();
      } else if (swiperEl) {
        swiperEl.initialize();
      }
    }, 300);
  }

}
