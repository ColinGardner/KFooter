// import * as React from 'react';
// import { FooterGroupStackConfig, FooterGroupsStackConfigs } from '../common/ConfigClasses';
// import FooterGroupStack from './_footerGroupStack';

// export interface IFooterGroupsStacksProps {
//     footerGroupStacks : FooterGroupsStackConfigs;
// }

// export default class FooterGroupStacks extends React.Component<IFooterGroupsStacksProps, {}> {

//     private get stackConfigs(): FooterGroupStackConfig[] {
//         return this.props.footerGroupStacks && this.props.footerGroupStacks.footerGroupStacks && 
//                 this.props.footerGroupStacks.footerGroupStacks.length > 0 ? this.props.footerGroupStacks.footerGroupStacks : null;
//     }

//     private get childControls(): JSX.Element {
//         if (this.stackConfigs) {
//             const stacks: Array<JSX.Element> = new Array<JSX.Element>();
//             this.stackConfigs.forEach((config: FooterGroupStackConfig) => {
//                 stacks.push(<FooterGroupStack footerGroupStacks={config} />);
//             })
//             return <>{stacks}</>;
//         }   
//         else {
//             return null;
//         }        
//     }

//     public render(): React.ReactElement<IFooterGroupsStacksProps> {    		
//         return this.childControls;
//     }
// }