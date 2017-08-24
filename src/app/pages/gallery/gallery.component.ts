import {
    Component, ViewChild, ElementRef, HostListener, ViewChildren,NgZone,
    ChangeDetectorRef, QueryList, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter, OnDestroy
} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import {ImageService} from "../services/image.service";

import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit, OnDestroy, OnChanges {
    loader: boolean =true;
    private imageDataFilePath: string = 'assets/img/gallery/'
    private dataFileName: string = 'data.json'
    private images: any[] = []
    private backupimages: any[] = []
    private gallery: any[] = []
    private results: any[] = []
    private data: any[] = []
    private name: '';
    private er: string = '';
    private next: '';
    private page: {};
    private minimalQualityCategory = 'preview_xxs'
    private viewerSubscription: Subscription;
    private innerHeight: any;
    public headers = new Headers({'Content-Type': 'application/json'});
    private apiURL = 'https://api.tobbyline.com/api/images';
    // public apiURL = 'http://localhost:8000/api/images';

    @Input('flexBorderSize') providedImageMargin: number = 2
    @Input('flexImageSize') providedImageSize: number = 7
    @Input('galleryName') providedGalleryName: string = '';

    @Output() viewerChange = new EventEmitter<boolean>()

    @ViewChild('galleryContainer') galleryContainer: ElementRef
    @ViewChildren('imageElement') imageElements: QueryList<any>

    @HostListener('window:scroll', ['$event']) triggerCycle(event) {
        this.scaleGallery()
    }

    @HostListener('window:resize', ['$event']) windowResize(event) {
        this.render()
    }


    constructor(private zone: NgZone, private ImageService: ImageService, private http: Http,
                private ChangeDetectorRef: ChangeDetectorRef) { 
                    this.innerHeight = (window.screen.height)*3/4;
                }

    public ngOnInit() {
        this.fetchDataAndRender()
        this.viewerSubscription = this.ImageService.showImageViewerChanged$
            .subscribe( (visibility: boolean) => this.viewerChange.emit(visibility));
    }

    public ngOnChanges(changes: SimpleChanges) {
        // input params changed
        this.render()
    }


    public ngOnDestroy() {
        if (this.viewerSubscription) {
            this.viewerSubscription.unsubscribe();
        }
    }

    public openImageViewer(img) {
        this.ImageService.updateSelectedImageIndex(this.images.indexOf(img))
        this.ImageService.showImageViewer(true)
    }

    private fetchDataAndRender() {
        const featured = 'True';
        const url = `${this.apiURL}?featured=`+featured;
        this.http.get(url, {headers:this.headers})
            .map((res: Response) =>{
                return res.json();
            } )
            .subscribe(
                data => {
                    this.data = data;
                    this.next  = data.next;
                    this.images =  data.results;
                    this.ImageService.updateImages(this.images)
                    this.images.forEach((image) => {
                        image['galleryImageLoaded'] = false
                        image['viewerImageLoaded'] = false
                        image['srcAfterFocus'] = ''
                    });
                    this.loader = false;
                    this.er = 'No images to dispay';
                    // twice, single leads to different strange browser behaviour
                    this.render()
                    this.render()
                },
                err => console.error("Did you run the convert script from angular2-image-gallery for your images first? Original error: " + err),
                () => undefined)
    }



   

    private loadmore(data) {
         let url = data.next;
        this.http.get(url, {headers:this.headers})
            .map((res: Response) => {
                return res.json(); })
            .subscribe(
                data => {
                    this.data = data;
                    this.next = data.next;
                    this.images = this.images.concat(data.results);
                    this.ImageService.updateImages(this.images);

                    this.images.forEach((image) => {
                        image['galleryImageLoaded'] = true
                        image['viewerImageLoaded'] = false
                        image['srcAfterFocus'] = ''
                    })
                    // twice, single leads to different strange browser behaviour
                    this.render()
                    this.render()
                },
                err => console.error("Did you run the convert script from angular2-image-gallery for your images first? Original error: " + err),
                () => undefined)
    }

    private wedding(cat) {
        this.loader = true;
        this.er = '';
        this.gallery =[];
        const url = `${this.apiURL}?category=`+cat;
        this.http.get(url, {headers:this.headers})
            .map((res: Response) => res.json())
            .subscribe(
                data => {
                    this.data = data;
                    this.next = data.next;
                    this.images = data.results;
                    this.ImageService.updateImages(this.images)

                    this.images.forEach((image) => {
                        image['galleryImageLoaded'] = false
                        image['viewerImageLoaded'] = false
                        image['srcAfterFocus'] = ''
                    });
                    this.loader = false;
                    this.er = 'No images to dispay';
                    // twice, single leads to different strange browser behaviour
                    this.render()
                    this.render()
                },
                err => console.error("Did you run the convert script from angular2-image-gallery for your images first? Original error: " + err),
                () => undefined)
    }

    private featured(featured) {
         this.loader = true;
        this.er = '';
        this.gallery =[];
        const url = `${this.apiURL}?featured=`+featured;
        this.http.get(url, {headers:this.headers})
            .map((res: Response) => res.json())
            .subscribe(
                data => {
                    this.data = data;
                    this.next = data.next;
                    this.images = data.results;
                    this.ImageService.updateImages(this.images)

                    this.images.forEach((image) => {
                        image['galleryImageLoaded'] = false
                        image['viewerImageLoaded'] = false
                        image['srcAfterFocus'] = ''
                    });
                    this.loader = false;
                    this.er = 'No images to dispay';
                    // twice, single leads to different strange browser behaviour
                    this.render()
                    this.render()
                },
                err => console.error("Did you run the convert script from angular2-image-gallery for your images first? Original error: " + err),
                () => undefined)
    }

    private render() {
        let tempRow = [this.images[0]]
        let rowIndex = 0
        let i = 0

        for (i; i < this.images.length; i++) {
            while (this.images[i + 1] && this.shouldAddCandidate(tempRow, this.images[i + 1])) {
                i++
            }
            if (this.images[i + 1]) {
                tempRow.pop()
            }
            this.gallery[rowIndex++] = tempRow

            tempRow = [this.images[i + 1]]
        }

        this.scaleGallery()
    }

    private shouldAddCandidate(imgRow: any[], candidate: any): boolean {
        let oldDifference = this.calcIdealHeight() - this.calcRowHeight(imgRow)
        imgRow.push(candidate)
        let newDifference = this.calcIdealHeight() - this.calcRowHeight(imgRow)

        return Math.abs(oldDifference) > Math.abs(newDifference)
    }

    private calcRowHeight(imgRow: any[]) {
        let originalRowWidth = this.calcOriginalRowWidth(imgRow)

        let ratio = (this.getGalleryWidth() - (imgRow.length - 1) * this.calcImageMargin()) / originalRowWidth
        let rowHeight = imgRow[0][this.minimalQualityCategory]['height'] * ratio

        return rowHeight
    }

    private calcImageMargin() {
        let galleryWidth = this.getGalleryWidth()
        let ratio = galleryWidth / 1920
        return Math.round(Math.max(1, this.providedImageMargin * ratio))
    }

     private MyImageMargin() {
        let galleryWidth = this.getGalleryWidth()
        let ratio = galleryWidth / 1920
        return Math.round(Math.max(1, this.providedImageMargin * ratio)*0)
    }

    private calcOriginalRowWidth(imgRow: any[]) {
        let originalRowWidth = 0
        imgRow.forEach((img) => {
            let individualRatio = this.calcIdealHeight() / img[this.minimalQualityCategory]['height']
            img[this.minimalQualityCategory]['width'] = img[this.minimalQualityCategory]['width'] * individualRatio
            img[this.minimalQualityCategory]['height'] = this.calcIdealHeight()
            originalRowWidth += img[this.minimalQualityCategory]['width']
        })

        return originalRowWidth
    }

    private calcIdealHeight() {
        return this.getGalleryWidth() / (80 / this.providedImageSize) + 100
    }

    private getGalleryWidth() {
        if (this.galleryContainer.nativeElement.clientWidth === 0) {
            // IE11
            return this.galleryContainer.nativeElement.scrollWidth
        }
        return this.galleryContainer.nativeElement.clientWidth
    }

    private scaleGallery() {
        let imageCounter = 0
        let maximumGalleryImageHeight = 0

        this.gallery.forEach((imgRow) => {
            let originalRowWidth = this.calcOriginalRowWidth(imgRow)

            if (imgRow !== this.gallery[this.gallery.length - 1]) {
                let ratio = (this.getGalleryWidth() - (imgRow.length - 1) * this.calcImageMargin()) / originalRowWidth

                imgRow.forEach((img) => {
                    img['width'] = img[this.minimalQualityCategory]['width'] * ratio
                    img['height'] = img[this.minimalQualityCategory]['height'] * ratio
                    maximumGalleryImageHeight = Math.max(maximumGalleryImageHeight, img['height'])
                    this.checkForAsyncLoading(img, imageCounter++)
                })
            }
            else {
                imgRow.forEach((img) => {
                    img.width = img[this.minimalQualityCategory]['width']
                    img.height = img[this.minimalQualityCategory]['height']
                    maximumGalleryImageHeight = Math.max(maximumGalleryImageHeight, img['height'])
                    this.checkForAsyncLoading(img, imageCounter++)
                })
            }
        })

        if (maximumGalleryImageHeight > 375) {
            this.minimalQualityCategory = 'preview_xs'
        } else {
            this.minimalQualityCategory = 'preview_xxs'
        }

        this.ChangeDetectorRef.detectChanges()
    }

    private checkForAsyncLoading(image, imageCounter: number) {
        let imageElements = this.imageElements.toArray()

        if (image['galleryImageLoaded'] ||
            (imageElements.length > 0 && this.isScrolledIntoView(imageElements[imageCounter].nativeElement))) {
            image['galleryImageLoaded'] = true
            image['srcAfterFocus'] = image[this.minimalQualityCategory]['path']
        }
        else {
            image['srcAfterFocus'] = ''
        }
    }

    private isScrolledIntoView(element) {
        let elementTop = element.getBoundingClientRect().top
        let elementBottom = element.getBoundingClientRect().bottom

        return elementTop < window.innerHeight && elementBottom >= 0 && (elementBottom > 0 || elementTop > 0)
    }
}
