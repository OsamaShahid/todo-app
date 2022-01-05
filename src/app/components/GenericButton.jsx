import * as React from 'react';
import Button from '@mui/material/Button';

class GenericButton extends React.Component {

    render () {
        const { variant, onClick, startIcon, children } = this.props;
        return (
            <Button variant={variant} onClick={onClick} startIcon={startIcon}>
                {children}
            </Button>
        );
    }
}

export default GenericButton;
