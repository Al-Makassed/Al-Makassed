import { Stack, Typography,Box , Avatar} from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';


const names = [
  'English',
  'العربية'
];
const LanguageHeader = () => {
  return (
    
      <Stack justifyContent='center' flexDirection='row'  sx={{bgcolor: theme => theme.palette.maqasid.primary}}>
        <Typography color='white' variant='subtitle1' my={1.5}>Language :</Typography> 
        <Box >
            <FormControl size='small' sx={{ m: 1, width: 100 , borderRadius:10 }}>
            <InputLabel id="demo-multiple-name-label">language</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              input={<OutlinedInput label="Name" />}
              sx={{color:'white'}} 
            >
              {names.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                >
                  {name}
                </MenuItem>
              ))}
            </Select> 
            </FormControl>
          </Box>
    </Stack>
   
    
  )
}

export default LanguageHeader






