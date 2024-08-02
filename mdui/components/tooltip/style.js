import { css } from 'lit';
export const style = css `:host{--shape-corner-plain:var(--mdui-shape-corner-extra-small);--shape-corner-rich:var(--mdui-shape-corner-medium);--z-index:2500;display:contents}.popup{position:fixed;display:flex;flex-direction:column;z-index:var(--z-index);border-radius:var(--shape-corner-plain);background-color:rgb(var(--mdui-color-inverse-surface));padding:0 .5rem;min-width:1.75rem;max-width:20rem}:host([variant=rich]) .popup{border-radius:var(--shape-corner-rich);background-color:rgb(var(--mdui-color-surface-container));box-shadow:var(--mdui-elevation-level2);padding:.75rem 1rem .5rem 1rem}.headline{display:flex;color:rgb(var(--mdui-color-on-surface-variant));font-size:var(--mdui-typescale-title-small-size);font-weight:var(--mdui-typescale-title-small-weight);letter-spacing:var(--mdui-typescale-title-small-tracking);line-height:var(--mdui-typescale-title-small-line-height)}.content{display:flex;padding:.25rem 0;color:rgb(var(--mdui-color-inverse-on-surface));font-size:var(--mdui-typescale-body-small-size);font-weight:var(--mdui-typescale-body-small-weight);letter-spacing:var(--mdui-typescale-body-small-tracking);line-height:var(--mdui-typescale-body-small-line-height)}:host([variant=rich]) .content{color:rgb(var(--mdui-color-on-surface-variant));font-size:var(--mdui-typescale-body-medium-size);font-weight:var(--mdui-typescale-body-medium-weight);letter-spacing:var(--mdui-typescale-body-medium-tracking);line-height:var(--mdui-typescale-body-medium-line-height)}.action{display:flex;justify-content:flex-start;padding-top:.5rem}.action ::slotted(:not(:last-child)){margin-right:.5rem}`;