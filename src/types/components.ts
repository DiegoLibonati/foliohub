export interface Component {
  cleanup?: () => void;
}

export interface CardInitComponent extends Component, HTMLDivElement {}
export interface CardProfileComponent extends Component, HTMLDivElement {}
export interface ItemLinkRepoComponent extends Component, HTMLLIElement {}
export interface SubTitleComponent extends Component, HTMLHeadingElement {}
