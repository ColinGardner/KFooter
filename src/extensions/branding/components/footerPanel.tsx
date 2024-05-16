import * as React from 'react';
import { FooterPanelConfig } from '../common/ConfigClasses';
import { ActionButton } from '@fluentui/react';
import strings from 'BrandingApplicationCustomizerStrings';

export interface IFooterPanelProps {
    footerPanelConfig: FooterPanelConfig;
    editMode: boolean;
}

export default class FooterPanel extends React.Component<IFooterPanelProps, {}> {

    private get panelConfig(): FooterPanelConfig {
        return this.props.footerPanelConfig
    }

    private get backgroundColor(): string {
        return this.panelConfig.backgroundColor ? this.panelConfig.backgroundColor : "initial";
    }

    private get columns(): JSX.Element {
        if (this.panelConfig.columns) {
           return 
        }   
        else {
            return null;
        }        
    }

    private get editMode(): boolean {
        return this.props.editMode;
    }

    private get containerStyles(): React.CSSProperties {
        return  { backgroundColor: this.backgroundColor, 
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignContent: "flex-start",
                  justifyContent: "space-around",
                  flexWrap: "wrap"
                }
    }

    private get addColumnButton(): JSX.Element {
        if (this.editMode) {
            return  <ActionButton 
                        iconProps={{iconName: "Add"}}
                        text={strings.ADD_COLUMN}
                        onClick={() => {
                            console.log("Code to add a new column")
                        }}
                    />;

        }
        else {
            return null;
        }
    }

    private get childControls(): JSX.Element {
        return  <div style={this.containerStyles}>
                    {this.columns}
                    {this.addColumnButton}
                </div>;
    }

    public render(): React.ReactElement<IFooterPanelProps> {    		
        return this.childControls;
    }
}