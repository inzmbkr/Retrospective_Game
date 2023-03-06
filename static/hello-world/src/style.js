import styled from 'styled-components';
import { colors, elevation } from '@atlaskit/theme';

export const FormContainer = styled.div`
    display: flex;
    justify-content: center;
    display:inline;
`;

export const FormToInput = styled.div`
  width: 33%;
  padding: 1px;
  display: inline-block;
  vertical-align: top;


  Textfield
  {
    Appearance="Subtle";
    align-self: center;
  }

  button
  {
    align-items: baseline;
    border-width: 0px;
    border-radius: 3px;
    box-sizing: border-box;
    display: inline-flex;
    font-size: inherit;
    font-style: normal;
    font-family: inherit;
    font-weight: 500;
    max-width: 100%;
    position: right;
    text-align: center;
    text-decoration: none;
    transition: background 0.1s ease-out 0s, box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38) 0s;
    white-space: nowrap;
    background: var(--ds-background-brand-bold,#0052CC);
    color: var(--ds-text-inverse,#FFFFFF) !important;
    cursor: pointer;
    height: 2.28571em;
    line-height: 2.28571em;
    padding: 0px 10px;
    vertical-align: middle;
    width: 100%;
    justify-content: center;
    }
`;