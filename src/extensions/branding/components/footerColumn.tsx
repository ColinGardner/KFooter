import * as React from 'react';
import { FooterColumnConfig, FooterElementConfig } from '../common/ConfigClasses';
import FooterElement from './footerElement';

export interface IFooterColumnProps {
    footerColumnConfig: FooterColumnConfig;
}

export default class FooterPanelColumn extends React.Component<IFooterColumnProps, {}> {

    private get columnConfig(): FooterColumnConfig {
        return this.props.footerColumnConfig
    }

    private get columnElements(): FooterElementConfig[] {
        return this.columnConfig.elements && this.columnConfig.elements.length > 0 ? this.columnConfig.elements : null;
    }

    private columnElement(elementConfig: FooterElementConfig): JSX.Element {
        return <FooterElement elementConfig={elementConfig} />;
    }

    private get columnElementControls(): JSX.Element[] {
        const controls: Array<JSX.Element> = new Array<JSX.Element>();

        if (this.columnElements) {
            this.columnElements.forEach((elementConfig: FooterElementConfig) => {
                controls.push(this.columnElement(elementConfig));
            });
        }

        return controls;
    }

    private get childControls(): JSX.Element {
        return  <div>
                    {this.columnElementControls}
                </div>;
    }

    public render(): React.ReactElement<IFooterColumnProps> {    		
        return this.childControls;
    }
}