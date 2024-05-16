import { ISiteUserInfo, IWebInfo, SPFI } from "@pnp/sp/presets/all";
import { ColumnAlignment, FooterElementType } from "./Enums";
import { IReadonlyTheme } from "@microsoft/sp-component-base";
import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";
//import { DisplayMode } from "@microsoft/sp-core-library";

// export class FooterLinkConfig {
//     public text: string;
//     public icon: string;
//     public url: string;

//     public constructor(text: string, icon: string, url: string) {
//         this.text = text;
//         this.icon = icon;
//         this.url = url;
//     }

// }

// export class FooterGroupConfig {
//     public groupHeaderLink: FooterLinkConfig;
//     public groupLinks: FooterLinkConfig[];

//     public constructor (groupHeaderLink: FooterLinkConfig, groupLinks: FooterLinkConfig[]) {
//         this.groupHeaderLink = groupHeaderLink;
//         this.groupLinks = groupLinks;
//     }

//     public static GetSampleFooterGroupConfig(groupLinkText: string, count: number): FooterGroupConfig {
//         const groupHeaderLink: FooterLinkConfig = new FooterLinkConfig(groupLinkText, "", "" );
//         const groupLinks: FooterLinkConfig[] = new Array<FooterLinkConfig>();

//         if (count > 0) {
//             for (let i = 0; i < count; i++) {
//                 groupLinks.push(new FooterLinkConfig(`Sample link ${i + 1}`, "Link", ""))
//             }
//         }
       

//         return new FooterGroupConfig(groupHeaderLink, groupLinks);
//     }
// }

// export class FooterGroupStackConfig {
//     public footerGroups: FooterGroupConfig[];
//     public constructor(footerGroups: FooterGroupConfig[]) {
//         this.footerGroups = footerGroups;
//     }

//     public static GetSampleFooterGroupStack(groupText: string, linkCount: number): FooterGroupStackConfig {
//         const footerGroups : FooterGroupConfig[] = [
//             FooterGroupConfig.GetSampleFooterGroupConfig(groupText, linkCount)
//         ];

//         return new FooterGroupStackConfig(footerGroups);
//     }
// }

// export class FooterGroupsStackConfigs {
//     public footerGroupStacks: FooterGroupStackConfig[];
//     public constructor (footerGroupStacks: FooterGroupStackConfig[]) {
//         this.footerGroupStacks = footerGroupStacks
//     }

//     public static GetSampleFooterGroupStacks(groupCount: number, linkCount: number): FooterGroupsStackConfigs {

        
//         const footerGroupStacks: FooterGroupStackConfig[] = new Array<FooterGroupStackConfig>();

//         if (groupCount > 0) {
//             for (let i = 0; i < groupCount; i++) {
//                 footerGroupStacks.push(FooterGroupStackConfig.GetSampleFooterGroupStack(`Group ${i + 1}`, linkCount));           
//             }
//         }
                   
//         return new FooterGroupsStackConfigs(footerGroupStacks)
//     }
// }

export class FooterElementConfig {

    public elementType: FooterElementType;
    public text: string;
    public icon: string;
    public url: string;
    public tooltip: string;
    public imageUrl: string;

    public constructor(elementType: FooterElementType, text: string, icon: string) {
        this.elementType = elementType
        this.text = text;
        this.icon = icon;
    }
}

export class FooterColumnConfig {
    public title: string;
    public alignment: ColumnAlignment;
    public elements: FooterElementConfig[];

    public constructor(title: string, elements?: FooterElementConfig[], alignment?: ColumnAlignment) {
        this.title = title;
        this.alignment = alignment? alignment : ColumnAlignment.Left;
        this.elements = elements ? elements : new Array<FooterElementConfig>();
    }
}

export class FooterPanelConfig {
    public backgroundColor: string;
    public backgroundImageUrl: string;
    public columns: FooterColumnConfig[];

    public constructor (backgroundColor?: string, columns?: FooterColumnConfig[], backgroundImageUrl?: string) {
        this.columns = columns ? columns : new Array<FooterColumnConfig>();
        this.backgroundColor = backgroundColor ? backgroundColor : "initial";
        this.backgroundImageUrl = backgroundImageUrl ? backgroundImageUrl : "";
    }

}

export class FooterConfig {
    public staticPanel: FooterPanelConfig;
    public slidePanel: FooterPanelConfig;
    public constructor (staticPanel: FooterPanelConfig,  slidePanel: FooterPanelConfig) {
        this.staticPanel = staticPanel;
        this.slidePanel = slidePanel;
    }

    public static DefaultFooterConfig(webContext: WebContext): FooterConfig {
        const theme: IReadonlyTheme = webContext.environmentInfo.theme;
        const staticPanelBackgrounColor: string = theme ? theme.palette.themePrimary : "Gray";
        const slidePanelBackgrounColor: string = theme ? theme.palette.themeLighterAlt : "Gainsboro";
        const staticPanel: FooterPanelConfig = new FooterPanelConfig(staticPanelBackgrounColor);
        const slidePanel: FooterPanelConfig = new FooterPanelConfig(slidePanelBackgrounColor);
        return new FooterConfig(staticPanel, slidePanel)
    }
}

// Provides key environmental information which might change as a result of user interaction with the hosting environment at run time.
export class EnvironmentInfo {
    public theme: IReadonlyTheme | undefined;   // The site color theme.
  
    // This returns true if the selected color theme is dark (inverted), otherwise it returns false for normal themes.
    public get isInvertedTheme(): boolean {
        return (this.theme && this.theme.isInverted) ? this.theme.isInverted : false;        
    }

    //Class constructor.
    public constructor(theme: IReadonlyTheme | undefined ) {
        this.theme = theme;        
    }
}

export class WebContext {

    public sp: SPFI;
    public web: IWebInfo;
    public context:  ApplicationCustomizerContext;
    public currentUser: ISiteUserInfo;
    public environmentInfo: EnvironmentInfo;
    
    // Class Constructor
    public constructor(context:  ApplicationCustomizerContext, sp: SPFI, web: IWebInfo, currentUser: ISiteUserInfo) {
        this.context = context;
        this.sp = sp;
        this.web = web;
        this.currentUser = currentUser;
    }

}