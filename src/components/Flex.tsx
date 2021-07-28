import * as React from 'react';

type AlignItemOptions = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'normal' | 'baseline';
type FlexDirections = 'row' | 'column' | 'column-reverse';
type FlexDisplay = 'flex' | 'inline-flex';
type JustifyContentOptions = 'flex-start' | 'flex-end' | 'center' | 'space-around' | 'space-between' | 'normal';

export interface OwnProps {
    alignItems?: AlignItemOptions;
    className?: string;
    direction?: FlexDirections;
    display?: FlexDisplay;
    justifyContent?: JustifyContentOptions;
    wrapped?: boolean;
    children?: React.ReactNode;
}

const Flex = (props: OwnProps) => {
    const getClassList = () => {
        const classList: string[] = [];
        classList.push(`display-${props.display || 'flex'}`);      
        classList.push(`align-items-${props.alignItems || 'normal'}`);      
        classList.push(`justify-content-${props.justifyContent || 'normal'}`);      
        classList.push(`flex-direction-${props.direction || 'row'}`);
        
        if (props.wrapped) {
            classList.push(`flex-wrap`);
        }
        if (props.className) {
            classList.push(`${props.className}`);
        }
        return classList.join(' ');
    }
    return (
        <div className={`custom-flex ${getClassList()}`}>{props.children}</div>
    );
}

export default Flex;
