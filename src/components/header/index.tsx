import { Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';

import "./index.css"

const Header = () => {
    const navigate = useNavigate();

    const SpecificationsPage = () => {
        navigate("/specifications");
    }

    const ConfigurationsPage = () => {
        navigate("/create-specification");
    }

    return (
        <div className="Header">
            <Button colorScheme='teal' size='lg' onClick={SpecificationsPage}>
                Specifications
            </Button>
            <Button colorScheme='teal' size='lg' onClick={ConfigurationsPage}>
                Configurations
            </Button>
        </div>
    );
};

export {Header};