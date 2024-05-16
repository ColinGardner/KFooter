//import * as strings from 'BrandingApplicationCustomizerStrings';
import React from 'react';
import * as ReactDom from 'react-dom';
import { BaseApplicationCustomizer, PlaceholderContent, PlaceholderName } from '@microsoft/sp-application-base';
import { IReadonlyTheme, ThemeChangedEventArgs, ThemeProvider } from '@microsoft/sp-component-base';
//import { Dialog } from '@microsoft/sp-dialog';
import { ISiteUserInfo, IWebInfo, SPFI, SPFx,spfi } from '@pnp/sp/presets/all';
import Footer, { IFooterProps } from './components/footer';
import { EnvironmentInfo, WebContext } from './common/ConfigClasses';


declare let __themeState__ : any;

//const LOG_SOURCE: string = 'BrandingApplicationCustomizer';


export interface IBrandingApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class BrandingApplicationCustomizer extends BaseApplicationCustomizer<IBrandingApplicationCustomizerProperties> {

    private _params: URLSearchParams = new URLSearchParams(window.location.search);
    private _sp: SPFI;                                       // When initialised, provides the root access point into the PnP JS API.
    private _themeProvider: ThemeProvider;                   // Entry point to the be able to access the site colour theme.
    private _theme: IReadonlyTheme | undefined;              // Provides access to the colour theme for the site so that the React controls can be rendered using the appropriate colour palette.
    private _web: IWebInfo;                                  // When initialised, provides access to properties of the web site.
    private _currentUser: ISiteUserInfo = null;              // Provide access to the current user
    private _footerPlaceHolder: HTMLDivElement;              // Provides a DOM placeholder for the React Configuration panel control.


    private get hasEmbeddedParam(): boolean {
        const val = this._params.get("env");
        if (val) {
          return val === "Embedded" || val === "WebViewList" || val === "WebView";
        }
        else {
          return false;
        }
    }

    private get hasBrandingHideFlag(): boolean{
        return this._params.get("KBrandingHide") !== null;
    }

    private get hasIsDlgParam(): boolean {
        return (this._params.get("isDlg") !== null && this._params.get("IsDlg") === "1");
    }


    private get canRender() : boolean {       
        if (this.hasBrandingHideFlag || this.hasEmbeddedParam || this.hasIsDlgParam ){
            return false;
        }
        else {
            return true;
        }
    }

    // Triggers an update of the controls if the the site theme is changed.
    private onThemeChanged(args: ThemeChangedEventArgs): void {     
        this._theme = args.theme; 
    }


    private _bottomPlaceholder: PlaceholderContent;
    private get bottomPlaceHolder(): PlaceholderContent {
        if (this._bottomPlaceholder  === undefined){
            this._bottomPlaceholder = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Bottom) as PlaceholderContent;
        }
        return this._bottomPlaceholder;
    }

    private _webContext: WebContext;
    private get webContext(): WebContext {
        if (!this._webContext) {
            this._webContext = new WebContext(this.context, this._sp, this._web, this._currentUser);
        }
        return this._webContext;
    }

    private get environmentInfo(): EnvironmentInfo {
        return new EnvironmentInfo(this._theme,)
    }

    public async onInit(): Promise<void> {
        
        this._sp = spfi().using(SPFx({pageContext: this.context.pageContext}));
        this._web = await this._sp.web();
        this._currentUser = await this._sp.web.currentUser();

        console.log(__themeState__);
        //const theme = (window as any).themeState.theme;
       // console.log(theme);

        // this.context.serviceScope.whenFinished(() => {
        //     this._theme = this.context.serviceScope.consume(ThemeProvider.serviceKey as any);                       // Provides access to the theme provider.
        //    // this._theme = this._themeProvider.tryGetTheme();                                                        // Uses the above to get the site colour theme.
        //     //this._themeProvider.themeChangedEvent.add(this, this.onThemeChanged);                                   // Add an event handler for when the theme is changed.
        // })

        await this.renderFooter();

        return Promise.resolve();
    }

    private async renderFooter(): Promise<void> {
        
        const webContext: WebContext = this.webContext;
        webContext.environmentInfo = this.environmentInfo;
        const element: React.ReactElement<IFooterProps> = React.createElement(Footer, { 
            webContext: webContext
        });

        ReactDom.render(element, this.bottomPlaceHolder.domElement);
    }

    protected onDispose(): void {
        ReactDom.unmountComponentAtNode(this._bottomPlaceholder.domElement);
    }

}
