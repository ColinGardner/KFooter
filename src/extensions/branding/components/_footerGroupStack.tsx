// import * as React from 'react';
// import { FooterGroupConfig, FooterGroupStackConfig, FooterLinkConfig } from '../common/ConfigClasses';
// import FooterGroup from './_footerGroup';

// export interface IFooterGroupStackProps {
//    footerGroupStacks: FooterGroupStackConfig;
// }

// export default class FooterGroupStack extends React.Component<IFooterGroupStackProps, {}> {

//     private get footerGroupStacks(): FooterGroupStackConfig {
//         return this.props.footerGroupStacks;
//     }

    
//     private get linkGroups(): FooterGroupConfig[] {
//         return this.footerGroupStacks && this.footerGroupStacks.footerGroups && this.footerGroupStacks.footerGroups.length> 0  ? this.footerGroupStacks.footerGroups : null;
//     }


//     private get groupStackControl(): JSX.Element[] {
       
//             const linkControls: Array<JSX.Element> = new Array<JSX.Element>();
//             this.linkGroups.forEach((footerGroup: FooterGroupConfig) => {
//                 linkControls.push(<tr><td><FooterGroup footerGroup={footerGroup} /></td></tr>);
//             });
//             return linkControls;
        
//     }


//     private get childControls(): JSX.Element {
//         if (this.linkGroups) {
//             return  <table>
//                         {this.groupStackControl}
//                     </table>
//         }
//         else {
//             return null;
//         }
                  
//     }

//     public render(): React.ReactElement<IFooterGroupStackProps> {    		
//         return this.childControls;
//     }
// }