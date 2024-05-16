// import * as React from 'react';
// import { PrimaryButton } from '@fluentui/react';
// import strings from 'BrandingApplicationCustomizerStrings';
// import { FooterGroupConfig, FooterLinkConfig } from '../common/ConfigClasses';
// import FooterLink from './footerLink';

// export interface IFooterGroupProps {
//    footerGroup: FooterGroupConfig;
// }

// export default class FooterGroup extends React.Component<IFooterGroupProps, {}> {

//     private get footerGroup(): FooterGroupConfig {
//         return this.props.footerGroup;
//     }

//     private get groupHeaderLink(): FooterLinkConfig {
//         return this.footerGroup && this.footerGroup.groupHeaderLink  ? this.footerGroup.groupHeaderLink : null;
//     }

//     private get groupLinks(): FooterLinkConfig[] {
//         return this.footerGroup && this.footerGroup.groupLinks && this.footerGroup.groupLinks.length > 0  ? this.footerGroup.groupLinks : null;
//     }

//     private get groupHeaderControl(): JSX.Element {
//         if (this.groupHeaderLink) {
//             return  <tr>
//                         <td>
//                             <FooterLink 
//                                 linkConfig={this.groupHeaderLink}
//                                 isGroupHeader={true}
//                             />
//                         </td>
//                     </tr>;
//         }
//         else {
//             return null;
//         }
//     }

//     private get groupLinkControls(): JSX.Element[] {
//         if (this.groupLinks) {
//             const linkControls: Array<JSX.Element> = new Array<JSX.Element>();
//             this.groupLinks.forEach((linkConfig: FooterLinkConfig) => {
//                 linkControls.push(<tr><td><FooterLink linkConfig={linkConfig} isGroupHeader={false} /></td></tr>);
//             });
//             return linkControls;
//         }
//         else {
//             return null;
//         }
//     }


//     private get childControls(): JSX.Element {
//         return  <table>
//                     {this.groupHeaderControl}
//                     {this.groupLinkControls}
//                 </table>
                  
//     }

//     public render(): React.ReactElement<IFooterGroupProps> {    		
//         return this.childControls;
//     }
// }