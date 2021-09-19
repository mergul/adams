import { Injectable, Renderer2 } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
export declare class ScriptModel{
    'name': string
    'type': string
}
@Injectable({
  providedIn: 'root'
})
export class LazyLoadScriptService {
    loadedLibraries: { [url: string]: ReplaySubject<void> } = {};
    renderer!: Renderer2;
    document!: Document;
    mlist: Observable<void>[]=[];
    constructor() { }
    loadScripts(arg0: ScriptModel[]) {
        for (const iterator of arg0) {
          this.mlist.push(this.loadScript(iterator.name, iterator.type));
        }
        return this.mlist;
    }
    loadScript(url: string, tag: string): Observable<void> {
        if (this.loadedLibraries[url]) {
            return this.loadedLibraries[url].asObservable();
        }

        this.loadedLibraries[url] = new ReplaySubject();

        const el = this.renderer.createElement(tag);
        if (tag === 'link') {
            el.setAttribute('rel', 'stylesheet');
            el.setAttribute('href', url);
        } else {
            el.setAttribute('type', 'text/javascript');
            el.setAttribute('src', url);
        }
        el.onload = () => {
            this.loadedLibraries[url].next();
            this.loadedLibraries[url].complete();
        };

        this.document.body.appendChild(el);

        return this.loadedLibraries[url].asObservable();
    }
}
