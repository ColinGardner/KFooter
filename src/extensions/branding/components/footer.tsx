import * as React from 'react';
//import { PrimaryButton } from '@fluentui/react';
import strings from 'BrandingApplicationCustomizerStrings';
import { FooterConfig, WebContext } from '../common/ConfigClasses';
import FooterPanel from './footerPanel';
import { DataUtilities } from '../common/DataUtilities';
import { ISiteUserInfo } from '@pnp/sp/site-users';
import { Link } from 'office-ui-fabric-react';
//import { Collapse } from '@kunukn/react-collapse';


export interface IFooterProps {
   webContext: WebContext;
}

export interface IFooterState {
    footerConfig: FooterConfig;
    expanded: boolean;
    editMode: boolean;
}

export default class Footer extends React.Component<IFooterProps, IFooterState> {

    public constructor(props: any) {
		super(props);    
        this.state = {footerConfig: null, expanded: false, editMode: false} 
    }

    public async componentDidMount(): Promise<void> {
        const footerConfig = await this.loadFooterConfig();
        this.setState({footerConfig});
    }

    public componentDidUpdate(prevProps: Readonly<IFooterProps>, prevState: Readonly<IFooterState>, snapshot?: any): void {
        if (this.editMode && !this.footerConfig)  {
            this.setState({footerConfig: FooterConfig.DefaultFooterConfig(this.webContext)});
        }  
    }

    private async loadFooterConfig(): Promise<FooterConfig> {
        return await DataUtilities.GetFooterConfig();
    }

    private get webContext(): WebContext {
        return this.props.webContext;
    }

    private get currentUser(): ISiteUserInfo {
        return this.webContext.currentUser
    }


    private get isSiteAdmin(): boolean {
        return this.currentUser.IsSiteAdmin;
    }

    private get footerConfig(): FooterConfig {
        return this.state.footerConfig;
    }

    private get expanded(): boolean {
        return this.state.expanded;
    }

    private set expanded(value: boolean) {
        this.setState({expanded: value});
    }

    private get editMode(): boolean {
        return this.state.editMode;
    }

    private set editMode(value: boolean) {
        this.setState({editMode: value});
    }

    public get editModeLink(): JSX.Element {
        const linkText: string = this.editMode ? strings.EXIT_FOOTER_EDIT_MODE : strings.EDIT_FOOTER;
        return  <Link 
                    styles={{root: {paddingRight: 10}}}
                    onClick={() => {
                            this.editMode = !this.editMode;                            
                        }}>
                    {linkText}
                </Link>;
    }

    // private get configButton(): JSX.Element {
    //     return  <PrimaryButton 
    //                 text={strings.CONFIGURE} />;
    // }

    private get staticPanelContent(): JSX.Element {
        return  <FooterPanel 
                    footerPanelConfig={this.footerConfig.staticPanel} 
                    editMode={this.editMode}
                />;        
    }

    private get staticPanel(): JSX.Element {
        if (this.footerConfig && this.footerConfig.staticPanel) {
           return   <div style={{width: "100%", cursor: "pointer"}}
                         onClick={() => {
                            this.expanded = !this.expanded
                         }}   
                    >
                        {this.staticPanelContent}
                    </div>
        }
        else {
            return null;
        }
    }

    private get editLinkPanel(): JSX.Element {
        if (this.isSiteAdmin) {
            return  <div style={{width: "100%", textAlign: "right"}}>
                        {this.editModeLink}
                    </div>;
        }
        else {
            return null;
        }
    }


    private get slidePanelContents(): JSX.Element {        
        return  <FooterPanel 
                    footerPanelConfig={this.footerConfig.slidePanel} 
                    editMode={this.editMode}
                />;        
    }


    private get slidePanel(): JSX.Element {
        if (this.footerConfig && this.footerConfig.slidePanel) {
            return this.slidePanelContents
        }
        else {
            return null;
        }
    }

    private get footer(): JSX.Element {
        return  <>
                    {this.slidePanel}
                    {this.staticPanel}
                    {this.editLinkPanel}
                </>;
    }

    private get childControls(): JSX.Element {
        return  <>
                    {this.footer}
                </>
    }

    public render(): React.ReactElement<IFooterProps> {           
        return this.childControls;
    }
}