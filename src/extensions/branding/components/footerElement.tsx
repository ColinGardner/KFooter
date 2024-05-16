import * as React from 'react';
import { ActionButton } from '@fluentui/react';
import { FooterElementConfig } from '../common/ConfigClasses';

export interface IFooterElementProps {
    elementConfig: FooterElementConfig;
}

export default class FooterElement extends React.Component<IFooterElementProps, {}> {

    private get linkConfig(): FooterElementConfig {
        return this.props.elementConfig;
    }

    private get configButton(): JSX.Element {
        return  <ActionButton
                    href={this.linkConfig.url}
                    target='_blank'
                    iconProps={{iconName: this.linkConfig.icon}}                    
                    >{this.linkConfig.text}</ActionButton>


    }

    private get childControls(): JSX.Element {
        return  <>
                    {this.configButton}
                </>
    }

    public render(): React.ReactElement<IFooterElementProps> {    		
        return this.childControls;
    }
}