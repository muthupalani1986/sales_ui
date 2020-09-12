import { finalize, tap } from 'rxjs/operators';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HeaderService } from '../../header.service';
@Injectable()
export class HttpCallsInterceptor implements HttpInterceptor {

    count = 0;

    constructor(private _headerService: HeaderService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this._headerService.setSpinner(true);

        this.count++;

        return next.handle(req)

            .pipe(finalize(() => {

                this.count--;

                if (this.count == 0) { this._headerService.setSpinner(false); }
            })
            );
    }
}
