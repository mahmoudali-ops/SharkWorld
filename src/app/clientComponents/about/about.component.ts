import { AboutService } from './../../core/services/about.service';
import { Meta, Title } from '@angular/platform-browser';
import { TranslatedPipe } from './../../core/pipes/translate.pipe';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { IAbout } from '../../core/interfaces/iabout';
import { Subscription, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ReloadableComponent } from '../reloadable/reloadable.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, TranslatedPipe],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent extends ReloadableComponent {

    private readonly AboutService = inject(AboutService);

    aboutdataData: WritableSignal<IAbout | null> = signal(null);



    private readonly meta=inject(Meta);
    private readonly title=inject(Title);


      ngOnInit(): void {
      this.loadData();
      this.onReload(() => this.loadData())
      this.LoadDataSeo();
      }
      LoadDataSeo() {

        // 🔹 Remove old meta tags
        this.meta.removeTag("name='description'");
        this.meta.removeTag("name='keywords'");
        this.meta.removeTag("property='og:title'");
        this.meta.removeTag("property='og:description'");
        this.meta.removeTag("property='og:type'");
        this.meta.removeTag("property='og:url'");
        this.meta.removeTag("property='og:image'");
        this.meta.removeTag("name='twitter:card'");
        this.meta.removeTag("name='twitter:title'");
        this.meta.removeTag("name='twitter:description'");
        this.meta.removeTag("name='twitter:image'");
        this.meta.removeTag("rel='canonical'");
      
        // 🔹 Title
        this.title.setTitle(
          'About Us | SharkWorlds - Diving & Travel Experiences in the Red Sea'
        );
      
        // 🔹 Meta Description
        this.meta.updateTag({
          name: 'description',
          content:
            'Learn about SharkWorlds, a passionate diving and travel company based in the Red Sea. We create unforgettable adventures, crystal-clear diving experiences, and exceptional travel memories.'
        });
      
        // 🔹 Keywords
        this.meta.updateTag({
          name: 'keywords',
          content:
            'SharkWorlds, about us, Red Sea diving, scuba diving Egypt, diving trips, snorkeling tours, travel experiences, Hurghada diving'
        });
      
        // 🔹 Open Graph
        this.meta.updateTag({
          property: 'og:title',
          content: 'About SharkWorlds | Red Sea Diving & Travel Adventures'
        });
      
        this.meta.updateTag({
          property: 'og:description',
          content:
            'Discover SharkWorlds and our mission to provide exceptional diving and travel adventures in the Red Sea. Meet our passionate team and explore unforgettable journeys.'
        });
      
        this.meta.updateTag({
          property: 'og:type',
          content: 'website'
        });
      
        this.meta.updateTag({
          property: 'og:url',
          content: 'https://www.sharkworlds.de/about'
        });
      
        this.meta.updateTag({
          property: 'og:image',
          content: 'https://www.sharkworlds.de/assets/images/logo.png'
        });
      
        // 🔹 Twitter Card
        this.meta.updateTag({
          name: 'twitter:card',
          content: 'summary_large_image'
        });
      
        this.meta.updateTag({
          name: 'twitter:title',
          content: 'About SharkWorlds | Red Sea Diving & Travel Adventures'
        });
      
        this.meta.updateTag({
          name: 'twitter:description',
          content:
            'Explore SharkWorlds – your trusted partner for diving trips, snorkeling tours, and unforgettable Red Sea adventures.'
        });
      
        this.meta.updateTag({
          name: 'twitter:image',
          content: 'https://www.sharkworlds.de/assets/images/logo.png'
        });
      
        // 🔹 Canonical
        this.meta.updateTag({
          rel: 'canonical',
          href: 'https://www.sharkworlds.de/about'
        });
      }
      
    // ========================
    // Load About Data
    // ========================
    loadData() {
      this.AboutService.getAboutData()
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (res) => {
              this.aboutdataData.set(res);
           
            },
            error: (err: HttpErrorResponse) => {
              console.log(err.message);
            }
          });
    }

    // ========================
    // Load About Team Data
    // ========================



}
