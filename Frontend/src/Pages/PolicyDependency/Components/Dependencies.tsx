import Dependency from './Dependency';
import { Stack } from '@mui/material';


const Dependencies = () => {
    return (
        <Stack spacing={5} direction={{ xs: "column", md: "row" }}>
            {names.map((e) => (
                <Dependency name={e.name} />
            ))}
        </Stack>

    )
}

export default Dependencies

const names = [
    {
        id: 1,
        name: 'Form',
    },

    {
        id: 2,
        name: 'Poster'
    },

    {
        id: 3,
        name: 'Protocol'
    },
];
